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
    <form className="student-form card" onSubmit={submitForm}>
      <div className="form-grid">
        <div className="field">
          <label className="label" htmlFor="name">Full Name</label>
          <input id="name" name="name" placeholder="e.g., Priya Sharma" value={form.name} onChange={handleChange} />
        </div>
        <div className="field">
          <label className="label" htmlFor="course">Course</label>
          <input id="course" name="course" placeholder="e.g., B.Sc Computer Science" value={form.course} onChange={handleChange} />
        </div>
        <div className="field">
          <label className="label" htmlFor="year">Year</label>
          <input id="year" name="year" type="number" placeholder="e.g., 2" value={form.year} onChange={handleChange} />
        </div>
        <div className="field">
          <label className="label" htmlFor="rollNo">Roll Number</label>
          <input id="rollNo" name="rollNo" placeholder="e.g., CS2023-045" value={form.rollNo} onChange={handleChange} />
        </div>
      </div>
      <div className="button-row">
        <button className="btn btn-primary" type="submit">{selected ? "Update Student" : "Add Student"}</button>
        {selected && (
          <button className="btn btn-secondary" type="button" onClick={() => setSelected(null)}>Cancel</button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;
