const express = require("express");
const router = new express.Router();
const Students = require("../models/students");

//create api

router.post("/students", async (req, res) => {
  const student = new Students(req.body);
  try {
    const result = await student.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get students

router.get("/students", async (req, res) => {
  try {
    const result = await Students.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get student by id

router.get("/students/:id",async(req,res)=>{
  try {
    const _id = req.params.id
     const result = await Students.findById(_id);
     if(!result){
    return res.status(404).send();
     }
     else{
    res.status(200).send(result);
     }
  } catch (err) {
       res.status(500).send(err);
  }
})


//update student 
router.patch("/students/:id",async(req,res)=>{
  try {
    const _id = req.params.id;
    const result = await Students.findByIdAndUpdate(_id,req.body,{new:true});
    if (!result) {
      return res.status(404).send();
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
     res.status(500).send(err);
  }
})

//delete student
router.delete("/students/:id",async(req,res)=>{
  try {
    const _id = req.params.id
   const result = await Students.findByIdAndDelete(_id);
   if(!result){
   return res.status(404).send()
   }
   else{
    res.status(200).send(result);
   }    
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router;