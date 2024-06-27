import { View, Text, SafeAreaView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import { ImageBackground } from "expo-image";
import { StatusBar } from "expo-status-bar";

export default function CustomHeader() {
  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")} // Use require to get the image from the images folder
      style={{
        height: ys(110),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 3.84,
        elevation: 5, // For Android shadow
      }}
    >
      <StatusBar hidden={true} />
      <SafeAreaView>
        <View
          className="flex-row items-center"
          style={{
            paddingHorizontal: xs(8),
            position: "relative",
            marginTop: ys(10),
          }}
        >
          <Ionicons
            name="menu"
            size={ms(26)}
            color="black"
            style={{ marginLeft: xs(10) }}
          />
          <View
            className="bg-gray-200 rounded-lg flex-row items-center shadow-sm shadow-gray-100 border border-green-200"
            style={{
              width: xs(180),
              padding: ms(4),
              position: "absolute",
              left: "50%",
              transform: [{ translateX: -xs(90) }], // Center the search bar
            }}
          >
            <TextInput
              placeholder="Search"
              className="rounded-md flex-1 "
              style={{ height: ys(20) }}
            />
            <Ionicons
              name="filter"
              size={ms(18)}
              color="black"
              style={{ marginLeft: xs(8) }}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
