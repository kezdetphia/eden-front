import { View, StyleSheet, TextInput } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";

const { paddingTop, paddingSides } = sizes;

const Location = ({ listingDetails, updateListingDetails, handleToast }) => {
  const handleChangeText = (text) => {
    // Remove any non-numeric characters
    const numericText = text.replace(/[^0-9]/g, "");
    updateListingDetails("location", numericText);
  };

  return (
    <View>
      <TextInput
        value={listingDetails?.location}
        onChangeText={handleChangeText}
        style={styles.input}
        placeholder="Where is this item located?"
        placeholderTextColor="#9CA3AF"
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   borderRadius: 8,
  //   backgroundColor: "white",
  //   paddingVertical: 10,
  //   paddingHorizontal: 15,
  //   marginTop: 20,
  //   height: 50,
  // },
  // input: {
  //   flex: 1,
  //   height: "100%",
  //   color: "#2D2D2D",
  // },
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
});

export default Location;
