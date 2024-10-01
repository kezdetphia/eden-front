import React, { useState, useCallback, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import _ from "lodash";

const Description = ({ listingDetails, updateListingDetails }) => {
  const [text, setText] = useState(listingDetails.desc);

  // Update local state when listingDetails.desc changes
  useEffect(() => {
    setText(listingDetails.desc);
  }, [listingDetails.desc]);

  // Debounce the updateListingDetails function
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
        style={styles.textArea}
        placeholder="Enter your text here"
        placeholderTextColor="#9CA3AF"
        multiline={true}
        numberOfLines={4}
        value={text}
        onChangeText={handleChangeText}
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
    height: 150,
    justifyContent: "flex-start",
    textAlignVertical: "top", // Ensures text starts at the top of the TextInput
    borderRadius: 8,
    padding: 10,
    color: "#2D2D2D",
    backgroundColor: "white",
  },
});
