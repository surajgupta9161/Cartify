const userModel = require('../models/user.model')
const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const getAnalytics = async (req, res) => {
  try {
    const users = await userModel.countDocuments({ role: 'user' })
    const orders = await orderModel.countDocuments()
    const products = await productModel.countDocuments()
    const revenue = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' }
        }
      }
    ])
    return res.status(200).json({
      message: 'Get Analytics Successfull',
      users,
      orders,
      products,
      revenue: revenue[0]?.total || 0
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Get Analytics Failed', error: error.message })
  }
}

module.exports = { getAnalytics }
