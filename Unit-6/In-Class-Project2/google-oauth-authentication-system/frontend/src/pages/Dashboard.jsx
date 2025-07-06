import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

// Dashboard page component
const Dashboard = () => {
  // Get user and token from AuthContext
  const { user, token } = useAuth();

  // If not logged in, prompt user to log in
  if (!token) {
    return <h2 className="dashboard-login-msg">Please log in to access the dashboard.</h2>;
  }

  // Show user info if logged in
  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name} 👋</h2>
      <p>Email: {user?.email}</p>
      <img
        src={user?.picture}
        alt="Profile"
        className="dashboard-profile-img"
      />
    </div>
  );
};

export default Dashboard;
