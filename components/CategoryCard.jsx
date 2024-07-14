import { View } from "react-native";
import React from "react";
import sizes from "../constants/sizes";
import FruitCatCard from "./FruitCatCard";
import { scale as xs } from "react-native-size-matters";

const CategoryCard = ({
  setSelectedCategory,
  selectedCategory,
  categories,
}) => {
  return (
    <View style={{ flexDirection: "row", gap: xs(20) }}>
      {categories.map((category, index) => (
        <FruitCatCard
          key={index}
          onPress={() => setSelectedCategory(category)}
          colors={index === 0 ? ["#FDE98A", "#FFF1B1"] : ["#BBFDA4", "#DDFFD1"]}
          text={category}
          imageSource={
            index === 0
              ? require("../assets/icons/fruits.png")
              : require("../assets/icons/vegetables.png")
          }
          isSelected={selectedCategory === category}
        />
      ))}
    </View>
  );
};

export default CategoryCard;
