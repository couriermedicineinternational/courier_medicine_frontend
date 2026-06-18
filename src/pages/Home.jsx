import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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
import TrackModal from "../components/sections/TrackModal";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulated loading trigger for home page
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  // Order Tracking feature has been moved to TrackModal directly if needed, or handles via external means

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
            {/* 1. Hero Banner Shimmer Layout */}
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

            {/* 2. Stats Row Shimmer Layout */}
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

            {/* 3. What Medicines Section Shimmer Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-5">
                <div className="shimmer-bg h-5 w-36 rounded-full" />
                <div className="shimmer-bg h-10 w-4/5 rounded-xl" />
                <div className="shimmer-bg h-10 w-2/3 rounded-xl" />
                <div className="space-y-2 pt-2">
                  <div className="shimmer-bg h-4.5 w-full rounded" />
                  <div className="shimmer-bg h-4.5 w-11/12 rounded" />
                </div>
                <div className="flex gap-3 pt-3">
                  <div className="shimmer-bg h-12 w-44 rounded-xl" />
                  <div className="shimmer-bg h-12 w-32 rounded-xl" />
                </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="border border-slate-100 p-5 rounded-[20px] bg-white flex items-start gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                    <div className="shimmer-bg h-11 w-11 rounded-xl shrink-0" />
                    <div className="space-y-2 grow pt-1">
                      <div className="shimmer-bg h-4.5 w-24 rounded" />
                      <div className="shimmer-bg h-3.5 w-full rounded" />
                      <div className="shimmer-bg h-3.5 w-4/5 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Actual Homepage Content */
          <motion.div
            key="home-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Hero Section */}
            <HeroSection />

            {/* 1. Stats Section banner */}
            <StatsSection />

            {/* 2. What Medicines We Can Courier */}
            <WhatMedicinesSection />

            {/* 3. We Made Courier Medicines Easy accordion */}
            <EasySection />

            {/* Global Network / Flags Section */}
            <FlagsSection />

            {/* 4. Documentation support accordion */}
            <DocSection />

            {/* CTA Tracking Banner Section */}
            <CtaBannerSection />

            {/* 5. Our Logistics Process Steps */}
            <ProcessSection />

            {/* 6. Testimonials Reviews slider carousel */}
            <TestimonialsSection />

            {/* Removed TrackModal instance from here, as state is gone */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
