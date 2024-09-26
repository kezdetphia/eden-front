import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import SelectDropDown from "../selectDropDown";

const Quantity = ({ listingDetails, updateListingDetails }) => {
  const [selectedUnit, setSelectedUnit] = useState("");

  useEffect(() => {
    if (listingDetails.amount) {
      const [amount, unit] = listingDetails.amount.split(" ");
      setSelectedUnit(unit || "lb");
    }
  }, [listingDetails.amount]);

  const handleUnitChange = (itemValue) => {
    setSelectedUnit(itemValue);
    const amount = listingDetails.amount
      ? listingDetails.amount.split(" ")[0]
      : "";
    updateListingDetails("amount", `${amount} ${itemValue}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={listingDetails.amount ? listingDetails.amount.split(" ")[0] : ""}
        onChangeText={(text) =>
          updateListingDetails("amount", text + " " + selectedUnit)
        }
        style={styles.input}
        placeholder="Quantity"
        placeholderTextColor="#9CA3AF"
        keyboardType="numeric"
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 20,
    height: 50,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#2D2D2D",
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
