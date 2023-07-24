const categoryModel = require('../models/Category');

async function getAllCategories(req, res){
  try {
    const categories = await categoryModel.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

module.exports = {
  getAllCategories
}