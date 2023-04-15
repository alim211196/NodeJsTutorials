const express = require("express");
const router = new express.Router();
const Students = require("../models/students");
const User = require("../models/user");
const Contact = require("../models/contact");

//////////////////////////////student's api/////////////////////////////////

//create student api
router.post("/students/add", async (req, res) => {
  const student = new Students(req.body);
  try {
    const result = await student.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get students
router.get("/students/get-students", async (req, res) => {
  try {
    const result = await Students.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get student by id
router.get("/students/get-student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Students.findById(_id);
    if (!result) {
      return res.status(404).send();
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


//update student 
router.patch("/students/update-student/:id",async(req,res)=>{
  try {
    const _id = req.params.id;
    const result = await Students.findByIdAndUpdate(_id,req.body,{new:true});
    if (!result) {
      return res.status(404).send();
    } else {
      res.status(200).send("Record updated successfully.");
    }
  } catch (err) {
     res.status(500).send(err);
  }
})

//delete student
router.delete("/students/delete-student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Students.findByIdAndDelete(_id);
    if (!result) {
      return res.status(404).send();
    } else {
      res.status(200).send("Deleted Successfully.");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//post comment api
router.post("/students/contact/add", async (req, res) => {
  const contact = new Contact(req.body);
  try {
    await contact.save();
    res.status(201).send("Thank you for your valuable feedback.");
  } catch (err) {
    res.status(500).send(err);
  }
});

//get comments
router.get("/students/contact/get-comments", async (req, res) => {
  try {
    const result = await Contact.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete comment
router.delete("/students/contact/delete-comment/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Contact.findByIdAndDelete(_id);
    if (!result) {
      return res.status(404).send();
    } else {
      res.status(200).send("Deleted Successfully.");
    }
  } catch (err) {
    res.status(500).send("Not Deleted");
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
    res.status(500).send(err);
  }
});


//get user by id
router.get("/user/get-user/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await User.findById(_id);
    if (!result) {
      return res.status(404).send();
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send(err);
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
      return res.status(404).send("Not updated.");
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
      res.status(404).send("Invalid password");
    }
  } catch (err) {
    res.status(500).send("Invalid login details");
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
      res.status(404).send("Invalid email address");
    }
  } catch (err) {
    res.status(500).send("Invalid email address");
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
      return res.status(404).send();
    } else {
      res.status(200).send("Password Updated Successfully.");
    }
  } catch (err) {
    res.status(500).send("Not Updated");
  }
});


module.exports = router;