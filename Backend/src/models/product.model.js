const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  description: {
    type: String,
    require: true,
    trim: true
  },
  price: {
    type: Number,
    require: true,
    trim: true
  },
  image: {
    type: String,
    require: true,
    trim: true
  },
  category: {
    type: String,
    require: true,
    trim: true
  },
  stock: {
    type: Number,
    require: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  }
})

const productModel = mongoose.model('Product', productSchema)

module.exports = productModel
