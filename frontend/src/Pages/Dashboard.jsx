import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Overview from "../components/Overview";

export default function Dashboard() {
  const { user, isAuthLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthLoaded && !user) {
      navigate("/login"); // redirect only after auth is loaded
    }
  }, [user, isAuthLoaded, navigate]);

  if (!isAuthLoaded || !user) return null; // wait until auth state is loaded

  return (
    <div className="pt-0 bg-slate-200">
      <Navbar />
      <Overview />
    </div>
  );
}
