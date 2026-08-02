const express = require('express')
const UserRouter = express.Router()
const userController = require('../controllers/user.controller')
const otpController = require('../controllers/otp.controller')

/**
 * -POST /api/auth/register
 */
UserRouter.post('/register', userController.register)

/**
 * -POST /api/auth/login
 */
UserRouter.post('/login', userController.login)

/**
 * -POST /api/auth/verifyOTP
 */
UserRouter.post('/verifyotp', otpController.verifyotp)

/**
 * -POST /api/auth/resendotp
 */
UserRouter.post('/resendotp', otpController.resendotp)

module.exports = UserRouter
