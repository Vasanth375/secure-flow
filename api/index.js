const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ name: "Vasanth" });
});

app.listen(5000, () => {
  console.log("Running at 5000");
});
