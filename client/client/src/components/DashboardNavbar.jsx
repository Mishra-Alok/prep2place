import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL, { SERVER_URL } from '../utils/apiConfig';
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaChevronDown, FaLock } from 'react-icons/fa';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import LogoIcon from './LogoIcon';

const DashboardNavbar = ({ isOpen, setIsOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await axios.get(`${API_BASE_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser({
          ...response.data.data,
          fullName: `${response.data.data.firstName || ''} ${response.data.data.lastName || ''}`.trim() || 'User',
          email: response.data.data.email || ''
        });
      } catch (error) {
        console.error("Error fetching header profile", error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const menuItems = [
    { icon: <FaUserCircle className="text-indigo-500" />, label: 'My Profile', link: '/userprofile' },
    { 
      icon: isDarkMode ? <FiSun className="text-amber-500" /> : <FiMoon className="text-indigo-600" />, 
      label: isDarkMode ? 'Light Mode' : 'Dark Mode', 
      onClick: toggleTheme 
    }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 h-[72px] z-50 transition-all duration-500 flex items-center justify-between px-4 lg:px-8 border-b ${
      scrolled 
        ? 'bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-slate-200/50 dark:border-white/5 shadow-sm shadow-slate-200/20 dark:shadow-none' 
        : 'bg-white/40 dark:bg-transparent backdrop-blur-md border-transparent'
    }`}>
      {/* Left side: Logo and Hamburger */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 rounded-xl transition-all duration-300 focus:outline-none bg-slate-50 hover:bg-slate-100 text-slate-600 dark:bg-white/5 dark:hover:bg-white/10 dark:text-gray-300 active:scale-95"
        >
          {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>

        <Link to="/home" className="flex items-center gap-3.5 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-[14px] bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 shadow-lg shadow-indigo-500/30 overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
             {/* Glossy overlay effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
             <LogoIcon className="w-6 h-6 text-white drop-shadow-md z-10 relative" />
          </div>
          <div className="hidden sm:flex flex-col justify-center select-none pt-0.5">
             <span className="font-extrabold text-[1.35rem] tracking-tight leading-none text-slate-800 dark:text-white flex items-baseline">
                Prep<span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-500 ml-0.5 mr-0.5">2</span>Place
             </span>
             <span className="text-[0.6rem] font-bold text-slate-400 dark:text-gray-500 tracking-[0.25em] uppercase leading-none mt-1">
                Your Career Platform
             </span>
          </div>
        </Link>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="relative flex items-center gap-3" ref={dropdownRef}>
        
        {/* Quick Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 bg-slate-50 hover:bg-slate-100 text-slate-600 dark:bg-white/5 dark:hover:bg-white/10 dark:text-gray-300 active:scale-95"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <FiSun size={18} className="hover:text-amber-400 transition-colors" /> : <FiMoon size={18} className="hover:text-indigo-600 transition-colors" />}
        </button>

        {/* Profile Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-xl transition-all duration-300 focus:outline-none border ${
            dropdownOpen
              ? 'bg-white dark:bg-[#111116] border-slate-200 dark:border-white/10 shadow-md ring-2 ring-indigo-500/20'
              : 'bg-white/50 dark:bg-white/5 border-slate-200/50 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/10'
          }`}
        >
          {user?.profilePic ? (
            <img src={user.profilePic.startsWith('http') ? user.profilePic : `${SERVER_URL}${user.profilePic}`} alt="Profile" className="w-8 h-8 rounded-[10px] object-cover shadow-sm" />
          ) : (
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-1 ring-white/20">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
          )}
          <span className="hidden md:block text-sm font-bold max-w-[120px] truncate text-slate-700 dark:text-gray-200">
            {user?.fullName || 'User'}
          </span>
          <FaChevronDown className={`text-slate-400 text-[10px] hidden sm:block transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-indigo-500' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-[#111116] rounded-2xl shadow-2xl shadow-slate-200/20 dark:shadow-none border border-slate-100 dark:border-white/10 p-2 top-full transform origin-top-right transition-all duration-200 z-50">
            <Link
              to="/userprofile"
              onClick={() => setDropdownOpen(false)}
              className="p-3 flex items-center gap-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
            >
              {user?.profilePic ? (
                <img src={user.profilePic.startsWith('http') ? user.profilePic : `${SERVER_URL}${user.profilePic}`} alt="Profile" className="w-12 h-12 rounded-[14px] object-cover ring-2 ring-transparent group-hover:ring-indigo-500/30 transition-all" />
              ) : (
                <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl ring-2 ring-transparent group-hover:ring-indigo-500/30 transition-all">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
              )}
              <div className="flex flex-col truncate">
                <span className="font-bold text-slate-900 dark:text-white truncate">{user?.fullName || 'User'}</span>
                <span className="text-xs font-medium text-slate-500 dark:text-gray-400 truncate mt-0.5">{user?.email || 'user@email.com'}</span>
              </div>
            </Link>

            <div className="h-px bg-slate-100 dark:bg-white/5 mx-2 my-2"></div>

            <div className="px-1 py-1 space-y-1">
              {menuItems.map((item, index) => {
                const content = (
                  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    item.locked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-gray-300 cursor-pointer active:scale-[0.98]'
                  }`}>
                    <span className="text-base opacity-90 flex items-center justify-center w-6">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    {item.locked && <FaLock className="text-slate-400 text-xs" />}
                  </div>
                );

                if (item.onClick) {
                  return (
                    <div key={index} className="sm:hidden" onClick={() => { item.onClick(); setDropdownOpen(false); }}>
                      {content}
                    </div>
                  );
                }

                if (item.link && !item.locked) {
                  return <Link key={index} to={item.link} onClick={() => setDropdownOpen(false)}>{content}</Link>;
                }

                return <div key={index}>{content}</div>;
              })}
            </div>

            <div className="h-px bg-slate-100 dark:bg-white/5 mx-2 my-2"></div>

            <div className="px-1 pb-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all active:scale-[0.98]"
              >
                <div className="w-6 flex justify-center"><FaSignOutAlt className="text-base" /></div>
                <span>Sign out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardNavbar;
