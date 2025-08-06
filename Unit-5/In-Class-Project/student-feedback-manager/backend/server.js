// Main entry point for the backend server

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Import student-related routes
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Mount student routes at /api/students
app.use("/api/students", studentRoutes);

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
