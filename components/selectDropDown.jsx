import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet } from "react-native";
import CustomText from "./customText";

const SelectDropDown = ({ units, handleUnitChange }) => {
  return (
    <SelectDropdown
      data={units}
      onSelect={(selectedItem, index) => {
        handleUnitChange(selectedItem);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <CustomText>{selectedItem || "Unit"}</CustomText>
            <Icon
              name={isOpened ? "chevron-up" : "chevron-down"}
              style={styles.dropdownButtonArrowStyle}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: "#D2D9DF" }),
            }}
          >
            <CustomText>{item}</CustomText>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};
export default SelectDropDown;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 80,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  dropdownButtonArrowStyle: {
    fontSize: 28,
  },

  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
});
