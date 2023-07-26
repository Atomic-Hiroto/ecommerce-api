const orderModel = require("../models/Order");

// Create a new order for the authenticated user
async function createOrder(req, res) {
    try {
        const user = req.user;
        const { cart } = req.body;
        const order = await orderModel.create({
            user: user.id,
            items: cart.items,
            total: cart.total,
        });
        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error" });
    }
}

// Get all of the authenticated user's orders
async function getOrders(req, res) {
    try {
        const user = req.user;
        const orders = await orderModel.find({ user: user.id });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

// Get a specific order from ID
async function getOrder(req, res){
    try {
        const { id } = req.params;
        const order = await orderModel.findById(id);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrder
};
