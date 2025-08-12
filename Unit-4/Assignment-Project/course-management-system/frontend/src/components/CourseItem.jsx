// Import styles for the course item
import "../components/styles/CourseItem.css"

// CourseItem component displays a single course's details and action buttons
const CourseItem = ({ course, onEdit, onDelete }) => (
  <div className="course-item">
    {/* Course title */}
    <h3>{course.title}</h3>
    
    {/* Course metadata */}
    <div className="course-meta">
      <div className="meta-item">
        <span>👨‍🏫</span>
        <strong>Instructor:</strong> {course.instructor}
      </div>
      <div className="meta-item">
        <span>📚</span>
        <strong>Category:</strong> {course.category}
      </div>
    </div>
    
    {/* Course description */}
    <div className="course-description">
      {course.description}
    </div>
    
    {/* Action buttons */}
    <div className="course-actions">
      <button className="edit-btn" onClick={() => onEdit(course)}>
        ✏️ Edit
      </button>
      <button className="delete-btn" onClick={() => onDelete(course._id)}>
        🗑️ Delete
      </button>
    </div>
  </div>
);

export default CourseItem;


