// Home page displays movie recommendations with filtering, sorting, and voting

import React, { useEffect, useState } from "react";
import api from "../utils/api";
import MovieCard from "../components/MovieCard";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]); // List of movies
  const [genre, setGenre] = useState(""); // Selected genre filter
  const [sort, setSort] = useState("recent"); // Sort order
  const [loading, setLoading] = useState(true); // Loading state
  const { token } = useAuth(); // Get auth token

  // Fetch movies from backend with filters
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const query = `?genre=${genre}&sort=${sort}`;
      const res = await api.get(`/movies${query}`);
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch movies when filters change
  useEffect(() => {
    fetchMovies();
  }, [genre, sort]);

  // Handle upvote/downvote actions
  const handleVote = async (id, type) => {
    try {
      await api.patch(`/movies/${id}/${type}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchMovies(); // Refresh movie list after voting
    } catch (err) {
      alert("Vote failed");
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">🎬 Movie Recommendations</h1>
        <p className="home-subtitle">Discover and share amazing movies with the community</p>
      </div>

      {/* Filter and sort controls */}
      <div className="filters-section">
        <h3 className="filters-title">🔍 Filter & Sort</h3>
        <div className="filters-container">
          <div className="filter-group">
            <label className="filter-label">Genre</label>
            <select 
              className="filter-select" 
              value={genre} 
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Horror">Horror</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select 
              className="filter-select" 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="recent">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Movie grid or loading/empty state */}
      <div className="movies-grid">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : movies.length === 0 ? (
          <div className="movies-empty">
            <div className="movies-empty-icon">🎬</div>
            <div className="movies-empty-text">No movies found</div>
            <div className="movies-empty-subtext">
              {genre ? `No movies in the "${genre}" genre` : "Be the first to add a movie!"}
            </div>
          </div>
        ) : (
          // Render MovieCard for each movie
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onVote={handleVote}
              canVote={!!token}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
