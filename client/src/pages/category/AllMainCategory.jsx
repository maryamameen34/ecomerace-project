import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiEdit, CiSaveDown1 } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { Link } from "react-router-dom";


const FetchMainCategories = () => {
    const [parentCategories, setParentCategories] = useState([]); // Store parent categories
    const [editingCategoryId, setEditingCategoryId] = useState(null); // ID of the category being edited
    const [editName, setEditName] = useState(''); // New name when editing

    // Fetch parent categories on component mount
    useEffect(() => {
        fetchParentCategories();
    }, []);

    // Function to fetch parent categories
    const fetchParentCategories = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/parent-categories'); // Adjust API URL if needed
            setParentCategories(res.data.parentCategories);
        } catch (error) {
            console.error('Error fetching parent categories:', error);
        }
    };

    // Function to update an existing parent category
    const updateFetchMainCategories = async (id) => {
        try {
            const res = await axios.put(`http://localhost:8000/api/parent-category/${id}`, { name: editName });
            setParentCategories(
                parentCategories.map((category) =>
                    category._id === id ? res.data.FetchMainCategories : category
                )
            );
            setEditingCategoryId(null); // Exit edit mode
            setEditName('');
        } catch (error) {
            console.error('Error updating parent category:', error);
        }
    };

    // Function to delete a parent category
    const deleteFetchMainCategories = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/parent-category/${id}`);
            setParentCategories(parentCategories.filter((category) => category._id !== id));
        } catch (error) {
            console.error('Error deleting parent category:', error);
        }
    };

    return (
        <div className="w-full ml-auto mt-9 border p-4 shadow-lg mr-auto">
            <h2 className='text-xl font-semibold p-6 text-center text-gray-700'>All Main Categories</h2>

            <Link to={"/admin-dashboard/products/categories/main"} className='p-4 ml-[80%] ' >Add New</Link>

            {/* Table of parent categories */}
            <table className="table-auto mt-5 w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Category Name</th>
                        <th className="border px-4 py-2">Actions</th>
                        <th className="border px-4 py-2">Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {parentCategories.map((category) => (
                        <tr key={category._id}>
                            <td className="border px-4 py-2">
                                {editingCategoryId === category._id ? (
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        placeholder="Edit category name"
                                        className="w-full p-1"
                                    />
                                ) : (
                                    <span>{category.name}</span>
                                )}
                            </td>
                            <td className="border pl-8 py-2">
                                {editingCategoryId === category._id ? (
                                    <>
                                        <button
                                            onClick={() => updateFetchMainCategories(category._id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-full mr-2"
                                        >
                                            <CiSaveDown1 />
                                        </button>
                                        <button
                                            onClick={() => setEditingCategoryId(null)}
                                            className="bg-gray-500 text-white px-3 rounded-full py-1"
                                        >
                                            <FcCancel />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setEditingCategoryId(category._id);
                                                setEditName(category.name);
                                            }}
                                            className="bg-yellow-500 text-white rounded-full p-2 mr-2"
                                        >
                                            <CiEdit className='text-lg' />
                                        </button>
                                        <button
                                            onClick={() => deleteFetchMainCategories(category._id)}
                                            className="bg-red-500 text-white rounded-full p-2"
                                        >
                                            <MdDelete className='text-lg' />
                                        </button>
                                    </>
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                {new Date(category.createdAt).toISOString().split('T')[0]}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FetchMainCategories;
