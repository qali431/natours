/* eslint-disable */
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // const transporter = async nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  //   //activate in gmail 'less secure app' option
  // });
  //define the email options
  const mailOptions = {
    from: {
      name: 'Web Designer',
      address: 'qali78602gmail.com',
    },
    to: 'qali@telus.net',
    subject: options.subject,
    text: options.message,
    // html:
  };

  console.log('OK');
  console.log(mailOptions);
  //send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
