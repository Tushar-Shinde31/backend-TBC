// Importing CSS module for styling
import styles from './styles/TaskList.module.css';
// Importing TaskItem component to render each task
import TaskItem from './TaskItem';

// TaskList displays a list of tasks or a message if empty
function TaskList({ tasks, onDelete, onEdit }) {
  // If there are no tasks, show a message
  if (tasks.length === 0) return <p className={styles.noTasks}>No tasks to show.</p>;

  return (
    // Container for the list of tasks
    <div className={styles.taskList}>
      {/* Render each task using TaskItem */}
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;
