const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart
} = require("../controllers/cart.controller");

const protect = require("../middleware/auth.middleware");

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.patch("/update/:productId", protect, updateCartItem);
router.delete("/remove/:productId", protect, removeFromCart);

module.exports = router;