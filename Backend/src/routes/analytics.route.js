const express = require('express')
const analyticsRouter = express.Router()
const analyticsController = require('../controllers/analytics.controller')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin.middleware')

analyticsRouter.get(
  '/',
  authMiddleware,
  adminMiddleware,
  analyticsController.getAnalytics
)

module.exports = analyticsRouter
