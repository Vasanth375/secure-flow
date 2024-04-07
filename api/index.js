const express = require("express");
const bodyParser = require("body-parser"); // To parse JSON data in the request body
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const app = express();
const testRoute = require("./routes/user.route.js");
const authRoutes = require("./routes/auth.route.js");
const path = require("path");
const __mydirname = path.resolve();

app.use(express.static(path.join(__mydirname, '/client/dist')))
app.get("*", (req,res) => {
  res.sendFile(path.join(__mydirname, "client", "dist", "index.html"))
})

dotenv.config();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieparser());
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
  res.json({ data: "Home Page" });
});

app.use("/api/user", testRoute);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Running at 5000");
});
