import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, ChevronLeft, ChevronRight, PenTool } from "lucide-react";
import { TESTIMONIALS } from "../../constants";
import api from "../../utils/api";

export default function TestimonialsSection({ title, subtitle }) {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [testimonialsList, setTestimonialsList] = useState(TESTIMONIALS.list || []);

  useEffect(() => {
    api.get('/testimonials')
      .then(res => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          setTestimonialsList(res.data.data);
        }
      })
      .catch(err => console.error('Error fetching testimonials from API:', err));
  }, []);

  const nextTestimonial = () => {
    if (testimonialsList.length === 0) return;
    setTestimonialIdx((prev) => (prev + 1) % testimonialsList.length);
  };

  const prevTestimonial = () => {
    if (testimonialsList.length === 0) return;
    setTestimonialIdx((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  const len = testimonialsList.length;
  const activeIndices = len > 0 ? [
    testimonialIdx,
    (testimonialIdx + 1) % len,
    (testimonialIdx + 2) % len
  ] : [];

  const displayTitle = title || "Customer Feedback";
  const displayLabel = subtitle || TESTIMONIALS.sectionTitle || "Testimonials & Reviews";

  return (
    <section 
      id="testimonials-section" 
      className="py-10 md:py-14 border-y border-slate-100 relative overflow-hidden bg-white"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://res.cloudinary.com/dib6l7ocv/image/upload/f_auto,q_auto/v1781865141/courier-medicine-static/bright-bg.jpg" 
          alt="Background Pattern" 
          className="w-full h-full object-cover object-center opacity-70"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/90 to-white"></div>
      </div>

      <motion.div 
        id="testimonials-inner" 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        
        <div className="text-center mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-secondary">
            {displayLabel}
          </span>
          <h2 id="testimonials-heading" className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-none mt-1">
            {displayTitle}
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mt-2" />
        </div>

        {/* Carousel Slider Panel */}
        <div id="testimonials-slider" className="max-w-7xl mx-auto relative px-4 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {activeIndices.map((i, activePos) => {
              const item = testimonialsList[i];
              if (!item) return null;
              const displayClasses = activePos === 0 
                ? "flex" 
                : activePos === 1 
                  ? "hidden md:flex" 
                  : "hidden lg:flex";

              return (
                <motion.div
                  key={`${i}-${activePos}`}
                  initial={{ opacity: 0, scale: 0.96, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`bg-[#F1F3F4] rounded-3xl md:rounded-[2.2rem] p-6 md:p-8 text-center flex-col justify-between items-center min-h-[280px] md:min-h-[330px] w-full ${displayClasses}`}
                >
                  <div className="flex flex-col items-center w-full">
                    {/* Five Stars */}
                    <div className="flex justify-center items-center gap-1 mb-2 md:mb-4 text-[#FCBC05] relative z-10">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star 
                          key={starIdx} 
                          size={22} 
                          className={starIdx < item.rating ? "fill-[#FCBC05] stroke-[#FCBC05]" : "fill-slate-200 stroke-slate-300"} 
                        />
                      ))}
                    </div>

                    {/* Review Text block */}
                    <p className="text-slate-700 text-[13px] md:text-[15px] font-semibold leading-relaxed font-sans px-1 md:px-4 mb-3 md:mb-4 relative z-10">
                      {item.review}
                    </p>
                  </div>

                  <div className="flex flex-col items-center w-full">
                    {/* User Avatar */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#7B1FA2] text-white font-black text-sm md:text-base flex items-center justify-center shadow-sm mb-1.5 md:mb-2 uppercase leading-none relative z-10">
                      {item.avatar}
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col items-center relative z-10">
                      <h4 className="text-sm md:text-base font-black text-slate-800 tracking-tight leading-none mb-1">
                        {item.name}
                      </h4>
                      <p className="text-slate-500 text-[11px] md:text-xs font-semibold leading-none mb-1">
                        {item.designation || "Verified Customer"}
                      </p>
                      <p className="text-slate-400 text-[10px] md:text-[11px] font-medium leading-none mb-1.5">
                        {item.date || "Posted recently"}
                      </p>
                    </div>

                    {/* Google Brand Logo */}
                    <div className="relative z-10 mt-1.5 md:mt-2 flex justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 92" className="w-[55px] md:w-[70px] opacity-95">
                        <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.3 81.24 25 93.5 25s22.25 9.3 22.25 22.18zm-9.74 0c0-7.62-5.7-12.98-12.51-12.98S80.99 39.56 80.99 47.18c0 7.51 5.7 12.98 12.51 12.98s12.51-5.47 12.51-12.98z"/>
                        <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.88 9.99-22.18 22.25-22.18s22.25 9.3 22.25 22.18zm-9.74 0c0-7.62-5.7-12.98-12.51-12.98s-12.51 5.36-12.51 12.98c0 7.51 5.7 12.98 12.51 12.98s12.51-5.47 12.51-12.98z"/>
                        <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.67-13.07l8.48-3.51c1.51 3.61 5.21 7.87 11.19 7.87 7.24 0 11.69-4.47 11.69-12.87v-3.15h-.34c-2.13 2.62-6.23 4.91-11.42 4.91-11.02 0-20.73-9.52-20.73-22.01 0-12.59 9.71-22.18 20.73-22.18 5.19 0 9.29 2.29 11.42 4.81h.34V26.34h9.42zm-8.87 20.95c0-7.4-4.82-12.87-11.12-12.87-6.41 0-11.42 5.47-11.42 12.87 0 7.29 5.01 12.76 11.42 12.76 6.3 0 11.12-5.47 11.12-12.76z"/>
                        <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
                        <path fill="#EA4335" d="M262.02 54.49l7.56 5.04c-2.44 3.61-8.31 9.89-18.44 9.89-12.52 0-21.95-9.74-21.95-22.18 0-13.12 9.53-22.18 20.87-22.18 11.51 0 17.14 9.19 18.98 14.11l1.01 2.51-29.05 12.01c2.23 4.37 5.67 6.57 10.53 6.57 4.86 0 8.14-2.4 10.5-5.96zm-21.43-7.95l19.46-8.03c-1.06-2.67-4.22-4.57-7.85-4.57-4.74 0-11.77 4.21-11.61 12.6z"/>
                        <path fill="#4285F4" d="M35.17 41.65c0-11.48 9.54-20.24 21.82-20.24 11.83 0 18.66 7.64 21.05 13.88l-23.79 9.83c-1.58-3.08-4.24-5.34-7.53-5.34-4.24 0-8.62 3.66-8.62 9.22 0 5.41 4.38 9.22 8.62 9.22 3.29 0 5.76-2.11 7.28-4.81l23.51 9.71c-2.82 5.89-9.59 13.12-21.91 13.12-12.28 0-21.82-8.76-21.82-20.24zM53.15 0C32.17 0 15 17.17 15 38.15c0 20.98 17.17 38.15 38.15 38.15 10.98 0 20.95-4.47 28.15-11.69l-11.23-11.23c-4.43 4.43-10.4 7.15-16.92 7.15-13.43 0-24.39-10.96-24.39-24.39s10.96-24.39 24.39-24.39c6.52 0 12.49 2.72 16.92 7.15l11.23-11.23C74.1 4.47 64.13 0 53.15 0z"/>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Slider arrows at the sides */}
          <button
            id="slider-prev-btn"
            onClick={prevTestimonial}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white text-slate-600 hover:text-secondary border border-slate-200/50 hover:border-secondary/30 flex items-center justify-center p-0 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-secondary/10 hover:scale-105 active:scale-95 transition-all z-20 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            id="slider-next-btn"
            onClick={nextTestimonial}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white text-slate-600 hover:text-secondary border border-slate-200/50 hover:border-secondary/30 flex items-center justify-center p-0 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-secondary/10 hover:scale-105 active:scale-95 transition-all z-20 group"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Pagination Counter & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-5">
          <span className="text-sm font-bold text-slate-400 tracking-widest font-mono bg-white px-4 py-1 rounded-full border border-slate-100 shadow-sm">
            <span className="text-secondary">{String(testimonialIdx + 1).padStart(2, '0')}</span> / {String(testimonialsList.length).padStart(2, '0')}
          </span>
          
          <a
            href="https://share.google/RarGt5ZGcKbFtuiQT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary hover:bg-secondary/95 text-white text-xs font-black uppercase tracking-wider hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md cursor-pointer no-underline"
          >
            <PenTool size={13} />
            Write A Review
          </a>
        </div>

      </motion.div>
    </section>
  );
}
