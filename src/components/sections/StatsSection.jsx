import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from "motion/react";
import { Package, Globe, MapPin, Smile, Star } from "lucide-react";

const STATS_DATA = [
  { 
    endValue: 48000, 
    suffix: "+", 
    isFloat: false, 
    label: "Successful Deliveries",
    icon: Package,
    colorClass: "from-[#0052CC] to-[#4c8bf5]",
    bgColor: "bg-[#0052CC]/10",
    iconColor: "text-[#0052CC]",
    borderColor: "hover:border-[#0052CC]/30"
  },
  { 
    endValue: 220, 
    suffix: "+", 
    isFloat: false, 
    label: "Countries Connected",
    icon: Globe,
    colorClass: "from-[#0052CC] to-[#4c8bf5]",
    bgColor: "bg-[#0052CC]/10",
    iconColor: "text-[#0052CC]",
    borderColor: "hover:border-[#0052CC]/30"
  },
  { 
    endValue: 1400, 
    suffix: "+", 
    isFloat: false, 
    label: "Cities Serviced in India",
    icon: MapPin,
    colorClass: "from-[#03ADA4] to-[#00C2A8]",
    bgColor: "bg-[#03ADA4]/10",
    iconColor: "text-[#03ADA4]",
    borderColor: "hover:border-[#03ADA4]/30"
  },
  { 
    endValue: 99.2, 
    suffix: "%", 
    isFloat: true, 
    label: "Client Happiness Rate",
    icon: Smile,
    colorClass: "from-[#03ADA4] to-[#00C2A8]",
    bgColor: "bg-[#03ADA4]/10",
    iconColor: "text-[#03ADA4]",
    borderColor: "hover:border-[#03ADA4]/30"
  }
];

const GoogleIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const TrustpilotIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#00B67A" d="M12 17.25l-6.18 3.73 1.64-7.03-5.46-4.73 7.19-.62L12 2l2.81 6.6 7.19.62-5.46 4.73 1.64 7.03z"/>
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

function formatValue(numPart) {
  const numValue = parseFloat(numPart.replace(/,/g, ''));
  if (Number.isNaN(numValue)) return numPart;
  if (numPart.includes('.')) {
    return numValue.toFixed(1);
  }
  return Math.floor(numValue).toLocaleString("en-US");
}

