// Import mongoose for MongoDB connection
const mongoose = require("mongoose");

// Function to connect to MongoDB using URI from environment variables
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    // Log connection errors and exit process
    console.error("Mongo connection error:", err.message);
    process.exit(1);
  }
};

// Export the connection function
module.exports = connectDB;
