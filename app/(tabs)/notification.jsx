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
import { useLocalSearchParams } from "expo-router";

const NotificationScreen = () => {
  const { paddingSides, paddingTop, xsm, sm, md, lg, xl, xxl } = sizes;
  const [activeWindow, setActiveWindow] = useState("messages");
  const params = useLocalSearchParams();
  const previousWindow = params.previousWindow || null;

  useEffect(() => {
    if (previousWindow === "chat") {
      setActiveWindow("messages");
    }
  }, []);

  return (
    <View className="flex-1">
      <SafeAreaView />
      <View
        className="flex-row justify-around"
        style={{ paddingTop: ys(paddingTop) }}
      >
        <Pressable onPress={() => setActiveWindow("messages")}>
          <Text
            style={styles.text}
            className={`${
              activeWindow === "messages" ? "text-g200 " : "text-b300"
            }`}
          >
            Messages
          </Text>
        </Pressable>
        <Pressable onPress={() => setActiveWindow("notifications")}>
          <Text
            style={styles.text}
            className={`${
              activeWindow === "notifications" ? "text-g200" : "text-b300"
            }`}
          >
            Notifications
          </Text>
        </Pressable>
      </View>

      <View className="flex-1">
        {activeWindow === "messages" ? <Messages /> : <Notifications />}
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  text: {
    fontFamily: "jakarta",
    letterSpacing: 0.3,
  },
});
