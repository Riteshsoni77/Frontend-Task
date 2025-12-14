const express = require("express");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get profile
router.get("/", protect, async (req, res) => {
  const user = await User.findByPk(req.userId, {
    attributes: { exclude: ["password"] }
  });
  res.json(user);
});

// Update profile
router.put("/", protect, async (req, res) => {
  await User.update(req.body, { where: { id: req.userId } });
  res.json({ message: "Profile updated" });
});

module.exports = router;