// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

// Load environment variables from .env file
dotenv.config();
// Connect to MongoDB database
connectDB();

const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// Authentication routes (register, login)
app.use("/api/auth", authRoutes);

// Notes routes (CRUD operations for notes)
app.use("/api/notes", noteRoutes);

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
