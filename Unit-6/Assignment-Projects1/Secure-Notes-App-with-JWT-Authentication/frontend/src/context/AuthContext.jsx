import { createContext, useContext, useState, useEffect } from "react";

// Create a context for authentication state
const AuthContext = createContext();

// AuthProvider wraps the app and provides authentication state and functions
export const AuthProvider = ({ children }) => {
  // Initialize token and user from localStorage if available
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Login function: saves token and user to state and localStorage
  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Logout function: clears token and user from state and localStorage
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Provide token, user, login, and logout to children components
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);
