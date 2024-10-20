import { createReducer } from '@reduxjs/toolkit';
import { addToCartBackend, addToCartFrontend, removeFromCart, loadCartItems } from '../actions/cart';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    loading: false,
    error: null,
};

export const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadCartItems.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadCartItems.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload.products; // Assuming the backend returns the cart with a products array
        })
        .addCase(loadCartItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addToCartBackend.fulfilled, (state, action) => {
            state.cartItems = action.payload.products; 
        })
        .addCase(addToCartFrontend.fulfilled, (state, action) => {
            state.cartItems = action.payload; 
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.cartItems = action.payload; 
        })
        .addDefaultCase((state) => state);
});
