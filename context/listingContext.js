import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import Toast from "react-native-root-toast";
import { useAuth } from "./authContext";

const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
  const { user } = useAuth();
  const { EXPO_API_URL } = Constants.expoConfig.extra;
  const [listingDetails, setListingDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("user", user?._id);

  const initialListingDetails = {
    price: "",
    title: "",
    desc: "",
    image: [],
    category: "",
    tier: null,
    owner: null, // Now correctly uses user._id
    availableQuantity: "",
    exchangeFor: [],
    location: "",
  };

  useEffect(() => {
    // Initialize listingDetails when user becomes available
    if (user && !listingDetails) {
      setListingDetails({
        price: "",
        title: "",
        desc: "",
        image: [],
        category: "",
        tier: null,
        owner: user._id, // Now correctly uses user._id
        availableQuantity: "",
        exchangeFor: [],
        location: "",
      });
    }
  }, [user, listingDetails]);

  console.log("listingDetails", listingDetails);

  const updateListingDetails = (key, value) => {
    setListingDetails((prevDetails) => ({
      ...prevDetails,
      [key]: key === "image" ? [...prevDetails[key], value] : value,
    }));
  };

  const resetListingDetails = () => setListingDetails(initialListingDetails);

  const handleToast = (message, type = "default") => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor: type === "error" ? "red" : "green",
    });
  };

  const validateFields = () => {
    const requiredFields = [
      "title",
      "desc",
      "image",
      "category",
      "tier",
      "availableQuantity",
      "location",
    ];
    const emptyFields = requiredFields.filter(
      (field) =>
        !listingDetails[field] ||
        (Array.isArray(listingDetails[field]) &&
          listingDetails[field].length === 0)
    );
    if (emptyFields.length > 0) {
      handleToast("Please fill in all fields!", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (router) => {
    if (!validateFields()) return;

    setIsSubmitting(true);
    const token = await SecureStore.getItemAsync("authToken");
    try {
      console.log("Submitting listing details:", listingDetails);
      const res = await fetch(`${EXPO_API_URL}/createproduct`, {
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
        handleToast("Failed to create listing", "error");
        throw new Error(
          `Failed to create listing: ${errorData.error || res.statusText}`
        );
      }

      const data = await res.json();
      console.log("Listing created successfully:", data);
      handleToast("Listing created successfully", "success");
      router.push("/");
    } catch (error) {
      console.error("Error creating listing:", error);
      handleToast("Failed to create listing", "error");
    } finally {
      setIsSubmitting(false);
      resetListingDetails();
    }
  };

  return (
    <ListingContext.Provider
      value={{
        listingDetails,
        updateListingDetails,
        resetListingDetails,
        handleSubmit,
        handleToast,
        isSubmitting,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export const useListing = () => useContext(ListingContext);
