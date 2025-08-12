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
      <h3>{selected ? "✏️ Edit Course" : "➕ Add New Course"}</h3>
      
      <div className="form-group">
        <label htmlFor="title">Course Title</label>
        <input 
          id="title"
          name="title" 
          placeholder="Enter course title" 
          value={form.title} 
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input 
          id="category"
          name="category" 
          placeholder="e.g., Programming, Design, Business" 
          value={form.category} 
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="instructor">Instructor</label>
        <input 
          id="instructor"
          name="instructor" 
          placeholder="Enter instructor name" 
          value={form.instructor} 
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group full-width">
        <label htmlFor="description">Description</label>
        <textarea 
          id="description"
          name="description" 
          placeholder="Enter course description..." 
          value={form.description} 
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="button-group">
        <button type="submit">
          {selected ? "🔄 Update Course" : "➕ Add Course"}
        </button>
        {selected && (
          <button type="button" onClick={cancelEdit}>
            ❌ Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CourseForm;
