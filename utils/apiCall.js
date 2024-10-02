//this is currently not being used

import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

export const apiCall = async (endpoint, method, data = null) => {
  const { EXPO_API_URL } = Constants.expoConfig.extra;
  try {
    const token = await SecureStore.getItemAsync("authToken");

    const response = await axios({
      url: `${EXPO_API_URL}${endpoint}`,
      method: method.toLowerCase(), // Ensure method is a valid string
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Server error response:", error.response.data);
      throw new Error(
        `API call failed: ${
          error.response.data.error || error.response.statusText
        }`
      );
    } else {
      // Network error or other issues
      console.error("Error making API call:", error.message);
      throw new Error("API call failed");
    }
  }
};
