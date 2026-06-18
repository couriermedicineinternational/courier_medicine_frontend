import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, ShieldCheck, Phone, Scale, 
  ArrowLeft, CheckCircle, MessageSquare, AlertCircle 
} from "lucide-react";
import { ALL_COUNTRIES } from "../constants";

// Animation Variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 15
    }
  }
};

const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  show: (i) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.12 + 0.4,
      type: "spring",
      stiffness: 140,
      damping: 10
    }
  })
};

const bannerWrapperVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 15,
      staggerChildren: 0.1,
      delayChildren: 0.25
    }
  }
};

const bannerItemVariants = {
  hidden: { opacity: 0, x: -15 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 12
    }
  }
};

export default function CountryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [packageWeight, setPackageWeight] = useState(0.5);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Find country data from route params
  const country = ALL_COUNTRIES.find(
    c => c.slug === slug
  );

  // Scroll to top on route mount and trigger loader
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!country) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle size={48} className="text-red-500 mb-3" />
        <h2 className="text-xl font-black text-slate-800">Destination Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">The selected shipping destination is not registered in our system.</p>
        <Link to="/popular-countries.htm" className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow">
          Back to Countries List
        </Link>
      </div>
    );
  }

  const countryName = country.name;

  // Pricing calculations
  const calculatePrice = (basePrice, weight, carrierMultiplier = 1) => {
    let finalPrice = basePrice * carrierMultiplier;
    if (weight > 0.5) {
      const extraWeight = weight - 0.5;
      const incrementalRate = 800 * carrierMultiplier; // INR per block of 0.5 kg
      finalPrice += Math.ceil(extraWeight / 0.5) * incrementalRate;
    }
    return Math.round(finalPrice);
  };

  const dhlPrice = calculatePrice(country.basePrice, packageWeight, 1);
  const upsPrice = calculatePrice(country.basePrice, packageWeight, 0.95);

  const getTimelineString = (code) => {
    if (code === "AE" || code === "SG" || code === "HK") return "2 to 3 Business Days";
    return "3 to 5 Business Days";
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        /* High-Fidelity Detail Page Shimmer Loading Skeleton */
        <motion.div
          key="shimmer-detail"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="pb-20 bg-white font-sans text-slate-700"
        >
          {/* Hero Banner Shimmer */}
          <div className="h-[350px] md:h-[450px] bg-slate-900/10 flex items-center justify-center relative overflow-hidden">
            <div className="shimmer-bg absolute inset-0" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-6 mt-12 flex flex-col items-center">
              <div className="shimmer-bg h-6 w-32 rounded-full" />
              <div className="shimmer-bg h-14 md:h-20 w-4/5 md:w-3/4 rounded-lg" />
              <div className="shimmer-bg h-4 w-1/3 rounded-md" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
            {/* Centered Heading Shimmer */}
            <div className="flex justify-center">
              <div className="shimmer-bg h-7 w-96 rounded-lg" />
            </div>

            {/* Welcome Copy Shimmer */}
            <div className="space-y-3 p-6 bg-slate-50/50 border border-slate-100 rounded-3xl">
              <div className="shimmer-bg h-5 w-1/3 rounded-md" />
              <div className="shimmer-bg h-4 w-full rounded-md" />
              <div className="shimmer-bg h-4 w-11/12 rounded-md" />
              <div className="shimmer-bg h-4 w-4/5 rounded-md" />
            </div>

            {/* Service We Offer Shimmer */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="shimmer-bg h-6 w-44 rounded-md" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="shimmer-bg h-6 w-6 rounded-full shrink-0" />
                      <div className="shimmer-bg h-4.5 w-32 rounded" />
                    </div>
                    <div className="shimmer-bg h-3.5 w-11/12 rounded pl-8" />
                    <div className="shimmer-bg h-3.5 w-4/5 rounded pl-8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Actual Overhauled Country Detail Content Page */
        <motion.div
          key="content-detail"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          id="country-detail-page"
          className="pb-20 bg-white font-sans text-slate-700"
        >
          
          {/* 1. Hero Banner Section with Parallax Zoom */}
          <div 
            id="detail-banner"
            className="relative h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden bg-slate-950"
          >
            <motion.div 
              initial={{ scale: 1.15, opacity: 0.5 }}
              animate={{ scale: 1.0, opacity: 0.6 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80')` 
              }}
            />
            {/* No Overlay (Removed per user request) */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center text-white relative z-20 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className="space-y-4 max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase mb-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  {countryName} Delivery
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 font-display uppercase drop-shadow-lg leading-tight">
                  International Medicine Courier Service To {countryName}
                </h1>
                
                <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center justify-center gap-2 text-white/80 mt-6">
                  <Link to="/" className="hover:text-secondary transition-colors text-white/95">Home</Link>
                  <span className="text-white/40">»</span>
                  <Link to="/popular-countries.htm" className="hover:text-secondary transition-colors text-white/95">Countries</Link>
                  <span className="text-white/40">»</span>
                  <span className="text-secondary font-bold">India to {countryName} charges</span>
                </nav>
              </motion.div>
            </div>
          </div>

          {/* Main Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
            
            {/* 2. Page Main Title */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="inline-block text-xl md:text-2.5xl font-black text-slate-900 border-x-3 border-secondary px-6 uppercase tracking-wide leading-none font-display">
                Send Medicines From India To {countryName}
              </h2>
            </motion.div>

            {/* 3. Welcome Copy Section (Slide in from Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.1 }}
              className="prose max-w-none text-slate-600 text-sm md:text-[15px] leading-relaxed font-sans space-y-4 bg-slate-50/50 p-6 md:p-8 rounded-3xl border border-slate-100/60 shadow-[0_4px_25px_rgba(0,0,0,0.015)]"
            >
              <p className="font-extrabold text-slate-800 text-base md:text-lg">
                Welcome to Courier Medicines - We offer the No.1 International Medicine Delivery from India to {countryName}.
              </p>
              <p>
                At Courier Medicines, we deliver your medicines anywhere in the world. Our team is highly experienced in international medicine delivery, so you can relax knowing your medications will arrive safely and quickly. We procure medicines on our customer's behalf from licensed chemist shops, verify batch numbers and expiry dates, and ship them using priority air routes.
              </p>
              <p>
                Courier medicine from India is legal and we make the process seamless for you by providing Express International medicine courier services from India to Abroad. We have expertise in couriering different types of medicines be it Liquid or Tablets - allopathic medicine, ayurvedic, homeopathy, herbal, or cold storage / temperature control Medicine.
              </p>
            </motion.div>

            {/* 4. Service We Offer Section (Alternating Left-to-Right Grid) */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="inline-block text-lg md:text-xl font-black text-slate-900 border-x-3 border-primary px-5 uppercase tracking-wider leading-none font-display">
                  Service We Offer
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                
                {/* Card 1 - Pickup (Slide Left) */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.015,
                    borderColor: "rgba(0, 82, 204, 0.25)",
                    boxShadow: "0 15px 30px -10px rgba(0, 82, 204, 0.08)"
                  }}
                  className="bg-white border border-slate-200/70 p-6 rounded-3xl space-y-3 relative overflow-hidden group cursor-pointer transition-colors duration-300 shadow-sm"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-secondary/10 group-hover:bg-secondary transition-colors duration-300" />
                  <h4 className="font-black text-slate-800 flex items-center gap-3">
                    <span className="w-7 h-7 bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 group-hover:scale-110 shrink-0">1</span>
                    Pickup Service
                  </h4>
                  <p className="text-slate-500 leading-relaxed pl-10 font-medium text-xs md:text-[13.5px]">
                    Free door-to-door medicine pickup service across all cities in India (Delhi NCR, Mumbai, Bangalore, Pune, Hyderabad, Chennai, Kolkata, and others).
                  </p>
                </motion.div>

                {/* Card 2 - Purchase (Slide Right) */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.015,
                    borderColor: "rgba(3, 173, 164, 0.25)",
                    boxShadow: "0 15px 30px -10px rgba(3, 173, 164, 0.08)"
                  }}
                  className="bg-white border border-slate-200/70 p-6 rounded-3xl space-y-3 relative overflow-hidden group cursor-pointer transition-colors duration-300 shadow-sm"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-primary/10 group-hover:bg-primary transition-colors duration-300" />
                  <h4 className="font-black text-slate-800 flex items-center gap-3">
                    <span className="w-7 h-7 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 group-hover:scale-110 shrink-0">2</span>
                    Medicine Purchase
                  </h4>
                  <p className="text-slate-500 leading-relaxed pl-10 font-medium text-xs md:text-[13.5px]">
                    If you cannot buy medicines locally, our procurement team can purchase prescribed medicines from licensed pharmacies in India on your behalf.
                  </p>
                </motion.div>

                {/* Card 3 - Tracking (Slide Left) */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.015,
                    borderColor: "rgba(0, 82, 204, 0.25)",
                    boxShadow: "0 15px 30px -10px rgba(0, 82, 204, 0.08)"
                  }}
                  className="bg-white border border-slate-200/70 p-6 rounded-3xl space-y-3 relative overflow-hidden group cursor-pointer transition-colors duration-300 shadow-sm"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-secondary/10 group-hover:bg-secondary transition-colors duration-300" />
                  <h4 className="font-black text-slate-800 flex items-center gap-3">
                    <span className="w-7 h-7 bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 group-hover:scale-110 shrink-0">3</span>
                    Tracking Provision
                  </h4>
                  <p className="text-slate-500 leading-relaxed pl-10 font-medium text-xs md:text-[13.5px]">
                    We provide dynamic online tracking reference numbers. You receive real-time package updates and transit logs as the box moves.
                  </p>
                </motion.div>

                {/* Card 4 - Payment (Slide Right) */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.015,
                    borderColor: "rgba(3, 173, 164, 0.25)",
                    boxShadow: "0 15px 30px -10px rgba(3, 173, 164, 0.08)"
                  }}
                  className="bg-white border border-slate-200/70 p-6 rounded-3xl space-y-3 relative overflow-hidden group cursor-pointer transition-colors duration-300 shadow-sm"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-primary/10 group-hover:bg-primary transition-colors duration-300" />
                  <h4 className="font-black text-slate-800 flex items-center gap-3">
                    <span className="w-7 h-7 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 group-hover:scale-110 shrink-0">4</span>
                    Payment Options
                  </h4>
                  <p className="text-slate-500 leading-relaxed pl-10 font-medium text-xs md:text-[13.5px]">
                    Flexible online payment systems including UPI (Google Pay, PhonePe), direct online bank transfers, Credit/Debit cards, and Stripe checkouts.
                  </p>
                </motion.div>

              </div>
            </div>

            {/* 5. Document Required Section (Split Slide In) */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="inline-block text-lg md:text-xl font-black text-slate-900 border-x-3 border-secondary px-5 uppercase tracking-wider leading-none font-display">
                  Document Required to Send Medicines
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50/50 border border-slate-100 rounded-3xl p-6 md:p-8 shadow-[inset_0_2px_8px_rgba(0,0,0,0.01)]">
                
                {/* Text Block (Left Entry) */}
                <motion.div 
                  initial={{ opacity: 0, x: -45 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ type: "spring", stiffness: 95, damping: 15 }}
                  className="md:col-span-7 space-y-5 text-xs md:text-sm"
                >
                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      1. Prescription Required
                    </h4>
                    <p className="text-slate-500 pl-4 font-medium leading-relaxed">
                      A valid prescription copy containing the patient name, doctor registration details, and medication list.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      2. Medicine Purchase Bill Required
                    </h4>
                    <p className="text-slate-500 pl-4 font-medium leading-relaxed">
                      Genuine purchase retail receipt/bill from a licensed medical store or pharmacy matching the prescription batch details.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      3. Receiver ID Proof Required
                    </h4>
                    <p className="text-slate-500 pl-4 font-medium leading-relaxed">
                      Valid identity document copy of the receiver in {countryName} to submit to the destination health clearance customs agency.
                    </p>
                  </div>
                </motion.div>

                {/* Graphic rx card (Right Entry + Check Animations) */}
                <motion.div 
                  initial={{ opacity: 0, x: 45, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ type: "spring", stiffness: 90, damping: 14 }}
                  className="md:col-span-5 flex items-center justify-center"
                >
                  <div className="w-52 h-52 bg-white border border-slate-200/80 rounded-3xl shadow-md flex flex-col p-5 space-y-4 relative overflow-hidden">
                    <div className="h-2.5 w-16 bg-primary rounded-full" />
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">Rx</div>
                      <div className="space-y-1 grow">
                        <h4 className="text-xs font-black text-slate-800 leading-none">Medical Cargo</h4>
                        <span className="text-[9px] text-slate-400 font-bold block mt-1">Verified Customs Rx</span>
                      </div>
                    </div>
                    <div className="space-y-2.5 pt-1">
                      {[
                        { label: "Prescription", w: 28 },
                        { label: "Invoice Bill", w: 32 },
                        { label: "Receiver ID", w: 20 }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <motion.span 
                            custom={idx}
                            variants={checkVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="shrink-0"
                          >
                            <CheckCircle size={15} className="text-green-500" />
                          </motion.span>
                          <span className="text-xs font-bold text-slate-600 font-sans">{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-[-15px] right-[-15px] w-20 h-20 bg-primary/5 rounded-full" />
                  </div>
                </motion.div>

              </div>
            </div>

            {/* 6. Popular Services Chosen Section */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="inline-block text-lg md:text-xl font-black text-slate-900 border-x-3 border-primary px-5 uppercase tracking-wider leading-none font-display">
                  Most Popular Services Chosen By Customer For {countryName}
                </h3>
              </div>

              <div className="prose max-w-none text-slate-500 text-xs md:text-sm font-semibold leading-relaxed space-y-3 p-5 border border-slate-100 rounded-3xl bg-slate-50/20">
                <p>
                  <strong>UPS</strong> - Offers extremely fast delivery timelines. Ideal for life-saving or urgent temperature-controlled medicine shipments from India to {countryName}.
                </p>
                <p>
                  <strong>DHL</strong> - Offers highly systematic documentation screening, ideal for typical chronic medicines like diabetes, heart, and kidney care requirements.
                </p>
              </div>
            </motion.div>

            {/* 7. Courier Options & Rates (Interactive Calculator) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h3 className="inline-block text-lg md:text-xl font-black text-slate-900 border-x-3 border-secondary px-5 uppercase tracking-wider leading-none font-display">
                  Estimate Medicine Courier Charges from India to {countryName}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
                
                {/* Weight selection card */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase font-black tracking-widest bg-secondary/10 text-secondary px-3 py-1 rounded-full inline-block">
                      Interactive Estimator
                    </span>
                    <h4 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                      <Scale size={18} className="text-secondary" /> Adjust Package Weight
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">
                      Drag the slider below to calculate estimated shipping rates for different cargo weights from India.
                    </p>

                    {/* Weight slider controls */}
                    <div className="pt-4 space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-slate-500 font-bold text-xs uppercase">Weight (kg)</span>
                        <span className="text-xl font-black text-[#0052CC] font-mono">{packageWeight.toFixed(1)} kg</span>
                      </div>
                      <input 
                        type="range" 
                        min="0.5" 
                        max="20.0" 
                        step="0.5"
                        value={packageWeight}
                        onChange={(e) => setPackageWeight(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0052CC]"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                        <span>0.5 kg</span>
                        <span>5.0 kg</span>
                        <span>10.0 kg</span>
                        <span>15.0 kg</span>
                        <span>20.0 kg</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 text-[10px] text-slate-400 font-medium">
                    ℹ Pricing is estimated under personal medicine cargo import rules.
                  </div>
                </div>

                {/* DHL Option */}
                <div className="bg-gradient-to-br from-white to-slate-50/20 border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-350" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col items-stretch gap-1.5 w-fit">
                        <span className="text-xs font-black text-slate-800 tracking-wide pt-1">DHL Express</span>
                        <div className="h-6 w-full flex items-center justify-center bg-[#FFCC00] px-2.5 py-0.5 rounded shadow-xs select-none">
                          <svg className="h-4 w-auto" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g transform="skewX(-15)">
                              <text x="50" y="18" fill="#D40511" fontWeight="900" fontSize="18" fontFamily="Impact, Arial Black, sans-serif" letterSpacing="0.5" textAnchor="middle">DHL</text>
                            </g>
                          </svg>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">Fastest</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Estimated Cost</span>
                      <h4 className="text-2xl font-black text-slate-800 font-mono tracking-tight">₹{dhlPrice.toLocaleString("en-IN")}</h4>
                    </div>
                    <div className="space-y-2 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">
                      <p>⏱ Transit: {getTimelineString(country.code)}</p>
                      <p>📦 Free collection from India</p>
                      <p>📄 Customs clearance support</p>
                    </div>
                  </div>
                  
                  <a
                    href={`https://wa.me/918882691919?text=Hi! I want to book DHL Medicine Courier from India to ${countryName} for package weight: ${packageWeight} kg. Estimated price: ₹${dhlPrice}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full text-center py-2.5 rounded-xl bg-primary hover:bg-primary text-white font-bold text-xs shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer block leading-none"
                  >
                    Book DHL Pickup
                  </a>
                </div>

                {/* UPS Option */}
                <div className="bg-gradient-to-br from-white to-slate-50/20 border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-350" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col items-start gap-1.5">
                        <span className="text-xs font-black text-slate-800 tracking-wide pt-1">UPS Express</span>
                        <div className="h-8 flex items-center select-none">
                          <svg className="h-8 w-auto" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 2 C28 2, 38 4, 38 16 C38 28, 28 38, 20 44 C12 38, 2 28, 2 16 C2 4, 12 2, 20 2 Z" fill="#351C15" stroke="#FFC72C" strokeWidth="2.5" />
                            <path d="M4 14C10 11 30 11 36 14" stroke="#FFC72C" strokeWidth="2" />
                            <text x="20" y="32" fill="#FFC72C" fontWeight="bold" fontSize="15" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-0.5">ups</text>
                          </svg>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded uppercase">Best Value</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Estimated Cost</span>
                      <h4 className="text-2xl font-black text-slate-800 font-mono tracking-tight">₹{upsPrice.toLocaleString("en-IN")}</h4>
                    </div>
                    <div className="space-y-2 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">
                      <p>⏱ Transit: 3 to 5 Business Days</p>
                      <p>📦 Free collection from India</p>
                      <p>📄 Customs invoice assistance</p>
                    </div>
                  </div>
                  
                  <a
                    href={`https://wa.me/918882691919?text=Hi! I want to book UPS Medicine Courier from India to ${countryName} for package weight: ${packageWeight} kg. Estimated price: ₹${upsPrice}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full text-center py-2.5 rounded-xl bg-secondary hover:bg-[#0047b3] text-white font-bold text-xs shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer block leading-none"
                  >
                    Book UPS Pickup
                  </a>
                </div>

              </div>
            </motion.div>

            {/* 8. Checked Banner Section (Staggered Children bullets) */}
            <motion.div 
              variants={bannerWrapperVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="bg-gradient-to-r from-secondary to-primary rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg"
            >
              <div className="relative z-10 space-y-4">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-wide font-display">
                  No.1 International Medicine Courier Service from India to {countryName}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs md:text-sm font-semibold">
                  <motion.div variants={bannerItemVariants} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-white shrink-0" />
                    <span>Quick Door-to-Door Delivery Service</span>
                  </motion.div>
                  <motion.div variants={bannerItemVariants} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-white shrink-0" />
                    <span>Live Online Package Tracking</span>
                  </motion.div>
                  <motion.div variants={bannerItemVariants} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-white shrink-0" />
                    <span>24x7 Responsive Customer Support</span>
                  </motion.div>
                  <motion.div variants={bannerItemVariants} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-white shrink-0" />
                    <span>Clear customs clearance assistance</span>
                  </motion.div>
                </div>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] w-40 h-40 bg-white/5 rounded-full" />
            </motion.div>

            {/* 9. Custom Duty Rules And Regulations (Slide in with Pulse warning icon) */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="inline-block text-lg md:text-xl font-black text-slate-900 border-x-3 border-secondary px-5 uppercase tracking-wider leading-none font-display">
                  Custom Duty Rules And Regulations
                </h3>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: -45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ type: "spring", stiffness: 95, damping: 15 }}
                className="bg-[#F0FDFA] border border-[#CCFBF1] rounded-2xl p-5 md:p-6 text-xs md:text-sm flex items-start gap-4 shadow-sm"
              >
                <motion.div 
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-[#0D9488] shrink-0 mt-0.5"
                >
                  <ShieldCheck size={24} />
                </motion.div>
                <div className="space-y-2">
                  <span className="font-extrabold text-[#0D9488] block uppercase tracking-wider text-[11px] md:text-xs">
                    Import Regulatory Framework:
                  </span>
                  <p className="text-[#0F766E] leading-relaxed font-semibold">
                    {country.advice} Personal imports of pharmaceutical products require complete batch validation, structured commercial MSDS shipping manifests, and validation invoice checklists. Any import tax or local tariff levied at destination borders is governed by destination state custom authorities.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 10. FAQs Section (Staggered slide-up + Rotatable indicator) */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="inline-block text-lg md:text-xl font-black text-slate-900 border-x-3 border-primary px-5 uppercase tracking-wider leading-none font-display">
                  Frequently Asked Questions
                </h3>
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="space-y-3.5 text-xs md:text-sm"
              >
                {[
                  {
                    q: `What are the medicine courier charges from India to ${countryName}?`,
                    a: `Medicine courier charges from India to ${countryName} start at ₹${country.basePrice.toLocaleString("en-IN")} for the first 0.5 Kg. Incremental charges are added per 0.5 Kg. You can check rates directly using the interactive weight slider table above.`
                  },
                  {
                    q: `What documents are required to courier medicines to ${countryName}?`,
                    a: "To ship medicines, you require: (1) A valid prescription issued by a registered medical practitioner, (2) Retail purchase bill from a licensed pharmacy store, and (3) Receiver ID identity proof to clear customs on arrival."
                  },
                  {
                    q: `How much time does it take to courier medicines to ${countryName}?`,
                    a: `Typically, standard express air courier shipments are delivered to ${countryName} within ${getTimelineString(country.code)} (working days), backed by priority air routes.`
                  },
                  {
                    q: "Is there any hidden customs fee or duty?",
                    a: "Our estimate includes documentation support, packaging, and custom invoice preparations. If any local import customs duty or tariff is levied by the destination custom department, the receiver is responsible to clear it."
                  },
                  {
                    q: "Can you courier liquid medicines?",
                    a: "Yes, we courier all types of medicines including liquid formulations, tablets, ayurvedic oils, homeopathic dilutions, and herbal care formulations with structured packaging."
                  }
                ].map((faq, index) => (
                  <motion.div 
                    variants={itemVariants}
                    key={index}
                    className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-5 py-4 text-left font-black text-slate-800 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                    >
                      <span>{index + 1}. {faq.q}</span>
                      <motion.span 
                        animate={{ rotate: activeFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-slate-400 font-bold shrink-0 text-base"
                      >
                        {activeFaq === index ? "−" : "+"}
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {activeFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-4 text-slate-500 font-semibold leading-relaxed border-t border-slate-100 pt-3">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
