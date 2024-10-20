import { createReducer } from "@reduxjs/toolkit";
import { uploadProductAction, fetchProductsAction } from "../actions/product";

const initialState = {
    loading: false,
    success: false,
    products: [],
    product: null,  // For individual product (upload related)
    productDetails: null, 
    error: null,
};

export const productReducer = createReducer(initialState, (builder) => {
    builder
        // Handling product upload
        .addCase(uploadProductAction.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        })
        .addCase(uploadProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.product = action.payload;
        })
        .addCase(uploadProductAction.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })

        // Handling fetching all products
        .addCase(fetchProductsAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;   // Store products in the state
        })
        .addCase(fetchProductsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Handling product details fetching
        .addCase('GET_PRODUCT_DETAILS_REQUEST', (state) => {
            state.loading = true;
            state.productDetails = null;
            state.error = null;
        })
        .addCase('GET_PRODUCT_DETAILS_SUCCESS', (state, action) => {
            state.loading = false;
            state.productDetails = action.payload;
        })
        .addCase('GET_PRODUCT_DETAILS_FAIL', (state, action) => {
            state.loading = false;
            state.productDetails = null;
            state.error = action.payload;
        })

        // Clear errors (if needed)
        .addCase('clearErrors', (state) => {
            state.error = null;
        });
});
