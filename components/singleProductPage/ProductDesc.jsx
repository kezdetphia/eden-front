import { View, Text } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import CustomText from "../customText";

const ProductDesc = ({ desc }) => {
  const { paddingTop, paddingSides, sm, subtitle } = sizes;
  return (
    <View>
      <CustomText b300 subtitle bold>
        Description
      </CustomText>
      <CustomText
        b200
        style={{
          paddingTop: ys(7),
        }}
      >
        {desc}
      </CustomText>
    </View>
  );
};

export default ProductDesc;
