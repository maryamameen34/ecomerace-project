// reducers/categoryReducer.js
const initialState = {
    categories: [],
    loading: false,
    error: null,
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CATEGORY_REQUEST':
        case 'GET_CATEGORIES_REQUEST':
            return {
                ...state, loading: true
            };
        case 'ADD_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
            };
        case 'GET_CATEGORIES_SUCCESS':
            return { ...state, loading: false, categories: action.payload };

        case 'ADD_CATEGORY_FAIL':
        case 'GET_CATEGORIES_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
