const express = require('express')
const cartRouter = express.Router()
const cartController = require('../controllers/cart.controller')
const authMiddleware = require('../middlewares/auth-middleware')

cartRouter.post('/addtocart', authMiddleware, cartController.addToCart)
cartRouter.get('/getcart', authMiddleware, cartController.getCart)
cartRouter.delete(
  '/removefromcart/:productId',
  authMiddleware,
  cartController.removeFromCart
)
cartRouter.patch(
  '/updatecartquantity/:productId',
  authMiddleware,
  cartController.updateCartQuantity
)
module.exports = cartRouter
