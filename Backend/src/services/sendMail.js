const nodemailer = require('nodemailer')

const sendMail = async (to, message, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: to,
      subject: message,
      text: text
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = sendMail
