import './styles/ContactItem.css';
import { Edit, Trash2 } from 'lucide-react';

function ContactItem({ contact, onDelete, onEdit }) {
  // Render a single contact with edit and delete buttons
  return (
    <div className="contact-item">
      {/* Display contact name */}
      <p><strong>{contact.name}</strong></p>
      {/* Display contact email */}
      <p>{contact.email}</p>
      {/* Edit button with icon */}
      <button className="edit-btn" onClick={() => onEdit(contact)}><Edit size={16} style={{marginRight:4}} />Edit</button>
      {/* Delete button with icon */}
      <button className="delete-btn" onClick={() => onDelete(contact.id)}><Trash2 size={16} style={{marginRight:4}} />Delete</button>
    </div>
  );
}

export default ContactItem;
  