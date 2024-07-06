import { View, Text, Pressable, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect } from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../constants/sizes";
import { useAuth } from "../context/authContext";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

const index = () => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("home");
    }
  }, [isAuthenticated, router]);

  const { paddingSides, paddingTop, title } = sizes;
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
            Greenz
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
            onPress={null}
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
              Continue with Google
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

export default index;
