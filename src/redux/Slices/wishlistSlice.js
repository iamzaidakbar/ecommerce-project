import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlist: null,
    },
    reducers: {
        addWishlistItem: (state, action) => {
            state.wishlist.push(action.payload);
        },
    },
});

export const { addWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
