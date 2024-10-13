const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const path = require("path");
const app = express();

// Import routes
const testRoute = require("./routes/user.route.js");
const authRoutes = require("./routes/auth.route.js");

dotenv.config();
const __mydirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()
app.use(cookieparser());

// MongoDB connection
const URI = process.env.MONGO;
mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Serve static files from React frontend
app.use(express.static(path.join(__mydirname, "/client/build")));

// API Routes
app.get("/", (req, res) => {
  res.json({ data: "Home Page" });
});

app.get("/test", (req, res) => {
  res.json({ message: "Test working" });
});

app.use("/api/user", testRoute);
app.use("/api/auth", authRoutes);

// For any other routes, serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__mydirname, "client", "build", "index.html"));
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
