const express = require('express')
const orderRouter = express.Router()
const orderController = require('../controllers/order.controller')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin.middleware')

orderRouter.post('/create', authMiddleware, orderController.createOrder)
orderRouter.get('/myorders', authMiddleware, orderController.myOrders)
orderRouter.get(
  '/allorders',
  authMiddleware,
  adminMiddleware,
  orderController.getAllOrders
)
orderRouter.patch(
  '/updatestatus/:id',
  authMiddleware,
  adminMiddleware,
  orderController.updateOrderStatus
)

module.exports = orderRouter
