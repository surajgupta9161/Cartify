const orderModel = require('../models/order.model')

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.user.id })
      .populate('user', 'name')
    if (!orders) {
      return res.status(404).json({ message: 'Orders Not Found Good to Go ' })
    }
    res.status(200).json({ message: 'Get Orders Successfull', orders })
  } catch (error) {
    res.status(500).json({ message: 'Get Orders Failed', error: error.message })
  }
}

const createOrder = async (req, res) => {}
const getOrderById = async (req, res) => {}
const updateOrder = async (req, res) => {}
const deleteOrder = async (req, res) => {}

module.exports = {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder
}
