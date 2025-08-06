// Import required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Initialize Express app
const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Mount authentication routes at /api/auth
app.use("/api/auth", authRoutes);

// Set the port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
