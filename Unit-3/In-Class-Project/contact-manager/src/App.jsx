// Import global styles for the app container
import './App.css';
// Import React hooks
import { useState } from 'react';
// Import custom components
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
// Import Lucide icon for the app header
import { Contact } from 'lucide-react';

function App() {
  // State to hold the list of contacts
  const [contacts, setContacts] = useState([]);
  // State to hold the contact currently being edited (if any)
  const [editContact, setEditContact] = useState(null);

  // Add a new contact or update an existing one
  const addOrUpdateContact = (contact) => {
    if (editContact) {
      // Update the contact in the list
      setContacts(
        contacts.map(c => c.id === editContact.id ? { ...contact, id: editContact.id } : c)
      );
      setEditContact(null); // Clear edit mode
    } else {
      // Add a new contact with a unique id
      setContacts([...contacts, { ...contact, id: Date.now() }]);
    }
  };

  // Delete a contact by id
  const deleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  // Set a contact to be edited
  const handleEdit = (contact) => {
    setEditContact(contact);
  };

  // Render the main app UI
  return (
    <div className="app-container">
      {/* App header with Lucide icon */}
      <h1><Contact size={32} style={{verticalAlign: 'middle'}} /> Contact Manager</h1>
      {/* Contact form for adding/updating contacts */}
      <ContactForm onSubmit={addOrUpdateContact} editContact={editContact} />
      {/* List of contacts with edit and delete functionality */}
      <ContactList
        contacts={contacts}
        onDelete={deleteContact}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
