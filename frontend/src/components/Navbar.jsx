import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();

  const activeClass = "text-green-500 font-bold underline";
  const inactiveClass = "text-gray-600 hover:text-green-600";

  return (
    <nav className="fixed w-full bg-white shadow-md px-4 md:px-8 py-3 flex items-center justify-between z-30">
      {/* Logo */}
      <Link to="/dashboard">
        <h1 className="text-xl md:text-3xl font-medium italic text-green-500">
          Budget
          <span className="bg-green-500 text-white px-1 ml-0.5 rounded-md transform skew-x-[-12deg] inline-block">
            Mate
          </span>
        </h1>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${isActive ? activeClass : inactiveClass} font-semibold text-sm`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `${isActive ? activeClass : inactiveClass} font-semibold text-sm`
          }
        >
          Transactions
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `${isActive ? activeClass : inactiveClass} font-semibold text-sm`
          }
        >
          Add Transaction
        </NavLink>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Logout
        </button>

        <NavLink to="/profile">
          <img
            src={user.photoURL}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col p-4 space-y-4 transition-transform duration-300 ease-in-out
          ${isOpen ? "transform translate-x-0" : "transform translate-x-full"}`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-lg">Welcome back!</span>
          </div>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* User Profile Section */}
        <NavLink to="/profile">
          <div className="flex items-center space-x-3 py-2">
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-medium">{user.fullName}</span>
              <span className="text-sm font-medium">{user.userName}</span>
            </div>
          </div>
        </NavLink>

        {/* Menu Links */}
        <div className="flex flex-col space-y-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${isActive ? activeClass : inactiveClass} py-2`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `${isActive ? activeClass : inactiveClass} py-2`
            }
          >
            Transactions
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) =>
              `${isActive ? activeClass : inactiveClass} py-2`
            }
          >
            Add Transaction
          </NavLink>
        </div>

        {/* Logout Button */}
        <div className="pt-2">
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
