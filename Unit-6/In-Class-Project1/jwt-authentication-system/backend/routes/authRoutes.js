// Import Express and create a router
const express = require("express");
const router = express.Router();

// Import controller functions for authentication
const { registerUser, loginUser } = require("../controllers/authController");

// Import middleware to protect routes
const protect = require("../middleware/authMiddleware");

// Public route for user registration
router.post("/register", registerUser);

// Public route for user login
router.post("/login", loginUser);

// Example of a protected route (requires valid JWT token)
router.get("/protected", protect, (req, res) => {
  res.json({ message: "You are authenticated!", userId: req.user });
});

// Export the router to be used in server.js
module.exports = router;
