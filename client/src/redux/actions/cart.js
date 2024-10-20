// Redux Actions
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCartBackend = createAsyncThunk(
  "cart/addToCartBackend",
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    const { user } = getState().user;

    if (!user) {
      return rejectWithValue("Please login to continue."); // Return error if not authenticated
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, 
      },
      withCredentials: true // Ensure cookies are sent
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/add-to-cart",
        { productId, quantity },
        config
      );

      return response.data.cart; // Return the updated cart
    } catch (error) {
      console.error("Error adding to cart:", error);
      return rejectWithValue(error.response ? error.response.data.message : "Server error");
    }
  }
);


// Add product to cart for non-authenticated users (frontend only)
export const addToCartFrontend = createAsyncThunk(
  "cart/addToCartFrontend",
  async ({ product, quantity }, { getState }) => {
    const state = getState();
    const existItem = state.cart.cartItems.find(
      (x) => x.product._id === product._id
    );

    let cartItems = [];

    if (existItem) {
      // Update quantity
      if (quantity > 0) {
        cartItems = state.cart.cartItems.map((x) =>
          x.product._id === existItem.product._id
            ? { ...existItem, quantity: existItem.quantity + quantity }
            : x
        );
      } else {
        // Remove item if quantity <= 0
        cartItems = state.cart.cartItems.filter(
          (x) => x.product._id !== existItem.product._id
        );
      }
    } else {
      // Add new product to cart
      if (quantity > 0) {
        cartItems = [...state.cart.cartItems, { product, quantity }];
      }
    }

    // Update localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    return cartItems; // Return updated cart
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { getState }) => {
    const state = getState();
    const updatedCartItems = state.cart.cartItems.filter(
      (item) => item.product._id !== productId
    );

    // Update localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    return updatedCartItems; // Return updated cart
  }
);

// Load cart items for authenticated users
export const loadCartItems = createAsyncThunk(
  "cart/loadCartItems",
  async () => {
    const response = await axios.get(
      "http://localhost:8000/api/get-cart-items",
      {
        withCredentials: true,
      }
    );
    return response.data.cart;
  }
);
