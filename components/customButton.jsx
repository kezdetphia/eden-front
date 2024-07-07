import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../constants/sizes";

const CustomButton = ({ ...props }) => {
  const { xl } = sizes;
  return (
    <Pressable
      onPress={
        // Add your onPress functionality here
        props.submit
      }
      style={{
        backgroundColor: "#69D94E",
        paddingVertical: ys(10),
        paddingHorizontal: xs(20),
        borderRadius: ms(5),
        alignItems: "center",
        justifyContent: "center",
        marginTop: ys(10),
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: ms(14),
          fontFamily: "jakartaSemibold",
          marginLeft: xs(5),
          letterSpacing: 0.3,
        }}
      >
        {props.text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
