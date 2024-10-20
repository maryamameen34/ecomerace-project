import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CouponManagement = () => {
  const [couponName, setCouponName] = useState('');
  const [couponValue, setCouponValue] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [shopId, setShopId] = useState(''); // Set this to the current vendor's ID
  const [couponCodes, setCouponCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing coupon codes
  const fetchCouponCodes = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-coupon/${shopId}`, { withCredentials: true });
      setCouponCodes(response.data.couponCodes);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching coupon codes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCouponCodes();
  }, [shopId]);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/create-coupon-code', {
        name: couponName,
        value: couponValue,
        minAmount,
        maxAmount,
        shopId,
      });
      alert(response.data.message);
      fetchCouponCodes(); // Refresh coupon codes after creation
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating coupon code');
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon code?')) {
      try {
        await axios.delete(`http://localhost:8000/api/delete-coupon/${id}`, { withCredentials: true });
        alert('Coupon code deleted successfully');
        fetchCouponCodes(); // Refresh coupon codes after deletion
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting coupon code');
      }
    }
  };

  const resetForm = () => {
    setCouponName('');
    setCouponValue('');
    setMinAmount('');
    setMaxAmount('');
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Coupon Management</h1>
      <form onSubmit={handleCreateCoupon} className="mb-6">
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponName}
          onChange={(e) => setCouponName(e.target.value)}
          required
          className="border rounded p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Value"
          value={couponValue}
          onChange={(e) => setCouponValue(e.target.value)}
          required
          className="border rounded p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          className="border rounded p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          className="border rounded p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2">Create Coupon</button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Existing Coupons</h2>
      <div className="grid grid-cols-1 gap-4">
        {couponCodes.map((coupon) => (
          <div key={coupon._id} className="border rounded p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{coupon.name}</h3>
              <p>Value: {coupon.value}</p>
              <p>Min Amount: {coupon.minAmount}</p>
              <p>Max Amount: {coupon.maxAmount}</p>
            </div>
            <button
              onClick={() => handleDeleteCoupon(coupon._id)}
              className="bg-red-500 text-white rounded px-4 py-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponManagement;
