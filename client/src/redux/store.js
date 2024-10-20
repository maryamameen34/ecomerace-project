import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.js"
import { productReducer } from "./reducers/product.js";
import { categoryReducer } from "./reducers/categoryReducer.js";
import { vendorReducer } from "./reducers/vendor.js";
import { cartReducer } from "./reducers/cart.js";
import { wishlistReducer } from "./reducers/wishlist.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        category: categoryReducer,
        vendor : vendorReducer ,
        cart : cartReducer ,
        wishlist : wishlistReducer
    }
})


export default store