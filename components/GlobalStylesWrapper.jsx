import React from "react";
import { View } from "react-native";

const GlobalStylesWrapper = ({ children }) => {
  return <View className=" flex-1 bg-white text-">{children}</View>;
};

export default GlobalStylesWrapper;
