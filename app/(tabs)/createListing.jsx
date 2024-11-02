import {
  View,
  ScrollView,
  StatusBar,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useRef } from "react";
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
import ChooseListingCategory from "../../components/createListing/chooseListingCategory";
import sizes from "../../constants/sizes";
import CustomButton from "../../components/customButton";
import ListingType from "../../components/createListing/listingType";
import Quantity from "../../components/createListing/quantity";
import Description from "../../components/createListing/description";
import ListingTypePaid from "../../components/createListing/listingType-Paid";
import ListingTypeExchange from "../../components/createListing/listingType-Exchange";
import Location from "../../components/createListing/location";
import ListingTitle from "../../components/createListing/title";

import { useListing } from "../../context/listingContext";
import CustomText from "../../components/customText";

const { paddingSides, paddingTop } = sizes;

const CreateListing = () => {
  const {
    listingDetails,
    resetListingDetails,
    handleSubmit,
    handleToast,
    isSubmitting,
  } = useListing();
  const router = useRouter();
  const [dropdownData, setDropdownData] = useState([]);
  const scrollViewRef = useRef(null);

  const handleBack = () => {
    Alert.alert(
      "Discard listing?",
      "Are you sure you want to discard your listing?",
      [
        {
          text: "Discard",
          onPress: () => {
            resetListingDetails();
            router.back();
          },
        },
        { text: "Cancel", onPress: () => {} },
      ]
    );
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <StatusBar hidden={false} />
        <View
          className="flex-row justify-center items-center "
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
        <View style={{ flex: 1, paddingHorizontal: xs(paddingSides) }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="bg-grayb"
            ref={scrollViewRef}
          >
            <View style={{ paddingTop: ys(paddingTop * 1.5) }}>
              <CustomText semibold md title black>
                Photos
              </CustomText>
              <ImageUpload />
            </View>

            <View style={{ paddingTop: ys(paddingTop * 2) }}>
              <CustomText semibold md title black>
                Category
              </CustomText>
              <ChooseListingCategory />
            </View>

            <View style={{ paddingTop: ys(paddingTop * 2) }}>
              <CustomText semibold md title black>
                Item
              </CustomText>
              <ListingTitle
                selectedCategory={listingDetails?.category}
                handleToast={handleToast}
              />
            </View>

            <View style={{ paddingTop: ys(paddingTop * 2) }}>
              <CustomText semibold md title black>
                Type
              </CustomText>
              <ListingType />
            </View>

            {listingDetails.tier === "Sell" && (
              <View style={{ paddingTop: ys(paddingTop * 2) }}>
                <CustomText semibold md title black>
                  Price
                </CustomText>
                <ListingTypePaid />
              </View>
            )}

            {listingDetails.tier === "Trade" && (
              <View style={{ paddingTop: ys(paddingTop * 2) }}>
                <CustomText semibold md title black>
                  I need
                </CustomText>
                <ListingTypeExchange data={dropdownData} />
              </View>
            )}

            <View style={{ paddingTop: ys(paddingTop * 2) }}>
              <CustomText semibold md title black>
                Quantity Available
              </CustomText>
              <Quantity />
            </View>

            <View style={{ paddingTop: ys(paddingTop * 2) }}>
              <CustomText semibold md title black>
                Zip Code
              </CustomText>
              <Location />
            </View>

            <View style={{ paddingTop: ys(paddingTop * 2) }}>
              <CustomText semibold md title black>
                Description
              </CustomText>
              <Description />
            </View>

            <View style={{ paddingVertical: ys(paddingTop) }}>
              <CustomButton
                submit={() => handleSubmit(router)}
                text={isSubmitting ? "Publishing..." : "Publish"}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateListing;
