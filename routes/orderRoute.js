const express = require("express");
const {
    createOrder,
    getOrders,
    getOrder,
} = require("../controllers/orderController");
// Protect middleware for authentication
const { protect } = require("../middlewares/auth");
const orderRouter = express.Router();

orderRouter.post("/", protect, createOrder);
orderRouter.get("/", protect, getOrders);
orderRouter.get("/:id", protect, getOrder);

module.exports = orderRouter;
