// Import core React tools to create context and manage state
import { createContext, useState, useContext } from "react";

// Create the authentication context
const AuthContext = createContext();

// AuthProvider wraps part of the app that needs access to auth state
export const AuthProvider = ({ children }) => {
  // Store JWT token in state, initialized from localStorage (persists on refresh)
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Log in function: save token to state and localStorage
  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  // Log out function: clear token from state and localStorage
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  // Provide context value to children components
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context anywhere in the app
export const useAuth = () => useContext(AuthContext);
