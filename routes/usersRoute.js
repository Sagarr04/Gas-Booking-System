const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
// router.get("/home", (req, res) => {
//   res.render("/home");
// });

router.post("/register", async (req, res) => {
  var bcrypt = require("bcryptjs");
  // Store hash in your password DB.
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);

  const newuser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashed,
    address: req.body.address,
    pincode: req.body.pincode,
    phoneNo: req.body.phoneNo,
  });
  console.log(newuser);
  try {
    newuser.save();
    res.send("User registeres Successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error Occured" });
  }
});
router.post("/login", async (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("logged in failed");
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log("Password Incorrect");
      return res.status(400).json({ message: "Password Incorrect" });
    } else {
      res.send(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Login error occured" });
  }
});
router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
