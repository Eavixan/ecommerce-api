const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

// routes
const authRoutes = require("./routes/auth.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;