// Import React hooks and dependencies
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Import authentication context
import { useAuth } from "../context/AuthContext";
// Import CSS for styling
import "../styles/Login.css";

// Login component for user authentication
const Login = () => {
  // State to store form input values
  const [form, setForm] = useState({ email: "", password: "" });
  // State to store error messages
  const [error, setError] = useState("");
  // Get login function from AuthContext
  const { login } = useAuth();
  // React Router hook to navigate programmatically
  const navigate = useNavigate();

  // Handle input changes and update form state
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send login data to backend API
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      // Store token in context/localStorage
      login(res.data.token);
      // Redirect to dashboard on success
      navigate("/");
    } catch (err) {
      // Show error message if login fails
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {/* Login form */}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {/* Show error message if any */}
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default Login;