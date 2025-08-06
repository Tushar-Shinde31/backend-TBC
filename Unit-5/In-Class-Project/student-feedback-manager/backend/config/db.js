// Handles MongoDB connection using Mongoose

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB connected");
  } catch (err) {
    // Log error and exit if connection fails
    console.error(" Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
