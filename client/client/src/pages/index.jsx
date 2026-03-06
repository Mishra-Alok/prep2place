import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaUsers, FaBrain, FaCalendarAlt, FaBook, FaArrowRight } from 'react-icons/fa';

const Index = () => {
  const features = [
    {
      title: "Skills & Roadmaps",
      description: "Master cutting-edge technical skills with personalized learning paths and expert-curated resources.",
      icon: <FaCode className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition-colors" />,
      to: "/roadmap",
      gradient: "from-blue-500/10 to-transparent dark:from-blue-500/20",
      accent: "bg-blue-500",
      borderAccent: "group-hover:border-blue-500/50",
      iconBg: "bg-blue-100 dark:bg-blue-500/20 border-blue-200 dark:border-blue-500/30",
      boxStyle: "lg:col-span-2"
    },
    {
      title: "Community",
      description: "Connect with industry leaders and innovators in a thriving professional ecosystem.",
      icon: <FaUsers className="w-8 h-8 text-emerald-500 group-hover:text-emerald-400 transition-colors" />,
      to: "/community",
      gradient: "from-emerald-500/10 to-transparent dark:from-emerald-500/20",
      accent: "bg-emerald-500",
      borderAccent: "group-hover:border-emerald-500/50",
      iconBg: "bg-emerald-100 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/30",
    },
    {
      title: "AI Tutor",
      description: "Leverage advanced AI solutions to transform your workflow and drive innovation.",
      icon: <FaBrain className="w-8 h-8 text-purple-500 group-hover:text-purple-400 transition-colors" />,
      to: "/esmoai",
      gradient: "from-purple-500/10 to-transparent dark:from-purple-500/20",
      accent: "bg-purple-500",
      borderAccent: "group-hover:border-purple-500/50",
      iconBg: "bg-purple-100 dark:bg-purple-500/20 border-purple-200 dark:border-purple-500/30",
    },
    {
      title: "Find Events",
      description: "Access exclusive industry events and high-impact networking opportunities.",
      icon: <FaCalendarAlt className="w-8 h-8 text-rose-500 group-hover:text-rose-400 transition-colors" />,
      to: "/findevents",
      gradient: "from-rose-500/10 to-transparent dark:from-rose-500/20",
      accent: "bg-rose-500",
      borderAccent: "group-hover:border-rose-500/50",
      iconBg: "bg-rose-100 dark:bg-rose-500/20 border-rose-200 dark:border-rose-500/30",
    },
    {
      title: "Personalized Resources",
      description: "Access exclusive, tailored roadmaps and resource guides for achieving your career goals.",
      icon: <FaBook className="w-8 h-8 text-cyan-500 group-hover:text-cyan-400 transition-colors" />,
      to: "/personalized-roadmap",
      gradient: "from-cyan-500/10 to-transparent dark:from-cyan-500/20",
      accent: "bg-cyan-500",
      borderAccent: "group-hover:border-cyan-500/50",
      iconBg: "bg-cyan-100 dark:bg-cyan-500/20 border-cyan-200 dark:border-cyan-500/30",
      boxStyle: "lg:col-span-2"
    }
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-[calc(100vh-72px)] bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white overflow-hidden relative transition-colors duration-500 pt-8 pb-20">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[100px] transition-all duration-700" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-400/20 dark:bg-emerald-600/10 blur-[120px] transition-all duration-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="z-10 w-full max-w-7xl mx-auto px-4 md:px-8 relative flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-700 dark:text-gray-300">Development Hub</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">
            Improve your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
              Skills
            </span>{" "}
            &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400">
              Networking
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Elevate your professional journey with our comprehensive suite of tools, curated resources, and community connections.
          </p>
        </div>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.to}
              className={`group relative p-8 sm:p-10 rounded-[2rem] bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 ${feature.borderAccent} hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-500 overflow-hidden flex flex-col justify-end min-h-[320px] shadow-lg dark:shadow-2xl backdrop-blur-xl ${feature.boxStyle || ''}`}
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Decorative Accent Line */}
              <div className={`absolute top-0 left-0 w-full h-1 ${feature.accent} opacity-0 group-hover:opacity-100 transform -translate-y-full group-hover:translate-y-0 transition-all duration-300`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  {/* Icon Container */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-sm ${feature.iconBg}`}>
                    {feature.icon}
                  </div>
                  
                  {/* Action Arrow */}
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <FaArrowRight className="text-slate-600 dark:text-white" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-slate-800 dark:group-hover:text-gray-100 transition-colors">
                  {feature.title}
                </h2>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
