const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email);
  const newUser = new User({
    username: username,
    email: email,
    password: bcryptjs.hashSync(password, 10),
  });
  try {
    console.log("User Inserted!");
    await newUser.save();
    res.status(200).json({ message: "User Inserted" });
  } catch (error) {
    res.status(500).json({ message: "Error Occured" });
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  try {
    const validUser = await User.findOne({ username: username });
    if (!validUser) {
      console.log("User not found!");
      return res.status(404).json({ messaage: "User not Found!" });
    }

    const validPass = bcryptjs.compareSync(password, validUser.password);
    if (!validPass) {
      return res.status(401).json({ messaage: "Wrong Details!" });
    }

    // seperating the password from the object
    const { password: hashedPassword, ...rest } = validUser._doc;

    // adding expiry time to the JWT token
    const expiryTime = new Date(Date.now() * 3600000);

    // creating the jwt token with unique id of mongodb _id created when user created account
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // jwt token stored in the browser cookie storage
    res
      .cookie("jwt_token", token, { httpOnly: true, expiryTime: expiryTime })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log("Error");
    res.status(500).json({ message: "Internal Sever Error!" });
  }
};

module.exports = { signup, signin };
