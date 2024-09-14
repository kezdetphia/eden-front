import {
  View,
  Text,
  FlatList,
  Pressable,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { categories } from "../../utils/corpsStuff";
import CustomText from "../customText";

const ChooseListingCategory = ({ listingDetails, updateListingDetails }) => {
  const { paddingTop, paddingSides } = sizes;
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 2 - xs(paddingSides * 1.7);

  return (
    <View
      style={{
        marginTop: ys(paddingTop * 0.75),
      }}
    >
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <Pressable onPress={() => updateListingDetails("category", item)}>
            <View
              className={`${
                listingDetails.category === item
                  ? "border border-g400 "
                  : "b-200"
              } rounded-lg bg-white  `}
              style={{
                paddingVertical: ys(paddingTop),
                width: itemWidth,
              }}
            >
              <View className="flex flex-row justify-around ">
                <CustomText
                  g400={listingDetails.category === item}
                  b200={listingDetails.category !== item}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </CustomText>

                <View
                  className={`${
                    listingDetails.category === item
                      ? "border border-g400"
                      : "border border-gray"
                  }`}
                  style={{
                    height: ms(16),
                    width: ms(16),
                    borderRadius: ms(8),
                    borderWidth: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor:
                      listingDetails.category === item ? "#4A9837" : "gray",
                  }}
                >
                  {listingDetails.category === item && (
                    <View
                      className="bg-g400"
                      style={{
                        height: ms(8),
                        width: ms(8),
                        borderRadius: ms(4),
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
          justifyContent: "center",
          gap: xs(paddingTop),
          width: "100%",
        }}
      />
    </View>
  );
};

export default ChooseListingCategory;
