import {
  TextInput,
  Pressable,
  View,
  Platform,
  Animated,
  Text,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../../context/authContext";
import LottieView from "lottie-react-native";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../../constants/sizes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import CustomText from "../../../components/customText";

const SignIn = () => {
  const { EXPO_API_URL } = Constants.expoConfig.extra;
  const { paddingTop, paddingSides, title, subtitle } = sizes;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUserInfo } = useAuth();

  const showToast = (message) => {
    console.log("toasmessage", message);
    if (message === "Successful login") return;
    Toast.show({
      topOffset: 60,
      type: "error",
      text1: "Error",
      text2: message,
    });
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      // const authHeader = req.headers["authorization"];
      const res = await fetch("http://localhost:3000/api/users/signin", {
        // const res = await fetch(`${EXPO_API_URL}/api/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: authHeader,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("sgin in data", data);
      setErrorMessage(data.message);
      showToast(data.message);
      if (res.status === 200) {
        await SecureStore.setItemAsync("authToken", data.token);
        await setUserInfo(data.userData);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
      showToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid =
    isEmailValid(formData.email) && formData.password.length > 6;

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={Platform.OS === "ios" ? ms(30) : 0}
      // extraHeight={150}
      scrollEventThrottle={ms(16)}
    >
      <View
        className="flex-1 items-center bg-white "
        style={{ paddingHorizontal: xs(paddingSides * 1.5) }}
      >
        <LottieView
          style={{ height: 200, width: 200, marginTop: ys(paddingTop * 2.5) }}
          source={require("../../../assets/icons/signin.json")}
          autoPlay
          loop
          onError={(error) => console.log("Lottie error:", error)} // Add error logging
        />
        <CustomText
          bold
          b300
          style={{ fontSize: title * 1.5, paddingTop: ys(paddingTop) }}
        >
          Hey Swapper!
        </CustomText>
        {/* <Text
          className="text-b300"
          style={{
            fontSize: title * 1.5,
            fontFamily: "jakartaBold",
            letterSpacing: 0.3,
            // paddingTop: ys(paddingTop),
          }}
        >
          Hey Swapper!
        </Text> */}
        <CustomText
          bold
          b300
          style={{
            fontSize: subtitle * 1.5,
            paddingTop: ys(paddingTop),
          }}
        >
          Sign In
        </CustomText>
        <TextInput
          value={formData.email}
          onChangeText={(text) => handleInputChange("email", text)}
          className="w-full p-3  bg-white rounded-lg border border-b50"
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          style={{
            fontFamily: "jakarta",
            marginBottom: ys(paddingTop * 1.5),
            marginTop: ys(paddingTop * 3),
          }}
        />
        <TextInput
          value={formData.password}
          onChangeText={(text) => handleInputChange("password", text)}
          className="w-full p-3 mb-6 bg-white rounded-lg border border-b50"
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          secureTextEntry
        />
        <View className="w-full" style={{ paddingTop: ys(paddingTop / 2) }}>
          <Pressable
            onPress={handleSignIn}
            style={{
              backgroundColor: "#69D94E",
              paddingVertical: ys(10),
              paddingHorizontal: xs(20),
              borderRadius: ms(5),
              alignItems: "center",
              justifyContent: "center",
              marginTop: ys(10),
              flexDirection: "row",
              opacity: isLoading || !isFormValid ? 0.7 : 1,
            }}
            disabled={!isFormValid}
          >
            <CustomText semibold white sm>
              {isLoading ? "Signing in.." : "Sign In"}
            </CustomText>
          </Pressable>
        </View>
        <Pressable onPress={() => router.push("SignUp")}>
          <CustomText
            sm
            b100
            style={{
              paddingTop: ys(paddingTop),
            }}
          >
            Don't have an account yet?{"  "}
            <CustomText semibold g300 sm>
              Sign Up!
            </CustomText>
          </CustomText>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;
