import React from "react";
import { motion } from "motion/react";
import { 
  Calendar, 
  UserCheck, 
  Building, 
  ClipboardCheck, 
  Archive, 
  Send 
} from "lucide-react";
import { PROCESS_STEPS } from "../../constants";

export default function ProcessSection() {
  const stepIcons = [
    Calendar,
    UserCheck,
    Building,
    ClipboardCheck,
    Archive,
    Send
  ];

  const stepImages = [
    "/process_booking.png",
    "/process_pickup.png",
    "/process_warehouse.png",
    "/process_documentation.png",
    "/process_packing.png",
    "/process_dispatch.png"
  ];

  return (
    <section id="process-section" className="py-16 bg-white border-b border-slate-100">
      <div id="process-inner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 id="process-heading" className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase leading-none">
            Understand Our <span className="text-secondary">PROCESS</span> In Steps
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mt-2" />
        </div>

        <div 
          id="process-grid" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PROCESS_STEPS.steps.map((item, idx) => {
            const IconComp = stepIcons[idx] || Calendar;
            const imgPath = stepImages[idx] || "/process_booking.png";

            return (
              <motion.div 
                id={`process-box-${idx}`} 
                key={idx} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, x: idx % 2 === 0 ? -100 : 100 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: {
                      type: "spring",
                      stiffness: 70,
                      damping: 14,
                      mass: 0.8,
                      delay: (idx % 3) * 0.15
                    }
                  }
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.015,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.04), 0 10px 10px -5px rgba(0, 0, 0, 0.01)"
                }}
                className="bg-[#F8FBFD] border border-slate-100/80 rounded-[24px] p-6 flex flex-col justify-between relative group transition-colors duration-300 hover:bg-white hover:border-secondary/20 cursor-default min-h-[380px]"
              >
                <div>
                  {/* Top Row: Icon Container on Left, Step Indicator on Right */}
                  <div className="flex justify-between items-center w-full mb-4">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-300">
                      <IconComp size={20} className="stroke-[2.5]" />
                    </div>
                    <div className="bg-[#0052CC]/10 text-secondary rounded-full w-8 h-8 flex items-center justify-center font-extrabold text-xs">
                      0{idx + 1}
                    </div>
                  </div>

                  {/* Step Text Indicator */}
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mt-2">
                    {item.step}
                  </span>

                  {/* Step Title */}
                  <h4 className="text-base font-extrabold text-slate-800 tracking-tight mt-1 mb-2">
                    {item.title}
                  </h4>

                  {/* Step Description */}
                  <p className="text-xs text-slate-500 font-sans font-medium leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Step Image */}
                <div className="overflow-hidden rounded-[16px] aspect-[16/10] w-full border border-slate-100/20 mt-auto">
                  <img 
                    src={imgPath} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
