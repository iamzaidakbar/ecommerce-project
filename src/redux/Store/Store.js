import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../Slices/productsSlice";
import clothingSlice from "../Slices/clothingSlice";
import discountSlice from "../Slices/discountSlice";
import electronicsSlice from "../Slices/electronicsSlice";
import jewelerySlice from "../Slices/jewelerySlice";
import userSlice from "../Slices/userSlice";
import alertSlice from "../Slices/alertSlice";

const Store = configureStore({
  reducer: {
    products: productsSlice,
    clothes: clothingSlice,
    discount: discountSlice,
    electronics: electronicsSlice,
    jewelery: jewelerySlice,
    user: userSlice,
    alert: alertSlice
  },
});

export default Store;