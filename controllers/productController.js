const productModel = require("../models/Product")

async function getAllProducts(req,res){
    try {
        const products = await productModel.find();
        res.json(products);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
}

module.exports = {
    getAllProducts
}