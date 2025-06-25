// Import the in-memory task array from the data folder
const tasks = require('../data/tasks');

// === GET all tasks ===
exports.getAllTasks = (req, res) => {
  res.json(tasks); // Respond with the full list of tasks
};

// === GET a single task by ID ===
exports.getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id)); // Look up task by ID
  if (!task) return res.status(404).json({ message: 'Task not found' }); // Handle missing ID
  res.json(task); // Respond with the found task
};

// === POST: Create a new task ===
exports.createTask = (req, res) => {
  const { title } = req.body;
  const newTask = {
    id: Date.now(), // Use current timestamp as a unique ID
    title
  };
  tasks.push(newTask); // Add new task to the array
  res.status(201).json(newTask); // Respond with the newly created task
};

// === PUT: Update an existing task by ID ===
exports.updateTask = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.title = req.body.title || task.title; // Update title if provided
  res.json(task); // Respond with the updated task
};

// === DELETE: Remove a task by ID ===
exports.deleteTask = (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  const deletedTask = tasks.splice(index, 1); // Remove and store the deleted task
  res.json(deletedTask[0]); // Return the deleted task
};
