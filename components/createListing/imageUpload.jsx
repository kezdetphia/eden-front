import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Pressable,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { EvilIcons } from "@expo/vector-icons";
import { firebase } from "../../firebaseConfig";
import * as FileSystem from "expo-file-system";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";

import sizes from "../../constants/sizes";
import AddListingDetails from "./addListingDetails";

const ImageUpload = () => {
  const { xsm, sm, md, lg, xl, xxl } = sizes;
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const getPermissionAsync = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const permissionGranted = await getPermissionAsync();
    if (!permissionGranted) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log("Image picked:", result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert("No image selected", "Please select an image first.");
      return;
    }

    setUploading(true);
    try {
      console.log("Getting file info for:", selectedImage);
      const fileInfo = await FileSystem.getInfoAsync(selectedImage);

      if (!fileInfo.exists) {
        console.error("File does not exist at:", selectedImage);
        throw new Error("File does not exist");
      }

      console.log("Converting file to blob:", selectedImage);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          console.error("XHR error:", e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", selectedImage, true);
        xhr.send(null);
      });

      console.log("Blob created successfully:", blob);

      const filename = selectedImage.substring(
        selectedImage.lastIndexOf("/") + 1
      );
      const ref = firebase.storage().ref().child(filename);

      console.log("Uploading to Firebase Storage:", filename);
      const snapshot = await ref.put(blob);
      blob.close();

      const downloadURL = await snapshot.ref.getDownloadURL();
      console.log("Download URL:", downloadURL);

      await addDataToFirestore("corpswap-imageupload", {
        imageUrl: downloadURL,
      });

      Alert.alert("Image uploaded successfully");
      setSelectedImage(null);
    } catch (err) {
      console.error("Upload error:", err);
      Alert.alert("Failed to upload image", err.message);
    } finally {
      setUploading(false);
    }
  };

  const addDataToFirestore = async (collectionName, docData) => {
    try {
      const db = firebase.firestore();
      const docRef = await db.collection(collectionName).add(docData);
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document to Firestore:", error);
    }
  };

  return (
    <View className="flex-1 w-full " style={{ paddingHorizontal: xs(8) }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          justifyContent: selectedImage ? "flex-start" : "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {selectedImage && (
          <View className="items-center justify-center gap-y-2">
            <Image
              source={{ uri: selectedImage }}
              style={{ width: xs(250), height: ys(200) }}
              className="rounded-xl"
            />
            {/* <Button
              title={uploading ? "Uploading..." : "Upload Image"}
              onPress={uploadImage}
              disabled={uploading}
            /> */}
          </View>
        )}

        <Pressable onPress={pickImage}>
          <View
            style={{ width: xs(250), height: ys(200), borderWidth: 1 }}
            className="rounded-xl border-gray-300 justify-center items-center"
          >
            <View className="flex-col items-center justify-center gap-y-2">
              <EvilIcons name="image" size={ms(32)} color="black" />
              <Text
                style={{ fontSize: ms(12), fontWeight: "inter" }}
                className="text-gray-400 font-semibold"
              >
                Upload Image
              </Text>
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ImageUpload;
