import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProductAction } from "../../redux/actions/product";
import { getVendors } from "../../redux/actions/vendor";
import { getCategories } from "../../redux/actions/categoryActions";
import axios from "axios";

const ProductUploadForm = () => {
  const [formData, setFormData] = useState({
    vendor: "", // New field for vendor
    title: "",
    sku: "",
    description: "",
    price: "",
    stockQuantity: "",
    category: "",
    brand: "",
    subcategory: "",
    tags: "",
    unit: "",
    salePrice: "",
    discount: "",
    shipping_options: "",
    shipping_dimensions: "",
    shipping_cost: "",
    handling_time: "",
    returnPolicy: "",
    warranty: "",
    status: "",
    featured: false,
  });

  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category); // Assuming you have a state to store categories
  const { loading, success, error } = useSelector((state) => state.product);

  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/vendors/my-vendors",
          { withCredentials: true }
        );
        setVendors(response.data.vendors);
      } catch (err) {
        console.log(err.response?.data?.message || "Error fetching vendors");
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    dispatch(getCategories()); // Load categories from backend
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      // Reset the form when the product is successfully uploaded
      setFormData({
        vendor: "",
        title: "",
        sku: "",
        description: "",
        price: "",
        stockQuantity: "",
        subcategory: " ",
        category: "",
        brand: "",
        tags: "",
        unit: "",
        salePrice: "",
        discount: "",
        shipping_options: "",
        shipping_dimensions: "",
        shipping_cost: "",
        handling_time: "",
        returnPolicy: "",
        warranty: "",
        status: "",
        featured: false,
      });
      setMainImage(null);
      setAdditionalImages([]);
      setVideoFile(null);
    }
  }, [success]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.name === "main_image") {
      setMainImage(e.target.files[0]);
    } else if (e.target.name === "additional_images") {
      setAdditionalImages([...e.target.files]);
    } else if (e.target.name === "video_file") {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    if (mainImage) {
      formDataToSubmit.append("main_image", mainImage);
    }
    additionalImages.forEach((file) =>
      formDataToSubmit.append("additional_images", file)
    );
    if (videoFile) {
      formDataToSubmit.append("video_file", videoFile);
    }

    dispatch(uploadProductAction(formDataToSubmit));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {loading && (
        <p className="text-center text-gray-600">Uploading Product...</p>
      )}
      {success && (
        <p className="text-center text-green-600">
          Product uploaded successfully!
        </p>
      )}
      {error && <p className="text-center text-red-600">Error: {error}</p>}

      <form
        className="space-y-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* Vendor Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Select Vendor
          </label>
          <select
            name="vendor"
            value={formData.vendor}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor._id} value={vendor._id}>
                {vendor.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Product Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter product title"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* SKU */}
        <div>
          <label className="block text-sm font-medium text-gray-600">SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
            placeholder="Enter SKU"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="4"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter product price"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Stock Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleInputChange}
            placeholder="Enter stock quantity"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Select Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Product Title
          </label>
          <input
            type="text"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
            placeholder="Enter SubCategory"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            placeholder="Enter brand name"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="Enter tags"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Sale Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Sale Price
          </label>
          <input
            type="number"
            name="salePrice"
            value={formData.salePrice}
            onChange={handleInputChange}
            placeholder="Enter sale price (if applicable)"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Discount */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Discount (%)
          </label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            placeholder="Enter discount percentage"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Shipping Options */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Shipping Options
          </label>
          <input
            type="text"
            name="shipping_options"
            value={formData.shipping_options}
            onChange={handleInputChange}
            placeholder="Enter shipping options"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Shipping Dimensions */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Shipping Dimensions
          </label>
          <input
            type="text"
            name="shipping_dimensions"
            value={formData.shipping_dimensions}
            onChange={handleInputChange}
            placeholder="Enter shipping dimensions"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Shipping Cost */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Shipping Cost
          </label>
          <input
            type="number"
            name="shipping_cost"
            value={formData.shipping_cost}
            onChange={handleInputChange}
            placeholder="Enter shipping cost"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Handling Time */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Handling Time
          </label>
          <input
            type="text"
            name="handling_time"
            value={formData.handling_time}
            onChange={handleInputChange}
            placeholder="Enter handling time"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Return Policy */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Return Policy
          </label>
          <input
            type="text"
            name="returnPolicy"
            value={formData.returnPolicy}
            onChange={handleInputChange}
            placeholder="Enter return policy"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Warranty */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Warranty
          </label>
          <input
            type="text"
            name="warranty"
            value={formData.warranty}
            onChange={handleInputChange}
            placeholder="Enter warranty"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-600">
            Featured Product
          </label>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
            className="ml-2 w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
        </div>

        {/* File Uploads */}
        <div className="space-y-4">
          {/* Main Image */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Main Image
            </label>
            <input
              type="file"
              name="main_image"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Additional Images
            </label>
            <input
              type="file"
              name="additional_images"
              onChange={handleFileChange}
              multiple
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Video File */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Video File
            </label>
            <input
              type="file"
              name="video_file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default ProductUploadForm;
