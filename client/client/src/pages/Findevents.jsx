import React from 'react';
import { FaCalendarCheck, FaLightbulb, FaLaptopCode, FaPaintBrush, FaArrowRight } from 'react-icons/fa';
import Globe1 from '../assets/Globe1.png';
import Globe2 from '../assets/Globe2.png';

const Findevents = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-72px)] w-full bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white transition-colors duration-500 relative overflow-hidden py-12">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 blur-[150px] transition-all duration-700" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/10 blur-[150px] transition-all duration-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 relative flex flex-col items-center">
        
        {/* Decorative Globes */}
        <img
          src={Globe1}
          alt="Globe Decorative"
          className="absolute -top-10 -left-10 w-64 h-64 object-contain opacity-40 dark:opacity-20 hidden lg:block animate-pulse mix-blend-multiply dark:mix-blend-screen"
          style={{ animationDuration: '4s' }}
        />
        <img
          src={Globe2}
          alt="Globe Decorative"
          className="absolute bottom-10 -right-10 w-72 h-72 object-contain opacity-40 dark:opacity-20 hidden lg:block animate-pulse mix-blend-multiply dark:mix-blend-screen"
          style={{ animationDuration: '5s', animationDelay: '1s' }}
        />

        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-700 dark:text-gray-300">Discover Opportunities</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white uppercase leading-tight">
            Events & <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
              Pro Tips
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 font-medium leading-relaxed">
            Discover the latest tech events, stay informed on industry trends, and elevate your skills with curated resources.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-12 relative z-20">
          
          {/* Card 1 */}
          <div className="group relative p-8 rounded-[2rem] bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-500 overflow-hidden flex flex-col shadow-sm hover:shadow-xl dark:shadow-md dark:hover:shadow-2xl backdrop-blur-xl hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent dark:from-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-sm">
                  <FaCalendarCheck />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Find Hackathons</h2>
              </div>
              <ul className="space-y-3">
                {[
                  { n: 'DevFolio', u: 'https://devfolio.co/discover' },
                  { n: 'Unstop', u: 'https://unstop.com/hackathons' },
                  { n: 'Major League Hacking', u: 'https://mlh.io/' },
                  { n: 'Devpost', u: 'https://devpost.com/' },
                  { n: 'Hackalist', u: 'https://www.hackalist.org/' }
                ].map((link, i) => (
                  <li key={i}>
                    <a href={link.u} target="_blank" rel="noopener noreferrer" className="group/link flex items-center justify-between p-3 rounded-xl hover:bg-white dark:hover:bg-white/10 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10">
                      <span className="text-slate-700 dark:text-gray-300 font-medium group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400">{link.n}</span>
                      <FaArrowRight className="text-slate-400 text-sm opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:text-blue-500 group-hover/link:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative p-8 rounded-[2rem] bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-500 overflow-hidden flex flex-col shadow-sm hover:shadow-xl dark:shadow-md dark:hover:shadow-2xl backdrop-blur-xl hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent dark:from-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-sm">
                  <FaLightbulb />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Stay Updated</h2>
              </div>
              <ul className="space-y-3">
                {[
                  { n: 'Daily Dev', u: 'https://daily.dev/' },
                  { n: 'Stack Overflow', u: 'https://stackoverflow.com/' },
                  { n: 'LinkedIn', u: 'https://in.linkedin.com/' },
                  { n: 'Product Hunt', u: 'https://www.producthunt.com/' },
                  { n: 'Join Communities', u: '/community' }
                ].map((link, i) => (
                  <li key={i}>
                    <a href={link.u} target={link.u.startsWith('/') ? "_self" : "_blank"} rel="noopener noreferrer" className="group/link flex items-center justify-between p-3 rounded-xl hover:bg-white dark:hover:bg-white/10 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10">
                      <span className="text-slate-700 dark:text-gray-300 font-medium group-hover/link:text-cyan-600 dark:group-hover/link:text-cyan-400">{link.n}</span>
                      <FaArrowRight className="text-slate-400 text-sm opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:text-cyan-500 group-hover/link:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative p-8 rounded-[2rem] bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-500 overflow-hidden flex flex-col shadow-sm hover:shadow-xl dark:shadow-md dark:hover:shadow-2xl backdrop-blur-xl hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent dark:from-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-sm">
                  <FaLaptopCode />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Start Coding Prep</h2>
              </div>
              <ul className="space-y-3">
                {[
                  { n: 'GeeksForGeeks', u: 'https://www.geeksforgeeks.org/' },
                  { n: 'Take You Forward', u: 'https://takeuforward.org/' },
                  { n: 'InterviewBit', u: 'https://www.interviewbit.com/practice/' },
                  { n: 'CodeChef', u: 'https://www.codechef.com/' },
                  { n: 'LeetCode', u: 'https://leetcode.com/problemset/' }
                ].map((link, i) => (
                  <li key={i}>
                    <a href={link.u} target="_blank" rel="noopener noreferrer" className="group/link flex items-center justify-between p-3 rounded-xl hover:bg-white dark:hover:bg-white/10 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10">
                      <span className="text-slate-700 dark:text-gray-300 font-medium group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400">{link.n}</span>
                      <FaArrowRight className="text-slate-400 text-sm opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:text-emerald-500 group-hover/link:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group relative p-8 rounded-[2rem] bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-500 overflow-hidden flex flex-col shadow-sm hover:shadow-xl dark:shadow-md dark:hover:shadow-2xl backdrop-blur-xl hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent dark:from-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-sm">
                  <FaPaintBrush />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">For UI/UX</h2>
              </div>
              <ul className="space-y-3">
                {[
                  { n: 'Easy UI', u: 'https://www.easyui.pro/templates' },
                  { n: 'Magic UI', u: 'https://magicui.design/' },
                  { n: 'Figma', u: 'https://www.figma.com/' },
                  { n: 'Eraser.io', u: 'https://app.eraser.io/' },
                  { n: 'Whimsical', u: 'https://whimsical.com/' }
                ].map((link, i) => (
                  <li key={i}>
                    <a href={link.u} target="_blank" rel="noopener noreferrer" className="group/link flex items-center justify-between p-3 rounded-xl hover:bg-white dark:hover:bg-white/10 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10">
                      <span className="text-slate-700 dark:text-gray-300 font-medium group-hover/link:text-purple-600 dark:group-hover/link:text-purple-400">{link.n}</span>
                      <FaArrowRight className="text-slate-400 text-sm opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:text-purple-500 group-hover/link:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Findevents;
