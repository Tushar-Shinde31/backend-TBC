// === MAIN ENTRY FILE FOR THE BACKEND SERVER ===

// Import the Express library
const express = require('express');
// Create an Express app instance
const app = express();

// Import task-related routes (GET, POST, PUT, DELETE)
const taskRoutes = require('./routes/taskRoutes');

// Middleware: parses incoming JSON payloads
app.use(express.json());

// Prefix all task-related routes with /api/tasks
app.use('/api/tasks', taskRoutes);

// Define port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
