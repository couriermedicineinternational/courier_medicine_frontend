import React from "react";
import { motion } from "motion/react";
import { FileText, Receipt, ClipboardCheck, Globe } from "lucide-react";
import DOMPurify from "dompurify";
import * as Lucide from "lucide-react";
import { DOCUMENTATION } from "../../constants";

export default function DocSection({ title, subtitle, content }) {
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

  const renderTitle = () => {
    if (!title) {
      return (
        <>
          {DOCUMENTATION.title}{" "}
          <span className="bg-gradient-to-r from-[#0052CC] to-[#03ADA4] bg-clip-text text-transparent">
            {DOCUMENTATION.blueTitle}
          </span>
        </>
      );
    }
    // Make the last word of the database title have the gradient
    const words = title.split(" ");
    if (words.length > 1) {
      const lastWord = words.pop();
      return (
        <>
          {words.join(" ")}{" "}
          <span className="bg-gradient-to-r from-[#0052CC] to-[#03ADA4] bg-clip-text text-transparent">
            {lastWord}
          </span>
        </>
      );
    }
    return title;
  };

  const itemsToRender = content?.items || DOCUMENTATION.accordion;

  return (
    <section id="doc-section" className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50/50 border-b border-slate-100 relative overflow-hidden">
      {/* Decorative background gradients for premium aesthetics */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#03ADA4]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#0052CC]/5 rounded-full blur-[100px] pointer-events-none" />

      <div id="doc-inner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.h2 
            id="doc-heading" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[40px] font-black text-slate-800 tracking-tight leading-tight uppercase"
          >
            {renderTitle()}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-500 text-sm md:text-[15px] font-medium mt-3 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
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
          {itemsToRender.map((item, idx) => {
            const configIcon = icons[idx % icons.length] || FileText;
            let Icon = configIcon;
            if (item.icon && Lucide[item.icon]) {
              Icon = Lucide[item.icon];
            }
            return (
              <motion.div
                key={item.id || idx}
                id={`doc-item-${item.id || idx}`}
                variants={cardVariants}
                whileHover={{ 
                  y: -6, 
                  scale: 1.01
                }}
                className="group relative overflow-hidden bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(0,82,204,0.06)] hover:border-transparent transition-[border-color,box-shadow] duration-300 flex flex-col sm:flex-row items-start gap-5 md:gap-6 cursor-pointer md:h-[220px] h-auto w-full"
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
                <div className="space-y-2 relative z-10 pt-0.5 w-full">
                  <h3 className="text-base md:text-lg font-black text-slate-800 group-hover:text-white transition-colors duration-300 tracking-tight">
                    {item.title}
                  </h3>
                  <div className="relative overflow-visible md:overflow-hidden md:h-[110px] md:group-hover:overflow-y-auto custom-scrollbar pr-1 transition-all duration-300">
                    <div 
                      className="text-[13px] text-slate-500 group-hover:text-white/80 leading-relaxed font-medium prose prose-sm max-w-none transition-colors duration-300 pb-4 reset-rich-text"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }}
                    />
                    {/* Fade-out Overlay - Visible only when NOT hovered */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0 hidden md:block" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
