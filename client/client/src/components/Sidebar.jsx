import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaSuitcase,
  FaCode,
  FaUserCircle,
  FaCalendarAlt,
  FaLaptopCode,
  FaShareAlt,
  FaKeyboard,
} from 'react-icons/fa';
import { SiGooglemeet } from 'react-icons/si';

const navItems = [
  { to: '/home',           icon: <FaHome />,        text: 'Home' },
  { to: '/interview',      icon: <SiGooglemeet />,   text: 'Interview' },
  { to: '/career',         icon: <FaSuitcase />,     text: 'Resume' },
  { to: '/skills',         icon: <FaCode />,         text: 'Skill Development' },
  { to: '/planyourday',    icon: <FaCalendarAlt />,  text: 'Plan Your Day' },
  { to: '/machine-coding', icon: <FaLaptopCode />,   text: 'Machine Coding' },
  { to: '/enhance-social', icon: <FaShareAlt />,     text: 'Enhance Social' },
  { to: '/typing-test',    icon: <FaKeyboard />,     text: 'Typing Skill' },
  { to: '/userprofile',    icon: <FaUserCircle />,   text: 'Profile' },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const sidebarRef = useRef(null);

  // Lock body scroll on mobile-sized screens when sidebar is open
  useEffect(() => {
    if (window.innerWidth < 768) {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar panel */}
      <aside
        ref={sidebarRef}
        className={`
          fixed top-[72px] left-0 z-40
          w-64 bg-slate-50 dark:bg-[#0A0A0A]/95 backdrop-blur-3xl
          text-slate-700 dark:text-gray-300 flex flex-col shadow-2xl md:shadow-none border-r border-slate-200/50 dark:border-white/5
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ height: 'calc(100dvh - 72px)' }}
      >
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
          
          <div className="mb-2 w-full h-2"></div>

          <nav className="space-y-1.5 flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeSidebar}
                  className={`
                    flex items-center gap-3.5 px-4 py-3 rounded-2xl
                    font-semibold text-sm transition-all duration-300 group relative overflow-hidden
                    ${isActive
                      ? 'bg-indigo-600 shadow-md shadow-indigo-500/20 text-white dark:bg-indigo-500/10 dark:text-indigo-400 dark:border dark:border-indigo-500/20'
                      : 'text-slate-600 hover:bg-white hover:shadow-sm dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white border border-transparent dark:border-transparent'
                    }
                  `}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white dark:bg-indigo-500 rounded-r-md opacity-0 hidden dark:block" />
                  )}
                  
                  {/* Hover Background Gradient */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}

                  <span className={`text-[1.1rem] transition-transform duration-300 group-hover:scale-110 relative z-10 ${isActive ? 'text-white dark:text-indigo-400' : 'text-slate-400 group-hover:text-indigo-500 dark:text-gray-500 dark:group-hover:text-indigo-400'}`}>
                    {item.icon}
                  </span>
                  <span className={`relative z-10 tracking-wide ${isActive ? '' : 'group-hover:text-slate-800 dark:group-hover:text-gray-200'}`}>
                    {item.text}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Branding block removed as requested by user */}
      </aside>
    </>
  );
};

export default Sidebar;
