import { View } from "react-native";
import React from "react";
import { verticalScale as ys } from "react-native-size-matters";
import CategoryScroll from "../homescreen/CategoryScroll";
import sizes from "../../constants/sizes";
import CustomText from "../customText";

const WapperNeeds = ({ productOwner }) => {
  const { paddingTop } = sizes;
  return (
    <View className="DESIRE-CONTAINER flex flex-col  ">
      <CustomText b300 subtitle bold>
        Swapper in lookout for: 👀
      </CustomText>
      <View style={{ paddingTop: ys(paddingTop) }}>
        <CategoryScroll categories={productOwner?.inNeedOf} />
      </View>
    </View>
  );
};

export default WapperNeeds;
