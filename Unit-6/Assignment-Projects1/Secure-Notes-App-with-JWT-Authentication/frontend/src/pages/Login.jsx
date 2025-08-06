import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // State for form fields
  const [form, setForm] = useState({
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

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send login request to backend
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      // Log in user and redirect to dashboard
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
