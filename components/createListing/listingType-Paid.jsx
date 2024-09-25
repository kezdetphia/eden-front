import { View, TextInput, Dimensions, StyleSheet, Text } from "react-native";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import CustomText from "../customText";
import { useEffect, useState } from "react";
import SelectDropDown from "../selectDropDown";

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
    updateListingDetails("price", `${price} ${itemValue}`);
  };

  return (
    <View style={styles.container}>
      <CustomText>$ </CustomText>
      <TextInput
        $
        onChangeText={(text) =>
          updateListingDetails("price", text + " " + selectedUnit)
        }
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
