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
      {/* Search by course title */}
      <input
        name="search"
        placeholder="Search by title"
        value={filters.search}
        onChange={handleChange}
      />
      {/* Filter by instructor */}
      <input
        name="instructor"
        placeholder="Filter by instructor"
        value={filters.instructor}
        onChange={handleChange}
      />
      {/* Filter by category */}
      <input
        name="category"
        placeholder="Filter by category"
        value={filters.category}
        onChange={handleChange}
      />
      {/* Sort order dropdown */}
      <select name="sort" value={filters.sort} onChange={handleChange}>
        <option value="-createdAt">Newest First</option>
        <option value="createdAt">Oldest First</option>
      </select>
    </div>
  );
};

export default Filters;
