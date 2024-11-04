import { View, Text, Image } from "react-native";
import React from "react";

const Card = ({ name, zipcode }) => {
  return (
    <View className=" bg-slate-200 rounded-lg p-2 w-[180px] h-[240px] mx-auto mt-5  ">
      <View className="flex-1 w-170  mt-2 rounded-lg overflow-hidden">
        <Image
          source={require("../../assets/images/stra.jpg")}
          style={{ width: "80%", height: "100%", resizeMode: "cover" }}
          className="rounded-lg m-2 aspect-auto "
        />
      </View>
      <Text className="text-lg font-bold mt-2">{name}</Text>
      <Text className="text-sm text-gray-600">{location}</Text>
      <Text className="text-sm text-gray-600">John</Text>
    </View>
  );
};

export default Card;
