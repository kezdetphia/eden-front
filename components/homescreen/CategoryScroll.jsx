import { View, Text, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { Image } from "expo-image";

const CategoryScroll = ({
  categories,
  wantUnderLine,
  onCategorySelect,
  categoryImage,
}) => {
  const { xsm, sm, md, lg, xl, xxl } = sizes;
  const [isCatScrollActive, setIsCatScrollActive] = useState(null);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: ys(xsm),
      }}
    >
      <FlatList
        initialScrollToIndex={0}
        horizontal={true}
        contentContainerStyle={{ paddingLeft: xs(xsm) }}
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ alignItems: "center", marginHorizontal: xs(5) }}>
            <Pressable
              onPress={() => {
                setIsCatScrollActive(item);
                categoryImage ? onCategorySelect(item) : "";
              }}
            >
              <View
                className={`${
                  isCatScrollActive === item
                    ? "bg-myGreenMed "
                    : " bg-myGreenLight"
                } rounded-full flex-row items-center `}
                style={{
                  padding: ms(md),
                }}
              >
                {categoryImage ? (
                  <Image
                    source={categoryImage[item]}
                    style={{ width: ms(30), height: ms(30) }}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: ms(md),
                      fontFamily: "poppins",
                      color: "darkgrey",
                    }}
                  >
                    {item}
                  </Text>
                )}
              </View>
            </Pressable>
            {categoryImage ? (
              <Text
                className="text-lightgrey  "
                style={{
                  fontSize: ms(md),
                  fontFamily: "poppins",
                  marginTop: ys(6),
                }}
              >
                {item}
              </Text>
            ) : (
              ""
            )}
          </View>
        )}
      />
    </View>
  );
};

export default CategoryScroll;
