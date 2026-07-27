import { useState, useEffect, lazy, Suspense } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import api from "../utils/api";

import { applyPageSEO } from "../utils/seo";

// HeroSection and StatsSection are eagerly loaded (above-the-fold content)
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";

// Below-the-fold sections are lazy loaded to reduce initial JS payload
const WhatMedicinesSection = lazy(() => import("../components/sections/WhatMedicinesSection"));
const EasySection = lazy(() => import("../components/sections/EasySection"));
const FlagsSection = lazy(() => import("../components/sections/FlagsSection"));
const DocSection = lazy(() => import("../components/sections/DocSection"));
const CtaBannerSection = lazy(() => import("../components/sections/CtaBannerSection"));
const ProcessSection = lazy(() => import("../components/sections/ProcessSection"));
const TestimonialsSection = lazy(() => import("../components/sections/TestimonialsSection"));

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
  { key: "stats", title: "Our Milestone & Network Achievements" },
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

  useEffect(() => {
    const seoSec = sections.find(s => s.metaViewTitle || s.metaDescription || s.metaKeywords) || sections[0];
    if (seoSec) {
      applyPageSEO(
        seoSec.metaViewTitle,
        seoSec.metaDescription,
        seoSec.metaKeywords,
        "Courier Medicine - International Medicine Courier Services",
        "Send medicines internationally from India with 100% custom clearance support and free pickup. We courier cancer drugs, lifesaving meds, ayurvedic and general prescriptions worldwide safely.",
        "medicine courier, international medicine delivery, send medicines from India, medicine custom clearance, medicine export"
      );
    }
  }, [sections]);

  return (
    <div id="home-page" className="w-full relative overflow-x-hidden bg-white font-sans">
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
        <>
          {sections.map((section) => {
            const Component = componentMap[section.key];
            if (!Component) return null;
            
            // HeroSection and StatsSection are eagerly imported — render them directly without Suspense delay
            if (section.key === "hero" || section.key === "stats") {
              return (
                <Component 
                  key={section.key} 
                  title={section.title} 
                  subtitle={section.subtitle} 
                  content={section.content} 
                />
              );
            }
            
            // All other sections are lazy — wrap each in its own Suspense
            return (
              <Suspense key={section.key} fallback={null}>
                <Component 
                  title={section.title} 
                  subtitle={section.subtitle} 
                  content={section.content} 
                />
              </Suspense>
            );
          })}
        </>
      )}
    </div>
  );
}
