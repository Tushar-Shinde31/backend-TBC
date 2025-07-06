// Import mongoose for MongoDB object modeling
const mongoose = require("mongoose");

// Define the User schema with fields: name, email, password
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Remove whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique email addresses
    lowercase: true // Store emails in lowercase
  },
  password: {
    type: String,
    required: true
  }
});

// Export the User model for use in other files
module.exports = mongoose.model("User", userSchema);
