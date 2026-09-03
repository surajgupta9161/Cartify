const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

const sendMail = async (to, subject, text) => {
  try {
    console.log('Sending mail to:', to)

    const response = await resend.emails.send({
      from: 'Cartify <onboarding@resend.dev>',
      to,
      subject,
      text
    })

    console.log('RESEND FULL RESPONSE:', response)

    if (response.error) {
      console.log('RESEND ERROR:', response.error)
      throw new Error(response.error.message)
    }

    console.log('MAIL SENT ID:', response.data?.id)

    return response.data
  } catch (error) {
    console.log('MAIL ERROR MESSAGE:', error.message)
    console.log('MAIL ERROR:', error)
    throw error
  }
}

module.exports = { sendMail }
