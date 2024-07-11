import { View, Text, Pressable, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../constants/sizes";
import { useAuth } from "../context/authContext";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { paddingSides, paddingTop, title } = sizes;

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("home");
    }
  }, [isAuthenticated, router]);

  // const [userInfo, setUserInfo] = useState(null);
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   androidClientId:
  //   iosClientId:
  // });

  // const handleSignInWithGoggle = async () => {
  //   const user = await SecureStore.getItem("@user");
  //   if (!user) {
  //     if (response?.type === "success") {
  //       await getUserInfo(response.authentication.accessToken);
  //     }
  //   } else {
  //     setUserInfo(JSON.parse(user));
  //   }
  // };

  // const getUserInfo = async (token) => {
  //   if (!token) return;
  //   try {
  //     const response = await fetch(
  //       `https://www.googleapis.com/userinfo/v2/me`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const user = await response.json();
  //     console.log(user);
  //     await SecureStore.setItem("@user", JSON.stringify(user));
  //     setUserInfo(user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   handleSignInWithGoggle();
  // }, [response]);

  // console.log("user info", userInfo);

  return (
    <SafeAreaView className="flex-1 bg-grayb">
      <View
        className="bg-grayb flex-1 justify-around"
        style={{
          paddingHorizontal: xs(paddingSides),
        }}
      >
        <StatusBar hidden={true} />

        <View className="items-center">
          <Text
            className="text-g300"
            style={{
              fontFamily: "jakartaBold",
              fontSize: ms(title * 1.5),
              letterSpacing: 0.3,
            }}
          >
            Eden
          </Text>
          <LottieView
            style={{ height: 200, width: 200, marginTop: ys(paddingTop * 1) }}
            source={require("../assets/icons/signin.json")}
            autoPlay
            loop
            onError={(error) => console.log("Lottie error:", error)}
          />
        </View>
        <View></View>
        <View className="w-full" style={{ paddingTop: ys(null) }}>
          <Pressable
            onPress={null}
            style={{
              backgroundColor: "black",
              paddingVertical: ys(10),
              paddingHorizontal: xs(20),
              borderRadius: ms(5),
              alignItems: "center",
              justifyContent: "center",
              marginTop: ys(10),
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: ms(14),
                fontFamily: "jakartaSemibold",
                letterSpacing: 0.3,
              }}
            >
              Continue with Apple
            </Text>
          </Pressable>
          <Pressable
            onPress={() => promptAsync()}
            style={{
              backgroundColor: "FFF",
              paddingVertical: ys(10),
              paddingHorizontal: xs(20),
              borderRadius: ms(5),
              alignItems: "center",
              justifyContent: "center",
              marginTop: ys(10),
              flexDirection: "row",
              borderColor: "black",
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: ms(14),
                fontFamily: "jakartaSemibold",
                letterSpacing: 0.3,
              }}
            >
              Sign In with Google
            </Text>
          </Pressable>
          <Pressable
            // onPress={handleSignIn}
            style={{
              backgroundColor: "FFF",
              paddingVertical: ys(10),
              paddingHorizontal: xs(20),
              borderRadius: ms(5),
              alignItems: "center",
              justifyContent: "center",
              marginTop: ys(10),
              flexDirection: "row",
              borderColor: "black",
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: ms(14),
                fontFamily: "jakartaSemibold",
                letterSpacing: 0.3,
              }}
            >
              Sign In with Google
            </Text>
          </Pressable>
          <Text
            style={{
              fontSize: ms(12),
              fontFamily: "jakarta",
              letterSpacing: 0.3,
              paddingTop: ys(paddingTop),
            }}
            className="text-center text-b200"
          >
            or
          </Text>

          <Pressable
            onPress={() => router.push("SignUp")}
            style={{
              backgroundColor: "#69D94E",
              paddingVertical: ys(10),
              paddingHorizontal: xs(20),
              borderRadius: ms(5),
              alignItems: "center",
              justifyContent: "center",
              marginTop: ys(10),
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: ms(14),
                fontFamily: "jakartaSemibold",
                letterSpacing: 0.3,
              }}
            >
              Sign up with email
            </Text>
          </Pressable>
          <Pressable onPress={() => router.push("SignIn")}>
            <Text
              className="text-b100 text-center"
              style={{
                paddingTop: ys(paddingTop * 0.7),
                fontFamily: "jakarta",
                letterSpacing: 0.3,
              }}
            >
              Already have an account?{"  "}
              <Text
                style={{
                  fontFamily: "jakartaSemibold",
                  letterSpacing: 0.3,
                }}
                className="text-g300"
              >
                Sign In!
              </Text>
            </Text>
          </Pressable>
          <View
            className="items-center"
            style={{ paddingTop: ys(paddingTop * 2) }}
          >
            <Text
              className="text-b100"
              style={{
                fontFamily: "jakarta",
                fontSize: ms(8),
              }}
            >
              By continuing you agree to our Terms of Condition.
            </Text>
            <Text
              className="text-b100"
              style={{
                fontFamily: "jakarta",
                fontSize: ms(8),
              }}
            >
              Greenz services are subject to our Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
