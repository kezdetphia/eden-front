import { View, Text, Pressable, FlatList, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CategoryScroll from "../../components/homescreen/CategoryScroll";
import { Image } from "expo-image";
import { EvilIcons } from "@expo/vector-icons";

const SellerProfile = () => {
  const router = useRouter();
  const [sellerData, setSellerData] = useState(null);
  const { xsm, sm, md, lg, xl, xxl } = sizes;
  const { id } = useLocalSearchParams();

  const [numColumns, setNumColumns] = useState(3);
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth / numColumns - 4;
  const screenHeight = Dimensions.get("window").height;
  const imageHeight = screenHeight / numColumns - ms(150);

  useEffect(() => {
    getSellerData();
  }, []);

  const getSellerData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/getuserwithcorps/${id}`
      );
      // const response = await fetch(`${API_URL}/user/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSellerData(data);
      } else {
        console.log("Error while fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 bg-lightwhite">
      <SafeAreaView>
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <EvilIcons name="arrow-left" size={ms(40)} color="black" />
        </Pressable>

        <View className="bg-lightwhite">
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={sellerData?.myCorps}
            numColumns={numColumns}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            ListHeaderComponent={
              <View>
                <View style={{ padding: ms(xsm) }}>
                  <Text style={{ fontSize: ms(lg), fontFamily: "poppins" }}>
                    @{sellerData?.username}
                  </Text>
                  <Text>{sellerData?.location}</Text>
                  <Text style={{ fontSize: ms(xsm), fontFamily: "poppins" }}>
                    Member since: {sellerData?.createdAt.slice(0, 10)}
                  </Text>
                </View>
                <View>
                  <CategoryScroll categories={sellerData?.inNeedOf} />
                </View>
              </View>
            }
            renderItem={({ item }) => (
              <View
                className="flex-1"
                style={{ marginHorizontal: 1, marginVertical: ys(xsm) }}
              >
                {/* Add margin to each item */}
                <Pressable
                  onPress={() => {
                    router.push(`/productdetails/${item._id}`);
                  }}
                >
                  <Image
                    source={item.image}
                    style={{ width: imageWidth, height: imageHeight }}
                  />
                  <Text
                    style={{ fontSize: ms(md), fontFamily: "poppins" }}
                    className="text-darkgrey "
                  >
                    {item.title}
                  </Text>
                  {/* <Text>{item.desc}</Text> */}
                  {/* <Text>{item.location}</Text> */}
                  <Text
                    style={{ fontSize: ms(xsm), fontFamily: "poppins" }}
                    className="text-midgrey"
                  >
                    {item.updatedAt.slice(0, 10)}
                  </Text>
                </Pressable>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
export default SellerProfile;
