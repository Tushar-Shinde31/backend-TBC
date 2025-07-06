const mongoose = require("mongoose");

// Define the User schema for MongoDB
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  email: { type: String, required: true, unique: true }, // User's email (must be unique)
  password: { type: String, required: true }, // Hashed password
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("User", userSchema);
