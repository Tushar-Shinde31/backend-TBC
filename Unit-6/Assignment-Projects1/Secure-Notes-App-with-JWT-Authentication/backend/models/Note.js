const mongoose = require("mongoose");

// Define the Note schema for MongoDB
const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User who owns the note
  title: { type: String, required: true }, // Note title
  content: { type: String, required: true } // Note content
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("Note", noteSchema);
