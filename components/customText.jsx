import React from "react";
import { Text, StyleSheet } from "react-native";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../constants/sizes";

// Define the size mapping
const sizeMapping = {
  xxxs: { fontSize: ms(sizes.xxxs), lineHeight: ms(sizes.xxxs * 1.25) },
  xs: { fontSize: ms(sizes.xs), lineHeight: ms(sizes.xs * 1.25) },
  xxs: { fontSize: ms(sizes.xxs), lineHeight: ms(sizes.xxs * 1.25) },
  xsm: { fontSize: ms(sizes.xsm), lineHeight: ms(sizes.xsm * 1.25) },
  sm: { fontSize: ms(sizes.sm), lineHeight: ms(sizes.sm * 1.25) },
  md: { fontSize: ms(sizes.md), lineHeight: ms(sizes.md * 1.25) },
  lg: { fontSize: ms(sizes.lg), lineHeight: ms(sizes.lg * 1.25) },
  xl: { fontSize: ms(sizes.xl), lineHeight: ms(sizes.xl * 1.25) },
  xxl: { fontSize: ms(sizes.xxl), lineHeight: ms(sizes.xxl * 1.25) },
  title: { fontSize: ms(sizes.title), lineHeight: ms(sizes.title * 1.25) },
  subtitle: {
    fontSize: ms(sizes.subtitle),
    lineHeight: ms(sizes.subtitle * 1.25),
  },
};

// Define the color mapping
const colorMapping = {
  black: "#020202",
  white: "#FFFFFF",
  orange: "#FF6B00",
  b50: "#E6E6E6",
  b75: "#979797",
  b100: "#6C6C6C",
  b200: "#2D2D2D",
  b300: "#020202",
  g50: "#F0FBED",
  g75: "#C2EFB6",
  g200: "#83DF6C",
  g300: "#69D94E",
  g400: "#4A9837",
  selectButtonGreen: "#4A4A4A",
};

const CustomText = ({ style, semibold, bold, children, ...props }) => {
  // Determine the font family based on the semibold and bold props
  let fontFamily = styles.defaultText.fontFamily;
  if (semibold) {
    fontFamily = "jakartaSemibold";
  } else if (bold) {
    fontFamily = "jakartaBold";
  }

  // Determine the font size and line height based on the size prop
  const sizeKey = Object.keys(sizeMapping).find((key) => props[key]);
  const textStyle = sizeMapping[sizeKey] || {};

  // Determine the color based on the color prop
  const colorKey = Object.keys(colorMapping).find((key) => props[key]);
  const textColor = colorMapping[colorKey] || styles.defaultText.color;

  return (
    <Text
      style={[
        styles.defaultText,
        style,
        { color: textColor, fontFamily, ...textStyle },
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "jakarta",
    letterSpacing: 0.3,
    color: "#2D2D2D",
    fontSize: ms(14), // Default font size
    lineHeight: ms(20), // Default line height
  },
});

export default CustomText;
