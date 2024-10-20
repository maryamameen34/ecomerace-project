const Product = require("../models/Product");
const path = require('path');

// Upload Product Controller
exports.UploadProduct = async (req, res, next) => {
    const { vendor, title, sku, description, category, brand, tags, unit, price, salePrice, discount, stockQuantity, specifications, 
            shipping_options, shipping_dimensions, shipping_cost, handling_time, returnPolicy, warranty, status, createdBy, featured 
    } = req.body;

    try {
        // Multer uploads (for image and video)
        const mainImageUrl = req.files.main_image ? path.join('/uploads', req.files.main_image[0].filename) : '';
        const additionalImageUrls = req.files.additional_images ? req.files.additional_images.map(file => path.join('/uploads', file.filename)) : [];
        const videoUrl = req.files.video_url ? path.join('/uploads', req.files.video_url[0].filename) : '';

        // Create the product document
        const product = new Product({
            vendor,
            title,
            sku,
            description,
            category,
            brand,
            tags,
            unit,
            main_image: mainImageUrl,
            additional_images: additionalImageUrls,
            video_url: videoUrl,
            attributes: req.body.attributes,
            variants: req.body.variants,
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

        await product.save();

        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
