const mongoose = require("mongoose");
const attendanceSchema = mongoose.Schema(
  {
    attendance: {
      type: Array,
      required: true,
    },
    takenBy: {
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
    date: {
      type: String,
      required: true,
    },
  },
  { strict: false }
);

const Attendance = new mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
