// Import the Express library to create the server
const express = require('express');
// Create an instance of an Express app
const app = express();

// Import task-related routes from the routes folder
const taskRoutes = require('./routes/taskRoutes');

// Middleware to parse incoming JSON requests (e.g., req.body)
app.use(express.json());

// Mount the task routes at the /api/tasks path
// e.g., GET /api/tasks, POST /api/tasks, etc.
app.use('/api/tasks', taskRoutes);

// Set the server port: use environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
