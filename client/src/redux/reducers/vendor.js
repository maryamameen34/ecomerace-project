import { GET_PENDING_VENDORS_FAILURE, GET_PENDING_VENDORS_REQUEST, GET_PENDING_VENDORS_SUCCESS } from "../types/types";

// reducers/vendorReducer.js
const initialState = {
    vendors: [],
    vendor: null,
    loading: false,
    error: null,
};

export const vendorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_VENDORS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'GET_VENDORS_SUCCESS':
            return { ...state, loading: false, vendors: action.payload };
        case 'GET_VENDORS_FAIL':
            return { ...state, loading: false, error: action.payload };

        case 'GET_VENDOR_DETAILS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'GET_VENDOR_DETAILS_SUCCESS':
            return { ...state, loading: false, vendor: action.payload };
        case 'GET_VENDOR_DETAILS_FAIL':
            return { ...state, loading: false, error: action.payload };

        case 'UPDATE_VENDOR_STATUS_REQUEST':
            return { ...state, loading: true };
        case 'UPDATE_VENDOR_STATUS_SUCCESS':
            return {
                ...state,
                loading: false,
                vendors: state.vendors.map(vendor =>
                    vendor._id === action.payload._id ? action.payload : vendor
                ),
            };
        case 'UPDATE_VENDOR_STATUS_FAIL':
            return { ...state, loading: false, error: action.payload };
        case GET_PENDING_VENDORS_REQUEST:
            return { ...state, loading: true };
        case GET_PENDING_VENDORS_SUCCESS:
            return { ...state, loading: false, vendors: action.payload };
        case GET_PENDING_VENDORS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
