// Import CSS for styling the student item
import "../components/styles/StudentItem.css";

// StudentItem displays individual student details and provides edit/delete buttons
const StudentItem = ({ stu, onEdit, onDelete }) => (
  <div className="student-item">
    <div>
      <h4>{stu.name}</h4>
      <p>Course: {stu.course}</p>
      <p>Year: {stu.year}</p>
      <p>Roll No: {stu.rollNo}</p>
    </div>
    <div className="student-actions">
      <button className="btn btn-primary" onClick={() => onEdit(stu)}>Edit</button>
      <button className="btn btn-danger" onClick={() => onDelete(stu._id)}>Delete</button>
    </div>
  </div>
);

export default StudentItem;
