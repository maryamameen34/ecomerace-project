const Product = require("../models/Product");
const Vendor = require("../models/Vendor");

// Create Product and associate it with a Vendor
exports.UploadProduct = async (req, res, next) => {
  const {
    vendor,
    title,
    sku,
    description,
    category,
    brand,
    tags,
    subcategory,
    unit,
    attributes,
    variants,
    price,
    salePrice,
    discount,
    stockQuantity,
    specifications,
    shipping_options,
    shipping_dimensions,
    shipping_cost,
    handling_time,
    returnPolicy,
    warranty,
    status,
    createdBy,
    featured,
  } = req.body;

  try {
    // Handle file uploads
    const main_image = req.files.main_image
      ? req.files.main_image[0].path
      : null;
    const additional_images = req.files.additional_images
      ? req.files.additional_images.map((file) => file.path)
      : [];
    const video_file = req.files.video_file
      ? req.files.video_file[0].path
      : null;

    // Create a new Product document
    const newProduct = new Product({
      vendor,
      title,
      sku,
      description,
      category,
      brand,
      tags,
      unit,
      main_image,
      subcategory,
      additional_images,
      video_url: video_file,
      attributes,
      variants,
      price,
      salePrice,
      discount,
      stockQuantity,
      specifications,
      shipping_options,
      shipping_dimensions,
      shipping_cost,
      handling_time,
      returnPolicy,
      warranty,
      status,
      createdBy,
      featured,
    });

    // Save the new product to the database
    await newProduct.save();

    // Add product ID to the vendor's product list
    await Vendor.findByIdAndUpdate(vendor, {
      $push: { products: newProduct._id },
    });

    // Respond with success and the newly created product
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Products by Vendor
exports.getProductsByVendor = async (req, res, next) => {
  const { vendorId } = req.params;

  try {
    const vendor = await Vendor.findById(vendorId).populate("products");
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }
    res.status(200).json({ success: true, products: vendor.products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Vendors
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("vendor", "name")
      .populate("category", "name");
    res.status(200).json({ success: true, products: products || [] }); // Ensure array
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Vendor by ID
exports.getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Populate vendor, category, and vendor.createdBy fields
    const product = await Product.findById(id)
      .populate("vendor", "name _id createdBy") // Populating vendor, fetching only name, _id, and createdBy
      .populate("category", "name _id"); // Populate the category field (assuming category has name and _id fields)

    // If the product is not found
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Return the populated product
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// search Products
exports.filterProdcuts = async (req, res) => {
  const { query } = req.query; // Retrieve the search query from the request

  try {
    const regex = new RegExp(query, "i"); // Create a case-insensitive regex

    const products = await Product.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { tags: { $regex: regex } }, // Add more fields as necessary
      ],
      status: "active", // Optional: Filter for active products only
    }).populate("vendor category"); // Populate related fields if needed

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


