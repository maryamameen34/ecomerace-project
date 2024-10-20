import axios from "axios";
import { GET_PENDING_VENDORS_FAILURE, GET_PENDING_VENDORS_REQUEST, GET_PENDING_VENDORS_SUCCESS } from "../types/types";


export const getVendors = () => async (dispatch) => {
    try {
        dispatch({ type: 'GET_VENDORS_REQUEST' });

        const { data } = await axios.get('http://localhost:8000/api/vendors', { withCredentials: true });

        dispatch({
            type: 'GET_VENDORS_SUCCESS',
            payload: data.vendors, // Change categories to vendors
        });
    } catch (error) {
        dispatch({
            type: 'GET_VENDORS_FAIL',
            payload: error.response.data.message,
        });
    }
};


export const getVendorDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'GET_VENDOR_DETAILS_REQUEST' });

        const { data } = await axios.get(`http://localhost:8000/api/vendor/${id}`, { withCredentials: true });

        dispatch({
            type: 'GET_VENDOR_DETAILS_SUCCESS',
            payload: data.vendor,
        });
    } catch (error) {
        dispatch({
            type: 'GET_VENDOR_DETAILS_FAIL',
            payload: error.response ? error.response.data.message : error.message,
        });
    }
}

// Action to update vendor status
export const updateVendorStatus = (vendorId, status) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_VENDOR_STATUS_REQUEST' });

        const { data } = await axios.patch(`http://localhost:8000/api/vendors/${vendorId}/status`, { status }, { withCredentials: true });

        dispatch({
            type: 'UPDATE_VENDOR_STATUS_SUCCESS',
            payload: data.vendor,
        });
    } catch (error) {
        dispatch({
            type: 'UPDATE_VENDOR_STATUS_FAIL',
            payload: error.response.data.message,
        });
    }
};

export const getPendingVendors = () => async (dispatch) => {
    dispatch({ type: GET_PENDING_VENDORS_REQUEST });

    try {
        const response = await axios.get('http://localhost:8000/api/vendors/pending');
        dispatch({
            type: GET_PENDING_VENDORS_SUCCESS,
            payload: response.data.vendors,
        });
    } catch (error) {
        dispatch({
            type: GET_PENDING_VENDORS_FAILURE,
            payload: error.message,
        });
    }
};