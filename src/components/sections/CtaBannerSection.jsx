import React from "react";
import { Phone, ArrowUpRight } from "lucide-react";

export default function CtaBannerSection() {
  const handleGetQuoteClick = () => {
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const countrySelect = document.getElementById("form-country");
        if (countrySelect) countrySelect.focus();
      }, 850);
    }
  };

  return (
    <section id="cta-banner-section" className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Frosted Card Container */}
        <div className="bg-gradient-to-br from-slate-50 to-[#0052CC]/5 border border-slate-100 rounded-[2.2rem] p-8 md:p-10 lg:p-12 relative overflow-hidden shadow-[0_12px_35px_rgba(0,82,204,0.015)] flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* World Map Watermark Overlay */}
          <div className="absolute right-0 top-0 h-full w-full lg:w-2/3 pointer-events-none select-none z-0 opacity-10">
            <img 
              src="/bright-bg.png" 
              alt="World Map Graphic" 
              className="w-full h-full object-cover object-center mix-blend-multiply"
            />
          </div>

          {/* Left Text Column */}
          <div className="relative z-10 space-y-3.5 text-center lg:text-left flex flex-col items-center lg:items-start">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0052CC] bg-[#0052CC]/10 px-3.5 py-1.5 rounded-full inline-block leading-none">
              Express Delivery & Live tracking
            </span>
            <h3 className="text-xl md:text-2xl lg:text-[28px] font-black text-slate-800 tracking-tight leading-tight max-w-xl">
              Easy Tracking and Express <br className="hidden sm:block lg:hidden" />
              Door to Door Timely Delivery
            </h3>
            <p className="text-[11px] text-slate-400 font-sans font-semibold tracking-wide flex flex-wrap items-center justify-center lg:justify-start gap-1.5">
              <span>🚚 Free doorstep collection across India</span>
              <span className="text-slate-300">|</span>
              <span>✈ Guaranteed international air corridor cargo</span>
            </p>
          </div>

          {/* Right Buttons Column */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto">
            {/* Button 1: Get A Quote */}
            <button
              onClick={handleGetQuoteClick}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0052CC] text-white font-bold text-xs shadow-md shadow-[#0052CC]/10 hover:bg-[#0052CC]/95 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer leading-none border-b border-[#0052CC]"
            >
              <span>Get A Quote</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>

            {/* Button 2: Call Us */}
            <a
              href="tel:+918882691919"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs shadow-xs hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer leading-none"
            >
              <Phone size={13} className="text-[#0052CC] fill-current" />
              <span>+91-8882691919</span>
            </a>

            {/* Button 3: WhatsApp Support */}
            <a
              href="https://wa.me/918882691919?text=Hi! I want to courier medicines from India. Can I get a quote?"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs shadow-xs hover:border-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer leading-none"
            >
              {/* Official WhatsApp Logo SVG */}
              <svg className="w-3.5 h-3.5 text-emerald-500 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.488 5.36 1.489 5.567 0 10.101-4.522 10.104-10.086.002-2.695-1.042-5.228-2.942-7.133C17.224 1.518 14.704.475 12.01.475 6.444.475 1.91 5 1.907 10.563c-.001 1.888.497 3.73 1.442 5.37L2.33 21.65l5.962-1.564z" />
              </svg>
              <span>+91-8882691919</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
