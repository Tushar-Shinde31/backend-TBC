import { useState } from "react";
import FeedbackForm from "./FeedbackForm";
import "../styles/StudentItem.css";

// StudentItem component displays a single student's information and feedback
// Props:
//   student: student object to display
//   onAddFeedback: function to call when new feedback is added
//   onDeleteFeedback: function to call when feedback is deleted
const StudentItem = ({ student, onAddFeedback, onDeleteFeedback }) => {
  // State to control visibility of the feedback form
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="student-item fade-in">
      {/* Header with student info and toggle feedback form button */}
      <div className="student-header">
        <div className="student-info">
          <h3 className="student-name">{student.name}</h3>
          <span className="student-course">{student.course}</span>
        </div>
        {/* Button to show/hide feedback form */}
        <button 
          onClick={() => setShowForm(!showForm)}
          className="toggle-feedback-btn"
        >
          {showForm ? "Hide Form" : "Add Feedback"}
        </button>
      </div>

      {/* Feedback form (shown when showForm is true) */}
      {showForm && (
        <div className="feedback-section slide-in">
          <FeedbackForm
            onSubmit={(feedback) => {
              onAddFeedback(student._id, feedback); // Add feedback for this student
              setShowForm(false); // Hide form after submission
            }}
          />
        </div>
      )}

      {/* Feedback list or empty state */}
      <div className="feedback-section">
        {student.feedback.length === 0 ? (
          <div className="no-feedback">
            No feedback yet. Add the first feedback!
          </div>
        ) : (
          <ul className="feedback-list">
            {student.feedback.map((f, idx) => (
              <li key={idx} className="feedback-item slide-in">
                <div className="feedback-content">
                  <div className="feedback-teacher">{f.teacher}</div>
                  <div className="feedback-comment">{f.comment}</div>
                </div>
                {/* Button to delete this feedback */}
                <button 
                  onClick={() => onDeleteFeedback(student._id, idx)}
                  className="delete-feedback-btn"
                  title="Delete feedback"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentItem;
