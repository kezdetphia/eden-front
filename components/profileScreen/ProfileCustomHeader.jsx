import { View, SafeAreaView, Image, Pressable, Alert } from "react-native"; // Import Image from react-native
import { StatusBar } from "expo-status-bar";

import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { Entypo } from "@expo/vector-icons";
import CustomText from "../customText";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SecureStore from "expo-secure-store";

export default function ProfileCustomHeader({
  user,
  setIsAuthenticated,
  setUser,
}) {
  const { sm, paddingSides } = sizes;

  const showLogoutAlert = () => {
    Alert.alert(
      "Logout", // Title of the alert
      "Are you sure you want to logout?", // Message of the alert
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel", // You can add style for Cancel
        },
        {
          text: "OK",
          onPress: () => deleteToken(),
        },
      ],
      { cancelable: false } // Disable canceling by tapping outside the alert
    );
  };

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
    <>
      <StatusBar hidden={false} />
      <SafeAreaView style={{ backgroundColor: "transparent" }}>
        <View
          className="flex flex-row justify-between"
          style={{
            paddingTop: ys(sm),
            paddingHorizontal: xs(paddingSides),
          }}
        >
          <View>
            <View className="flex flex-row">
              <CustomText xl> Hi,</CustomText>

              <CustomText bold xl b200>
                {" "}
                {user?.username?.charAt(0).toUpperCase() +
                  user.username.slice(1)}
              </CustomText>
            </View>
            <View
              className="flex-row items-center"
              style={{ paddingTop: ys(4) }}
            >
              <Entypo
                className="pr-1"
                name="location-pin"
                size={ms(16)}
                color="#69D94E"
              />
              <CustomText b100>{user?.location}</CustomText>
            </View>
          </View>

          <View className="flex flex-row items-center">
            <Pressable onPress={showLogoutAlert}>
              <AntDesign name="logout" size={24} color="black" />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            top: ys(sm),
            left: "50%",
            transform: [{ translateX: -25 }],
          }}
        >
          <Image
            className="rounded-xl"
            source={
              user?.avatar
                ? { uri: user.avatar }
                : require("../../assets/images/avatar.png")
            }
            style={{ width: 50, height: 50 }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
