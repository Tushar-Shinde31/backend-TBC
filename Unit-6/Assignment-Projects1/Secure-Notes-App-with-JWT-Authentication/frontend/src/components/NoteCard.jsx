import "../styles/NoteCard.css";

// NoteCard displays a single note with edit and delete buttons
const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-card-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete} className="note-card-delete">Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
