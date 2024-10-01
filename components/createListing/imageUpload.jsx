import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Pressable,
  ScrollView,
  Alert,
  Linking,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebaseConfig"; // Adjust the path as needed
import * as ImageManipulator from "expo-image-manipulator";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import { deleteImageFromFirebaseStorage } from "../../utils/deleteImageFromFirebaseStorage";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ImageUpload = ({ user, updateListingDetails, listingDetails }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  // Update local state when listingDetails.image changes
  useEffect(() => {
    setSelectedImages(listingDetails.image || []);
  }, [listingDetails.image]);

  // Function to pick an image from camera or library
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

        // Animate the layout change
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        // Append the new image
        setSelectedImages((prevImages) => [...prevImages, resizedImageUri]);

        // Start the upload process
        await uploadImage(resizedImageUri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
      Alert.alert("Error picking image", error.message);
    }
  };

  // Function to upload the image to Firebase storage
  const uploadImage = async (uri) => {
    try {
      console.log("Starting image upload...");

      const response = await fetch(uri); // Fetch the image from the URI
      const blob = await response.blob(); // Convert the image to a blob

      const storageRef = ref(storage, `images/${Date.now()}`); // Create a storage reference
      await uploadBytes(storageRef, blob); // Upload the blob to storage

      const downloadURL = await getDownloadURL(storageRef); // Get the download URL for the image

      updateListingDetails("image", downloadURL); // Update the listing details with the image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error uploading image", error.message);
    }
  };

  const handleDeleteButtonPress = (index) => {
    const imageUrlToDelete = selectedImages[index];
    deleteImageFromFirebaseStorage(imageUrlToDelete); // Use the imported function

    // Animate the layout change
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    listingDetails.image = listingDetails.image.filter((_, i) => i !== index);
  };

  //UTILITY FUNCTIONS

  //Tap the container to choose an image upload method
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

  // Function to request permissions for accessing the camera and media library
  const requestPermissions = async () => {
    try {
      // Check and request camera permissions
      const cameraPermission = await ImagePicker.getCameraPermissionsAsync();
      console.log("Camera Permission:", cameraPermission);
      if (cameraPermission.status !== "granted") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        console.log("Requested Camera Permission Status:", status);
        if (status !== "granted") {
          Alert.alert("Camera permission is required to take photos.");
          return false;
        }
      }

      // Check and request media library permissions
      const mediaLibraryPermission =
        await ImagePicker.getMediaLibraryPermissionsAsync();
      console.log("Media Library Permission:", mediaLibraryPermission);
      if (mediaLibraryPermission.status !== "granted") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log("Requested Media Library Permission Status:", status);
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

      // Return true if both permissions are granted
      return true;
    } catch (error) {
      console.error("Error requesting permissions: ", error);
      Alert.alert("Error requesting permissions", error.message);
      return false;
    }
  };

  // Function to resize the image before uploading
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
            style={{
              width: "30%",
              height: ys(80),
            }}
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
                style={{
                  height: ys(80),
                  resizeMode: "cover",
                }}
              />
              <Pressable
                className="absolute top-2 right-2  rounded-md p-1 "
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
        <View
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        ></View>
      </View>
    </ScrollView>
  );
};

export default ImageUpload;
