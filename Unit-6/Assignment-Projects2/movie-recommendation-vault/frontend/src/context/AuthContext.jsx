// AuthContext provides authentication state and actions to the app

import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext();

// AuthProvider wraps the app and manages user authentication state
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null); // JWT token
  const [user, setUser] = useState(null); // User info

  // Fetch user info from backend using token
  const fetchUserInfo = async (userId) => {
    try {
      const response = await api.get(`/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      // Fallback to basic user info from token if backend fails
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ id: payload.id });
    }
  };

  // Update user info when token changes
  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      fetchUserInfo(payload.id);
    } else {
      setUser(null);
    }
  }, [token]);

  // Log in and store token
  const loginWithToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Log out and clear token
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);
