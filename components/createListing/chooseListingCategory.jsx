import { View, Text, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { categories } from "../../utils/corpsStuff";

const ChooseListingCategory = ({ listingDetails, updateListingDetails }) => {
  const { xsm, sm, md, lg, xl, xxl } = sizes;

  useEffect(() => {
    if (listingDetails.category) {
      setSelectedCategory(listingDetails.category);
    }
  }, [listingDetails.category]);

  const [selectedCategory, setSelectedCategory] = useState(
    listingDetails.category
  );

  const handleCategorySelect = (item) => {
    setSelectedCategory(item);
    updateListingDetails("category", item);
  };

  return (
    <View
      className="w-full "
      style={{
        marginTop: ys(md),
        paddingHorizontal: xs(sm),
      }}
    >
      <Text
        className="text-black font-inter font-bold"
        style={{ fontSize: ms(md) }}
      >
        Category
      </Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleCategorySelect(item)}>
            <View
              className={`${
                selectedCategory === item ? "bg-green-200 " : "bg-gray-200"
              } rounded-full`}
              style={{
                paddingVertical: ys(xsm),
                paddingHorizontal: xs(xxl),
                marginTop: xs(md),
              }}
            >
              <Text
                style={{ fontFamily: "poppins", fontSize: ms(sm) }}
                className={` ${
                  selectedCategory === item ? "text-gray-700 " : "text-gray-400"
                }`}
              >
                {item}
              </Text>
            </View>
          </Pressable>
        )}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: xs(sm),
          justifyContent: "center",
          gap: xs(xxl),
          width: "100%",
        }}
      />
    </View>
  );
};

export default ChooseListingCategory;
