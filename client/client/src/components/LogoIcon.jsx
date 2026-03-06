import React from 'react';

const LogoIcon = ({ className = "w-8 h-8", glow = false }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={glow ? { filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.2))' } : {}}
    >
      <path d="M12 2L2 7L12 12L22 7L12 2Z" />
      <path d="M2 17L12 22L22 17" fillOpacity="0.4" />
      <path d="M2 12L12 17L22 12" fillOpacity="0.7" />
    </svg>
  );
};

export default LogoIcon;
