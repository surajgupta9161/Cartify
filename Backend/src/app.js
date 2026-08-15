const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/user.router')
const productRoute = require('./routes/product.router')
const orderRoute = require('./routes/order.route')
const cartRoute = require('./routes/cart.route')
const paymentRoute = require('./routes/payment.route')
const analyticsRoute = require('./routes/analytics.route')

app.use(cookieParser())
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
/**
 * -User Route
 */
app.use('/api/auth', userRoute)

/**
 * -Product Route
 */
app.use('/api/product', productRoute)

/**
 * -Add to Cart Route
 */
app.use('/api/cart', cartRoute)

/**
 * -Order Route
 */
app.use('/api/order', orderRoute)

/**
 * -Payment Route
 */
app.use('/api/payment', paymentRoute)

/**
 * -Analytics Route
 */
app.use('/api/analytics', analyticsRoute)
module.exports = app
