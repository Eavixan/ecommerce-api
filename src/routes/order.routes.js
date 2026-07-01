const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders
} = require("../controllers/order.controller");

const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

router.post("/create", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/", protect, adminOnly, getAllOrders);

module.exports = router;