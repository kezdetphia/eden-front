import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const test2 = () => {
  <View>
    <Text>test2</Text>
  </View>;
};

export default test2;

// import {
//   View,
//   FlatList,
//   Dimensions,
//   Pressable,
//   Text,
//   TextInput,
//   Image,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/authContext";
// import { useRouter } from "expo-router";
// import ProductCard from "../../components/productCard";
// import {
//   scale as xs,
//   verticalScale as ys,
//   moderateScale as ms,
// } from "react-native-size-matters";
// import sizes from "../../constants/sizes";
// import CategoryCard from "../../components/CategoryCard";
// import { LinearGradient } from "expo-linear-gradient";
// import FilterScroll from "../../components/FilterScroll";
// import CustomHeader from "../../components/homescreen/HomeCustomHeader";
// import { Entypo, Feather } from "@expo/vector-icons";
// import { EvilIcons } from "@expo/vector-icons";

// const HomeScreen = () => {
//   const { paddingSides, marginxxs, xxs, xsm, sm, md, lg, xl, xxl } = sizes;
//   const categories = ["Fruit", "Vegetable"];
//   const filterOptions = ["All", "Exchange", "Free", "Buy"];

//   const [data, setData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedFilter, setSelectedFilter] = useState(null);
//   const [searchBarValue, setSearchBarValue] = useState(null);
//   const { isAuthenticated, authLoading, user } = useAuth();
//   const router = useRouter();

//   const screenWidth = Dimensions.get("window").width;
//   const numColumns = screenWidth > 1200 ? 4 : screenWidth > 800 ? 3 : 2;
//   const cardWidth = screenWidth / numColumns - 10; // Adjust for margin

//   useEffect(() => {
//     fetchCorps();
//   }, []);

//   const fetchCorps = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/getcorps");
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       if (!Array.isArray(data.corps)) {
//         throw new Error("Data is not an array");
//       }
//       setData(data.corps);
//     } catch (err) {
//       console.error("Failed to fetch data:", err);
//     }
//   };

//   const filteredData = data.filter((item) => {
//     const categoryMatch = selectedCategory
//       ? item.category.toLowerCase() === selectedCategory.toLowerCase()
//       : true;
//     const filterMatch = selectedFilter
//       ? selectedFilter === "All"
//         ? true
//         : item.tier && item.tier === selectedFilter
//       : true;
//     const titleMatch = searchBarValue
//       ? item.title.toLowerCase().includes(searchBarValue.toLowerCase())
//       : true;
//     return categoryMatch && filterMatch && titleMatch;
//   });

//   return (
//     <View className="flex-1 ">
//       <FlatList
//         showsVerticalScrollIndicator={false}
//         style={{ marginTop: ys(marginxxs) }}
//         key={numColumns} // Change the key prop to force re-render
//         data={filteredData}
//         keyExtractor={(item, index) => index.toString()}
//         ListHeaderComponent={
//           <View
//             style={{
//               paddingHorizontal: xs(paddingSides),
//               paddingTop: ys(paddingSides),
//             }}
//           >
//             <View className="CUSTOMHEADER">
//               <View
//                 className="flex flex-row justify-between "
//                 style={{
//                   // paddingHorizontal: xs(paddingSides),
//                   paddingTop: ys(sm),
//                 }}
//               >
//                 <View>
//                   <View className="flex flex-row ">
//                     <Text
//                       className="text-b300"
//                       style={{ fontFamily: "jakarta", fontSize: "20px" }}
//                     >
//                       Hi
//                     </Text>

//                     <Text
//                       className="text-b300"
//                       style={{ fontFamily: "jakartaBold", fontSize: "20px" }}
//                     >
//                       , Mark Feher
//                     </Text>
//                   </View>
//                   <View
//                     className="flex-row items-center   "
//                     style={{ paddingTop: ys(4) }}
//                   >
//                     <Entypo
//                       className="pr-1 "
//                       name="location-pin"
//                       size={ms(18)}
//                       color="#69D94E"
//                     />
//                     <Text
//                       style={{ fontFamily: "jakarta" }}
//                       className="text-b100"
//                     >
//                       Los Angels
//                     </Text>
//                   </View>
//                 </View>

//                 <View>
//                   <Image
//                     className="rounded-xl"
//                     source={require("../../assets/images/avatar.png")}
//                     style={{ width: 50, height: 50 }}
//                   />
//                   {/* Added style for image size */}
//                 </View>
//               </View>
//               <View>
//                 <View
//                   className="flex-row items-center bg-white rounded-xl border border-g200    "
//                   style={{
//                     // marginHorizontal: xs(paddingSides),
//                     height: ys(35),
//                     marginTop: ys(paddingSides + 2),
//                   }}
//                 >
//                   <EvilIcons
//                     name="search"
//                     size={ms(24)}
//                     color="#83DF6C"
//                     style={{ paddingLeft: xs(paddingSides) }}
//                   />
//                   <TextInput
//                     className=" flex-1 "
//                     placeholder="Search Apple"
//                     style={{ marginLeft: 10, fontFamily: "jakarta" }}
//                     value={searchBarValue}
//                     onChangeText={(text) => setSearchBarValue(text)}
//                   />
//                   <Feather
//                     style={{ paddingRight: xs(paddingSides) }}
//                     name="delete"
//                     size={ms(18)}
//                     color="#6C6C6C"
//                     onPress={() => setSearchBarValue(null)}
//                   />
//                 </View>
//               </View>
//             </View>
//             <View style={{ paddingTop: ys(10) }}>
//               <Text
//                 className="text-b200 text-xl"
//                 style={{ fontFamily: "jakartaSemibold" }}
//               >
//                 Discover Fresh, Seasonal Fruits and Vegetables
//               </Text>
//               {/* <LinearGradient
//                 colors={["#83DF6C", "#FFFFFF"]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={{
//                   height: 1, // Thin line
//                   marginTop: ys(5), // Space between text and line
//                   width: 500,
//                 }}
//               /> */}
//             </View>

//             <View style={{ paddingTop: ys(paddingSides + 4) }}>
//               <CategoryCard
//                 selectedCategory={selectedCategory}
//                 setSelectedCategory={setSelectedCategory}
//                 categories={categories}
//               />
//             </View>
//             <View style={{ paddingTop: ys(paddingSides + 4) }}>
//               <FilterScroll
//                 selectedFilter={selectedFilter}
//                 setSelectedFilter={setSelectedFilter}
//                 filterOptions={filterOptions}
//               />
//             </View>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <Pressable
//             onPress={() =>
//               router.push({
//                 pathname: `/productdetails/[id]`,
//                 params: { id: item._id },
//               })
//             }
//           >
//             <ProductCard product={item} cardWidth={cardWidth} />
//           </Pressable>
//         )}
//         numColumns={numColumns}
//         contentContainerStyle={{
//           justifyContent: "center",
//         }}
//       />
//     </View>
//   );
// };

// export default HomeScreen;