import styles from './styles/TaskForm.module.css';
import { Plus, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

// TaskForm handles both adding and editing tasks
function TaskForm({ onSubmit, editTask }) {
  // State for task title input
  const [title, setTitle] = useState('');
  // State for task priority input
  const [priority, setPriority] = useState('Low');
  // State for task status input
  const [status, setStatus] = useState('Pending');

  // When editTask changes, populate form fields for editing
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setPriority(editTask.priority);
      setStatus(editTask.status);
    }
  }, [editTask]);

  // Handle form submission for adding/updating a task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return; // Prevent empty tasks
    onSubmit({ title, priority, status }); // Pass task data to parent
    // Reset form fields after submit
    setTitle('');
    setPriority('Low');
    setStatus('Pending');
  };

  return (
    // Task form UI
    <form className={styles.taskForm} onSubmit={handleSubmit}>
      {/* Input for task title */}
      <input
        className={styles.taskInput}
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      {/* Dropdown for priority selection */}
      <select className={styles.taskSelect} value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      {/* Dropdown for status selection */}
      <select className={styles.taskSelect} value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Pending</option>
        <option>Completed</option>
      </select>
      {/* Button changes icon/text based on add or edit mode */}
      <button className={styles.taskButton} type="submit">
        {editTask ? <><Save size={16} style={{marginRight: 4}} /> Update</> : <><Plus size={16} style={{marginRight: 4}} /> Add Task</>}
      </button>
    </form>
  );
}

export default TaskForm;
    