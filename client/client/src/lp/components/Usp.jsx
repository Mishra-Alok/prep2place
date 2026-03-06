import React from 'react';
import { FaCheckCircle, FaLaptopCode, FaRegHandshake, FaUsers, FaRegLightbulb, FaChartLine, FaShieldAlt, FaCog, FaRegClock } from 'react-icons/fa';

const usps = [
  {
    Icon: FaCheckCircle,
    title: "Proven Performance",
    description: "We provide data-driven insights to enhance your skills, ensuring you stay ahead of the competition.",
  },
  {
    Icon: FaLaptopCode,
    title: "Tech-First Approach",
    description: "Stay up to date with the latest in tech trends and industry standards through personalized roadmaps.",
  },
  {
    Icon: FaRegHandshake,
    title: "Industry Connections",
    description: "Join a vast community of professionals and recruiters to help you network and grow in your career.",
  },
  {
    Icon: FaUsers,
    title: "Collaborative Learning",
    description: "Benefit from collaborative learning through workshops, events, and online communities.",
  },
  {
    Icon: FaRegLightbulb,
    title: "Smart Insights",
    description: "AI-driven insights to help you understand your strengths and areas for improvement.",
  },
  {
    Icon: FaChartLine,
    title: "Growth-Oriented",
    description: "Receive personalized growth recommendations to boost your career trajectory.",
  },
  {
    Icon: FaShieldAlt,
    title: "Data Security",
    description: "Rest easy knowing your personal information and work data are secure with our top-tier encryption.",
  },
  {
    Icon: FaCog,
    title: "Customizable Tools",
    description: "Our platform offers customizable features that allow you to tailor your career journey.",
  },
  {
    Icon: FaRegClock,
    title: "Save Time",
    description: "We help you streamline your job search and skill-building efforts, saving you valuable time.",
  },
];

const Usp = () => {
  return (
    <div id="usp" className="w-full py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.07]" 
          style={{
            backgroundImage: `radial-gradient(circle at center, #818cf8 1px, transparent 2px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/15 rounded-full filter blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/15 rounded-full filter blur-3xl animate-blob animation-delay-2000" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            Why Choose Prep2Place
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {usps.map((usp, index) => (
            <div
              key={index}
              className="group relative p-[2px] rounded-2xl bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-emerald-500/20 hover:from-indigo-500/40 hover:via-violet-500/40 hover:to-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-2xl relative overflow-hidden h-full border border-gray-200 dark:border-gray-700">
                {/* Icon Container */}
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 rounded-full blur-xl transform group-hover:scale-110 transition-transform duration-300" />
                  <div className="relative flex justify-center items-center">
                    <usp.Icon className="text-4xl text-indigo-500 transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 group-hover:text-indigo-500 transition-colors duration-300">
                  {usp.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {usp.description}
                </p>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-500/40 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Usp;
