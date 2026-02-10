const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the CORS middleware
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");


const app = express();
const port = 8080;


app.use(express.json());


app.use(cors());


main()

  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/task");
}


app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/tasks", taskRoutes);




app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});



