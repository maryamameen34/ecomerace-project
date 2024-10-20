// reducers/wishlist.js
import { createReducer } from "@reduxjs/toolkit";
import { addToWishlist, removeFromWishlist, loadWishlist } from "../actions/wishlist";

const initialState = {
    wishlist: JSON.parse(localStorage.getItem('wishlistItems')) || [], // Initialize empty cart
    loading: false,
    error: null,
};

export const wishlistReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadWishlist.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlist = action.payload;
        })
        .addCase(loadWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; // Use action.payload for error
        })
        .addCase(addToWishlist.pending, (state) => {
            state.loading = true;
        })
        .addCase(addToWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlist.push(action.payload); // Assuming the payload contains the added item
        })
        .addCase(addToWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; // Use action.payload for error
        })
        .addCase(removeFromWishlist.pending, (state) => {
            state.loading = true;
        })
        .addCase(removeFromWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlist = action.payload; // Update wishlist with new products
        })
        .addCase(removeFromWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; // Use action.payload for error
        })
        .addCase('ADD_TO_WISHLIST_FRONTEND', (state, action) => {
            state.wishlist = action.payload; // Update state with the new wishlist
        })
});
