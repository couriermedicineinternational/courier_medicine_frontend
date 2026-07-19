import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FAQ_PAGE } from "../constants";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, ArrowLeft, Search } from "lucide-react";
import DOMPurify from "dompurify";
import api from "../utils/api";

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [faqs, setFaqs] = useState([]);

  // FAQ Page Header states
  const [headerTitle, setHeaderTitle] = useState("Frequently Asked Questions");
  const [headerImage, setHeaderImage] = useState("https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&w=1600&q=80");

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadFaqData = async () => {
      try {
        // Fetch FAQs list & Page Header settings concurrently
        const [faqsRes, headerRes] = await Promise.all([
          api.get('/faqs'),
          api.get('/faqs/header').catch(err => {
            console.error("Faq header endpoint failed, using fallback defaults", err);
            return null;
          })
        ]);

        if (faqsRes && faqsRes.data && faqsRes.data.data && faqsRes.data.data.length > 0) {
          setFaqs(faqsRes.data.data.map(item => ({
            q: item.question,
            a: item.answer
          })));
        }

        if (headerRes && headerRes.data && headerRes.data.data) {
          setHeaderTitle(headerRes.data.data.title || "Frequently Asked Questions");
          setHeaderImage(headerRes.data.data.bgImage || "https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&w=1600&q=80");
        }
      } catch (err) {
        console.error('Error fetching FAQs dynamic content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFaqData();
  }, []);

  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  const filteredQuestions = faqs.filter(item => 
    stripHtml(item.q).toLowerCase().includes(searchQuery.toLowerCase()) || 
    stripHtml(item.a).toLowerCase().includes(searchQuery.toLowerCase())
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

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">

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
            className="relative h-[250px] md:h-[320px] overflow-hidden flex items-end pb-8 md:pb-12 bg-slate-950"
          >
            <motion.div 
              initial={{ scale: 1.12, opacity: 0 }}
              animate={{ scale: 1.0, opacity: 1.0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${headerImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="space-y-2"
              >
                <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-white transition-colors mb-2">
                  <ArrowLeft size={14} /> Back to Home
                </Link>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 font-display uppercase drop-shadow-xs text-white">
                  {headerTitle}
                </h1>
                <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center gap-2 text-white/80">
                  <Link to="/" className="hover:text-primary transition-colors text-white/95">Home</Link>
                  <span className="text-white/40">»</span>
                  <span className="text-primary font-bold">FAQ</span>
                </nav>
              </motion.div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">

            {/* Accordion Questions List */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-4"
            >
              {filteredQuestions.map((item, idx) => {
                const isOpen = openIdx === idx;

                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-slate-200/60 overflow-hidden transition-all duration-300"
                  >
                    {/* Collapsible Header */}
                    <button
                      onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-50/50 cursor-pointer"
                    >
                      <div className="text-sm md:text-base font-extrabold text-slate-800 leading-snug pr-4 flex-1">
                        {idx + 1}. {item.q}
                      </div>
                      <ChevronDown 
                        size={18} 
                        className={`text-slate-450 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>

                    {/* Collapsible Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="p-5 md:p-6 bg-slate-50/50 border-t border-slate-100">
                            <div 
                              className="text-sm font-medium text-slate-600 leading-relaxed max-w-3xl prose prose-sm prose-slate max-w-none"
                              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.a) }} 
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Back Button Link */}
            <div className="flex justify-center mt-12">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl border border-slate-250 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <ArrowLeft size={14} /> Back to Home Page
              </Link>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
