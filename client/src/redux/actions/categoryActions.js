// actions/categoryActions.js
import axios from 'axios';

export const addCategory = (formData) => async (dispatch) => {
    try {
        const { data } = await axios.post('http://localhost:8000/api/categories', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch({ type: "CATEGORY_ADD_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "CATEGORY_ADD_FAIL", payload: error.response.data.message });
    }
};


export const getCategories = () => async (dispatch) => {
    try {
        dispatch({ type: 'GET_CATEGORIES_REQUEST' });

        const { data } = await axios.get('http://localhost:8000/api/categories', { withCredentials: true });

        dispatch({
            type: 'GET_CATEGORIES_SUCCESS',
            payload: data.categories,
        });
    } catch (error) {
        dispatch({
            type: 'GET_CATEGORIES_FAIL',
            payload: error.response.data.message,
        });
    }
};

