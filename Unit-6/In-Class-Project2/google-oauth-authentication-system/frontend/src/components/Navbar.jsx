import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/Navbar.css";

// Navbar component for authentication and navigation
const Navbar = () => {
  // Get authentication state and actions from context
  const { token, user, login, logout } = useAuth();

  // Handle successful Google login
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      // Send Google credential to backend for verification
      const res = await axios.post("http://localhost:5000/api/auth/google-login", {
        credential: credentialResponse.credential,
      });

      // Get token and user from backend response
      const { token, user } = res.data;
      // Save token and user in context and localStorage
      login(token, user);
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  return (
    <nav className="navbar">
      <span className="navbar-title">OAuth Demo</span>
      <div className="navbar-right">
        {/* Show Google login button if not logged in */}
        {!token ? (
          <GoogleLogin onSuccess={handleLoginSuccess} onError={() => alert("Login Failed")} />
        ) : (
          // Show user info and logout button if logged in
          <div className="navbar-user-info">
            {user?.picture && (
              <img
                src={user.picture}
                alt="Profile"
                className="navbar-profile-img"
              />
            )}
            <span className="navbar-username">{user?.name}</span>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
