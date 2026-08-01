const express = require('express')
const UserRouter = express.Router()
const userController = require('../controllers/user.controller')

/**
 * -POST /api/auth/register
 */
UserRouter.post('/register', userController.register)

/**
 * -POST /api/auth/login
 */
UserRouter.post('/login', userController.login)
module.exports = UserRouter
