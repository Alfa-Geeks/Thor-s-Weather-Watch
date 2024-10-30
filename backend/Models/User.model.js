const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt"); //used as middleware to store password in hashfile
const { required } = require("@hapi/joi");

//Schema for user
const UserSchema = new Schema({
  username: {
    type: String,
    required: false,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: { type: String, default: "" },
  profileImage: { type: String }, // URL to profile image
});

const User = mongoose.model("user", UserSchema); //mongoose will convert it to pural

module.exports = User;
