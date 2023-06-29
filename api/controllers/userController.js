const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = mongoose.model("User");

exports.register = function (req, res) {
  const newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function (err, user) {
    if (err) {
      return res.status(400).send({
        message: "Error en el registro",
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};
