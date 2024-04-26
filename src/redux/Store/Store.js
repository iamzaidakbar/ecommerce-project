import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../Slices/productsSlice";
import clothingSlice from "../Slices/clothingSlice";
import discountSlice from "../Slices/discountSlice";

const Store = configureStore({
  reducer: {
    products: productsSlice,
    clothes: clothingSlice,
    discount: discountSlice,
  },
});

export default Store;