import React from 'react';

export default function Logo({ className = "", hideSubtitle = false, darkMode = false }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="Courier Medicine" 
        className="h-[30px] md:h-[45px] w-auto object-contain" 
      />
    </div>
  );
}

