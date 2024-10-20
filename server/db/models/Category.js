const mongoose = require('mongoose');
const slugify = require('slugify'); // Optional for generating SEO-friendly URLs

const ParentCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
    }
}, { timestamps: true });


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Removes whitespace
    },
    description: {
        type: String,
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParentCategory', // Self-referencing for subcategories
        default: null, // Top-level categories will have null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], // Can manage active/inactive categories
        default: 'active',
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String, 
        default: null,
    },
    metaTitle: {
        type: String,
        trim: true,
    },
    metaDescription: {
        type: String, 
        trim: true,
    },
}, { timestamps: true });

// Middleware to generate a slug from the category name before saving
CategorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});
// Middleware to generate a slug from the category name before saving
ParentCategorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});
// Export both models in one go
const Category = mongoose.model('Category', CategorySchema);
const ParentCategory = mongoose.model('ParentCategory', ParentCategorySchema);

module.exports = { Category, ParentCategory };
