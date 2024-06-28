import { View, Text, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
// import useGoogleAuth from "../../utils/auth/googleAuth";
import { useState } from "react";

export default function Test() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  // const { handleGoogleSignIn } = useGoogleAuth();

  const deleteToken = async () => {
    try {
      await SecureStore.deleteItemAsync("authToken");
      await SecureStore.deleteItemAsync("user");
      console.log("Token deleted successfully from secure store");
      console.log("User deleted successfully from secure store");
    } catch (error) {
      console.error("Failed to delete token:", error);
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-red-200">
      <Button title="Test" onPress={() => router.push("/(auth)/SignIn")} />
      <Button title="Logout" onPress={() => deleteToken()} />
      {/* <View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
        </View>
      </View> */}
    </View>
  );
}
