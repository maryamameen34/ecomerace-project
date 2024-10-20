const Wishlist = require("../models/wishlist");

exports.addtowishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const wishlist = await Wishlist.findOne({ user: req.user.id });

        if (wishlist) {
            if (!wishlist.products.includes(productId)) { // corrected wishlist reference
                wishlist.products.push(productId); // corrected wishlist reference
                await wishlist.save(); // corrected wishlist reference
                return res.status(200).json({ message: "Product added to wishlist", wishlist });
            }
            return res.status(400).json({ message: "Product already in wishlist" });
        } else {
            const newWishlist = new Wishlist({ user: req.user.id, products: [productId] }); // corrected to Wishlist
            await newWishlist.save();
            return res.status(201).json({ message: "Wishlist created and product added", wishlist: newWishlist });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.removefromwishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const wishlist = await Wishlist.findOne({ user: req.user.id });

        if (wishlist) {
            wishlist.products = wishlist.products.filter(item => item.toString() !== productId);
            await wishlist.save();
            return res.status(200).json({ message: "Product removed from wishlist", wishlist });
        }

        return res.status(404).json({ message: "Wishlist not found" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getuserswishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');
        return res.status(200).json({ wishlist });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
