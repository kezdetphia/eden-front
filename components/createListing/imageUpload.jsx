import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Pressable,
  ScrollView,
  Alert,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";
import * as ImageManipulator from "expo-image-manipulator";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import { deleteImageFromFirebaseStorage } from "../../utils/deleteImageFromFirebaseStorage";
import { useListing } from "../../context/listingContext";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ImageUpload = ({ user }) => {
  const { listingDetails, updateListingDetails } = useListing();
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    setSelectedImages(listingDetails.image || []);
  }, [listingDetails.image]);

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
        const resizedImageUri = await resizeImage(imageUri);
        setSelectedImages((prevImages) => [...prevImages, resizedImageUri]);
        await uploadImage(resizedImageUri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
      Alert.alert("Error picking image", error.message);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `images/${Date.now()}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      updateListingDetails("image", downloadURL);
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error uploading image", error.message);
    }
  };

  const handleDeleteButtonPress = (index) => {
    const imageUrlToDelete = selectedImages[index];
    deleteImageFromFirebaseStorage(imageUrlToDelete);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    updateListingDetails(
      "image",
      listingDetails.image.filter((_, i) => i !== index)
    );
  };

  const handleImageSelectContainerClick = () => {
    Alert.alert(
      "Select option",
      "Where do you want to upload the image from?",
      [
        { text: "Select from library", onPress: () => pickImage("library") },
        { text: "Take a photo", onPress: () => pickImage("camera") },
      ]
    );
  };

  const requestPermissions = async () => {
    try {
      const cameraPermission = await ImagePicker.getCameraPermissionsAsync();
      if (cameraPermission.status !== "granted") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Camera permission is required to take photos.");
          return false;
        }
      }

      const mediaLibraryPermission =
        await ImagePicker.getMediaLibraryPermissionsAsync();
      if (mediaLibraryPermission.status !== "granted") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Media library permission is required to select photos.",
            "Please go to Settings and enable the permission.",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Open Settings",
                onPress: () => Linking.openURL("app-settings:"),
              },
            ]
          );
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error("Error requesting permissions: ", error);
      Alert.alert("Error requesting permissions", error.message);
      return false;
    }
  };

  const resizeImage = async (uri) => {
    try {
      const resizedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 500, height: 500 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      return resizedImage.uri;
    } catch (error) {
      console.error("Error resizing image:", error);
      throw error;
    }
  };

  return (
    <ScrollView>
      <View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginVertical: ys(10),
          }}
        >
          <Pressable
            onPress={() => handleImageSelectContainerClick()}
            className="border-2 border-dashed border-g200 rounded-md justify-center items-center bg-white mr-2"
            style={{ width: "30%", height: ys(80) }}
          >
            <AntDesign name="upload" size={ms(30)} color="#4A9837" />
          </Pressable>
          {selectedImages.map((imageUri, index) => (
            <View
              key={index}
              style={{
                position: "relative",
                width: "30%",
                marginRight: "3.33%",
                marginBottom: ys(10),
              }}
            >
              <Image
                source={{ uri: imageUri }}
                className="w-full rounded-xl"
                style={{ height: ys(80), resizeMode: "cover" }}
              />
              <Pressable
                className="absolute top-2 right-2 rounded-md p-1"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  borderRadius: ms(5),
                  padding: xs(2),
                }}
                onPress={() => {
                  handleDeleteButtonPress(index);
                }}
              >
                <AntDesign name="close" size={ms(20)} color="black" />
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ImageUpload;
