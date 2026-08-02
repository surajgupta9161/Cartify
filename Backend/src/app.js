const express = require('express')
const cors = require('cors')
const app = express()
const userRoute = require('./routes/user.router')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(cors())

app.use(express.json())
app.use('/api/auth', userRoute)

module.exports = app
