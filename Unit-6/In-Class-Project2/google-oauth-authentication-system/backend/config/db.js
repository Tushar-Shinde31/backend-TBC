const mongoose = require("mongoose");

// Function to connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(" DB connection failed:", err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
