// AddMovie page allows users to submit a new movie recommendation

import React, { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/AddMovie.css";

const AddMovie = () => {
  const { token } = useAuth(); // Get auth token
  const navigate = useNavigate();

  // Form state for new movie
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    year: "",
    posterURL: ""
  });

  const [loading, setLoading] = useState(false); // Loading state for submit
  const [error, setError] = useState(""); // Error message

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Send POST request to backend to add movie
      await api.post("/movies", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/"); // Redirect to home on success
    } catch (err) {
      console.error("Error adding movie:", err);
      setError("Failed to add movie. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-movie-container">
      <div className="add-movie-header">
        <h1 className="add-movie-title">Add New Movie</h1>
        <p className="add-movie-subtitle">Share your favorite movie with the community</p>
      </div>
      
      {/* Movie submission form */}
      <form className="add-movie-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Movie Title *</label>
          <input 
            name="title" 
            placeholder="Enter movie title" 
            value={formData.title} 
            onChange={handleChange} 
            className="form-input"
            required 
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Genre *</label>
            <select 
              name="genre" 
              value={formData.genre} 
              onChange={handleChange} 
              className="form-select"
              required
            >
              <option value="">Select Genre</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Horror">Horror</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
              <option value="Documentary">Documentary</option>
              <option value="Animation">Animation</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Release Year *</label>
            <input 
              name="year" 
              placeholder="e.g., 2023" 
              value={formData.year} 
              onChange={handleChange} 
              className="form-input"
              type="number"
              min="1900"
              max={new Date().getFullYear() + 1}
              required 
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Poster URL</label>
          <input 
            name="posterURL" 
            placeholder="https://example.com/poster.jpg" 
            value={formData.posterURL} 
            onChange={handleChange} 
            className="form-input"
            type="url"
          />
          <div className="form-help-text">Optional: Add a link to the movie poster image</div>
        </div>

        {/* Show poster preview if URL is provided */}
        {formData.posterURL && (
          <div className="poster-preview">
            <img src={formData.posterURL} alt="Poster preview" onError={(e) => e.target.style.display = 'none'} />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea 
            name="description" 
            placeholder="Tell us about this movie..." 
            value={formData.description} 
            onChange={handleChange} 
            className="form-textarea"
            rows={4}
            required
          ></textarea>
        </div>

        {/* Show error if submission fails */}
        {error && (
          <div className="form-error">
            ⚠️ {error}
          </div>
        )}

        <button 
          type="submit" 
          className="form-submit-btn"
          disabled={loading}
        >
          {loading ? "Adding Movie..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
