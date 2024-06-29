// import { View, Text, Pressable } from "react-native";
// import React from "react";
// import {
//   scale as xs,
//   verticalScale as ys,
//   moderateScale as ms,
// } from "react-native-size-matters";
// import sizes from "../constants/sizes";
// import { LinearGradient } from "expo-linear-gradient";
// import { Image } from "expo-image";

// const CategoryCard = ({
//   setSelectedCategory,
//   selectedCategory,
//   categories,
// }) => {
//   const { paddingSides, xsm, sm, md, lg, xl, xxl } = sizes;

//   return (
//     <View className="flex-row gap-x-5">
//       <Pressable
//         style={{
//           flex: 1,
//         }}
//         onPress={() => setSelectedCategory("fruit")}
//       >
//         <LinearGradient
//           colors={["#FDE98A", "#FFF1B1"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={{ height: ys(50), borderRadius: 10 }}
//         >
//           <View className="flex-row justify-around items-center h-[100%]">
//             <Text
//               className="text-b-300 "
//               style={{ fontFamily: "jakartaSemibold" }}
//             >
//               {categories[0]}
//             </Text>
//             <Image
//               style={{ width: xs(37), height: ys(37) }}
//               transition={1000}
//               contentFit="cover"
//               source={require("../assets/icons/fruits.png")}
//             ></Image>
//           </View>
//         </LinearGradient>
//       </Pressable>
//       <Pressable
//         style={{ flex: 1, height: ys(40) }}
//         onPress={() => setSelectedCategory(categories[1])}
//       >
//         <LinearGradient
//           colors={["#BBFDA4", "#DDFFD1"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={{ height: ys(50), borderRadius: 10 }}
//         >
//           <View className="flex-row justify-around items-center h-[100%]">
//             <Text
//               className="text-b-300 "
//               style={{ fontFamily: "jakartaSemibold" }}
//             >
//               {categories[1]}
//             </Text>
//             <Image
//               style={{ width: xs(40), height: ys(40) }}
//               transition={1000}
//               contentFit="cover"
//               source={require("../assets/icons/vegetables.png")}
//             ></Image>
//           </View>
//         </LinearGradient>
//       </Pressable>
//     </View>
//   );
// };

// export default CategoryCard;

import { View } from "react-native";
import React from "react";
import sizes from "../constants/sizes";
import FruitCatCard from "./FruitCatCard";

const CategoryCard = ({
  setSelectedCategory,
  selectedCategory,
  categories,
}) => {
  const { paddingSides, xsm, sm, md, lg, xl, xxl } = sizes;

  return (
    <View className="flex-row gap-x-5">
      {categories.map((category, index) => (
        <FruitCatCard
          key={index}
          onPress={() => setSelectedCategory(category)}
          colors={index === 0 ? ["#FDE98A", "#FFF1B1"] : ["#BBFDA4", "#DDFFD1"]}
          text={category}
          imageSource={
            index === 0
              ? require("../assets/icons/fruits.png")
              : require("../assets/icons/vegetables.png")
          }
          isSelected={selectedCategory === category}
        />
      ))}
    </View>
  );
};

export default CategoryCard;
