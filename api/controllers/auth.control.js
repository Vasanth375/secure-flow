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
    res
      .status(200)
      .json({
        message: "Successfully Account Created!",
        data: newUser,
        status: 200,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Already Account Created!", status: 500 });
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  try {
    const validUser = await User.findOne({ username: username });
    if (!validUser) {
      console.log("Nodejs: User not found!");
      return res.status(404).json({ message: "User not Found!", status: 404 });
    }

    const validPass = bcryptjs.compareSync(password, validUser.password);
    if (!validPass) {
      return res.status(401).json({ message: "Wrong Details!", status: 401 });
    }

    // seperating the password from the object
    const { password: hashedPasswornd, ...rest } = validUser._doc;

    // adding expiry time to the JWT token
    const expiryTime = new Date(Date.now() * 36);

    // creating the jwt token with unique id of mongodb _id created when user created account
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // jwt token stored in the browser cookie storage
    res
      .cookie("jwt_token", token, { httpOnly: true, expiryTime: expiryTime })
      .status(200)
      .json({ message: "Logged-In!", status: 200, data: rest });
  } catch (error) {
    console.log("Error");
    res.status(500).json({ message: "Internal Sever Error!", status: 500 });
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (user) {
      // creating the jwt token with unique id of mongodb _id created when user created account
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      console.log("Google username exist");

      // seperating the password from the object
      const { password: hashedPassword, ...rest } = user._doc;

      // adding expiry time to the JWT token
      const expiryTime = new Date(Date.now() * 3600000);
      // jwt token stored in the browser cookie storage
      res
        .cookie("jwt_token", token, { httpOnly: true, expiryTime: expiryTime })
        .status(200)
        .json({ message: "Successfully Logged In!", status: 200, data: rest });
    } else {
      console.log("Google username not exist");
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePic: req.body.photo,
      });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const expiryTime = new Date(Date.now() * 3600000);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      // jwt token stored in the browser cookie storage
      res
        .cookie("jwt_token", token, { httpOnly: true, expiryTime: expiryTime })
        .status(200)
        .json({
          message: "Successfully Logged In!",
          status: 200,
          data: rest,
        });
    }
  } catch (error) {
    // next(error);
    console.log("Error");
    res.status(500).json({ message: "Internal Sever Error!", status: 500 });
  }
};

module.exports = { signup, signin, google };
