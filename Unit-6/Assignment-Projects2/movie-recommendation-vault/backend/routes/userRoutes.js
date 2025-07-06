const express = require("express");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Get current user info
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-__v");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user by ID (for other users to see)
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-__v");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; 