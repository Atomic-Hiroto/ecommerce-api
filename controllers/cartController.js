const cartModel = require("../models/Cart");

async function createCart(req, res) {
    try {
        const user = req.user;
        const cart = await cartModel.create({
            user: user.id,
        });
        res.status(201).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error" });
    }
}

async function getCart(req, res) {
    try {
        const user = req.user;
        let cart = await cartModel
            .findOne({ user: user.id })
            .populate("items.product");
        if (!cart) {
            cart = await cartModel.create({ user: user.id });
        }
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error" });
    }
}

async function addToCart(req, res) {
    try {
        const user = req.user;
        const { productId } = req.params;
        let cart = await cartModel.findOne({ user: user._id });
        let itemIndex = cart.items.findIndex((item) =>
            item.product._id.equals(productId)
        );
        if (itemIndex > -1) {
            let productQty = cart.items[itemIndex].quantity + 1;
            cart.items[itemIndex].quantity = productQty;
        } else {
            cart.items.push({ product: productId, quantity: 1 });
        }
        cart = await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function updateCartQuantity(req, res) {
    try {
        const user = req.user;
        const { productId } = req.params;
        const { quantity } = req.body;
        let cart = await cartModel.findOne({ user: user._id });
        let itemIndex = cart.items.findIndex((item) =>
            item.product._id.equals(productId)
        );
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;  
        }
        cart = await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function deleteFromCart(req, res) {
    try {
        const user = req.user;
        const { productId } = req.params;
        let cart = await cartModel.findOne({ user: user._id });
        let itemIndex = cart.items.findIndex((item) =>
            item.product._id.equals(productId)
        );
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
        }
        cart = await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    createCart,
    getCart,
    addToCart,
    updateCartQuantity,
    deleteFromCart
};
