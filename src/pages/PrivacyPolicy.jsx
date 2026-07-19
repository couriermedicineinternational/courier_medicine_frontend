import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import DOMPurify from "dompurify";
import api from "../utils/api";

export default function PrivacyPolicy() {
  const [policy, setPolicy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadPolicy = async () => {
      try {
        const res = await api.get('/privacy-policy');
        if (res.data && res.data.success && res.data.data) {
          setPolicy(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching Privacy Policy content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPolicy();
  }, []);

  const defaultBgImage = "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80";
  const displayTitle = policy?.title || "Privacy Policy";
  const bgImage = policy?.bgImage || defaultBgImage;

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="shimmer-privacy"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="pb-20 bg-white font-sans text-slate-700"
        >
          {/* Hero Banner Shimmer */}
          <div className="h-[220px] md:h-[280px] bg-slate-900/10 flex items-end pb-8 relative overflow-hidden">
            <div className="shimmer-bg absolute inset-0" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-4">
              <div className="shimmer-bg h-10 w-1/3 rounded-lg" />
              <div className="shimmer-bg h-4 w-24 rounded-md" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            {/* Content Shimmer */}
            <div className="border border-slate-100 rounded-3xl p-6 md:p-10 space-y-6">
              <div className="shimmer-bg h-6 w-1/4 rounded-md" />
              <div className="shimmer-bg h-4 w-full rounded-md" />
              <div className="shimmer-bg h-4 w-5/6 rounded-md" />
              <div className="shimmer-bg h-4 w-full rounded-md" />
              <div className="shimmer-bg h-4 w-2/3 rounded-md" />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content-privacy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="pb-20 bg-[#FAFDFD] font-sans text-slate-700"
        >
          {/* Premium Hero Banner */}
          <div className="relative h-[220px] md:h-[280px] overflow-hidden flex items-end pb-8 bg-slate-950">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1.0, opacity: 1.0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${bgImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white z-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-1"
              >
                <h1 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-white drop-shadow-xs">
                  {displayTitle}
                </h1>
                <nav className="text-xs md:text-sm font-semibold tracking-wide flex items-center gap-2 text-white/80">
                  <Link to="/" className="hover:text-primary transition-colors text-white/90">Home</Link>
                  <span className="text-white/40">»</span>
                  <span className="text-[#03ADA4] font-bold">Privacy Policy</span>
                </nav>
              </motion.div>
            </div>
          </div>

          {/* Main Content Container */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white border border-slate-200/70 p-6 md:p-10 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] overflow-hidden"
            >
              {/* Rich-Text content body */}
              <div 
                className="prose prose-slate max-w-none text-sm md:text-base font-medium text-slate-650 leading-relaxed [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-4 [&_ol]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4 [&_li]:pl-1 [&_p]:mb-4"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(policy?.content || "") }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
