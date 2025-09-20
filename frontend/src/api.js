// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://budgetmate-backend-ecwd.onrender.com", // your deployed backend
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
