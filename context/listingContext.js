import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./authContext";

const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
  const { user } = useAuth();
  console.log("listingcontext id", user._id);
  const initialListingDetails = {
    price: "",
    title: "",
    desc: "",
    image: [],
    category: "",
    tier: null,
    owner: user?._id,
    availableQuantity: "",
    exchangeFor: [],
    location: "",
  };

  const [listingDetails, setListingDetails] = useState(initialListingDetails);

  const updateListingDetails = (key, value) => {
    setListingDetails((prevDetails) => ({
      ...prevDetails,
      [key]: key === "image" ? [...prevDetails[key], value] : value,
    }));
  };

  const resetListingDetails = () => {
    setListingDetails({ ...initialListingDetails, owner: user?._id });
  };

  return (
    <ListingContext.Provider
      value={{ listingDetails, updateListingDetails, resetListingDetails }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export const useListing = () => useContext(ListingContext);
