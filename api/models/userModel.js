const mongoose = require("mongoose");
const bcrypt = require(bcrypt);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowerCase: true,
    required: true,
  },
  hash_password: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.comparePassword = function (pass) {
  return bcrypt.compareSync(pass, this.hash_password);
};

mongoose.model("User", UserSchema);
