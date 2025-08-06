const express = require("express");
const router = express.Router();
const {
  createNote,
  getMyNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const protect = require("../middleware/authMiddleware");

// Route to create a new note (protected)
router.post("/", protect, createNote);

// Route to get all notes for the logged-in user (protected)
router.get("/", protect, getMyNotes);

// Route to update a note by ID (protected)
router.put("/:id", protect, updateNote);

// Route to delete a note by ID (protected)
router.delete("/:id", protect, deleteNote);

module.exports = router;
