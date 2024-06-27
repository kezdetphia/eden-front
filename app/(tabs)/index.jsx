import {
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import ProductCard from "../../components/productCard";
import CategoryScroll from "../../components/homescreen/CategoryScroll";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";

const HomeScreen = () => {
  const { marginxxs, xxs, xsm, sm, md, lg, xl, xxl } = sizes;
  const categories = ["fruit", "vegetable"];
  const categoryImage = {
    fruit: require("../../assets/images/orange.png"),
    vegetable: require("../../assets/images/carrot.png"),
  };
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isAuthenticated, authLoading, user } = useAuth();
  const router = useRouter();

  const screenWidth = Dimensions.get("window").width;
  const numColumns = screenWidth > 1200 ? 4 : screenWidth > 800 ? 3 : 2;
  const cardWidth = screenWidth / numColumns - 10; // Adjust for margin

  useEffect(() => {
    fetchCorps();
  }, []);

  const fetchCorps = async () => {
    try {
      const response = await fetch("http://localhost:3000/getcorps");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (!Array.isArray(data.corps)) {
        throw new Error("Data is not an array");
      }
      setData(data.corps);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  const filteredData = selectedCategory
    ? data.filter((item) => item.category === selectedCategory)
    : data;

  return (
    <SafeAreaView className="flex-1 bg-lightwhite">
      <View style={{ marginTop: ys(marginxxs) }}>
        <CategoryScroll
          categoryImage={categoryImage}
          categories={categories}
          wantUnderLine={true}
          onCategorySelect={setSelectedCategory}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: ys(marginxxs) }}
        key={numColumns} // Change the key prop to force re-render
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
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
    </SafeAreaView>
  );
};

export default HomeScreen;
