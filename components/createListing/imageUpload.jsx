import React, { useState } from "react";
import { View, Text, Image, Pressable, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { EvilIcons } from "@expo/vector-icons";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../config/firebaseConfig"; // Adjust the path as needed
import * as FileSystem from "expo-file-system";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import * as ImageManipulator from "expo-image-manipulator";
import sizes from "../../constants/sizes";

const ImageUpload = ({ user, updateListingDetails }) => {
  const { xsm, sm, md, lg, xl, xxl } = sizes;
  const [selectedImage, setSelectedImage] = useState(null);

  const requestPermissions = async () => {
    try {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
        Alert.alert(
          "Permissions are required to access the camera and media library."
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error requesting permissions: ", error);
      Alert.alert("Error requesting permissions", error.message);
      return false;
    }
  };

  const pickImage = async (source) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      let result;
      if (source === "camera") {
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else if (source === "library") {
        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        const resizedImageUri = await resizeImage(imageUri); // Resize the image before uploading
        setSelectedImage(resizedImageUri);
        await uploadImage(resizedImageUri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
      Alert.alert("Error picking image", error.message);
    }
  };

  const resizeImage = async (uri) => {
    try {
      const resizedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 500, height: 500 } }], // Resize to desired dimensions
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      return resizedImage.uri;
    } catch (error) {
      console.error("Error resizing image:", error);
      throw error;
    }
  };

  const uploadImage = async (uri) => {
    try {
      console.log("Starting image upload...");

      const response = await fetch(uri); // Fetch the image from the URI
      console.log("Fetched image from URI:", uri);

      const blob = await response.blob(); // Convert the image to a blob
      console.log("Converted image to blob");

      const storageRef = ref(storage, `images/${Date.now()}`); // Create a storage reference
      console.log("Created storage reference:", storageRef);

      await uploadBytes(storageRef, blob); // Upload the blob to storage
      console.log("Uploaded blob to storage");

      const downloadURL = await getDownloadURL(storageRef); // Retrieve the download URL
      console.log("Retrieved download URL:", downloadURL);

      await updateListingDetails("image", downloadURL); // Update listing details with the image URL
      await saveImageUrl(downloadURL); // Save the image URL to Firestore
      console.log("Saved image URL to Firestore");
    } catch (error) {
      console.error("Error uploading image: ", error);
      Alert.alert("Error uploading image", error.message);
    }
  };

  const saveImageUrl = async (url) => {
    try {
      // const user = { userId: user.id }; // Replace with actual user ID logic
      await addDoc(collection(db, "images"), {
        imageUrl: url,
        // userId: user?._id,
        createdAt: new Date(),
      });
      console.log("Image URL saved successfully");
      Alert.alert("Image uploaded and URL saved to database!");
    } catch (error) {
      console.error("Error saving image URL to Firestore: ", error);
      console.log("Firestore error details:", JSON.stringify(error));
      Alert.alert("Error saving image URL", error.message);
    }
  };

  return (
    <View className="flex-1 w-full ">
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
          </View>
        )}

        <Pressable onPress={() => pickImage("library")}>
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

        <Pressable onPress={() => pickImage("camera")}>
          <View
            style={{ width: xs(250), height: ys(200), borderWidth: 1 }}
            className="rounded-xl border-gray-300 justify-center items-center"
          >
            <View className="flex-col items-center justify-center gap-y-2">
              <EvilIcons name="camera" size={ms(32)} color="black" />
              <Text
                style={{ fontSize: ms(12), fontWeight: "inter" }}
                className="text-gray-400 font-semibold"
              >
                Take a Photo
              </Text>
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ImageUpload;
