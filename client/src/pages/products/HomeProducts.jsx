import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../../redux/actions/product";
import { MdShoppingCart } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import {
  addToCartBackend,
  addToCartFrontend,
  removeFromCart,
} from "../../redux/actions/cart";
import {
  addToWishlist,
  addToWishlistFrontend,
} from "../../redux/actions/wishlist";

const HomeProductList = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.user);

  // Using fallback to avoid undefined issues
  const cartItems = useSelector((state) => state.cart.items || []);
  const wishlistItems = useSelector((state) => state.wishlist.items || []);

  const [message, setMessage] = useState(""); // State for messages

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProductsAction());
    }
  }, [dispatch, isAuthenticated]);
  
  const handleWishlistClick = (productId) => {
    if (isAuthenticated) {
      dispatch(addToWishlist(productId));
    } else {
      dispatch(addToWishlistFrontend(productId));
    }
  };

  const handleAddToCart = (product, quantity = 1) => {
    const itemInCart = isInCart(product._id);
    if (itemInCart) {
      setMessage("Item already exists in cart"); // Set message if item exists
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      return; // Prevent adding to cart if item is already there
    }

    if (isAuthenticated) {
      dispatch(addToCartBackend({ productId: product._id, quantity }));
    } else {
      dispatch(addToCartFrontend({ product, quantity }));
    }
  };

  const isInCart = (productId) =>
    cartItems.some((item) => item.product._id === productId);

  const isInWishlist = (productId) =>
    wishlistItems.some((item) => item.productId === productId);

  if (loading) {
    return <p className="text-center text-gray-600">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Latest Products
      </h2>
      {message && <p className="text-red-600 text-center">{message}</p>}{" "}
      {/* Display the message */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <div className="w-full flex justify-between">
                <p className="mt-2 text-center uppercase text-sm p-1 bg-gray-200 text-gray-600">
                  {product.stockQuantity === 0 ? "Out of Stock" : `In Stock`}
                </p>
              </div>
              <div className="max-w-xs mx-auto p-1">
                <img
                  src={`http://localhost:8000/${product.main_image.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={product.title}
                  className="w-full h-56 object-cover rounded-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.title}
                </h3>
                <p className="text-gray-600 mt-2 text-lg font-semibold">
                  ${product.salePrice || product.price}
                </p>

                <div className="flex mt-2 justify-between items-center">
                  <button onClick={() => handleAddToCart(product, 1)}>
                    <MdShoppingCart className="text-lg text-gray-600" />
                  </button>
                  <button onClick={() => handleWishlistClick(product._id)}>
                    <FaHeart className="text-lg  text-gray-600" />
                  </button>
                </div>
                <a
                  href={`/product/${product._id}`}
                  className="mt-4 block bg-indigo-600 text-white text-center py-2 rounded-lg"
                >
                  View Details
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default HomeProductList;
