const express = require('express')
const { verifyPin } = require('../controllers/pin')

const pinRouter = express.Router()

pinRouter.post('/verify', verifyPin)

module.exports = pinRouter
