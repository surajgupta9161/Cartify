const userModel = require('../models/user.model')
const { sendMail } = require('../services/sendMail')

/**
 * -POST /api/auth/verifyotp
 * Email Verification Route
 */
const verifyotp = async (req, res) => {
  const { email, otp } = req.body

  if (!email || !otp) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  try {
    const findUser = await userModel.findOne({ email })

    if (!findUser) {
      return res.status(404).json({ message: 'User Not Found' })
    }

    if (findUser.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' })
    }

    if (findUser.otpExpire < Date.now()) {
      return res.status(400).json({ message: 'OTP Expired' })
    }

    findUser.isverified = true
    findUser.otp = undefined
    findUser.otpExpire = undefined
    await findUser.save()

    return res.status(200).json({ message: 'OTP Verification Successfull' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'OTP Verification Failed', error: error.message })
  }
}

/**
 * -POST /api/auth/resendotp
 */

const resendotp = async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  try {
    const findUser = await userModel.findOne({ email })

    if (!findUser) {
      return res.status(404).json({ message: 'User Not Found' })
    }

    if (findUser.isverified) {
      return res.status(400).json({ message: 'User Already Verified' })
    }

    const otp = Math.floor(100000 + Math.random() * 900000)
    findUser.otp = otp
    findUser.otpExpire = Date.now() + 10 * 60 * 1000

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
