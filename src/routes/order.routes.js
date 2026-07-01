const express = require("express");
const router = express.Router();

const { createOrder } = require("../controllers/order.controller");

const protect = require("../middleware/auth.middleware");

router.post("/create", protect, createOrder);

module.exports = router;