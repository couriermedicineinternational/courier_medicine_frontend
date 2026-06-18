import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FAQ_PAGE } from "../constants";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, ArrowLeft, Search } from "lucide-react";

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Simulated loading trigger
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const filteredQuestions = FAQ_PAGE.questions.filter(item => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="shimmer-faq"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="pb-20 bg-white font-sans text-slate-700"
        >
          {/* Hero Banner Shimmer */}
          <div className="h-[220px] md:h-[280px] bg-slate-900/10 flex items-center relative overflow-hidden">
            <div className="shimmer-bg absolute inset-0" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-4">
              <div className="shimmer-bg h-4 w-24 rounded-md" />
              <div className="shimmer-bg h-10 w-2/3 rounded-lg" />
              <div className="shimmer-bg h-4 w-1/3 rounded-md" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
            {/* Search Bar Shimmer */}
            <div className="shimmer-bg h-12 w-full max-w-lg mx-auto rounded-xl" />

            {/* List Shimmer */}
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="border border-slate-100 rounded-xl p-5 space-y-2">
                  <div className="shimmer-bg h-5 w-3/4 rounded-md" />
                  <div className="shimmer-bg h-4 w-1/2 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          key="content-faq"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          id="faq-page" 
          className="pb-20 bg-[#FAFDFD] font-sans text-slate-700"
        >
          
          {/* 1. Page Header Banner */}
          <div 
            id="faq-banner"
            className="relative h-[220px] md:h-[280px] flex items-center overflow-hidden bg-slate-950"
          >
            <motion.div 
              initial={{ scale: 1.12, opacity: 0.3 }}
              animate={{ scale: 1, opacity: 0.35 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&w=1600&q=80')` 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-1"
              >
                <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-white transition-colors mb-2">
                  <ArrowLeft size={14} /> Back to Home
                </Link>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 font-display uppercase drop-shadow-xs">
                  {FAQ_PAGE.title}
                </h1>
                <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center gap-2 text-white/80">
                  <Link to="/" className="hover:text-primary transition-colors text-white/95">Home</Link>
                  <span className="text-white/40">»</span>
                  <span className="text-primary font-bold">FAQ</span>
                </nav>
              </motion.div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            
            {/* Intro & Search */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
                How Can We Help You?
              </h2>
              <p className="max-w-xl mx-auto text-sm text-slate-500 font-medium leading-relaxed mb-8">
                {FAQ_PAGE.subtitle}
              </p>

              {/* Search Bar */}
              <div className="relative max-w-lg mx-auto">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Search size={20} />
                </span>
                <input
                  type="text"
                  placeholder="Search your question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary shadow-sm transition-all"
                />
              </div>
            </motion.div>

            {/* Faq List */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              id="faq-accordions" 
              className="space-y-4"
            >
              {filteredQuestions.length > 0 ? filteredQuestions.map((item, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <motion.div
                    variants={itemVariants}
                    id={`faq-item-${idx}`}
                    key={idx}
                    className={`border rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                      isOpen 
                        ? "border-secondary/40 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
                        : "border-slate-200/70 bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                  >
                    {/* Header question click block */}
                    <div className="p-5 flex items-center justify-between font-sans gap-4">
                      <div className="flex items-start sm:items-center gap-3">
                        <span className={`shrink-0 mt-0.5 sm:mt-0 p-1.5 rounded-lg ${isOpen ? "bg-secondary/10 text-secondary" : "bg-slate-100 text-slate-400"}`}>
                          <HelpCircle size={18} />
                        </span>
                        <h4 className={`text-sm md:text-base tracking-wide ${
                          isOpen ? "text-slate-900 font-extrabold" : "text-slate-700 font-bold"
                        }`}>
                          {item.q}
                        </h4>
                      </div>
                      <motion.div 
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isOpen ? "bg-secondary text-white" : "bg-slate-100 text-slate-400"}`}
                      >
                        <ChevronDown size={16} className={isOpen ? "stroke-[3]" : "stroke-[2]"} />
                      </motion.div>
                    </div>

                    {/* Collapsible details review */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-item-content-${idx}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-5 sm:pl-[68px] pb-6 text-sm text-slate-600 leading-relaxed font-sans font-medium">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              }) : (
                <div className="text-center py-12 bg-white border border-slate-100 rounded-3xl">
                  <HelpCircle size={48} className="mx-auto text-slate-200 mb-3" />
                  <h3 className="text-base font-black text-slate-800">No questions found</h3>
                  <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria</p>
                </div>
              )}
            </motion.div>

            {/* Support helper CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 p-8 bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/60 rounded-3xl text-center space-y-4 shadow-sm"
            >
              <span className="w-12 h-12 bg-white shadow-sm rounded-2xl flex items-center justify-center mx-auto mb-2 text-primary">
                <HelpCircle size={24} />
              </span>
              <h4 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">
                Still Confused about Regulations?
              </h4>
              <p className="text-sm text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                Custom clearance codes and rules change dynamically across different nations. Speak to our active team directly to check medicine eligibility.
              </p>
              <div className="flex justify-center flex-col sm:flex-row items-center gap-3 pt-3">
                <a
                  href="https://wa.me/918882691919"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary hover:bg-primary text-white font-bold text-sm rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto flex justify-center items-center gap-2"
                >
                  💬 WhatsApp Active Support Desk
                </a>
                <a
                  href="mailto:couriermedicines@gmail.com"
                  className="px-6 py-3 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold text-sm rounded-xl w-full sm:w-auto transition-colors flex justify-center items-center gap-2"
                >
                  ✉ Email Compliance team
                </a>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
