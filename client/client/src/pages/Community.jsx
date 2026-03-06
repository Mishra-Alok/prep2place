import React from 'react';
import { FaDiscord, FaReddit, FaTwitter, FaArrowRight, FaUsers } from 'react-icons/fa';
import maps from '../assets/maps.png';

const Community = () => {
  const platforms = [
    {
      title: 'Discord Servers',
      icon: <FaDiscord className="w-8 h-8 text-[#5865F2]" />,
      color: 'indigo',
      gradient: 'from-indigo-500/10 to-transparent dark:from-[#5865F2]/20',
      accentLine: 'bg-[#5865F2]',
      iconBg: 'bg-indigo-50 dark:bg-[#5865F2]/10 border-indigo-100 dark:border-[#5865F2]/30 shadow-[#5865F2]/20',
      links: [
        { name: "The Programmer's Hangout", url: 'https://discord.com/invite/programming' },
        { name: "The Coding Den", url: 'https://discord.com/invite/code' },
        { name: "Reactiflux", url: 'https://discord.com/invite/reactiflux?source=post_page-----c673b8ab3a1c------------------------------' },
        { name: "Together C and C++", url: 'https://discord.com/invite/tccpp' },
        { name: "Python", url: 'https://discord.com/invite/python' },
        { name: "DevCord", url: 'https://discord.com/invite/devcord?source=post_page-----c673b8ab3a1c--------------------------------' },
        { name: "Chai aur Code", url: 'https://discord.com/invite/WDrH3zuWFb' },
      ]
    },
    {
      title: 'Reddit Forums',
      icon: <FaReddit className="w-8 h-8 text-[#FF4500]" />,
      color: 'orange',
      gradient: 'from-orange-500/10 to-transparent dark:from-[#FF4500]/20',
      accentLine: 'bg-[#FF4500]',
      iconBg: 'bg-orange-50 dark:bg-[#FF4500]/10 border-orange-100 dark:border-[#FF4500]/30 shadow-[#FF4500]/20',
      links: [
        { name: "Web Development", url: 'https://www.reddit.com/r/webdevelopment/' },
        { name: "Programming", url: 'https://www.reddit.com/r/programming/' },
        { name: "Machine Learning", url: 'https://www.reddit.com/r/learnmachinelearning/' },
        { name: "DevOps", url: 'https://www.reddit.com/r/devops/' },
        { name: "SideProject", url: 'https://www.reddit.com/r/SideProject/' },
        { name: "Developers India", url: 'https://www.reddit.com/r/developersIndia/' },
        { name: "Programming Humor", url: 'https://www.reddit.com/r/ProgrammerHumor/' },
      ]
    },
    {
      title: 'Twitter Communities',
      icon: <FaTwitter className="w-8 h-8 text-[#1DA1F2]" />,
      color: 'sky',
      gradient: 'from-sky-500/10 to-transparent dark:from-[#1DA1F2]/20',
      accentLine: 'bg-[#1DA1F2]',
      iconBg: 'bg-sky-50 dark:bg-[#1DA1F2]/10 border-sky-100 dark:border-[#1DA1F2]/30 shadow-[#1DA1F2]/20',
      links: [
        { name: "CodeNewbies", url: 'https://x.com/codenewbies' },
        { name: "Developer Community", url: 'https://x.com/gitconnected' },
        { name: "Indianswhocode", url: 'https://x.com/indianswhocode' },
        { name: "Web3 Community", url: 'https://x.com/taskonxyz' },
        { name: "Crypto India", url: 'https://x.com/cryptooindia' },
        { name: "Software Developer", url: 'https://x.com/i/communities/1699807431709041070' },
        { name: "DataScience", url: 'https://x.com/DataSciFact' },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-72px)] w-full bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white transition-colors duration-500 relative overflow-hidden py-12">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-400/20 dark:bg-emerald-600/10 blur-[150px] transition-all duration-700" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[150px] transition-all duration-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 relative flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-700 dark:text-gray-300">Global Network</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-slate-900 dark:text-white uppercase leading-tight">
            Join Tech <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400">
              Communities
            </span>
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-gray-300 mb-8">
            Ask Questions to anyone from anywhere in the world.
          </p>

          <div className="relative mx-auto my-12 w-full max-w-3xl">
             <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#0A0A0A] to-transparent z-10 h-full w-full pointer-events-none self-end pt-32"></div>
             <img 
               src={maps} 
               alt="Global Map" 
               className="w-full h-auto object-contain opacity-80 dark:opacity-60 drop-shadow-2xl mix-blend-multiply dark:mix-blend-screen" 
             />
          </div>

          <p className="text-lg text-slate-600 dark:text-gray-400 font-medium leading-relaxed max-w-3xl mx-auto -mt-8 relative z-20">
            Join a dynamic coding community to connect, learn, and grow with passionate 
            tech enthusiasts and professionals. Share your projects, learn in public, and seek referrals based on your achievements.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full mb-12 relative z-20">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-[2rem] bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:border-transparent dark:hover:border-transparent transition-all duration-500 overflow-hidden flex flex-col shadow-sm hover:shadow-xl dark:shadow-md dark:hover:shadow-2xl backdrop-blur-xl hover:-translate-y-1`}
            >
              {/* Decorative Accent Line */}
              <div className={`absolute top-0 left-0 w-full h-1.5 ${platform.accentLine} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Background Glow on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                  {/* Icon Container */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${platform.iconBg}`}>
                    {platform.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {platform.title}
                  </h3>
                </div>
                
                <div className="flex flex-col gap-3 flex-grow">
                  {platform.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center justify-between p-3 rounded-xl hover:bg-white dark:hover:bg-white/10 transition-colors duration-300 border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                    >
                      <span className="text-slate-700 dark:text-gray-300 font-medium group-hover/link:text-slate-900 dark:group-hover/link:text-white transition-colors flex items-center gap-2">
                         <FaUsers className="text-slate-400 dark:text-gray-500 opacity-50 text-sm" />
                         {link.name}
                      </span>
                      <FaArrowRight className="text-slate-400 dark:text-gray-500 text-sm opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                    </a>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Community;
