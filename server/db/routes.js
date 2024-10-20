const express = require("express");
const appRoutes = express.Router();
const { upload } = require("./multer");
const { isAuthenticated } = require("./middlwares/auth.js");
const { preSignUp, activateUser, loginUser, loadloggedinUser, forgotPassword, resetPassword, logoutUser } = require("./controllers/auth/userController.js");
const { UploadProduct } = require("./controllers/Product.js");
const { createCategory, getCategories, updateCategory, deleteCategory, createParentCategory, deleteParentCategory, updateParentCategory, getParentCategories } = require("./controllers/Categories.js");


// User Routes
appRoutes.post("/create", upload.single("file"), preSignUp);
appRoutes.get("/activation/:activation_token", activateUser);
appRoutes.post("/login-user", loginUser);
appRoutes.get("/get-auth-user", isAuthenticated, loadloggedinUser)
appRoutes.post("/forgot-password", forgotPassword);
appRoutes.post("/reset-password/:token", resetPassword);
// appRoutes.get("/users-data" , getAllUsers)
appRoutes.post("/logout", logoutUser)


//categories Routes
appRoutes.post('/categories', upload.single("image"), createCategory);
appRoutes.get('/categories', getCategories);
appRoutes.put('/categories/:id', updateCategory);
appRoutes.delete('/categories/:id', deleteCategory);

// Parent Category routes
appRoutes.post('/parent-category', createParentCategory);
appRoutes.get('/parent-categories', getParentCategories);
appRoutes.put('/parent-category/:id', updateParentCategory);
appRoutes.delete('/parent-category/:id', deleteParentCategory);


// Product Routes
appRoutes.post('/upload-product',
    upload.fields([
        { name: 'main_image', maxCount: 1 },
        { name: 'additional_images', maxCount: 5 },
        { name: 'video_url', maxCount: 1 }
    ]),
    UploadProduct
);


module.exports = appRoutes;
