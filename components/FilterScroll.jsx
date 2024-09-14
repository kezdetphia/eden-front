import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../constants/sizes";
import CustomText from "./customText";

const FilterScroll = ({ filterOptions, selectedFilter, setSelectedFilter }) => {
  const { paddingSides, xsm, sm, md, lg, xl, xxl } = sizes;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <FlatList
        initialScrollToIndex={0}
        horizontal={true}
        // contentContainerStyle={{ paddingLeft: xs(xsm) }}
        data={filterOptions}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ flex: 1, alignItems: "center" }}>
            <Pressable onPress={() => setSelectedFilter(item)}>
              <View
                style={{
                  height: ys(34),
                  backgroundColor:
                    selectedFilter === item ? "#69D94E" : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "white",
                }}
              >
                <CustomText
                  style={{
                    paddingHorizontal: xs(20),
                    textAlign: "center",
                  }}
                  white={selectedFilter === item}
                  selectButtonGreen={selectedFilter !== item}
                >
                  {item}
                </CustomText>
              </View>
            </Pressable>
          </View>
        )}
        contentContainerStyle={{
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      />
    </View>
  );
};

export default FilterScroll;
