const dotenv = require("dotenv");
dotenv.config(); // <-- FIRST LINE

const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/db");
const User = require("./models/User");
const Task = require("./models/Task");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));
app.use("/api/auth", require("./routes/authRoutes")); // <-- CODE CHANGE HERE
app.use("/api/profile", require("./routes/profileRoutes")); // <-- CODE CHANGE HERE
app.use("/api/tasks", require("./routes/taskRoutes")); // <-- CODE CHANGE HERE

// Sync models and start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});