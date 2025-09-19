import { createContext, useContext, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // ✅ Initialize token and user directly from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        return JSON.parse(storedUser);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("user");
        return null;
      }
    }
    return null;
  });

  // ✅ Login
  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.token && res.data.data) {
        const userData = res.data.data;

        setUser(userData);
        setToken(res.data.token);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        navigate("/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
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
      // navigate("/login");
      window.location.href = "/";
    }
  };

  // ✅ Signup
  const signup = async ({ email, userName, password }) => {
    try {
      const res = await api.post("/auth/signup", { email, userName, password });

      if (res.data.token && res.data.data) {
        const userData = res.data.data;

        setUser(userData);
        setToken(res.data.token);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        navigate("/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const dashboardData = async () => {
    try {
      const res = await api.get("/transactions/dashboard");
      return res.data;
    } catch (error) {
      console.error("Failed to load:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to load:");
    }
  };

  // ✅ FIXED Edit profile
  const editUserProfile = async (profile) => {
    try {
      const res = await api.put("/profile/edit", profile);

      // backend should return updated user object
      const updatedUser = res.data.updatedUser || res.data.user || res.data;

      // update context + localStorage
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      console.error("Failed to update:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update:");
      throw error;
    }
  };

  const addTransaction = async (allData) => {
    try {
      await api.post("/transactions", allData);
  
      // ✅ Refetch and return updated dashboard data
      const updated = await dashboardData();
      return updated;
    } catch (error) {
      console.error("Failed to add transaction:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add transaction");
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
        dashboardData,
        editUserProfile,
        addTransaction
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
