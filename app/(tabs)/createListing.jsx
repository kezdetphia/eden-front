import {
  View,
  ScrollView,
  StatusBar,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
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
import Divider from "../../components/Divider";
import ImageUpload from "../../components/createListing/imageUpload";
import { Dropdown } from "react-native-element-dropdown";
import ChooseListingCategory from "../../components/createListing/chooseListingCategory";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../context/authContext";
import DropdownComponent from "../../components/createListing/dropDown";
import { fruits, vegetable } from "../../utils/corpsStuff";
import Constants from "expo-constants";

import sizes from "../../constants/sizes";
import CustomButton from "../../components/customButton";
import ListingType from "../../components/createListing/listingType";
import Quantity from "../../components/createListing/quantity";
import Description from "../../components/createListing/description";
import CustomText from "../../components/customText";
import ListingTypePaid from "../../components/createListing/listingType-Paid";
import ListingTypeExchange from "../../components/createListing/listingType-Exchange";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import Toast from "react-native-root-toast";

//TODO: make the keyboard avoid view work
// https://docs.expo.dev/guides/keyboard-handling/

const { paddingSides, paddingTop, subtitle, title } = sizes;
const CreateListing = () => {
  const { EXPO_API_URL } = Constants.expoConfig.extra;
  const router = useRouter();
  const [dropdownData, setDropdownData] = useState([]);
  const scrollViewRef = useRef(null);
  const [selectedAvailableAmount, setSelectedAvailableAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const [highlightedFields, setHighlightedFields] = useState([]);

  const initialListingDetails = {
    price: "",
    title: "",
    desc: "",
    image: [],
    category: "",
    tier: null,
    owner: user._id,
    amount: "",
    location: user.location,
    exchangeFor: [],
  };

  const [listingDetails, setListingDetails] = useState(initialListingDetails);

  const validateFields = () => {
    const requiredFields = [
      "title",
      "desc",
      "image",
      "category",
      "tier",
      "amount",
    ];
    const emptyFields = requiredFields.filter(
      (field) =>
        !listingDetails[field] ||
        (Array.isArray(listingDetails[field]) &&
          listingDetails[field].length === 0)
    );
    if (emptyFields.length > 0) {
      handleToast("Please fill in all required fields.");
      setHighlightedFields(emptyFields);
      return false;
    }
    setHighlightedFields([]);
    return true;
  };

  //Submit the listing to the backend
  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }
    setIsSubmitting(true);
    const token = await SecureStore.getItemAsync("authToken");
    try {
      console.log("Submitting listing details:", listingDetails); // Log the payload
      const res = await fetch(`${EXPO_API_URL}/createcorp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(listingDetails),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server error response:", errorData);
        setIsSubmitting(false);
        handleToast("Failed to create listing", "error");
        throw new Error(
          `Failed to create listing: ${errorData.error || res.statusText}`
        );
      }

      const data = await res.json();
      console.log("Listing created successfully:", data);
      handleToast("Listing created successfully", "success");
    } catch (error) {
      console.error("Error creating listing:", error);
      handleToast("Failed to create listing", "error");
    } finally {
      setIsSubmitting(false);
      setListingDetails(initialListingDetails);
    }
  };

  console.log("Initial listingDetailssss        ", listingDetails);

  useEffect(() => {
    setListingDetails((prevDetails) => ({
      ...prevDetails,
      amount: selectedAvailableAmount,
    }));
  }, [selectedAvailableAmount]);

  useEffect(() => {
    if (listingDetails.category === "fruit") {
      setDropdownData(fruits);
    } else if (listingDetails.category === "vegetable") {
      setDropdownData(vegetable);
    }
  }, [listingDetails.category]);

  //Function to update the listing details with key value pairs
  const updateListingDetails = (key, value) => {
    setListingDetails((prevDetails) => {
      if (key === "image") {
        return {
          ...prevDetails,
          [key]: [...prevDetails[key], value], // Append the new URL to the existing array
        };
      }
      return {
        ...prevDetails,
        [key]: value,
      };
    });
  };

  const handleBack = () => {
    Alert.alert(
      "Discard listing?",
      "Are you sure you want to discard your listing?",
      [
        {
          text: "Discard",
          onPress: () => {
            setListingDetails(initialListingDetails);
            router.back();
          },
        },
        { text: "Cancel", onPress: () => {} },
      ]
    );
  };

  const handleToast = (message) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <StatusBar hidden={false} />
        <View
          className="flex-row justify-center items-center"
          style={{
            height: ys(paddingTop * 3),
          }}
        >
          <Pressable
            onPress={handleBack}
            style={{ position: "absolute", left: 10 }}
          >
            <Feather name="arrow-left" size={ms(24)} color="black" />
          </Pressable>
          <CustomText semibold md>
            Create listing
          </CustomText>
        </View>

        <Divider customStyle={{ marginTop: ys(2), paddingHorizontal: 16 }} />
        <View
          className="flex-1  "
          style={{ paddingHorizontal: xs(paddingSides) }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            className=""
            ref={scrollViewRef}
          >
            {/* Photos */}
            <View style={{ paddingTop: ys(paddingTop * 1.5) }}>
              <CustomText semibold md title black>
                Photos
              </CustomText>
              <ImageUpload
                listingDetails={listingDetails}
                user={user}
                updateListingDetails={updateListingDetails}
                highlight={highlightedFields.includes("image")}
              />
            </View>
            {/* Category */}
            <View style={{ paddingTop: ys(paddingTop * 2) }}>
              <CustomText semibold md title black>
                Category
              </CustomText>

              <ChooseListingCategory
                listingDetails={listingDetails}
                updateListingDetails={updateListingDetails}
                highlight={highlightedFields.includes("category")}
              />
            </View>

            {/* Item */}
            <View style={{ paddingTop: ys(paddingTop * 2) }}>
              <CustomText semibold md title black>
                Item
              </CustomText>
              <DropdownComponent
                data={dropdownData}
                updateListingDetails={updateListingDetails}
                listingDetails={listingDetails}
                highlight={highlightedFields.includes("tier")}
              />
            </View>

            {/* Type */}
            <View style={{ paddingTop: ys(paddingTop * 2) }}>
              <CustomText semibold md title black>
                Type
              </CustomText>
              <ListingType
                listingDetails={listingDetails}
                updateListingDetails={updateListingDetails}
                highlight={highlightedFields.includes("tier")}
              />
            </View>
            {/* Type - paid */}
            {listingDetails.tier === "Sell" && (
              <View style={{ paddingTop: ys(paddingTop * 2) }}>
                <CustomText semibold md title black>
                  Price
                </CustomText>
                <ListingTypePaid
                  listingDetails={listingDetails}
                  updateListingDetails={updateListingDetails}
                  highlight={highlightedFields.includes("price")}
                />
              </View>
            )}
            {/* Type - exchange */}
            {listingDetails.tier === "Exchange" && (
              <View style={{ paddingTop: ys(paddingTop * 2) }}>
                <CustomText semibold md title black>
                  I need
                </CustomText>
                <ListingTypeExchange
                  data={dropdownData}
                  updateListingDetails={updateListingDetails}
                  listingDetails={listingDetails}
                  highlight={highlightedFields.includes("exchangeFor")}
                />
              </View>
            )}
            {/* Quantity */}
            <View style={{ paddingTop: ys(paddingTop * 2) }}>
              <CustomText semibold md title black>
                Quantity Available
              </CustomText>
              <Quantity
                listingDetails={listingDetails}
                updateListingDetails={updateListingDetails}
                highlight={highlightedFields.includes("amount")}
              />
            </View>
            {/* Description */}
            <View style={{ paddingTop: ys(paddingTop * 2) }}>
              <CustomText semibold md title black>
                Description
              </CustomText>
              <Description
                listingDetails={listingDetails}
                updateListingDetails={updateListingDetails}
                highlight={highlightedFields.includes("desc")}
              />
            </View>
            <CustomButton
              submit={handleSubmit}
              text={isSubmitting ? "Publishing..." : "Publish"}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateListing;
