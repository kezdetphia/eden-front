import { View, Text } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";

const ProductDesc = ({ desc }) => {
  const { paddingTop, paddingSides, sm, subtitle } = sizes;
  return (
    <View>
      <Text
        className="text-b300"
        style={{
          fontSize: ms(subtitle),
          fontFamily: "jakartaBold",
        }}
      >
        Description
      </Text>
      <Text
        className="text-b200 "
        style={{
          fontFamily: "jakarta",
          paddingTop: ys(7),
          letterSpacing: 0.3,
        }}
      >
        {desc}
      </Text>
    </View>
  );
};

export default ProductDesc;
