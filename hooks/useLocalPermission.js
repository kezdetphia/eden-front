import { useState } from "react";
import * as Location from "expo-location";

const useLocationPermission = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    } catch (error) {
      setErrorMsg("Error getting location");
      console.error("Location error:", error);
    }
  };

  return { location, errorMsg, requestLocationPermission };
};

export default useLocationPermission;
