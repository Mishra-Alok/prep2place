import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-20 pb-10 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.07]" 
          style={{
            backgroundImage: `radial-gradient(circle at center, #818cf8 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Column */}
          <div className="backdrop-blur-lg bg-black/5 dark:bg-white/5 p-6 rounded-2xl border border-black/5 dark:border-white/5">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              Prep2Place
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Unlock the resources, guidance, and community you need to master tech skills, land your dream job, and accelerate your career growth.
            </p>
            <div className="flex gap-6 text-2xl">
              <a 
                href="https://www.facebook.com/alok.mishra.39750ok/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <FaFacebook />
              </a>
              {/* X (Twitter) new logo */}
              <a 
                href="https://x.com/mishraalokkk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-label="X (Twitter)">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/mishraalokk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://www.instagram.com/mishra_alokkk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://github.com/Mishra-Alok" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-black/5 dark:bg-white/5 p-6 rounded-2xl border border-black/5 dark:border-white/5">
            <h4 className="text-xl font-bold text-indigo-400 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home',     href: '/#home' },
                { label: 'Features', href: '/#features' },
                { label: 'USP',      href: '/#usp' },
                { label: 'About Us', href: '/#aboutus' },
                { label: 'Contact',  href: 'mailto:support@prep2place.com' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="backdrop-blur-lg bg-black/5 dark:bg-white/5 p-6 rounded-2xl border border-black/5 dark:border-white/10">
            <h4 className="text-xl font-bold text-indigo-400 mb-6">Contact Us</h4>
            <a
              href="mailto:support@prep2place.com"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-400 transition-colors duration-300 block mb-6"
            >
              support@prep2place.com
            </a>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent my-6"></div>
            <p className="text-gray-600 dark:text-gray-400">© 2026 Prep2Place. All Rights Reserved.</p>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent"></div>
      </div>
    </footer>
  );
};

export default Footer;
