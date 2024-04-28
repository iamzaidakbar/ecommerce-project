import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../Slices/productsSlice";
import clothingSlice from "../Slices/clothingSlice";
import discountSlice from "../Slices/discountSlice";
import electronicsSlice from "../Slices/electronicsSlice";
import jewelerySlice from "../Slices/jewelerySlice";
import userSlice from "../Slices/userSlice";
import errorSlice from "../Slices/errorSlice";

const Store = configureStore({
  reducer: {
    products: productsSlice,
    clothes: clothingSlice,
    discount: discountSlice,
    electronics: electronicsSlice,
    jewelery: jewelerySlice,
    user: userSlice,
    error: errorSlice
  },
});

export default Store;