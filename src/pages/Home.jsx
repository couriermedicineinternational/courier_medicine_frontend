import { useState, useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import api from "../utils/api";

// Section Components
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import WhatMedicinesSection from "../components/sections/WhatMedicinesSection";
import EasySection from "../components/sections/EasySection";
import FlagsSection from "../components/sections/FlagsSection";
import DocSection from "../components/sections/DocSection";
import CtaBannerSection from "../components/sections/CtaBannerSection";
import ProcessSection from "../components/sections/ProcessSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";

// Map section database keys to local components
const componentMap = {
  "hero": HeroSection,
  "stats": StatsSection,
  "what-medicines": WhatMedicinesSection,
  "easy-courier": EasySection,
  "flags": FlagsSection,
  "documents": DocSection,
  "cta-banner": CtaBannerSection,
  "process": ProcessSection,
  "testimonials": TestimonialsSection
};

const DEFAULT_SECTIONS = [
  { key: "hero" },
  { key: "stats" },
  { key: "what-medicines" },
  { key: "easy-courier" },
  { key: "flags" },
  { key: "documents" },
  { key: "cta-banner" },
  { key: "process" },
  { key: "testimonials" }
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(false); // Render content instantly
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [hasError, setHasError] = useState(false);

  // Fetch dynamic sections configuration from API silently in the background
  useEffect(() => {
    const loadHomepageData = async () => {
      try {
        const res = await api.get("/homepage");
        if (res.data && res.data.success && res.data.data && res.data.data.length > 0) {
          setSections(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load dynamic homepage configuration in background:", err);
        // Do not block the page with an error if we already have the default fallback layout!
      }
    };
    
    loadHomepageData();
  }, []);

  return (
    <div id="home-page" className="w-full relative overflow-x-hidden bg-white font-sans">
      <AnimatePresence mode="wait">
        {isLoading ? (
          /* High-Fidelity Homepage Shimmer Skeleton Screen */
          <motion.div
            key="home-shimmer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full space-y-16 pb-20"
          >
            {/* Hero Banner Shimmer Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="shimmer-bg h-5 w-32 rounded-full" />
                <div className="shimmer-bg h-12 w-4/5 rounded-2xl" />
                <div className="shimmer-bg h-12 w-2/3 rounded-2xl" />
                <div className="space-y-2 pt-2">
                  <div className="shimmer-bg h-4 w-11/12 rounded" />
                  <div className="shimmer-bg h-4 w-10/12 rounded" />
                  <div className="shimmer-bg h-4 w-8/12 rounded" />
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="shimmer-bg h-12 w-48 rounded-xl" />
                  <div className="shimmer-bg h-12 w-40 rounded-xl" />
                </div>
              </div>
              <div className="lg:col-span-5 h-[340px] md:h-[450px] rounded-3xl shimmer-bg shadow-sm" />
            </div>

            {/* Stats Row Shimmer Layout */}
            <div className="bg-slate-50 border-y border-slate-100 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-3 flex flex-col items-center">
                    <div className="shimmer-bg h-10 w-24 rounded-lg" />
                    <div className="shimmer-bg h-4 w-32 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Actual Homepage Content (Loaded from DB with fallback) */
          <motion.div
            key="home-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {hasError || sections.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 md:py-32 px-4 text-center min-h-[60vh] bg-slate-50">
                <div className="bg-red-100 p-5 rounded-full mb-6 shadow-sm border border-red-200">
                  <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Oops! Something went wrong</h2>
                <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
                  We are unable to load the content from our servers at the moment. Please check your internet connection or try again later.
                </p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-[#00A19D] hover:bg-[#008A87] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  Refresh Page
                </button>
              </div>
            ) : (
              sections.map((section) => {
                const Component = componentMap[section.key];
                if (!Component) return null;
                return (
                  <Component 
                    key={section.key} 
                    title={section.title} 
                    subtitle={section.subtitle} 
                    content={section.content} 
                  />
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
