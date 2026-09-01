// const nodemailer = require('nodemailer')

// const sendMail = async (to, subject, text) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//       }
//     })

//     await transporter.sendMail({
//       from: `${process.env.EMAIL} from Cartify `,
//       to: to,
//       subject: subject,
//       text: text
//     })
//   } catch (error) {
//     throw new Error(error.message)
//   }
// }

// module.exports = { sendMail }

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

    console.log('EMAIL exists:', !!process.env.EMAIL)
    console.log('PASSWORD exists:', !!process.env.PASSWORD)

    await transporter.verify()
    console.log('SMTP connection verified')

    const info = await transporter.sendMail({
      from: `Cartify <${process.env.EMAIL}>`,
      to,
      subject,
      text
    })

    console.log('MAIL SENT:', info.messageId)
    return info
  } catch (error) {
    console.log('MAIL ERROR MESSAGE:', error.message)
    console.log('MAIL ERROR CODE:', error.code)
    console.log('MAIL ERROR RESPONSE:', error.response)

    throw error
  }
}

module.exports = { sendMail }
