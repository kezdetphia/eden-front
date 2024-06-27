import { View, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { categories } from "../../constants/corpsStuff";

const AddListingDetails = ({ listingDetails, updateListingDetails }) => {
  const { xsm, sm, md, lg, xl, xxl } = sizes;

  return (
    <View
      className="  w-full items-center justify-center"
      style={{ marginTop: ys(sm), gap: ys(sm) }}
    >
      <TextInput
        placeholder="Price (optional)"
        placeholderTextColor="#A9A9A9"
        className=" w-full"
        style={{
          height: ys(40),
          backgroundColor: "white",
          borderRadius: ms(12),
          padding: ms(12),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
          fontFamily: "poppins",
          fontSize: ms(sm),
        }}
        value={listingDetails.price}
        onChangeText={(text) => updateListingDetails("price", text)}
      />
      <TextInput
        placeholder="Description (recommended)"
        placeholderTextColor="#A9A9A9"
        className=" w-full"
        style={{
          height: ys(40),
          backgroundColor: "white",
          borderRadius: ms(12),
          padding: ms(12),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
          fontFamily: "poppins",
          fontSize: ms(sm),
        }}
        value={listingDetails.desc}
        onChangeText={(text) => updateListingDetails("desc", text)}
      />
    </View>
  );
};

export default AddListingDetails;
