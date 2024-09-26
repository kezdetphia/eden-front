import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const { EXPO_API_URL } = Constants.expoConfig.extra;

export const fetchCorps = createAsyncThunk("data/fetchCorps", async () => {
  const token = await SecureStore.getItemAsync("authToken");
  const response = await fetch(`${EXPO_API_URL}/getproducts`, {
    // const response = await fetch(`http://localhost:3000/getproducts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (!Array.isArray(data.corps)) {
    throw new Error("Data is not an array");
  }
  return data.corps;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCorps.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCorps.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCorps.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
