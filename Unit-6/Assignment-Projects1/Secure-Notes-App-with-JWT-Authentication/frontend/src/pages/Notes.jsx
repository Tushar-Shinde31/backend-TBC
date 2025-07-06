import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import "../styles/Notes.css";

const Notes = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);

  // On mount, redirect to login if not authenticated and fetch notes
  useEffect(() => {
    if (!token) return navigate("/login");
    fetchNotes();
  }, [token]);

  // Fetch all notes for the logged-in user
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Fetch notes failed", err);
    }
  };

  // Handle input changes for note form
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission for adding or updating a note
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update existing note
        await axios.put(`http://localhost:5000/api/notes/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create new note
        await axios.post("http://localhost:5000/api/notes", form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setForm({ title: "", content: "" });
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  // Set form fields for editing a note
  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditingId(note._id);
  };

  // Delete a note by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotes();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="notes-container">
      <h2>Your Notes</h2>

      {/* Form for adding or editing a note */}
      <form onSubmit={handleSubmit} className="notes-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </form>

      {/* List of notes */}
      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          notes.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={() => handleEdit(note)}
              onDelete={() => handleDelete(note._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
