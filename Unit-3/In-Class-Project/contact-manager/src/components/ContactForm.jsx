import { useState, useEffect } from 'react';
import './styles/ContactForm.css';

function ContactForm({ onSubmit, editContact }) {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // If editing, populate form fields with the contact's data
  useEffect(() => {
    if (editContact) {
      setName(editContact.name);
      setEmail(editContact.email);
    }
  }, [editContact]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return; // Prevent empty submissions
    onSubmit({ name, email }); // Pass data to parent
    setName('');
    setEmail('');
  };

  return (
    // Contact form UI
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Name input */}
      <input
        className="input-name"
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {/* Email input */}
      <input
        className="input-email"
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {/* Submit button changes text if editing */}
      <button className="submit-btn" type="submit">{editContact ? "Update" : "Add"} Contact</button>
    </form>
  );
}

export default ContactForm;
