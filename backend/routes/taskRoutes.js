const express = require("express");
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create task
router.post("/", protect, async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    userId: req.userId
  });
  res.json(task);
});

// Get all tasks for user
router.get("/", protect, async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.userId } });
  res.json(tasks);
});

// Update task
router.put("/:id", protect, async (req, res) => {
  await Task.update(req.body, { where: { id: req.params.id, userId: req.userId } });
  res.json({ message: "Task updated" });
});

// Delete task
router.delete("/:id", protect, async (req, res) => {
  await Task.destroy({ where: { id: req.params.id, userId: req.userId } });
  res.json({ message: "Task deleted" });
});

module.exports = router;