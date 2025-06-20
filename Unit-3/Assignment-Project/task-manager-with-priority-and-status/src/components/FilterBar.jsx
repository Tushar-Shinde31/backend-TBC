import styles from './styles/FilterBar.module.css';

// FilterBar provides dropdowns to filter tasks by status and priority
function FilterBar({ setFilter }) {
    // Handle changes in filter dropdowns
    const handleChange = (e) => {
      const { name, value } = e.target;
      // Update filter state in parent component
      setFilter(prev => ({ ...prev, [name]: value }));
    };
  
    return (
      // Container for filter controls
      <div className={styles.filterBar}>
        {/* Status filter dropdown */}
        <label className={styles.filterLabel} htmlFor="status-select">Status:</label>
        <select id="status-select" name="status" className={styles.filterSelect} onChange={handleChange}>
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
  
        {/* Priority filter dropdown */}
        <label className={styles.filterLabel} htmlFor="priority-select">Priority:</label>
        <select id="priority-select" name="priority" className={styles.filterSelect} onChange={handleChange}>
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
    );
  }
  
  export default FilterBar;
  