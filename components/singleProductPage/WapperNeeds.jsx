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

const WapperNeeds = ({ productOwner }) => {
  const { subtitle, paddingSides, paddingTop } = sizes;
  return (
    <View className="DESIRE-CONTAINER flex flex-col  ">
      <Text
        className="text-b300 "
        style={{
          fontSize: ms(subtitle),
          fontFamily: "jakartaBold",
          letterSpacing: 0.3,
        }}
      >
        Swapper in lookout for: 👀
      </Text>
      <View style={{ paddingTop: ys(paddingTop) }}>
        <CategoryScroll categories={productOwner?.inNeedOf} />
      </View>
    </View>
  );
};

export default WapperNeeds;
