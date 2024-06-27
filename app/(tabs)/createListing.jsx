import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";
import Divider from "../../components/Divider";
import ImageUpload from "../../components/createListing/imageUpload";
import { Dropdown } from "react-native-element-dropdown";
import ChooseListingCategory from "../../components/createListing/chooseListingCategory";
import AddListingDetails from "../../components/createListing/addListingDetails";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../context/authContext";
import DropdownComponent from "../../components/createListing/dropDown";
import { categories, fruits, veggies } from "../../constants/corpsStuff";
import { Picker } from "@react-native-picker/picker";

import sizes from "../../constants/sizes";
import { StyleSheet } from "react-native";

const CreateListing = () => {
  const { xsm, sm, md, lg, xl, xxl } = sizes;
  const router = useRouter();
  const [dropdownData, setDropdownData] = useState([]);
  const scrollViewRef = useRef(null);
  const [selectedAvailableAmount, setSelectedAvailableAmount] = useState(0);
  const { user } = useAuth();

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/createcorp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingDetails),
      });

      if (!res.ok) {
        throw new Error("Failed to create listing");
      }

      const data = await res.json();
      console.log("Listing created successfully:", data);
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  console.log("ezx a user", user);

  const [listingDetails, setListingDetails] = useState({
    price: null,
    title: null,
    desc: null,
    image:
      "https://cdn1.iconfinder.com/data/icons/fruit-cartoon-flat-cute-fruity/512/orange-1024.png",
    category: null,
    owner: user._id,
    amount: selectedAvailableAmount,
    location: user.location,
  });

  useEffect(() => {
    setListingDetails((prevDetails) => ({
      ...prevDetails,
      amount: selectedAvailableAmount,
    }));
    console.log("selectedAvailableAmount", selectedAvailableAmount);
  }, [selectedAvailableAmount]);

  useEffect(() => {
    if (listingDetails.category === "fruit") {
      setDropdownData(fruits);
    } else if (listingDetails.category === "veggie") {
      setDropdownData(veggies);
    }
  }, [listingDetails.category]);

  const updateListingDetails = (key, value) => {
    setListingDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const handleBack = () => {
    Alert.alert(
      "Discard listing?",
      "Are you sure you want to discard your listing?",
      [
        { text: "Discard", onPress: () => router.back() },
        { text: "Cancel", onPress: () => {} },
      ]
    );
  };

  console.log("listingDetails", listingDetails);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar hidden={false} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          height: ys(30),
        }}
      >
        <Pressable
          onPress={handleBack}
          style={{ position: "absolute", left: 10 }}
        >
          <Feather name="arrow-left" size={ms(24)} color="black" />
        </Pressable>
        <Text className=" font-semibold" style={{ fontSize: ms(md) }}>
          Post what you got
        </Text>
      </View>
      <Divider customStyle={{ marginTop: ys(2), paddingHorizontal: 16 }} />
      <View className="flex-1 ">
        <ScrollView
          // contentContainerStyle={{ flex: 1 }}
          className="bg-white"
          ref={scrollViewRef}
        >
          {/* <View
          style={{ paddingLeft: ms(14), paddingTop: ys(8) }}
          className="flex-row items-center"
        ></View> */}
          <View className="items-center" style={{ paddingTop: ys(md) }}>
            <ImageUpload
              listingDetails={listingDetails}
              updateListingDetails={updateListingDetails}
            />
          </View>
          <ChooseListingCategory
            listingDetails={listingDetails}
            updateListingDetails={updateListingDetails}
          />
          {/* {listingDetails.category && ( */}
          <DropdownComponent
            // onOpen={handleDropdownOpen}
            // onClose={handleDropdownClose}
            data={dropdownData}
            updateListingDetails={updateListingDetails}
            listingDetails={listingDetails}
          />
          {/* )} */}
          <View style={{ paddingHorizontal: xs(sm) }}>
            <AddListingDetails
              listingDetails={listingDetails}
              updateListingDetails={updateListingDetails}
            />
          </View>
          <View
            style={{
              marginHorizontal: xs(sm),
              height: ys(100),
              backgroundColor: "white",
              borderRadius: ms(12),
              padding: ms(12),
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
              justifyContent: "center",
              marginBottom: ys(10),
              marginTop: ys(30),
            }}
          >
            {/* <Text className="text-gray-500">How many do you have?</Text> */}
            <Picker
              selectedValue={selectedAvailableAmount}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedAvailableAmount(itemValue)
              }
              style={{
                width: "100%",
                height: ys(160),
              }}
              mode="dropdown" // Change mode to dropdown to prevent automatic scrolling back
            >
              <Picker.Item label="< 10" value="Less than 10" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="20" value="20" />
              <Picker.Item label="30" value="30" />
              <Picker.Item label="50" value="50" />
              <Picker.Item label="50 <" value="More than 50" />
            </Picker>
          </View>
          <Pressable
            onPress={handleSubmit}
            className="bg-gray-800 rounded-full "
            style={{
              padding: ms(12),
              marginTop: ys(xxl),
              marginHorizontal: xs(sm),
            }}
          >
            <Text
              style={{ fontSize: ms(md), fontFamily: "poppins" }}
              className="text-white text-center"
            >
              Publish
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateListing;
