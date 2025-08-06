import { useState } from "react";
import "../styles/FeedbackForm.css";

// FeedbackForm component allows users to add feedback for a student
// Props:
//   onSubmit: function to call when the form is submitted
const FeedbackForm = ({ onSubmit }) => {
  // State to manage form input values
  const [form, setForm] = useState({ teacher: "", comment: "" });

  // Handle input changes and update form state
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSubmit(form);     // Call the onSubmit prop with form data
    setForm({ teacher: "", comment: "" }); // Reset form fields
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      {/* Form title */}
      <h3 className="feedback-form-title">Add New Feedback</h3>
      <div className="feedback-form-row">
        {/* Input for teacher name */}
        <input
          name="teacher"
          placeholder="Teacher Name"
          value={form.teacher}
          onChange={handleChange}
          className="feedback-input"
          required
        />
        {/* Input for feedback comment */}
        <input
          name="comment"
          placeholder="Feedback Comment"
          value={form.comment}
          onChange={handleChange}
          className="feedback-input"
          required
        />
      </div>
      {/* Submit button */}
      <button type="submit" className="feedback-submit-btn">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
