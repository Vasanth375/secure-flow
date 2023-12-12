const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email);
  const newUser = new User({
    username: username,
    email: email,
    password: bcryptjs.hashSync(password, 10),
  });
  try {
    console.log("test");
    await newUser.save();
    res.status(200).json({ message: "User Inserted" });
  } catch (error) {
    res.status(500).json({ message: "Error Occured" });
  }
};

const signin = (req, res) => {
  console.log(req.body);
  res.json({
    messaage: "signin",
  });
};

module.exports = { signup, signin };
