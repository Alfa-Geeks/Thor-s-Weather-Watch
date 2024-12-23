const express = require("express");
const router = express.Router();
const axios = require("axios");
const send_Mail = require("../helpers/sendMail");

router.post("/send-location", (req, res) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res
      .status(400)
      .send({ error: "Latitude and longitude are required." });
  }
  axios
    .get(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API}&q=${latitude},${longitude}&days=7`
    )
    .then(async (response) => {
      res.status(200).send(response.data);
      const city = response.data.location.name;
      const condition = response.data.current.condition.text;
      const msg = `You are in ${city} and current weather condition is ${condition}`;

      send_Mail("pk.limited.7778@gmail.com", msg)
        .then((result) => console.log("Email sent successfully:", result))
        .catch((error) => console.error("Error sending email:", error));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
