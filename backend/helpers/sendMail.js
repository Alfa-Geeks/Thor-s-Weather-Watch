const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

async function send_Mail(to, msg) {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLEINT_SECRET,
      process.env.REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "pawankumar7209442464@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLEINT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: "Amber <pawankumar7209442464@gmail.com>",
      to: to,
      subject: "Weather info",
      text: msg,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = send_Mail;

// send_Mail("pk.limited.7778@gmail.com", "test")
//   .then((result) => console.log("Email sent...", result))
//   .catch((error) => console.log(error.message));
