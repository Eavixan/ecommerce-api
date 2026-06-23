const express = require("express");
const router = express.Router();

const { createProduct } = require("../controllers/product.controller");

const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

// CREATE PRODUCT (ADMIN ONLY)
router.post("/", protect, adminOnly, createProduct);

module.exports = router;