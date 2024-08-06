import mailgun from 'mailgun-js'

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body

    const data = {
      from: email,
      to: process.env.EMAIL_TO,
      subject: `Новая заявка от ${name}`,
      text: message,
    }

    try {
      await mg.messages().send(data)
      res.status(200).json({ message: 'Message sent successfully' })
    } catch (error) {
      res.status(500).json({ message: 'Failed to send message', error })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
