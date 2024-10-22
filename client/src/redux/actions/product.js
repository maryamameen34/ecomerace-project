import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_PRODUCTS_FAILURE, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS } from "../types/types";

// Upload Product Action
export const uploadProductAction = createAsyncThunk('product/upload', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post("https://ecomerace-project-orpin.vercel.app/?vercelToolbarCode=4H22x3-yGKOe0Lk/api/upload-product", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        return response.data.product;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Product upload failed');
    }
});

// Fetch Products Action
export const fetchProductsAction = createAsyncThunk('product/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("https://ecomerace-project-orpin.vercel.app/?vercelToolbarCode=4H22x3-yGKOe0Lk/api/products", {
            withCredentials: true,
        });
        return response.data.products; // Assuming the backend returns an array of products under 'products'
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch products');
    }
});


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'GET_PRODUCT_DETAILS_REQUEST' });

        const { data } = await axios.get(`https://ecomerace-project-orpin.vercel.app/?vercelToolbarCode=4H22x3-yGKOe0Lk/api/product/${id}`, { withCredentials: true });

        dispatch({
            type: 'GET_PRODUCT_DETAILS_SUCCESS',
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: 'GET_PRODUCT_DETAILS_FAIL',
            payload: error.response ? error.response.data.message : error.message,
        });
    }
}
