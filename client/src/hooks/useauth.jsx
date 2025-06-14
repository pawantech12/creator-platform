import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  // Store token in local storage and update state
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Fetch user data using token
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      if (error.response?.status === 401) {
        logout(); // invalid/expired token
      }
    }
  };

  // Login handler
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/login`,
        { email, password }
      );
      const { token } = res.data;
      storeTokenInLS(token);
      await fetchUserData(token); // fetch user data after storing token
      return true;
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      return false;
    }
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Fetch user when token is set (on mount or token change)
  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, storeTokenInLS }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
