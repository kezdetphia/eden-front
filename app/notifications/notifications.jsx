import { View, Text } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import CustomText from "../../components/customText";

const Notifications = () => {
  const { paddingSides, paddingTop, title, subtitle } = sizes;
  return (
    <View>
      <CustomText>Notifications</CustomText>
    </View>
  );
};

export default Notifications;
