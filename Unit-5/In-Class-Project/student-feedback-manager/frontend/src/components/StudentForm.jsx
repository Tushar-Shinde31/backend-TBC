import { useState } from "react";
import "../styles/StudentForm.css";

// StudentForm component allows users to add a new student
// Props:
//   onSubmit: function to call when the form is submitted
const StudentForm = ({ onSubmit }) => {
  // State to manage form input values
  const [form, setForm] = useState({ name: "", course: "" });

  // Handle input changes and update form state
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSubmit(form);     // Call the onSubmit prop with form data
    setForm({ name: "", course: "" }); // Reset form fields
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      {/* Form title */}
      <h2 className="form-title">Add New Student</h2>
      <div className="form-row">
        {/* Input for student name */}
        <input
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
          className="form-input"
          required
        />
        {/* Input for course name */}
        <input
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      {/* Submit button */}
      <button type="submit" className="submit-btn">
        Add Student
      </button>
    </form>
  );
};

export default StudentForm;
