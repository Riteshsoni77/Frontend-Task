const mongoose = require("mongoose");
const User = require("./models/User");
const Task = require("./models/Task");

async function seedDatabase() {
  try {
   
    await mongoose.connect("mongodb://127.0.0.1:27017/task");
    console.log("Connected to MongoDB");

    
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log("Cleared existing users and tasks");

    
    const dummyUsers = [
      { name: "John Doe", email: "john@example.com", password: "password123" },
      { name: "Jane Smith", email: "jane@example.com", password: "password123" },
    ];

    const users = await User.insertMany(dummyUsers);
    console.log("Dummy users added successfully");

 
    const dummyTasks = [
      {
        title: "Task 1",
        description: "This is the first task",
        completed: false,
        userId: users[0]._id, 
      },
      {
        title: "Task 2",
        description: "This is the second task",
        completed: true,
        userId: users[0]._id, 
      },
      {
        title: "Task 3",
        description: "This is the third task",
        completed: false,
        userId: users[1]._id, 
      },
    ];

    await Task.insertMany(dummyTasks);
    console.log("Dummy tasks added successfully");

    
    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (err) {
    console.error("Error seeding database:", err);
    mongoose.connection.close();
  }
}

seedDatabase();