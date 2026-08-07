const express = require('express')
const orderRouter = express.Router()
const orderController = require('../controllers/order.controller')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin.middleware')

orderRouter.post('/', authMiddleware, orderController.createOrder)
orderRouter.get('/', authMiddleware, orderController.myOrders)
orderRouter.get(
  '/:id',
  authMiddleware,
  adminMiddleware,
  orderController.getAllOrders
)
orderRouter.patch(
  '/:id',
  authMiddleware,
  adminMiddleware,
  orderController.updateOrderStatus
)

module.exports = orderRouter
