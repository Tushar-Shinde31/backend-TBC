// Import the CourseItem component and its styles
import CourseItem from "./CourseItem";
import "../components/styles/CourseItem.css";

// CourseList component renders a list of CourseItem components
const CourseList = ({ courses, onEdit, onDelete }) => {
  // If there are no courses, show a message
  if (!courses.length) return <p>No courses found.</p>;

  // Render a list of CourseItem components
  return (
    <div>
      {courses.map(course => (
        <CourseItem
          key={course._id}
          course={course}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CourseList;
