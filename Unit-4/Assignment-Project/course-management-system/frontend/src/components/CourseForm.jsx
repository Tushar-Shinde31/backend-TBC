// Import necessary React hooks and styling
import { useEffect, useState } from "react";
import "../components/styles/CourseForm.css";

// Component for adding or editing a course
const CourseForm = ({ selected, onSubmit, cancelEdit }) => {
  // Local state for form input fields
  const [form, setForm] = useState({
    title: "",
    category: "",
    instructor: "",
    description: ""
  });

  // If a course is selected for editing, populate the form with its data
  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  // Handles changes to any input field
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handles form submission for both adding and updating a course
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form refresh behavior
    if (selected) onSubmit(selected._id, form); // If editing, pass the course ID
    else onSubmit(form);                       // If adding new, just send form data

    // Reset form after submission
    setForm({ title: "", category: "", instructor: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="course-form">
      {/* Input fields for each course attribute */}
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="instructor" placeholder="Instructor" value={form.instructor} onChange={handleChange} />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      
      {/* Submit button changes text based on mode */}
      <button type="submit">{selected ? "Update" : "Add"}</button>

      {/* Show cancel button only in edit mode */}
      {selected && <button onClick={cancelEdit}>Cancel</button>}
    </form>
  );
};

export default CourseForm;
