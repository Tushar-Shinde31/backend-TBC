// Importing CSS module for styling
import styles from './styles/TaskItem.module.css';
// Importing icons for edit and delete actions
import { Pencil, Trash2 } from 'lucide-react';

// TaskItem displays a single task with edit and delete options
function TaskItem({ task, onDelete, onEdit }) {
  return (
    // Container for a single task
    <div className={styles.taskItem}>
      {/* Task title */}
      <h4 className={styles.taskTitle}>{task.title}</h4>
      {/* Task status and priority info */}
      <p className={styles.taskMeta}>Status: {task.status} | Priority: {task.priority}</p>
      {/* Buttons for editing and deleting the task */}
      <div className={styles.buttonGroup}>
        <button className={styles.editBtn} onClick={() => onEdit(task)} title="Edit">
          <Pencil size={16} style={{marginRight: 4}} /> Edit
        </button>
        <button className={styles.deleteBtn} onClick={() => onDelete(task.id)} title="Delete">
          <Trash2 size={16} style={{marginRight: 4}} /> Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
  