import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function SpecialRates() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve calculated quote from routing state, or use default fallback for preview
  const calculatedQuote = location.state?.calculatedQuote || {
    country: "Australia",
    countryCode: "AU",
    location: "Delhi",
    medicineType: "Homeopathic Medicines",
    mobile: "8882691919",
    prescription: "YES",
    weight: "Above 1 KG",
    serviceType: "I WANT PICK UP"
  };

  // GSAP animation refs
  const summaryRef = useRef(null);
  const cardRef = useRef(null);
  const pointsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Reset initial values to prevent FOUC
    gsap.set(summaryRef.current, { y: -30, opacity: 0 });
    gsap.set(cardRef.current, { scale: 0.95, opacity: 0 });
    gsap.set(pointsRef.current, { y: 30, opacity: 0 });

    // Timeline animations
    tl.to(summaryRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.75,
      clearProps: "transform,opacity"
    })
    .to(cardRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.1)",
      clearProps: "transform,opacity"
    }, "-=0.3")
    .to(pointsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      clearProps: "transform,opacity"
    }, "-=0.3");

  }, []);

  return (
    <div id="special-rates-page" className="pb-16 bg-slate-50/50 font-sans text-slate-700 min-h-[85vh]">
      
      {/* 1. Top Search Summary Bar */}
      <div 
        ref={summaryRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8"
      >
        <div className="bg-slate-100/80 border border-slate-200/50 rounded-3xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#0052CC]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.945M11.025 21H13a2 2 0 002-2v-1a2 2 0 002-2 2 2 0 012-2h2.945M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Country</span>
                <span className="text-xs font-black text-slate-800 uppercase tracking-tight">{calculatedQuote.country}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#0052CC]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Parcel Weight</span>
                <span className="text-xs font-black text-slate-800 uppercase tracking-tight">
                  {calculatedQuote.weight}
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate("/calculator.php", { state: { calculatedQuote } })}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs shadow-3xs hover:scale-[1.01] active:scale-[0.99] transition-all select-none cursor-pointer"
          >
            Modify Search
          </button>
        </div>
      </div>

      {/* 2. Special Rates Center Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div 
          ref={cardRef}
          className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-lg text-center space-y-6 flex flex-col items-center"
        >
          
          <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-tight max-w-2xl leading-relaxed">
            For Medicine Weight Above 1 KG, Please Contact Us For Special Rates
          </h2>

          <div className="flex flex-col items-center gap-3 w-full max-w-xs pt-4">
            <a 
              href="tel:+918882691919"
              className="w-full text-center py-3.5 rounded-xl bg-[#0052CC] hover:bg-[#0052CC]/90 text-white font-extrabold text-xs shadow-sm transition-all hover:scale-[1.01] duration-200 cursor-pointer"
            >
              Call +91-8882691919
            </a>
            
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest my-1">
              OR
            </div>
            
            <a 
              href={`https://wa.me/918882691919?text=Hi! I want to courier medicine package weighing above 1 KG to ${calculatedQuote.country}. Please provide custom rates.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-sm transition-all hover:scale-[1.01] duration-200 cursor-pointer"
            >
              Whatsapp
            </a>
          </div>

        </div>
      </div>

      {/* 3. Important Points Section */}
      <div 
        ref={pointsRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-16"
      >
        <div className="border-t border-slate-200/60 pt-6">
          <h3 className="text-base font-black text-slate-800 tracking-tight uppercase mb-4 font-display">
            Important Points:-
          </h3>
          <ol className="list-decimal list-inside space-y-3.5 text-xs text-slate-500 font-semibold leading-relaxed">
            <li>
              The Rates shown above is based on customer data entered regarding weight and country. This estimate can differ on basis on Final weight and type of medicines.
            </li>
            <li>
              Customer get medicine on time is most important for Courier Medicines. So Upon arrival of medicine to our warehouse our Medicine Expert Team check on medicines and on basis of that, If different service need to be upgraded our team do so in interest of customer satisfaction for delivery of medicine smoothly.
            </li>
            <li>
              We offer pick up facility within 2 hours after booking. (within working hours). This may also vary sometime depending upon place of pick up.
            </li>
          </ol>
        </div>
      </div>

    </div>
  );
}
