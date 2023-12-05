const express = require("express");
const auth = require("../controllers/auth.control");

const router = express.Router();

router.get("/signup", auth);
router.post("/signup", auth);


module.exports = router;
