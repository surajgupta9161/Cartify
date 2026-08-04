const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/user.router')
const productRoute = require('./routes/product.router')

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

module.exports = app
