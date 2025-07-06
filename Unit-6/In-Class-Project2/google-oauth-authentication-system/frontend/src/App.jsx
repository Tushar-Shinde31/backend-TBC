import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";

// Google OAuth client ID (replace with your own if needed)
const GOOGLE_CLIENT_ID = "173868720680-825dhu5ujggifd24m5dneg00va9kbkc9.apps.googleusercontent.com";

// Main App component
const App = () => {
  return (
    // Provide Google OAuth context to the app
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {/* Provide authentication context to the app */}
      <AuthProvider>
        <BrowserRouter>
          {/* Navigation bar */}
          <Navbar />
          {/* Define application routes */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
