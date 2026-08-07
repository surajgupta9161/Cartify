const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
    minlength: 6,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
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
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      }
    }
  ]
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
