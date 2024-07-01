import { View, Text, Pressable, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../constants/sizes";
import { useAuth } from "../context/authContext";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

const index = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  console.log("isAuthenticated", isAuthenticated, user);
  if (isAuthenticated) router.replace("home");
  const { paddingSides, paddingTop, title } = sizes;
  return (
    // <View
    //   className="flex-1 items-center bg-red-200 w-full "
    //   style={{ paddingHorizontal: xs(paddingSides) }}
    // >
    <View
      className=" bg-grayb flex-1 "
      style={{
        paddingHorizontal: xs(paddingSides),
        paddingTop: ys(paddingTop * 4),
      }}
    >
      <StatusBar hidden="true" />

      <View className="items-center">
        <Text
          className="text-g300"
          style={{
            fontFamily: "jakartaBold",
            fontSize: ms(title * 1.5),
            letterSpacing: 0.3,
          }}
        >
          Greenz
        </Text>
        <LottieView
          style={{ height: 200, width: 200, marginTop: ys(paddingTop * 2.5) }}
          source={require("../assets/icons/signin.json")}
          autoPlay
          loop
          onError={(error) => console.log("Lottie error:", error)} // Add error logging
        />
      </View>
      <View className="w-full" style={{ paddingTop: ys(30) }}>
        <Pressable
          onPress={null}
          style={{
            backgroundColor: "black",
            paddingVertical: ys(10),
            paddingHorizontal: xs(20),
            borderRadius: ms(5),
            alignItems: "center",
            justifyContent: "center",
            marginTop: ys(10),
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: ms(14),
              fontFamily: "jakartaSemibold",
              letterSpacing: 0.3,
            }}
          >
            Continue with Apple
          </Text>
        </Pressable>
        <Pressable
          onPress={null}
          style={{
            backgroundColor: "FFF",
            paddingVertical: ys(10),
            paddingHorizontal: xs(20),
            borderRadius: ms(5),
            alignItems: "center",
            justifyContent: "center",
            marginTop: ys(10),
            flexDirection: "row",
            borderColor: "black",
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: ms(14),
              fontFamily: "jakartaSemibold",
              letterSpacing: 0.3,
            }}
          >
            Continue with Google
          </Text>
        </Pressable>
        <Text
          style={{
            fontSize: ms(12),
            fontFamily: "jakarta",
            letterSpacing: 0.3,
            paddingTop: ys(paddingTop),
          }}
          className="text-center text-b200"
        >
          or
        </Text>

        <Pressable
          onPress={() => router.push("SignUp")}
          style={{
            backgroundColor: "#69D94E",
            paddingVertical: ys(10),
            paddingHorizontal: xs(20),
            borderRadius: ms(5),
            alignItems: "center",
            justifyContent: "center",
            marginTop: ys(10),
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: ms(14),
              fontFamily: "jakartaSemibold",
              letterSpacing: 0.3,
            }}
          >
            Sign up with email
          </Text>
        </Pressable>
        <Pressable onPress={() => router.push("SignIn")}>
          <Text
            className="text-b100 text-center"
            style={{
              paddingTop: ys(paddingTop * 0.7),
              fontFamily: "jakarta",
              letterSpacing: 0.3,
            }}
          >
            Already have an account?{"  "}
            <Text
              style={{
                fontFamily: "jakartaSemibold",
                letterSpacing: 0.3,
              }}
              className="text-g300"
            >
              Sign In!
            </Text>
          </Text>
        </Pressable>
        <View
          className="items-center  "
          style={{ paddingTop: ys(paddingTop * 2) }}
        >
          <Text
            className="text-b100"
            style={{
              fontFamily: "jakarta",
              fontSize: ms(8),
            }}
          >
            By continuing you agree to our Terms of Condition.
          </Text>
          <Text
            className="text-b100"
            style={{
              fontFamily: "jakarta",
              fontSize: ms(8),
            }}
          >
            Greenz services are subjet to our Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
};
export default index;

// import { View, FlatList, Dimensions, Pressable, Text } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
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

// //TODO: -change back the headercomponent or find a solution to a sticky search bar

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
//     <View className="flex-1 bg-grayb  ">
//       <CustomHeader
//         searchBarValue={searchBarValue}
//         setSearchBarValue={setSearchBarValue}
//       />
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
//             <View style={{ paddingTop: ys(10) }}>
//               <Text
//                 className="text-b200 text-xl"
//                 style={{ fontFamily: "jakartaSemibold", letterSpacing: 0.3 }}
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
