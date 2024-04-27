import { createSlice } from "@reduxjs/toolkit";

const electronicsSlice = createSlice({
    name: "electronics",
    initialState: {
        electronicItems: null,

    },
    reducers: {
        addElectronicItemsToStore: (state, action) => {
            state.electronicItems = action.payload;
        },

    },
});

export const { addElectronicItemsToStore } = electronicsSlice.actions;
export default electronicsSlice.reducer;