import React from "react";
import { Link } from "react-router-dom";
import thumbnail from "../assets/thumbnail.png"

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-30">
      {/* Text Section */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Take Control of Your Finances
        </h1>
        <p className="text-gray-600 text-lg">
          Budget Mate makes managing your money simple and stress-free. Track
          spending, set goals, and achieve financial freedom with ease.
        </p>
        <div className="flex justify-center md:justify-start gap-4">
          <Link
            to="/signup"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center bg-green-200 p-4 rounded-2xl hover:shadow-xl transition-all">
        <img
          src={thumbnail}
          alt="Budget Mate dashboard"
          className="w-full max-w-xl rounded-lg shadow-xl"
        />
      </div>
    </section>
  );
};

export default Hero;
