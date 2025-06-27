import { useEffect, useState } from "react";
import axios from "axios";

// Form component to create or update a student
import StudentForm from "./components/StudentForm";
// List component to display student entries
import StudentList from "./components/StudentList";

function App() {
  // Stores all students fetched from backend
  const [students, setStudents] = useState([]);
  // Tracks which student is being edited (null if none)
  const [selected, setSelected] = useState(null);

  // Fetch all students from the backend API
  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };

  // Run once on component mount to load initial data
  useEffect(() => {
    fetchStudents();
  }, []);

  // Create a new student
  const handleAdd = async (studentData) => {
    await axios.post("http://localhost:5000/api/students", studentData);
    fetchStudents(); // Refresh list after adding
  };

  // Update an existing student
  const handleUpdate = async (id, studentData) => {
    await axios.put(`http://localhost:5000/api/students/${id}`, studentData);
    fetchStudents();    // Refresh list after update
    setSelected(null);  // Exit edit mode
  };

  // Delete a student
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents(); // Refresh list after deletion
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📘 Student Enrollment</h1>

      {/* Form for adding or editing a student */}
      <StudentForm
        onSubmit={selected ? handleUpdate : handleAdd}
        selected={selected}
        setSelected={setSelected}
      />

      {/* List of students with edit/delete handlers */}
      <StudentList
        students={students}
        onEdit={setSelected}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
