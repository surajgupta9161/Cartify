const useModule = require('../models/user.model')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  console.log('Cookies:', req.cookies)
  const userToken = req.cookies?.userToken
  if (!userToken) {
    return res
      .status(401)
      .json({ message: 'Unauthorized Please Register or Login First ' })
  }
  try {
    const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET)
    console.log('Decoded:', decodedToken)
    const findUser = await useModule.findById(decodedToken.id)
    if (!findUser) {
      return res.status(401).json({ message: 'Unauthorized Cookie is invalid' })
    }
    req.user = findUser
    next()
  } catch (error) {
    return res.status(401).json({ message: ' finding user failed by Cookie' })
  }
}

module.exports = authMiddleware
