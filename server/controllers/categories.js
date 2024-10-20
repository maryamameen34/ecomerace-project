const { Category, ParentCategory } = require('../models/Category'); // Import both models
const path = require("path")
const fs = require("fs")


// Create a new parent category
exports.createParentCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const parentCategory = new ParentCategory({
            name,
        });

        // The slug will be automatically generated from the name
        await parentCategory.save();
        res.status(201).json({ success: true, parentCategory });
    } catch (error) {
        console.error(error);
        // Send appropriate error message if slug is not unique
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: 'Category slug must be unique' });
        } else {
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
};

// Get all parent categories
exports.getParentCategories = async (req, res) => {
    try {
        const parentCategories = await ParentCategory.find({});
        res.status(200).json({ success: true, parentCategories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update a parent category
exports.updateParentCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const parentCategory = await ParentCategory.findByIdAndUpdate(id, updates, { new: true });
        if (!parentCategory) {
            return res.status(404).json({ success: false, message: 'Parent Category not found' });
        }

        res.status(200).json({ success: true, parentCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete a parent category
exports.deleteParentCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const parentCategory = await ParentCategory.findByIdAndDelete(id);
        if (!parentCategory) {
            return res.status(404).json({ success: false, message: 'Parent Category not found' });
        }

        res.status(200).json({ success: true, message: 'Parent Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, description, parentCategory, isFeatured, metaTitle, metaDescription } = req.body;
        const categoreyExists = await Category.findOne({ name });
        if (categoreyExists) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Error deleting files" });
                }
                res.json({ message: "File deleted successfully!" });
            });

            return next(new ErrorHandler("Category already exists!", 400));
        }
        const filename = req.file.filename;
        const fileUrl = path.join('/uploads', filename);

        const category = new Category({
            name,
            description,
            parentCategory,
            isFeatured,
            image : fileUrl,
            metaTitle,
            metaDescription,
        });

        await category.save();
        res.status(201).json({ success: true, category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Modify your getCategories function to populate the parentCategory field with its name
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
            .populate('parentCategory', 'name'); // Populate parentCategory with its name only

        res.status(200).json({ success: true, categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const category = await Category.findByIdAndUpdate(id, updates, { new: true });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
