const mongoose = require('mongoose');
const { Schema } = mongoose;

// Vendor Schema Definition
const vendorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Name should be at least 3 characters long'],
        maxlength: [100, 'Name can be up to 100 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        // match: [/^\d{10}$/, 'Phone number must be 10 digits']
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
        zip: {
            type: String,
            required: true,
            match: [/^\d{5}$/, 'Zip code must be 5 digits']
        },
        country: {
            type: String,
            required: true,
            trim: true
        }
    },
    website: {
        type: String,
        trim: true,
        match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Please enter a valid URL']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description can be up to 500 characters long']
    },
    logo: {
        type: String,
        trim: true,
        default: '' // You could store the image URL or file path
    },
    socialLinks: {
        facebook: {
            type: String,
            trim: true,
            match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Please enter a valid URL']
        },
        twitter: {
            type: String,
            trim: true,
            match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Please enter a valid URL']
        },
        instagram: {
            type: String,
            trim: true,
            match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Please enter a valid URL']
        },
        linkedin: {
            type: String,
            trim: true,
            match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Please enter a valid URL']
        }
    },
    products : [{
        type : Schema.Types.ObjectId ,
        ref : "Product"
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ['active', 'inactive', 'blocked' , 'pending'],
        default: 'active',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Vendor model
const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
