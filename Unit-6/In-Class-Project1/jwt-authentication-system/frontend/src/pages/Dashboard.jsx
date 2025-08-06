import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";   // Custom context to access the user's auth token
import "../styles/Dashboard.css";                   // Styling specific to this view

const Dashboard = () => {
  const { token } = useAuth();                      // Extract the JWT token from auth context
  const [message, setMessage] = useState("");       // State to display protected response or error

  useEffect(() => {
    // Function to call a protected backend route
    const fetchProtected = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/protected", {
          headers: { Authorization: `Bearer ${token}` }  // Pass token in Authorization header
        });
        // Successful response: show message and user ID
        setMessage(res.data.message + " | User ID: " + res.data.userId);
      } catch (err) {
        // If request fails (e.g., invalid or expired token)
        setMessage("Unauthorized or session expired.");
      }
    };

    // Trigger the API request only if token is present
    if (token) {
      fetchProtected();
    } else {
      setMessage("Please login to see this page.");
    }
  }, [token]);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-card">
        <p>{message}</p>  {/* Display the protected message or fallback text */}
      </div>
    </div>
  );
};

export default Dashboard;
