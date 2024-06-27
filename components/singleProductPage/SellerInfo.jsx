import { View, Text, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { useRouter } from "expo-router";

const SellerInfo = ({ product }) => {
  const router = useRouter();

  const { xsm, sm, md, lg, xl, xxl } = sizes;
  return (
    <View className="">
      <View className="SELLER_INFO_HEADER">
        <Text
          className="font-bold"
          style={{ fontSize: ms(md), fontFamily: "poppins" }}
        >
          Meet the wapper
        </Text>
      </View>
      <View className="">
        <View className="flex flex-row items-center">
          <AntDesign
            name="user"
            size={ms(lg)}
            color="black"
            className=" rounded-full p-2"
          />
          <Pressable
            onPress={() => {
              router.push(`/sellerprofile/${product?.owner?._id}`);
            }}
          >
            <Text style={{ fontSize: ms(md), fontFamily: "poppins" }}>
              @{product?.owner?.username}
            </Text>
          </Pressable>
        </View>
        <Text className="" style={{ fontSize: ms(xsm), fontFamily: "poppins" }}>
          Member since: {product?.owner?.createdAt?.substring(0, 10)}
        </Text>
      </View>
    </View>
  );
};

export default SellerInfo;
