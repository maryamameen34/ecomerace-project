import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const VendorForm = () => {
  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    website: "",
    description: "",
    socialLinks: { facebook: "", twitter: "", instagram: "", linkedin: "" },
    status: user && user.role == "admin" ? "active" : "pending",
    createdBy: user._id, // You need to dynamically set this in a real app
  });

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [logo, setLogo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.socialLinks) {
      setFormData({
        ...formData,
        socialLinks: { ...formData.socialLinks, [name]: value },
      });
    } else if (name in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to send as multipart form data
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address[street]", formData.address.street);
    formDataToSend.append("address[city]", formData.address.city);
    formDataToSend.append("address[state]", formData.address.state);
    formDataToSend.append("address[zip]", formData.address.zip);
    formDataToSend.append("address[country]", formData.address.country);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("description", formData.description);
    formDataToSend.append(
      "socialLinks[facebook]",
      formData.socialLinks.facebook
    );
    formDataToSend.append("socialLinks[twitter]", formData.socialLinks.twitter);
    formDataToSend.append(
      "socialLinks[instagram]",
      formData.socialLinks.instagram
    );
    formDataToSend.append(
      "socialLinks[linkedin]",
      formData.socialLinks.linkedin
    );
    formDataToSend.append("status", formData.status);
    formDataToSend.append("createdBy", formData.createdBy);

    // Append the logo file
    if (logo) {
      formDataToSend.append("file", logo);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/vendor",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Vendor created successfully");
    } catch (error) {
      console.error("Error creating vendor", error);
      setError("Failed to create vendor. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Create Vendor
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}

        {/* Vendor Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="block  font-medium text-gray-600">
            Vendor Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter Vendor Name"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="block  font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Vendor Email"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="block  font-medium text-gray-600">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter Vendor Phone"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        {/* Logo Upload */}
        <div className="flex flex-col">
          <label htmlFor="logo" className="block font-medium text-gray-600">
            Vendor Logo
          </label>
          <input
            type="file"
            name="logo"
            onChange={handleImageUpload}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <p className="mt-5 block  font-semibold text-gray-500">
            Address Details
          </p>
        </div>
        {/* Address (Street, City, State, Zip, Country) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="street"
              className="block  font-medium text-gray-600"
            >
              Street
            </label>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={handleInputChange}
              placeholder="Enter Street Address"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="block  font-medium text-gray-600">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={handleInputChange}
              placeholder="Enter City"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="block  font-medium text-gray-600">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.address.state}
              onChange={handleInputChange}
              placeholder="Enter State"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="zip" className="block  font-medium text-gray-600">
              Zip
            </label>
            <input
              type="text"
              name="zip"
              value={formData.address.zip}
              onChange={handleInputChange}
              placeholder="Enter Zip Code"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="country"
              className="block  font-medium text-gray-600"
            >
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.address.country}
              onChange={handleInputChange}
              placeholder="Enter Country"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>

        {/* Website */}
        <div className="flex flex-col">
          <label htmlFor="website" className="block  font-medium text-gray-600">
            Website
          </label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="Enter Website URL"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="block  font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter Vendor Description"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <p className="mt-5 block  font-semibold text-gray-500">
            Social Links
          </p>
        </div>

        {/* Social Links (Facebook, Twitter, Instagram, LinkedIn) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="facebook"
              className="block  font-medium text-gray-600"
            >
              Facebook
            </label>
            <input
              type="text"
              name="facebook"
              value={formData.socialLinks.facebook}
              onChange={handleInputChange}
              placeholder="Facebook URL"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="twitter"
              className="block  font-medium text-gray-600"
            >
              Twitter
            </label>
            <input
              type="text"
              name="twitter"
              value={formData.socialLinks.twitter}
              onChange={handleInputChange}
              placeholder="Twitter URL"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="instagram"
              className="block  font-medium text-gray-600"
            >
              Instagram
            </label>
            <input
              type="text"
              name="instagram"
              value={formData.socialLinks.instagram}
              onChange={handleInputChange}
              placeholder="Instagram URL"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="linkedin"
              className="block  font-medium text-gray-600"
            >
              LinkedIn
            </label>
            <input
              type="text"
              name="linkedin"
              value={formData.socialLinks.linkedin}
              onChange={handleInputChange}
              placeholder="LinkedIn URL"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Status */}
        {user && user.role == "admin" ? (
          <>
            <input
              type="text"
              name="status"
              value="active"
              hidden
              className="input-field"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              name="status"
              value="pending"
              hidden
              className="input-field"
            />
          </>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading ? "opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Vendor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorForm;
