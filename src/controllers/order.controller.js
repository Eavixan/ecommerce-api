const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// CREATE ORDER FROM CART
const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    const orderItems = [];

    for (const item of cart.items) {
      const product = item.product;

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`
        });
      }

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price
      });

      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      paymentStatus: "unpaid",
      orderStatus: "pending"
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order created successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET LOGGED-IN USER ORDERS
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ORDERS - admin only
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email role")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders
};