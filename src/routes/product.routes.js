const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts
} = require("../controllers/product.controller");

const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

// Public route
router.get("/", getProducts);

// Admin route
router.post("/", protect, adminOnly, createProduct);

module.exports = router;