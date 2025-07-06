import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import Navbar from "./components/Navbar";

// Main App component with route definitions
const App = () => {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      {/* Navbar is always visible */}
      <Navbar />
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<Home />} />
        {/* Login page route */}
        <Route path="/login" element={<Login />} />
        {/* Add movie page (protected, redirects to login if not authenticated) */}
        <Route path="/add-movie" element={token ? <AddMovie /> : <Login />} />
        {/* OAuth callback route for Google login */}
        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>
    </BrowserRouter>
  );
};

// Handles Google OAuth redirect and token storage
const OAuthSuccess = () => {
  const { loginWithToken } = useAuth();

  useEffect(() => {
    // Parse token from URL and log in
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      loginWithToken(token);
      window.location.href = "/";
    }
  }, []);

  // Show loading/redirect UI
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: '500'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</div>
        <p>Redirecting to Movie Vault...</p>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '4px solid rgba(255,255,255,0.3)', 
          borderTop: '4px solid white', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite',
          margin: '1rem auto 0'
        }}></div>
      </div>
    </div>
  );
};

export default App;
