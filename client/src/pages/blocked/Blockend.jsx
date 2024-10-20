import React from 'react';

const Blockend = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Account Blocked</h1>
        <p className="text-gray-700 mb-6">
          Your account has been blocked due to policy violations. Please contact support for assistance.
        </p>
        <img 
          src="https://via.placeholder.com/150" // You can replace this with an appropriate image
          alt="Blocked Account" 
          className="mx-auto mb-6 w-32 h-32" 
        />
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200">
          Contact Support
        </button>
      </div>
    </div>
  );
}

export default Blockend;
