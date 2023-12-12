const express = require("express");
const bodyParser = require("body-parser"); // To parse JSON data in the request body
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const URI = process.env.MONGO;
// console.log(URI);
mongoose
  .connect(URI)
  .then(() => {
    console.log("MOngo Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  res.json({ data: "data" });
});

const testRoute = require("./routes/test.route");
const authRoutes = require("./routes/auth.route");
app.use("/api/user", testRoute);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Running at 5000");
});
