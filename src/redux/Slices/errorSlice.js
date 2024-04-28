import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: "error",
    initialState: {
        errorMessage: '',
        errorType: '',

    },
    reducers: {
        addErrorMessageToStore: (state, action) => {
            state.errorMessage = action.payload;
        },
        addErrorTypeToStore: (state, action) => {
            state.errorType = action.payload;
        },

    },
});

export const { addErrorMessageToStore, addErrorTypeToStore } = errorSlice.actions;
export default errorSlice.reducer;