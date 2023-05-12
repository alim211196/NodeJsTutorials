const express = require("express");
const router = new express.Router();
const Students = require("../models/students");
const User = require("../models/user");
const Contact = require("../models/contact");
const { courses } = require("../../student-courses");
const Attendance = require("../models/attendance");

//////////////////////////////student's api/////////////////////////////////

//create student api
router.post("/students/add", async (req, res) => {
  const student = new Students(req.body);
  try {
    const result = await student.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//get students
router.get("/students/get-students", async (req, res) => {
  try {
    const result = await Students.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//get student by id
router.get("/students/get-student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Students.findById(_id);
    if (!result) {
      return res.status(404).send("User not found.");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//update student
router.patch("/students/update-student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Students.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).send("User not found.");
    } else {
      res.status(200).send("Record updated successfully.");
    }
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//delete student
router.delete("/students/delete-student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Students.findByIdAndDelete(_id);
    if (!result) {
      return res.status(404).send("User not found.");
    } else {
      res.status(200).send("Deleted Successfully.");
    }
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//get student's courses
router.get("/students/courses", async (req, res) => {
  try {
    await res.status(200).json(courses);
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//post comment api
router.post("/students/contact/add", async (req, res) => {
  const contact = new Contact(req.body);
  try {
    await contact.save();
    res.status(201).send("Thank you for your valuable feedback.");
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//get comments
router.get("/students/contact/get-comments", async (req, res) => {
  try {
    const result = await Contact.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//delete comment
router.delete("/students/contact/delete-comment/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Contact.findByIdAndDelete(_id);
    if (!result) {
      return res.status(404).send("User not found.");
    } else {
      res.status(200).send("Deleted Successfully.");
    }
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//////////////////////////////user's api/////////////////////////////////

//create register api
router.post("/user/register", async (req, res) => {
  const user = new User(req.body);
  try {
    const result = await user.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//get user by id
router.get("/user/get-user/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await User.findById(_id);
    if (!result) {
      return res.status(404).send("User not found.");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//update user
router.patch("/user/update-user/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).send("User not found.");
    } else {
      res.status(200).send("Profile updated successfully.");
    }
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//update user password
router.patch("/user/update-password/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    // Retrieve user from database
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Check if current password matches
    if (currentPassword !== user.password) {
      return res.status(401).send("Current password is incorrect.");
    }

    // Update password in database
    user.password = newPassword;
    await user.save();

    res.status(200).send("Password changed successfully.");
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//create login api
router.post("/user/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userEmail = await User.findOne({ email: email });
    const userId = userEmail._id;
    const Id = userId.toString();
    if (userEmail.password === password) {
      res.status(201).send(Id);
    } else {
      res.status(404).send("User not found.");
    }
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//create forgot password api
router.post("/user/forgot-password", async (req, res) => {
  try {
    const email = req.body.email;
    const userEmail = await User.findOne({ email: email });
    const userId = userEmail._id;
    const Id = userId.toString();
    if (userEmail.email === email) {
      res.status(201).send(Id);
    } else {
      res.status(404).send("User not found.");
    }
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//create reset password api
router.patch("/user/reset-password/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!result) {
      res.status(404).send("User not found.");
    } else {
      res.status(200).send("Password Updated Successfully.");
    }
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

const getTotalYears = (courses) => {
  let totalYears = 0;

  courses.forEach((course) => {
    totalYears += course.years.length;
  });

  return totalYears;
};

const totalYears = getTotalYears(courses);
const totalCourses = courses.length;

//get length of students,teachers,courses
router.get("/resource-quantity", async (req, res) => {
  try {
    const noOfStudents = await Students.countDocuments();
    const noOfTeacher = await User.countDocuments();
    const noOfCourses = totalCourses;
    const noOfBatches = totalYears;
    res.status(200).send({
      noOfStudents,
      noOfTeacher,
      noOfCourses,
      noOfBatches,
    });
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

router.get("/get-recent-entry", async (req, res) => {
  try {
    const recentTeachers = await User.find().sort({ _id: -1 }).limit(5);
    const recentStudents = await Students.find().sort({ _id: -1 }).limit(5);
    const recentMessages = await Contact.find().sort({ _id: -1 }).limit(5);
    res.status(200).send({
      recentTeachers,
      recentStudents,
      recentMessages,
    });
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

router.get("/get-birthday", async (req, res) => {
  try {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const studentsBirthday = await Students.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$dob" }, month] },
          { $eq: [{ $dayOfMonth: "$dob" }, day] },
        ],
      },
    });

    const teachersBirthday = await User.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$dob" }, month] },
          { $eq: [{ $dayOfMonth: "$dob" }, day] },
        ],
      },
    });

    res.status(200).send({
      studentsBirthday,
      teachersBirthday,
    });
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});
//////////////////////attendance/////////////////////
//create attendance api
router.post("/students/add-attendance", async (req, res) => {
  const attendance = new Attendance(req.body);
  try {
    const result = await attendance.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});
//get attendance api
router.get("/students/get-attendance", async (req, res) => {
  try {
    const result = await Attendance.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

//update attendance
router.patch("/students/update-attendance/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const { attendanceId, attendanceValue } = req.body;

    // Find the attendance object in the array that matches the attendanceId
    const attendanceDoc = await Attendance.findById(_id);
    if (!attendanceDoc) {
      return res.status(404).send("User not found.");
    }

    const attendanceIndex = attendanceDoc.attendance.findIndex(
      (attendance) => attendance._id === attendanceId
    );
    if (attendanceIndex === -1) {
      return res.status(404).send("Attendance not found.");
    }

    // Update the attendance value in the document
    attendanceDoc.attendance[attendanceIndex].attendance = attendanceValue;

    // Save the updated document using findByIdAndUpdate()
    const updatedDoc = await Attendance.findByIdAndUpdate(
      _id,
      { attendance: attendanceDoc.attendance },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).send("User not found.");
    } else {
      res.status(200).send("Attendance updated successfully.");
    }
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});




//delete attendance
router.delete("/students/delete-attendance/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Attendance.findByIdAndDelete(_id);
    if (!result) {
      return res.status(404).send("User not found.");
    } else {
      res.status(200).send("Deleted Successfully.");
    }
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
