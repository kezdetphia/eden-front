// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";
// import {
//   getAuth,
//   signInWithCredential,
//   GoogleAuthProvider,
// } from "firebase/auth";
// import { auth } from "../../firebaseConfig";

// WebBrowser.maybeCompleteAuthSession();

// const useGoogleAuth = () => {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId:
//       "160373057-5lh2pfh86ipomkusi8jr2g1psnpjv9ij.apps.googleusercontent.com",
//     iosClientId:
//       "160373057-5lh2pfh86ipomkusi8jr2g1psnpjv9ij.apps.googleusercontent.com",
//     // androidClientId: "YOUR_ANDROID_CLIENT_ID",
//     redirectUri: "exp://192.168.0.236:8081/--/auth",
//     javascriptOrigins: ["http://192.168.0.236:8081"],
//   });

//   const handleGoogleSignIn = async () => {
//     const result = await promptAsync();
//     if (result.type === "success") {
//       const { id_token } = result.params;
//       const credential = GoogleAuthProvider.credential(id_token);
//       await signInWithCredential(auth, credential);
//     }
//   };

//   return { request, response, handleGoogleSignIn };
// };

// export default useGoogleAuth;
