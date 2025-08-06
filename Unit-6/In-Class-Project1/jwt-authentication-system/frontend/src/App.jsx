// Import React Router components for routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import page components
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// Import Navbar component
import Navbar from "./components/Navbar";
// Import AuthProvider to provide authentication context
import { AuthProvider } from "./context/AuthContext";

// Main App component that sets up routing and context
const App = () => {
  return (
    // Provide authentication context to the entire app
    <AuthProvider>
      {/* Set up client-side routing */}
      <BrowserRouter>
        {/* Show the navigation bar on all pages */}
        <Navbar />
        <Routes>
          {/* Dashboard page (protected) */}
          <Route path="/" element={<Dashboard />} />
          {/* Registration page */}
          <Route path="/register" element={<Register />} />
          {/* Login page */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;