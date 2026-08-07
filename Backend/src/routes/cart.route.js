const express = require('express')
const cartRouter = express.Router()
const cartController = require('../controllers/cart.controller')
const authMiddleware = require('../middlewares/auth-middleware')

cartRouter.post('/addtocart', authMiddleware, cartController.addToCart)
cartRouter.get('/getcart', authMiddleware, cartController.getCart)

module.exports = cartRouter
