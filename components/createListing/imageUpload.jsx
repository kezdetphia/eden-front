import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../config/firebaseConfig"; // Adjust the path as needed
import * as ImageManipulator from "expo-image-manipulator";
import sizes from "../../constants/sizes";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import Modal from "./deleteImageModal";

//TODO: fix delete image based on id

const ImageUpload = ({ user, updateListingDetails, listingDetails }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  // const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

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
        console.log("selectedImage in pickimage", selectedImage);
        setSelectedImages((prevImages) => [...prevImages, resizedImageUri]);
        console.log("selectedImages in pickimage", selectedImages);
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
      console.log("Image uploaded, download URL in uploadImage:", downloadURL);

      updateListingDetails("image", downloadURL); // Update the listing details with the image URL
      console.log("listingDetails in uploadImage", listingDetails?.image);
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error uploading image", error.message);
    }
  };
  console.log("listingDetails after uploadImage", listingDetails?.image);
  // console.log("selectedImage Index", selectedImageIndex);

  // Function to delete the image from Firebase storage
  const deleteImageFromStorage = async (url) => {
    try {
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
      console.log("Image deleted from Firebase Storage:", url);
    } catch (error) {
      console.error("Error deleting image from Firebase Storage:", error);
      Alert.alert("Error deleting image from Firebase Storage", error.message);
    }
  };

  const handleDeleteButtonPress = (index) => {
    const imageUrlToDelete = selectedImages[index];
    deleteImageFromStorage(imageUrlToDelete); // Delete the image from Firebase Storage

    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    listingDetails.image = listingDetails.image.filter((_, i) => i !== index);
  };

  //UTILITY FUNCTIONS

  //Tap the container to choose an image upload method
  const handleImageSelectContainerClick = () => {
    Alert.alert(
      "Choose an option",
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: ys(10) }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
              onPress={() => handleImageSelectContainerClick()}
              className="border-2 border-dashed border-g200 rounded-md justify-center items-center bg-white mr-2"
              style={{
                width: xs(100),
                height: ys(80),
              }}
            >
              <AntDesign name="upload" size={ms(30)} color="#4A9837" />
            </Pressable>
            {selectedImages.map((imageUri, index) => (
              <View key={index} style={{ position: "relative" }}>
                {/* <Pressable
                  onPress={() => {
                    setSelectedImageIndex(index);
                    // setIsModalOpen(true);
                  }}
                > */}
                <Image
                  source={{ uri: imageUri }}
                  style={{
                    width: xs(100),
                    height: ys(80),
                    resizeMode: "cover",
                    borderRadius: ms(10),
                    marginRight: xs(10),
                  }}
                />
                {/* </Pressable> */}
                <Pressable
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 15,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: ms(5),
                    padding: xs(2),
                  }}
                  onPress={() => {
                    handleDeleteButtonPress(index);

                    // handleModalDeleteImagePress();
                  }}
                >
                  <AntDesign name="close" size={ms(20)} color="red" />
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        ></View>
        {/* {selectedImage && (
          <View style={{ marginVertical: ys(10) }}>
            <Pressable
              style={{
                backgroundColor: "red",
                padding: xs(10),
                borderRadius: ms(5),
              }}
              onPress={() => {
                updateListingDetails("image", null); // Remove image from listing details
                setSelectedImage(null); // Reset selected image
              }}
            >
              <Text style={{ color: "white" }}>Remove Image</Text>
            </Pressable>
          </View>
        )} */}
      </View>
      {/* <Modal
        isOpen={isModalOpen}
        text1={"Delete Image"}
        text2={"Cancel"}
        onDeletePress={() => handleModalDeleteImagePress()}
        onCancelPress={() => setIsModalOpen(false)}
      /> */}
    </ScrollView>
  );
};

export default ImageUpload;
