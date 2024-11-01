import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import SelectDropDown from "../selectDropDown";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";

const { paddingTop, paddingSides } = sizes;

const Quantity = ({ listingDetails, updateListingDetails }) => {
  const [selectedUnit, setSelectedUnit] = useState("lb");
  const [isFocused, setIsFocused] = useState(false); // Track focus

  useEffect(() => {
    if (listingDetails.availableQuantity) {
      const [availableQuantity, unit] =
        listingDetails.availableQuantity.split(" ");
      setSelectedUnit(unit || "lb");
    }
  }, [listingDetails.availableQuantity]);

  const handleUnitChange = (itemValue) => {
    setSelectedUnit(itemValue);
    const availableQuantity = listingDetails.availableQuantity
      ? listingDetails.availableQuantity.split(" ")[0]
      : "";
    updateListingDetails(
      "availableQuantity",
      `${availableQuantity} ${itemValue}`
    );
  };

  const handleChangeText = (text) => {
    const numericText = text.replace(/[^0-9]/g, "");
    updateListingDetails("availableQuantity", `${numericText} ${selectedUnit}`);
  };

  return (
    <View style={[styles.container, isFocused && styles.focusedContainer]}>
      <TextInput
        value={
          listingDetails.availableQuantity
            ? listingDetails.availableQuantity.split(" ")[0]
            : ""
        }
        onChangeText={handleChangeText}
        style={styles.input}
        placeholder="Quantity"
        placeholderTextColor="#9CA3AF"
        keyboardType="numeric"
        onFocus={() => setIsFocused(true)} // Set focus to true
        onBlur={() => setIsFocused(false)} // Set focus to false
      />
      <SelectDropDown
        units={["lb", "pc"]}
        handleUnitChange={handleUnitChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "white",
    paddingVertical: ys(paddingTop * 0.6),
    paddingHorizontal: xs(paddingSides),
    marginTop: ys(16),
    height: ys(40),
  },
  focusedContainer: {
    borderWidth: 1,
    borderColor: "#4A9837", // Focused border color
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#2D2D2D",
    fontSize: ms(14),
  },
  accordionContainer: {
    marginTop: 2,
  },
  accordionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D2D2D",
  },
  accordionContent: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  unitOption: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 16,
    color: "#2D2D2D",
  },
});

export default Quantity;
