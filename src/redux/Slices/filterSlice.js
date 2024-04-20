import { createSlice } from "@reduxjs/toolkit";

const filterSclice = createSlice({
    name: "filter",
    initialState: {
        minRange: null,
        maxRange: null

    },
    reducers: {
        addMinRange: (state, action) => {
            state.minRange = action.payload;
        },
        addMaxRange: (state, action) => {
            state.maxRange = action.payload;
        }

    },
});

export const { addMinRange, addMaxRange } = filterSclice.actions;
export default filterSclice.reducer;