// Import required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");

// Load environment variables from .env file
dotenv.config();
// Connect to MongoDB database
connectDB();

// Initialize Express app
const app = express();
// Enable CORS for all routes
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// Mount course-related API routes
app.use("/api/courses", courseRoutes);

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
