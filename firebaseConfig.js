import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPUwQcuEZrEM6XX4EhXCQ7vKryNr3pxGI",
  authDomain: "greenz-f77f2.firebaseapp.com",
  projectId: "greenz-f77f2",
  storageBucket: "greenz-f77f2.appspot.com",
  messagingSenderId: "23358689670",
  appId: "1:23358689670:ios:56532ffd76daa80fb55c07",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
