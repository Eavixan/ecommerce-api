const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart
} = require("../controllers/cart.controller");

const protect = require("../middleware/auth.middleware");

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);

module.exports = router;