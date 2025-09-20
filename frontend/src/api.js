// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://budgetmate-backend-ecwd.onrender.com", // make sure your backend uses /api
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ✅ Automatically attach token from localStorage to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
