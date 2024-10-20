import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getVendorDetails } from '../../redux/actions/vendor';

const VendorDetails = () => {
    const { id } = useParams(); // Get vendor ID from URL params
    const dispatch = useDispatch();

    const { vendor, loading, error } = useSelector((state) => state.vendor);

    // Fetch vendor details when the component mounts
    useEffect(() => {
        dispatch(getVendorDetails(id));
    }, [id, dispatch]);

    if (loading) return <p className="text-center text-lg font-semibold">Loading vendor details...</p>;
    if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;
    if (!vendor) return <p className="text-center text-lg font-semibold">Vendor not found.</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Vendor Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-6">
                <div className="flex items-center space-x-4">
                    <img
                        src={`http://localhost:8000${vendor.logo.replace(/\\/g, '/')}`}
                        alt={vendor.name}
                        className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-indigo-600"
                    />
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">{vendor.name}</h1>
                        <p className="text-lg text-gray-600">{vendor.description}</p>
                    </div>
                </div>
                <div className="text-right">
                    <a
                        href={vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                        Visit Website
                    </a>
                </div>
            </div>

            {/* Vendor Contact Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Contact Info</h2>
                    <p><strong className="text-gray-700">Email:</strong> {vendor.email}</p>
                    <p><strong className="text-gray-700">Phone:</strong> {vendor.phone}</p>

                    <h2 className="text-2xl font-semibold text-gray-800 mt-6">Address</h2>
                    <p className="text-gray-700">
                        {vendor.address.street}, {vendor.address.city}, {vendor.address.state}, {vendor.address.zip}, {vendor.address.country}
                    </p>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Follow Us</h2>
                    <ul className="space-y-2">
                        <li>
                            <a
                                href={vendor.socialLinks.facebook}
                                className="text-blue-600 hover:text-blue-800 font-semibold"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a
                                href={vendor.socialLinks.twitter}
                                className="text-blue-400 hover:text-blue-600 font-semibold"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Twitter
                            </a>
                        </li>
                        <li>
                            <a
                                href={vendor.socialLinks.instagram}
                                className="text-pink-600 hover:text-pink-800 font-semibold"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a
                                href={vendor.socialLinks.linkedin}
                                className="text-blue-800 hover:text-blue-900 font-semibold"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Vendor Created At */}
            <div className="mt-8 text-center text-gray-500">
                <p>Vendor created on: {new Date(vendor.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default VendorDetails;
