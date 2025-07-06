// Import routing tools from react-router
import { Link, useNavigate } from "react-router-dom";
// Import auth context hook for token and logout function
import { useAuth } from "../context/AuthContext";
// Import styles for this component
import "../styles/Navbar.css";
// Import icons for visual clarity
import { LayoutDashboard, LogIn, LogOut, UserPlus } from "lucide-react";

const Navbar = () => {
  const { token, logout } = useAuth();      // Destructure token and logout from context
  const navigate = useNavigate();           // Hook to programmatically navigate routes

  // Logout handler: clear auth and redirect to login
  const handleLogout = () => {
    logout();                // Clear token and session info
    navigate("/login");      // Redirect user to login page
  };

  return (
    <nav className="navbar">
      {/* Dashboard is always visible */}
      <Link to="/" className="nav-link">
        <LayoutDashboard className="nav-icon" /> Dashboard
      </Link>

      {/* Show Login/Register if NOT logged in */}
      {!token ? (
        <>
          <Link to="/register" className="nav-link">
            <UserPlus className="nav-icon" /> Register
          </Link>
          <Link to="/login" className="nav-link">
            <LogIn className="nav-icon" /> Login
          </Link>
        </>
      ) : (
        // If logged in, show Logout button
        <button className="nav-link logout-btn" onClick={handleLogout}>
          <LogOut className="nav-icon" /> Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
