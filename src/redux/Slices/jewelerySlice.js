import { createSlice } from "@reduxjs/toolkit";

const jewelerySlice = createSlice({
    name: "jewelery",
    initialState: {
        jeweleryItems: null,

    },
    reducers: {
        addJeweleryItemsToStore: (state, action) => {
            state.jeweleryItems = action.payload;
        },

    },
});

export const { addJeweleryItemsToStore } = jewelerySlice.actions;
export default jewelerySlice.reducer;