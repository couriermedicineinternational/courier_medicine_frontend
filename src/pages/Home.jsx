import { useState, useEffect } from "react";
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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [sections, setSections] = useState([]);

  // Fetch dynamic sections configuration from API
  useEffect(() => {
    const loadHomepageData = async () => {
      try {
        const res = await api.get("/homepage");
        if (res.data && res.data.success && res.data.data) {
          console.log("Homepage sections fetched successfully:", res.data.data);
          setSections(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load dynamic homepage configuration:", err);
      } finally {
        setIsLoading(false);
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
            {sections.length > 0 ? (
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
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
