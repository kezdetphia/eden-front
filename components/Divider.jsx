import { View } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";

const Divider = ({ customStyle }) => {
  return <View className="border-t border-gray-300 " style={customStyle} />;
};

export default Divider;
