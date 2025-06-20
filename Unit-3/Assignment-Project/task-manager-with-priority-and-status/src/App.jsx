// Importing CSS module for styling
import styles from './App.module.css';
// Importing an icon from lucide-react library
import { ClipboardList } from 'lucide-react';
// Importing custom components
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
// Importing useState hook from React
import { useState } from 'react';

function App() {
  // State to store all tasks
  const [tasks, setTasks] = useState([]);
  // State to keep track of the task being edited
  const [editTask, setEditTask] = useState(null);
  // State to store current filter settings
  const [filter, setFilter] = useState({ status: 'All', priority: 'All' });

  // Function to add a new task or update an existing one
  const addOrUpdateTask = (task) => {
    if (editTask) {
      // If editing, update the task in the list
      setTasks(tasks.map(t => t.id === editTask.id ? { ...task, id: editTask.id } : t));
      setEditTask(null); // Reset edit state
    } else {
      // If adding, append the new task with a unique id
      setTasks([...tasks, { ...task, id: Date.now() }]);
    }
  };

  // Function to delete a task by its id
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Filter tasks based on selected status and priority
  const filteredTasks = tasks.filter(t => {
    const statusMatch = filter.status === 'All' || t.status === filter.status;
    const priorityMatch = filter.priority === 'All' || t.priority === filter.priority;
    return statusMatch && priorityMatch;
  });

  return (
    // Main container for the app
    <div className={styles.appContainer}>
      {/* App header with icon */}
      <h1 className={styles.header}><ClipboardList size={28} style={{marginRight: 8}} /> Task Manager</h1>
      {/* Task form for adding or editing tasks */}
      <TaskForm onSubmit={addOrUpdateTask} editTask={editTask} />
      {/* Filter bar to filter tasks by status and priority */}
      <FilterBar setFilter={setFilter} />
      {/* List of tasks, filtered and with edit/delete functionality */}
      <TaskList tasks={filteredTasks} onDelete={deleteTask} onEdit={setEditTask} />
    </div>
  );
}

export default App;
