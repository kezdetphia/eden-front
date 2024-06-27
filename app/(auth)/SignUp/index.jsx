import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  Pressable,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useAuth } from "../../../context/authContext";

const SignUp = () => {
  const { isAuthenticated, user } = useAuth();
  console.log("isAuthenticated", isAuthenticated, user);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (errorMessage === "User registered successfully");
  }, [errorMessage]);

  const showToast = (message) => {
    if (message === "User registered successfully") return;
    Toast.show({
      topOffset: 60,
      type: "error",
      text1: "Error",
      text2: message,
    });
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setErrorMessage(data.message);
      showToast(data.message);
      if (res.status === 201) {
        router.replace("SignIn");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
      showToast(data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid =
    formData.username &&
    isEmailValid(formData.email) &&
    formData.password.length > 6;

  if (isAuthenticated) {
    router.replace("home");
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-6 text-gray-800">Sign Up</Text>
      <TextInput
        value={formData.username}
        onChangeText={(text) => handleInputChange("username", text)}
        className="w-full p-3 mb-4 bg-white rounded-lg border border-gray-300"
        placeholder="Username"
        placeholderTextColor="#9CA3AF"
      />
      <TextInput
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        className="w-full p-3 mb-4 bg-white rounded-lg border border-gray-300"
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        value={formData.password}
        onChangeText={(text) => handleInputChange("password", text)}
        className="w-full p-3 mb-6 bg-white rounded-lg border border-gray-300"
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        value={formData.passwordRepeat}
        onChangeText={(text) => handleInputChange("passwordRepeat", text)}
        className="w-full p-3 mb-6 bg-white rounded-lg border border-gray-300"
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        autoCapitalize="none"
      />
      <Pressable
        className={`w-full p-3 rounded-lg ${
          // isLoading || !isFormValid ? "bg-blue-500" : "bg-blue-600"
          "bg-blue-500"
        }`}
        onPress={handleSignUp}
        disabled={!isFormValid}
        style={{ opacity: isLoading || !isFormValid ? 0.7 : 1 }}
      >
        <Text className="text-center text-white font-semibold">
          {isLoading ? "Signing up.." : "Sign Up"}
        </Text>
      </Pressable>
      <Text>Have an account already? </Text>
      <Pressable onPress={() => router.push("SignIn")}>
        <Text>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
