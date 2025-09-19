import React from "react";

const InfoSections = () => {
  return (
    <div className="space-y-10">
      {/* Section 1 */}
      <section className="bg-green-50 text-center py-20 px-6 md:px-20">
        <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
          Your Financial Partner
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Budget Mate simplifies personal finance, empowering you to make
          informed decisions. From daily spending to long-term savings, we
          provide the tools you need to build a secure financial future.
        </p>
      </section>

      {/* Section 2 */}
      <section className="bg-white text-center py-12 px-6 md:px-20">
        <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
          Powerful Features to Help You Thrive
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Explore the core functionalities designed to make your financial life
          easier and more efficient.
        </p>
      </section>
    </div>
  );
};

export default InfoSections;
