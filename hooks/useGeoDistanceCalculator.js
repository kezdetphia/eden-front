import { useState } from "react";
import { getCoordinatesFromZip, calculateDistance } from "../utils/geoService";

const useGeoDistanceCalculator = () => {
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

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
      setDistance(dist.toFixed(2));
      setError(null);
    } catch (err) {
      setError("Error calculating distance. Please check the ZIP codes.");
      console.error(err);
    }
  };

  const geocode = async (zip) => {
    try {
      const coords = await getCoordinatesFromZip(zip);
      if (coords && coords.latitude && coords.longitude) {
        setCoordinates(coords);
        setError(null);
        return coords; // Return coordinates to be used in handlePublish
      } else {
        throw new Error("Coordinates not found for the provided ZIP code.");
      }
    } catch (err) {
      console.error("Geocode Error:", err.message || err);
      setError("Failed to fetch coordinates. Please check the ZIP code.");
      throw err; // Rethrow error for handlePublish to catch
    }
  };

  return { distance, error, calculate, coordinates, geocode };
};

export default useGeoDistanceCalculator;
