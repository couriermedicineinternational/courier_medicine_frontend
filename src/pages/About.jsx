import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Users, 
  CheckCircle, 
  Truck, 
  Heart, 
  Landmark, 
  MapPin, 
  Globe, 
  Package, 
  Target, 
  Rocket,
  ArrowRight,
  Activity,
  ArrowRightCircle
} from "lucide-react";
import * as Lucide from "lucide-react";
import DOMPurify from "dompurify";
import StatsSection from "../components/sections/StatsSection";
import api from "../utils/api";

// 1. RenderHeroSection Component
function RenderHeroSection({ title, subtitle, content }) {
  const displayTitle = title || "About Our Company";
  const displaySubtitle = subtitle || "Home » About Us";
  const bgImage = content?.bgImage || "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80";

  return (
    <div id="about-hero" className="relative h-[250px] md:h-[320px] overflow-hidden flex items-end pb-8 md:pb-12 bg-slate-950">
      <motion.div 
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 1.0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
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
            {displayTitle}
          </h1>
          <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center gap-2 text-white/80">
            <Link to="/" className="hover:text-primary transition-colors text-white/90">Home</Link>
            <span className="text-white/40">»</span>
            <span className="text-[#03ADA4] font-bold">About Us</span>
          </nav>
        </motion.div>
      </div>
    </div>
  );
}

