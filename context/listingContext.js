// context/ListingContext.js
import React, { createContext, useContext, useState } from "react";

const ListingContext = createContext();

export function ListingProvider({ children }) {
  const [listingDetails, setListingDetails] = useState({
    price: "",
    title: "",
    desc: "",
    image: [],
    category: "",
    tier: null,
    owner: null,
    availableQuantity: "",
    exchangeFor: [],
    location: "",
  });

  const updateListingDetails = (key, value) => {
    setListingDetails((prevDetails) => ({
      ...prevDetails,
      [key]: key === "image" ? [...prevDetails[key], value] : value,
    }));
  };

  return (
    <ListingContext.Provider value={{ listingDetails, updateListingDetails }}>
      {children}
    </ListingContext.Provider>
  );
}

export const useListing = () => useContext(ListingContext);
