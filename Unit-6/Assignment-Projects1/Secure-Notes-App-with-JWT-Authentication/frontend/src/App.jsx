import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import { AuthProvider } from "./context/AuthContext";

// Main App component sets up routing and authentication provider
const App = () => {
  return (
    // Wrap the app with AuthProvider to provide authentication state
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar is always visible */}
        <Navbar />
        {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
