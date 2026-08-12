const orderModel = require('../models/order.model')
const userModel = require('../models/user.model')
const { sendMail } = require('../services/sendMail')

const createOrder = async (req, res) => {
  try {
    const { address, city, postalcode, paymentInfo } = req.body

    if (!address || !city || !postalcode || !paymentInfo) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await userModel.findById(req.user.id).populate('cart.product')
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' })
    }

    if (!user.isverified) {
      return res
        .status(401)
        .json({ message: 'User Not Verified, Please verify your email' })
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    const orderItems = user.cart.map(item => ({
      name: item.product.name,
      qty: item.quantity,
      price: item.product.price,
      product: item.product._id
    }))

    const totalPrice = orderItems.reduce(
      (total, item) => total + item.price * item.qty,
      0
    )

    const order = await orderModel.create({
      user: req.user.id,
      orderItems,
      totalPrice,
      shippingAddress: {
        address,
        city,
        postalCode: postalcode,
        paymentInfo
      }
    })

    const itemsMessage = orderItems
      .map((item, index) => {
        const subtotal = item.price * item.qty

        return `
            ${index + 1}. ${item.name}
              Quantity : ${item.qty}
              Price    : ₹${item.price}
              Subtotal : ₹${subtotal}
            `
      })
      .join('\n')

    const message = `
            ==============================
              CARTIFY - ORDER CONFIRMATION
            ==============================

            Hello ${req.user.name},

            Thank you for shopping with Cartify! 🎉

            Your order has been successfully placed.

            Order ID : ${order._id}
            Payment  : ${paymentInfo}
            Status   : Processing

            ----------------------------------------
                          ORDER DETAILS
            ----------------------------------------

            ${itemsMessage}

            ----------------------------------------
            Total Amount : ₹${totalPrice}
            ----------------------------------------

            Shipping Address:
            ${address}
            ${city} - ${postalcode}

            ----------------------------------------

            We will process your order shortly.

            Thank you for choosing Cartify! ❤️

            Regards,
            Cartify Team
            =========================
            `

    await sendMail(req.user.email, `Order Confirmation - ${order._id}`, message)

    user.cart = []
    await user.save()

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
    order.orderStatus = status
    await order.save()
    res.status(200).json({ message: 'Order Status Updated', order })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Order Status Update Failed', error: error.message })
  }
}

module.exports = {
  createOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus
}
