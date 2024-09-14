import { View, Text } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../constants/sizes";
import CustomText from "./customText";

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
      <CustomText g400 sm className="text-g400">
        {props}
      </CustomText>
    </View>
  );
};

export default SecondaryPill;
