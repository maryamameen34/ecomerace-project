import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { BsTwitter } from "react-icons/bs";



const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/vendors/my-vendors", { withCredentials: true });
        setVendors(response.data.vendors);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching vendors");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Vendor List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div key={vendor._id} className="bg-white rounded-lg shadow-lg p-5">
            <img 
              src={`http://localhost:8000${vendor.logo.replace(/\\/g, '/')}`} 
              alt={`${vendor.name} Logo`} 
              className="h-24 w-24 object-cover rounded-full mx-auto mb-4" 
            />
            <h2 className="text-xl font-semibold text-center mb-2">{vendor.name}</h2>
            <p className="text-gray-600 mb-2">{vendor.description}</p>
            <div className="text-center">
              <a href={`mailto:${vendor.email}`} className="text-blue-500 hover:underline">{vendor.email}</a>
              <p className="text-gray-500">{vendor.phone}</p>
              <p className="text-gray-500">{vendor.address.street}, {vendor.address.city}, {vendor.address.state}, {vendor.address.zip}, {vendor.address.country}</p>
              <p className="text-gray-500">Status: <span className={`font-bold ${vendor.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>{vendor.status}</span></p>
              <div className='mt-3'>
              <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-2">Visit Website</a>
              </div>
              <div className="flex justify-center mt-3">
                
                <a href={vendor.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-2"> <FaFacebookF /> </a>
                <a href={vendor.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-2"><BsTwitter /> </a>
                <a href={vendor.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-2"> <FaInstagram /> </a>
                <a href={vendor.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-2"><FaLinkedinIn /> </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorList;
