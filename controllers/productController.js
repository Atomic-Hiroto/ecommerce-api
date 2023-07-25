const productModel = require("../models/Product");

async function getAllProducts(req, res) {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error" });
    }
}

async function getProductById(req, res) {
    try {
        const id = req.params.id;
        const product = await productModel.findById(id);
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error" });
    }
}

async function createProduct(req, res) {
    try {
        const data = req.body;
        const product = await productModel.create(data);
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error" });
    }
}

async function updateProduct(req, res) {
    try {
        const id = req.params.id;
        const product = await productModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error" });
    }
}

async function deleteProduct(req, res) {
    try {
        const id = req.params.id;
        await productModel.findByIdAndDelete(id);
        res.json({ message: "Product deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error" });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
