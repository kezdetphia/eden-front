import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import SecondaryPill from "../SecondaryPill";
import CustomText from "../customText";

const SellerInfo = ({ owner }) => {
  const router = useRouter();

  const { md, subtitle } = sizes;
  return (
    <View className="">
      <CustomText b300 subtitle bold>
        Seller Information
      </CustomText>
      <View className="flex-row" style={{ paddingTop: ys(10) }}>
        <View>
          <Image
            style={{ height: ms(40), width: ms(40), borderRadius: ms(20) }}
            source={require("../../assets/images/avatar.png")}
          />
        </View>

        <View className="flex-1 " style={{ paddingLeft: xs(md) }}>
          <View className="flex-row justify-between ">
            <CustomText b300 md bold>
              {owner?.username}
            </CustomText>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: `/sellerprofile/[id]`,
                  params: { id: owner._id },
                })
              }
            >
              <SecondaryPill props={"View Profile"} />
            </Pressable>
          </View>
          <CustomText xsm b100>
            Joined{" "}
            {new Date(owner?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default SellerInfo;
