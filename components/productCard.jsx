import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const ProductCard = ({ product, cardWidth }) => {
  return (
    <View
      className=" bg-white shadow-md shadow-white"
      style={[styles.card, { width: cardWidth }]}
    >
      <Image
        source={{ uri: product?.image }}
        style={styles.image}
        onError={(error) => console.log("Image Load Error: ", error)}
      />
      <Text className="text-darkrey" fontFamily="poppins" style={styles.title}>
        {product.title}
      </Text>
      <Text className="text-60" fontFamily="poppins" style={styles.amount}>
        {product.amount}
      </Text>
      <View className="flex-row items-start justify-around">
        <FontAwesome name="exchange" size={22} color="green" />
        <MaterialIcons name="attach-money" size={22} color="green" />
        <MaterialIcons name="money-off" size={22} color="black" />
        <View className="flex-row items-center "></View>
      </View>
      {/*   <Text className="text-60" fontFamily="poppins" style={styles.category}>
        {product.category}
      </Text> */}
      <Text style={styles.location}>{product.location}</Text>
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
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  amount: {
    fontSize: 14,
    color: "#555",
  },
  category: {
    fontSize: 14,
    color: "#555",
  },
  location: {
    fontSize: 14,
    color: "#555",
  },
});

export default ProductCard;
