const userModel = require('../models/user.model')

const adminMiddleware = async (req, res, next) => {
  const user = await userModel.findById(req.user.id)
  if (!user.isverified) {
    return res
      .status(401)
      .json({ message: 'User Not Verified, Please verify your email' })
  }
  if (user.role !== 'admin') {
    return res.status(401).json({ message: 'You are not an admin' })
  }

  next()
}

module.exports = adminMiddleware
