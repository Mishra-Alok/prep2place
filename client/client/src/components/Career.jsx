import React from 'react';
import { FaFileAlt, FaArrowRight, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Career = () => {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-72px)] w-full bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white transition-colors duration-500 relative overflow-hidden pt-12 pb-24">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-400/20 dark:bg-orange-600/10 blur-[100px] transition-all duration-700" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-400/20 dark:bg-rose-600/10 blur-[100px] transition-all duration-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="z-10 w-full max-w-6xl mx-auto px-4 relative flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-700 dark:text-gray-300">Resume Builder Pro</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">
            Build Your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 dark:from-orange-400 dark:to-rose-400">
              Dream Resume
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Craft a professional, standout resume in minutes or enhance your existing one with powerful ATS-friendly optimizations.
          </p>
        </div>

        {/* Main Content Section with Two Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mb-24">
          
          {/* Left Box: Create/Generate Resume */}
          <Link
            to="/resume-form"
            className="group relative p-8 sm:p-12 rounded-[2.5rem] bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-500 overflow-hidden flex flex-col justify-center items-center text-center min-h-[400px] shadow-lg dark:shadow-2xl backdrop-blur-xl"
          >
            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 mb-8 rounded-3xl bg-orange-100 dark:bg-orange-500/20 flex flex-shrink-0 items-center justify-center border border-orange-200 dark:border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.1)] dark:shadow-[0_0_20px_rgba(249,115,22,0.3)] group-hover:scale-110 transition-transform duration-500">
                <FaFileAlt className="text-5xl text-orange-500 dark:text-orange-400" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">Create Resume</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-8 max-w-sm">
                Easily generate a professional, structured resume from scratch using our step-by-step intuitive builder.
              </p>
              <div className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 text-lg group-hover:-translate-y-1 transform duration-300">
                Get Started <FaArrowRight />
              </div>
            </div>
          </Link>

          {/* Right Box: Enhance Your Resume (ATS Score) */}
          <Link
            to="/resume-enchancer"
            className="group relative p-8 sm:p-12 rounded-[2.5rem] bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:border-rose-500/50 dark:hover:border-rose-500/50 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-500 overflow-hidden flex flex-col justify-center items-center text-center min-h-[400px] shadow-lg dark:shadow-2xl backdrop-blur-xl"
          >
            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-bl from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 mb-8 rounded-3xl bg-rose-100 dark:bg-rose-500/20 flex flex-shrink-0 items-center justify-center border border-rose-200 dark:border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.1)] dark:shadow-[0_0_20px_rgba(244,63,94,0.3)] group-hover:scale-110 transition-transform duration-500">
                <FaChartLine className="text-5xl text-rose-500 dark:text-rose-400" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors">Enhance Resume</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-8 max-w-sm">
                Already have a resume? Upload it to boost your ATS score and get actionable feedback to stand out.
              </p>
              <div className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-rose-500 text-white font-bold hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/30 group-hover:shadow-rose-500/50 text-lg group-hover:-translate-y-1 transform duration-300">
                Improve Now <FaArrowRight />
              </div>
            </div>
          </Link>

        </div>

        {/* Bottom CTA Box */}
        <div className="w-full max-w-5xl relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 blur-3xl opacity-20 dark:opacity-30 rounded-[3rem]" />
          <div className="relative bg-white/80 dark:bg-[#111116] border border-white/60 dark:border-white/10 py-16 px-6 sm:px-12 text-center rounded-[3rem] overflow-hidden shadow-xl dark:shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay pointer-events-none"></div>
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">Ready to Take Action?</h2>
            <p className="text-lg sm:text-xl mb-10 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Kickstart your career by crafting an outstanding resume today. A great role starts with a great introduction!
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-4 px-10 rounded-2xl font-bold hover:scale-105 transition duration-300 shadow-lg text-lg border border-white/20"
            >
              Start Your Journey <FaArrowRight />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Career;
