import { createReducer } from "@reduxjs/toolkit";
import { logoutUser } from "../actions/user";

const initialState = {
    loading: false,
    isAuthenticated: false,
    error: null, // Changed from `false` to `null` for consistency
    user: null
};

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('LoadUserRequest', (state) => {
            state.loading = true;
        })
        .addCase('LoadUserSuccess', (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase('LoadUserFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        })
        .addCase('clearErrors', (state) => {
            state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null; // Clear user data on logout
        })
});
