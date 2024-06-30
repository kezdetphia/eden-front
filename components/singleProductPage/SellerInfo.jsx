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
import { Image } from "expo-image";
import SecondaryPill from "../SecondaryPill";

const SellerInfo = ({ owner }) => {
  const router = useRouter();

  const { xsm, sm, md, lg, subtitle } = sizes;
  return (
    <View className="">
      <Text
        className="text-b300"
        style={{
          fontSize: ms(subtitle),
          fontFamily: "jakartaBold",
          letterSpacing: 0.3,
        }}
      >
        Seller Information
      </Text>
      <View className="flex-row" style={{ paddingTop: ys(7) }}>
        <View>
          <Image
            style={{ height: ms(40), width: ms(40), borderRadius: ms(20) }}
            source={require("../../assets/images/avatar.png")}
          />
        </View>

        <View className="flex-1 " style={{ paddingLeft: xs(md) }}>
          <View className="flex-row justify-between ">
            <Text
              className="text-b300"
              style={{
                fontSize: ms(15),
                fontFamily: "jakartaBold",
                letterSpacing: 0.3,
              }}
            >
              {owner?.username}
            </Text>
            <SecondaryPill props={"View Profile"} />
          </View>
          <Text
            style={{
              letterSpacing: 0.3,
              fontFamily: "jakarta",
              fontSize: ms(12),
            }}
            className="text-b100"
          >
            Joined{" "}
            {new Date(owner?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SellerInfo;
