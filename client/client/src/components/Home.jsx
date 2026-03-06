import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaClipboardCheck, FaChartLine, FaArrowRight, FaCodeBranch } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white overflow-hidden relative transition-colors duration-500">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Light Mode Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[100px] dark:blur-[120px] transition-all duration-700" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-400/20 dark:bg-emerald-600/10 blur-[100px] dark:blur-[120px] transition-all duration-700" />
        <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[80px] dark:blur-[100px] transition-all duration-700" />
        
        {/* Subtle noise texture for premium feel */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="z-10 w-full flex flex-col items-center relative">
        {/* Hero Section */}
        <div className="w-full pt-16 pb-12 sm:pt-28 sm:pb-24 px-4 flex-shrink-0">
          <div className="max-w-6xl mx-auto xl:max-w-7xl text-center flex flex-col items-center">
            


            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-gray-400">
              Elevate your <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                career
              </span>{" "}
              &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400">
                skills
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Stand out in the tech world. Be an <strong className="text-slate-900 dark:text-gray-100 font-bold">exceptional</strong> developer today. Prepare, excel, and land your absolute dream role.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
              <Link to="/skills" className="px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold hover:bg-slate-800 dark:hover:bg-gray-100 transition-all duration-300 shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.15)] dark:hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:-translate-y-1 flex items-center gap-2 text-lg">
                Start Learning <FaArrowRight />
              </Link>
              <Link to="/interview" className="px-8 py-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold hover:bg-white/90 dark:hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 text-lg shadow-sm">
                Mock Interviews
              </Link>
            </div>
          </div>
        </div>

        {/* Bento Grid Features Section */}
        <div className="px-4 max-w-7xl w-full mb-24 z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 - Technical Skills */}
            <Link to="/skills" className="group relative p-8 sm:p-10 rounded-[2rem] bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-500 overflow-hidden lg:col-span-2 flex flex-col justify-end min-h-[340px] shadow-lg dark:shadow-2xl backdrop-blur-xl">
               <div className="absolute top-0 right-0 p-10 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                 <FaLaptopCode className="text-[12rem] text-blue-600 dark:text-blue-400" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 dark:from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-duration-500" />
               <div className="relative z-10 md:w-3/4">
                 <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center mb-8 border border-blue-200 dark:border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                   <FaLaptopCode className="text-2xl text-blue-600 dark:text-blue-400" />
                 </div>
                 <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors">Master Technical Skills</h3>
                 <p className="text-slate-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">Sharpen your coding skills with guided roadmaps, hands-on practice, and real-world projects suited for modern tech.</p>
                 <span className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors text-lg">
                   Explore Skills <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                 </span>
               </div>
            </Link>

            {/* Card 2 - Interviews */}
            <Link to="/interview" className="group relative p-8 sm:p-10 rounded-[2rem] bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-500 overflow-hidden flex flex-col justify-end min-h-[340px] shadow-lg dark:shadow-2xl backdrop-blur-xl">
               <div className="absolute -top-10 -right-10 p-10 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-40 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                 <FaClipboardCheck className="text-[12rem] text-emerald-600 dark:text-emerald-400" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 dark:from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-duration-500" />
               <div className="relative z-10">
                 <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-200 dark:border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                   <FaClipboardCheck className="text-2xl text-emerald-600 dark:text-emerald-400" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-200 transition-colors">Ace Interviews</h3>
                 <p className="text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">Expert guidance, extensive mock interviews, and behavioral prep.</p>
                 <span className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                   Prepare Now <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                 </span>
               </div>
            </Link>

            {/* Card 3 - Career */}
            <Link to="/career" className="group relative p-8 sm:p-10 rounded-[2rem] bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-500 overflow-hidden flex flex-col justify-end min-h-[340px] shadow-lg dark:shadow-2xl backdrop-blur-xl">
               <div className="absolute -bottom-10 -right-10 p-10 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-40 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700">
                 <FaChartLine className="text-[12rem] text-purple-600 dark:text-purple-400" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 dark:from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-duration-500" />
               <div className="relative z-10">
                 <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center mb-8 border border-purple-200 dark:border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)] dark:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                   <FaChartLine className="text-2xl text-purple-600 dark:text-purple-400" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-200 transition-colors">Accelerate Growth</h3>
                 <p className="text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">Learn actionable strategies to grow your resume and personal brand.</p>
                 <span className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold group-hover:text-purple-800 dark:group-hover:text-purple-300 transition-colors">
                   View Hub <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                 </span>
               </div>
            </Link>

            {/* Card 4 - Roadmaps */}
            <Link to="/roadmap" className="group relative p-8 sm:p-10 rounded-[2rem] bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-500 overflow-hidden lg:col-span-2 flex flex-col justify-end min-h-[340px] shadow-lg dark:shadow-2xl backdrop-blur-xl">
               <div className="absolute top-0 right-10 opacity-5 dark:opacity-10 group-hover:opacity-15 dark:group-hover:opacity-60 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700">
                 <FaCodeBranch className="text-[14rem] text-orange-500 dark:text-orange-400" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-tl from-orange-500/5 dark:from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-duration-500" />
               <div className="relative z-10 md:w-3/4">
                 <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center mb-8 border border-orange-200 dark:border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.1)] dark:shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                   <FaCodeBranch className="text-2xl text-orange-600 dark:text-orange-400" />
                 </div>
                 <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-200 transition-colors">Personalized Roadmaps</h3>
                 <p className="text-slate-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">Don't know where to start? Generate a custom learning path based on your goals and current expertise.</p>
                 <span className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold group-hover:text-orange-800 dark:group-hover:text-orange-300 transition-colors text-lg">
                   Generate Roadmap <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                 </span>
               </div>
            </Link>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="px-4 max-w-5xl w-full mb-24 relative z-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-20 dark:opacity-30 rounded-[4rem]" />
          <div className="relative bg-white/80 dark:bg-[#111116] border border-white/60 dark:border-white/10 py-16 px-6 sm:px-12 text-center rounded-[3rem] overflow-hidden shadow-xl dark:shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay pointer-events-none"></div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">Ready to Begin?</h2>
            <p className="text-lg sm:text-xl mb-12 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of developers leveling up their careers every day. Take the first step towards your dream role.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-3 bg-slate-900 text-white dark:bg-white dark:text-black py-4 px-10 rounded-2xl font-bold hover:scale-105 transition duration-300 shadow-[0_0_30px_rgba(15,23,42,0.2)] dark:shadow-[0_0_30px_rgba(255,255,255,0.2)] text-lg"
            >
              Start Your Journey <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
