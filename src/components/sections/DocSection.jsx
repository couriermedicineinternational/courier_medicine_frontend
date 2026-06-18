import React from "react";
import { motion } from "motion/react";
import { FileText, Receipt, ClipboardCheck, Globe } from "lucide-react";
import { DOCUMENTATION } from "../../constants";

export default function DocSection() {
  const icons = [FileText, Receipt, ClipboardCheck, Globe];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.24
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 35,
        damping: 15
      }
    }
  };

  return (
    <section id="doc-section" className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50/50 border-b border-slate-100 relative overflow-hidden">
      {/* Decorative background gradients for premium aesthetics */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#03ADA4]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#0052CC]/5 rounded-full blur-[100px] pointer-events-none" />

      <div id="doc-inner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#03ADA4] bg-[#03ADA4]/10 text-xs md:text-sm font-black uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-4 leading-none"
          >
            Clearance & Compliance
          </motion.span>
          <motion.h2 
            id="doc-heading" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[40px] font-black text-slate-800 tracking-tight leading-tight uppercase"
          >
            {DOCUMENTATION.title} <span className="bg-gradient-to-r from-[#0052CC] to-[#03ADA4] bg-clip-text text-transparent">{DOCUMENTATION.blueTitle}</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 bg-gradient-to-r from-[#0052CC] to-[#03ADA4] mx-auto rounded-full mt-4" 
          />
        </div>

        {/* 2x2 Grid of Premium Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {DOCUMENTATION.accordion.map((item, idx) => {
            const Icon = icons[idx] || FileText;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.015
                }}
                className="group relative overflow-hidden bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(0,82,204,0.06)] hover:border-transparent transition-colors duration-300 flex flex-col sm:flex-row items-start gap-5 md:gap-6 cursor-pointer"
              >
                {/* Rising Gradient Background Overlay (Logo Colors) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0052CC] to-[#03ADA4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 pointer-events-none" />

                {/* Left Side Icon Wrapper */}
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-50 group-hover:bg-white/20 flex items-center justify-center text-[#0052CC] group-hover:text-white transition-all duration-500 shadow-sm relative z-10">
                  <Icon 
                    className="w-6 h-6 md:w-7 md:h-7 stroke-[1.8] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" 
                  />
                </div>

                {/* Right Side Details */}
                <div className="space-y-2 relative z-10 pt-0.5">
                  <h3 className="text-base md:text-lg font-black text-slate-800 group-hover:text-white transition-colors duration-300 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 group-hover:text-white/80 text-xs md:text-sm leading-relaxed font-sans font-medium transition-colors duration-300">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
