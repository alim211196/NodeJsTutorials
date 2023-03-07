const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/userDetails";
var validator = require("validator");
//connection creation and creating new database
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// A mongoose schema defines the structure of the document, default values,validators,etc...

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: false,
    trim: true,
    // minlength: [10, "minimum 10 letters"],
    // maxlength: [30, "max length 30 letters"],
  },
  position: {
    type: String,
    required: true,
    enum: ["UI Developer", "Tester", "Team Lead"],
  },
  email: { type: String,
     required: true,
      unique: true,
      validate(v){
    if(!validator.isEmail(v)){
            throw new Error("Invalid email");
    }
  }  },
  present: Boolean,
  phone: {
    type: Number,
    required: true,
    // min: [8, "minimum 8 letters"],
    // max: [10, "max length 10 letters"],
    // validate(val){
    //     if(val <0){
    //           throw new Error("Number should not be negative")
    //     }
    // }
    validate: {
      validator: function (v) {
        return /\d{3}\d{3}\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// a mongoose model is a wrapper on the mongoose schema.
// A mongoose schema defines the structure of the document, default values,validators,etc...
//whereas a mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.

//collections creation
const User = new mongoose.model("User", userSchema);

/////////////////////////insert document/////////////////////////////

const createDocument = async () => {
  try {
    const user1 = new User({
      name: "Viral Person1",
      position: "UI Developer",
      email: "viral@g.com",
      present: false,
      phone: 9876548888,
      date: Date.now(),
    });
    // const user2 = new User({
    //   name: "Arshad Sayyed",
    //   position: "Team Lead",
    //   present: true,
    //   phone: 9876543212,
    //   date: Date.now(),
    // });
    // const user3 = new User({
    //   name: "Mohammad Yunus",
    //   position: "UI Developer",
    //   present: false,
    //   phone: 987654323,
    //   date: Date.now(),
    // });
    const result = await User.insertMany([user1]);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

createDocument();

//////////////////////////////get document//////////////////////////////

const getDocument = async () => {
  try {
    const result = await User.find({ present: true })
      .select({ name: 1 })
      .limit(1);
    console.log(result);

    //mongodb comparison operator
    //   const result = await User.find({ salary: { $gte: 40000 } }).select({
    //     name: 1,
    //   });

    //   const result = await User.find({ salary: { $nin: [40000] } }).select({
    //     name: 1,
    //   });
    // .limit(1);

    //mongodb logical operator
    //  const result = await User.find({
    //    $and: [{ position: "UI Developer" }, {salary:{$gte:40000}}]
    //  }).select({
    //    name: 1,
    //  });

    // const result = await User.find({ salary: { $not: { $gt: 40000 } } }).select({
    //   name: 1,
    // });
    // const result = await User.find({
    //   $nor: [{ salary: 40000 }, { present: false }],
    // });

    //Finding number of count
    // const result = await User.find({present:true}).select({
    //   name: 1,
    // }).countDocuments();

    //sorting
    //    const result = await User.find({ present: true })
    //      .select({
    //        name: 1,
    //      })
    //      .sort({name:1});
  } catch (error) {
    console.log(error);
  }
};
// getDocument();

/////////////////////Update document/////////////////////////////////

const updateDocument = async (_id) => {
  try {
    //update single document
    // const result =await User.updateOne({_id},{$set:{position:"Tester"}})
    const result = await User.updateMany(
      { position: { $eq: "uI Developer" } },
      {
        $set: { position: "UI Developer" },
      }
    );

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// updateDocument("63ff3ff5317d0b1aa9ec834d");

/////////////////delete document/////////////////////////

const deleteDocument = async (_id) => {
  try {
    // const result = await User.deleteOne({ _id });
    const result = await User.deleteMany({ present: false });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// deleteDocument("63ff3ff5317d0b1aa9ec834f");
