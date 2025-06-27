// Import Express and create a router instance
const express = require('express');
const router = express.Router();
// Import controller functions for student operations
const {
  addStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

// Route for getting all students and adding a new student
router.route('/')
  .get(getStudents)   // GET /api/students - list students
  .post(addStudent);  // POST /api/students - add student

// Route for getting, updating, and deleting a student by ID
router.route('/:id')
  .get(getStudent)    // GET /api/students/:id - get student by ID
  .put(updateStudent) // PUT /api/students/:id - update student
  .delete(deleteStudent); // DELETE /api/students/:id - delete student

// Export the router to be used in server.js
module.exports = router;
