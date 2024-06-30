import { View, Text, TextInput, Pressable, Button } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";

// TODO: - implement adding comments to the owner's product
//       - display comments conditionally if there is or isnt
//       - message user buttin direct user to the owners message window to send message

const ProductComments = () => {
  const { xsm, xl, xxl, subtitle, paddingTop } = sizes;
  return (
    <View>
      <Text
        style={{
          fontSize: ms(subtitle),
          fontFamily: "jakartaBold",
          letterSpacing: 0.3,
        }}
      >
        Comments
      </Text>

      <View style={{ paddingTop: ys(paddingTop) }}>
        <View className="bg-grayb rounded-lg" style={{ position: "relative" }}>
          <TextInput
            multiline={true} // Enable multiline input
            textAlignVertical="top" // Alig
            placeholder="Add your comment here"
            style={{
              fontFamily: "jakarta",
              fontSize: ms(14),
              // color: "#F6F7F9",
              color: "#2D2D2D",
              padding: xs(10),
              // borderWidth: 1,
              // borderColor: "#E6E6E6",
              letterSpacing: 0.3,

              paddingRight: xs(40), // Add padding to the right to make space for the icon
            }}
          />
          <Feather
            name="send"
            size={ms(xl)}
            color="#69D94E"
            style={{
              position: "absolute",
              right: xs(16),
              top: "50%",
              transform: [{ translateY: -ms(xxl) / 2 }],
            }}
          />
        </View>
        <View style={{ paddingTop: ys(paddingTop + 4) }}>
          <Text
            className="text-center "
            style={{
              fontSize: ms(12),
              fontFamily: "jakarta",

              fontStyle: "#E6E6E6",
              letterSpacing: 0.3,
            }}
          >
            No comments yet...
          </Text>
          <Text
            className=" text-center text-b100"
            style={{
              fontSize: ms(xsm),
              paddingHorizontal: xs(xsm),
              fontFamily: "jakarta",
              letterSpacing: 0.3,
            }}
          >
            Be the firts to ask questions, comments about this item, or share
            your experience
          </Text>
        </View>
      </View>
      <View style={{ paddingTop: ys(paddingTop + paddingTop / 2) }}>
        <Pressable
          onPress={() => {
            // Add your onPress functionality here
          }}
          style={{
            backgroundColor: "#69D94E",
            paddingVertical: ys(10),
            paddingHorizontal: xs(20),
            borderRadius: ms(5),
            alignItems: "center",
            justifyContent: "center",
            marginTop: ys(10),
            flexDirection: "row",
          }}
        >
          <Feather name="message-square" size={ms(xl)} color="#FFF" />
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: ms(14),
              fontFamily: "jakartaSemibold",
              marginLeft: xs(5),
              letterSpacing: 0.3,
            }}
          >
            Send Message to Swapper
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProductComments;
