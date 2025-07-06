// Navbar component for site navigation and user actions

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { token, user, logout } = useAuth(); // Get auth state and logout function

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand/logo */}
        <h3>
          <Link to="/" className="navbar-brand">🎬 Movie Vault</Link>
        </h3>
        <div className="navbar-nav">
          {/* Show user info and actions if logged in */}
          {token ? (
            <>
              <div className="user-info">
                {user?.avatar && (
                  <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="user-avatar"
                  />
                )}
                <span>
                  {user?.name || "User"}
                </span>
              </div>
              <Link to="/add-movie" className="nav-link add-movie">+ Add Movie</Link>
              <button onClick={logout} className="logout-btn">Logout</button>
            </>
          ) : (
            // Show login link if not logged in
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
