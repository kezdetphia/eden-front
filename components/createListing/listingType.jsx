import { View, StyleSheet, Pressable, Text } from "react-native";
import React, { useState } from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
// import { categories } from "../../utils/corpsStuff";
import CustomText from "../customText";

//TODO: Need extra field if user chooses paid, they need to add their price for either quantity or weight
//if user picks echhange i need a dropdown of their wanted item
//if they choose paid i still need to display exhcange items they might want to exhcange too not just sell
//if they choose exchnage i dont need to display price

const ListingType = ({ listingDetails, updateListingDetails }) => {
  const { paddingSizes, paddingTop } = sizes;
  const [selectedTier, setSelectedTier] = useState(listingDetails.tier);

  const tiers = ["free", "exchange", "sell"];

  const handlePress = (tier) => {
    setSelectedTier(tier);
    console.log("Before updateListingDetails call:", {
      ...listingDetails,
      tier,
    });
    updateListingDetails("tier", tier);
    console.log("selected tier", tier);
  };

  return (
    <View
      className="flex flex-row flex-wrap items-center gap-x-3"
      style={{
        marginTop: ys(paddingTop * 0.75),
      }}
    >
      {tiers.map((tier) => (
        <View key={tier} className="flex-1 items-center justify-center mt-2  ">
          <Pressable onPress={() => handlePress(tier)} className="w-full">
            <View
              className={`${
                selectedTier === tier ? "border border-g400 " : "b-200"
              } rounded-lg bg-white justify-center  `}
              style={{
                paddingVertical: ys(paddingTop),
                // paddingHorizontal: xs(pvaddingSides * 5),
              }}
            >
              <View className="flex flex-row justify-around ">
                <CustomText
                  style={{
                    color: selectedTier === tier ? "#4A9837" : "#2D2D2D",
                  }}
                >
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </CustomText>
                <View
                  className={`${
                    selectedTier === tier
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
                    borderColor: selectedTier === tier ? "#4A9837" : "gray",
                  }}
                >
                  {selectedTier === tier && (
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
        </View>
      ))}
    </View>
  );
};

export default ListingType;
