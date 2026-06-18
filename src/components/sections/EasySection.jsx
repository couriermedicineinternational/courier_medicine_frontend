import React from "react";
import { motion, animate } from "motion/react";
import { Truck, Tag, ShoppingBag, Package, Clock, PhoneCall, CreditCard } from "lucide-react";
import { WE_MADE_EASY } from "../../constants";

export default function EasySection() {
  const cardConfigs = [
    {
      icon: Truck,
      color: "text-[#0052CC] bg-[#0052CC]/5 border-[#0052CC]/10",
      glow: "hover:border-[#0052CC]/30 hover:shadow-[0_25px_50px_-12px_rgba(0,82,204,0.05)]"
    },
    {
      icon: Tag,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      glow: "hover:border-emerald-500/30 hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.05)]"
    },
    {
      icon: ShoppingBag,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      glow: "hover:border-purple-500/30 hover:shadow-[0_25px_50px_-12px_rgba(139,92,246,0.05)]"
    },
    {
      icon: Package,
      color: "text-amber-500 bg-amber-50 border-amber-100",
      glow: "hover:border-amber-500/30 hover:shadow-[0_25px_50px_-12px_rgba(245,158,11,0.05)]"
    },
    {
      icon: Clock,
      color: "text-teal-600 bg-teal-50 border-teal-100",
      glow: "hover:border-teal-500/30 hover:shadow-[0_25px_50px_-12px_rgba(20,184,166,0.05)]"
    },
    {
      icon: PhoneCall,
      color: "text-rose-600 bg-rose-50 border-rose-100",
      glow: "hover:border-rose-500/30 hover:shadow-[0_25px_50px_-12px_rgba(244,63,94,0.05)]"
    },
    {
      icon: CreditCard,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
      glow: "hover:border-indigo-500/30 hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.05)]"
    }
  ];

  const containerRef = React.useRef(null);
  const [isInView, setIsInView] = React.useState(false);
  const [hasScrolledPreview, setHasScrolledPreview] = React.useState(false);
  const [isAnimatingScroll, setIsAnimatingScroll] = React.useState(false);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!isInView || hasScrolledPreview) return;

    // Small delay to let the screen settle after vertical scroll
    const timeout = setTimeout(() => {
      const container = containerRef.current;
      if (container) {
        const card = container.querySelector('[id^="easy-item-"]');
        if (card) {
          const cardWidth = card.offsetWidth + 24; // card width + gap
          
          // Calculate target offset dynamically to ensure Box 4 (index 3) is visible:
          // Desktop (3 visible cards): scroll by 1 card width (shows Cards 2, 3, 4)
          // Tablet (2 visible cards): scroll by 2 card widths (shows Cards 3, 4)
          // Mobile (1 visible card): scroll by 3 card widths (shows Card 4)
          let scrollMultiplier = 1;
          if (window.innerWidth < 640) {
            scrollMultiplier = 3;
          } else if (window.innerWidth < 1024) {
            scrollMultiplier = 2;
          }
          
          const targetScroll = cardWidth * scrollMultiplier;

          setIsAnimatingScroll(true);
          animate(container.scrollLeft, targetScroll, {
            duration: 1.6,
            ease: [0.25, 1, 0.5, 1], // Premium smooth ease-out curve
            onUpdate: (latest) => {
              container.scrollLeft = latest;
            },
            onComplete: () => {
              setIsAnimatingScroll(false);
            }
          });
          setHasScrolledPreview(true);
        }
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [isInView, hasScrolledPreview]);
  return (
    <section id="easy-section" className="py-20 bg-[#F8FAFC]/30 border-y border-slate-100 overflow-hidden">
      <div id="easy-inner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#03ADA4] bg-[#03ADA4]/10 text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3.5 inline-block">
            Our Commitment
          </span>
          <h2 id="easy-section-title" className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight uppercase leading-none">
            We Made Courier Medicines <span className="text-[#0052CC]">EASY</span>
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mt-3.5" />
        </div>

        {/* Horizontal Scrolling Card Carousel */}
        <div 
          id="easy-grid" 
          ref={containerRef}
          className={`flex gap-6 overflow-x-auto pb-8 custom-scrollbar items-stretch w-full ${
            isAnimatingScroll ? "" : "snap-x snap-mandatory"
          }`}
        >
          {WE_MADE_EASY.accordion.map((item, idx) => {
            const config = cardConfigs[idx] || cardConfigs[0];
            const Icon = config.icon;
            const colorClass = config.color;
            const glowClass = config.glow;
            const stepNum = idx + 1 < 10 ? `0${idx + 1}` : idx + 1;

            return (
              <motion.div
                id={`easy-item-${item.id}`}
                key={item.id}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02
                }}
                className={`bg-gradient-to-br from-white via-white to-slate-50/50 border border-slate-100 p-8 rounded-[28px] flex flex-col items-start cursor-default transition-all duration-300 flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start ${glowClass}`}
              >
                {/* Top Row: Icon Badge & Numeric Display */}
                <div className="flex items-center justify-between w-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm transition-transform duration-300 ${colorClass}`}>
                    <Icon size={24} className="stroke-[2.2]" />
                  </div>
                  <span className="font-display font-black text-slate-100/90 text-4xl tracking-tight select-none">
                    {stepNum}
                  </span>
                </div>
                
                {/* Title & Description */}
                <h3 className="text-base md:text-lg font-black text-slate-800 tracking-tight leading-snug mt-8 font-display">
                  {item.title}
                </h3>
                <p className="text-xs md:text-[13px] text-slate-500 font-sans leading-relaxed font-medium mt-3">
                  {item.content}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
