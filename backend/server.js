const dotenv = require("dotenv");
dotenv.config(); // <-- FIRST LINE

const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/db");
const User = require("./models/User");
const Task = require("./models/Task");

connectDB();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => res.send("API Running"));
app.use("/api/auth", require("./routes/authRoutes")); // <-- CODE CHANGE HERE
app.use("/api/profile", require("./routes/profileRoutes")); // <-- CODE CHANGE HERE
app.use("/api/tasks", require("./routes/taskRoutes")); // <-- CODE CHANGE HERE

// Sync models and start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));