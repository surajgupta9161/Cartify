const express = require('express')
const rateLimit = require('express-rate-limit')
const { verifyPin } = require('../controllers/pin')

const pinRouter = express.Router()

const pinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    success: false,
    message: 'Too many attempts. Try again later.'
  }
})

pinRouter.post('/verify', pinLimiter, verifyPin)

module.exports = pinRouter
