const userModel = require('../models/user.model')
const productModel = require('../models/product.model')

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' })
    }

    // Product exists?
    const product = await productModel.findById(productId)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // Find User
    const user = await userModel.findById(req.user.id)

    // Check if product already exists in cart
    const cartItem = user.cart.find(
      item => item.product.toString() === productId
    )

    if (cartItem) {
      // Increase quantity
      cartItem.quantity += Number(quantity)
    } else {
      // Add new product
      user.cart.push({
        product: productId,
        quantity
      })
    }

    await user.save()

    res.status(200).json({
      message: 'Product added to cart successfully',
      cart: user.cart
    })
  } catch (error) {
    res.status(500).json({
      message: 'Add to cart failed',
      error: error.message
    })
  }
}

const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).populate('cart.product')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'Get Cart Successfull', cart: user.cart })
  } catch (error) {
    res.status(500).json({ message: 'Get Cart Failed', error: error.message })
  }
}

module.exports = { addToCart, getCart }
