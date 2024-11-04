import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useLocationPermission = () => {
  const [location, setLocation] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          setPermissionGranted(true);
          const loc = await Location.getCurrentPositionAsync({});
          setLocation(loc.coords);
        } else {
          setPermissionGranted(false);
          setLocation(null);
          setError("Permission to access location was denied");
        }
      } catch (err) {
        setError("Error requesting location permission: " + err.message);
      }
    };

    requestPermission();
  }, []);

  return { location, permissionGranted, error };
};

export default useLocationPermission;
