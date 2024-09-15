import { View, Text } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import CustomText from "../customText";

const PriceQuantityCard = ({ quantity, price, tier }) => {
  const { sm } = sizes;
  return (
    <>
      <View
        className="bg-g300  rounded-lg items-center  justify-center  "
        style={{ paddingHorizontal: xs(40), paddingVertical: ys(12) }}
      >
        {tier === "Exchange" ? (
          <CustomText sm white bold>
            Offer Me!
          </CustomText>
        ) : tier === "Free" ? (
          <CustomText sm white bold>
            Yay, Its free!
          </CustomText>
        ) : (
          <View className=" items-center  justify-center ">
            <CustomText sm white bold>
              ${price}
            </CustomText>
            <CustomText xxs white>
              Price
            </CustomText>
          </View>
        )}
      </View>
      <View
        className="bg-g300  rounded-lg items-center  justify-center "
        style={{ paddingHorizontal: xs(55), paddingVertical: ys(12) }}
      >
        <CustomText sm white bold>
          {quantity}
        </CustomText>
        <CustomText xxs white>
          Available
        </CustomText>
      </View>
    </>
  );
};

export default PriceQuantityCard;
