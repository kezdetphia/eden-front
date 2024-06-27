import { View, Text } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";

const ProductDesc = ({ product }) => {
  const { xsm, sm, md, lg, xl, xxl } = sizes;
  return (
    <View className="" style={{ gap: ys(6) }}>
      <View>
        <Text
          className=" font-bold"
          style={{ fontSize: ms(md), fontFamily: "poppins" }}
        >
          Description
        </Text>
      </View>
      <View>
        {/* <Text>{product?.description}</Text> */}
        <Text style={{ fontSize: ms(sm), fontFamily: "poppins" }}>
          {product?.desc}
        </Text>
      </View>
    </View>
  );
};

export default ProductDesc;
