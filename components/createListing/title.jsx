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
import { useListing } from "../../context/listingContext";

const { paddingTop, paddingSides } = sizes;

const DropdownComponent = ({ selectedCategory, handleToast }) => {
  const { listingDetails, updateListingDetails } = useListing();
  const [value, setValue] = useState(listingDetails?.title || "");
  const [filteredData, setFilteredData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setValue(listingDetails.title || "");
  }, [listingDetails.title]);

  useEffect(() => {
    setValue("");
    setFilteredData([]);
  }, [selectedCategory]);

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
    setFilteredData([]);
    setIsFocused(false);
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
            style={[styles.input, isFocused && styles.inputFocused]}
            placeholder="Select item"
            value={value}
            onChangeText={handleSearch}
            editable={!!selectedCategory}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      </Pressable>
      {isFocused && filteredData.length > 0 && (
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
  inputFocused: {
    borderWidth: 1,
    borderColor: "#4A9837",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: ms(7),
    marginTop: ys(5),
    maxHeight: ms(200),
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
