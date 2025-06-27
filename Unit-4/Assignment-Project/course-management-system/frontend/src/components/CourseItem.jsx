// Import styles for the course item
import "../components/styles/CourseItem.css"

// CourseItem component displays a single course's details and action buttons
const CourseItem = ({ course, onEdit, onDelete }) => (
  <div className="course-item">
    {/* Course title */}
    <h3>{course.title}</h3>
    {/* Instructor name */}
    <p><strong>Instructor:</strong> {course.instructor}</p>
    {/* Course category */}
    <p><strong>Category:</strong> {course.category}</p>
    {/* Course description */}
    <p>{course.description}</p>
    {/* Edit and Delete buttons */}
    <button onClick={() => onEdit(course)}>Edit</button>
    <button onClick={() => onDelete(course._id)}>Delete</button>
  </div>
);

export default CourseItem;


