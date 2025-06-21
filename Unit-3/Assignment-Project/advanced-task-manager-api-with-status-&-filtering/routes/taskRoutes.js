// Import Express and create a new router instance
const express = require('express');
const router = express.Router();

// Import all controller functions for task operations
const {
  getAllTasks,        // GET /         → Fetch all tasks (with optional query filters)
  getTaskById,        // GET /:id      → Fetch a specific task by ID
  createTask,         // POST /        → Create a new task
  updateTask,         // PUT /:id      → Update a task by ID
  deleteTask,         // DELETE /:id   → Delete a task by ID
  markAllCompleted    // PUT /complete-all → Mark all tasks as completed
} = require('../controllers/taskController');

// 🔒 Register static routes before dynamic ones to avoid route conflicts
// This must come before `/:id` so it's not mistakenly interpreted as an ID
router.put('/complete-all', markAllCompleted);

// ✅ Standard CRUD routes
router.get('/', getAllTasks);          // Retrieve all tasks
router.get('/:id', getTaskById);       // Get a single task by its ID
router.post('/', createTask);          // Add a new task
router.put('/:id', updateTask);        // Edit a task's details
router.delete('/:id', deleteTask);     // Remove a task

// Export the configured router so it can be used in app.js
module.exports = router;
