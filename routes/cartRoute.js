const express = require('express');
const cartRouter = express.Router();
// Protect middleware for authentication
const { protect } = require('../middlewares/auth'); 

const {getCart,createCart, addToCart, updateCartQuantity, deleteFromCart} = require('../controllers/cartController');

cartRouter.post('/',protect,createCart);

cartRouter.get('/',protect, getCart);

cartRouter.put('/:productId',protect, addToCart);

cartRouter.patch('/:productId',protect, updateCartQuantity); 

cartRouter.delete('/:productId',protect, deleteFromCart);

module.exports = cartRouter;