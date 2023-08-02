const productModel = require("../models/Product");
const fs = require("fs")
const path = require("path")

// Get all products from our DB and send as res
async function getAllProducts(req, res) {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error" });
    }
}

// get specific product by Id 
async function getProductById(req, res) {
    try {
        const id = req.params.id;
        const product = await productModel.findById(id);
        product.imageFile = fs.readFileSync(`./static/products/productImg_${product._id}.jpg`)
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error" });
    }
}

// Create new product
async function createProduct(req, res) {
    try {
        const data = req.body;
        const image = req.body.image;
        const product = await productModel.create(data);
        if(image){
            fs.writeFileSync(`./static/products/productImg_${product._id}.jpg`,image)
        }
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error" });
    }
}

// Update existing product
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

// Delete product by ID
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
