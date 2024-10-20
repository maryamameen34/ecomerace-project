const Cart = require('../models/Cart');
const Product = require('../models/Product');



// Add product to cart for authenticated users
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the user already has a cart
        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            // If cart exists, update or add product
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

            if (productIndex > -1) {
                // Product already exists, update quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Add new product to cart
                cart.products.push({ product: productId, quantity });
            }
        } else {
            // Create a new cart
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity }],
                totalAmount: product.price * quantity
            });
        }

        // Save the cart
        await cart.save();

        res.status(200).json({ message: 'Product added to cart successfully', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



// Get user's cart items
exports.getuserscartItems = async (req, res) => {
    const userId = req.user._id;

    try {
        // Find the cart for the authenticated user
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Return cart details
        res.status(200).json({ cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update product quantity in cart
exports.updateCartQuantity = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        
        if (productIndex > -1) {
            // Update quantity
            if (quantity === 0) {
                // Remove product if quantity is 0
                cart.products.splice(productIndex, 1);
            } else {
                cart.products[productIndex].quantity = quantity;
            }
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
