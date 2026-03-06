import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import LogoIcon from '../../components/LogoIcon';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-2 ${scrolled ? 'mt-0' : 'mt-4'}`}>
      <div className={`max-w-7xl mx-auto rounded-2xl backdrop-blur-xl border border-black dark:border-gray-700 transition-all duration-300 ${
        scrolled 
          ? 'bg-white dark:bg-gray-800/95 dark:bg-gray-900/95 shadow-lg shadow-gray-200 dark:shadow-none' 
          : 'bg-white dark:bg-gray-800/80 dark:bg-gray-900/80'
      }`}>
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <LogoIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
            <span className="font-bold text-lg text-gray-800 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Prep2Place
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden relative w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            {/* top line */}
            <span
              className={`absolute w-5 h-[2px] transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0 bg-gray-800 dark:bg-white dark:bg-gray-800' : '-translate-y-[6px] bg-gray-600 dark:bg-gray-300'}`}
            />
            {/* middle line */}
            <span
              className={`absolute w-5 h-[2px] transform transition-all duration-300 ${isOpen ? 'opacity-0 bg-gray-800 dark:bg-white dark:bg-gray-800' : 'opacity-100 bg-gray-600 dark:bg-gray-300'}`}
            />
            {/* bottom line */}
            <span
              className={`absolute w-5 h-[2px] transform transition-all duration-300 ${isOpen ? '-rotate-45 translate-y-0 bg-gray-800 dark:bg-white dark:bg-gray-800' : 'translate-y-[6px] bg-gray-600 dark:bg-gray-300'}`}
            />
          </button>

          {/* Desktop & Mobile Menu */}
          <div className={`lg:flex ${
            isOpen 
              ? 'block absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl border-gray-200 dark:border-gray-800 border shadow-lg' 
              : 'hidden'
          }`}>
            <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-1 p-4 lg:p-0">
              {['Home', 'Features', 'USP', 'About Us'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li className="flex items-center justify-center lg:justify-start">
                <button
                  onClick={toggleTheme}
                  className="p-2 lg:ml-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </li>
              <li>
                <a
                  href="/signin"
                  className="block px-6 py-2 ml-2 mt-2 lg:mt-0 text-center text-white rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 font-semibold shadow-lg shadow-indigo-500/20"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Removed <style jsx> block because Tailwind @apply inside JSX styles is not supported by the Vite + Tailwind setup.
          Hamburger line positioning and animations are handled via Tailwind utility classes on the spans above. */}
    </nav>
  );
};

export default Navbar;
