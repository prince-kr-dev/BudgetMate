import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="bg-green-50 py-25 px-6 md:px-20 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Ready to Start Your Financial Journey?
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-sm md:text-base">
        Join thousands of users who are taking control of their money with
        Budget Mate. Sign up today and experience financial peace of mind.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/signup"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Sign Up Now
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
