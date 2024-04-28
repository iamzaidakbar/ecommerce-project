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
        removeUserFromStore: (state) => {
            state.user = null
        }

    },
});

export const { addUserToStore, removeUserFromStore } = userSlice.actions;
export default userSlice.reducer;