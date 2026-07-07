import React from "react";
import { motion, animate } from "motion/react";
import { Truck, Tag, ShoppingBag, Package, Clock, PhoneCall, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import * as Lucide from "lucide-react";
import DOMPurify from "dompurify";
import { WE_MADE_EASY } from "../../constants";

export default function EasySection({ title, subtitle, content }) {
  const cardConfigs = [
    {
      icon: Truck,
      color: "text-[#0052CC] bg-[#0052CC]/5 border-[#0052CC]/10",
      glow: "hover:border-[#0052CC]/35 hover:shadow-[0_20px_40px_-5px_rgba(0,82,204,0.12),_0_0_25px_1px_rgba(0,82,204,0.06)]"
    },
    {
      icon: Tag,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      glow: "hover:border-emerald-500/35 hover:shadow-[0_20px_40px_-5px_rgba(16,185,129,0.12),_0_0_25px_1px_rgba(16,185,129,0.06)]"
    },
    {
      icon: ShoppingBag,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      glow: "hover:border-purple-500/35 hover:shadow-[0_20px_40px_-5px_rgba(139,92,246,0.12),_0_0_25px_1px_rgba(139,92,246,0.06)]"
    },
    {
      icon: Package,
      color: "text-amber-500 bg-amber-50 border-amber-100",
      glow: "hover:border-amber-500/35 hover:shadow-[0_20px_40px_-5px_rgba(245,158,11,0.12),_0_0_25px_1px_rgba(245,158,11,0.06)]"
    },
    {
      icon: Clock,
      color: "text-teal-600 bg-teal-50 border-teal-100",
      glow: "hover:border-teal-500/35 hover:shadow-[0_20px_40px_-5px_rgba(20,184,166,0.12),_0_0_25px_1px_rgba(20,184,166,0.06)]"
    },
    {
      icon: PhoneCall,
      color: "text-rose-600 bg-rose-50 border-rose-100",
      glow: "hover:border-rose-500/35 hover:shadow-[0_20px_40px_-5px_rgba(244,63,94,0.12),_0_0_25px_1px_rgba(244,63,94,0.06)]"
    },
    {
      icon: CreditCard,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
      glow: "hover:border-indigo-500/35 hover:shadow-[0_20px_40px_-5px_rgba(99,102,241,0.12),_0_0_25px_1px_rgba(99,102,241,0.06)]"
    }
  ];

  const containerRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const accordionsToRender = content?.accordions || WE_MADE_EASY.accordion;

  const maxIndex = isMobile 
    ? accordionsToRender.length - 1 
    : isTablet 
      ? accordionsToRender.length - 2 
      : accordionsToRender.length - 3;

  React.useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.querySelector('[id^="easy-item-"]');
    if (card) {
      const cardWidth = card.offsetWidth + 24; // card width + gap
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  const nextSlide = () => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.querySelector('[id^="easy-item-"]');
    if (card) {
      const cardWidth = card.offsetWidth + 24; // card width + gap
      const targetIndex = Math.min(currentIndex + 1, maxIndex);
      container.scrollTo({
        left: targetIndex * cardWidth,
        behavior: "smooth"
      });
      setCurrentIndex(targetIndex);
    }
  };

  const prevSlide = () => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.querySelector('[id^="easy-item-"]');
    if (card) {
      const cardWidth = card.offsetWidth + 24; // card width + gap
      const targetIndex = Math.max(currentIndex - 1, 0);
      container.scrollTo({
        left: targetIndex * cardWidth,
        behavior: "smooth"
      });
      setCurrentIndex(targetIndex);
    }
  };

  const displayTitle = title || (
    <>
      We Made Courier Medicines <span className="text-[#0052CC]">EASY</span>
    </>
  );

  return (
    <section id="easy-section" className="pt-20 pb-6 bg-[#F8FAFC]/30 border-y border-slate-100 overflow-hidden">
      <div id="easy-inner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 id="easy-section-title" className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight uppercase leading-none">
            {displayTitle}
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mt-3.5" />
        </div>

        {/* Carousel Slider with Dynamic arrow buttons */}
        <div className="relative w-full">
          
          {/* Left Arrow Button - Hidden at start */}
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-[-18px] lg:left-[-26px] top-[206px] -translate-y-1/2 w-[52px] h-[52px] rounded-full bg-white/95 hover:bg-white text-slate-800 border border-slate-200/80 shadow-md hover:shadow-lg hidden md:flex items-center justify-center transition-all z-[60] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={26} className="stroke-[2.5]" />
            </button>
          )}

          {/* Right Arrow Button - Hidden at end */}
          {currentIndex < maxIndex && (
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-[-18px] lg:right-[-26px] top-[206px] -translate-y-1/2 w-[52px] h-[52px] rounded-full bg-white/95 hover:bg-white text-slate-800 border border-slate-200/80 shadow-md hover:shadow-lg hidden md:flex items-center justify-center transition-all z-[60] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight size={26} className="stroke-[2.5]" />
            </button>
          )}

          {/* Mobile Swipe Nudge Indicator */}
          {currentIndex < maxIndex && (
            <div className="md:hidden absolute right-0 top-[300px] -translate-y-1/2 z-[60] pointer-events-none drop-shadow-md">
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="flex items-center justify-center text-[#0052CC]/70"
              >
                <ChevronRight size={36} className="stroke-[3]" />
              </motion.div>
            </div>
          )}

          {/* Slider Window */}
          <div className="overflow-hidden w-full rounded-[30px] -mx-1.5 px-1.5 pt-0 pb-4">
            <div 
              id="easy-grid" 
              ref={containerRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar items-stretch w-full scroll-smooth pt-4 pb-28"
            >
              {accordionsToRender.map((item, idx) => {
                const config = cardConfigs[idx % cardConfigs.length];
                let Icon = config.icon;
                if (item.icon && Lucide[item.icon]) {
                  Icon = Lucide[item.icon];
                }
                const colorClass = config.color;
                const glowClass = config.glow;
                const stepNum = idx + 1 < 10 ? `0${idx + 1}` : idx + 1;

                return (
                  <div
                    key={item.id || idx}
                    className="w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 h-[600px] sm:h-[580px] lg:h-[620px] relative snap-start"
                  >
                    <motion.div
                      id={`easy-item-${item.id || idx}`}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      whileHover={{ 
                        y: -8, 
                        scale: 1.015
                      }}
                      className={`absolute top-0 left-0 w-full h-[600px] sm:h-[580px] lg:h-[620px] bg-gradient-to-br from-white via-white to-slate-50/50 border border-slate-200 p-7 sm:p-8 rounded-[28px] flex flex-col items-start cursor-default transition-all duration-300 overflow-hidden group ${glowClass} ${
                        hoveredIndex === idx 
                          ? "z-50 shadow-2xl" 
                          : "z-10 shadow-sm"
                      }`}
                    >
                      {/* Top Row: Icon Badge & Numeric Display */}
                      <div className="flex items-center justify-between w-full">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm transition-transform duration-300 ${colorClass}`}>
                          <Icon size={24} className="stroke-[2.2]" />
                        </div>
                        <span className="font-display font-black text-slate-200 text-4xl tracking-tight select-none">
                          {stepNum}
                        </span>
                      </div>
                      
                      {/* Title & Description */}
                      <h3 className="text-base md:text-lg font-black text-slate-800 tracking-tight leading-snug mt-8 font-display">
                        {item.title}
                      </h3>
 
                      {/* Description Container */}
                      <div className="relative w-full mt-3 flex-grow overflow-hidden custom-scrollbar pr-1">
                        <div 
                          className="text-xs md:text-[13px] text-slate-500 font-sans leading-relaxed font-medium pb-8"
                          dangerouslySetInnerHTML={{ 
                            __html: DOMPurify.sanitize(
                              (item.content || "")
                                .replace(/<em\b[^>]*><\/em>|<strong\b[^>]*><\/strong>|<span\b[^>]*><\/span>/gi, "")
                                .replace(
                                  /Call\s*\/\s*WhatsApp\s*(?:on\s*)?\+?91\s*-\s*8882691919/gi,
                                  '<a href="https://wa.me/918882691919" target="_blank" rel="noopener noreferrer" class="text-emerald-500 hover:text-emerald-600 font-black hover:underline">Call / WhatsApp +91-8882691919</a>'
                                )
                            ) 
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
