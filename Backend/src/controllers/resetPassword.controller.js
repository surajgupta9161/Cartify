const userModel = require('../models/user.model')
const { sendMail } = require('../services/sendMail')
const bcrypt = require('bcrypt')

/**
 * -POST /api/auth/resetpasswordotp
 */
const resetPasswordOtp = async (req, res) => {
  try {
    let { email } = req.body
    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }
    email = email.trim().toLowerCase()
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (
      user.resetPasswordOtpResendAfter &&
      user.resetPasswordOtpResendAfter > Date.now()
    ) {
      return res.status(429).json({
        message: 'Please wait 1 minute before requesting another OTP'
      })
    }
    const OTP = Math.floor(100000 + Math.random() * 900000).toString()
    user.resetPasswordOtp = OTP
    user.resetPasswordOtpExpires = Date.now() + 10 * 60 * 1000
    user.resetPasswordOtpResendAfter = Date.now() + 1 * 60 * 1000
    user.resetPasswordOtpVerified = false
    await user.save()
    await sendMail(
      email,
      'Cartify - Reset Password OTP',
      `Hello,

        We received a request to reset your Cartify account password.

        Your OTP is: ${OTP}

        This OTP is valid for 10 minutes. Please do not share this OTP with anyone.

        If you did not request a password reset, you can safely ignore this email.

        Thanks,
        Cartify Team`
    )
    res.status(200).json({ message: 'OTP sent successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Reset Password Failed', error: error.message })
  }
}

/**
 * -POST /api/auth/verifyresetpasswordotp
 */
const verifyResetPasswordOtp = async (req, res) => {
  try {
    let { email, otp } = req.body
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' })
    }
    email = email.trim().toLowerCase()
    otp = otp.toString()
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (!user.resetPasswordOtp) {
      return res.status(400).json({ message: ' Please request an OTP' })
    }

    if (user.resetPasswordOtpExpires < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' })
    }

    if (user.resetPasswordOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' })
    }

    user.resetPasswordOtpVerified = true
    user.resetPasswordOtpVerifiedExpires = Date.now() + 10 * 60 * 1000
    user.resetPasswordOtp = null
    user.resetPasswordOtpExpires = null
    user.resetPasswordOtpResendAfter = null
    await user.save()
    res.status(200).json({ message: 'OTP verified successfully' })
  } catch (error) {
    res.status(500).json({
      message: 'Verify Reset Password OTP Failed',
      error: error.message
    })
  }
}

/**
 * -POST /api/auth/resetpassword
 */
const resetPassword = async (req, res) => {
  try {
    let { email, newpassword, confirmpassword } = req.body
    if (!email || !newpassword || !confirmpassword) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    email = email.trim().toLowerCase()
    newpassword = newpassword.trim()
    confirmpassword = confirmpassword.trim()
    if (newpassword !== confirmpassword) {
      return res
        .status(400)
        .json({ message: 'Password and Confirm Password do not match' })
    }
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.resetPasswordOtpVerifiedExpires < Date.now()) {
      return res
        .status(400)
        .json({ message: 'OTP has expired please request again' })
    }

    if (!user.resetPasswordOtpVerified) {
      return res.status(400).json({ message: 'Please verify your OTP first' })
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10)
    user.password = hashedPassword
    user.resetPasswordOtpVerified = false
    user.resetPasswordOtpVerifiedExpires = null
    await user.save()
    await sendMail(
      email,
      'Cartify - Password Reset Successful',
      `Hello,
      
            Your Cartify account password has been reset successfully.

            You can now log in to your account using your new password.

            If you did not make this change, please contact our support team immediately and secure your account.

            For your security, never share your password with anyone.

            Thanks,
            Cartify Team`
    )
    res.status(200).json({ message: 'Password reset successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Reset Password Failed', error: error.message })
  }
}

module.exports = { resetPasswordOtp, verifyResetPasswordOtp, resetPassword }
