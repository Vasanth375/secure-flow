const express = require("express");
const { signup, signin, google } = require("../controllers/auth.control");

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/google", google);

module.exports = router;
