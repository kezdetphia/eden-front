import {
  View,
  FlatList,
  Dimensions,
  Pressable,
  Text,
  RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import ProductCard from "../../components/productCard";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import CategoryCard from "../../components/CategoryCard";
import FilterScroll from "../../components/FilterScroll";
import HomeCustomHeader from "../../components/homescreen/HomeCustomHeader";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/dataSlice";
import CustomText from "../../components/customText";

//TODO: -change back the headercomponent or find a solution to a sticky search bar
// - Implement a pull down to refresh function

const HomeScreen = () => {
  const { paddingSides, marginxxs } = sizes;
  const categories = ["fruit", "vegetable"];
  const filterOptions = ["All", "Trade", "Free", "Buy"];

  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const dataStatus = useSelector((state) => state.data.status);
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchBarValue, setSearchBarValue] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing

  const screenWidth = Dimensions.get("window").width;
  const numColumns = screenWidth > 1200 ? 4 : screenWidth > 800 ? 3 : 2;
  const cardWidth = screenWidth / numColumns - 10; // Adjust for margin

  // console.log("home filteredData", filteredData);
  // console.log("home selectedCategory", selectedCategory);
  // console.log("home selectedFilter", selectedFilter);
  // console.log("home searchBarValue", searchBarValue);

  useEffect(() => {
    if (user === "undefined" || !isAuthenticated) {
      router.replace("/");
    }
  });

  useEffect(() => {
    if (user === "undefined" || !isAuthenticated) {
      router.replace("/");
    }
  }, [user, isAuthenticated, router]);

  useEffect(() => {
    if (dataStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [dataStatus, dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchProducts());
    setRefreshing(false);
  };

  const filteredData = data
    .filter((item) => {
      const categoryMatch = selectedCategory
        ? item.category === selectedCategory
        : true;
      const filterMatch = selectedFilter
        ? selectedFilter === "All"
          ? true
          : item.tier && item.tier === selectedFilter
        : true;
      const titleMatch = searchBarValue
        ? item.title.includes(searchBarValue)
        : true;
      return categoryMatch && filterMatch && titleMatch;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by newest first

  return (
    <View className="flex-1 bg-grayb">
      <HomeCustomHeader
        searchBarValue={searchBarValue}
        setSearchBarValue={setSearchBarValue}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: ys(marginxxs) }}
        key={numColumns}
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View
            style={{
              paddingHorizontal: xs(paddingSides),
              paddingTop: ys(paddingSides),
            }}
          >
            <View style={{ paddingTop: ys(10) }}>
              <CustomText md semibold>
                Discover Fresh, Seasonal Fruits and vegetable
              </CustomText>
              {/* <Text
                className="text-b200 text-xl"
                style={{ fontFamily: "jakartaSemibold", letterSpacing: 0.3 }}
              >
                Discover Fresh, Seasonal Fruits and vegetable
              </Text> */}
            </View>

            <View style={{ paddingTop: ys(paddingSides + 4) }}>
              <CategoryCard
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
              />
            </View>
            <View style={{ paddingTop: ys(paddingSides + 4) }}>
              <FilterScroll
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                filterOptions={filterOptions}
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={{
              paddingTop: ys(paddingSides + 4),
            }}
          >
            <Pressable
              onPress={() =>
                router.push({
                  pathname: `/productdetails/[id]`,
                  params: { id: item._id, previousWindow: "home" },
                })
              }
            >
              <ProductCard product={item} cardWidth={cardWidth} />
            </Pressable>
          </View>
        )}
        numColumns={numColumns}
        contentContainerStyle={{
          justifyContent: "center",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default HomeScreen;
