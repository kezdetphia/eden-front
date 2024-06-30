import { View, Text } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../constants/sizes";

const { paddingSides, xsm, sm, md, lg, xl, xxl } = sizes;

const SecondaryPill = ({ props }) => {
  return (
    <View
      className={` bg-g50
                rounded-md flex-row items-center `}
      style={{
        paddingHorizontal: ms(md),
        paddingVertical: ys(2),
      }}
    >
      <Text
        className="text-g400"
        style={{
          fontSize: ms(sm),
          fontFamily: "jakarta",
          letterSpacing: 0.3,
        }}
      >
        {props}
      </Text>
    </View>
  );
};

export default SecondaryPill;
