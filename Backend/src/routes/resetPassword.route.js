const express = require('express')
const resetPasswordRouter = express.Router()
const resetPasswordController = require('../controllers/resetPassword.controller')

/**
 * -POST /api/auth
 */
resetPasswordRouter.post(
  '/resetpasswordotp',
  resetPasswordController.resetPasswordOtp
)

resetPasswordRouter.post(
  '/verifyresetpasswordotp',
  resetPasswordController.verifyResetPasswordOtp
)

resetPasswordRouter.post(
  '/resetpassword',
  resetPasswordController.resetPassword
)

module.exports = resetPasswordRouter
