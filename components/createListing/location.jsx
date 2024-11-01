import { View, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";

const { paddingTop, paddingSides } = sizes;

const Location = ({ listingDetails, updateListingDetails, handleToast }) => {
  const [isFocused, setIsFocused] = useState(false); // State to track focus

  const handleChangeText = (text) => {
    const numericText = text.replace(/[^0-9]/g, "");
    updateListingDetails("location", numericText);
  };

  return (
    <View>
      <TextInput
        value={listingDetails?.location}
        onChangeText={handleChangeText}
        style={[styles.input, isFocused && styles.inputFocused]} // Apply focus style
        placeholder="Where is this item located?"
        placeholderTextColor="#9CA3AF"
        keyboardType="numeric"
        onFocus={() => setIsFocused(true)} // Set focus to true
        onBlur={() => setIsFocused(false)} // Set focus to false
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: ms(7),
    paddingVertical: ys(paddingTop * 0.6),
    paddingHorizontal: xs(paddingSides),
    marginTop: ys(paddingTop * 0.75),
    fontSize: ms(14),
    color: "#2D2D2D",
    height: ys(40),
  },
  inputFocused: {
    borderWidth: 1,
    borderColor: "#4A9837", // Focused border color
  },
});

export default Location;
