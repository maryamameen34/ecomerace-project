const express = require("express");
const appRoutes = express.Router();
const { upload } = require("./multer");

const { isAuthenticated, isSeller } = require("./middlwares/auth.js");
const {
  preSignUp,
  activateUser,
  loginUser,
  loadloggedinUser,
  forgotPassword,
  resetPassword,
  logoutUser,
} = require("./controllers/auth/userController.js");
const {
  UploadProduct,
  getProductsByVendor,
  getProducts,
  getProductById,
  filterProdcuts,
} = require("./controllers/product.js");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createParentCategory,
  deleteParentCategory,
  updateParentCategory,
  getParentCategories,
} = require("./controllers/Categories.js");
const {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
  updateVendorStatus,
  getPendingVendors,
  getLoggedSellerVendor,
  getLoggedSellerVendorProducts,
} = require("./controllers/vender.js");
const {
  addToCart,
  getuserscartItems,
  updateCartQuantity,
  updateCartItem,
} = require("./controllers/cart.js");
const {
  addtowishlist,
  getuserswishlist,
} = require("./controllers/wishlist.js");
const {
  getUsers,
  toggleBlockUser,
  getSellers,
  getCustomers,
} = require("./controllers/user.js");
const { createCoupon, getShopCouponCodes, deleteCouponCode, getCodeByName } = require("./controllers/couponcode/couponcode.js");
const { createOrder } = require("./controllers/order/order.js");
const { paymentProcess, getStripeKey, createCheckout, getPaymentDetails } = require("./controllers/payment/payment.js");
const { handleWebhook } = require("./controllers/webhook/webhook.js");

// User Routes
appRoutes.post("/create", upload.single("file"), preSignUp);
appRoutes.get("/activation/:activation_token", activateUser);
appRoutes.post("/login-user", loginUser);
appRoutes.get("/get-auth-user", isAuthenticated, loadloggedinUser);
appRoutes.post("/forgot-password", forgotPassword);
appRoutes.put("/reset-password/:token", resetPassword);
appRoutes.patch("/users/block/:userId", toggleBlockUser);
appRoutes.get("/users-data", getUsers);
appRoutes.post("/logout", logoutUser);
appRoutes.get("/sellers", getSellers);
appRoutes.get("/customers" , getCustomers)
//categories Routes
appRoutes.post("/categories", upload.single("image"), createCategory);
appRoutes.get("/categories", getCategories);
appRoutes.put("/categories/:id", updateCategory);
appRoutes.delete("/categories/:id", deleteCategory);

// Parent Category routes
appRoutes.post("/parent-category", createParentCategory);
appRoutes.get("/parent-categories", getParentCategories);
appRoutes.put("/parent-category/:id", updateParentCategory);
appRoutes.delete("/parent-category/:id", deleteParentCategory);

// Product Routes
appRoutes.post(
  "/upload-product",
  upload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "additional_images", maxCount: 10 },
    { name: "video_file", maxCount: 1 }, // Handle the video file
  ]),
  UploadProduct
);
appRoutes.get("/product/:id", getProductById); // Get Product by ID
appRoutes.get("/products", getProducts);
appRoutes.get("/products/search", filterProdcuts);
appRoutes.get("/vendor/:vendorId/products", getProductsByVendor); // Get all products for a vendor
appRoutes.get(
  "/seller/vendors/products",
  isAuthenticated,
  getLoggedSellerVendorProducts
);
// Vendor routes
appRoutes.post("/vendor", upload.single("file"), createVendor); // Create Vendor
appRoutes.get("/vendors", getVendors); // Get all vendors
appRoutes.patch("/vendors/:id/status", updateVendorStatus); // Get Vendor by ID
appRoutes.get("/vendor/:id", getVendorById); // Get Vendor by ID
appRoutes.put("/vendor/:id", updateVendor); // Update Vendor
appRoutes.delete("/vendor/:id", deleteVendor); // Delete Vendor
appRoutes.get("/vendors/pending", getPendingVendors);
appRoutes.get("/vendors/my-vendors", isAuthenticated, getLoggedSellerVendor);

// Cart Routes
appRoutes.post("/add-to-cart", isAuthenticated, addToCart);
appRoutes.get("/get-cart-items", isAuthenticated, getuserscartItems);
// Wishlists Routes
appRoutes.post("/add-to-wishlist", isAuthenticated, addtowishlist);
appRoutes.get("/wishlist", isAuthenticated, getuserswishlist);

// Payment Routes

appRoutes.route("/payment").post(paymentProcess);
appRoutes.post("/create-checkout-session" , createCheckout )
appRoutes.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook );
appRoutes.get('payment/:sessionId', getPaymentDetails);
// Order Routes
appRoutes.post("/order/create-order" , createOrder)

// Coupon Code
appRoutes.post("/create-coupon-code" , createCoupon)
appRoutes.get("/get-coupon/:id" , getShopCouponCodes)
appRoutes.delete("/delete-coupon/:id" , deleteCouponCode)
appRoutes.get("/get-coupon-value/:name" , getCodeByName)



module.exports = appRoutes;
