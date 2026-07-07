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
import * as Lucide from "lucide-react";
import { PROCESS_STEPS } from "../../constants";

export default function ProcessSection({ title, subtitle, content }) {
  const stepIcons = [
    Calendar,
    UserCheck,
    Building,
    ClipboardCheck,
    Archive,
    Send
  ];

  const stepImages = [
    "/process_booking_new.png",
    "/process_pickup_new.png",
    "/process_warehouse_new.png",
    "/process_docs_new.png",
    "/process_packing_new.png",
    "/process_dispatch_new.png"
  ];

  const renderTitle = () => {
    if (!title) {
      return (
        <>
          Understand Our <span className="text-secondary">PROCESS</span> In Steps
        </>
      );
    }
    const words = title.split(" ");
    if (words.length > 1) {
      const lastWord = words.pop();
      return (
        <>
          {words.join(" ")} <span className="text-secondary">{lastWord}</span>
        </>
      );
    }
    return title;
  };

  const stepsToRender = content?.steps
    ? content.steps.map((dbStep, index) => {
        const configIcon = stepIcons[index % stepIcons.length] || Calendar;
        let Icon = configIcon;
        if (dbStep.icon && Lucide[dbStep.icon]) {
          Icon = Lucide[dbStep.icon];
        }
        
        let displayTitle = dbStep.title || "";
        const match = displayTitle.match(/^\d+\.\s*(.*)/);
        if (match) {
          displayTitle = match[1];
        }

        return {
          step: dbStep.step || `STEP ${index + 1}`,
          title: displayTitle,
          description: dbStep.description,
          imageUrl: dbStep.imageUrl || dbStep.img || stepImages[index % stepImages.length],
          icon: Icon
        };
      })
    : PROCESS_STEPS.steps.map((item, idx) => ({
        step: item.step,
        title: item.title,
        description: item.description,
        imageUrl: stepImages[idx % stepImages.length],
        icon: stepIcons[idx % stepIcons.length] || Calendar
      }));

  return (
    <section id="process-section" className="py-16 bg-white border-b border-slate-100">
      <div id="process-inner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 id="process-heading" className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase leading-none">
            {renderTitle()}
          </h2>
          {subtitle && (
            <p className="text-slate-500 text-sm font-medium mt-3 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mt-3" />
        </div>

        <div 
          id="process-grid" 
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8"
        >
          {stepsToRender.map((item, idx) => {
            const IconComp = item.icon;
            const imgPath = item.imageUrl;

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
                      type: "tween",
                      ease: "easeOut",
                      duration: 0.65,
                      delay: (idx % 3) * 0.15
                    }
                  }
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.015,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.04), 0 10px 10px -5px rgba(0, 0, 0, 0.01)"
                }}
                className="bg-[#F8FBFD] border border-slate-100/80 rounded-[24px] p-4 sm:p-6 flex flex-col justify-between relative group transition-colors duration-300 hover:bg-white hover:border-secondary/20 cursor-default h-auto min-h-[340px] xs:min-h-[400px] sm:min-h-[500px] md:min-h-[520px]"
              >
                <div>
                  {/* Top Row: Icon Container on Left, Step Indicator on Right */}
                  <div className="flex justify-between items-center w-full mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-secondary rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-300 shrink-0">
                      <IconComp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    </div>
                    <div className="bg-[#0052CC]/10 text-secondary rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-black sm:font-extrabold text-[10px] sm:text-xs shrink-0">
                      0{idx + 1}
                    </div>
                  </div>
 
                  {/* Step Text Indicator */}
                  <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-slate-400 block mt-1 sm:mt-2">
                    {item.step}
                  </span>
 
                  {/* Step Title */}
                  <h4 className="text-xs sm:text-base font-black sm:font-extrabold text-slate-800 tracking-tight mt-0.5 sm:mt-1 mb-1 sm:mb-2 line-clamp-1 sm:line-clamp-none">
                    {item.title}
                  </h4>
 
                  {/* Step Description */}
                  <p className="text-[10px] sm:text-xs text-slate-500 font-sans font-medium leading-normal sm:leading-relaxed mb-3 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                    {item.description}
                  </p>
                </div>
 
                {/* Step Image */}
                <div className="overflow-hidden rounded-lg sm:rounded-[16px] aspect-[4/3] w-full border border-slate-100/20 mt-auto h-auto shrink-0">
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
