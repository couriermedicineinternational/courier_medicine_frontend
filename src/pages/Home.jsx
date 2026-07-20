import { useState, useEffect, lazy, Suspense } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import api from "../utils/api";

// Only HeroSection is eagerly loaded (above-the-fold LCP content)
import HeroSection from "../components/sections/HeroSection";

// Below-the-fold sections are lazy loaded to reduce initial JS payload
const StatsSection = lazy(() => import("../components/sections/StatsSection"));
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
        <Suspense fallback={null}>
          {sections.map((section) => {
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
          })}
        </Suspense>
      )}
    </div>
  );
}
