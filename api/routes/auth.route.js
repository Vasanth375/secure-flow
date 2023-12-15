const express = require("express");
const { signup, signin } = require("../controllers/auth.control");

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;
