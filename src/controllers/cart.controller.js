const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ADD PRODUCT TO CART
const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: "Not enough stock available" });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                items: [{ product: productId, quantity }]
            });
        } else {
            const itemIndex = cart.items.findIndex(
                item => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }

            await cart.save();
        }

        res.status(200).json({
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET USER CART
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id })
            .populate("items.product");

        if (!cart) {
            return res.json({ items: [] });
        }

        res.json(cart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE CART ITEM QUANTITY
const updateCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        item.quantity = quantity;

        await cart.save();

        res.json({
            message: "Cart item updated",
            cart
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// REMOVE PRODUCT FROM CART
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        res.json({
            message: "Product removed from cart",
            cart
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart
};