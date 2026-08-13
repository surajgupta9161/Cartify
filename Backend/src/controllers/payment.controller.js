const razorpay = require('../services/razorpay')
const crypto = require('crypto')
const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body

    if (!amount) {
      return res.status(400).json({
        message: 'Amount is required'
      })
    }

    const options = {
      amount: Math.round(amount * 100), // INR → paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    }

    const order = await razorpay.orders.create(options)

    return res.status(200).json({
      message: 'Payment order created',
      order
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: 'Payment order creation failed',
      error: error.message
    })
  }
}

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        message: 'Payment details are required'
      })
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: 'Payment verification failed'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: 'Payment verification failed',
      error: error.message
    })
  }
}

module.exports = {
  createPaymentOrder,
  verifyPayment
}
