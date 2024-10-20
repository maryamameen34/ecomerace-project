// actions/wishlist.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Action to add to wishlist in the backend
export const addToWishlist = createAsyncThunk(
    'wishlist/addToWishlist', // This is the action type
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/add-to-wishlist', 
                { productId },
                { withCredentials: true }
            );
            return response.data; // Returning the response data for the fulfilled action
        } catch (error) {
            return rejectWithValue(error.response.data.message); // Return error message for the rejected action
        }
    }
);



export const addToWishlistFrontend = (productId) => {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    
    // Check if item already exists
    const exists = wishlistItems.find(item => item.productId === productId);
    if (!exists) {
        // Add the new product to the wishlist
        wishlistItems.push({ productId });
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems)); // Update localStorage
    }

    return {
        type: 'ADD_TO_WISHLIST_FRONTEND',
        payload: wishlistItems, // Now we're sending the updated wishlist
    };
};


// Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
    'wishlist/removeFromWishlist',
    async (productId, { getState }) => {
        const response = await axios.delete(`http://localhost:8000/api/wishlist/remove-from-wishlist/${productId}`, { withCredentials: true });
        return response.data.wishlist;
    }
);

// Load wishlist
export const loadWishlist = createAsyncThunk(
    'wishlist/loadWishlist',
    async () => {
        const response = await axios.get("http://localhost:8000/api/wishlist", { withCredentials: true });
        return response.data.wishlist;
    }
);
