import axios from "axios";

const GEOCODE_API_KEY = "97ac22446311402d85d198c210830f36"; // Replace with your API key
const GEOCODE_API_URL = "https://api.opencagedata.com/geocode/v1/json";

export const getCoordinatesFromZip = async (zipCode) => {
  try {
    const response = await axios.get(
      `${GEOCODE_API_URL}?q=${zipCode}+United+States&key=${GEOCODE_API_KEY}`
    );
    const results = response.data.results;
    if (results.length > 0) {
      const { lat, lng } = results[0].geometry;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInKm = R * c; // Distance in km
  const distanceInMiles = distanceInKm / 1.60934; // Convert to miles
  return distanceInMiles;
};
