import { View, FlatList, Dimensions, Pressable, Text } from "react-native";
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
import CustomHeader from "../../components/homescreen/HomeCustomHeader";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
const { EXPO_API_URL } = Constants.expoConfig.extra;
import { useDispatch, useSelector } from "react-redux";
import { fetchCorps } from "../../store/dataSlice";

//TODO: -change back the headercomponent or find a solution to a sticky search bar

const HomeScreen = () => {
  const { paddingSides, marginxxs } = sizes;
  const categories = ["Fruit", "Vegetable"];
  const filterOptions = ["All", "Exchange", "Free", "Buy"];

  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const dataStatus = useSelector((state) => state.data.status);
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchBarValue, setSearchBarValue] = useState(null);

  const screenWidth = Dimensions.get("window").width;
  const numColumns = screenWidth > 1200 ? 4 : screenWidth > 800 ? 3 : 2;
  const cardWidth = screenWidth / numColumns - 10; // Adjust for margin

  useEffect(() => {
    if (user === "undefined" || !isAuthenticated) {
      router.replace("/");
    }
  });

  console.log("main page data", data);
  useEffect(() => {
    if (user === "undefined" || !isAuthenticated) {
      router.replace("/");
    }
  }, [user, isAuthenticated, router]);

  useEffect(() => {
    if (dataStatus === "idle") {
      dispatch(fetchCorps());
    }
  }, [dataStatus, dispatch]);

  const filteredData = data.filter((item) => {
    const categoryMatch = selectedCategory
      ? item.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const filterMatch = selectedFilter
      ? selectedFilter === "All"
        ? true
        : item.tier && item.tier === selectedFilter
      : true;
    const titleMatch = searchBarValue
      ? item.title.toLowerCase().includes(searchBarValue.toLowerCase())
      : true;
    return categoryMatch && filterMatch && titleMatch;
  });

  return (
    <View className="flex-1 bg-grayb">
      <CustomHeader
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
              <Text
                className="text-b200 text-xl"
                style={{ fontFamily: "jakartaSemibold", letterSpacing: 0.3 }}
              >
                Discover Fresh, Seasonal Fruits and Vegetables
              </Text>
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
          <Pressable
            onPress={() =>
              router.push({
                pathname: `/productdetails/[id]`,
                params: { id: item._id },
              })
            }
          >
            <ProductCard product={item} cardWidth={cardWidth} />
          </Pressable>
        )}
        numColumns={numColumns}
        contentContainerStyle={{
          justifyContent: "center",
        }}
      />
    </View>
  );
};

export default HomeScreen;
