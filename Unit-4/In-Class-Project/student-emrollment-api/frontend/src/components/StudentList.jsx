// Import the StudentItem component for rendering each student
import StudentItem from "./StudentItem";
// Import CSS for styling the list and items
import "../components/styles/StudentList.css";
import "../components/styles/StudentItem.css";

// StudentList displays a list of students and handles edit/delete actions
const StudentList = ({ students, onEdit, onDelete }) => {
  // If there are no students, show a message
  if (!students.length) return <div className="card empty-state">No students found.</div>;

  return (
    // Render each student using the StudentItem component
    <div className="student-list">
      {students.map((stu) => (
        <StudentItem key={stu._id} stu={stu} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default StudentList;
