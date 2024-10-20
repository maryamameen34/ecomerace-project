const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  title: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory : {type : String } ,
  brand: { type: String, required: true, default: "No Brand" },
  tags: [{ type: String }],
  unit: { type: String },
  main_image: { type: String },
  additional_images: [{ type: String }],
  video_url: { type: String },
  is_new: { type: Boolean , default : true },
  attributes: { type: Map, of: String },
  variants: [{ type: String }],
  price: { type: Number, required: true },
  salePrice: { type: Number }, // Added salePrice field
  discount: { type: Number, default: 0 },
  stockQuantity: { type: Number, required: true },
  specifications: { type: Map, of: String },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  ratings: { type: Number, default: 0 },
  shipping_options: { type: String },
  shipping_dimensions: { type: String },
  shipping_cost: { type: String },
  handling_time: { type: String },
  returnPolicy: { type: String }, // Added returnPolicy field
  warranty: { type: String }, // Added warranty field
  status: { type: String, enum: ['active', 'inactive', 'discontinued'], default: 'active' }, // Added status field
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Added createdBy field
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Added updatedBy field
  featured: { type: Boolean, default: false } // Added featured field
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
