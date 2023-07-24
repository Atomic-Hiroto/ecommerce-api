const express = require('express');
const cartRouter = express.cartRouter();

const cartController = require('../controllers/cart');

cartRouter.post('/', createCart);

cartRouter.get('/', getCart);

cartRouter.put('/:productId', addToCart);

cartRouter.patch('/:productId', updateCartQuantity); 

cartRouter.delete('/:productId', deleteFromCart);

module.exports = cartRouter;