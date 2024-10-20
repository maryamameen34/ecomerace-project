import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getCategories } from '../../redux/actions/categoryActions';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CategoryForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [parentCategories, setParentCategories] = useState([]); // Store parent categories
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const dispatch = useDispatch();
    const { loading, error, categories } = useSelector((state) => state.category);

    const [imageFile, setImageFile] = useState(null);

    const submitHandler = (e) => {
        e.preventDefault();
        setLoadingSubmit(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('parentCategory', parentCategory);
        formData.append('isFeatured', isFeatured);
        formData.append('image', imageFile);
        formData.append('metaTitle', metaTitle);
        formData.append('metaDescription', metaDescription);

        dispatch(addCategory(formData));

        // Reset form fields
        setName('');
        setDescription('');
        setParentCategory('');
        setIsFeatured(false);
        setImageFile('');
        setMetaTitle('');
        setMetaDescription('');
        setLoadingSubmit(false);
    };

    // Fetch parent categories 
    useEffect(() => {
        (async () => {
            await fetchParentCategories();
        })();
    }, []);


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageFile(file)
    };
    // Function to fetch parent categories
    const fetchParentCategories = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/parent-categories');
            setParentCategories(res.data.parentCategories);
        } catch (error) {
            console.error('Error fetching parent categories:', error);
        }
    };

    return (
        <div className="border shadow-lg p-5 mx-auto w-2/3 mt-5">
            <Link to="/admin-dashboard/products/categories/main" className='text-sm text-blue-500 underline mb-4'>Add a Main Category</Link>
            <h2 className='text-xl font-bold text-center p-6'>Add New Category</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="error text-red-500">{error}</p>}
            <form onSubmit={submitHandler}>
                <div>
                    <label className='font-medium text-natural-500'>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='w-full border rounded-md py-2 px-3 focus:outline-none focus:border-indigo-400'
                    />
                </div>
                <div className="mt-4">
                    <label className='font-medium text-natural-500'>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='w-full border rounded-md py-2 px-3 focus:outline-none focus:border-indigo-400'
                    />
                </div>
                <div className="mt-4">
                    <label className='font-medium text-natural-500'>Parent Category:</label>
                    <select
                        value={parentCategory}
                        onChange={(e) => setParentCategory(e.target.value)}
                        className='w-full border rounded-md py-2 px-3 focus:outline-none focus:border-indigo-400'
                    >
                        <option value="">None</option>
                        {parentCategories && parentCategories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="mt-4">
                    <label className='font-medium text-natural-500'>Is Featured:</label>
                    <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className='ml-2'
                    />
                </div>
                <div className="mt-4">
                    <label className='font-medium text-natural-500'>Image URL:</label>
                    <input
                        type="file"
                        name="imageUpload"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
                <div className="mt-4">
                    <label className='font-medium text-natural-500'>Meta Title:</label>
                    <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        className='w-full border rounded-md py-2 px-3 focus:outline-none focus:border-indigo-400'
                    />
                </div>
                <div className="mt-4">
                    <label className='font-medium text-natural-500'>Meta Description:</label>
                    <textarea
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        className='w-full border rounded-md py-2 px-3 focus:outline-none focus:border-indigo-400'
                    />
                </div>
                <button type="submit" disabled={loadingSubmit} className={`mt-6 ${loadingSubmit ? 'bg-gray-400' : 'bg-blue-500'} text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out`}>
                    {loadingSubmit ? 'Adding...' : 'Add Category'}
                </button>

            </form>
        </div>
    );
};

export default CategoryForm;
