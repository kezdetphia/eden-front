import firebase from "firebase/compat/app";
import "firebase/storage";
import "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAfAcEw6tZjoxN3B2pxipBcAMpXAYNR1XU",
  authDomain: "corpswap-imageupload.firebaseapp.com",
  projectId: "corpswap-imageupload",
  storageBucket: "corpswap-imageupload.appspot.com",
  messagingSenderId: "684535271927",
  appId: "1:684535271927:web:f37ead9401810cb1e11ef2",
  measurementId: "G-SQ6NWJNT91",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
