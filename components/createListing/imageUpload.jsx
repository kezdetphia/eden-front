import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

const ImageUpload = ({ user, updateListingDetails }) => {
  const { xsm, sm, md, lg, xl, xxl } = sizes;
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  // Function to request permissions for accessing the camera and media library
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
        setSelectedImages((prevImages) => [...prevImages, resizedImageUri]);
        await uploadImage(resizedImageUri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
      Alert.alert("Error picking image", error.message);
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

  // Function to upload the image to Firebase storage
  const uploadImage = async (uri) => {
    try {
      console.log("Starting image upload...");

      const response = await fetch(uri); // Fetch the image from the URI
      const blob = await response.blob(); // Convert the image to a blob

      const storageRef = ref(storage, `images/${Date.now()}`); // Create a storage reference
      await uploadBytes(storageRef, blob); // Upload the blob to storage

      const downloadURL = await getDownloadURL(storageRef); // Get the download URL for the image
      console.log("Image uploaded, download URL:", downloadURL);

      updateListingDetails("image", downloadURL); // Update the listing details with the image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error uploading image", error.message);
    }
  };

  const handleImageSelectContainerClick = () => {
    Alert.alert(
      "Choose an option",
      "Where do you want to upload the image from?",
      [
        { text: "Pick from library", onPress: () => pickImage("library") },
        { text: "Take a photo", onPress: () => pickImage("camera") },
      ]
    );
  };

  const handleModalDeleteImagePress = () => {
    setIsModalOpen(true);
    console.log("Delete image");
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(selectedImageIndex, 1);
      return newImages;
    });
    setIsModalOpen(false);
  };

  console.log("Selected ImageIndex:", selectedImageIndex);
  console.log("Selected Images:", selectedImages);
  console.log("Selected Image:", selectedImage);

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
              <Pressable
                key={index}
                onPress={() => setSelectedImageIndex(index)}
              >
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
              </Pressable>
            ))}
          </View>
        </ScrollView>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        ></View>
        {selectedImage && (
          <View style={{ marginVertical: ys(10) }}>
            <Pressable
              style={{
                backgroundColor: "red",
                padding: xs(10),
                borderRadius: ms(5),
              }}
              onPress={() => {
                setSelectedImage(null); // Reset selected image
                updateListingDetails("image", null); // Remove image from listing details
              }}
            >
              <Text style={{ color: "white" }}>Remove Image</Text>
            </Pressable>
          </View>
        )}
      </View>
      <Modal
        isOpen={isModalOpen}
        text1={"Delete Image"}
        text2={"Cancel"}
        onDeletePress={() => handleModalDeleteImagePress()}
        onCancelPress={() => setIsModalOpen(false)}
      ></Modal>
    </ScrollView>
  );
};

export default ImageUpload;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   ScrollView,
//   Alert,
//   Button,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { AntDesign, EvilIcons } from "@expo/vector-icons";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "../../config/firebaseConfig"; // Adjust the path as needed
// import * as ImageManipulator from "expo-image-manipulator";
// import sizes from "../../constants/sizes";
// import {
//   scale as xs,
//   verticalScale as ys,
//   moderateScale as ms,
// } from "react-native-size-matters";
// import Modal from "./deleteImageModal";

// //TODO: fix delete image based on id

// const ImageUpload = ({ user, updateListingDetails }) => {
//   const { xsm, sm, md, lg, xl, xxl } = sizes;
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(null);

//   // Function to request permissions for accessing the camera and media library
//   const requestPermissions = async () => {
//     try {
//       const { status: cameraStatus } =
//         await ImagePicker.requestCameraPermissionsAsync();
//       const { status: mediaLibraryStatus } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
//         Alert.alert(
//           "Permissions are required to access the camera and media library."
//         );
//         return false;
//       }
//       return true;
//     } catch (error) {
//       console.error("Error requesting permissions: ", error);
//       Alert.alert("Error requesting permissions", error.message);
//       return false;
//     }
//   };

//   // Function to pick an image from camera or library
//   const pickImage = async (source) => {
//     const hasPermission = await requestPermissions();
//     if (!hasPermission) {
//       return;
//     }

