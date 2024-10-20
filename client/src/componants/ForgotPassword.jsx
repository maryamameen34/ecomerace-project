import React, { useState } from "react";
import BG from "../assets/images/image6.jpg"; // Assuming this is part of your design assets
import { Link } from "react-router-dom";

const ForgotPass = ({ toggleForgotPassword, toggleBuyerLogin }) => {
  // States
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Email sent successfully. Please check your inbox.");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to send reset email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animation fixed inset-0 bg-black z-50 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 border-gray-400 border-2 rounded-lg shadow-lg relative w-full max-w-md mx-4 transform transition-transform duration-500 ease-in-out scale-100">
        <div className="flex justify-between items-center">
          <p className="font-semibold mx-auto text-lg">Find your Account</p>
          <button className="animation text-black" onClick={toggleForgotPassword}>
            ✕
          </button>
        </div>
        <form
          method="post"
          onSubmit={handleSubmit}
          className="h-auto text-xs rounded-r-md p-10 shadow-md m-auto"
        >
          <div className="mx-3 mb-2 mt-5">
            <label htmlFor="email" className="text-slate-800 font-medium">
              Email:
            </label>
            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="p-1 w-full border border-gray-300 rounded-sm focus:shadow-md transition-all focus:border-blue-500 focus:outline-blue-500"
                required
              />
            </div>
          </div>

          {/* Show Loading Spinner */}
          {loading && <p className="text-blue-500 text-center">Sending email...</p>}

          {/* Show Success Message */}
          {message && <p className="text-green-500 text-center">{message}</p>}

          {/* Show Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="mx-3 my-4">
            <button
              className="w-[100%] rounded-md bg-blue-500 text-white p-2 font-medium"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Mail"}
            </button>
          </div>

          <div className="flex mx-3 my-4">
            <p className="text-xs">Have a password?</p>
            <Link to={""} className="text-blue-500 ml-1" onClick={toggleBuyerLogin}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
