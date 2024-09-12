import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const { EXPO_API_URL } = Constants.expoConfig.extra;

export const fetchCorps = createAsyncThunk("data/fetchCorps", async () => {
  const token = await SecureStore.getItemAsync("authToken");
  const response = await fetch(`${EXPO_API_URL}/getcorps`, {
    // const response = await fetch(`http://localhost:3000/getcorps`, {
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

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import * as SecureStore from "expo-secure-store";
// import Constants from "expo-constants";
// import { createSelector } from "reselect";

// const { EXPO_API_URL } = Constants.expoConfig.extra;

// // Thunk for fetching all products
// export const fetchCorps = createAsyncThunk("data/fetchCorps", async () => {
//   const token = await SecureStore.getItemAsync("authToken");
//   const response = await fetch(`${EXPO_API_URL}/getcorps`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   const data = await response.json();
//   if (!Array.isArray(data.corps)) {
//     throw new Error("Data is not an array");
//   }
//   return data.corps;
// });

// // Thunk for fetching a single product by ID
// export const fetchSingleCorp = createAsyncThunk(
//   "data/fetchSingleCorp",
//   async (productId) => {
//     const token = await SecureStore.getItemAsync("authToken");
//     const response = await fetch(`${EXPO_API_URL}/getcorp/${productId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     return data.corp;
//   }
// );

// const dataSlice = createSlice({
//   name: "data",
//   initialState: {
//     data: [],
//     singleProduct: null,
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Handle fetchCorps
//       .addCase(fetchCorps.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCorps.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.data = action.payload;
//       })
//       .addCase(fetchCorps.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       // Handle fetchSingleCorp
//       .addCase(fetchSingleCorp.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchSingleCorp.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.singleProduct = action.payload;
//       })
//       .addCase(fetchSingleCorp.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// // Memoized selector to get a product by ID
// export const selectProductById = createSelector(
//   (state) => state.data.data,
//   (_, productId) => productId,
//   (data, productId) => data.find((product) => product.id === productId)
// );

// export default dataSlice.reducer;
