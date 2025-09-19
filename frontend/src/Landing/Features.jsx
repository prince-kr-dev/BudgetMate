import {
  CirclePlus,
  CircleUserRound,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import React from "react";

const features = [
  {
    logo: <LayoutDashboard className="h-12 w-12 text-green-500" />,
    title: "Insightful Dashboard",
    description:
      "Track your spending, income, and savings with an intuitive overview. Visualize your financial health at a glance.",
  },
  {
    logo: <ListChecks className="h-12 w-12 text-green-500" />,
    title: "Effortless Transactions",
    description:
      "Categorize and manage all your transactions with smart filtering and detailed reporting for clear financial tracking.",
  },
  {
    logo: <CirclePlus className="h-12 w-12 text-green-500" />,
    title: "Quick Add Transactions",
    description:
      "Log new expenses or income in seconds with a streamlined entry process designed for speed and convenience.",
  },
  {
    logo: <CircleUserRound className="h-12 w-12 text-green-500" />,
    title: "Personalized Profile",
    description:
      "Customize your financial goals, settings, and view your progress over time to stay on track.",
  },
];

const Features = () => {
  return (
    <section className="py-12 px-6 md:px-20 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border border-green-300 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gray-50 flex flex-col items-center text-center"
          >
            {/* Icon */}
            <div className="mb-4">{feature.logo}</div>
            {/* Title */}
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            {/* Description */}
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
