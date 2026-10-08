const mongoose = require('mongoose')

const pinSchema = new mongoose.Schema({
  pin: {
    type: String,
    required: true
  }
})

const Pin = mongoose.model('Pin', pinSchema)

module.exports = Pin
