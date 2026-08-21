const express = require('express')
const UserRouter = express.Router()
const userController = require('../controllers/user.controller')
const otpController = require('../controllers/otp.controller')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin.middleware')

/**
 * -POST /api/auth/register
 */
UserRouter.post('/register', userController.register)

/**
 * -POST /api/auth/login
 */
UserRouter.post('/login', userController.login)

/**
 * -POST /api/auth/logout
 */
UserRouter.post('/logout', userController.logout)

/**
 * -POST /api/auth/verifyOTP
 */
UserRouter.post('/verifyotp', otpController.verifyotp)

/**
 * -POST /api/auth/resendotp
 */
UserRouter.post('/resendotp', otpController.resendotp)

/**
 * -GET /api/auth/getUsers
 */
UserRouter.get(
  '/getUsers',
  authMiddleware,
  adminMiddleware,
  userController.getUsers
)

/**
 * -GET /api/auth/getCurrentUser
 */
UserRouter.get('/me', authMiddleware, userController.getCurrentUser)

module.exports = UserRouter
