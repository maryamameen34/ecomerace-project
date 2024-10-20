// Vendors.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcViewDetails } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { getVendors, updateVendorStatus } from "../../redux/actions/vendor";

const Vendors = () => {
  const [view, setView] = useState("table"); // State for view type
  const dispatch = useDispatch();

  const Vendors = useSelector((state) => state.vendor);
  const { loading, error, vendors } = Vendors || {};

  const updateStatus = (vendorId, newStatus) => {
    dispatch(updateVendorStatus(vendorId, newStatus)); // Dispatch action to update status
  };

  // Fetch vendors when the component mounts
  useEffect(() => {
    dispatch(getVendors());
  }, [dispatch]);

  const navigate = useNavigate();

  // Navigate to VendorDetails page on "Show More" click
  const showVendorDetails = (vendorId) => {
    navigate(`/admin-dashboard/vendor/${vendorId}`); // Navigate to vendor details page with vendor ID
  };

  // Function to handle status update on button click
  const handleStatusClick = (vendorId, currentStatus) => {
    let newStatus;
    if (currentStatus === "active") {
      newStatus = "pending";
    } else if (currentStatus === "pending") {
      newStatus = "blocked";
    } else {
      newStatus = "active";
    }
    updateStatus(vendorId, newStatus); // Dispatch to update status
  };

  return (
    <div className="w-full ml-auto mt-9 border p-4 shadow-lg mr-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-center text-gray-700">
          Vendor Lists
        </h2>

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

      <div className="ml-auto w-20 py-3 px-1 bg-indigo-600 rounded-md hover:bg-indigo-400 justify-end">
        <Link to={`/admin-dashboard/vendor/create`} className="text-white pl-1">
          Add New
        </Link>
      </div>

      {/* Loading, Error, or display vendors */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : vendors?.length === 0 ? (
        <p>No vendors available.</p>
      ) : view === "table" ? (
        <table className="table-auto mt-5 w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Vendor Name</th>
              <th className="border px-4 py-2">Creator</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Created Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors?.map((vendor) => (
              <tr key={vendor._id}>
                <td className="border px-4 py-2">
                  <img
                    src={`http://localhost:8000${vendor.logo.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt={vendor.name}
                    className="w-11 h-11 rounded-full ml-5 cursor-pointer object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{vendor.name}</td>
                {/* Display the name of the creator here */}
                <td className="border px-4 py-2">
                  {vendor.createdBy?.first_name} ({vendor.createdBy?.role}){" "}
                </td>
                <td
                  className={`border px-4 py-1 ${
                    vendor.status === "active"
                      ? "text-green-700 bg-green-200"
                      : vendor.status === "pending"
                      ? "text-yellow-700 bg-yellow-100"
                      : vendor.status === "blocked"
                      ? "text-red-700 bg-red-100"
                      : "text-gray-500 bg-gray-100"
                  }`}
                >
                  <button
                    className="py-2 px-3 rounded-full uppercase text-xs"
                    onClick={() => handleStatusClick(vendor._id, vendor.status)}
                  >
                    {vendor.status}
                  </button>
                </td>
                <td className="border px-4 py-2">
                  {new Date(vendor.createdAt).toISOString().split("T")[0]}
                </td>
                <td className="border flex px-4 py-2 text-xl mt-1">
                  <button className=" ml-auto text-indigo-500  p-2 mr-auto hover:underline font-medium ">
                    <Link
                      role="button"
                      onClick={() => showVendorDetails(vendor._id)}
                    >
                      Details
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4 mt-5">
          {vendors?.map((vendor) => (
            <div key={vendor._id} className="border p-4 rounded shadow">
              <img
                src={`http://localhost:8000${vendor.logo.replace(/\\/g, "/")}`}
                alt={vendor.name}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-3"
              />
              <h3 className="text-center text-lg font-semibold">
                {vendor.name}
              </h3>
              <p
                className={`text-center font-semibold py-1 rounded-full 
                                ${
                                  vendor.status === "active"
                                    ? "text-green-700 bg-green-200 uppercase text-xs my-1"
                                    : vendor.status === "pending"
                                    ? "text-yellow-700 bg-yellow-100"
                                    : vendor.status === "blocked"
                                    ? "text-red-700 bg-red-100"
                                    : "text-gray-500 bg-gray-100"
                                }`}
              >
                {vendor.status}
              </p>

              {/* Show creator's name here */}
              <p className="text-center text-sm text-gray-400">
                {vendor.createdBy?.name || "Unknown"}
              </p>

              <p className="text-center text-sm text-gray-400">
                {new Date(vendor.createdAt).toISOString().split("T")[0]}
              </p>
              <div className="flex justify-center mt-3 text-xl space-x-2">
                <button
                  className="bg-indigo-500 text-white rounded-full p-2"
                  onClick={() => showVendorDetails(vendor._id)}
                >
                  Show More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vendors;
