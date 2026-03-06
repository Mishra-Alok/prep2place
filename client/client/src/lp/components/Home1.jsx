import React from 'react';
import landingpagevideo from "../assets/landingpagevideo.mp4";

const LandingPage = () => {
  return (
    <div id="home" className="relative min-h-screen bg-white dark:bg-[#0a0a12] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at center, #818cf8 1px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)' }} />
      </div>

      {/* Hero Section */}
      <div className="relative w-full pt-24 sm:pt-28 md:pt-36 pb-10 md:pb-20 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Badge pill */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700/50">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Your Career Partner · From Prep to Placement
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 md:mb-8 leading-tight">
            <span className="text-gray-900 dark:text-white">
              Your Path From&nbsp;
            </span>
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent">
                Preparation
              </span>
            </span>
            <span className="text-gray-900 dark:text-white">
              &nbsp;to&nbsp;
            </span>
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500 bg-clip-text text-transparent">
                Placement
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-center font-medium text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Unlock the resources, guidance, and community you need to master tech skills, build an impressive resume,
            <br className="hidden md:block" />
            ace interviews, and land your dream job — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex justify-center">
            <a
              href="/signup"
              className="inline-flex items-center gap-2 py-3 px-8 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all duration-300"
            >
              Get Started Free
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
          </div>

        </div>
      </div>

      {/* Video Section */}
      <div className="w-full px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Video Container with Gradient Border */}
          <div className="p-[2px] rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 shadow-2xl shadow-indigo-500/20">
            <div className="relative w-full rounded-[inherit] overflow-hidden bg-gray-950 shadow-inner">
              <video
                className="w-full h-auto block"
                src={landingpagevideo}
                type="video/mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
