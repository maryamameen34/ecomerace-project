import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPendingVendors, updateVendorStatus } from '../../redux/actions/vendor';

const PendingVendors = () => {
    const dispatch = useDispatch();

    // Local state to manage the current view mode
    const [viewMode, setViewMode] = useState('table');

    // Access vendor state from Redux store
    const { loading, vendors, error, message } = useSelector(state => state.vendor);

    // Fetch pending vendors on component mount
    useEffect(() => {
        dispatch(getPendingVendors());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg">Loading pending vendors...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg text-red-500">Error: {error}</p>
            </div>
        );
    }

    // If no pending vendors exist, display the message
    if (vendors.length === 0) {
        return (
            <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
                <p className="text-xl text-gray-600">{message || 'No pending vendors found.'}</p>
            </div>
        );
    }

    // Click handler to update vendor status
    const handleStatusChange = (vendorId, currentStatus) => {
        const newStatus = currentStatus === 'pending' ? 'active' : 'pending';
        dispatch(updateVendorStatus(vendorId, newStatus));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Pending Vendors</h1>

            {/* View Mode Dropdown */}
            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <span className="text-gray-600">View as:</span>
                    <select
                        className="p-2 border border-gray-300 rounded-md"
                        value={viewMode}
                        onChange={(e) => setViewMode(e.target.value)}
                    >
                        <option value="table">Table</option>
                        <option value="grid">Grid</option>
                    </select>
                </div>
            </div>

            {/* Conditional Rendering based on View Mode */}
            <>
                {/* Table View */}
                {viewMode === 'table' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Vendor Name</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Email</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Phone</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Address</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendors.map((vendor) => (
                                    <tr key={vendor._id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b border-gray-200">{vendor.name}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{vendor.email}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{vendor.phone}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            {vendor.address.street}, {vendor.address.city}, {vendor.address.state}, {vendor.address.zip}, {vendor.address.country}
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            <span
                                                className={`cursor-pointer text-blue-500 hover:underline`}
                                                onClick={() => handleStatusChange(vendor._id, vendor.status)}
                                            >
                                                {vendor.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Grid View */}
                {viewMode === 'grid' && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vendors.map((vendor) => (
                            <div key={vendor._id} className="p-4 bg-white shadow-md rounded-md border border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{vendor.name}</h2>
                                <p className="text-sm text-gray-600 mb-2"><strong>Email:</strong> {vendor.email}</p>
                                <p className="text-sm text-gray-600 mb-2"><strong>Phone:</strong> {vendor.phone}</p>
                                <p className="text-sm text-gray-600 mb-2"><strong>Address:</strong> {vendor.address.street}, {vendor.address.city}, {vendor.address.state}, {vendor.address.zip}, {vendor.address.country}</p>
                                <p
                                    className="text-sm hover:text-gray-600 cursor-pointer text-blue-500 hover:underline"
                                    onClick={() => handleStatusChange(vendor._id, vendor.status)}
                                >
                                    <strong>Status:</strong> {vendor.status}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </>
        </div>
    );
};

export default PendingVendors;
