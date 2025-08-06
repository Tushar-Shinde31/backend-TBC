// Defines API routes for student and feedback operations

const express = require("express");
const router = express.Router();
const {
  addStudent,
  getAllStudents,
  addFeedback,
  deleteFeedback
} = require("../controllers/studentController");

// Route to add a new student
router.post("/", addStudent);

// Route to get all students
router.get("/", getAllStudents);

// Route to add feedback to a student by ID
router.post("/:id/feedback", addFeedback);

// Route to delete feedback by student ID and feedback index
router.delete("/:id/feedback/:index", deleteFeedback);

module.exports = router;
