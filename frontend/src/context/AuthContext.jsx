import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  // ✅ Rehydrate token & user from localStorage on page load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser && storedUser !== "undefined") {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setIsAuthLoaded(true);
  }, []);

  // ✅ Login
  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const userData = res.data.data;
      const token = res.data.token;

      setUser(userData);
      setToken(token);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  // ✅ Signup
  const signup = async ({ email, userName, password }) => {
    try {
      const res = await api.post("/auth/signup", { email, userName, password });
      const userData = res.data.data;
      const token = res.data.token;

      setUser(userData);
      setToken(token);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        signup,
        isAuthLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
