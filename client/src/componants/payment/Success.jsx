import React from 'react';

const Success = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <svg
          className="w-16 h-16 mx-auto text-green-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-3xl font-semibold text-green-700 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-4">
          Thank you for your payment. Your transaction was completed successfully.
        </p>
        <p className="text-gray-500 mb-6">
          A confirmation email has been sent to your registered email address.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default Success;
