const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendMail } = require('../services/sendMail')

/**
 * -POST /api/aut/register
 * User Register Controller
 */
const register = async (req, res) => {
  let { name, email, password, role } = req.body
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    try {
      const isUserRegister = await userModel.findOne({ email })
      if (isUserRegister) {
        return res.status(409).json({ message: 'User already registered' })
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Checking Already Register user failed',
        error: error
      })
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' })
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const OTP = Math.floor(100000 + Math.random() * 900000).toString()
      const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
        role,
        otp: OTP,
        otpExpire: Date.now() + 10 * 60 * 1000 // 10 minutes
      })

      if (user) {
        const subject = 'Cartify Email Verification'

        const text = `Hello ${user.name} Thanks for registering on Cartify. Your OTP is: ${OTP}

                      This OTP is valid for 10 minutes.

                      If you did not request this, please ignore this email.  `
        await sendMail(user.email, subject, text)
      }

      const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '3d'
      })

      res.cookie('userToken', userToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 3 * 24 * 60 * 60 * 1000
      })
      return res.status(201).json({ message: 'User Register Successfull' })
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'User Not Save In DB', error: error.message })
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'User Register failed', error: error.message })
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

    res.cookie('userToken', userToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 3 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({ message: 'User Login Successfull' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Login Failed', error: error.message })
  }
}

module.exports = { register, login }
