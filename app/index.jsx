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
import CustomText from "../components/customText";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { paddingSides, paddingTop, title } = sizes;

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("home");
    }
  }, [isAuthenticated, router]);

  return (
    <SafeAreaView className="flex-1 bg-grayb">
      <View
        className="bg-grayb flex-1 justify-around"
        style={{
          paddingHorizontal: xs(paddingSides),
        }}
      >
        <StatusBar hidden={true} />

        <View className="items-center ">
          {/* <CustomText
            bold
            g300
            style={{
              fontSize: ms(title * 1.5),
            }}
          >
            Eden
          </CustomText> */}

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
            <CustomText semibold white>
              Continue with Apple
            </CustomText>
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
            <CustomText semibold black>
              Sign In with Google
            </CustomText>
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
            <CustomText semibold black>
              Sign In with Google
            </CustomText>
          </Pressable>
          <CustomText
            sm
            b200
            style={{ paddingTop: ys(paddingTop), textAlign: "center" }}
          >
            or
          </CustomText>

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
            <CustomText semibold white>
              Sign up with email
            </CustomText>
          </Pressable>

          <Pressable onPress={() => router.push("SignIn")}>
            <CustomText
              sm
              b100
              style={{ paddingTop: ys(paddingTop * 0.7), textAlign: "center" }}
            >
              {" "}
              Already have an account?{"  "}
              <CustomText sm g300 semibold>
                Sign In!
              </CustomText>
            </CustomText>
          </Pressable>
          <View
            className="items-center"
            style={{ paddingTop: ys(paddingTop * 2) }}
          >
            <CustomText xxxs b100>
              By continuing you agree to our Terms of Condition.
            </CustomText>
            <CustomText xxxs b100>
              Eden services are subject to our Privacy Policy.
            </CustomText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
