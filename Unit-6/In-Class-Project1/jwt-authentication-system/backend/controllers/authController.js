// Import User model, bcrypt for password hashing, and JWT for tokens
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controller for registering a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    // Hash the user's password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Respond with success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

// Controller for logging in a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token for authenticated user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    // Respond with token and user info (excluding password)
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};
