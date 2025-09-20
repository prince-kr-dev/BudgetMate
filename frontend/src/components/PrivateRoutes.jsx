import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, isAuthLoaded } = useAuth();

  // Wait until auth state is loaded
  if (!isAuthLoaded) return null;

  // Redirect if not logged in
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
