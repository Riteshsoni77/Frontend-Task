const express = require("express");
const { Task, User } = require("../models");
const protect = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Create task with validation
router.post(
  "/",
  protect,
  [body("title").notEmpty().withMessage("Title is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    try {
      const { title } = req.body;
      const task = await Task.create({
        title,
        userId: req.user.id,
      });

      // Fetch user name to include in response
      const user = await User.findByPk(req.user.id, { attributes: ["name"] });
      res.json({ ...task.toJSON(), User: { name: user.name } });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// Get all tasks for user
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      include: [{ model: User, attributes: ["name"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update task
router.put("/:id", protect, async (req, res) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete task
router.delete("/:id", protect, async (req, res) => {
  try {
    const deleted = await Task.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;