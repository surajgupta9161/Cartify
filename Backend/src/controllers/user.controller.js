const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendMail } = require('../services/sendMail')
const pendingUserModel = require('../models/pendingUser.model')

/**
 * -POST /api/aut/register
 * User Register Controller
 */

const register = async (req, res) => {
  let { name, email, password } = req.body

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required'
      })
    }

    name = name.trim()
    email = email.trim().toLowerCase()

    // Check actual registered user
    const isUserRegister = await userModel.findOne({ email })

    if (isUserRegister) {
      return res.status(409).json({
        message: 'User already registered'
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const OTP = Math.floor(100000 + Math.random() * 900000).toString()

    const pendingUser = await pendingUserModel.findOneAndUpdate(
      { email },
      {
        name,
        email,
        password: hashedPassword,
        otp: OTP,
        otpExpire: Date.now() + 10 * 60 * 1000,
        // Resend 1 minute baad allowed
        otpResendAfter: Date.now() + 60 * 1000
      },
      {
        upsert: true,
        returnDocument: 'after',
        runValidators: true
      }
    )

    const subject = 'Cartify Email Verification'

    const text = `Hello ${pendingUser.name},

                Thanks for registering on Cartify.

                Your OTP is: ${OTP}

                This OTP is valid for 10 minutes.

                If you did not request this, please ignore this email.`

    await sendMail(email, subject, text)

    return res.status(201).json({
      message: 'OTP sent successfully. Please verify your email.'
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Registration failed',
      error: error.message
    })
  }
}

/**
 * -POST /api/aut/login
 *  User Login Controller
 */
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  try {
    const findUser = await userModel.findOne({ email })

    if (!findUser) {
      return res.status(404).json({ message: 'User Not Found' })
    }

    const isPasswordMatch = await bcrypt.compare(password, findUser.password)

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid Password' })
    }

    const userToken = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: '3d'
    })

    // res.cookie('userToken', userToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    //   maxAge: 3 * 24 * 60 * 60 * 1000
    // })
    res.cookie('userToken', userToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 3 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({ message: 'User Login Successfull' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Login Failed', error: error.message })
  }
}

/**
 * -POST /api/aut/logout
 *  User Logout Controller
 */
const logout = async (req, res) => {
  try {
    // res.clearCookie('userToken', {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none'
    // })
    res.clearCookie('userToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    })
    return res.status(200).json({ message: 'User Logout Successfull' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Logout Failed', error: error.message })
  }
}

/**
 * -GET /api/auth/getUsers
 *  User getUsers Controller
 */

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select('-password')
    return res.status(200).json({ message: 'Get User Successfull', users })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Get User Failed', error: error.message })
  }
}

/**
 * -GET /api/auth/getUsers
 *  User getUsers Controller
 */

const getCurrentUser = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select('-password -otp -otpExpire')

    if (!user) {
      return res.status(404).json({
        message: 'User Not Found Please Login or Register First'
      })
    }

    return res.status(200).json({
      user
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Get Current User Failed',
      error: error.message
    })
  }
}

module.exports = { register, login, logout, getUsers, getCurrentUser }
