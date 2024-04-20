import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../Slices/productsSlice";
import searchSlice from "../Slices/searchSlice";
import filterSlice from "../Slices/filterSlice";

const Store = configureStore({
  reducer: {
    products: productsSlice,
    search: searchSlice,
    filter: filterSlice
  },
});

export default Store;