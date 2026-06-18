import { useState } from "react";
import { motion } from "motion/react";
import { WE_MADE_EASY } from "../constants";
import TrackModal from "../components/sections/TrackModal";

export default function Track() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [trackResult, setTrackResult] = useState(null);

  // Handle Order Tracking Submits
  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    // Simulate real tracking outputs
    const match = trackingNumber.toUpperCase().trim();
    if (match.startsWith("CM-") || !isNaN(match)) {
      setTrackResult({
        number: match,
        status: "In Transit - Custom Clearance Phase",
        origin: "Delhi Hub, India",
        destination: "Sydney, Australia",
        updatedAt: "June 15, 2026 - 14:35 UTC",
        currentLocation: "Singapore Changi Transit Air Cargo Centre",
        history: [
          { status: "Shipment Picked up from Doorstep", date: "June 12, 2026", details: "Delhi, India" },
          { status: "Medicines Photo Verified & Structured Packing Done", date: "June 13, 2026", details: "Hub Warehouse, Delhi" },
          { status: "Customs Documentation prepared & Export gate Cleared", date: "June 14, 2026", details: "IGI Cargo, New Delhi" },
          { status: "In Transit via Air Corridor", date: "June 15, 2026", details: "Singapore Airport" },
        ]
      });
    } else {
      setTrackResult({
        number: match,
        status: "Dispatched & Scheduled for Pickup",
        origin: "Mumbai Main Office, India",
        destination: "Global Customs Gateway",
        updatedAt: "June 15, 2026 - 22:15 UTC",
        currentLocation: "Ready for Driver Dispatch",
        history: [
          { status: "Booking Confirmed & Tracking Reference Issued", date: "June 15, 2026", details: "Mumbai Office" }
        ]
      });
    }
    setIsTrackModalOpen(true);
  };

  return (
    <div id="track-page" className="py-12 md:py-20 bg-slate-50 min-h-[70vh] flex flex-col justify-center items-center font-sans px-4">
      
      {/* Title / Header for page context */}
      <div className="text-center mb-8 max-w-xl">
        <h1 className="text-2xl md:text-3.5xl font-black text-slate-800 tracking-tight leading-tight uppercase">
          Track Your <span className="text-[#0052CC]">Shipment</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-500 font-medium mt-2">
          Enter your unique tracking reference number below to check the real-time status of your international medicine courier.
        </p>
      </div>

      {/* Tracking Card Container */}
      <div className="w-full max-w-xl h-[480px]">
        <motion.div 
          id="track-card-wrapper" 
          className="h-full w-full"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div 
            id="express-delivery-card" 
            className="bg-[#03ADA4] rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden h-full flex flex-col justify-between bg-cover bg-center"
            style={{ backgroundImage: "url('/express-bg.png')" }}
          >
            
            {/* Background overlay to make text readable over the image */}
            <div className="absolute inset-0 bg-[#03ADA4]/60 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
            
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-3.5 py-1.5 rounded-full inline-block backdrop-blur-sm mb-4">
                  {WE_MADE_EASY.graphic.badge}
                </span>
                
                <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-none mb-2 text-white">
                  EXPRESS DELIVERY
                </h3>
                <p className="text-xs text-black font-bold font-sans leading-relaxed tracking-wide max-w-xs">
                  Guaranteed high-speed healthcare logistics networks. Keep close eye on your shipment real-time!
                </p>
              </div>

              {/* Track Order Input field inside visual block */}
              <div className="bg-white/10 backdrop-blur-md border border-white/25 p-5 rounded-2xl my-6 space-y-3.5 shadow-inner">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 bg-[#0052CC] rounded-full animate-ping shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-black">
                    LIVE TRACKING SYSTEM ACTIVE
                  </span>
                </div>
                
                <form onSubmit={handleTrackSubmit} className="flex gap-2">
                  <input
                    id="express-track-input"
                    type="text"
                    className="bg-white text-slate-900 border-0 rounded-lg p-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary grow placeholder-slate-400 shadow"
                    placeholder={WE_MADE_EASY.graphic.placeholder}
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                  <button
                    id="express-track-btn"
                    type="submit"
                    className="bg-primary hover:bg-primary active:scale-95 transition-all text-white font-bold text-xs px-5 py-3 rounded-lg border-b border-primary cursor-pointer shadow whitespace-nowrap"
                  >
                    {WE_MADE_EASY.graphic.buttonText}
                  </button>
                </form>
              </div>

              {/* Bottom decorative graphics */}
              <div className="grid grid-cols-3 gap-2.5 border-t border-white/10 pt-4 text-center font-sans tracking-wide">
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center mx-auto text-secondary/10 leading-none">
                    🚚
                  </div>
                  <span className="text-[9px] font-bold block uppercase text-secondary/20">Direct Vehicle</span>
                </div>
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center mx-auto text-secondary/10 leading-none">
                    ✈️
                  </div>
                  <span className="text-[9px] font-bold block uppercase text-secondary/20">Air Express</span>
                </div>
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center mx-auto text-secondary/10 leading-none">
                    👤
                  </div>
                  <span className="text-[9px] font-bold block uppercase text-secondary/20">Hand Delivery</span>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>

      {/* Live tracking journey popup */}
      <TrackModal 
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        trackResult={trackResult}
      />

    </div>
  );
}
