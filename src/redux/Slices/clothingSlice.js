import { createSlice } from "@reduxjs/toolkit";

const clothesSlice = createSlice({
    name: "clothes",
    initialState: {
        clothes: null,

    },
    reducers: {
        addClothesToStore: (state, action) => {
            state.clothes = action.payload;
        },

    },
});

export const { addClothesToStore } = clothesSlice.actions;
export default clothesSlice.reducer;