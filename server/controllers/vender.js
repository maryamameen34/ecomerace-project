const Vendor = require("../models/Vendor");
const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../models/Product");
// Create Vendor
exports.createVendor = async (req, res, next) => {
  const {
    name,
    email,
    phone,
    address,
    website,
    description,
    logo,
    socialLinks,
    createdBy,
    status,
  } = req.body;

  const filename = req.file.filename;
  const fileUrl = path.join("/uploads", filename);

  try {
    const newVendor = new Vendor({
      name,
      email,
      phone,
      address,
      website,
      description,
      logo: fileUrl,
      socialLinks,
      createdBy,
      status,
    });

    await newVendor.save();
    res.status(201).json({ success: true, vendor: newVendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Vendors
exports.getVendors = async (req, res, next) => {
  try {
    const vendors = await Vendor.find().populate(
      "createdBy",
      "first_name role email"
    ); // Populate both name and email fields from the User model

    console.log("Vendors with populated createdBy:", vendors); // Debugging line

    res.status(200).json({ success: true, vendors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Vendor by ID
exports.getVendorById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const vendor = await Vendor.findById(id).populate(
      "createdBy",
      "name email"
    );
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }
    res.status(200).json({ success: true, vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Vendor
exports.updateVendor = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const vendor = await Vendor.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }
    res.status(200).json({ success: true, vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Vendor
exports.deleteVendor = async (req, res, next) => {
  const { id } = req.params;

  try {
    const vendor = await Vendor.findByIdAndDelete(id);
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Vendor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateVendorStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    vendor.status = status; // Update vendor status
    await vendor.save(); // Save to database

    res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get All Vendors with 'pending' status
exports.getPendingVendors = async (req, res, next) => {
  try {
    // Filter vendors where status is 'pending'
    const vendors = await Vendor.find({ status: "pending" }).populate(
      "createdBy",
      "first_name email"
    ); // Populate both name and email fields from the User model

    console.log("Pending vendors with populated createdBy:", vendors); // Debugging line

    if (vendors.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No pending vendors found",
        vendors: [],
      });
    }

    res.status(200).json({ success: true, vendors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getLoggedSellerVendor = async (req, res, next) => {
  try {
    // Fetch vendors created by this seller
    const vendors = await Vendor.find({ createdBy: req.user._id });

    if (!vendors.length) {
      return res.status(404).json({
        success: false,
        message: "No vendors found for this seller.",
      });
    }

    res.status(200).json({
      success: true,
      vendors,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.getLoggedSellerVendorProducts = async (req, res, next) => {
  try {
    // Fetch vendors created by this seller
    const vendors = await Vendor.find({ createdBy: req.user._id });

    if (!vendors.length) {
      return res.status(404).json({
        success: false,
        message: "No vendors found for this seller.",
      });
    }

    // Get the vendor IDs
    const vendorIds = vendors.map((vendor) => vendor._id);

    // Fetch products associated with these vendors
    const products = await Product.find({ vendorId: { $in: vendorIds } });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
