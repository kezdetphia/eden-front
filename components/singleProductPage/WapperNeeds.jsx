import { View } from "react-native";
import React from "react";
import { verticalScale as ys } from "react-native-size-matters";
import CategoryScroll from "../homescreen/CategoryScroll";
import sizes from "../../constants/sizes";
import CustomText from "../customText";

const WapperNeeds = ({ exchangingFor }) => {
  const { paddingTop } = sizes;
  return (
    <View className="DESIRE-CONTAINER flex flex-col  ">
      <CustomText b300 subtitle bold>
        Swapper is looking for: 👀
      </CustomText>
      {exchangingFor && (
        <View style={{ paddingTop: ys(paddingTop) }}>
          <CategoryScroll
            // categories={productOwner?.inNeedOf}
            ownerNeedsForThisProduct={exchangingFor}
          />
        </View>
      )}
    </View>
  );
};

export default WapperNeeds;
