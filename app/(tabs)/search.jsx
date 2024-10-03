import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import useGeoDistanceCalculator from "../../hooks/useGeoDistanceCalculator";
import MapView, { Marker } from "react-native-maps";

const Search = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [zip1, setZip1] = useState("");
  const [zip2, setZip2] = useState("");
  const [mapRegion, setMapRegion] = useState(null); // State to manage map region
  const {
    distance,
    error,
    calculate,
    coordinates: markerLocation,
    geocode,
  } = useGeoDistanceCalculator();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setMapRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleCalculateDistance = () => {
    calculate(zip1, zip2);
  };

  const handleGeocodeZip1 = async () => {
    console.log("zip1", zip1);
    await geocode(zip1);
    if (markerLocation) {
      setMapRegion({
        latitude: markerLocation.latitude,
        longitude: markerLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View
        style={{ padding: 20 }}
        className="flex-1 items-center justify-center"
      >
        <TextInput
          placeholder="Enter first zip code"
          value={zip1}
          onChangeText={setZip1}
        />
        <Button title="Geocode Zip" onPress={handleGeocodeZip1} />
        <TextInput
          placeholder="Enter second zip code"
          value={zip2}
          onChangeText={setZip2}
        />
        <Button title="Calculate Distance" onPress={handleCalculateDistance} />
        {distance && <Text>Distance: {distance} miles</Text>}
        {error && <Text style={{ color: "red" }}>{error}</Text>}
      </View>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={mapRegion} // Use the mapRegion state
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {markerLocation && (
            <Marker coordinate={markerLocation} title="Marker Location" />
          )}
        </MapView>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "70%",
  },
});
///SEARCH BAR

// import { View, Text, SafeAreaView, TextInput, Image } from "react-native"; // Import Image from react-native
// import { StatusBar } from "expo-status-bar";

// import {
//   scale as xs,
//   verticalScale as ys,
//   moderateScale as ms,
// } from "react-native-size-matters";
// import sizes from "../../constants/sizes";
// import { Entypo, Feather } from "@expo/vector-icons";
// import { EvilIcons } from "@expo/vector-icons";
// import { useAuth } from "@/context/authContext";
// import CustomText from "../../components/customText";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function HomeCustomHeader({}) {
//   const { sm, paddingSides, paddingTop } = sizes;

//   // const categories = ["fruit", "vegetable"];
//   // const filterOptions = ["All", "Trade", "Free", "Buy"];
//   const [searchBarValue, setSearchBarValue] = useState(null);
//   const { isAuthenticated, user } = useAuth();
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.data.data);
//   const dataStatus = useSelector((state) => state.data.status);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedFilter, setSelectedFilter] = useState("All");

//   useEffect(() => {
//     if (dataStatus === "idle") {
//       dispatch(fetchProducts());
//     }
//   }, [dataStatus, dispatch]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await dispatch(fetchProducts());
//     setRefreshing(false);
//   };

//   const filteredData = data
//     .filter((item) => {
//       const categoryMatch = selectedCategory
//         ? item.category === selectedCategory
//         : true;
//       const filterMatch = selectedFilter
//         ? selectedFilter === "All"
//           ? true
//           : item.tier && item.tier === selectedFilter
//         : true;
//       const titleMatch = searchBarValue
//         ? item.title.includes(searchBarValue)
//         : true;
//       return categoryMatch && filterMatch && titleMatch;
//     })
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by newest first

//   return (
//     <>
//       {/* <StatusBar hidden={false} /> */}
//       <SafeAreaView style={{ backgroundColor: "transparent" }}>
//         <View
//           className="flex flex-row justify-between "
//           style={{
//             // paddingHorizontal: xs(paddingSides),
//             paddingTop: ys(paddingTop * 1.5),
//             paddingHorizontal: xs(paddingSides),
//           }}
//         >
//           {/* <View>
//             <View className="flex flex-row ">
//               <CustomText xl> Hi,</CustomText>

//               <CustomText bold xl b200>
//                 {" "}
//                 {user?.username?.charAt(0).toUpperCase() +
//                   user.username.slice(1)}
//               </CustomText>
//             </View>
//             <View
//               className="flex-row items-center   "
//               style={{ paddingTop: ys(4) }}
//             >
//               <Entypo
//                 className="pr-1 "
//                 name="location-pin"
//                 size={ms(16)}
//                 color="#69D94E"
//               />
//               <CustomText b100>{user?.location}</CustomText>
//             </View>
//           </View> */}

//           {/* <View>
//             <Image
//               className="rounded-xl"
//               source={
//                 user?.avatar
//                   ? { uri: user.avatar }
//                   : require("../../assets/images/avatar.png")
//               }
//               style={{ width: ms(40), height: ms(40) }}
//             />
//           </View> */}
//         </View>

//         <View style={{ paddingHorizontal: xs(paddingSides) }}>
//           <View
//             className="flex-row items-center bg-white rounded-xl border border-g200     "
//             style={{
//               // marginHorizontal: xs(paddingSides),
//               height: ys(35),
//               marginTop: ys(paddingSides + 2),
//             }}
//           >
//             <EvilIcons
//               name="search"
//               size={ms(24)}
//               color="#83DF6C"
//               style={{ paddingLeft: xs(paddingSides) }}
//             />
//             <TextInput
//               className=" flex-1 "
//               placeholder="Search Apple"
//               style={{
//                 marginLeft: 10,
//                 fontFamily: "jakarta",
//                 fontSize: ms(14),
//               }}
//               value={searchBarValue}
//               onChangeText={(text) => setSearchBarValue(text)}
//             />
//             <Feather
//               style={{ paddingRight: xs(paddingSides) }}
//               name="delete"
//               size={ms(18)}
//               color="#6C6C6C"
//               onPress={() => setSearchBarValue(null)}
//             />
//           </View>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// }
