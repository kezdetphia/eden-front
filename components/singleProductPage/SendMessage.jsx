import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";

const SendMessage = ({ product }) => {
  const { xsm, sm, md, lg, xl } = sizes;
  return (
    <View
      className="bg-30 shadow-lg rounded-md flex flex-col justify-around"
      style={{ height: ys(60) }}
    >
      <View
        className=""
        style={{ paddingTop: ys(xsm), paddingBottom: ys(xsm) }}
      >
        <CustomText
          sm
          style={{
            paddingLeft: xs(xsm),
          }}
        >
          Send this wapper a message
        </CustomText>
      </View>
      <View
        className="flex flex-row justify-between items-end"
        style={{ paddingBottom: ys(xsm), paddingHorizontal: xs(xsm) }}
      >
        <TextInput
          placeholder="Hi, is this still available?"
          className="bg-gray-200 rounded-2xl flex-1 "
          style={{
            padding: ys(5),
            height: ys(23),
            fontSize: ms(xsm),
            textAlignVertical: "center",
            fontFamily: "poppins",
          }}
          placeholderTextColor="grey-300"
          multiline={true}
        />
        <Pressable
          className="bg-myGreen rounded-xl  self-end"
          style={{ padding: xs(6), marginLeft: xs(3) }}
        >
          <CustomText white>Send</CustomText>
        </Pressable>
      </View>
    </View>
  );
};

export default SendMessage;
