import { View, Text, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
// import useGoogleAuth from "../../utils/auth/googleAuth";
import { useState } from "react";
import { useAuth } from "../../context/authContext";

export default function Test() {
  const router = useRouter();
  const { user, setIsAuthenticated, setUser } = useAuth();
  // const [user, setUser] = useState(null);
  // const { handleGoogleSignIn } = useGoogleAuth();

  const deleteToken = async () => {
    try {
      await SecureStore.deleteItemAsync("authToken");
      await SecureStore.deleteItemAsync("user");
      setIsAuthenticated(false);
      setUser(undefined);

      console.log("Token deleted successfully from secure store");
      console.log("User deleted successfully from secure store");
      console.log("User set to undefined");
    } catch (error) {
      console.error("Failed to delete token:", error);
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-red-200">
      <Button title="Test" onPress={() => router.push("/(auth)/SignIn")} />
      <Button title="Logout" onPress={() => deleteToken()} />
    </View>
  );
}

// import { Text, View } from "react-native";
// import { useAuth } from "../../context/authContext";
// import { useEffect, useState } from "react";
// const Chatt = () => {
//   const [convos, setConvos] = useState();
//   const { user } = useAuth();
//   // const userId = user?._id;

//   useEffect(() => {
//     getMyConvos();
//   }, []);

//   const getMyConvos = async () => {
//     try {
//       const res = await fetch(`http://192.168.0.236:3000/message/${user._id}`);
//       if (!res.ok) {
//         console.log("getMyConvos res not ok");
//       }
//       const data = await res.json();
//       console.log("this is data from getMyConvos", data);
//       setConvos(data);
//     } catch (err) {
//       console.log("getMyConvos error", err);
//     }
//   };

//   const notMe = convos?.flatMap((convo) =>
//     convo.participants?.filter((participant) => participant !== user?._id)
//   );
//   console.log("NOT ME", notMe);
//   const lastMessages = convos?.map((convo) => {
//     const lastMessage = convo.messages[convo.messages.length - 1];
//     return {
//       from: lastMessage.from,
//       message: lastMessage.message,
//       timestamp: lastMessage.timestamp,
//     };
//   });

//   console.log("Last Messages", lastMessages);

//   return (
//     <View className="flex-1 justify-center items-center">
//       <Text>{convos?.length}</Text>
//       {lastMessages?.map((lastMessage, index) => (
//         <View key={index}>
//           <Text>From: {lastMessage.from}</Text>
//           <Text>Message: {lastMessage.message}</Text>
//           <Text>timestamp: {lastMessage.message}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// export default Chatt;
