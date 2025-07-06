import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

// Navbar displays navigation links and user info
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout and redirect to login page
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">SecureNotes</Link>
      </div>

      <div className="navbar-right">
        {/* Show login/register links if not logged in, else show user and logout */}
        {!user ? (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        ) : (
          <>
            <span className="navbar-user">{user.name}</span>
            <button onClick={handleLogout} className="navbar-logout">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
