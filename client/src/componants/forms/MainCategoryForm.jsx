import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParentCategory = () => {
    const [name, setName] = useState(''); // To hold form input for new category
    const [parentCategories, setParentCategories] = useState([]); // Store parent categories
    const [message, setMessage] = useState(''); // To store success or error message

    // Function to create a new parent category
    const createParentCategory = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/parent-category', { name });
            setParentCategories([...parentCategories, res.data.parentCategory]);
            setName(''); // Clear input after successful submission
            setMessage('Category added successfully!'); // Success message
        } catch (error) {
            setMessage('Error creating category. Please try again.'); // Error message
            console.error('Error creating parent category:', error);
        }
    };

    useEffect(() => {
        // Automatically hide the message after 3 seconds
        const timer = setTimeout(() => {
            setMessage('');
        }, 3000);

        // Clean up the timer if the component unmounts or message changes
        return () => clearTimeout(timer);
    }, [message]); // Run this effect whenever `message` changes

    return (
        <div className="w-2/3 ml-auto mt-9 border p-4 shadow-lg mr-auto">
            <h2 className='text-xl font-semibold p-6 text-center text-gray-700'>Parent Categories</h2>

            {/* Conditionally render the success or error message */}
            {message && (
                <p className={`mt-4 text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                    {message}
                </p>
            )}
            <div className="mt-3">
                <label htmlFor="" className='font-medium text-natural-600'>Name:</label>
                <input
                    type="text"
                    value={name}
                    className='w-full focus:border py-2 mt-1 mb-3 shadow-sm rounded-sm focus:outline-none'
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                />
                <button
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out"
                    onClick={createParentCategory}
                >
                    Create
                </button>


            </div>
        </div>
    );
};

export default ParentCategory;
