import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaTwitter, FaStackOverflow, FaBook, FaArrowRight } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces, SiDevpost } from 'react-icons/si';

const Social = () => {
  const profiles = [
    {
      title: "LinkedIn",
      description: "Optimize your LinkedIn profile to showcase achievements and network effectively.",
      icon: <FaLinkedin className="w-8 h-8 text-[#0A66C2]" />,
      to: "/linkedin",
      glowColor: "from-blue-500/10 to-transparent",
      borderColor: "group-hover:border-blue-500/50",
      accentLine: "bg-[#0A66C2]",
      iconBg: "bg-blue-50 dark:bg-[#0A66C2]/10 border-blue-100 dark:border-[#0A66C2]/30 shadow-[#0A66C2]/20"
    },
    {
      title: "GitHub",
      description: "Enhance your GitHub profile to highlight projects, contributions, and coding expertise.",
      icon: <FaGithub className="w-8 h-8 text-gray-800 dark:text-white" />,
      to: "/github",
      glowColor: "from-gray-500/10 to-transparent",
      borderColor: "group-hover:border-gray-500/50",
      accentLine: "bg-gray-800 dark:bg-white",
      iconBg: "bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/20 shadow-gray-500/20"
    },
    {
      title: "LeetCode",
      description: "Improve your LeetCode profile to showcase problem-solving skills and coding achievements.",
      icon: <SiLeetcode className="w-8 h-8 text-[#FFA116]" />,
      to: "/leetcode",
      glowColor: "from-orange-500/10 to-transparent",
      borderColor: "group-hover:border-[#FFA116]/50",
      accentLine: "bg-[#FFA116]",
      iconBg: "bg-orange-50 dark:bg-[#FFA116]/10 border-orange-100 dark:border-[#FFA116]/30 shadow-[#FFA116]/20"
    },
    {
      title: "Twitter",
      description: "Build a strong Twitter presence to share insights, network, and stay updated.",
      icon: <FaTwitter className="w-8 h-8 text-[#1DA1F2]" />,
      to: "/twitter",
      glowColor: "from-sky-500/10 to-transparent",
      borderColor: "group-hover:border-[#1DA1F2]/50",
      accentLine: "bg-[#1DA1F2]",
      iconBg: "bg-sky-50 dark:bg-[#1DA1F2]/10 border-sky-100 dark:border-[#1DA1F2]/30 shadow-[#1DA1F2]/20"
    },
    {
      title: "Codeforces",
      description: "Enhance your Codeforces profile to showcase your competitive programming skills and rankings.",
      icon: <SiCodeforces className="w-8 h-8 text-[#1F8ACB]" />,
      to: "/codeforces",
      glowColor: "from-blue-600/10 to-transparent",
      borderColor: "group-hover:border-[#1F8ACB]/50",
      accentLine: "bg-[#1F8ACB]",
      iconBg: "bg-blue-50 dark:bg-[#1F8ACB]/10 border-blue-100 dark:border-[#1F8ACB]/30 shadow-[#1F8ACB]/20"
    },
    {
      title: "Devfolio",
      description: "Optimize your Devfolio profile to showcase hackathon projects and developer portfolio.",
      icon: <SiDevpost className="w-8 h-8 text-[#3770FF]" />,
      to: "/devfolio",
      glowColor: "from-indigo-500/10 to-transparent",
      borderColor: "group-hover:border-[#3770FF]/50",
      accentLine: "bg-[#3770FF]",
      iconBg: "bg-indigo-50 dark:bg-[#3770FF]/10 border-indigo-100 dark:border-[#3770FF]/30 shadow-[#3770FF]/20"
    },
    {
      title: "Stack Overflow",
      description: "Improve your Stack Overflow profile to highlight contributions and tech expertise.",
      icon: <FaStackOverflow className="w-8 h-8 text-[#F48024]" />,
      to: "/stackoverflow",
      glowColor: "from-orange-500/10 to-transparent",
      borderColor: "group-hover:border-[#F48024]/50",
      accentLine: "bg-[#F48024]",
      iconBg: "bg-orange-50 dark:bg-[#F48024]/10 border-orange-100 dark:border-[#F48024]/30 shadow-[#F48024]/20"
    },
    {
      title: "Portfolio",
      description: "Build a stunning personal portfolio to showcase your projects, skills, and achievements.",
      icon: <FaBook className="w-8 h-8 text-purple-500" />,
      to: "/portfolio",
      glowColor: "from-purple-500/10 to-transparent",
      borderColor: "group-hover:border-purple-500/50",
      accentLine: "bg-purple-500",
      iconBg: "bg-purple-50 dark:bg-purple-500/10 border-purple-100 dark:border-purple-500/30 shadow-purple-500/20"
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-72px)] w-full bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white transition-colors duration-500 relative overflow-hidden py-12">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-emerald-400/20 dark:bg-emerald-600/10 blur-[120px] transition-all duration-700" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[120px] transition-all duration-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 relative flex flex-col">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-700 dark:text-gray-300">Social Presence</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">
            Enhance Your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400">
              Social Profiles
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Elevate your online presence with tailored tips, optimization techniques, and platform-specific guides to stand out.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mb-20">
          {profiles.map((profile, index) => (
            <Link
              key={index}
              to={profile.to}
              className={`group relative p-6 sm:p-8 rounded-[2rem] bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 ${profile.borderColor} hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-500 overflow-hidden flex flex-col shadow-sm hover:shadow-xl dark:shadow-md dark:hover:shadow-2xl backdrop-blur-sm hover:-translate-y-1 min-h-[300px]`}
            >
              {/* Decorative Accent Line */}
              <div className={`absolute top-0 left-0 w-full h-1 ${profile.accentLine} opacity-0 group-hover:opacity-100 transform -translate-y-full group-hover:translate-y-0 transition-all duration-300`} />

              {/* Background Glow on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${profile.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  {/* Icon Container */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${profile.iconBg}`}>
                    {profile.icon}
                  </div>
                  
                  {/* Action Arrow */}
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <FaArrowRight className="text-slate-600 dark:text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white transition-colors">
                  {profile.title}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed font-medium mb-6 flex-grow">
                  {profile.description}
                </p>

                <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-bold text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white pb-0.5">Learn More</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Social;
