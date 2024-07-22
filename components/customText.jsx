import React from "react";
import { Text, StyleSheet } from "react-native";

const CustomText = ({ style, ...props }) => {
  return <Text style={[styles.defaultText, style]} {...props} />;
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "jakarta",
    letterSpacing: 0.3,
    color: "#2D2D2D",
  },
});

export default CustomText;
