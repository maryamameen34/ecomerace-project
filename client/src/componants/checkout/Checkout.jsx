// Checkout.js
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY"); // Replace with your Stripe public key

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(0); // Set the amount dynamically
  const [userId, setUserId] = useState("USER_ID_HERE"); // Set the user ID from your auth context or state
  const [items, setItems] = useState([]); // Populate with cart items
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // Fetch your Stripe key from the backend
    const fetchStripeKey = async () => {
      const response = await fetch("/api/stripe-key");
      const data = await response.json();
      console.log(data.stripeApikey);
    };

    fetchStripeKey();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: cardError, token } = await stripe.createToken(cardElement);

    if (cardError) {
      setError(cardError.message);
      return;
    }

    // Prepare order data
    const orderData = {
      amount: amount * 100, // Convert to smallest currency unit
      items: items,
      userId: userId,
    };

    // Send payment request to backend
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const paymentData = await response.json();

    if (paymentData.success) {
      setPaymentSuccess(true);
      // Optionally handle successful payment (e.g., redirect, show message)
    } else {
      setError(paymentData.message || "Payment failed");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay ${amount}
        </button>
      </form>
      {error && <div>{error}</div>}
      {paymentSuccess && <div>Payment Successful!</div>}
    </div>
  );
};

export default Checkout;
