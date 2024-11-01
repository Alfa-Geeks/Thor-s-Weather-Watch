const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// These id's and secrets should come from .env file.
const CLIENT_ID =
  "536458258627-abtd3jpo8o92ftldomt2m7bkjgui3br9.apps.googleusercontent.com";
const CLEINT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04H13bunH-3ZKCgYIARAAGAQSNwF-L9IrwKlZCHQ-60g1lMJBXBfQYT6RLIwTt-hB-V5U8vF0SmnjpAyrdcfGZxMrHICVen5RTd8";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function send_Mail(to) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "pawankumar7209442464@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "pawan <pawankumar7209442464@gmail.com>",
      to: to,
      subject: "Hello from gmail using API",
      text: "Hello from gmail email using API",
      html: "<h1>Hello from gmail email using API</h1>",
    };

    const result = await transport.send_Mail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = send_Mail;

// sendMail()
//   .then((result) => console.log("Email sent...", result))
//   .catch((error) => console.log(error.message));
