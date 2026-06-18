import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from "motion/react";
import { Package, Globe, MapPin, Smile } from "lucide-react";

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
  hidden: { opacity: 0, y: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

function AnimatedCounter({ endValue, suffix, isFloat, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, endValue, {
        duration: 2.2,
        ease: "easeOut",
        onUpdate(value) {
          if (isFloat) {
            setDisplayValue(value.toFixed(1));
          } else {
            setDisplayValue(Math.floor(value).toLocaleString("en-US"));
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, endValue, isFloat]);

  return (
    <span ref={ref} className={className}>
      {displayValue}{suffix}
    </span>
  );
}

export default function StatsSection() {
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
            Who we are
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
      </motion.div>

      {/* Stats Banner Part */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STATS_DATA.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div 
                key={idx} 
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className={`bg-white border border-slate-100 rounded-[20px] p-6 md:p-8 min-h-[200px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,82,204,0.06)] transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer ${stat.borderColor}`}
              >
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-2xl ${stat.bgColor} ${stat.iconColor} flex items-center justify-center mb-5 shadow-inner`}>
                  <IconComponent size={24} className="stroke-[2.2]" />
                </div>

                {/* Animated Counter */}
                <AnimatedCounter
                  endValue={stat.endValue}
                  suffix={stat.suffix}
                  isFloat={stat.isFloat}
                  className={`text-3xl md:text-4xl font-extrabold mb-2 font-sans tracking-tight bg-gradient-to-r ${stat.colorClass} bg-clip-text text-transparent`}
                />

                {/* Label */}
                <span className="text-[10px] md:text-xs font-black text-slate-400 tracking-widest uppercase leading-tight max-w-[160px]">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
