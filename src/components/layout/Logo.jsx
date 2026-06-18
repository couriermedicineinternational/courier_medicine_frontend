import React from 'react';

export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Custom SVG Logo Icon (Gradient Map Pin with Plus) */}
      <svg width="36" height="44" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 drop-shadow-sm">
        <path d="M12 0C5.37258 0 0 5.37258 0 12C0 21 12 30 12 30C12 30 24 21 24 12C24 5.37258 18.6274 0 12 0Z" fill="#03ADA4"/>
        <circle cx="12" cy="11.5" r="7.5" fill="white"/>
        <path d="M12 8.5V14.5M9 11.5H15" stroke="#03ADA4" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      
      {/* Text Group */}
      <div className="flex flex-col items-start justify-center pt-0.5">
        <div className="flex shadow-sm">
          <span className="bg-[#0052CC] text-white px-2 py-0.5 text-[22px] font-bold font-sans tracking-tight leading-none">
            Courier
          </span>
          <span className="bg-[#00C2A8] text-white px-2 py-0.5 text-[22px] font-bold font-sans tracking-tight leading-none">
            Medicines
          </span>
        </div>
        <span className="text-[12px] font-black tracking-widest text-slate-900 mt-[3px] leading-none uppercase">
          International Services
        </span>
      </div>
    </div>
  );
}
