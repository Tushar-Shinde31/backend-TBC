// Import the in-memory tasks array
const tasks = require('../data/tasks');

/**
 * GET /api/tasks
 * Retrieves all tasks, with optional filters by status, priority, or keyword search.
 */
exports.getAllTasks = (req, res) => {
  const { status, priority, search } = req.query;

  let filtered = [...tasks]; // Clone the task list

  // Apply filters if provided
  if (status) filtered = filtered.filter(t => t.status === status);
  if (priority) filtered = filtered.filter(t => t.priority === priority);
  if (search) filtered = filtered.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  res.json(filtered);
};

/**
 * GET /api/tasks/:id
 * Returns a single task based on its ID.
 */
exports.getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task)
    return res.status(404).json({ message: 'Task not found' });

  res.json(task);
};

/**
 * POST /api/tasks
 * Creates a new task with optional status and priority.
 */
exports.createTask = (req, res) => {
  const { title, status = 'pending', priority = 'medium' } = req.body;

  const newTask = {
    id: Date.now(), // Use timestamp as a simple unique ID
    title,
    status,
    priority
  };

  tasks.push(newTask); // Add new task to the in-memory list
  res.status(201).json(newTask);
};

/**
 * PUT /api/tasks/:id
 * Updates title, status, or priority of an existing task.
 */
exports.updateTask = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task)
    return res.status(404).json({ message: 'Task not found' });

  // Update only the fields provided
  task.title = req.body.title || task.title;
  task.status = req.body.status || task.status;
  task.priority = req.body.priority || task.priority;

  res.json(task);
};

/**
 * DELETE /api/tasks/:id
 * Removes a task from the list by its ID.
 */
exports.deleteTask = (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: 'Task not found' });

  const deleted = tasks.splice(index, 1); // Remove the task from the array
  res.json(deleted[0]); // Return deleted task
};

/**
 * PUT /api/tasks/complete-all
 * Marks all tasks as completed.
 */
exports.markAllCompleted = (req, res) => {
  const tasks = require('../data/tasks'); // <-- You could reuse the outer scope here

  if (tasks.length === 0)
    return res.status(404).json({ message: "No tasks to complete." });

  tasks.forEach(task => {
    task.status = 'completed';
  });

  res.json({ message: 'All tasks marked as completed.' });
};
