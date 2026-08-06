const express = require('express')
const orderRouter = express.Router()
const orderController = require('../controllers/order.controller')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin.middleware')

orderRouter.get('/', authMiddleware, orderController.getOrders)
orderRouter.get('/:id', authMiddleware, orderController.getOrderById)
orderRouter.post('/', authMiddleware, orderController.createOrder)
orderRouter.patch(
  '/:id',
  authMiddleware,
  adminMiddleware,
  orderController.updateOrder
)
orderRouter.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  orderController.deleteOrder
)

module.exports = orderRouter
