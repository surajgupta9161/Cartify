const express = require('express')
const paymentRouter = express.Router()
const paymentController = require('../controllers/payment.controller')
const authMiddleware = require('../middlewares/auth-middleware')

paymentRouter.post(
  '/createpaymentorder',
  authMiddleware,
  paymentController.createPaymentOrder
)
paymentRouter.post(
  '/verifypayment',
  authMiddleware,
  paymentController.verifyPayment
)

module.exports = paymentRouter
