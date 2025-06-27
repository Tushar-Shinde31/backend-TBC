import { useState, useEffect } from "react";
import "../components/styles/StudentForm.css";

// StudentForm handles both adding and editing a student
const StudentForm = ({ onSubmit, selected, setSelected }) => {
  // Local state for form fields
  const [form, setForm] = useState({
    name: "",
    course: "",
    year: "",
    rollNo: ""
  });

  // When a student is selected for editing, populate the form with their data
  useEffect(() => {
    if (selected) {
      setForm(selected);
    }
  }, [selected]);

  // Handle input changes and update local form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission for both add and update
  const submitForm = (e) => {
    e.preventDefault();
    if (selected) {
      // If editing, call onSubmit with the student ID and updated data
      onSubmit(selected._id, form);
    } else {
      // If adding, call onSubmit with new student data
      onSubmit(form);
    }
    // Reset form after submission
    setForm({ name: "", course: "", year: "", rollNo: "" });
  };

  return (
    // Render the form with controlled inputs
    <form className="student-form" onSubmit={submitForm}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="course" placeholder="Course" value={form.course} onChange={handleChange} />
      <input name="year" type="number" placeholder="Year" value={form.year} onChange={handleChange} />
      <input name="rollNo" placeholder="Roll No" value={form.rollNo} onChange={handleChange} />
      <button type="submit">{selected ? "Update" : "Add"}</button>
      {/* Show cancel button only when editing */}
      {selected && <button onClick={() => setSelected(null)}>Cancel</button>}
    </form>
  );
};

export default StudentForm;
