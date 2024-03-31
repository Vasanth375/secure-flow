const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const test = (req, res) => {
  res.json({
    message: "API working",
  });
};
const updateUser = async (req, res) => {
  console.log(req.user.id);
  console.log(req.params.id);
  if (req.user.id !== req.params.id) {
    return res.status(401).json({
      message: "Login failed You've tryed to login using different ID",
      status: 401,
    });
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 12);
    }
    // console.log(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePic: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...restData } = updatedUser._doc;
    res
      .status(200)
      .json({ message: "Updated Successfully!", data: restData, status: 200 });
  } catch (error) {
    res.status(500).json({ message: "Error Occured!", status: 500 });
  }
};

module.exports = { test, updateUser };
