// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAlf0XWXAL2lErvWVgjhbCRF2pKtaEWYk",
  // authDomain: "com.feher.eden.firebaseapp.com", // Typically, this is in the format: "your-project-id.firebaseapp.com"
  authDomain: "eden-e5729.firebaseapp.com",
  projectId: "eden-e5729",
  storageBucket: "eden-e5729.appspot.com",
  messagingSenderId: "530687212969",
  appId: "1:530687212969:ios:2eeeb44bcf86e2560318b8",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
