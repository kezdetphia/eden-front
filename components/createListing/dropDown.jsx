import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";

const { paddingTop, paddingSides } = sizes;
const DropdownComponent = ({
  data = [],
  listingDetails = {},
  updateListingDetails = () => {},
}) => {
  const newData = data.map((item) => {
    return { label: item, value: item };
  });

  const [value, setValue] = useState(listingDetails.title);

  useEffect(() => {
    if (listingDetails.title) {
      setValue(listingDetails.title);
    }
  }, [listingDetails.title]);

  const handleChange = (item) => {
    if (isDropdownDisabled) {
      return;
    } else {
      setValue(item.value);
      updateListingDetails("title", item.value);
    }
  };

  const isDropdownDisabled = !listingDetails.category;

  return (
    <Dropdown
      style={[styles.dropdown]}
      placeholderStyle={[styles.text, { fontSize: ms(13) }]}
      selectedTextStyle={styles.text}
      inputSearchStyle={styles.text}
      data={newData}
      maxHeight={ms(280)}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
      onChange={handleChange}
      disabled={isDropdownDisabled}
      renderItem={(item) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.label}</Text>
        </View>
      )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  text: {
    fontFamily: "jakarta",
    letterSpacing: 0.3,
    color: "#2D2D2D",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: ms(7),
    paddingVertical: ys(paddingTop * 0.6),
    paddingHorizontal: xs(paddingSides),
    marginTop: ys(paddingTop * 0.75),
    fontSize: ms(14),
  },
  item: {
    flex: 1,
    padding: ms(17),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeholder: {
    fontFamily: "jakarta",
    letterSpacing: 0.3,
    color: "#2D2D2D",
    fontSize: ms(14),
  },
});
