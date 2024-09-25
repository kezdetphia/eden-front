import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";

import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { fruits, vegetable } from "../../utils/corpsStuff";
import CustomText from "../customText";

const { paddingTop, paddingSides } = sizes;

const ListingTypeExchange = ({
  listingDetails = {},
  updateListingDetails = () => {},
}) => {
  const combinedData = [...fruits, ...vegetable].map((item) => {
    return { label: item, value: item };
  });

  const [value, setValue] = useState(listingDetails.title);
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (item) => {
    const exchangeFor = listingDetails.exchangeFor || [];
    if (!exchangeFor.includes(item.value)) {
      updateListingDetails("exchangeFor", [...exchangeFor, item.value]);
    }
    setFilteredData([]); // Hide the list after selection
    setValue("");
  };

  const handleSearch = (text) => {
    setValue(text);
    if (text) {
      const filtered = combinedData.filter((item) =>
        item.label.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const handleLongPress = (item) => {
    Alert.alert(
      "Delete Item",
      "Do you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleRemove(item),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleRemove = (item) => {
    const exchangeFor = listingDetails.exchangeFor || [];
    const updatedExchangeFor = exchangeFor.filter((value) => value !== item);
    updateListingDetails("exchangeFor", updatedExchangeFor);
  };

  return (
    <View>
      <TextInput
        style={[styles.input]}
        placeholder="Select item"
        value={value}
        onChangeText={handleSearch}
      />
      {filteredData.length > 0 && (
        <View style={styles.dropdown}>
          {filteredData.map((item) => (
            <Pressable
              key={item.value}
              style={styles.item}
              onPress={() => handleChange(item)}
            >
              <Text style={styles.text}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <View style={styles.chosenItemsContainer}>
        {listingDetails.exchangeFor?.map((item) => (
          <Pressable
            onLongPress={() => handleLongPress(item)}
            style={styles.chosenItem}
            key={item}
            className="bg-white rounded-lg  border border-g400 items-center "
          >
            <CustomText>{item}</CustomText>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default ListingTypeExchange;

const styles = StyleSheet.create({
  chosenItem: {
    borderRadius: ms(7),
    paddingVertical: ys(paddingTop * 0.6),
    paddingHorizontal: xs(paddingSides),
    margin: xs(2), // Add margin to create gaps between items
    flexBasis: "30%", // Ensure max 3 items per row
    flexGrow: 0, // Prevent items from growing
    flexShrink: 0, // Prevent items from shrinking
  },
  chosenItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start", // Align items to the start
    paddingHorizontal: xs(paddingSides),
    marginTop: ys(15),
  },
  input: {
    backgroundColor: "white",
    borderRadius: ms(7),
    paddingVertical: ys(paddingTop * 0.6),
    paddingHorizontal: xs(paddingSides),
    marginTop: ys(paddingTop * 0.75),
    fontSize: ms(14),
    color: "#2D2D2D",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: ms(7),
    marginTop: ys(5),
    maxHeight: ms(280),
    overflow: "hidden",
  },
  item: {
    padding: ms(10),
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontFamily: "jakarta",
    letterSpacing: 0.3,
    color: "#2D2D2D",
  },
});
