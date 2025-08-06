// Import CSS for styling the student item
import "../components/styles/StudentItem.css";

// StudentItem displays individual student details and provides edit/delete buttons
const StudentItem = ({ stu, onEdit, onDelete }) => (
  <div className="student-item">
    {/* Display student name */}
    <h4>{stu.name}</h4>
    {/* Display student course */}
    <p>Course: {stu.course}</p>
    {/* Display student year */}
    <p>Year: {stu.year}</p>
    {/* Display student roll number */}
    <p>Roll No: {stu.rollNo}</p>
    {/* Edit button triggers onEdit with the current student */}
    <button onClick={() => onEdit(stu)}>Edit</button>
    {/* Delete button triggers onDelete with the student ID */}
    <button onClick={() => onDelete(stu._id)}>Delete</button>
  </div>
);

export default StudentItem;
