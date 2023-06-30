const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
const Users = require("../models/userModel");
const User = mongoose.model("User");

exports.register = async (req, res) => {
  const newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist !== null) {
      return res.status(401).json({
        message: "The user is already registered",
      });
    }
    await newUser.save();
    return res.json({
      response: "The user has register",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.sign_in = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      return res.status(401).json({
        message: "Invalid user or password.",
      });
    }
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({
        message: "Invalid user or password.",
      });
    }
    return res.json({
      token: jwt.sign(
        { email: user.email, fullName: user.fullName, _id: user._id },
        `${process.env.HASH_PASSWORD}`
      ),
    });
  } catch (err) {
    console.log(err);
  }
};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};
exports.profile = function (req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};
