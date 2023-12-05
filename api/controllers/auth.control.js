const User = require("../models/user.model");

const authRoutes = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username: username,
    email: email,
    password: password,
  });
  try {
    await newUser.save();
    res.status(200).json({ message: "User Inserted" });
  } catch (error) {
    res.status(500).json({ message: "Error Occured" });
  }
};

module.exports = authRoutes;
