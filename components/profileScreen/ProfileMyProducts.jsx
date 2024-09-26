import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "../customText";
import Constants from "expo-constants";

const ProfileMyProducts = ({ user }) => {
  const { EXPO_API_URL } = Constants.expoConfig.extra;
  const [meWithProducts, setMeWithProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMyProducts = async () => {
      try {
        const res = await fetch(
          `${EXPO_API_URL}/api/users/getuserwithproducts/${user?._id}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setMeWithProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMyProducts();
  }, [user]);

  const renderItem = ({ item }) => (
    <View key={item?._id} className="flex flex-row bg-white  rounded-lg ">
      <View className="p-4 flex-row">
        <View className="mr-3">
          <Image
            source={{ uri: item?.image[0] }}
            style={{ width: 80, height: 80 }}
          />
        </View>
        <View>
          <CustomText>{item?.title}</CustomText>
          <CustomText>{item?.category}</CustomText>
        </View>
        {/* {item?.image?.map((imgUri, index) => (
        <Image
        key={index}
        source={{ uri: imgUri }}
        style={{ width: 100, height: 100 }}
        />
        ))} */}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex mb-40">
      {loading ? (
        <CustomText>Loading...</CustomText>
      ) : error ? (
        <CustomText>Error: {error}</CustomText>
      ) : meWithProducts.myCorps?.length > 0 ? (
        <View style={styles.flatListContainer}>
          <FlatList
            data={meWithProducts.myCorps}
            renderItem={renderItem}
            keyExtractor={(item) => item?._id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      ) : (
        <CustomText>No products found.</CustomText>
      )}
    </SafeAreaView>
  );
};

export default ProfileMyProducts;

const styles = StyleSheet.create({
  separator: {
    height: 10, // Adjust the height to control the gap
  },
  flatListContainer: {
    marginBottom: 20, // Adjust the margin as needed
  },
});
