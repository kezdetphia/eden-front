import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Slider from "@react-native-community/slider";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import Constants from "expo-constants";
import useLocationPermission from "../../hooks/useLocalPermission";

const { EXPO_API_URL } = Constants.expoConfig.extra;

const Search = () => {
  const { location: userLocation, permissionGranted } = useLocationPermission();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [distance, setDistance] = useState(0);
  const [products, setProducts] = useState([]);

  const handleFetchProducts = async () => {
    if (!permissionGranted) {
      console.log("Location permission is not granted.");
      return;
    }

    if (!userLocation) {
      console.log("User location is not available.");
      return;
    }

    try {
      const params = {
        ...(distance && userLocation
          ? {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              radius: distance,
            }
          : {}),
        ...(selectedCategory && { category: selectedCategory }),
        ...(searchText && { title: searchText }),
      };

      console.log("Request params:", params);

      const response = await axios.get(`${EXPO_API_URL}/getfilteredproducts`, {
        params,
      });

      setProducts(response.data);
      console.log("Filtered products:", response.data);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search products"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={selectedCategory}
          onChangeText={setSelectedCategory}
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text>Distance: {distance} miles</Text>
        <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={distance}
          onValueChange={(val) => setDistance(val)}
        />
      </View>

      <Button title="Search Products" onPress={handleFetchProducts} />

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: userLocation ? userLocation.latitude : 37.78825,
            longitude: userLocation ? userLocation.longitude : -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {userLocation && (
            <Marker coordinate={userLocation} title="Your Location" />
          )}
        </MapView>
      </View>

      <View style={styles.resultsContainer}>
        <Text>Search Results:</Text>
        {products.map((product) => (
          <View key={product._id}>
            <Text>{product.title}</Text>
            <Text>{product.category}</Text>
            <Text>{product.zipcode}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10,
  },
  sliderContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  mapContainer: {
    flex: 1,
    width: "100%",
    height: 200,
    marginVertical: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  resultsContainer: {
    paddingVertical: 10,
  },
});
