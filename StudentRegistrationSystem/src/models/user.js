const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = mongoose.Schema({
  fullname: {
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
  phone: {
    type: Number,
    min: 10,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  course_year: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
    min: 6,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "minimum 8 letters"],
  },
  role: {
    type: String,
    required: true,
  },
  profileImage: { type: String, default: null },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
