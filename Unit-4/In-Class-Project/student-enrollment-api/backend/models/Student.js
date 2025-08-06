// Import mongoose for MongoDB object modeling
const mongoose = require("mongoose");

// Define the schema for a student document
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },      // Student's name (required)
  course: { type: String, required: true },    // Course enrolled (required)
  year: { type: Number, required: true },      // Year of study (required)
  rollNo: { type: String, unique: true, required: true }, // Unique roll number (required)
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Export the Student model based on the schema
module.exports = mongoose.model("Student", studentSchema);
