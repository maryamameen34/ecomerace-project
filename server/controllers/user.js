const Product = require('../models/Product');
const User = require('../models/User');
const Vendor = require('../models/Vendor');



// Get Products by Vendor
exports.getProductsByVendor = async (req, res, next) => {
  const { vendorId } = req.params;

  try {
    const vendor = await Vendor.findById(vendorId).populate('products');
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }
    res.status(200).json({ success: true, products: vendor.products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Users with their order history
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    // .populate('orderHistory', 'name _id');
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get User by ID
exports.getUserById = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)
        .populate('orderHistory', 'name _id');
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

// search Products
exports.filterProdcuts = async (req, res) => {
  const { query } = req.query; // Retrieve the search query from the request

  try {
    const regex = new RegExp(query, 'i'); // Create a case-insensitive regex

    const products = await Product.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { tags: { $regex: regex } } // Add more fields as necessary
      ],
      status: 'active' // Optional: Filter for active products only
    }).populate('vendor category'); // Populate related fields if needed

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


exports.toggleBlockUser = async (req, res) => {
  try {
    const { userId } = req.params;  // Extract user ID from the request parameters
    const { isBlocked } = req.body;  // Get the isBlocked status from the request body

    // Update the user's block status
    const user = await User.findByIdAndUpdate(userId, { isBlocked }, { new: true });

    // If user is not found, return 404 error
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Send a success response
    res.status(200).json({ success: true, message: `User has been ${isBlocked ? 'blocked' : 'unblocked'}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Get All Sellers
exports.getSellers = async (req, res, next) => {
  try {
    // Find users with the role of 'seller'
    const sellers = await User.find({ role: 'seller' });
    
    if (!sellers.length) {
      return res.status(404).json({ success: false, message: "No sellers found" });
    }

    res.status(200).json({ success: true, sellers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Get All Users
exports.getCustomers = async (req, res, next) => {
  try {
    // Find users with the role of 'seller'
    const customers = await User.find({ role: 'customer' });
    
    if (!customers.length) {
      return res.status(404).json({ success: false, message: "No customers found" });
    }

    res.status(200).json({ success: true, customers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
