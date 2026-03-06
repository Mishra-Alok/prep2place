import React from 'react';

const AboutUs = () => {
  return (
    <div id="aboutus" className="relative bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-200 py-32 overflow-hidden">
      {/* Dot Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at center, #818cf8 1px, transparent 2px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* About Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            About Prep2Place
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto rounded-full mb-12"></div>

          <div className="max-w-4xl mx-auto backdrop-blur-lg bg-black/5 dark:bg-white/5 p-8 rounded-2xl border border-black/5 dark:border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-indigo-500">What we provide</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              Prep2Place is a cutting-edge platform designed to empower individuals at any stage of their tech journey. Whether you're just starting out, a first-year college student, or a recent high school graduate, we provide personalized roadmaps and rich resources to guide you through in-demand technology streams like Web Development, App Development, Web3, DevOps, Data Science, and AI/ML. Our tailored approach ensures you master essential skills while staying focused on your career goals.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed hidden md:block">
              But we don't stop there. Prep2Place goes beyond just learning—our platform offers AI-powered analytics to help you prepare for interviews and optimize your coding performance. We help you craft an impressive resume, enhance your portfolio, and connect with real-world opportunities. With access to a supportive community through Discord, Telegram, and social media channels, you'll stay connected with industry trends, hackathons, open-source projects, and internships that will fast-track your career growth.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default AboutUs;
