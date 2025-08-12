// Import core React hooks and required components
import { useState, useEffect } from "react";
import axios from "axios";
import CourseForm from "./components/CourseForm";     // Form for adding or editing a course
import CourseList from "./components/CourseList";     // List displaying all courses
import Filters from "./components/Filters";           // UI to filter courses
import CourseStats from "./components/CourseStats";   // Summary stats (e.g., count by category)
import "./App.css";                                   // Global styles

function App() {
  // Local state to hold the course list
  const [courses, setCourses] = useState([]);
  // Stores the course being edited, if any
  const [selected, setSelected] = useState(null);
  // Filter parameters for querying the course list
  const [filters, setFilters] = useState({
    search: "",
    instructor: "",
    category: "",
    sort: "-createdAt",
    page: 1
  });

  // Fetches courses from the backend whenever filters change
  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/courses", {
      params: filters
    });
    setCourses(res.data);
  };

  // Trigger initial fetch + refetch on any filter update
  useEffect(() => {
    fetchCourses();
  }, [filters]);

  // Handle course creation
  const handleAdd = async (data) => {
    await axios.post("http://localhost:5000/api/courses", data);
    fetchCourses(); // Refresh course list
  };

  // Handle course update
  const handleUpdate = async (id, data) => {
    await axios.put(`http://localhost:5000/api/courses/${id}`, data);
    setSelected(null); // Exit edit mode
    fetchCourses();
  };

  // Handle deletion of a course
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="app-container">
      <h1>Course Manager</h1>

      {/* Form for adding or updating a course */}
      <CourseForm
        selected={selected}
        onSubmit={selected ? handleUpdate : handleAdd}
        cancelEdit={() => setSelected(null)}
      />

      {/* Filtering controls */}
      <Filters filters={filters} setFilters={setFilters} />

      {/* Display course category statistics */}
      <CourseStats />

      {/* Display the filtered course list */}
      <CourseList
        courses={courses}
        onEdit={setSelected}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
