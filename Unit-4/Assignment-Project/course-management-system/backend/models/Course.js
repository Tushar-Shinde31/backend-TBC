// Import mongoose for MongoDB object modeling
const mongoose = require("mongoose");

// Define the schema for a Course document
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Course title (required)
  category: { type: String, required: true, lowercase: true }, // Category (required, stored in lowercase)
  instructor: { type: String, required: true }, // Instructor name (required)
  description: { type: String }, // Optional course description
  createdAt: { type: Date, default: Date.now } // Creation timestamp
});

// Export the Course model based on the schema
module.exports = mongoose.model("Course", courseSchema);
