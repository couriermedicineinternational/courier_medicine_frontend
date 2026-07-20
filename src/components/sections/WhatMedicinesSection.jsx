import React from "react";
import { motion } from "motion/react";
import { 
  Activity, 
  Leaf, 
  FlaskConical, 
  Droplet, 
  PhoneCall, 
  Send 
} from "lucide-react";
import * as Lucide from "../../utils/icons";

const categoryDesigns = [
  {
    icon: Activity,
    color: "text-[#0052CC] bg-[#0052CC]/5 border-[#0052CC]/10",
  },
  {
    icon: Leaf,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    icon: FlaskConical,
    color: "text-purple-600 bg-purple-50 border-purple-100",
  },
  {
    icon: Droplet,
    color: "text-teal-600 bg-teal-50 border-teal-100",
  }
];

export default function WhatMedicinesSection({ title, subtitle, content }) {
  const displayTitle = title || (
    <>
      What Medicines <span className="text-[#0052CC]">We Can Courier</span>
    </>
  );

  const displaySubtitle = subtitle || (
    <>
      <span className="text-[#0052CC] font-bold">Courier Medicines</span> is the leading international pharmaceutical logistics provider in India. We dispatch a wide range of medications globally to ensure your family's health is always supported, adhering to all export protocols.
    </>
  );

  const categoriesToRender = content?.categories
    ? content.categories.map((dbCat, index) => {
        const design = categoryDesigns[index % categoryDesigns.length];
        let IconComponent = design.icon;
        if (dbCat.icon && Lucide[dbCat.icon]) {
          IconComponent = Lucide[dbCat.icon];
        }
        
        let localImg = dbCat.imageUrl || dbCat.img;
        if (index === 0) localImg = "/allopathic.png";
        else if (index === 1) localImg = "/ayurvedic.png";
        else if (index === 2) localImg = "/homeopathic.png";
        else if (index === 3) localImg = "/coldchain.png";

        return {
          title: dbCat.title,
          desc: dbCat.description || dbCat.desc,
          icon: IconComponent,
          color: design.color,
          img: localImg
        };
      })
    : [
        {
          title: "Allopathic Medicines",
          desc: "Cancer, diabetes, HIV, cardiac, arthritis & standard general prescriptions.",
          icon: Activity,
          color: "text-[#0052CC] bg-[#0052CC]/5 border-[#0052CC]/10",
          img: "/allopathic.png"
        },
        {
          title: "Ayurvedic & Herbal",
          desc: "Patanjali, Baidyanath, Dabur, Zandu, and major natural formulations.",
          icon: Leaf,
          color: "text-emerald-600 bg-emerald-50 border-emerald-100",
          img: "/ayurvedic.png"
        },
        {
          title: "Homeopathic Care",
          desc: "SBL, Reckeweg, Schwabe, Wheezal, and other dilution remedies.",
          icon: FlaskConical,
          color: "text-purple-600 bg-purple-50 border-purple-100",
          img: "/homeopathic.png"
        },
        {
          title: "Liquids & Cold-Chain",
          desc: "Insulin, injections, liquid syrups, and temperature-sensitive vials.",
          icon: Droplet,
          color: "text-teal-600 bg-teal-50 border-teal-100",
          img: "/coldchain.png"
        }
      ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: 80 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.65
      }
    }
  };

  return (
    <section 
      id="what-medicines-section" 
      className="py-16 md:py-24 border-y border-slate-100 relative overflow-hidden bg-white"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://res.cloudinary.com/dib6l7ocv/image/upload/v1781865141/courier-medicine-static/bright-bg.jpg" 
          alt="Background Pattern" 
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center opacity-70"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/90 to-white"></div>
      </div>

      <div id="what-medicines-inner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div id="medicines-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Content & CTAs */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Header Badging */}
            <div className="flex flex-col items-start">
              <span className="text-[#03ADA4] bg-[#03ADA4]/10 text-[10px] md:text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3.5 leading-none">
                Shipment Capabilities
              </span>
              <h2 id="medicines-type-title" className="text-2xl md:text-3xl lg:text-[36px] font-black text-slate-800 tracking-tight leading-tight">
                {displayTitle}
              </h2>
            </div>

            {/* Introductory Paragraph */}
            <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed font-sans font-medium whitespace-pre-line">
              {typeof displaySubtitle === "string" ? (
                <span 
                  dangerouslySetInnerHTML={{ 
                    __html: displaySubtitle
                      .replace(/<em\b[^>]*><\/em>|<strong\b[^>]*><\/strong>|<span\b[^>]*><\/span>/gi, "")
                      .replace(
                        /Call\s*\/\s*WhatsApp\s*(?:on)?\s*\+?91\s*-\s*8882691919/gi,
                        '<a href="https://wa.me/918882691919" target="_blank" rel="noopener noreferrer" class="text-emerald-500 hover:text-emerald-600 font-black hover:underline">Call / WhatsApp on +91-8882691919</a>'
                      )
                  }} 
                />
              ) : (
                displaySubtitle
              )}
            </p>

            {/* Contact Call-To-Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:+918882691919"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0052CC] hover:bg-[#0052CC]/90 text-white font-bold text-xs shadow hover:scale-[1.01] active:scale-[0.99] transition-all whitespace-nowrap"
              >
                <PhoneCall size={14} />
                Call / WhatsApp Support
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=couriermedicines@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all whitespace-nowrap"
              >
                <Send size={14} />
                E-Mail Inquiry
              </a>
            </div>
          </motion.div>

          {/* Right Column - Horizontal Categories Grid (Side-by-Side Cards) */}
          <motion.div 
            className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-9"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {categoriesToRender.map((cat, idx) => {
              const Icon = cat.icon;

              return (
                <motion.div 
                  key={idx} 
                  variants={cardVariants}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
                  }}
                  className="group relative overflow-hidden border border-slate-100 bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col cursor-pointer h-[172px] xs:h-[188px] sm:h-[240px]"
                >
                  {/* Top Image Container */}
                  <div className="w-full h-20 xs:h-[90px] sm:h-[140px] overflow-hidden relative shrink-0">
                    <img 
                      src={cat.img} 
                      alt={cat.title} 
                      width={280}
                      height={180}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    {/* Small Icon Badge Overlay */}
                    <div className={`absolute top-1.5 right-1.5 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg flex items-center justify-center border transition-all duration-300 ${cat.color} bg-white/95 backdrop-blur-sm shadow-sm z-20 group-hover:scale-110`}>
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Details Container */}
                  <div className="p-3 xs:p-4 sm:p-5 flex-1 flex flex-col justify-start space-y-1 sm:space-y-1.5 relative overflow-hidden">
                    {/* Rising Gradient Background Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0052CC] to-[#03ADA4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 pointer-events-none" />

                    <h4 className="relative z-10 text-xs md:text-sm font-extrabold text-slate-800 group-hover:text-white transition-colors duration-300 tracking-tight leading-snug">
                      {cat.title}
                    </h4>
                    <p className="relative z-10 text-[10px] sm:text-[11px] md:text-xs text-slate-500 group-hover:text-white/80 transition-colors duration-300 font-sans leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
