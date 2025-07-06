// MongoDB connection setup

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Connect using URI from .env
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB error:", error);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = connectDB;
