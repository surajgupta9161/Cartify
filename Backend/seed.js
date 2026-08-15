const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config()

const userModel = require('./src/models/user.model')
const productModel = require('./src/models/product.model')
const orderModel = require('./src/models/order.model')

const seedData = async () => {
  try {
    // MongoDB connect
    await mongoose.connect(process.env.MONGO_URI)

    console.log('MongoDB connected')

    // Delete old seed data
    await orderModel.deleteMany({})
    await productModel.deleteMany({})
    await userModel.deleteMany({})

    console.log('Old data deleted')

    // Common password
    const hashedPassword = await bcrypt.hash('123456', 10)

    // =========================
    // USERS
    // =========================

    const users = await userModel.insertMany([
      // USER
      {
        name: 'Suraj Gupta',
        email: 'suraj66189@gmail.com',
        password: hashedPassword,
        role: 'user',
        isverified: true
      },

      // DEFAULT USER
      {
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        password: hashedPassword,
        role: 'user',
        isverified: true
      },

      // DEFAULT USER
      {
        name: 'Aman Verma',
        email: 'aman@example.com',
        password: hashedPassword,
        role: 'user',
        isverified: true
      },

      // ADMIN
      {
        name: 'Cartify Admin',
        email: 'suraj666189@gmail.com',
        password: hashedPassword,
        role: 'admin',
        isverified: true
      }
    ])

    console.log(`${users.length} users created`)

    // =========================
    // PRODUCTS
    // =========================

    const products = await productModel.insertMany([
      {
        name: 'Classic T-Shirt',
        description: 'Comfortable cotton t-shirt',
        price: 499,
        image: 'https://example.com/tshirt.jpg',
        category: 'Clothing',
        stock: 50,
        rating: 4.5,
        numReviews: 20
      },

      {
        name: 'Running Shoes',
        description: 'Lightweight running shoes',
        price: 1499,
        image: 'https://example.com/shoes.jpg',
        category: 'Footwear',
        stock: 30,
        rating: 4.3,
        numReviews: 15
      },

      {
        name: 'Smart Watch',
        description: 'Smart watch with fitness tracking',
        price: 2499,
        image: 'https://example.com/watch.jpg',
        category: 'Electronics',
        stock: 20,
        rating: 4.6,
        numReviews: 25
      },

      {
        name: 'Backpack',
        description: 'Durable everyday backpack',
        price: 899,
        image: 'https://example.com/bag.jpg',
        category: 'Accessories',
        stock: 40,
        rating: 4.2,
        numReviews: 10
      },

      {
        name: 'Wireless Headphones',
        description: 'Wireless headphones with clear sound',
        price: 1999,
        image: 'https://example.com/headphones.jpg',
        category: 'Electronics',
        stock: 25,
        rating: 4.4,
        numReviews: 18
      },
      {
        name: 'Denim Jeans',
        description: 'Comfortable slim-fit denim jeans',
        price: 1299,
        image: 'https://example.com/jeans.jpg',
        category: 'Clothing',
        stock: 35,
        rating: 4.4,
        numReviews: 16
      },

      {
        name: 'Leather Wallet',
        description: 'Premium leather wallet with multiple card slots',
        price: 699,
        image: 'https://example.com/wallet.jpg',
        category: 'Accessories',
        stock: 45,
        rating: 4.3,
        numReviews: 12
      },

      {
        name: 'Bluetooth Speaker',
        description: 'Portable wireless Bluetooth speaker',
        price: 1599,
        image: 'https://example.com/speaker.jpg',
        category: 'Electronics',
        stock: 25,
        rating: 4.5,
        numReviews: 22
      },

      {
        name: 'Sports Cap',
        description: 'Lightweight cap for sports and everyday use',
        price: 399,
        image: 'https://example.com/cap.jpg',
        category: 'Accessories',
        stock: 60,
        rating: 4.1,
        numReviews: 8
      },

      {
        name: 'Casual Hoodie',
        description: 'Warm and comfortable casual hoodie',
        price: 999,
        image: 'https://example.com/hoodie.jpg',
        category: 'Clothing',
        stock: 40,
        rating: 4.6,
        numReviews: 19
      }
    ])

    console.log(`${products.length} products created`)

    // =========================
    // ORDERS
    // =========================

    const orders = await orderModel.insertMany([
      // ORDER 1
      {
        user: users[0]._id,

        orderItems: [
          {
            name: products[0].name,
            qty: 2,
            price: products[0].price,
            product: products[0]._id
          },
          {
            name: products[1].name,
            qty: 1,
            price: products[1].price,
            product: products[1]._id
          }
        ],

        shippingAddress: {
          address: 'Delhi',
          city: 'Delhi',
          postalCode: '110001'
        },

        paymentInfo: 'Online',
        isPaid: true,
        orderStatus: 'Delivered',

        totalPrice: products[0].price * 2 + products[1].price
      },

      // ORDER 2
      {
        user: users[1]._id,

        orderItems: [
          {
            name: products[2].name,
            qty: 1,
            price: products[2].price,
            product: products[2]._id
          }
        ],

        shippingAddress: {
          address: 'Noida',
          city: 'Noida',
          postalCode: '201301'
        },

        paymentInfo: 'COD',
        isPaid: false,
        orderStatus: 'Processing',

        totalPrice: products[2].price
      },

      // ORDER 3
      {
        user: users[2]._id,

        orderItems: [
          {
            name: products[3].name,
            qty: 1,
            price: products[3].price,
            product: products[3]._id
          },
          {
            name: products[4].name,
            qty: 2,
            price: products[4].price,
            product: products[4]._id
          }
        ],

        shippingAddress: {
          address: 'Gurgaon',
          city: 'Gurgaon',
          postalCode: '122001'
        },

        paymentInfo: 'Online',
        isPaid: true,
        orderStatus: 'Shipped',

        totalPrice: products[3].price + products[4].price * 2
      }
    ])

    console.log(`${orders.length} orders created`)

    console.log('Seed data inserted successfully')

    process.exit(0)
  } catch (error) {
    console.error('Seed Error:', error.message)

    process.exit(1)
  }
}

seedData()
