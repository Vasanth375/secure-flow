const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
const URI = process.env.MONGO;
console.log(URI);
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
