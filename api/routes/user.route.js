const express = require("express");
const { test, updateUser, deleteUser, singoutUser } = require("../controllers/user.control");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser); // Change here
router.delete("/delete/:id", verifyToken, deleteUser); // Change here
module.exports = router;
