import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../Slices/productsSlice";
import clothingSlice from "../Slices/clothingSlice";
import discountSlice from "../Slices/discountSlice";
import electronicsSlice from "../Slices/electronicsSlice";
import jewelerySlice from "../Slices/jewelerySlice";

const Store = configureStore({
  reducer: {
    products: productsSlice,
    clothes: clothingSlice,
    discount: discountSlice,
    electronics: electronicsSlice,
    jewelery: jewelerySlice,
  },
});

export default Store;