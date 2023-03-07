const User = require("../models/users");
const express = require("express");

const router =new express.Router()

//create new user using promises
// router.post("/users", (req, res) => {
//   const user = new User(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

//create new user using async await
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const result = await user.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get users data
router.get("/users", async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get individual data
router.get("/users/:id", async (req, res) => {
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


//update user by id
router.patch("/users/:id",async(req,res)=>{
    try {
         const _id = req.params.id;
         const result = await User.findByIdAndUpdate(_id,req.body,{
            new:true
         });
           res.status(200).send(result);
    } catch (err) {
         res.status(500).send(err);
    }
})

//delete user by id
router.delete("/users/:id",async(req,res)=>{
  try {
    const _id = req.params.id;
    const result =await User.findByIdAndDelete(_id)
    if (!_id) {
      res.status(400).send();
    }
     res.status(200).send(result);
  } catch (err) {
      res.status(500).send(err);
  }
})


module.exports = router;