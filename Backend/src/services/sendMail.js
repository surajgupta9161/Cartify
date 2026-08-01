const nodemailer = require('nodemailer')

const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })

    await transporter.sendMail({
      from: `${process.env.EMAIL} from Cartify `,
      to: to,
      subject: subject,
      text: text
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { sendMail }
