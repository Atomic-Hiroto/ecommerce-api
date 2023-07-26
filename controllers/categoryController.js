const categoryModel = require('../models/Category');

// Get all categories from DB and send as a response
async function getAllCategories(req, res){
  try {
    const categories = await categoryModel.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send({message: 'Server Error'});
  }
}

module.exports = {
  getAllCategories
}