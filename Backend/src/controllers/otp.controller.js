const pendingUserModel = require('../models/pendingUser.model')
const userModel = require('../models/user.model')
const { sendMail } = require('../services/sendMail')
const jwt = require('jsonwebtoken')

/**
 * -POST /api/auth/verifyotp
 * Email Verification Route
 */
const verifyotp = async (req, res) => {
  try {
    let { email, otp } = req.body

    if (!email || !otp) {
      return res.status(400).json({
        message: 'Email and OTP are required'
      })
    }

    email = email.trim().toLowerCase()
    otp = otp.toString()

    // Check if already registered
    const user = await userModel.findOne({ email })

    if (user) {
      return res.status(409).json({
        message: 'User already registered'
      })
    }

    // Find pending registration
    const pendingUser = await pendingUserModel.findOne({ email })

    if (!pendingUser) {
      return res.status(404).json({
        message: 'Please Register First'
      })
    }

    // Check OTP expiry
    if (pendingUser.otpExpire < Date.now()) {
      return res.status(400).json({
        message: 'OTP Expired'
      })
    }

    // Check OTP
    if (pendingUser.otp !== otp) {
      return res.status(400).json({
        message: 'Invalid OTP'
      })
    }

    // Create actual user
    const createdUser = await userModel.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
      isverified: true
    })

    // Create token using CREATED USER id
    const userToken = jwt.sign(
      {
        id: createdUser._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '3d'
      }
    )

    res.cookie('userToken', userToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 3 * 24 * 60 * 60 * 1000
    })

    // Pending registration no longer needed
    await pendingUserModel.deleteOne({
      _id: pendingUser._id
    })

    return res.status(201).json({
      message: 'Account created successfully'
    })
  } catch (error) {
    return res.status(500).json({
      message: 'OTP Verification Failed',
      error: error.message
    })
  }
}

/**
 * -POST /api/auth/resendotp
 */

const resendotp = async (req, res) => {
  let { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  email = email.trim().toLowerCase()
  try {
    const findRegisteredUser = await userModel.findOne({ email })

    if (findRegisteredUser) {
      return res.status(409).json({ message: 'User already registered' })
    }
    const findUser = await pendingUserModel.findOne({ email })

    if (!findUser) {
      return res.status(404).json({ message: 'Please Register First' })
    }

    if (findUser.otpResendAfter && findUser.otpResendAfter > Date.now()) {
      return res.status(400).json({
        message: 'Please wait 1 minute before requesting another OTP'
      })
    }

    const otp = Math.floor(100000 + Math.random() * 900000)
    findUser.otp = otp
    findUser.otpExpire = Date.now() + 10 * 60 * 1000

    // Next resend allowed after 1 minute
    findUser.otpResendAfter = Date.now() + 60 * 1000

    await findUser.save()

    const subject = 'Cartify OTP Verification'
    const text = `Your OTP is ${otp}
    
    This OTP is valid for 10 minutes.`

    await sendMail(email, subject, text)

    return res.status(200).json({ message: 'OTP Resend Successfull' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Resend OTP Failed', error: error.message })
  }
}

module.exports = { verifyotp, resendotp }
