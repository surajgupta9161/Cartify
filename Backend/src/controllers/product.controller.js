const productModel = require('../models/product.model')
const cloudinary = require('../services/cloudinary')

const getProducts = async (req, res) => {
  try {
    const { category } = req.query
    const filter = {}
    if (category && category !== 'All') {
      filter.category = category
    }
    const products = await productModel.find(filter)
    return res
      .status(200)
      .json({ message: 'Get Product Successfull', products })
  } catch (error) {
    console.log('🔥 GET PRODUCTS ERROR:', error)
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

const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product Not Found' })
    }
    return res.status(200).json({ message: 'Get Product Successfull', product })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Get Product Failed', error: error.message })
  }
}

const updateProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body
  try {
    const product = await productModel.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product Not Found' })
    }
    if (product) {
      product.name = name ?? product.name
      product.description = description ?? product.description
      product.price = price ?? product.price
      product.category = category ?? product.category
      product.stock = stock ?? product.stock
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path)
      product.image = result.secure_url
    }

    await product.save()

    return res
      .status(200)
      .json({ message: 'Product Updated Successfull', product })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Update Product Failed', error: error.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product Not Found' })
    }
    await product.deleteOne()
    return res
      .status(200)
      .json({ message: 'Product Deleted Successfull', product })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Delete Product Failed', error: error.message })
  }
}

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
}
