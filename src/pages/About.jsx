import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Users, CheckCircle, Truck, Heart, Landmark, MapPin, Globe, Package, Target, Rocket } from "lucide-react";
import StatsSection from "../components/sections/StatsSection";

export default function About() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulated loading trigger (800ms to match the experience of other pages)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const priorities = [
    {
      title: "Customer Satisfaction",
      icon: Heart,
      color: "text-rose-500 bg-rose-50 border-rose-100",
      description: "Fulfilling our client's needs is our top priority. We are always ready to meet your dynamic logistical requirements, anytime and anywhere."
    },
    {
      title: "Innovative Solutions",
      icon: Shield,
      color: "text-blue-500 bg-blue-50 border-blue-100",
      description: "We offer top-notch facilities like live online tracking, door-to-door pickups, proxy prescription procurement, and real-time status updates."
    },
    {
      title: "Efficiency & Transparency",
      icon: CheckCircle,
      color: "text-emerald-500 bg-emerald-50 border-emerald-100",
      description: "Serving you with full speed, efficiency, and pricing transparency is our prime goal so you get your essential medicines on time."
    },
    {
      title: "Expert Guidance",
      icon: Users,
      color: "text-amber-500 bg-amber-50 border-amber-100",
      description: "We provide comprehensive guidance through our documentation experts, assisting with customs clearance in both India and the destination country."
    }
  ];

  const reachCards = [
    {
      title: "Free Door Pickup",
      icon: MapPin,
      description: "Providing free doorstep pickup service across major Indian hubs: Delhi NCR, Mumbai, Bangalore, Pune, Hyderabad, Chennai, Kolkata, and others."
    },
    {
      title: "Global Coverage",
      icon: Globe,
      description: "Door delivery to all major international countries: USA, UK, Canada, Australia, New Zealand, Europe, Middle East, Asia, and more."
    },
    {
      title: "All Medicine Types",
      icon: Package,
      description: "Expertise in couriering all types of medicines: Liquids, Tablets, Allopathic, Ayurvedic, Homeopathic, Herbal, and cold storage."
    },
    {
      title: "Door-to-Door Courier",
      icon: Truck,
      description: "Complete end-to-end cargo logistics with live tracking, structured packing, and customs clearance assistance."
    }
  ];

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        /* Shimmer Loading Skeleton Screen matching page structure */
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
          {/* About Hero Banner (With Parallax Zoom out) */}
          <div id="about-hero" className="relative h-[250px] md:h-[320px] overflow-hidden flex items-end pb-8 md:pb-12 bg-slate-950">
            <motion.div 
              initial={{ scale: 1.12, opacity: 0 }}
              animate={{ scale: 1.0, opacity: 1.0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80')` 
              }}
            />
            {/* Scrim Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white z-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-2"
              >
                <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display uppercase text-white drop-shadow-xs">
                  About Our Company
                </h1>
                <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center gap-2 text-white/80">
                  <Link to="/" className="hover:text-primary transition-colors text-white/90">Home</Link>
                  <span className="text-white/40">»</span>
                  <span className="text-[#03ADA4] font-bold">About Us</span>
                </nav>
              </motion.div>
            </div>
          </div>

          {/* Premium Stats Section shared with Home Page */}
          <StatsSection />

          {/* Section 1: Welcome and Core Priorities */}
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
                  Welcome to Courier Medicines
                </span>
                <h2 className="text-2xl md:text-3.5xl font-black text-[#0F172A] tracking-tight leading-tight uppercase font-display">
                  No.1 International Medicine <span className="text-[#0052CC]">Courier Company in India</span>
                </h2>
                <div className="w-16 h-1.5 bg-[#0052CC] rounded-full" />
                
                <p className="text-sm text-slate-600 leading-relaxed font-sans font-medium">
                  At Courier Medicines, we deliver your medicines anywhere in the world. Our team is highly experienced in international medicine delivery, so you can relax knowing your medications will arrive safely and quickly.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-sans font-medium">
                  Courier medicine from India is legal and we make the process seamless for you by providing Express International medicine courier services from India to Abroad. We have expertise in Courier Different types of medicines be it Liquid or Tablets - allopathic medicine, ayurvedic, homeopathy, herbal, or cold storage / temperature control Medicine.
                </p>

                <div className="p-5 bg-[#0052CC]/5 border border-[#0052CC]/10 rounded-2xl space-y-2 hover:bg-white hover:shadow-md hover:border-[#0052CC]/25 transition-all duration-305">
                  <h4 className="text-xs font-black uppercase text-[#0052CC] tracking-wider flex items-center gap-1.5">
                    <Landmark size={14} className="text-[#0052CC]" /> Service of Buying Prescription medicines
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    We provide the Service of Buying Prescription medicines on our customer's behalf from a reputed pharmacy to Ensure you Receive Genuine Medicines with the best and most convenient service. Our expert team makes it easy to get these Meds you need without searching for them yourself.
                  </p>
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
                {priorities.map((v, i) => {
                  const Icon = v.icon;
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
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${v.color}`}>
                        <Icon size={20} className="stroke-[2.2]" />
                      </div>
                      <h3 className="font-black text-sm text-slate-800 tracking-wide mb-2 font-display">{v.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">{v.description}</p>
                    </motion.div>
                  );
                })}
              </motion.div>

            </div>
          </div>

          {/* Divider */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-slate-100" />
          </div>

          {/* Section 2: Our Vision, Mission & Global Reach */}
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
                {reachCards.map((v, i) => {
                  const Icon = v.icon;
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
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">{v.description}</p>
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
                  <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium pl-10.5">
                    At Courier Medicines, we are dedicated to delivering all types of medicine couriers worldwide. We are committed to making the lives of our customers easier by overcoming the obstacles associated with international medicine couriers, ensuring cost-effectiveness and timely delivery of medicines. We aim to be the leading service provider in the industry, known for our wide international reach and commitment to excellence.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-black text-slate-800 uppercase tracking-tight flex items-center gap-2.5 font-display">
                    <span className="w-8 h-8 rounded-lg bg-[#0052CC]/10 flex items-center justify-center text-[#0052CC] shrink-0">
                      <Rocket size={16} className="stroke-[2.5]" />
                    </span>
                    <span>Our Mission</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium pl-10.5">
                    Our mission is to meet and exceed our client's needs by providing the best global and local international delivery services. Headquartered in Delhi and operating across all major cities in India, we prioritize customer satisfaction, speed, efficiency, and expert documentation guidance to make medicine access global.
                  </p>
                </div>

                <div className="p-5 bg-[#03ADA4]/5 border border-[#03ADA4]/10 rounded-2xl space-y-2 hover:bg-white hover:shadow-md hover:border-[#03ADA4]/25 transition-all duration-300">
                  <h4 className="text-xs font-black uppercase text-[#03ADA4] tracking-wider flex items-center gap-2 font-display">
                    <span className="w-6 h-6 bg-[#03ADA4]/10 text-[#03ADA4] rounded-md flex items-center justify-center shrink-0">
                      <MapPin size={13} className="stroke-[2.5]" />
                    </span>
                    <span>Delhi Headquartered Operations</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium font-sans pl-8">
                    Operating across all major cities in India, including Delhi NCR, Gurgaon, Noida, Mumbai, Pune, Hyderabad, Bangalore, Punjab, Chennai, Coimbatore, Jaipur, and many more, with direct door delivery worldwide.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
