import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function Thanks() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve success details from routing state, or use high-fidelity preview defaults
  const successData = location.state?.successData || {
    bookingRef: "CM-638552",
    customerPhone: "0935444289",
    destinationCountry: "United States"
  };

  const selectedProvider = location.state?.selectedProvider || {
    name: "DHL"
  };

  const totalAmount = location.state?.totalAmount || 3900;

  // Refs for GSAP animations
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const titleGroupRef = useRef(null);
  const detailsBoxRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial state setup to prevent FOUC
    gsap.set(cardRef.current, { y: 40, opacity: 0 });
    gsap.set(iconRef.current, { scale: 0.5, opacity: 0 });
    if (titleGroupRef.current) {
      gsap.set(titleGroupRef.current.children, { y: 20, opacity: 0 });
    }
    gsap.set(detailsBoxRef.current, { scale: 0.95, opacity: 0 });
    gsap.set(descRef.current, { y: 15, opacity: 0 });
    if (buttonsRef.current) {
      gsap.set(buttonsRef.current.children, { y: 15, opacity: 0 });
    }

    // Timeline animations
    tl.to(cardRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      clearProps: "transform,opacity"
    })
    .to(iconRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      clearProps: "transform,opacity"
    }, "-=0.3")
    .to(titleGroupRef.current.children, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      clearProps: "transform,opacity"
    }, "-=0.2")
    .to(detailsBoxRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      clearProps: "transform,opacity"
    }, "-=0.2")
    .to(descRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      clearProps: "transform,opacity"
    }, "-=0.3")
    .to(buttonsRef.current.children, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.08,
      clearProps: "transform,opacity"
    }, "-=0.25");

  }, []);

  return (
    <div id="thanks-page-wrapper" className="min-h-[calc(100vh-140px)] bg-slate-50/50 flex items-center justify-center p-4 font-sans">
      
      {/* Centered Success Card Container (Compact View) */}
      <div 
        ref={cardRef}
        className="bg-white rounded-2xl p-5 md:p-6 max-w-md w-full shadow-xl border border-slate-200/80 text-center space-y-4"
      >
        
        {/* Compact Checkmark Icon */}
        <div 
          ref={iconRef}
          className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-xs"
        >
          <svg className="w-6 h-6 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading & Subheading */}
        <div ref={titleGroupRef} className="space-y-0.5">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block font-display">
            Booking Confirmed
          </span>
          <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
            Your Order has been Booked!
          </h1>
        </div>

        {/* Reference details Box */}
        <div 
          ref={detailsBoxRef}
          className="bg-[#0052CC]/5 border border-[#0052CC]/15 rounded-xl p-4 text-center space-y-3 font-sans text-xs font-semibold text-slate-700"
        >
          <div>
            <p className="text-sm text-slate-800 font-extrabold tracking-tight">
              Please Note Your Booking ID : <span className="text-[#0052CC] font-black text-base whitespace-nowrap">{successData.bookingRef}</span>
            </p>
            <p className="text-slate-600 font-bold text-xs mt-1">Our Team will Contact you</p>
          </div>

          <div className="flex items-center justify-center gap-2 my-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
            <div className="h-px bg-slate-200 w-12" />
            <span>Or</span>
            <div className="h-px bg-slate-200 w-12" />
          </div>

          <div>
            <a 
              href={`https://wa.me/918882691919?text=Hi! My Booking ID is: ${successData.bookingRef}. Please assist with my medicine courier booking.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#03ADA4] hover:underline font-black text-sm block animate-pulse"
            >
              You Can Whatsapp on +91- 8882691919
            </a>
            <p className="text-[10px] text-slate-400 font-bold mt-1">
              (Do Mention Your Above Booking Id)
            </p>
          </div>
        </div>

        <p 
          ref={descRef}
          className="text-[11px] text-slate-500 leading-relaxed font-semibold px-2"
        >
          Thank you for booking with Courier Medicines.
        </p>

        {/* Buttons Actions */}
        <div ref={buttonsRef} className="flex flex-col gap-2 pt-1">
          <a
            href={`https://wa.me/918882691919?text=Hi! I have placed a medicine courier booking to ${successData.destinationCountry}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs select-none shadow-sm transition-all hover:scale-[1.01] duration-200 cursor-pointer"
          >
            💬 WhatsApp Confirmation
          </a>
          <button
            onClick={() => navigate("/")}
            className="w-full text-center py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs select-none shadow-3xs transition-all hover:scale-[1.01] duration-200 cursor-pointer"
          >
            🏠 Return to Homepage
          </button>
        </div>

      </div>

    </div>
  );
}
