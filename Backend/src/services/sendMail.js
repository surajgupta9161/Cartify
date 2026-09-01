// const nodemailer = require('nodemailer')

// const sendMail = async (to, subject, text) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//       },
//       connectionTimeout: 10000,
//       greetingTimeout: 10000,
//       socketTimeout: 10000
//     })

//     const info = await transporter.sendMail({
//       from: `Cartify <${process.env.EMAIL}>`,
//       to,
//       subject,
//       text
//     })

//     console.log('MAIL SENT:', info.messageId)
//   } catch (error) {
//     console.log('MAIL ERROR MESSAGE:', error.message)
//     console.log('MAIL ERROR CODE:', error.code)
//     throw error
//   }
// }

// module.exports = { sendMail }

const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

const sendMail = async (to, subject, text) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Cartify <suraj666189@gmail.com>',
      to,
      subject,
      text
    })

    if (error) {
      console.log('RESEND ERROR:', error)
      throw new Error(error.message)
    }

    console.log('MAIL SENT:', data)

    return data
  } catch (error) {
    console.log('MAIL ERROR:', error)
    throw error
  }
}

module.exports = { sendMail }
