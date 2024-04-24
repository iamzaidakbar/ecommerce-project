import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../Slices/productsSlice";
import searchSlice from "../Slices/searchSlice";
import filterSlice from "../Slices/filterSlice";
import clothingSlice from "../Slices/clothingSlice";

const Store = configureStore({
  reducer: {
    products: productsSlice,
    search: searchSlice,
    filter: filterSlice,
    clothes: clothingSlice
  },
});

export default Store;