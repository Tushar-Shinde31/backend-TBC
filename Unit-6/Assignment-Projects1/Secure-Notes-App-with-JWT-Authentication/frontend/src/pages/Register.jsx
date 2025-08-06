import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Register.css";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // State for form fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // State for error messages
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle form submission for registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send registration request to backend
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      // Log in user and redirect to dashboard
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="register-error">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
