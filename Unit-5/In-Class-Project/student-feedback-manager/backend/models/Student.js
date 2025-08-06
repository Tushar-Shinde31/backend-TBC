// Defines the Student model and feedback subdocument schema

const mongoose = require("mongoose");

// Schema for feedback given to a student
const feedbackSchema = new mongoose.Schema({
  teacher: String, // Name of the teacher giving feedback
  comment: String, // Feedback comment
  date: { type: Date, default: Date.now } // Date of feedback
});

// Main schema for a student
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Student's name
  course: String, // Course enrolled
  feedback: [feedbackSchema], // Array of feedback objects
  createdAt: { type: Date, default: Date.now } // Date student was added
});

// Export the Student model
module.exports = mongoose.model("Student", studentSchema);
