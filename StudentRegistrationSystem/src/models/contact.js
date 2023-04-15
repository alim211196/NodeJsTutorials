const mongoose = require("mongoose");
const validator = require("validator");
const contactSchema = mongoose.Schema({
  fullName: {
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
  comment: {
    type: String,
    required: true,
  },
});

const Contact = new mongoose.model("Contact", contactSchema);

module.exports = Contact;
