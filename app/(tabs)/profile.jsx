import { View, SafeAreaView, Text } from "react-native";
import { useRouter } from "expo-router";

// import useGoogleAuth from "../../utils/auth/googleAuth";
import { useAuth } from "../../context/authContext";
import CustomText from "../../components/customText";
import ProfileCustomHeader from "../../components/profileScreen/ProfileCustomHeader";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import ProfileMyProducts from "../../components/profileScreen/ProfileMyProducts";
import Constants from "expo-constants";
import { useEffect, useState } from "react";

export default function Profile() {
  const { EXPO_API_URL } = Constants.expoConfig.extra;
  const { paddingSides } = sizes;
  const router = useRouter();
  const { user, setIsAuthenticated, setUser } = useAuth();

  console.log("USERRR:", user);

  return (
    <>
      <SafeAreaView className="flex">
        <ProfileCustomHeader
          user={user}
          setIsAuthenticated={setIsAuthenticated}
          setUser={setUser}
        />

        <View
          className="main-container"
          style={{
            paddingHorizontal: xs(paddingSides),
            paddingTop: ys(paddingSides * 2),
          }}
        >
          <ProfileMyProducts user={user} />
        </View>
      </SafeAreaView>
    </>
  );
}
