const Pin = require('../models/pin.model')

/**
 * Verify 6-digit PIN
 * @route POST /api/pin/verify
 */
const verifyPin = async (req, res) => {
  try {
    const { pin } = req.body

    // Validate 6-digit PIN
    if (typeof pin !== 'string' || !/^\d{6}$/.test(pin)) {
      return res.status(400).json({
        success: false,
        message: 'Enter valid 6-digit PIN'
      })
    }

    // Get PIN from MongoDB
    const savedPin = await Pin.findOne()

    if (!savedPin) {
      return res.status(404).json({
        success: false,
        message: 'PIN not found'
      })
    }

    // Compare plain-text PIN
    if (pin !== savedPin.pin) {
      return res.status(401).json({
        success: false,
        message: 'Wrong PIN ❤️'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'PIN verified successfully ❤️'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

module.exports = { verifyPin }
