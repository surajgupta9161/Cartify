const express = require('express')
const cors = require('cors')
const app = express()
const userRoute = require('./routes/user.router')

app.use('/api/auth', userRoute)

module.exports = app
