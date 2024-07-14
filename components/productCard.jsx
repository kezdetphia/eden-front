import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../constants/sizes";

const { xxs, xsm, sm, md, lg, xl, xxl, paddingSides } = sizes;

const ProductCard = ({ product, cardWidth }) => {
  return (
    <View
      className=" bg-white shadow-sm  "
      style={[styles.card, { width: cardWidth }]}
    >
      <View className="items-center">
        <Image
          source={{ uri: product?.image }}
          style={styles.image}
          onError={(error) => console.log("Image Load Error: ", error)}
        />
      </View>
      <View className="flex-row justify-between items-center">
        <Text
          className="text-darkrey text-b300"
          style={{ fontFamily: "jakartaSemibold" }}
        >
          {product.title}
        </Text>
        <View className=" rounded-md justify-center items-center">
          <Text
            className="text-white bg-myOrange"
            style={{
              fontFamily: "jakartaSemibold",
              fontSize: 9,
              paddingHorizontal: xs(5),
              paddingVertical: ys(2),
            }}
          >
            {product?.tier?.toUpperCase()}
          </Text>
        </View>
      </View>
      <Text
        style={{ fontFamily: "jakarta", fontSize: 12, paddingTop: ys(3) }}
        className="text-b100"
      >
        {product.location}
      </Text>
      <View
        className="flex-row items-center justify-between"
        style={{ paddingTop: ys(10) }}
      >
        <Text
          className="text-g300"
          style={{ fontFamily: "jakartaSemibold", fontSize: 12 }}
        >
          {product.amount} Kg
        </Text>
        {product?.tier === "Buy" ? (
          <Text
            className="text-b300"
            style={{ fontFamily: "jakartaBold", fontSize: 12 }}
          >
            $100
          </Text>
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
