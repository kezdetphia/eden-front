import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Test() {
  const router = useRouter();

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
    </View>
  );
}
