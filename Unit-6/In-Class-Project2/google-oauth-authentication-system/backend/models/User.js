const mongoose = require("mongoose");

// Define the User schema for MongoDB
const userSchema = new mongoose.Schema({
  name: String, // User's name
  email: { type: String, required: true, unique: true }, // User's email (unique)
  picture: String, // Google profile picture URL
  authType: { type: String, default: "google" } // Authentication type (default: google)
});

// Export the User model
module.exports = mongoose.model("User", userSchema);
