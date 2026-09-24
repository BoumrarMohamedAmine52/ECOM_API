const nodemailer = require("nodemailer");

const sendEmail = async (emailOptions) => {
  const transpoter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transpoter.sendMail({
    from: process.env.API_EMAIL,
    to: emailOptions.email,
    subject: emailOptions.subject,
    text: emailOptions.text,
  });
};

module.exports = sendEmail;
