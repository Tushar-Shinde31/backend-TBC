// MovieCard component displays a single movie's details, voting buttons, and comments

import { useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import "../styles/MovieCard.css";
import "../styles/CommentSection.css";

// Main MovieCard component receives movie data, vote handler, and voting permission
const MovieCard = ({ movie, onVote, canVote }) => {
  return (
    <div className="movie-card">
      {/* Movie header with poster and info */}
      <div className="movie-header">
        {movie.posterURL && (
          <img src={movie.posterURL} alt="poster" className="movie-poster" />
        )}
        <div className="movie-info">
          <h3 className="movie-title">
            {movie.title} <span className="movie-year">({movie.year})</span>
          </h3>
          <span className="movie-genre">{movie.genre}</span>
          <p className="movie-description">{movie.description}</p>
          <p className="movie-author">
            <strong>By:</strong> {movie.createdBy?.name}
          </p>
        </div>
      </div>
      {/* Voting section with upvote and downvote buttons */}
      <div className="vote-section">
        <button 
          className="vote-btn upvote" 
          onClick={() => onVote(movie._id, "upvote")} 
          disabled={!canVote}
        >
          👍 <span className="vote-count">{movie.upvotes?.length || 0}</span>
        </button>
        <button 
          className="vote-btn downvote" 
          onClick={() => onVote(movie._id, "downvote")} 
          disabled={!canVote}
        >
          👎 <span className="vote-count">{movie.downvotes?.length || 0}</span>
        </button>
      </div>
      {/* Comment section for the movie */}
      <CommentSection movieId={movie._id} />
    </div>
  );
};

// CommentSection handles displaying and posting comments for a movie
const CommentSection = ({ movieId }) => {
  const { token } = useAuth(); // Get auth token from context
  const [comments, setComments] = useState([]); // List of comments
  const [text, setText] = useState(""); // New comment text

  // Fetch comments from backend
  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${movieId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Comment fetch failed");
    }
  };

  // Post a new comment to backend
  const postComment = async () => {
    try {
      await api.post(`/comments/${movieId}`, { text }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setText(""); // Clear input
      fetchComments(); // Refresh comments
    } catch (err) {
      alert("Post failed");
    }
  };

  // Fetch comments when component mounts
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="comment-section">
      <h4>💬 Comments</h4>
      <div className="comment-list">
        {/* Show message if no comments */}
        {comments.length === 0 ? (
          <div className="no-comments">No comments yet. Be the first to comment!</div>
        ) : (
          // Render each comment
          comments.map((c) => (
            <div key={c._id} className="comment-item">
              <div className="comment-author">{c.userId.name}</div>
              <p className="comment-text">{c.text}</p>
            </div>
          ))
        )}
      </div>
      {/* Show comment input if user is logged in */}
      {token && (
        <div className="comment-form">
          <input
            type="text"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="comment-input"
          />
          <button 
            onClick={postComment} 
            className="comment-submit-btn"
            disabled={!text.trim()}
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
