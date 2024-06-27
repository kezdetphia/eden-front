import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import CategoryScroll from "../homescreen/CategoryScroll";
import sizes from "../../constants/sizes";

const WapperNeeds = ({ product }) => {
  const { xxs, xsm, sm, md, lg, xl } = sizes;
  return (
    <View
      className="DESIRE-CONTAINER flex flex-col  "
      style={{ paddingHorizontal: xs(xxs) }}
    >
      <View
        className=""
        style={{ paddingHorizontal: xs(xxs), paddingBottom: ys(5) }}
      >
        <Text
          className="font-bold "
          style={{ fontSize: ms(md), fontFamily: "poppins" }}
        >
          Swapper in lookout for: 👀
        </Text>
      </View>
      <View className=" " style={{ paddingBottom: ys(xsm) }}>
        <CategoryScroll categories={product?.owner?.inNeedOf} />
      </View>
    </View>
  );
};

export default WapperNeeds;
