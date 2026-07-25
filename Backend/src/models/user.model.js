const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    require: true,
    default: 'user'
  }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
