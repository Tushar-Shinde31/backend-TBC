import "../styles/Dashboard.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // If user data is not loaded, render nothing
  if (!user) return null;

  // Show welcome message and button to go to notes page
  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.name} 👋</h2>
      <p>Email: {user.email}</p>
      <p>You're logged in and ready to take notes!</p>
      <button className="dashboard-create-notes-btn" onClick={() => navigate('/notes')}>
        Create Your Notes
      </button>
    </div>
  );
};

export default Dashboard;
