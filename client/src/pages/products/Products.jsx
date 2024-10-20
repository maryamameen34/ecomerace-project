import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAction } from '../../redux/actions/product';

const ProductList = () => {
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector((state) => state.product);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        dispatch(fetchProductsAction());
    }, [dispatch]);

    if (loading) {
        return <p className="text-center text-gray-600">Loading products...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600">Error: {error}</p>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Heading */}
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">All Products</h2>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl hover:border-gray-300">
                        <div className='w-full flex justify-between'>
                            <p className={`mt-2 rounded-sm text-center uppercase text-sm p-1 ${product.stockQuantity === 0
                                ? 'text-gray-800 bg-gray-200'      // Out of stock with gray background
                                : product.stockQuantity >= 10
                                    ? 'text-green-800 bg-green-200'    // In stock with green background
                                    : 'text-red-800 bg-red-200'        // Low stock with red background
                                }`}>
                                {/* Conditionally render based on stock quantity */}
                                {product.stockQuantity === 0
                                    ? 'Out of Stock'
                                    : product.stockQuantity >= 10
                                        ? 'In Stock'
                                        : `Only ${product.stockQuantity} left`}
                            </p>
                            {
                                product.is_new && (
                                    <>
                                        <p className="mt-2 text-gray-600 bg-gray-200 p-1 text-center uppercase text-sm ">IS New</p>

                                    </>
                                )
                            }
                        </div>

                        {/* Product Image */}
                        <div className="max-w-xs mx-auto p-1 bg-white rounded-lg shadow-md">
                            <img
                                src={`http://localhost:8000/${product.main_image.replace(/\\/g, '/')}`}
                                alt={product.title}
                                className="w-full h-56 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                            {/* Product Title */}
                            <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>

                            {/* Product Price */}
                            <p className="text-gray-600 mt-2 text-lg font-semibold">
                                Sale Price:
                                {product.salePrice !== product.price ? (
                                    <>
                                        <strike className="mr-2">${product.price}</strike>
                                        ${product.salePrice}
                                    </>
                                ) : (
                                    `${product.pricea}`  // If sale price is equal to price, just show the regular price
                                )}
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">
                                {/* Check if product.tags exists and handle both array and string */}
                                {product.tags ? (
                                    Array.isArray(product.tags)
                                        ? product.tags[0].split(',').map((tag, index) => {
                                            const trimmedTag = tag.trim(); // Trim whitespace
                                            // Default to gray if tag doesn't match
                                            const tagClasses = 'bg-gray-200 text-gray-600';

                                            return (
                                                <span
                                                    key={index}
                                                    className={`text-xs px-2 py-1 rounded-full ${tagClasses}`}
                                                >
                                                    {trimmedTag}
                                                </span>
                                            );
                                        })
                                        : <p className="text-gray-600">Invalid tags format</p>
                                ) : (
                                    <p className="text-gray-600">No tags available</p>
                                )}
                            </div>
                           {
                            user && user.role == 'admin' ? (
                                <a
                                href={`/admin-dashboard/product/${product._id}`}  // Adjust based on your actual route
                                className="mt-4 block bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
                            >
                                View Details
                            </a>
                            )  : ""
                           }
                           {
                               user &&   user.role == 'seller' ? (
                                    <a
                                    href={`/seller-dashboard/product/${product._id}`}  // Adjust based on your actual route
                                    className="mt-4 block bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
                                >
                                    View Details
                                </a>
                                ) : ""
                           }
                        </div>

                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
