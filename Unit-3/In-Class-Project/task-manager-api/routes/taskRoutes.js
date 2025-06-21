// Import Express to create route handlers
const express = require('express');
const router = express.Router(); // Create a new router instance

// Import controller functions that handle task logic
const {
  getAllTasks,     // Handle GET / - return all tasks
  getTaskById,     // Handle GET /:id - return specific task
  createTask,      // Handle POST / - create new task
  updateTask,      // Handle PUT /:id - update task by ID
  deleteTask       // Handle DELETE /:id - remove task by ID
} = require('../controllers/taskController');

// Route: GET all tasks
router.get('/', getAllTasks);

// Route: GET a single task by ID
router.get('/:id', getTaskById);

// Route: POST a new task
router.post('/', createTask);

// Route: PUT update existing task
router.put('/:id', updateTask);

// Route: DELETE task
router.delete('/:id', deleteTask);

// Export the router to be used in the main app file (like app.js)
module.exports = router;
