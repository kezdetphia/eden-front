import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AntDesign from "@expo/vector-icons/AntDesign";

//TODO: Fix style, picker is dead and the placeholder ainy nice, input field size is not good

const Quantity = ({ listingDetails, updateListingDetails }) => {
  const [selectedUnit, setSelectedUnit] = useState("lb");

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
      />
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedUnit}
          onValueChange={handleUnitChange}
          style={styles.picker}
          dropdownIconColor="white"
        >
          <Picker.Item label="lb" value="lb" />
          <Picker.Item label="pc" value="pc" />
        </Picker>
        <AntDesign
          name="caretdown"
          size={16}
          color="white"
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "#83DF6C",
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
  pickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#83DF6C",
    borderRadius: 8,
    overflow: "hidden",
    height: "100%",
    width: 100,
    justifyContent: "center",
  },
  picker: {
    flex: 1,
    color: "white",
    backgroundColor: "#83DF6C",
  },
  icon: {
    position: "absolute",
    right: 10,
  },
});

export default Quantity;
