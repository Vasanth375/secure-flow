const express = require("express");
const test = require("../controllers/test.control");

const router = express.Router();

router.get("/", test);

module.exports = router;
