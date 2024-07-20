import {
  View,
  Text,
  FlatList,
  Pressable,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { categories } from "../../utils/corpsStuff";

const ChooseListingCategory = ({ listingDetails, updateListingDetails }) => {
  const { paddingTop, paddingSides, subtitle } = sizes;
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 2 - xs(paddingSides * 2);

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
      style={{
        marginTop: ys(paddingTop),
      }}
    >
      <Text style={{ fontFamily: "jakartaSemibold", fontSize: ms(subtitle) }}>
        Category
      </Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleCategorySelect(item)}>
            <View
              className={`${
                selectedCategory === item ? "border border-g400 " : ""
              } rounded-lg bg-white  `}
              style={{
                paddingVertical: ys(paddingTop),
                // paddingHorizontal: xs(paddingSides * 5),
                marginTop: xs(paddingTop),
                width: itemWidth,
              }}
            >
              <View className="flex flex-row justify-around ">
                <Text
                  style={styles.text}
                  className={`${
                    selectedCategory === item ? "text-g400" : "text-b200"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>

                <View
                  style={{
                    height: ms(16),
                    width: ms(16),
                    borderRadius: ms(8),
                    borderWidth: 2,
                    borderColor: selectedCategory === item ? "green" : "gray",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: xs(8),
                  }}
                >
                  {selectedCategory === item && (
                    <View
                      style={{
                        height: ms(8),
                        width: ms(8),
                        borderRadius: ms(4),
                        backgroundColor: "green",
                      }}
                    />
                  )}
                </View>
              </View>
            </View>
          </Pressable>
        )}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: xs(paddingSides),
          justifyContent: "center",
          gap: xs(paddingTop),
          width: "100%",
        }}
      />
    </View>
  );
};

export default ChooseListingCategory;

const styles = StyleSheet.create({
  text: {
    fontFamily: "jakarta",
    letterSpacing: 0.3,
    // color: "#2D2D2D",
  },
});
