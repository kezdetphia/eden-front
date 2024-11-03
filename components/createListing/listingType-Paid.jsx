import { View, TextInput, StyleSheet } from "react-native";
import CustomText from "../customText";
import { useEffect, useState } from "react";
import SelectDropDown from "../selectDropDown";

import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { useListing } from "../../context/listingContext";

const { paddingTop, paddingSides } = sizes;

const ListingTypePaid = () => {
  const { listingDetails, updateListingDetails } = useListing();
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
    paddingVertical: ys(paddingTop * 0.6),
    paddingHorizontal: xs(paddingSides),
    marginTop: ys(paddingTop * 0.75),

    height: ys(40),
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#2D2D2D",
    fontSize: ms(14),
  },
});
