// Import styles for the filters UI
import "../components/styles/Filters.css";

// Filters component provides search and filter controls for the course list
const Filters = ({ filters, setFilters }) => {
  // Handle changes in any filter input and update the filters state
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  // Render the filter UI
  return (
    <div className="filters">
      <h3>🔍 Search & Filter Courses</h3>
      
      <div className="filter-group search-group">
        <label htmlFor="search">Search by Title</label>
        <input
          id="search"
          name="search"
          placeholder="Search courses..."
          value={filters.search}
          onChange={handleChange}
        />
      </div>
      
      <div className="filter-group">
        <label htmlFor="instructor">Filter by Instructor</label>
        <input
          id="instructor"
          name="instructor"
          placeholder="Enter instructor name"
          value={filters.instructor}
          onChange={handleChange}
        />
      </div>
      
      <div className="filter-group">
        <label htmlFor="category">Filter by Category</label>
        <input
          id="category"
          name="category"
          placeholder="Enter category"
          value={filters.category}
          onChange={handleChange}
        />
      </div>
      
      <div className="filter-group">
        <label htmlFor="sort">Sort Order</label>
        <select id="sort" name="sort" value={filters.sort} onChange={handleChange}>
          <option value="-createdAt">🆕 Newest First</option>
          <option value="createdAt">📅 Oldest First</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
