const express = require("express")
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'static/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, req.body.name + ".jpg")
    }
  })
  
  const upload = multer({ storage: storage })
const {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct} = require("../controllers/productController")

const productRouter = express.Router()

productRouter.get("/",getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/', upload.single('imageFile') , createProduct);
productRouter.patch('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

module.exports = productRouter