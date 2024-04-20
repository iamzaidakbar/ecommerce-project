import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        allProducts: null,

    },
    reducers: {
        addProductsToStore: (state, action) => {
            state.allProducts = action.payload;
        },

    },
});

export const { addProductsToStore } = productsSlice.actions;
export default productsSlice.reducer;