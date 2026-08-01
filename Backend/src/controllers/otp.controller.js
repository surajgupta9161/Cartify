const userModel = require('../models/user.model')

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
module.exports = { verifyotp }
