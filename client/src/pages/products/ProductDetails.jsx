import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/product";
import { MdShoppingCart } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { addToCartBackend, addToCartFrontend } from "../../redux/actions/cart";
import {
  addToWishlist,
  addToWishlistFrontend,
} from "../../redux/actions/wishlist";
import Navbar from "../../layout/Navbar";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, productDetails, error } = useSelector(
    (state) => state.product
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const [selectedImage, setSelectedImage] = useState("");
  const [message, setMessage] = useState(""); // State for messages

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (
      productDetails &&
      productDetails.additional_images &&
      productDetails.additional_images.length > 0
    ) {
      setSelectedImage(productDetails.additional_images[0]);
    }
  }, [productDetails]);

  const handleAddToCart = (quantity = 1) => {
    if (isAuthenticated) {
      dispatch(addToCartBackend({ productId: productDetails._id, quantity }));
    } else {
      dispatch(addToCartFrontend({ product: productDetails, quantity }));
    }
    setMessage("Added to cart"); // Set message
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  const handleWishlistClick = () => {
    if (isAuthenticated) {
      dispatch(addToWishlist(productDetails._id));
    } else {
      dispatch(addToWishlistFrontend(productDetails._id));
    }
    setMessage("Added to wishlist"); // Set message
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productDetails) {
    return <div>Product details are not available.</div>;
  }

  const {
    title,
    brand,
    salePrice,
    price,
    discount,
    vendor,
    category,
    stockQuantity,
    additional_images,
    video_url,
    handling_time,
    shipping_options,
    shipping_dimensions,
    description,
  } = productDetails;

  return (
    <>
      {/* <Navbar /> */}

      <div className="container mx-auto  px-10 bg-white">
        {/* Message Display */}
        {message && <p className="text-green-600 mt-4">{message}</p>}

        <div className="flex lg:flex-row items-center">
          <div className="col h-[450px] min-w-48 space-x-4 mt-8 overflow-x-auto">
            {additional_images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:8000/${img.replace(/\\/g, "/")}`}
                alt={`Additional view ${index + 1}`}
                className="h-24 w-32 mx-auto object-cover py-1 rounded-lg cursor-pointer overflow-y-auto"
                onClick={() => setSelectedImage(img)}
              />
            ))}

            {video_url && (
              <video
                key="product-video"
                controls
                className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                onError={(e) => console.error("Video playback error:", e)}
              >
                <source
                  src={`http://localhost:8000/${video_url.replace(/\\/g, "/")}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          <div className="flex">
            <div className="h-[300px] ml-4">
              <div>
                <img
                  src={`http://localhost:8000/${selectedImage.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={title}
                  className="h-[300px] w-72 object-contain mb-4 lg:mb-2 mt-7 rounded-lg shadow-md border border-gray-200"
                />
              </div>
            </div>
            <div>
              <p className="text-3xl ml-6 font-bold">{title}</p>
              <p className="ml-6 mb-7 mt-1">{category.name}</p>
              <Link to={`/vendor/${vendor.id}`} className="text-lg mt-4 ml-6">
                Vendor: {vendor.name}
              </Link>
              <p className="text-lg ml-6 mt-2">
                <b>Sale Price:</b> <strike>{price}</strike> {salePrice}
              </p>
              <p className="text-lg ml-6 mt-2">
                <b>Discount:</b> {discount}%
              </p>
              <p className="text-lg ml-6 mt-2">
                <b>Brand:</b> {brand}
              </p>

              {/* Add to Cart and Wishlist Buttons */}
              <div className="flex mt-4 ml-6">
                <button
                  onClick={() => handleAddToCart()}
                  className="flex items-center bg-indigo-600 text-white py-2 px-4 rounded-lg mr-4"
                >
                  <MdShoppingCart className="mr-2" /> Add to Cart
                </button>
                <button
                  onClick={handleWishlistClick}
                  className="flex items-center bg-red-600 text-white py-2 px-4 rounded-lg"
                >
                  <FaHeart className="mr-2" /> Add to Wishlist
                </button>
              </div>
              <p className="ml-6 mt-4">{description}</p>
            </div>
            {/* Shipping Options */}
            <div className=" mt-4">
              <h4 className="font-semibold">Shipping Options:</h4>
              <ul className="list-disc pl-5">
                <li className="text-gray-600">
                  <b>Shipping Options:</b> {shipping_options}
                </li>
                <li className="text-gray-600">
                  <b>Shipping Dimensions:</b> {shipping_dimensions}
                </li>
                <li className="text-gray-600">
                  <b>Handling Time:</b> {handling_time}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
