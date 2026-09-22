const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product'
        }
      }
    ],
    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine: String,
      city: String,
      state: String,
      postalCode: String
    },
    paymentInfo: {
      type: String,
      enum: ['COD', 'Online'],
      default: 'COD'
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    orderStatus: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered'],
      default: 'Processing'
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const orderModel = mongoose.model('Order', orderSchema)
module.exports = orderModel
