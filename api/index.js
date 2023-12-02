const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const URI = process.env.MONGO;

mongoose
  .connect(URI)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  res.json({ name: "Vasanth" });
});

app.listen(5000, () => {
  console.log("Running at 5000");
});
