const nodemailer = require('nodemailer')

async function sendEmail (email) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: false,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    }
  })

  await transporter.sendMail({
    from: process.env.MAILER_USER,
    to: email,
    subject: 'Welcome to Toca !',
    html: '<p>Hello ' + email + ' !</p>' +
      '<p>Votre compte a bien été créé et est en attente de validation par l\'un de nos administrateur</p>'
  })
}

module.exports = sendEmail
