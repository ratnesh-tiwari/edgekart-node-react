const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,

    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // define email option to send mail
  const mailOptions = {
    from: 'Ratnesh Tiwari <edgekart@edgekart.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // send mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
