const nodemailer = require("nodemailer");
require('dotenv').config()
module.exports =nodemailer.createTransport({
  service:'gmail',
  port: 465,
  auth: {
    user: process.env.GMAILUSER, // generated ethereal user
    pass: process.env.GMAILPASSWORD, // generated ethereal password
  },
  host: "smtp.gmail.com",
  });
