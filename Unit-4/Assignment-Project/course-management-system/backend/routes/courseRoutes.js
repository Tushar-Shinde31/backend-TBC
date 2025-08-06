// Import Express and create a router instance
const express = require("express");
const router = express.Router();
// Import controller functions for course operations
const {
  addCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  countByCategory
} = require("../controllers/courseController");

// Route for getting all courses and adding a new course
router.route("/")
  .get(getCourses)
  .post(addCourse);

// Route for getting course count by category (aggregation)
router.get("/count/by-category", countByCategory);

// Routes for getting, updating, and deleting a course by ID
router.route("/:id")
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);

// Export the router to be used in server.js
module.exports = router;
