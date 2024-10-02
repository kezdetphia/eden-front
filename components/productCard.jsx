import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Image } from "expo-image";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import CustomText from "./customText";

const ProductCard = ({ product, cardWidth }) => {
  return (
    <View
      className=" bg-white shadow-sm  "
      style={[styles.card, { width: cardWidth }]}
    >
      <View className="items-center">
        <Image
          source={{ uri: product?.image[0] }}
          style={styles.image}
          onError={(error) => console.log("Image Load Error: ", error)}
        />
      </View>
      <View className="flex-row justify-between items-center">
        <CustomText b300 semibold>
          {product.title}
        </CustomText>
        <View className=" rounded-md justify-center items-center">
          <CustomText
            white
            xs
            style={{
              paddingHorizontal: xs(5),
              paddingVertical: ys(2),
              backgroundColor: "#FF6B00",
            }}
          >
            {product?.tier?.toUpperCase()}
          </CustomText>
        </View>
      </View>
      <CustomText xxs b100 style={{ paddingTop: ys(3) }}>
        {product.location}
      </CustomText>
      <View
        className="flex-row items-center justify-between"
        style={{ paddingTop: ys(10) }}
      >
        <CustomText g300 xsm semibold>
          {product?.availableQuantity}
        </CustomText>
        {product?.tier === "Buy" ? (
          <CustomText b300 xsm>
            $100
          </CustomText>
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 10,
    margin: 5,
    marginHorizontal: 5, // Add horizontal margin to create space between cards
  },
  image: {
    width: xs(150),
    height: 102,
    borderRadius: 8,
    marginBottom: ys(8),
  },

  category: {
    fontSize: 14,
    color: "#555",
  },
});

export default ProductCard;
