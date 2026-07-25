const userModel = require('../models/user.model')
const register = (req, res) => {
  res.send('User registered')
}

module.exports = { register }
