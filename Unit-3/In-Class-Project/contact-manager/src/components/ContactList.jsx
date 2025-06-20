import './styles/ContactList.css';
import ContactItem from './ContactItem';

function ContactList({ contacts, onDelete, onEdit }) {
  // Render the list of contacts or a message if empty
  return (
    <div className="contact-list">
      <h3>Contact List</h3>
      {contacts.length === 0 ? (
        // Show message if no contacts
        <p>No contacts available.</p>
      ) : (
        // Render each contact using ContactItem
        contacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default ContactList;
