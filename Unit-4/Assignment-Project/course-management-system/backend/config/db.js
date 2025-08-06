// Import mongoose for MongoDB connection
const mongoose = require("mongoose");

// Function to connect to MongoDB using the connection string from environment variables
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    // Log error and exit process if connection fails
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

// Export the connectDB function
module.exports = connectDB;
