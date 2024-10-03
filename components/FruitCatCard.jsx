import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import CustomText from "./customText";
import { scale as xs, verticalScale as ys } from "react-native-size-matters";

const FruitCatCard = ({ onPress, colors, text, imageSource, isSelected }) => {
  return (
    <Pressable
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={onPress}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <CustomText sm semibold>
            {text}
          </CustomText>
          <Image
            style={{ width: xs(37), height: ys(37) }}
            transition={1000}
            contentFit="cover"
            source={imageSource}
          />
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
  },
  selectedCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradient: {
    height: ys(50),
    borderRadius: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
});

export default FruitCatCard;
