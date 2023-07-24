const express = require('express');
const categoryRouter = express.Router();
const {getAllCategories} = require('../controllers/categoryController');

categoryRouter.get('/', getAllCategories);

module.exports = categoryRouter;