import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../Slices/productsSlice";

const Store = configureStore({
  reducer: {
    products: productsSlice,
  },
});

export default Store;