export default function StatsSection({ title, subtitle, content }) {
  // Use CMS data if available, fallback to hardcoded STATS_DATA for structure/styling
  const displayStats = content?.stats && content.stats.length > 0 ? content.stats : STATS_DATA;

  return (
    <div id="stats-section" className="flex flex-col bg-[#0052CC]/5 py-16 md:py-20">
      {/* Top Intro Part */}
      <motion.div 
        className="pb-12 md:pb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="text-[#0052CC] bg-[#0052CC]/10 text-[10px] md:text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6">
            {title || "Who we are"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#0F172A] tracking-tight leading-tight mb-5">
            Ensuring Safe, Legal & Worldwide <br className="hidden sm:block" />
            <span className="text-[#0052CC]">Medicine Access for All</span>
          </h2>
          <p className="text-[#475569] text-sm md:text-[15px] font-medium leading-relaxed max-w-3xl">
            Courier Medicine is the premier international pharmaceutical logistics courier in India.<br className="hidden md:block" />
            Guided by the mission of care, safety, and speed, we deliver health home to your family<br className="hidden md:block" />
            overseas.
          </p>
        </div>

        {/* Mobile Google Rating Badge */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-6 bg-white shadow-sm border border-slate-100 rounded-full px-4 py-2 mx-auto w-max">
          <GoogleIcon className="w-4 h-4" />
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-slate-800">4.9/5</span>
            <div className="flex gap-0.5 text-[#FBBC05]">
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Banner Part */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {displayStats.map((stat, idx) => {
            const isGoogle = (stat.label || "").toLowerCase().includes("google") || idx === 1;
            const isTrustpilot = (stat.label || "").toLowerCase().includes("trustpilot") || (stat.label || "").toLowerCase().includes("trust pilot") || idx === 3;

            // Merge CMS dynamic data with hardcoded styling based on index (to keep the nice colors)
            const staticStyle = STATS_DATA[idx] || STATS_DATA[0];
            const IconComponent = staticStyle.icon;
            
            // Clean up suffix text
            const trimmedSuffix = (stat.suffix || "").trim();
            const isTextSuffix = /^[a-zA-Z]+/.test(trimmedSuffix);

            // Parse value to separate numbers/symbols from alphabetical words
            const rawValue = String(stat.value !== undefined ? stat.value : stat.endValue);
            const numMatch = rawValue.match(/^([\d.,]+)(.*)$/);
            const numPart = numMatch ? numMatch[1] : rawValue;
            const textPart = numMatch ? numMatch[2].trim() : "";
            const isAlphabetic = /[a-zA-Z]/.test(textPart);

            // Calculate numeric value for animation
            const numValue = parseFloat(numPart.replace(/,/g, ''));
            const isFloat = !Number.isNaN(numValue) && numPart.includes('.');

            const CardComponent = (isGoogle || isTrustpilot) ? 'a' : 'div';
            const cardProps = isGoogle ? {
              href: "https://www.google.com/search?q=courier+medicines+international+services&oq=courier+medi&gs_lcrp=EgZjaHJvbWUqBwgBEAAYgAQyBwgAEAAYgAQyBwgBEAAYgAQyBwgCEAAYgAQyBggDEEUYOTIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCTc5NzNqMGoxNagCCLACAfEF92Jo1dH9Dio&sourceid=chrome&ie=UTF-8&zx=1783411816019#sv=CAwShQMKBmxjbF9wdhJbCgNwdnESVENnMHZaeTh4TVhneGVXMDJaM0ZrSWk0S0tHTnZkWEpwWlhJZ2JXVmthV05wYm1WeklHbHVkR1Z5Ym1GMGFXOXVZV3dnYzJWeWRtbGpaWE1RQWhnRBLGAQoDbHFpEr4BQ2loamIzVnlhV1Z5SUcxbFpHbGphVzVsY3lCcGJuUmxjbTVoZEdsdmJtRnNJSE5sY25acFkyVnpTTXoxek5tSHZJQ0FDRnBHRUFBUUFSQUNFQU1ZQUJnQkdBSVlBeUlvWTI5MWNtbGxjaUJ0WldScFkybHVaWE1nYVc1MFpYSnVZWFJwYjI1aGJDQnpaWEoyYVdObGN5b0tDQUlRQUJBQkVBSVFBNUlCRDJOdmRYSnBaWEpmYzJWeWRtbGpaURISCgN0YnMSC2xyZjohM3NJQUU9Ei0KAXESKGNvdXJpZXIgbWVkaWNpbmVzIGludGVybmF0aW9uYWwgc2VydmljZXMaEmxvY2FsLXBsYWNlLXZpZXdlchgKILTR36oN",
              target: "_blank",
              rel: "noopener noreferrer"
            } : isTrustpilot ? {
              href: "https://www.trustpilot.com/review/couriermedicines.com",
              target: "_blank",
              rel: "noopener noreferrer"
            } : {};

            let finalBgColor = staticStyle.bgColor;
            let finalIconColor = staticStyle.iconColor;
            let finalColorClass = staticStyle.colorClass;
            let finalBorderColor = staticStyle.borderColor;

            if (isTrustpilot) {
              finalBgColor = "bg-[#00B67A]/10";
              finalIconColor = "text-[#00B67A]";
              finalColorClass = "from-[#00B67A] to-[#00d08c]";
              finalBorderColor = "hover:border-[#00B67A]/30";
            }

            return (
              <motion.div 
                key={idx} 
                variants={cardVariants}
                className="w-full h-full"
              >
                <CardComponent
                  {...cardProps}
                  className={`bg-white border border-slate-100 rounded-[20px] p-3 xs:p-4 md:p-8 h-full min-h-[160px] md:min-h-[200px] transition-all duration-500 flex flex-col items-center justify-center text-center cursor-pointer no-underline ${finalBorderColor} shadow-[0_12px_40px_rgba(0,82,204,0.06)] -translate-y-2 scale-[1.05] md:shadow-[0_8px_30px_rgb(0,0,0,0.02)] md:translate-y-0 md:scale-100 md:hover:shadow-[0_12px_40px_rgba(0,82,204,0.06)] md:hover:-translate-y-2 md:hover:scale-[1.05]`}
                >
                {/* Icon Container */}
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${finalBgColor} ${finalIconColor} flex items-center justify-center mb-3 md:mb-5 shadow-inner`}>
                  {isGoogle ? (
                    <GoogleIcon className="w-5 h-5 md:w-6 md:h-6" />
                  ) : isTrustpilot ? (
                    <TrustpilotIcon className="w-5 h-5 md:w-6 md:h-6" />
                  ) : (
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6 stroke-[2.2]" />
                  )}
                </div>

                {/* Display Value & Suffix from CMS */}
                <div className={`flex flex-col items-center justify-center leading-none tracking-tight bg-gradient-to-r ${finalColorClass} bg-clip-text text-transparent mb-1.5 md:mb-2`}>
                  <div className="flex items-baseline justify-center text-3xl md:text-4xl font-extrabold font-sans tabular-nums min-h-[36px] md:min-h-[40px]">
                    <span>{formatValue(numPart)}</span>
                    {textPart && !isAlphabetic && (
                      <span className="ml-0.5">{textPart}</span>
                    )}
                    {!isTextSuffix && <span>{trimmedSuffix}</span>}
                  </div>
                  {(textPart && isAlphabetic) && (
                    <span className="text-[10px] md:text-sm font-black uppercase tracking-wider mt-0.5 text-slate-400">
                      {textPart}
                    </span>
                  )}
                  {isTextSuffix && (
                    <span className={`text-[11px] sm:text-[15px] font-bold mt-1 bg-gradient-to-r ${finalColorClass} bg-clip-text text-transparent block`}>
                      {trimmedSuffix}
                    </span>
                  )}
                </div>

                {/* Label */}
                <span className="text-[9px] md:text-xs font-black text-slate-400 tracking-widest uppercase leading-tight max-w-[160px]">
                  {stat.label}
                </span>
                </CardComponent>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
