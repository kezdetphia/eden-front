import React, { useState, useCallback, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import _ from "lodash";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";

const Description = ({ listingDetails, updateListingDetails }) => {
  const [text, setText] = useState(listingDetails.desc);
  const [isFocused, setIsFocused] = useState(false); // State to track focus

  useEffect(() => {
    setText(listingDetails.desc);
  }, [listingDetails.desc]);

  const debouncedUpdateListingDetails = useCallback(
    _.debounce((text) => updateListingDetails("desc", text), 300),
    []
  );

  const handleChangeText = (text) => {
    setText(text);
    debouncedUpdateListingDetails(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textArea, isFocused && styles.textAreaFocused]} // Apply focus style
        placeholder="Enter your text here"
        placeholderTextColor="#9CA3AF"
        multiline={true}
        numberOfLines={4}
        value={text}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)} // Set focus to true
        onBlur={() => setIsFocused(false)} // Set focus to false
      />
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  textArea: {
    fontSize: ms(14),
    height: 150,
    justifyContent: "flex-start",
    textAlignVertical: "top",
    borderRadius: 8,
    padding: 10,
    color: "#2D2D2D",
    backgroundColor: "white",
  },
  textAreaFocused: {
    borderWidth: 1,
    borderColor: "#4A9837", // Focused border color
  },
});
