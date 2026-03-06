import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCode, FaLaptopCode, FaChalkboardTeacher, FaDatabase, FaRobot,
  FaShieldAlt, FaServer, FaBug, FaPencilRuler, FaCloud, FaBriefcase,
  FaDesktop, FaArrowRight, FaEllipsisH
} from 'react-icons/fa';

const roles = [
  {
    name: 'SDE-1',
    route: 'SDE-1',
    description: 'Entry-level software development — DSA, problem solving & coding fundamentals.',
    icon: FaCode,
    gradient: 'from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500',
    color: 'blue',
    badge: 'Fresher',
  },
  {
    name: 'SDE-2',
    route: 'SDE-2',
    description: 'Mid-level role — system design, OOP, and advanced coding patterns.',
    icon: FaLaptopCode,
    gradient: 'from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500',
    color: 'indigo',
    badge: '2–5 yrs',
  },
  {
    name: 'SDE-3',
    route: 'SDE-3',
    description: 'Senior-level — leadership, architecture decisions & complex problem solving.',
    icon: FaChalkboardTeacher,
    gradient: 'from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500',
    color: 'purple',
    badge: '5+ yrs',
  },
  {
    name: 'Data Analyst',
    route: 'Data Analyst',
    description: 'SQL, data wrangling, statistics & business intelligence for analysts.',
    icon: FaDatabase,
    gradient: 'from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500',
    color: 'cyan',
    badge: 'Analytics',
  },
  {
    name: 'Data Scientist',
    route: 'Data Scientist',
    description: 'ML algorithms, statistics, Python & real-world data science problems.',
    icon: FaRobot,
    gradient: 'from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500',
    color: 'teal',
    badge: 'ML / AI',
  },
  {
    name: 'Cybersecurity Engineer',
    route: 'Cybersecurity Engineer',
    description: 'Network security, threat modelling, ethical hacking & vulnerability assessment.',
    icon: FaShieldAlt,
    gradient: 'from-red-500 to-red-600 dark:from-red-400 dark:to-red-500',
    color: 'red',
    badge: 'Security',
  },
  {
    name: 'DevOps Engineer',
    route: 'DevOps Engineer',
    description: 'CI/CD pipelines, Docker, Kubernetes, cloud infra & deployment automation.',
    icon: FaServer,
    gradient: 'from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500',
    color: 'orange',
    badge: 'DevOps',
  },
  {
    name: 'QA Engineer',
    route: 'QA Engineer',
    description: 'Test strategies, automation frameworks, bug tracking & quality processes.',
    icon: FaBug,
    gradient: 'from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500',
    color: 'amber',
    badge: 'Testing',
  },
  {
    name: 'UI/UX Designer',
    route: 'UI-UX Designer',
    description: 'Design thinking, Figma, user research, prototyping & usability testing.',
    icon: FaPencilRuler,
    gradient: 'from-pink-500 to-pink-600 dark:from-pink-400 dark:to-pink-500',
    color: 'pink',
    badge: 'Design',
  },
  {
    name: 'Cloud Engineer',
    route: 'Cloud Engineer',
    description: 'AWS / GCP / Azure, cloud architecture, serverless & infrastructure as code.',
    icon: FaCloud,
    gradient: 'from-sky-500 to-sky-600 dark:from-sky-400 dark:to-sky-500',
    color: 'sky',
    badge: 'Cloud',
  },
  {
    name: 'Machine Learning Engineer',
    route: 'Machine Learning Engineer',
    description: 'Model training, deployment, MLOps, deep learning & AI product engineering.',
    icon: FaBriefcase,
    gradient: 'from-violet-500 to-violet-600 dark:from-violet-400 dark:to-violet-500',
    color: 'violet',
    badge: 'Deep Learning',
  },
  {
    name: 'Full Stack Developer',
    route: 'Full Stack Developer',
    description: 'Frontend + backend, REST APIs, databases & end-to-end application building.',
    icon: FaDesktop,
    gradient: 'from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500',
    color: 'emerald',
    badge: 'Full Stack',
  },
  {
    name: 'More Roles',
    route: null,
    description: 'Explore additional specialised roles not listed above.',
    icon: FaEllipsisH,
    gradient: 'from-slate-500 to-slate-600 dark:from-slate-400 dark:to-slate-500',
    color: 'slate',
    badge: 'Explore',
  },
];

