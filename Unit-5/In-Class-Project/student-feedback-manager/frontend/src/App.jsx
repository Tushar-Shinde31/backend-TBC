import { useEffect, useState } from "react";
import axios from "axios";

// Import form to add a new student
import StudentForm from "./components/StudentForm";
// Import list to display students with feedback tools.
import StudentList from "./components/StudentList";
// Import global styles
import "./styles/App.css";

function App() {
  // State to store the list of students
  const [students, setStudents] = useState([]);

  // Fetch students from backend API
  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };

  // Add a new student
  const addStudent = async (data) => {
    await axios.post("http://localhost:5000/api/students", data);
    fetchStudents(); // Refresh list after adding
  };

  // Add feedback to a student
  const addFeedback = async (id, feedback) => {
    await axios.post(`http://localhost:5000/api/students/${id}/feedback`, feedback);
    fetchStudents(); // Refresh list to show new feedback
  };

  // Delete specific feedback by student ID and index
  const deleteFeedback = async (id, index) => {
    await axios.delete(`http://localhost:5000/api/students/${id}/feedback/${index}`);
    fetchStudents(); // Refresh after deletion
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="app-container">
      {/* Header section */}
      <div className="app-header">
        <h1 className="app-title">🎓 Student Feedback Manager</h1>
        <p className="app-subtitle">Track and manage student feedback efficiently</p>
      </div>

      {/* Main content area: add student + view student list */}
      <div className="content-wrapper">
        <StudentForm onSubmit={addStudent} />
        <StudentList
          students={students}
          onAddFeedback={addFeedback}
          onDeleteFeedback={deleteFeedback}
        />
      </div>
    </div>
  );
}

export default App;
