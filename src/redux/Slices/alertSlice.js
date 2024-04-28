import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name: "alert",
    initialState: {
        alertMessage: '',
        alertType: '',
        color: ''

    },
    reducers: {
        addAlertMessageToStore: (state, action) => {
            state.alertMessage = action.payload;
        },
        addalertTypeToStore: (state, action) => {
            state.alertType = action.payload;
        },
        addAlertColorToStore: (state, action) => {
            state.color = action.payload;
        },

    },
});

export const { addAlertMessageToStore, addalertTypeToStore, addAlertColorToStore } = alertSlice.actions;
export default alertSlice.reducer;