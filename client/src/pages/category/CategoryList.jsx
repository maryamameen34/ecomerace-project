import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/categoryActions';
import { FcViewDetails } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Navigate, useNavigate } from 'react-router-dom';

const CategoryList = () => {
    const [view, setView] = useState('grid'); // State for view type
    const dispatch = useDispatch();

    // Get categories, loading state, and error from Redux store
    const categoryList = useSelector((state) => state.category); 
    const { loading, error, categories } = categoryList || {}; 

    // Fetch categories when the component mounts
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
 const navigate = useNavigate()
    return (
        <div className="w-full ml-auto mt-9 border p-4 shadow-lg mr-auto">
            <div className="flex justify-between items-center mb-5">
                <h2 className='text-xl font-semibold text-center text-gray-700'> Categories Lists</h2>

                {/* Dropdown for switching views */}
                <div className="relative">
                    <select
                        value={view}
                        onChange={(e) => setView(e.target.value)}
                        className="p-2 border rounded text-gray-600"
                    >
                        <option value="table">Table View</option>
                        <option value="grid">Grid View</option>
                    </select>
                </div>
            </div>

            <div className='ml-auto  w-20 py-3 px-1 bg-indigo-600 rounded-md hover:bg-indigo-400 justify-end'>
                <button className='text-white pl-1'>Add New</button>
            </div>

            {/* Check if loading, error, or display categories */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : view === 'table' ? (
                <table className="table-auto mt-5 w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Image</th>
                            <th className="border px-4 py-2">Category Name</th>
                            <th className="border px-4 py-2">Parent Category</th>
                            <th className="border px-4 py-2">Created Date</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((category) => (
                            <tr key={category._id}>
                                <td className="border px-4 py-2">
                                    <img
                                        src={`http://localhost:8000${category.image.replace(/\\/g, '/')}`}
                                        alt={category.name}
                                        className="w-11 h-11 rounded-full ml-5 cursor-pointer align-center object-cover"
                                    />
                                </td>
                                <td className="border px-4 py-2">{category.name}</td>
                                <td className="border px-4 py-2">
                                    {category.parentCategory?.name || 'No Parent Category'}
                                </td>
                                <td className="border px-4 py-2">
                                    {new Date(category.createdAt).toISOString().split('T')[0]}
                                </td>
                                <td className="border flex px-4 py-2 text-xl mt-1">
                                    <button className='bg-indigo-500 text-white rounded-full p-2 mr-1'><FcViewDetails /></button>
                                    <button className='bg-yellow-500 text-white rounded-full p-2 mr-2'><CiEdit /></button>
                                    <button className='bg-red-500 text-white rounded-full p-2'><MdDelete /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                    {categories?.map((category) => (
                        <div key={category._id} className="border p-4 rounded shadow">
                            <img
                                src={`http://localhost:8000${category.image.replace(/\\/g, '/')}`}
                                alt={category.name}
                                className="w-full h-40 mx-auto rounded-xs object-cover mb-3"
                            />
                            <h3 className="text-center mt-5 text-lg font-semibold">{category.name}</h3>
                            <p className="text-center text-gray-500">{category.parentCategory?.name || 'No Parent Category'}</p>
                            <p className="text-center text-sm text-gray-400">{new Date(category.createdAt).toISOString().split('T')[0]}</p>
                            <div className="flex justify-center mt-3 text-xl space-x-2">
                                <button className='bg-indigo-500 text-white rounded-full p-2'><FcViewDetails /></button>
                                <button className='bg-yellow-500 text-white rounded-full p-2'><CiEdit /></button>
                                <button className='bg-red-500 text-white rounded-full p-2'><MdDelete /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryList;