const InterviewIndex = () => {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-72px)] w-full bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white transition-colors duration-500 relative overflow-hidden py-12">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[120px] transition-all duration-700" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[120px] transition-all duration-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 relative flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-700 dark:text-gray-300">Interview Mastery</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">
            Prepare for Your Next <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Tech Interview
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 font-medium leading-relaxed max-w-3xl mx-auto">
            Pick your role and practice with curated questions, coding challenges, and expert tips — tailored to your specific career path.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mb-24">
          {roles.map((role) => {
            const Icon = role.icon;
            const to = role.route ? `/interview/${role.route}` : '/more-interviews';
            
            // Dynamic color mapping for tailwind
            // We use inline styles or specific mappings to allow Tailwind to compile them if we construct strings.
            // Since we know the colors, we can map the safely.
            const colorMapping = {
              blue: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500',
              indigo: 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500',
              purple: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30 group-hover:bg-purple-600 group-hover:text-white dark:group-hover:bg-purple-500',
              cyan: 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30 group-hover:bg-cyan-600 group-hover:text-white dark:group-hover:bg-cyan-500',
              teal: 'bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-500/30 group-hover:bg-teal-600 group-hover:text-white dark:group-hover:bg-teal-500',
              red: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30 group-hover:bg-red-600 group-hover:text-white dark:group-hover:bg-red-500',
              orange: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/30 group-hover:bg-orange-600 group-hover:text-white dark:group-hover:bg-orange-500',
              amber: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30 group-hover:bg-amber-600 group-hover:text-white dark:group-hover:bg-amber-500',
              pink: 'bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-500/30 group-hover:bg-pink-600 group-hover:text-white dark:group-hover:bg-pink-500',
              sky: 'bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/30 group-hover:bg-sky-600 group-hover:text-white dark:group-hover:bg-sky-500',
              violet: 'bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-500/30 group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-500',
              emerald: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-500',
              slate: 'bg-slate-100 dark:bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-500/30 group-hover:bg-slate-600 group-hover:text-white dark:group-hover:bg-slate-500',
            };

            const styles = colorMapping[role.color];

            return (
              <Link
                key={role.name}
                to={to}
                className="group relative p-6 rounded-3xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:border-transparent transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl dark:shadow-md dark:hover:shadow-2xl backdrop-blur-sm hover:-translate-y-1 min-h-[260px]"
              >
                {/* Gradient Strip Top */}
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${role.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
                
                {/* Background Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm transition-colors duration-300 ${styles}`}>
                      <Icon className="text-xl" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${styles.split('group-hover')[0]}`}>
                      {role.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-slate-800 dark:group-hover:text-gray-100 transition-colors">
                    {role.name}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed font-medium mb-6 flex-grow">
                    {role.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    <span>Practice Now</span>
                    <FaArrowRight className="transform translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="w-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-3xl opacity-20 dark:opacity-30 rounded-[3rem]" />
          <div className="relative bg-white/80 dark:bg-[#111116] border border-white/60 dark:border-white/10 py-16 px-6 sm:px-12 text-center rounded-[3rem] overflow-hidden shadow-xl dark:shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay pointer-events-none"></div>
            <h2 className="text-3xl sm:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">Ready to Land the Offer?</h2>
            <p className="text-lg sm:text-xl mb-10 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of developers who've successfully landed their dream roles using our curated interview prep.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-10 rounded-2xl font-bold hover:scale-105 transition duration-300 shadow-lg text-lg border border-white/20"
            >
              Start Practicing <FaArrowRight />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InterviewIndex;
