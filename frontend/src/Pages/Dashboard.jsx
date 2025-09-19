import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Overview from "../components/Overview";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login"); // redirect if not logged in
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="pt-0 bg-slate-200">
      <Navbar/>
      <Overview/>
    </div>
  );
}
