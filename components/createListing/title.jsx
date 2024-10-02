import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
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

const { paddingTop, paddingSides } = sizes;

const DropdownComponent = ({
  listingDetails = {},
  updateListingDetails = () => {},
  selectedCategory, // Add selectedCategory as a prop
  handleToast,
}) => {
  const [value, setValue] = useState(listingDetails?.title);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (listingDetails.title) {
      setValue(listingDetails.title);
    }
  }, [listingDetails.title]);

  useEffect(() => {
    // Reset the value and filteredData when the category changes
    setValue("");
    setFilteredData([]);
  }, [listingDetails.category, selectedCategory]);

  const handleSearch = (text) => {
    setValue(text);
    if (text) {
      const dataToFilter = selectedCategory === "fruit" ? fruits : vegetable;
      const filtered = dataToFilter.filter((item) =>
        item.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredData(filtered.map((item) => ({ label: item, value: item })));
    } else {
      setFilteredData([]);
    }
  };

  const handleChange = (item) => {
    setValue(item.value);
    updateListingDetails("title", item.value);
    setFilteredData([]); // Hide the list after selection
  };

  const handlePress = () => {
    if (!selectedCategory) {
      handleToast("Please select a category first!");
    }
  };

  return (
    <View>
      <Pressable onPress={handlePress}>
        <View pointerEvents={selectedCategory ? "auto" : "none"}>
          <TextInput
            style={styles.input}
            placeholder="Select item"
            value={value}
            onChangeText={handleSearch}
            editable={!!selectedCategory} // Use editable prop to control input
          />
        </View>
      </Pressable>
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
    </View>
  );
};

export default DropdownComponent;

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
