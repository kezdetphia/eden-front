import { View, TextInput, Dimensions, StyleSheet, Text } from "react-native";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import CustomText from "../customText";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";

const ListingTypePaid = ({ listingDetails, updateListingDetails }) => {
  const [selectedUnit, setSelectedUnit] = useState("");

  const { paddingTop, paddingSides } = sizes;
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (listingDetails.price) {
      const [price, unit] = listingDetails.price.split(" ");
      setSelectedUnit(unit || "lb");
    }
  }, [listingDetails.price]);

  const handleUnitChange = (itemValue) => {
    setSelectedUnit(itemValue);
    const price = listingDetails.price
      ? listingDetails.price.split(" ")[0]
      : "";
    updateListingDetails("price", `${price}  ${itemValue}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        $
        onChangeText={(text) => updateListingDetails("price", text)}
        value={listingDetails.price}
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#9CA3AF"
        keyboardType="numeric"
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
      </View>
    </View>
  );
};

export default ListingTypePaid;

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
});
