const nodemailer = require('nodemailer')

const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000
    })

    const info = await transporter.sendMail({
      from: `Cartify <${process.env.EMAIL}>`,
      to,
      subject,
      text
    })

    console.log('MAIL SENT:', info.messageId)
  } catch (error) {
    console.log('MAIL ERROR MESSAGE:', error.message)
    console.log('MAIL ERROR CODE:', error.code)
    throw error
  }
}

module.exports = { sendMail }
