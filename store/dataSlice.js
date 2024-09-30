import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const { EXPO_API_URL } = Constants.expoConfig.extra;

export const fetchProducts = createAsyncThunk(
  "data/fetchProducts",
  async () => {
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
    if (!Array.isArray(data.products)) {
      throw new Error("Data is not an array");
    }
    return data.products;
  }
);

const dataSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
