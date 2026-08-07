const orderModel = require('../models/order.model')
const sendMail = require('../services/sendMail')

const createOrder = async (req, res) => {
  try {
    const { address, city, postalcode } = req.body

    const order = await orderModel.create({
      user: req.user.id,
      shippingAddress: {
        address,
        city,
        postalCode: postalcode
      }
    })
    if (!order) {
      return res.status(404).json({ message: 'Order Not Created' })
    }

    const message = `Thanks for shopping with us ${req.user.name} . Your Order has been created with id ${order._id}`
    console.log(req.user.email)
    sendMail(req.user.email, 'Order Created', message)

    res.status(200).json({ message: 'Create Order Successfull', order })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Create Order Failed', error: error.message })
  }
}
const myOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ user: req.user.id })
    if (!orders) {
      return res.status(404).json({ message: 'Orders Not Found Good to Go ' })
    }
    res.status(200).json({ message: 'Get Orders Successfull', orders })
  } catch (error) {
    res.status(500).json({ message: 'Get Orders Failed', error: error.message })
  }
}

const getAllOrders = async (req, res) => {
  try {
    const order = await orderModel.find()
    if (!order) {
      return res.status(404).json({ message: 'Order Not Found' })
    }
    res.status(200).json({ message: 'Get Order Successfull', order })
  } catch (error) {
    res.status(500).json({ message: 'Get Order Failed', error: error.message })
  }
}
const updateOrderStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  try {
    const order = await orderModel.findById(id)
    if (!order) {
      return res.status(404).json({ message: 'Order Not Found' })
    }
    order.status = status
    await order.save()
    res.status(200).json({ message: 'Update Order Successfull', order })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Update Order Failed', error: error.message })
  }
}

module.exports = {
  createOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus
}
