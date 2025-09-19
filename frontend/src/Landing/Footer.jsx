import { GithubIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-6 px-6 md:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl md:text-3xl font-medium italic text-green-500">
            Budget
            <span className="bg-green-500 text-white px-1 ml-0.5 rounded-md transform skew-x-[-12deg] inline-block">
              Mate
            </span>
          </h1>
        </Link>

        {/* GitHub Link */}
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-gray-700 hover:text-green-500 transition"
        >
          <GithubIcon className="h-5 w-5 mr-2" />
          GitHub
        </a>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} BudgetMate. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
