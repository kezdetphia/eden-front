import { View, TextInput, StyleSheet } from "react-native";
import CustomText from "../customText";
import { useEffect, useState } from "react";
import SelectDropDown from "../selectDropDown";

const ListingTypePaid = ({ listingDetails, updateListingDetails }) => {
  const [selectedUnit, setSelectedUnit] = useState("");

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
    updateListingDetails("price", `${price} ${itemValue}`);
  };

  const handleChangeText = (text) => {
    // Remove any non-numeric characters except for the decimal point
    const numericText = text.replace(/[^0-9.]/g, "");
    updateListingDetails("price", `${numericText} ${selectedUnit}`);
  };

  return (
    <View style={styles.container}>
      <CustomText>$ </CustomText>
      <TextInput
        onChangeText={handleChangeText}
        value={listingDetails.price ? listingDetails.price.split(" ")[0] : ""}
        style={styles.input}
        placeholder="Price"
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
});
