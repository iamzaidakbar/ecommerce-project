import { createSlice } from "@reduxjs/toolkit";

const discountSlice = createSlice({
    name: "discount",
    initialState: {
        discount_applied: false,

    },
    reducers: {
        applyDiscount: (state) => {
            state.discount_applied = true;
        },

    },
});

export const { applyDiscount } = discountSlice.actions;
export default discountSlice.reducer;