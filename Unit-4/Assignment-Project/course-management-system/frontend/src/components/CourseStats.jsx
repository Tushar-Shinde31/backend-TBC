// Import React hooks, axios for API calls, and styles
import { useEffect, useState } from "react";
import axios from "axios";
import "../components/styles/CourseStats.css";

// CourseStats component fetches and displays course counts by category
const CourseStats = () => {
  // State to hold stats data from the backend
  const [stats, setStats] = useState([]);

  // Fetch stats from the backend API on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses/count/by-category");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };

    fetchStats();
  }, []);

  // If no stats, don't render anything
  if (!stats.length) return null;

  // Render the stats UI
  return (
    <div className="course-stats">
      {/* Title for the stats section */}
      <h3>📊 Courses by Category</h3>
      {/* List of categories and their course counts */}
      <ul>
        {stats.map(item => (
          <li key={item._id}>
          {item._id.charAt(0).toUpperCase() + item._id.slice(1)}: {item.count}
        </li>        
        ))}
      </ul>
    </div>
  );
};

export default CourseStats;