// 2. RenderWelcomeSection Component
function RenderWelcomeSection({ title, subtitle, content }) {
  const displayTitle = title || "No.1 International Medicine Courier Company in India";
  const displaySubtitle = subtitle || "Welcome to Courier Medicines";
  const desc1 = content?.description1 || "At Courier Medicines, we deliver your medicines anywhere in the world. Our team is highly experienced in international medicine delivery, so you can relax knowing your medications will arrive safely and quickly.";
  const desc2 = content?.description2 || "Courier medicine from India is legal and we make the process seamless for you by providing Express International medicine courier services from India to Abroad. We have expertise in Courier Different types of medicines be it Liquid or Tablets - allopathic medicine, ayurvedic, homeopathy, herbal, or cold storage / temperature control Medicine.";
  const desc3 = content?.description3 || "Courier Medicines helps in providing Free door pick up service all across India - Delhi Noida  Faridabad  Gurgaon  Bangalore  Hyderabad  Mumbai  Pune  Rajasthan  Gujarat  Kolkata  and others, with providing Door Delivery to all International countries – <a href='/india-to-united-states-usa-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>USA</a>  <a href='/india-to-canada-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Canada</a>  <a href='/india-to-australia-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Australia</a>  <a href='/india-to-new-zealand-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>New Zealand</a>  <a href='/india-to-united-kingdom-uk-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>United Kingdom</a>  <a href='/india-to-united-arab-emirates-uae-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Dubai</a>  <a href='/india-to-philippines-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Philippines</a>  <a href='/india-to-china-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>China</a>  <a href='/india-to-japan-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Japan</a>  <a href='/india-to-malaysia-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Malaysia</a>  <a href='/india-to-singapore-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Singapore</a>  <a href='/india-to-hong-kong-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Hongkong</a>  <a href='/india-to-kuwait-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Kuwait</a>, <a href='/india-to-nigeria-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Nigeria</a>  <a href='/india-to-oman-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Oman</a>  <a href='/india-to-qatar-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Qatar</a>  <a href='/india-to-sri-lanka-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Sri Lanka</a>  <a href='/india-to-france-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>France</a> <a href='/india-to-germany-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Germany</a>   <a href='/india-to-netherlands-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Netherlands</a>  <a href='/india-to-portugal-medicine-courier-charges.htm' class='text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors'>Portugal</a> and Others.";
  
  const buyTitle = content?.buyServiceTitle || "Service of Buying Prescription medicines";
  const buyDesc = content?.buyServiceDesc || "We provide the Service of Buying Prescription medicines on our customer's behalf from a reputed pharmacy to Ensure you Receive Genuine Medicines with the best and most convenient service. Our expert team makes it easy to get these Meds you need without searching for them yourself.";

  const prioritiesList = content?.priorities || [
    {
      title: "Customer Satisfaction",
      icon: "Heart",
      color: "text-rose-500 bg-rose-50 border-rose-100",
      description: "Fulfilling our client's needs is our top priority. We are always ready to meet your dynamic logistical requirements, anytime and anywhere."
    },
    {
      title: "Innovative Solutions",
      icon: "Shield",
      color: "text-blue-500 bg-blue-50 border-blue-100",
      description: "We offer top-notch facilities like live online tracking, door-to-door pickups, proxy prescription procurement, and real-time status updates."
    },
    {
      title: "Efficiency & Transparency",
      icon: "CheckCircle",
      color: "text-emerald-500 bg-emerald-50 border-emerald-100",
      description: "Serving you with full speed, efficiency, and pricing transparency is our prime goal so you get your essential medicines on time."
    },
    {
      title: "Expert Guidance",
      icon: "Users",
      color: "text-amber-500 bg-amber-50 border-amber-100",
      description: "We provide comprehensive guidance through our documentation experts, assisting with customs clearance in both India and the destination country."
    }
  ];

  const designMap = {
    "Heart": "text-rose-500 bg-rose-50 border-rose-100",
    "Shield": "text-blue-500 bg-blue-50 border-blue-100",
    "CheckCircle": "text-emerald-500 bg-emerald-50 border-emerald-100",
    "Users": "text-amber-500 bg-amber-50 border-amber-100"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Welcome Text */}
        <motion.div 
          initial={{ opacity: 0, x: -45 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="lg:col-span-6 space-y-5"
        >
          <span className="text-xs font-black uppercase tracking-widest text-[#0052CC] bg-[#0052CC]/10 px-3.5 py-1.5 rounded-full inline-block">
            {displaySubtitle}
          </span>
          <h2 className="text-2xl md:text-3.5xl font-black text-[#0F172A] tracking-tight leading-tight uppercase font-display">
            {displayTitle}
          </h2>
          <div className="w-16 h-1.5 bg-[#0052CC] rounded-full" />
          
          <div 
            className="text-sm text-slate-600 leading-relaxed font-sans font-medium prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc1) }}
          />
          <div 
            className="text-sm text-slate-600 leading-relaxed font-sans font-medium prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc2) }}
          />
          <div 
            className="text-sm text-slate-600 leading-relaxed font-sans font-medium prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc3) }}
          />

          <div className="p-5 bg-[#0052CC]/5 border border-[#0052CC]/10 rounded-2xl space-y-2 hover:bg-white hover:shadow-md hover:border-[#0052CC]/25 transition-all duration-305">
            <h4 className="text-xs font-black uppercase text-[#0052CC] tracking-wider flex items-center gap-1.5">
              <Landmark size={14} className="text-[#0052CC]" /> {buyTitle}
            </h4>
            <div 
              className="text-[11px] text-slate-500 leading-relaxed font-medium prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(buyDesc) }}
            />
          </div>
        </motion.div>

        {/* Right Column: Priorities Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, x: 45 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {prioritiesList.map((v, i) => {
            const Icon = Lucide[v.icon] || Heart;
            const colorClass = v.color || designMap[v.icon] || "text-rose-500 bg-rose-50 border-rose-100";
            return (
              <motion.div 
                key={i} 
                whileHover={{ 
                  y: -6, 
                  scale: 1.015,
                  boxShadow: "0 12px 24px -6px rgba(0, 82, 204, 0.08), 0 8px 12px -6px rgba(0, 82, 204, 0.04)",
                  borderColor: "rgba(0, 82, 204, 0.25)"
                }}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:bg-white transition-all duration-350"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${colorClass}`}>
                  <Icon size={20} className="stroke-[2.2]" />
                </div>
                <h3 className="font-black text-sm text-slate-800 tracking-wide mb-2 font-display">{v.title}</h3>
                <div 
                  className="text-xs text-slate-500 leading-relaxed font-medium prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(v.description) }}
                />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}

// 3. RenderVisionMissionSection Component
function RenderVisionMissionSection({ title, subtitle, content }) {
  const displayTitle = title || "Delhi Headquartered Operations";
  const displaySubtitle = subtitle || "Operating across all major cities in India, including Delhi NCR, Gurgaon, Noida, Mumbai, Pune, Hyderabad, Bangalore, Punjab, Chennai, Coimbatore, Jaipur, and many more, with direct door delivery worldwide.";
  
  const visionText = content?.vision || "At Courier Medicines, we are dedicated to delivering all types of medicine couriers worldwide. We are committed to making the lives of our customers easier by overcoming the obstacles associated with international medicine couriers, ensuring cost-effectiveness and timely delivery of medicines. We aim to be the leading service provider in the industry, known for our wide international reach and commitment to excellence.";
  const missionText = content?.mission || "Our mission is to meet and exceed our client's needs by providing the best global and local international delivery services. Headquartered in Delhi and operating across all major cities in India, we prioritize customer satisfaction, speed, efficiency, and expert documentation guidance to make medicine access global.";

  const reachCardsList = content?.reachCards || [
    {
      title: "Free Door Pickup",
      icon: "MapPin",
      description: "Providing free doorstep pickup service across major Indian hubs: Delhi NCR, Mumbai, Bangalore, Pune, Hyderabad, Chennai, Kolkata, and others."
    },
    {
      title: "Global Coverage",
      icon: "Globe",
      description: "Door delivery to all major international countries: USA, UK, Canada, Australia, New Zealand, Europe, Middle East, Asia, and more."
    },
    {
      title: "All Medicine Types",
      icon: "Package",
      description: "Expertise in couriering all types of medicines: Liquids, Tablets, Allopathic, Ayurvedic, Homeopathic, Herbal, and cold storage."
    },
    {
      title: "Door-to-Door Courier",
      icon: "Truck",
      description: "Complete end-to-end cargo logistics with live tracking, structured packing, and customs clearance assistance."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Reach Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, x: -45 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 order-2 lg:order-1"
        >
          {reachCardsList.map((v, i) => {
            const Icon = Lucide[v.icon] || MapPin;
            return (
              <motion.div 
                key={i} 
                whileHover={{ 
                  y: -6, 
                  scale: 1.015,
                  boxShadow: "0 12px 24px -6px rgba(3, 173, 164, 0.08), 0 8px 12px -6px rgba(3, 173, 164, 0.04)",
                  borderColor: "rgba(3, 173, 164, 0.25)"
                }}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:bg-white transition-all duration-350"
              >
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mb-4 text-[#0052CC] border border-slate-200">
                  <Icon size={20} className="stroke-[2.2]" />
                </div>
                <h3 className="font-black text-sm text-slate-800 tracking-wide mb-2 font-display">{v.title}</h3>
                <div 
                  className="text-xs text-slate-500 leading-relaxed font-medium prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(v.description) }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right Column: Vision & Mission Details */}
        <motion.div 
          initial={{ opacity: 0, x: 45 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="lg:col-span-6 space-y-6 order-1 lg:order-2"
        >
          <span className="text-xs font-black uppercase tracking-widest text-[#03ADA4] bg-[#03ADA4]/10 px-3.5 py-1.5 rounded-full inline-block">
            Our Vision & Mission
          </span>
          
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-800 uppercase tracking-tight flex items-center gap-2.5 font-display">
              <span className="w-8 h-8 rounded-lg bg-[#0052CC]/10 flex items-center justify-center text-[#0052CC] shrink-0">
                <Target size={16} className="stroke-[2.5]" />
              </span>
              <span>Our Vision</span>
            </h3>
            <div 
                className="text-sm text-slate-600 leading-relaxed font-medium border-l-4 border-indigo-500/20 pl-4 py-1 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(visionText) }}
              />
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-800 uppercase tracking-tight flex items-center gap-2.5 font-display">
              <span className="w-8 h-8 rounded-lg bg-[#0052CC]/10 flex items-center justify-center text-[#0052CC] shrink-0">
                <Rocket size={16} className="stroke-[2.5]" />
              </span>
              <span>Our Mission</span>
            </h3>
            <div 
                className="text-sm text-slate-600 leading-relaxed font-medium border-l-4 border-[#03ADA4]/20 pl-4 py-1 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(missionText) }}
              />
          </div>

          <div className="p-5 bg-[#03ADA4]/5 border border-[#03ADA4]/10 rounded-2xl space-y-2 hover:bg-white hover:shadow-md hover:border-[#03ADA4]/25 transition-all duration-300">
            <h4 className="text-xs font-black uppercase text-[#03ADA4] tracking-wider flex items-center gap-2 font-display">
              <span className="w-6 h-6 bg-[#03ADA4]/10 text-[#03ADA4] rounded-md flex items-center justify-center shrink-0">
                <MapPin size={13} className="stroke-[2.5]" />
              </span>
              <span>{displayTitle}</span>
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium font-sans pl-8">
              {displaySubtitle}
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// 4. Main Exported About Page Component
export default function About() {
  const [isLoading, setIsLoading] = useState(true);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const res = await api.get("/about");
        if (res.data && res.data.success && res.data.data) {
          setSections(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load dynamic about page configuration:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAboutData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        /* Shimmer Loading Skeleton Screen */
        <motion.div
          key="about-shimmer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="pb-14 bg-[#FAFDFD] font-sans text-slate-700 space-y-12"
        >
          {/* Hero Banner Shimmer */}
          <div className="h-[250px] md:h-[320px] bg-slate-100 relative overflow-hidden flex items-end pb-8 md:pb-12">
            <div className="shimmer-bg absolute inset-0" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 space-y-3">
              <div className="shimmer-bg h-9 w-64 rounded-md" />
              <div className="shimmer-bg h-4 w-32 rounded-md" />
            </div>
          </div>

          {/* Stats Bar Shimmer */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50 border border-slate-100 rounded-3xl p-6">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="space-y-2 text-center flex flex-col items-center">
                  <div className="shimmer-bg h-7 w-20 rounded-md" />
                  <div className="shimmer-bg h-3.5 w-28 rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* Core Priorities Columns Shimmer */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 py-6">
            <div className="space-y-4">
              <div className="shimmer-bg h-6 w-48 rounded-full" />
              <div className="shimmer-bg h-12 w-full rounded-lg" />
              <div className="shimmer-bg h-4 w-12 rounded-full" />
              <div className="shimmer-bg h-24 w-full rounded-md" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 h-[180px] space-y-3">
                  <div className="shimmer-bg h-10 w-10 rounded-xl" />
                  <div className="shimmer-bg h-4 w-32 rounded-md" />
                  <div className="shimmer-bg h-12 w-full rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        /* Real Content Page */
        <motion.div
          key="about-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="pb-8 md:pb-14 bg-white font-sans"
        >
          {sections.length > 0 ? (
            sections.map((section) => {
              if (section.key === "about-hero") {
                return (
                  <React.Fragment key={section.key}>
                    <RenderHeroSection 
                      title={section.title} 
                      subtitle={section.subtitle} 
                      content={section.content} 
                    />
                    <StatsSection />
                  </React.Fragment>
                );
              }
              if (section.key === "about-welcome") {
                return (
                  <RenderWelcomeSection 
                    key={section.key} 
                    title={section.title} 
                    subtitle={section.subtitle} 
                    content={section.content} 
                  />
                );
              }
              if (section.key === "about-vision-mission") {
                return (
                  <RenderVisionMissionSection 
                    key={section.key} 
                    title={section.title} 
                    subtitle={section.subtitle} 
                    content={section.content} 
                  />
                );
              }
              return null;
            })
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
