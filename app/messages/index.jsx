import { View, Text } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";

const Messages = () => {
  const { paddingSides, xsm, sm, md, lg, xl, xxl } = sizes;
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Messages</Text>
    </View>
  );
};

export default Messages;
