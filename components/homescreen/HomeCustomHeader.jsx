import { View, Text, SafeAreaView, TextInput, Image } from "react-native"; // Import Image from react-native
import { StatusBar } from "expo-status-bar";

import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { Entypo, Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";

export default function CustomHeader({ searchBarValue, setSearchBarValue }) {
  const { sm, paddingSides } = sizes;
  const { user } = useAuth();

  return (
    <>
      {/* <StatusBar hidden={false} /> */}
      <SafeAreaView style={{ backgroundColor: "transparent" }}>
        <View
          className="flex flex-row justify-between "
          style={{
            // paddingHorizontal: xs(paddingSides),
            paddingTop: ys(sm),
            paddingHorizontal: xs(paddingSides),
          }}
        >
          <View>
            <View className="flex flex-row ">
              <Text
                className="text-b300"
                style={{ fontFamily: "jakarta", fontSize: "20px" }}
              >
                Hi
              </Text>

              <Text
                className="text-b300"
                style={{ fontFamily: "jakartaBold", fontSize: "20px" }}
              >
                ,{" "}
                {user?.username?.charAt(0).toUpperCase() +
                  user.username.slice(1)}
              </Text>
            </View>
            <View
              className="flex-row items-center   "
              style={{ paddingTop: ys(4) }}
            >
              <Entypo
                className="pr-1 "
                name="location-pin"
                size={ms(16)}
                color="#69D94E"
              />
              <Text style={{ fontFamily: "jakarta" }} className="text-b100">
                {user?.location}
              </Text>
            </View>
          </View>

          <View>
            <Image
              className="rounded-xl"
              source={
                user?.avatar
                  ? { uri: user.avatar }
                  : require("../../assets/images/avatar.png")
              }
              style={{ width: 50, height: 50 }}
            />
            {/* Added style for image size */}
          </View>
        </View>

        <View style={{ paddingHorizontal: xs(paddingSides) }}>
          <View
            className="flex-row items-center bg-white rounded-xl border border-g200     "
            style={{
              // marginHorizontal: xs(paddingSides),
              height: ys(35),
              marginTop: ys(paddingSides + 2),
            }}
          >
            <EvilIcons
              name="search"
              size={ms(24)}
              color="#83DF6C"
              style={{ paddingLeft: xs(paddingSides) }}
            />
            <TextInput
              className=" flex-1 "
              placeholder="Search Apple"
              style={{ marginLeft: 10, fontFamily: "jakarta" }}
              value={searchBarValue}
              onChangeText={(text) => setSearchBarValue(text)}
            />
            <Feather
              style={{ paddingRight: xs(paddingSides) }}
              name="delete"
              size={ms(18)}
              color="#6C6C6C"
              onPress={() => setSearchBarValue(null)}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
