// Import React hooks and dependencies
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Import CSS for styling
import "../styles/Register.css";

// Register component for user sign up
const Register = () => {
  // State to store form input values
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  // React Router hook to navigate programmatically
  const navigate = useNavigate();
  // State to store error messages
  const [error, setError] = useState("");

  // Handle input changes and update form state
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send registration data to backend API
      await axios.post("http://localhost:5000/api/auth/register", form);
      // Redirect to login page on success
      navigate("/login");
    } catch (err) {
      // Show error message if registration fails
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {/* Registration form */}
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
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
        <button type="submit">Register</button>
      </form>
      {/* Show error message if any */}
      {error && <p className="register-error">{error}</p>}
    </div>
  );
};

export default Register;