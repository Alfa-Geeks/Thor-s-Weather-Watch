const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../Models/User.model");
const { authSchema } = require("../helpers/validation_schema");
const { signAccessToken, verifyAccessToken } = require("../helpers/jwthelper");

//To get all the users details from database for Development purpose
router.get("/users", async (req, res) => {
  const user = await User.find(); // find() will fetch all the data from the database
  res.json(user);
});

//Route to register new user
router.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await authSchema.validateAsync(req.body);

    //findOne is to fetch the single data from the database
    const doesExist = await User.findOne({ email: result.email });
    if (doesExist)
      throw createError.Conflict(`${result.email} is already being registered`);

    const user = new User(result);
    user.save();
    res.send(user);
  } catch (error) {
    if (error.isjoi === true) error.status = 422;
    next(error);
  }
});

//Route to verify that the the user is valid or not
router.post("/login", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });
    const userId = user.id;
    if (!user) throw createError.NotFound("User not register");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) throw createError.Unauthorized("username/password not valid");

    const accessToken = await signAccessToken(user.id);
    res.send({ accessToken, userId });
  } catch (error) {
    res.send("Invalid username/password");
    if (error.isjoi === true)
      return next(createError.BadRequest("Invalid username/password"));
    next(error);
  }
});

//update userProfile
router.put("/updateuser/:id", verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser)
      return res.status(404).send({ message: "User not found" });
    res.status(200).send(updatedUser); // Send updated user data as response
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating user", error: error.message });
  }
});

//get the data of user if user is loged in
router.get("/user/:id", verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userdata = await User.findById(id).select("-password");
    if (!userdata) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(userdata);
  } catch (error) {
    res.status(500).json({ message: "Error in finding user data", error });
  }
});

module.exports = router;
