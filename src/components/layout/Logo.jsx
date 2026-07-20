import React from 'react';

export default function Logo({ className = "", hideSubtitle = false, darkMode = false }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="Courier Medicine" 
        width={200}
        height={45}
        loading="eager"
        className="h-[30px] md:h-[45px] w-auto object-contain" 
      />
    </div>
  );
}

