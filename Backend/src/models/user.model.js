const { verify } = require('jsonwebtoken')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    trim: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    require: true,
    default: 'user'
  },
  otp: {
    type: String
  },
  otpExpire: {
    type: Date
  },
  isverified: {
    type: Boolean,
    default: false
  }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
