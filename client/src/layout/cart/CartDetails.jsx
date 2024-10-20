import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCartItems, removeFromCart } from "../../redux/actions/cart";
import { Link } from "react-router-dom";
import Quantity from "./Quantity";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PFz7gSBXJ5pqbcPaee09UlSXjoK4bgdKM33BCLknV0xoxYDydAQGlcNRuDBimPc1GA5mI1gXqWI1ECn2ep5y2O000HUL7yD4Z"
);

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(loadCartItems());
  }, [dispatch]);

  const makePayment = async () => {
    try {
      const body = {
        products: cartItems.map((item) => ({
          id: item.product._id,
          name: item.product.title,
          price: item.product.price,
          main_image: `https://localhost:8000/${item.product.main_image.replace(
            /\\/g,
            "/"
          )}`,
          quantity: item.quantity,
        })),
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(
        "http://localhost:8000/api/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      // Ensure response is successfully received and parsed
      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();

      // Ensure session.id exists
      if (!session.id) {
        throw new Error("No session ID returned from the server.");
      }

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      console.log("Session response:", session);
      console.log("Result:", result);

      if (result.error) {
        console.log(result.error.message);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  const subtotal =
    cartItems
      ?.reduce(
        (acc, item) => acc + (item.product?.price * item.quantity || 0),
        0
      )
      .toFixed(2) || 0;
  const totalQuantity =
    cartItems?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="max-w-7xl mx-auto p-6">
      {cartItems && cartItems.length === 0 ? (
        <p className="text-center text-xl">Your cart is empty</p>
      ) : (
        <div className="lg:flex lg:space-x-20 ">
          <div className="max-w-2xl bg-white rounded-md shadow-lg p-6">
            <p className="text-3xl font-bold mb-6">Shopping Cart</p>
            <hr className="mb-6" />
            {cartItems.map((item) => (
              <div
                key={item.product?._id}
                className="flex items-start justify-between mb-6 p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex">
                  <img
                    src={`http://localhost:8000/${item.product?.additional_images[0]}`}
                    alt={item.product?.title}
                    className="object-cover w-32 h-32 rounded-md hover:scale-105 transition-transform duration-300"
                  />
                  <div className="ml-6 flex flex-col justify-between">
                    <p className="font-semibold text-xl">
                      {item.product?.title || "Product Title"}
                    </p>
                    <Quantity item={item} />
                    <Link
                      to="#"
                      className="text-sm text-blue-500 hover:underline"
                      onClick={() => handleRemoveItem(item.product?._id)}
                    >
                      Delete
                    </Link>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    ${item.product?.price?.toFixed(2) || 0}
                  </p>
                </div>
              </div>
            ))}
            <hr className="mt-6" />
            <div className="flex justify-between items-center mt-6">
              <p className="text-2xl font-semibold">
                Subtotal ({totalQuantity} items):
              </p>
              <p className="text-2xl font-bold">${subtotal}</p>
            </div>
            <div className="mt-6 text-right">
              <Link
                to="/checkout"
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg text-xl hover:bg-yellow-600 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
          <div>
            <div className="max-w-2xl border-t-2 mt-4 bg-white rounded-md shadow-lg p-6">
              <p className="text-2xl font-semibold ">Cart Details</p>

              <div className="flex justify-between items-center mt-6">
                <p className="text-lg font-semibold">Subtotla Total :</p>
                <p className="text-lg font-bold">${subtotal}</p>
              </div>
              <div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-lg font-semibold">Tax:</p>
                  <p className="text-lg font-bold"> 0</p>
                </div>
                <p className="mt-4 text-center">Total Account: ${subtotal} </p>
                <button className="bg-indigo-800 w-full text-white py-2 text-lg " onClick={makePayment}>
                  Pay ${subtotal} 
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
