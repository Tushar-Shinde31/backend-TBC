import StudentItem from "./StudentItem";
import "../styles/StudentList.css";

// StudentList component displays a list of all students
// Props:
//   students: array of student objects
//   onAddFeedback: function to call when feedback is added to a student
//   onDeleteFeedback: function to call when feedback is deleted from a student
const StudentList = ({ students, onAddFeedback, onDeleteFeedback }) => {
  return (
    <div className="student-list">
      {/* Header with title and student count */}
      <div className="student-list-header">
        <h2 className="student-list-title">Student Directory</h2>
        <p className="student-count">
          {students.length} {students.length === 1 ? 'student' : 'students'} enrolled
        </p>
      </div>
      
      {/* Show empty state if no students, otherwise render StudentItem for each student */}
      {students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <div className="empty-state-text">No students yet</div>
          <div className="empty-state-subtext">Add your first student to get started!</div>
        </div>
      ) : (
        students.map((student) => (
          <StudentItem
            key={student._id}
            student={student}
            onAddFeedback={onAddFeedback}
            onDeleteFeedback={onDeleteFeedback}
          />
        ))
      )}
    </div>
  );
};

export default StudentList;
