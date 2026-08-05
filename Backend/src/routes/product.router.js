const express = require('express')
const productRouter = express.Router()
const productController = require('../controllers/product.controller')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin.middleware')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

productRouter.get('/', productController.getProducts)
productRouter.get('/:id', productController.getProductById)
productRouter.post(
  '/',
  authMiddleware,
  adminMiddleware,
  upload.single('image'),
  productController.createProduct
)
productRouter.patch(
  '/:id',
  authMiddleware,
  adminMiddleware,
  upload.single('image'),
  productController.updateProduct
)
productRouter.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct
)

module.exports = productRouter
