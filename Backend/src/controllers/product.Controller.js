const productModel = require('../models/product.model')
const cloudinary = require('../services/cloudinary')

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find()
    return res
      .status(200)
      .json({ message: 'Get Product Successfull', products })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Get Product Failed', error: error.message })
  }
}

const createProduct = async (req, res) => {
  const { name, description, price, category, stock, rating, numReviews } =
    req.body

  if (!name || !description || !price || !category || !stock) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  let imageUrl = ''
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path)
      // console.log('image url by cloudinary ', result)
      imageUrl = result.secure_url
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Image Upload Failed', error: error.message })
    }
  }

  try {
    const product = await productModel.create({
      name,
      description,
      price,
      category,
      image: imageUrl,
      stock,
      rating,
      numReviews
    })
    return res
      .status(200)
      .json({ message: 'Product Created Successfully', product })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Product Creation Failed', error: error.message })
  }
}

const getProductById = async (req, res) => {}

const updateProduct = async (req, res) => {}

const deleteProduct = async (req, res) => {}

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
}
