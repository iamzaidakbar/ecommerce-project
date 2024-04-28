import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,

    },
    reducers: {
        addUserToStore: (state, action) => {
            state.user = action.payload;
        },

    },
});

export const { addUserToStore } = userSlice.actions;
export default userSlice.reducer;