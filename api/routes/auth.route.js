const express = require("express");
const { signup, signin, google, signoutUser } = require("../controllers/auth.control");

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/google", google);
router.get("/signout", signoutUser); 


module.exports = router;
