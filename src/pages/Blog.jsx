import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BLOG_PAGE } from "../constants";
import { Calendar, User, Clock, ArrowRight, ArrowLeft, BookOpen, CheckCircle, AlertCircle, Lightbulb, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Rich article body content keyed by post id
const POST_CONTENT = {
  1: {
    sections: [
      {
        heading: "1. The Doctor's Rx Prescription (Essential)",
        body: "Every international parcel containing pharmaceuticals must have a computerized, valid Rx prescription copy from a registered medical practitioner. The prescription should state the drug names, active chemical molecules, dosages, and exact quantities. Handwriting notes must be clear and readable."
      },
      {
        heading: "2. Authentic Tax Retail Invoice",
        body: "Under trade regulations in India, a physical cash memo or GST computerized tax invoice must accompany the parcel. The name of the patient on both the invoice and prescription should strictly correspond. Our packaging team reconciles these two elements before starting customs commercial invoices."
      },
      {
        heading: "3. Temperature & Material Bubble Packaging",
        body: "Many chronic disease medications require stable container states. We apply secondary insulated bubble wrapping and clean cardboard overlays to protect vials and liquid bottles against cargo flight pressure shifts or bumps."
      },
      {
        heading: "4. Customs Declaration Form",
        body: "A correctly filled customs declaration form is mandatory for all international pharmaceutical shipments. This includes the HS code for medicines, declared value, and a brief description of the contents. Incorrect declarations can result in seizure or heavy fines."
      }
    ],
    tip: "Always retain copies of all documents submitted. Customs officers may request originals at the destination country's border."
  },
  2: {
    sections: [
      {
        heading: "1. Why Liquid Medicines Are High-Risk",
        body: "Cargo holds in commercial aircraft experience significant pressure changes during ascent and descent. Liquid medicines in glass vials or plastic bottles can expand, crack, or leak if not properly sealed and wrapped — contaminating other items and rendering the medicine unusable."
      },
      {
        heading: "2. Our Secondary Insulated Wrapping System",
        body: "We use a two-layer protection system: first, individual medicines are wrapped in food-grade bubble wrap. Then, each batch is placed inside a rigid cardboard shell with moisture-absorbing silica gel packets. This double barrier prevents breakage and moisture ingress."
      },
      {
        heading: "3. Leak-Proof Zip Sealing",
        body: "All liquid vials and syrup bottles are placed inside leak-proof polythene zip pouches before entering the bubble wrap stage. Even if a bottle develops a hairline crack, the sealed pouch prevents spillage."
      },
      {
        heading: "4. Cold-Chain for Temperature-Sensitive Liquids",
        body: "For insulin and other biologics in liquid form, we use validated cold-chain boxes with gel ice packs that maintain 2°C–8°C for up to 48 hours in transit — sufficient for most international destinations via DHL Express or UPS Express."
      }
    ],
    tip: "Request a cold-chain shipment declaration certificate from us if your destination country's customs require proof of temperature-controlled transport."
  },
  3: {
    sections: [
      {
        heading: "1. United States (FDA Regulations)",
        body: "The US FDA requires that all imported medicines are for personal use only, with a maximum 3-month supply. A valid prescription from a licensed US physician or the prescribing Indian doctor is needed. Schedule H and Schedule X drugs are strictly monitored by CBP (Customs & Border Protection)."
      },
      {
        heading: "2. United Kingdom (MHRA Rules)",
        body: "The UK's MHRA mandates that all controlled medicines — including many common Indian generics — must be declared at the border. A prescription and a covering letter from the patient's UK GP explaining medical necessity significantly speeds up clearance."
      },
      {
        heading: "3. Germany & Schengen Zone",
        body: "BfArM (German Federal Institute) allows personal import of up to a 3-month supply with a valid Rx prescription. Medicines must be in their original manufacturer packaging with German or English labels. Homeopathic and Ayurvedic medicines may require additional NOC documents."
      },
      {
        heading: "4. Australia (TGA Rules)",
        body: "Australia's Therapeutic Goods Administration (TGA) permits personal medicine imports under the personal importation scheme. Quantities must not exceed 3 months' supply, and biosimilars or biologics require advance TGA approval before shipping."
      }
    ],
    tip: "For destinations with strict policies, we recommend shipping 4–5 days before the patient's medicine supply runs out to account for customs processing time."
  },
  4: {
    sections: [
      {
        heading: "1. Transit Time Comparison",
        body: "DHL Express typically delivers within 3–5 business days from India to most destinations. UPS Express Saver averages 4–6 business days. For urgent medicines, DHL's Express Worldwide service (2–3 days to USA and Europe) is the clear winner."
      },
      {
        heading: "2. Cold-Chain Capability",
        body: "Both carriers offer cold-chain services, but DHL's Medical Express service is purpose-built for pharmaceutical shipments, with validated cool-chain packaging and dedicated healthcare logistics teams. UPS also has a reliable cold-chain network via UPS Temperature True."
      },
      {
        heading: "3. Pricing Differences",
        body: "For packages under 5kg, DHL is typically 10–15% cheaper than UPS to the USA and Europe. However, for heavier shipments (10–20kg), UPS often offers more competitive volumetric weight pricing. Always get a quote for your specific package dimensions."
      },
      {
        heading: "4. Our Recommendation",
        body: "Based on our 500+ shipment history, we recommend DHL for time-sensitive medicines and UPS for larger, non-critical bulk orders. Both carriers have excellent customs brokerage in India and most destination countries."
      }
    ],
    tip: "We negotiate bulk rates with both DHL and UPS — so booking through Courier Medicines often gets you a better price than booking directly."
  },
  5: {
    sections: [
      {
        heading: "1. US FDA Personal Import Rules",
        body: "NRIs in the USA can legally receive Indian medicines under the FDA's Personal Importation Policy. The parcel must be for personal use only, with a maximum 90-day supply. The medicine must not be commercially available as a US-approved equivalent at an affordable price."
      },
      {
        heading: "2. UK MHRA Guidelines for NRIs",
        body: "NRIs in the UK can import Indian medicines for personal use by obtaining a supporting letter from their UK GP. The letter should state the medical necessity and confirm the prescription. Controlled drugs require an individual import license from the Home Office."
      },
      {
        heading: "3. Canada Health Regulations",
        body: "Health Canada permits personal importation of up to a 90-day supply of prescription medicines. The medicines must be in their original manufacturer packaging. A valid prescription from any licensed medical practitioner (Indian or Canadian) must accompany the shipment."
      },
      {
        heading: "4. How to Place an Order with Us",
        body: "Simply WhatsApp us your prescription, the list of medicines needed, and your full delivery address. We source the medicines, prepare all customs documents, and ship via DHL or UPS. You receive a tracking number within 24 hours of order confirmation."
      }
    ],
    tip: "NRIs should check whether their health insurance covers imported medicines — some plans in the USA and Canada provide partial reimbursement."
  },
  6: {
    sections: [
      {
        heading: "1. Why 2°C–8°C Cold-Chain Matters",
        body: "Insulin, biologics, and biosimilars are protein-based medicines that denature (become inactive) when exposed to temperatures above 8°C for extended periods. A single flight without cold-chain packaging can render an entire shipment of insulin ineffective — a serious health risk."
      },
      {
        heading: "2. Our Validated Cold Box System",
        body: "We use validated ISO-certified cold boxes with phase-change gel ice packs. These maintain 2°C–8°C for 48–72 hours — well beyond the transit time of any DHL or UPS Express shipment to any international destination."
      },
      {
        heading: "3. Cold-Chain Documentation",
        body: "Each cold-chain shipment includes a temperature monitoring log (a small digital data logger inside the box), a cold-chain declaration certificate for customs, and a Certificate of Analysis from the original pharmacy confirming the medicine's storage history."
      },
      {
        heading: "4. Special Packaging for Pens and Cartridges",
        body: "Insulin pens and cartridges require additional cushioning to prevent the pen mechanism from jamming during transit. We individually wrap each pen in foam sheets and place them in a rigid secondary box before inserting into the cold unit."
      }
    ],
    tip: "Request a temperature log certificate from us upon delivery. This document confirms your insulin maintained the correct temperature throughout transit."
  },
  7: {
    sections: [
      {
        heading: "1. Valid Rx Prescription",
        body: "A computerized prescription from a licensed medical practitioner showing the patient's name, medicine names, dosages, and duration is the most critical document. Without this, customs will hold or seize the package at the destination."
      },
      {
        heading: "2. GST Tax Invoice from Pharmacy",
        body: "A GST-compliant tax invoice from the pharmacy confirming the purchase is required by Indian customs for export clearance. The patient's name on the invoice must exactly match the prescription and the shipping label."
      },
      {
        heading: "3. Customs Commercial Invoice",
        body: "Our team prepares a detailed customs commercial invoice listing each medicine, its HS code, declared value, quantity, and country of origin. This document is submitted to both Indian Customs (for export) and destination country customs (for import clearance)."
      },
      {
        heading: "4. Packing List & NOC (if required)",
        body: "A packing list detailing box dimensions, weight, and contents is required for all shipments. Some countries (UAE, Saudi Arabia, Japan) additionally require a No Objection Certificate (NOC) from the destination country's health authority for certain controlled medicines."
      }
    ],
    tip: "We prepare all customs documents on your behalf at no extra charge. All you need to provide is your prescription and delivery address."
  },
  8: {
    sections: [
      {
        heading: "1. UAE Ministry of Health Requirements",
        body: "The UAE requires all imported medicines to be on the Ministry of Health's approved list. A valid prescription from a UAE-registered doctor is preferred. Medicines containing pseudoephedrine, codeine, or other controlled substances require an advance import permit from the UAE MOH."
      },
      {
        heading: "2. Saudi Arabia SFDA Rules",
        body: "Saudi Arabia's SFDA (Saudi Food & Drug Authority) limits personal medicine imports to a 3-month supply. Psychotropic or narcotic medicines require a special import authorization. All medicines must have Arabic language inserts or labels."
      },
      {
        heading: "3. Qatar MOPHRegulations",
        body: "Qatar's Ministry of Public Health allows personal medicine imports with a valid Qatari doctor's prescription. The quantity is limited to 3 months' supply. Medicines must be in original sealed manufacturer packaging with English or Arabic instructions."
      },
      {
        heading: "4. Our Gulf Region Expertise",
        body: "We have shipped to UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman over 200 times. Our team is well-versed in Gulf customs requirements and prepares country-specific documentation for each destination, including Arabic declarations where required."
      }
    ],
    tip: "For the UAE and Saudi Arabia, we recommend placing your order 7 days in advance to allow time for any MOH approval requirements."
  },
  9: {
    sections: [
      {
        heading: "1. Same Active Compound, Lower Price",
        body: "Indian generics contain exactly the same active pharmaceutical ingredient (API) as their branded counterparts — the only difference is the manufacturer and price. A branded diabetes medicine costing $200 in the USA can cost as little as ₹300 (under $4) in India."
      },
      {
        heading: "2. WHO-GMP Certified Indian Manufacturers",
        body: "The majority of Indian generic medicine manufacturers hold WHO-GMP certifications and supply generics to over 200 countries, including the USA (FDA-approved plants), UK (MHRA-approved), and EU. India is the world's largest supplier of generic medicines."
      },
      {
        heading: "3. Chronic Condition Cost Savings",
        body: "NRI families managing chronic conditions like diabetes, hypertension, thyroid disorders, or cancer often save 80–95% on their annual medicine spend by sourcing from India versus buying in their country of residence. This makes Indian generics particularly valuable for uninsured or underinsured NRIs."
      },
      {
        heading: "4. Ayurvedic & Herbal Medicine Demand",
        body: "Beyond allopathic generics, Indian Ayurvedic and herbal formulations — Ashwagandha, Triphala, Brahmi, Shilajit — are in extremely high demand among NRIs worldwide who prefer natural alternatives. These are generally easier to import (fewer restrictions) than prescription allopathics."
      }
    ],
    tip: "Always verify the generic medicine's brand name with your Indian doctor before ordering, to ensure exact equivalence with your current prescription."
  }
};

// Hero banner image for article detail (like About page style)
const BLOG_HERO_IMAGE = "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80";

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated shimmer loading (like About page)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // When opening/closing a post, scroll to top
  const openPost = (post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const closePost = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        /* ── Shimmer Loading Screen ── */
        <motion.div
          key="blog-shimmer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white font-sans pb-16"
        >
          {/* Hero shimmer */}
          <div className="h-[250px] md:h-[320px] bg-slate-100 relative overflow-hidden flex items-end pb-8 md:pb-12">
            <div className="shimmer-bg absolute inset-0" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 space-y-3">
              <div className="shimmer-bg h-9 w-64 rounded-md" />
              <div className="shimmer-bg h-4 w-32 rounded-md" />
            </div>
          </div>
          {/* Cards shimmer */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-3xl overflow-hidden border border-slate-100">
                  <div className="shimmer-bg h-48 w-full" />
                  <div className="p-6 space-y-3">
                    <div className="shimmer-bg h-3 w-28 rounded-full" />
                    <div className="shimmer-bg h-5 w-full rounded-md" />
                    <div className="shimmer-bg h-5 w-4/5 rounded-md" />
                    <div className="shimmer-bg h-3 w-full rounded-md" />
                    <div className="shimmer-bg h-3 w-3/4 rounded-md" />
                    <div className="shimmer-bg h-3 w-1/2 rounded-md" />
                    <div className="shimmer-bg h-4 w-28 rounded-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="blog-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="bg-white font-sans"
        >
          <AnimatePresence mode="wait">
            {selectedPost ? (
              /* ══════════════════════════════════════════
                 ARTICLE DETAIL VIEW
              ══════════════════════════════════════════ */
              <motion.div
                key={`post-${selectedPost.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* ── Hero Banner (About-page style) ── */}
                <div
                  id="blog-detail-hero"
                  className="relative h-[250px] md:h-[320px] overflow-hidden flex items-end pb-8 md:pb-12 bg-slate-950"
                >
                  <motion.div
                    initial={{ scale: 1.12, opacity: 0 }}
                    animate={{ scale: 1.0, opacity: 1.0 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${BLOG_HERO_IMAGE}')` }}
                  />
                  {/* Gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="space-y-2"
                    >
                      <h1 className="text-2xl md:text-4xl font-black tracking-tight font-display uppercase text-white drop-shadow-xs leading-tight max-w-3xl">
                        {selectedPost.title}
                      </h1>
                      <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center gap-2 text-white/80">
                        <button onClick={closePost} className="hover:text-primary transition-colors text-white/90 cursor-pointer">
                          Blog
                        </button>
                        <span className="text-white/40">»</span>
                        <span className="text-[#03ADA4] font-bold">Article</span>
                      </nav>
                    </motion.div>
                  </div>
                </div>

                {/* ── Article Body ── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                  {/* Back Button */}
                  <motion.button
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    id="back-to-blogs-btn"
                    onClick={closePost}
                    className="inline-flex items-center gap-2 text-[#0052CC] hover:text-[#03ADA4] font-bold text-xs mb-8 uppercase tracking-wider font-sans border border-[#0052CC]/20 rounded-xl py-2.5 px-5 hover:bg-[#0052CC]/5 transition-all cursor-pointer"
                  >
                    <ArrowLeft size={14} /> Back to All Articles
                  </motion.button>

                  {/* Two-column layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* LEFT: Main Article Content */}
                    <div className="lg:col-span-8">

                      {/* Meta Row */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.25 }}
                        className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-semibold mb-6 pb-5 border-b border-slate-100 font-mono"
                      >
                        <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
                          <Calendar size={12} className="text-[#0052CC]" /> {selectedPost.date}
                        </span>
                        <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
                          <Clock size={12} className="text-[#03ADA4]" /> {selectedPost.readTime}
                        </span>
                        <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
                          <User size={12} className="text-slate-500" /> {selectedPost.author}
                        </span>
                        <span className="flex items-center gap-1.5 bg-[#0052CC]/8 border border-[#0052CC]/15 rounded-lg px-3 py-1.5 text-[#0052CC]">
                          <Tag size={12} /> Medical Logistics
                        </span>
                      </motion.div>

                      {/* Excerpt / Lead */}
                      <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.3 }}
                        className="text-base md:text-lg font-bold text-slate-800 italic leading-relaxed mb-8 border-l-4 border-[#0052CC] pl-5"
                      >
                        {selectedPost.excerpt}
                      </motion.p>

                      {/* Intro paragraph */}
                      <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.35 }}
                        className="text-sm md:text-base text-slate-600 leading-relaxed font-medium mb-10"
                      >
                        Shipping medicine across international boundaries is governed by complex regulations because medicines fall under safety, health, and custom import-export checks. To make sure NRI families can receive their critical prescriptions easily, a structured procedural path must be followed.
                      </motion.p>

                      {/* Article Sections */}
                      {(POST_CONTENT[selectedPost.id]?.sections || []).map((section, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                          className="mb-7 p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-md hover:border-[#0052CC]/20 transition-all duration-300"
                        >
                          <h3 className="text-sm font-black text-[#0052CC] uppercase tracking-wider mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#0052CC] text-white flex items-center justify-center text-[10px] font-black flex-shrink-0">
                              {i + 1}
                            </span>
                            {section.heading.replace(/^\d+\.\s*/, "")}
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            {section.body}
                          </p>
                        </motion.div>
                      ))}

                      {/* Pro Tip */}
                      {POST_CONTENT[selectedPost.id]?.tip && (
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="mb-10 p-5 bg-[#03ADA4]/5 border border-[#03ADA4]/20 rounded-2xl flex gap-3"
                        >
                          <Lightbulb size={18} className="text-[#03ADA4] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-black text-[#03ADA4] uppercase tracking-wider mb-1">Pro Tip</p>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">{POST_CONTENT[selectedPost.id].tip}</p>
                          </div>
                        </motion.div>
                      )}

                      {/* Bottom CTA */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-[#0052CC] to-[#03ADA4] rounded-3xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-lg"
                      >
                        <div className="text-white">
                          <p className="text-xs font-black uppercase tracking-wider opacity-75 mb-1">Have Questions About This Article?</p>
                          <p className="text-base font-black leading-tight">Talk to our logistics experts right now</p>
                          <p className="text-xs opacity-75 mt-1">Available Mon–Sat, 9 AM to 7 PM (IST)</p>
                        </div>
                        <a
                          href="https://wa.me/918882691919"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 bg-white text-[#0052CC] font-black text-xs px-6 py-3 rounded-xl text-center hover:shadow-lg transition-all hover:scale-105"
                        >
                          💬 WhatsApp Now
                        </a>
                      </motion.div>
                    </div>

                    {/* RIGHT: Sticky Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">

                      {/* Article thumbnail */}
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="w-full h-52 rounded-2xl overflow-hidden shadow-md"
                      >
                        <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                      </motion.div>

                      {/* Article Info card */}
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.38 }}
                        className="bg-[#0052CC]/4 border border-[#0052CC]/15 rounded-2xl p-5"
                      >
                        <p className="text-xs font-black text-[#0052CC] uppercase tracking-wider mb-4">Article Info</p>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-semibold flex items-center gap-1.5"><Calendar size={12} /> Published</span>
                            <span className="font-black text-slate-700">{selectedPost.date}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-semibold flex items-center gap-1.5"><Clock size={12} /> Read Time</span>
                            <span className="font-black text-slate-700">{selectedPost.readTime}</span>
                          </div>
                          <div className="flex items-start justify-between text-xs gap-2">
                            <span className="text-slate-500 font-semibold flex items-center gap-1.5 flex-shrink-0"><User size={12} /> Author</span>
                            <span className="font-black text-slate-700 text-right">{selectedPost.author}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-semibold flex items-center gap-1.5"><BookOpen size={12} /> Sections</span>
                            <span className="font-black text-slate-700">{(POST_CONTENT[selectedPost.id]?.sections || []).length}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* More Articles */}
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="bg-white border border-slate-100 rounded-2xl p-5"
                      >
                        <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                          <BookOpen size={13} /> More Articles
                        </p>
                        <div className="space-y-4">
                          {BLOG_PAGE.posts
                            .filter(p => p.id !== selectedPost.id)
                            .slice(0, 4)
                            .map((p) => (
                              <motion.button
                                key={p.id}
                                onClick={() => openPost(p)}
                                whileHover={{ x: 4, transition: { type: "spring", stiffness: 250, damping: 18 } }}
                                className="w-full text-left flex gap-3 group cursor-pointer"
                              >
                                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[10px] text-slate-400 font-semibold font-mono mb-0.5 flex items-center gap-1">
                                    <Clock size={9} /> {p.readTime}
                                  </p>
                                  <p className="text-xs font-black text-slate-700 leading-snug group-hover:text-[#0052CC] transition-colors" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.title}</p>
                                </div>
                              </motion.button>
                            ))}
                        </div>
                      </motion.div>

                      {/* Sidebar WhatsApp CTA */}
                      <motion.a
                        href="https://wa.me/918882691919"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.52 }}
                        whileHover={{ scale: 1.03 }}
                        className="block bg-gradient-to-br from-[#0052CC] to-[#03ADA4] rounded-2xl p-5 text-white text-center shadow-md cursor-pointer"
                      >
                        <p className="text-2xl mb-1">💬</p>
                        <p className="font-black text-sm mb-1">Need Help Shipping?</p>
                        <p className="text-xs opacity-80 mb-3">Our experts Mon–Sat, 9–7 PM IST</p>
                        <span className="bg-white text-[#0052CC] font-black text-xs px-5 py-2 rounded-xl inline-block">
                          WhatsApp Now
                        </span>
                      </motion.a>

                    </div>
                  </div>

                </div>
              </motion.div>
            ) : (
              /* ══════════════════════════════════════════
                 BLOG LISTING VIEW
              ══════════════════════════════════════════ */
              <motion.div
                key="blog-listing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* ── Hero Banner ── */}
                <div
                  id="blog-listing-hero"
                  className="relative h-[250px] md:h-[320px] overflow-hidden flex items-end pb-8 md:pb-12 bg-slate-950"
                >
                  <motion.div
                    initial={{ scale: 1.12, opacity: 0 }}
                    animate={{ scale: 1.0, opacity: 1.0 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${BLOG_HERO_IMAGE}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="space-y-2"
                    >
                      <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display uppercase text-white drop-shadow-xs">
                        Our Blog
                      </h1>
                      <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center gap-2 text-white/80">
                        <Link to="/" className="hover:text-primary transition-colors text-white/90">Home</Link>
                        <span className="text-white/40">»</span>
                        <span className="text-[#03ADA4] font-bold">Blog</span>
                      </nav>
                    </motion.div>
                  </div>
                </div>

                {/* ── Blog Grid ── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

                  {/* Section header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                  >
                    <span className="text-xs font-black uppercase tracking-widest text-[#03ADA4] bg-[#03ADA4]/10 px-3 py-1 rounded-full inline-block mb-3">
                      Regulations &amp; Updates
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
                      {BLOG_PAGE.title}
                    </h2>
                    <p className="max-w-xl mx-auto text-sm text-slate-500 leading-relaxed font-medium">
                      {BLOG_PAGE.subtitle}
                    </p>
                  </motion.div>

                  {/* Cards Grid */}
                  <div id="blogs-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {BLOG_PAGE.posts.map((post, idx) => (
                      <motion.div
                        id={`blog-box-${post.id}`}
                        key={post.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.12 }}
                        transition={{ delay: (idx % 3) * 0.1, duration: 0.55, ease: "easeOut" }}
                        whileHover={{ y: -7, transition: { type: "spring", stiffness: 200, damping: 18 } }}
                        className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0052CC]/20 transition-shadow duration-300 flex flex-col cursor-pointer group"
                        onClick={() => openPost(post)}
                      >
                        {/* Image */}
                        <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
                          <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                          />
                          {/* Subtle gradient on image bottom */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                          {/* Read time badge */}
                          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#0052CC] text-[10px] font-black rounded-full px-2.5 py-1 shadow-sm">
                            {post.readTime}
                          </span>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 flex flex-col flex-1">
                          {/* Date & author */}
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold mb-3 font-mono">
                            <Calendar size={11} className="text-[#03ADA4]" />
                            <span>{post.date}</span>
                            <span className="text-slate-200">•</span>
                            <User size={11} className="text-slate-400" />
                            <span className="truncate">{post.author}</span>
                          </div>

                          {/* Heading */}
                          <h3 className="text-sm md:text-base font-black text-slate-800 tracking-tight leading-snug mb-3 group-hover:text-[#0052CC] transition-colors duration-200">
                            {post.title}
                          </h3>

                          {/* Excerpt - 3 lines max */}
                          <p
                            className="text-xs text-slate-500 leading-relaxed font-medium flex-1"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden"
                            }}
                          >
                            {post.excerpt}
                          </p>

                          {/* Footer */}
                          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1 text-[#0052CC] text-xs font-black uppercase tracking-wider group-hover:gap-2 transition-all duration-200">
                              Read Full Article <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <CheckCircle size={15} className="text-[#03ADA4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-16 text-center"
                  >
                    <p className="text-xs text-slate-400 font-semibold mb-4">Have a medicine shipping question not covered here?</p>
                    <a
                      href="https://wa.me/918882691919"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0052CC] to-[#03ADA4] text-white font-black text-sm px-8 py-3.5 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      💬 Ask Our Experts on WhatsApp
                    </a>
                  </motion.div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
