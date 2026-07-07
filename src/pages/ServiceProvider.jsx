import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadPricingData, getProvidersForCountry, calculatePrice } from "../utils/pricing";
import { ALL_COUNTRIES } from "../constants";
import gsap from "gsap";

export default function ServiceProvider() {
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
    weight: 0.5,
    provider: "DHL",
    price: 3400,
    timeline: "3-5 Business Days",
    bookingRef: "CM-631479",
    serviceType: "I WANT PICK UP"
  };

  const [loading, setLoading] = useState(true);
  const [providersList, setProvidersList] = useState([]);

  // GSAP animation refs
  const summaryRef = useRef(null);
  const cardsRef = useRef(null);
  const pointsRef = useRef(null);

  useEffect(() => {
    loadPricingData().then(() => {
      // Find all configured providers for this country from DB
      const dbProviders = getProvidersForCountry(calculatedQuote.country);

      // Define standard providers to show
      const standardProviders = ["UPS", "FedEx", "DHL", "ECONOMY POST"];
      
      const resolved = standardProviders.map(provName => {
        // Check if provider has custom rates in DB
        const dbProv = dbProviders.find(p => p.provider.toUpperCase() === provName.toUpperCase());
        
        let price = calculatePrice(calculatedQuote.country, provName, parseFloat(calculatedQuote.weight || 0.5));
        
        // Fallback calculations if no database pricing row found
        if (price === null) {
          const basePrices = {
            "UPS": 3305,
            "FedEx": 3602,
            "DHL": 3729,
            "ECONOMY POST": 3127
          };
          const base = basePrices[provName] || 3500;
          const w = parseFloat(calculatedQuote.weight || 0.5);
          if (w <= 0.5) price = base;
          else if (w <= 1.0) price = base + 1500;
          else price = base + 1500 + Math.ceil((w - 1.0) / 0.5) * 1500;
        }

        const finalPrice = Math.round(price);

        // Get timeline
        let timeline = dbProv ? dbProv.timeline : null;
        if (!timeline) {
          const timelines = {
            "UPS": "4-6 Days",
            "FedEx": "5-7 Days",
            "DHL": "6-7 Days",
            "ECONOMY POST": "10-12 Days"
          };
          timeline = timelines[provName] || "5-7 Days";
        }

        return {
          name: provName === "ECONOMY POST" ? "Economy Post" : provName,
          keyName: provName,
          price: finalPrice,
          timeline: timeline
        };
      });

      setProvidersList(resolved);
      setLoading(false);
    });
  }, [calculatedQuote]);

  // GSAP Entrance Animations
  useEffect(() => {
    if (!loading && providersList.length > 0) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Reset initial values to prevent flickering (start cards offset to the left)
      gsap.set(summaryRef.current, { y: -30, opacity: 0 });
      if (cardsRef.current) {
        gsap.set(cardsRef.current.children, { x: -60, opacity: 0 });
      }
      gsap.set(pointsRef.current, { y: 30, opacity: 0 });

      // 1. Animate top summary bar (Slide down + Fade in)
      tl.to(summaryRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        clearProps: "transform,opacity"
      });

      // 2. Animate comparison cards with staggering slide from left to right
      if (cardsRef.current) {
        tl.to(cardsRef.current.children, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          clearProps: "transform,opacity"
        }, "-=0.45");
      }

      // 3. Fade in Important Points Section from the bottom
      tl.to(pointsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        clearProps: "transform,opacity"
      }, "-=0.3");
    }
  }, [loading, providersList]);

  // Helper to render provider logo
  const renderProviderLogo = (keyName) => {
    switch (keyName.toUpperCase()) {
      case "UPS":
        return (
          <svg className="h-14 w-auto" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2 C28 2, 38 4, 38 16 C38 28, 28 38, 20 44 C12 38, 2 28, 2 16 C2 4, 12 2, 20 2 Z" fill="#351C15" stroke="#FFC72C" strokeWidth="2.5" />
            <path d="M4 14C10 11 30 11 36 14" stroke="#FFC72C" strokeWidth="2" />
            <text x="20" y="32" fill="#FFC72C" fontWeight="bold" fontSize="15" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-0.5">ups</text>
          </svg>
        );
      case "FEDEX":
        return (
          <div className="flex flex-col items-center">
            <span className="text-3.5xl font-black tracking-tighter leading-none">
              <span className="text-[#4D148C]">Fed</span><span className="text-[#FF6600]">Ex</span>
            </span>
            <span className="text-[9px] font-bold text-[#4D148C] tracking-widest uppercase mt-0.5">Express</span>
          </div>
        );
      case "DHL":
        return (
          <div className="h-10 w-28 flex items-center justify-center bg-[#FFCC00] rounded-sm px-3 select-none">
            <svg className="h-5 w-auto" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="skewX(-15)">
                <text x="50" y="18" fill="#D40511" fontWeight="900" fontSize="18" fontFamily="Impact, Arial Black, sans-serif" letterSpacing="0.5" textAnchor="middle">DHL</text>
              </g>
            </svg>
          </div>
        );
      case "ECONOMY POST":
      default:
        return (
          <div className="h-14 w-28 flex flex-col items-center justify-center bg-[#0052CC]/90 text-white rounded-lg px-2 text-center select-none shadow-xs">
            <span className="text-[10px] font-black tracking-widest uppercase leading-none">Economy</span>
            <span className="text-[14px] font-black tracking-wider uppercase mt-1 leading-none">Post</span>
          </div>
        );
    }
  };

  return (
    <div id="service-provider-page" className="pb-16 bg-[#F8FAFC]/50 font-sans text-slate-700 min-h-[60vh] overflow-hidden">
      
      {/* Top Details Summary Bar */}
      <div ref={summaryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" style={{ opacity: 0 }}>
        <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-2xs">
          <div className="flex gap-10 sm:gap-16 items-center flex-wrap">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Country</span>
              <span className="text-sm font-extrabold text-slate-800">{calculatedQuote.country}</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Parcel Weight</span>
              <span className="text-sm font-extrabold text-slate-800">{calculatedQuote.weight} KG</span>
            </div>
          </div>
          
          <button
            onClick={() => navigate("/calculator.php", { state: { calculatedQuote } })}
            className="bg-[#0052CC] hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors whitespace-nowrap"
          >
            Modify Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Service Provider Cards Grid */}
          <div ref={cardsRef} className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 md:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {providersList.map((p, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-3 xs:p-4 md:p-6 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:scale-[1.015] transition-all duration-300 h-full justify-between"
                style={{ opacity: 0 }}
              >
                <div className="w-full flex flex-col items-center flex-1">
                  {/* Logo wrapper */}
                  <div className="h-12 md:h-20 flex items-center justify-center mb-2 md:mb-4 w-full px-2">
                    {renderProviderLogo(p.keyName)}
                  </div>

                  <div className="w-full border-t border-slate-100 my-1 md:my-2" />

                  {/* Price block */}
                  <div className="my-2 md:my-3">
                    <span className="text-[9px] md:text-[11px] text-slate-400 font-semibold block mb-0.5 uppercase tracking-wide">Courier Charges</span>
                    <span className="text-sm md:text-lg font-black text-slate-800 border-b border-[#03ADA4]/30 pb-0.5 px-1 md:px-2 inline-block">
                      Rs. {p.price}
                    </span>
                  </div>

                  {/* Estimated delivery timeline */}
                  <div className="my-2 md:my-3">
                    <span className="text-[9px] md:text-[11px] text-slate-400 font-semibold block mb-0.5 uppercase tracking-wide">Estimated Delivery</span>
                    <span className="text-xs md:text-sm font-black text-slate-800 border-b border-[#03ADA4]/30 pb-0.5 px-1 md:px-2 inline-block">
                      {p.timeline}
                    </span>
                    <span className="text-[8px] md:text-[10px] font-black text-[#0052CC] block mt-1 uppercase tracking-wider">
                      Once Intransit
                    </span>
                  </div>
                </div>

                {/* Click to Book Button - routes to booking.php */}
                <button
                  onClick={() => navigate("/booking.php", { state: { calculatedQuote, selectedProvider: p } })}
                  className="w-full text-center py-2 md:py-2.5 rounded-lg md:rounded-xl bg-[#0052CC] hover:bg-blue-700 text-white font-extrabold text-[10px] md:text-xs select-none shadow-xs transition-colors mt-3 md:mt-5 cursor-pointer focus:outline-none shrink-0"
                >
                  Click to Book
                </button>
              </div>
            ))}
          </div>

          {/* Important Points Section */}
          <div ref={pointsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12" style={{ opacity: 0 }}>
            <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 md:p-8">
              <h3 className="text-base font-black text-slate-800 tracking-tight mb-4 uppercase font-display">
                Important Points:-
              </h3>
              <ol className="list-decimal pl-4 text-xs md:text-[13px] text-slate-500 font-medium space-y-3 leading-relaxed">
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
        </>
      )}
    </div>
  );
}
