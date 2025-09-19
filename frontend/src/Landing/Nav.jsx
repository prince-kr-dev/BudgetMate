import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="px-6 md:px-20 flex items-center justify-between py-3 border-b border-green-100 ">
      <Link to="/">
        <h1 className="text-xl md:text-3xl font-medium italic text-green-500">
          Budget
          <span className="bg-green-500 text-white px-1 ml-0.5 rounded-md transform skew-x-[-12deg] inline-block">
            Mate
          </span>
        </h1>
      </Link>
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="hover:bg-green-200 px-3 py-1 text-md font-medium rounded-md cursor-pointer transition-all"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-green-500 hover:bg-green-600 px-3 py-1 text-md font-medium rounded-md cursor-pointer transition-all text-white"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Nav;
