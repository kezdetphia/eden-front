import { storage } from "../config/firebaseConfig";
import { ref, deleteObject } from "firebase/storage";

export const deleteImageFromFirebaseStorage = async (url) => {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
    console.log("Image deleted from Firebase Storage:", url);
  } catch (error) {
    console.error("Error deleting image from Firebase Storage:", error);
    Alert.alert("Error deleting image from Firebase Storage", error.message);
  }
};
