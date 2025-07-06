const Note = require("../models/Note");

// Create a new note for the logged-in user
exports.createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    // Create note with userId from auth middleware
    const note = await Note.create({ title, content, user: req.userId });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to create note", error: err.message });
  }
};

// Get all notes for the logged-in user
exports.getMyNotes = async (req, res) => {
  try {
    // Find notes belonging to the user, sorted by creation date (newest first)
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes", error: err.message });
  }
};

// Update a note by ID (only if it belongs to the logged-in user)
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    // Find and update the note
    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, content },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to update note", error: err.message });
  }
};

// Delete a note by ID (only if it belongs to the logged-in user)
exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the note
    const note = await Note.findOneAndDelete({ _id: id, user: req.userId });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete note", error: err.message });
  }
};
