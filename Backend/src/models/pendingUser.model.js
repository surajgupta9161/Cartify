const mongoose = require('mongoose')

const pendingUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  otp: {
    type: String,
    required: true
  },

  otpExpire: {
    type: Date,
    required: true
  },
  otpResendAfter: {
    type: Date,
    required: true
  }
})

const pendingUserModel = mongoose.model('PendingUser', pendingUserSchema)

module.exports = pendingUserModel
