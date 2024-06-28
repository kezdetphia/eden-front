import { View, Text, TextInput } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";

const ProductComments = () => {
  const { xsm, sm, md, lg, xl, xxl } = sizes;
  return (
    <View>
      <Text
        className="font-bold "
        style={{ fontSize: ms(md), fontFamily: "poppins" }}
      >
        Comments
      </Text>
      <View style={{ gap: ys(3) }}>
        <Text
          className="text-gray-500 text-center "
          style={{ fontSize: ms(sm), fontFamily: "poppins" }}
        >
          No comments yet..
        </Text>
        <Text
          className="text-gray-500 text-center "
          style={{
            fontSize: ms(xsm),
            paddingHorizontal: xs(xsm),
            fontFamily: "poppins",
          }}
        >
          Be the firts to ask questions, comments about this item, or share your
          experience
        </Text>
        <View
          className="flex flex-row  items-center"
          style={{ paddingVertical: ys(sm) }}
        >
          <AntDesign
            name="user"
            size={ms(xl)}
            color="black"
            className=" rounded-full "
            style={{ paddingRight: xs(3) }}
          />
          <View
            className="border-2 border-gray-300 flex-1 rounded-xl   flex-row items-center"
            style={{ paddingLeft: xs(xsm), paddingVertical: ys(xsm) }}
          >
            <TextInput
              placeholder="Add your comment"
              className="flex-1"
              style={{ fontFamily: "poppins" }}
            />

            <Feather
              name="arrow-up-circle"
              size={ms(xxl)}
              color="#51A90E"
              className="pr-3"
            />
          </View>
        </View>
      </View>
      {/* //TODO: render flatlist with all the items and footer of some closing */}
    </View>
  );
};

export default ProductComments;
