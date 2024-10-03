import { useState } from "react";
import { getCoordinatesFromZip, calculateDistance } from "../utils/geoService";

const useGeoDistanceCalculator = () => {
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  //CALCULATING DISTANCE
  const calculate = async (zip1, zip2) => {
    try {
      const coords1 = await getCoordinatesFromZip(zip1);
      const coords2 = await getCoordinatesFromZip(zip2);
      const dist = calculateDistance(
        coords1.latitude,
        coords1.longitude,
        coords2.latitude,
        coords2.longitude
      );
      setDistance(dist.toFixed(2)); // Distance in km
      setError(null); // Reset error if successful
    } catch (err) {
      setError("Error calculating distance. Please check the zip codes.");
      console.error(err);
    }
  };

  //GEOCODING - GETTING COORDINATES FROM ZIP CODE
  const geocode = async (zip) => {
    try {
      const coords = await getCoordinatesFromZip(zip);
      console.log("Geocoded coordinates:", coords); // Debugging log
      setCoordinates(coords);
      setError(null); // Reset error if successful
    } catch (err) {
      setError("Error fetching location data. Please check the zip code.");
      console.error(err);
    }
  };

  return { distance, error, calculate, coordinates, geocode };
};

export default useGeoDistanceCalculator;
