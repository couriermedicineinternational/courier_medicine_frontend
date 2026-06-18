import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Globe, ArrowUpRight, Search, X, ArrowUp } from "lucide-react";
import { ALL_COUNTRIES } from "../constants";

export default function PopularCountries() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated loading trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Filter countries list based on search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return ALL_COUNTRIES;
    return ALL_COUNTRIES.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.customTitle && c.customTitle.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.012, // snappy and quick cascade
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: -40,
      scale: 0.98
    },
    show: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 18,
        mass: 0.8
      }
    }
  };

  return (
    <div id="countries-page" className="pb-16 bg-[#FAFDFD] font-sans text-slate-700">
      
      {/* 1. Page Header Banner (Matches the screenshot layout) */}
      <div 
        id="countries-banner"
        className="relative h-[220px] md:h-[280px] bg-cover bg-center flex items-end pb-8 md:pb-12 bg-slate-950"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80')` 
        }}
      >
        {/* Scrim Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white z-10">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 font-display uppercase drop-shadow-xs">
            Countries
          </h1>
          <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center gap-2 text-white/80">
            <Link to="/" className="hover:text-primary transition-colors text-white/95">Home</Link>
            <span className="text-white/40">»</span>
            <span className="text-primary font-bold">Countries</span>
          </nav>
        </div>
      </div>

      {/* 2. Intro and Search section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="max-w-xl">
            <span className="text-xs font-black uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1.5 rounded-full inline-block mb-3">
              Global Network
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">
              Select Destination Country
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
              Click on any country link below to instantly calculate door-to-door medicine courier charges, delivery timelines, and destination custom clearance guidelines.
            </p>
          </div>
          
          {/* Beautiful Search Bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search destination country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary shadow-sm transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Main Grid of 43 Country Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {isLoading ? (
            /* Shimmer loading skeletons with exit fade */
            <motion.div 
              key="shimmer-grid"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {Array.from({ length: 12 }).map((_, idx) => (
                <div 
                  key={idx}
                  className="w-full bg-white border border-slate-200/60 rounded-xl p-4 md:p-5 flex items-center justify-between h-[68px] md:h-[76px] relative overflow-hidden"
                >
                  {/* Simulated text strip */}
                  <div className="shimmer-bg h-4 w-3/4 rounded-md" />
                  {/* Simulated arrow circle */}
                  <div className="shimmer-bg h-7 w-7 rounded-full shrink-0" />
                </div>
              ))}
            </motion.div>
          ) : filteredCountries.length > 0 ? (
            <motion.div 
              key="countries-grid"
              id="countries-grid" 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {filteredCountries.map((country) => {
                const displayTitle = country.isSpecial 
                  ? country.customTitle 
                  : `India To ${country.name} Medicine Courier Charges`;

                return (
                  <motion.button
                    id={`country-card-${country.code.toLowerCase()}`}
                    key={country.code}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    whileHover={{ 
                      y: -4, 
                      scale: 1.01,
                      boxShadow: "0 10px 20px -5px rgba(0, 82, 204, 0.08), 0 8px 10px -6px rgba(0, 82, 204, 0.05)",
                      borderColor: "rgba(0, 82, 204, 0.2)"
                    }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => navigate(`/${country.slug}`)}
                    className="w-full text-left bg-gradient-to-br from-white via-white to-slate-50/30 border border-slate-200/80 rounded-xl p-4 md:p-5 font-bold text-xs md:text-sm relative overflow-hidden group cursor-pointer"
                  >
                    {/* Bottom accent highlight line on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />
                    
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[#0052CC] group-hover:text-primary transition-colors duration-300 font-sans tracking-wide leading-snug">
                        {displayTitle}
                      </span>
                      <span className="bg-slate-50 group-hover:bg-[#0052CC]/10 text-slate-400 group-hover:text-[#0052CC] p-1.5 rounded-full transition-all duration-300 shrink-0">
                        <ArrowUpRight 
                          size={14} 
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" 
                        />
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              key="no-results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 bg-white border border-slate-100 rounded-3xl shadow-sm"
            >
              <Globe size={48} className="mx-auto text-slate-300 mb-3 animate-pulse" />
              <h3 className="text-base font-black text-slate-800 tracking-tight">No Destinations Found</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">Try searching for another country name or code.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 bg-secondary hover:bg-[#0047b3] text-white p-3.5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none"
          title="Scroll to Top"
        >
          <ArrowUp size={20} />
        </button>
      )}

    </div>
  );
}
