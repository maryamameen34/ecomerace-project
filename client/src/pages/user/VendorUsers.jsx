import React, { useEffect, useState } from "react";
import axios from "axios";

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sellers from the backend
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/sellers", {
          withCredentials: true,
        });
        setSellers(response.data.sellers);
        setLoading(false);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "Something went wrong"
        );
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  // Render loading, error, or the grid of sellers
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sellers List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellers.map((seller) => (
          <div
            key={seller._id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <img
              src={`http://localhost:8000${seller.profile_pic.replace(
                /\\/g,
                "/"
              )}`}
              alt={`${seller.first_name} ${seller.last_name}`}
              className="h-24 w-24 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-bold">
              {seller.first_name} {seller.last_name}
            </h3>
            <p>Email: {seller.email}</p>
            <p>Role: {seller.role}</p>
            <p>Status: {seller.isBlocked ? "Blocked" : "Active"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sellers;
