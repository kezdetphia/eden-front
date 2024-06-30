import { View, Text } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";

const PriceQuantityCard = ({ quantity, price, tier }) => {
  const { paddingSides, xsm, sm, md, lg, xl, xxl } = sizes;
  return (
    <>
      <View
        className="bg-g300  rounded-lg items-center  justify-center "
        style={{ paddingHorizontal: xs(55), paddingVertical: ys(12) }}
      >
        <Text
          style={{ fontSize: ms(sm), fontFamily: "jakartaBold" }}
          className="text-white"
        >
          {quantity} lb
        </Text>
        <Text
          style={{ fontSize: ms(10), fontFamily: "jakarta" }}
          className="text-white"
        >
          Available
        </Text>
      </View>

      <View
        className="bg-g300  rounded-lg items-center  justify-center "
        style={{ paddingHorizontal: xs(40), paddingVertical: ys(12) }}
      >
        {tier === "Exchange" ? (
          <Text
            style={{
              fontSize: ms(sm),
              fontFamily: "jakartaBold",
              letterSpacing: 0.3,
            }}
            className="text-white"
          >
            Offer Me!
          </Text>
        ) : tier === "Free" ? (
          <Text
            style={{
              fontSize: ms(sm),
              fontFamily: "jakartaBold",
              letterSpacing: 0.3,
            }}
            className="text-white"
          >
            Yay, Its free!
          </Text>
        ) : (
          <View className=" items-center  justify-center ">
            <Text
              style={{
                fontSize: ms(sm),
                fontFamily: "jakartaBold",
                letterSpacing: 0.3,
              }}
              className="text-white"
            >
              ${price}/lb
            </Text>
            <Text
              style={{
                fontSize: ms(10),
                fontFamily: "jakarta",
                letterSpacing: 0.3,
              }}
              className="text-white"
            >
              Price
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default PriceQuantityCard;
