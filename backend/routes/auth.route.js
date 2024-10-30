const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../Models/User.model");
const { authSchema } = require("../helpers/validation_schema");

//To get all the users details from database for Development purpose
router.get("/users", async (req, res) => {
  const user = await User.find(); // find() will fetch all the data from the database
  res.json(user);
});

module.exports = router;
