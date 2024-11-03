import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
