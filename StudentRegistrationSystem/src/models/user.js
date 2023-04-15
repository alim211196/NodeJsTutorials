const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email address already present"],
    validate(v) {
      if (!validator.isEmail(v)) {
        throw new Error("invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "minimum 8 letters"],
  },
  profileImage: { type: String,default:null},
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
