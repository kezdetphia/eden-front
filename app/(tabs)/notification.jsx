import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import Messages from "../message";
import Notifications from "../notifications/notifications";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomText from "../../components/customText";

const NotificationScreen = () => {
  const { paddingSides, paddingTop, xsm, sm, md, lg, xl, xxl } = sizes;
  const [activeWindow, setActiveWindow] = useState("messages");
  const params = useLocalSearchParams();
  const previousWindow = params.previousWindow || null;
  const router = useRouter();
  useEffect(() => {
    if (previousWindow === "chat") {
      setActiveWindow("messages");
    }
  }, [previousWindow]);

  return (
    <View className="flex-1">
      <SafeAreaView />
      <View
        className="flex-row justify-around border-b border-gray-300 "
        style={{ paddingTop: ys(paddingTop), paddingBottom: ys(paddingTop) }}
      >
        <Pressable onPress={() => setActiveWindow("messages")}>
          <CustomText
            g200={activeWindow === "messages"}
            b300={activeWindow !== "messages"}
          >
            Messages
          </CustomText>
        </Pressable>
        <Pressable onPress={() => setActiveWindow("notifications")}>
          <CustomText
            g200={activeWindow === "notifications"}
            b300={activeWindow !== "notifications"}
          >
            Notifications
          </CustomText>
        </Pressable>
      </View>

      <View className="flex-1">
        {activeWindow === "messages" ? <Messages /> : <Notifications />}
      </View>
    </View>
  );
};

export default NotificationScreen;