//     try {
//       let result;
//       if (source === "camera") {
//         result = await ImagePicker.launchCameraAsync({
//           allowsEditing: true,
//           aspect: [4, 3],
//           quality: 1,
//         });
//       } else if (source === "library") {
//         result = await ImagePicker.launchImageLibraryAsync({
//           allowsEditing: true,
//           aspect: [4, 3],
//           quality: 1,
//         });
//       }

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         const imageUri = result.assets[0].uri;
//         const resizedImageUri = await resizeImage(imageUri); // Resize the image before uploading
//         setSelectedImage(resizedImageUri);
//         setSelectedImages((prevImages) => [...prevImages, resizedImageUri]);
//         await uploadImage(resizedImageUri);
//       }
//     } catch (error) {
//       console.error("Error picking image: ", error);
//       Alert.alert("Error picking image", error.message);
//     }
//   };

//   // Function to resize the image before uploading
//   const resizeImage = async (uri) => {
//     try {
//       const resizedImage = await ImageManipulator.manipulateAsync(
//         uri,
//         [{ resize: { width: 500, height: 500 } }], // Resize to desired dimensions
//         { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
//       );
//       return resizedImage.uri;
//     } catch (error) {
//       console.error("Error resizing image:", error);
//       throw error;
//     }
//   };

//   // Function to upload the image to Firebase storage
//   const uploadImage = async (uri) => {
//     try {
//       console.log("Starting image upload...");

//       const response = await fetch(uri); // Fetch the image from the URI
//       const blob = await response.blob(); // Convert the image to a blob

//       const storageRef = ref(storage, `images/${Date.now()}`); // Create a storage reference
//       await uploadBytes(storageRef, blob); // Upload the blob to storage

//       const downloadURL = await getDownloadURL(storageRef); // Get the download URL for the image
//       console.log("Image uploaded, download URL:", downloadURL);

//       updateListingDetails("image", (prevImages) => [
//         ...prevImages,
//         downloadURL,
//       ]); // Update the listing details with the image URL
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       Alert.alert("Error uploading image", error.message);
//     }
//   };

//   const handleImageSelectContainerClick = () => {
//     Alert.alert(
//       "Choose an option",
//       "Where do you want to upload the image from?",
//       [
//         { text: "Pick from library", onPress: () => pickImage("library") },
//         { text: "Take a photo", onPress: () => pickImage("camera") },
//       ]
//     );
//   };

//   const handleModalDeleteImagePress = () => {
//     setSelectedImages((prevImages) => {
//       const newImages = [...prevImages];
//       newImages.splice(selectedImageIndex, 1);
//       console.log("New Images Array:", newImages); // Log the new images array
//       updateListingDetails("image", newImages); // Update the listing details with the new images array
//       return newImages;
//     });
//     setIsModalOpen(false);
//   };

//   return (
//     <ScrollView>
//       <View>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={{ marginVertical: ys(10) }}
//         >
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <Pressable
//               onPress={() => handleImageSelectContainerClick()}
//               className="border-2 border-dashed border-g200 rounded-md justify-center items-center bg-white mr-2"
//               style={{
//                 width: xs(100),
//                 height: ys(80),
//               }}
//             >
//               <AntDesign name="upload" size={ms(30)} color="#4A9837" />
//             </Pressable>
//             {selectedImages.map((imageUri, index) => (
//               <Pressable
//                 key={index}
//                 onPress={() => {
//                   setSelectedImageIndex(index);
//                   setIsModalOpen(true);
//                 }}
//               >
//                 <Image
//                   source={{ uri: imageUri }}
//                   style={{
//                     width: xs(100),
//                     height: ys(80),
//                     resizeMode: "cover",
//                     borderRadius: ms(10),
//                     marginRight: xs(10),
//                   }}
//                 />
//               </Pressable>
//             ))}
//           </View>
//         </ScrollView>
//         <View
//           style={{ flexDirection: "row", justifyContent: "space-between" }}
//         ></View>
//         {selectedImage && (
//           <View style={{ marginVertical: ys(10) }}>
//             <Pressable
//               style={{
//                 backgroundColor: "red",
//                 padding: xs(10),
//                 borderRadius: ms(5),
//               }}
//               onPress={() => {
//                 setSelectedImage(null); // Reset selected image
//                 updateListingDetails("image", null); // Remove image from listing details
//               }}
//             >
//               <Text style={{ color: "white" }}>Remove Image</Text>
//             </Pressable>
//           </View>
//         )}
//       </View>
//       <Modal
//         isOpen={isModalOpen}
//         text1={"Delete Image"}
//         text2={"Cancel"}
//         onDeletePress={handleModalDeleteImagePress}
//         onCancelPress={() => setIsModalOpen(false)}
//       />
//     </ScrollView>
//   );
// };

// export default ImageUpload;
