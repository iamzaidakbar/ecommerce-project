import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: null,

    },
    reducers: {
        addSearchQuery: (state, action) => {
            state.query = action.payload;
        },

    },
});

export const { addSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;