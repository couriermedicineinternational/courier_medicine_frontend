import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Activity, 
  Leaf, 
  FlaskConical, 
  Droplet, 
  PhoneCall, 
  Send 
} from "lucide-react";

export default function WhatMedicinesSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      title: "Allopathic Medicines",
      desc: "Cancer, diabetes, HIV, cardiac, arthritis & standard general prescriptions.",
      icon: Activity,
      color: "text-[#0052CC] bg-[#0052CC]/5 border-[#0052CC]/10",
      img: "/cat_allopathic.png"
    },
    {
      title: "Ayurvedic & Herbal",
      desc: "Patanjali, Baidyanath, Dabur, Zandu, and major natural formulations.",
      icon: Leaf,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      img: "/cat_ayurvedic.png"
    },
    {
      title: "Homeopathic Care",
      desc: "SBL, Reckeweg, Schwabe, Wheezal, and other dilution remedies.",
      icon: FlaskConical,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      img: "/cat_homeopathic.png"
    },
    {
      title: "Liquids & Cold-Chain",
      desc: "Insulin, injections, liquid syrups, and temperature-sensitive vials.",
      icon: Droplet,
      color: "text-teal-600 bg-teal-50 border-teal-100",
      img: "/cat_coldchain.png"
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
        type: "spring",
        stiffness: 45,
        damping: 14
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
          src="/bright-bg.png" 
          alt="Background Pattern" 
          className="w-full h-full object-cover object-center opacity-70"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/90 to-white"></div>
      </div>

      <div id="what-medicines-inner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div id="medicines-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
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
                What Medicines <span className="text-[#0052CC]">We Can Courier</span>
              </h2>
            </div>

            {/* Introductory Paragraph */}
            <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed font-sans font-medium">
              <span className="text-[#0052CC] font-bold">Courier Medicines</span> is the leading international pharmaceutical logistics provider in India. We dispatch a wide range of medications globally to ensure your family's health is always supported, adhering to all export protocols.
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
                href="mailto:couriermedicines@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all whitespace-nowrap"
              >
                <Send size={14} />
                E-Mail Inquiry
              </a>
            </div>
          </motion.div>

          {/* Right Column - Horizontal Categories Grid (Side-by-Side Cards) */}
          <motion.div 
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {categories.map((cat, idx) => {
              const Icon = cat.icon;

              return (
                <motion.div 
                  key={idx} 
                  variants={cardVariants}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="group relative overflow-hidden border border-slate-100 bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-slate-200/60 transition-colors duration-300 flex items-start gap-4 cursor-pointer"
                >
                  {/* Rising Gradient Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0052CC] to-[#03ADA4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 pointer-events-none" />

                  {/* Icon Container */}
                  <div className={`relative z-10 w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${cat.color} group-hover:bg-white/20 group-hover:border-white/30 group-hover:text-white`}>
                    <Icon size={20} className="stroke-[2.2] transition-colors duration-300" />
                  </div>

                  {/* Text details */}
                  <div className="relative z-10 space-y-1">
                    <h4 className="text-xs md:text-sm font-extrabold text-slate-800 group-hover:text-white transition-colors duration-300 tracking-tight leading-snug">
                      {cat.title}
                    </h4>
                    <p className="text-[11px] md:text-xs text-slate-500 group-hover:text-white/80 transition-colors duration-300 font-sans leading-relaxed">
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
