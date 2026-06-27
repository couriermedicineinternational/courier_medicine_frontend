import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, ShieldCheck, Phone, Scale, 
  ArrowLeft, CheckCircle, MessageSquare, AlertCircle 
} from "lucide-react";
import { ALL_COUNTRIES, ALL_LOCATIONS } from "../constants";
import api from "../utils/api";
import { getProvidersForCountry, getProviderUI, calculatePrice as getProviderPrice, getProviderImage } from "../utils/pricing";

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

export default function LocationDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [packageWeight, setPackageWeight] = useState(0.5);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    import('../utils/pricing').then(m => m.loadPricingData());
    window.scrollTo(0, 0);
    setIsLoading(true);

    api.get(`/locations/${slug}`)
      .then(res => {
        if (res.data && res.data.success) {
          const l = res.data.data;
          const routeObj = {
            id: l.locationId,
            city: l.city,
            country: l.country,
            name: l.name,
            slug: l.slug
          };
          setRoute(routeObj);
          
          api.get('/countries')
            .then(cRes => {
              if (cRes.data && cRes.data.data) {
                const found = cRes.data.data.find(
                  c => c.name.toLowerCase() === l.country.toLowerCase() || c.code.toLowerCase() === l.country.toLowerCase()
                );
                setCountry(found || null);
              }
              setIsLoading(false);
            })
            .catch(cErr => {
              console.error('Error fetching country in location detail:', cErr);
              setIsLoading(false);
            });
        } else {
          fallbackLocal();
        }
      })
      .catch(err => {
        console.error('Error fetching location detail from API:', err);
        fallbackLocal();
      });

    const fallbackLocal = () => {
      const localRoute = ALL_LOCATIONS.find(l => l.slug === slug);
      if (localRoute) {
        setRoute(localRoute);
        const localCountry = ALL_COUNTRIES.find(
          c => c.name.toLowerCase() === localRoute.country.toLowerCase() || c.code.toLowerCase() === localRoute.country.toLowerCase()
        );
        setCountry(localCountry || null);
      }
      setIsLoading(false);
    };
  }, [slug]);

  if (!isLoading && !route) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle size={48} className="text-red-500 mb-3" />
        <h2 className="text-xl font-black text-slate-800">Route Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">The selected shipping route is not registered in our system.</p>
        <Link to="/location.php" className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow">
          Back to Locations List
        </Link>
      </div>
    );
  }

  const basePrice = country ? country.basePrice : 3000; // default backup price
  const advice = country ? country.advice : "Valid doctor prescription and chemist purchase bill required for customs clearance.";
  const originCity = route ? route.city : "";
  const destCountry = route ? route.country : "";

  const providersList = getProvidersForCountry(destCountry);
  const displayProviders = providersList.length > 0 ? providersList : [
    { provider: "DHL", timeline: "4-6 Days" },
    { provider: "UPS", timeline: "5-7 Days" }
  ];

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
        /* Actual Overhauled Location Detail Content Page */
        <motion.div
          key="content-detail"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          id="location-detail-page"
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
                  Global Route
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 font-display uppercase drop-shadow-lg leading-tight">
                  Medicine Courier Service From {originCity} to {destCountry}
                </h1>
                
                <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center justify-center gap-2 text-white/80 mt-6">
                  <Link to="/" className="hover:text-secondary transition-colors text-white/95">Home</Link>
                  <span className="text-white/40">»</span>
                  <Link to="/location.php" className="hover:text-secondary transition-colors text-white/95">Locations</Link>
                  <span className="text-white/40">»</span>
                  <span className="text-secondary font-bold">{originCity} to {destCountry} courier</span>
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
                Send Medicines From {originCity} To {destCountry}
              </h2>
            </motion.div>

            {/* 3. Welcome Copy Section */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.1 }}
              className="prose max-w-none text-slate-600 text-sm md:text-[15px] leading-relaxed font-sans space-y-4 bg-slate-50/50 p-6 md:p-8 rounded-3xl border border-slate-100/60 shadow-[0_4px_25px_rgba(0,0,0,0.015)]"
            >
              <p className="font-extrabold text-slate-800 text-base md:text-lg">
                Welcome to Courier Medicines - We offer the No.1 Medicine Courier service from {originCity} to {destCountry}.
              </p>
              <p>
                At Courier Medicines, we deliver your medicines anywhere in the world. Our team is highly experienced in international medicine delivery, so you can relax knowing your medications will arrive safely and quickly. We procure medicines on our customer's behalf from licensed chemist shops, verify batch numbers and expiry dates, and ship them using priority air routes.
              </p>
              <p>
                Courier medicine from India is legal and we make the process seamless for you by providing Express International medicine courier services from {originCity} to {destCountry}. We have expertise in couriering different types of medicines be it Liquid or Tablets - allopathic medicine, ayurvedic, homeopathy, herbal, or cold storage / temperature control Medicine.
              </p>
            </motion.div>

            {/* 4. Service We Offer Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="inline-block text-lg md:text-xl font-black text-slate-900 border-x-3 border-primary px-5 uppercase tracking-wider leading-none font-display">
                  Service We Offer
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                
                {/* Card 1 - Pickup */}
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
                    Free Doorstep Pickup
                  </h4>
                  <p className="text-slate-500 leading-relaxed pl-10 font-medium text-xs md:text-[13.5px]">
                    Free door-to-door medicine pickup service directly from your home, office, or pharmacy in {originCity}.
                  </p>
                </motion.div>

                {/* Card 2 - Purchase */}
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
                    Medicine Purchase Help
                  </h4>
                  <p className="text-slate-500 leading-relaxed pl-10 font-medium text-xs md:text-[13.5px]">
                    If you cannot procure medicines, our team can purchase prescribed medicines from licensed chemists in {originCity} on your behalf.
                  </p>
                </motion.div>

                {/* Card 3 - Tracking */}
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
                    Live Tracking Status
                  </h4>
                  <p className="text-slate-500 leading-relaxed pl-10 font-medium text-xs md:text-[13.5px]">
                    We provide live tracking numbers. You receive real-time package updates and transit logs as the box moves.
                  </p>
                </motion.div>

                {/* Card 4 - Payment */}
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
                    Payment Methods
                  </h4>
                  <p className="text-slate-500 leading-relaxed pl-10 font-medium text-xs md:text-[13.5px]">
                    Flexible online payment systems including UPI (Google Pay, PhonePe), direct bank transfers, Credit/Debit cards, and Stripe.
                  </p>
                </motion.div>

              </div>
            </div>

            {/* 5. Document Required Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="inline-block text-lg md:text-xl font-black text-slate-900 border-x-3 border-secondary px-5 uppercase tracking-wider leading-none font-display">
                  Documents Required to Send Medicine from {originCity} to {destCountry}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50/50 border border-slate-100 rounded-3xl p-6 md:p-8 shadow-[inset_0_2px_8px_rgba(0,0,0,0.01)]">
                
                {/* Text Block */}
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
                      1. Doctor Prescription Required
                    </h4>
                    <p className="text-slate-500 pl-4 font-medium leading-relaxed">
                      A valid prescription copy containing the patient name, doctor registration details, and medication list.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      2. Medicine Invoice Bill
                    </h4>
                    <p className="text-slate-500 pl-4 font-medium leading-relaxed">
                      Genuine retail purchase receipt/bill from a pharmacy matching the prescription details.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      3. Receiver Identity Proof
                    </h4>
                    <p className="text-slate-500 pl-4 font-medium leading-relaxed">
                      Valid identity document copy of the receiver in {destCountry} to submit for customs clearance.
                    </p>
                  </div>
                </motion.div>

                {/* Graphic rx card */}
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
                  Courier Options For Shipping From {originCity} To {destCountry}
                </h3>
              </div>

              <div className="prose max-w-none text-slate-500 text-xs md:text-sm font-semibold leading-relaxed space-y-3 p-5 border border-slate-100 rounded-3xl bg-slate-50/20">
                <p>
                  <strong>UPS Express</strong> - Delivers in {getTimelineString(country?.code)}. Ideal for urgent or cold storage medicines couriered from {originCity} to {destCountry}.
                </p>
                <p>
                  <strong>DHL Express</strong> - Delivers in {getTimelineString(country?.code)}. Ideal for typical chronic medicines requiring thorough custom documentation checks.
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
                  Estimate Medicine Courier Charges from {originCity} to {destCountry}
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
                      Drag the slider below to calculate estimated shipping rates for different cargo weights from {originCity}.
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

                {/* Dynamic Provider Options */}
                {displayProviders.map((p) => {
                  const ui = getProviderUI(p.provider);
                  const providerPrice = getProviderPrice(destCountry, p.provider, packageWeight) || 3500;
                  
                  return (
                    <div key={p.provider} className="bg-gradient-to-br from-white to-slate-50/20 border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                      <div className={`absolute bottom-0 inset-x-0 h-1 ${ui.themeColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-350`} />
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col items-stretch gap-1.5 w-fit">
                            <span className="text-xs font-black text-slate-800 tracking-wide pt-1">{p.provider} Express</span>
                            {getProviderImage(p.provider) ? (
                              <div className="h-8 flex items-center select-none">
                                <img src={getProviderImage(p.provider)} alt={p.provider} className="h-8 w-auto object-contain drop-shadow-sm" />
                              </div>
                            ) : (
                              ui.logoNode
                            )}
                          </div>
                          <span className={`text-[10px] font-bold ${ui.themeText} ${ui.themeColor.replace('bg-', 'bg-')}/10 px-2 py-0.5 rounded uppercase border border-slate-100`}>
                            {ui.badgeLabel}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Estimated Cost</span>
                          <h4 className="text-2xl font-black text-slate-800 font-mono tracking-tight">₹{providerPrice.toLocaleString("en-IN")}</h4>
                        </div>
                        <div className="space-y-2 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">
                          <p>⏱ Transit: {p.timeline}</p>
                          <p>📦 Free collection from {originCity}</p>
                          <p>📄 Customs clearance support</p>
                        </div>
                      </div>
                      
                      <a
                        href={`https://wa.me/918882691919?text=Hi! I want to book ${p.provider} Medicine Courier from ${originCity} to ${destCountry} for package weight: ${packageWeight} kg. Estimated price: ₹${providerPrice}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-6 w-full text-center py-2.5 rounded-xl ${ui.themeColor} ${ui.hoverBg} text-white font-bold text-xs shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer block leading-none`}
                      >
                        Book {p.provider} Pickup
                      </a>
                    </div>
                  );
                })}

              </div>
            </motion.div>

            {/* 8. Customs Advisory Notice */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              className="bg-amber-50/40 border border-amber-200/50 p-6 rounded-3xl space-y-3 relative overflow-hidden flex flex-col md:flex-row items-start gap-4 shadow-xs"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <motion.span
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ShieldCheck size={20} className="stroke-[2.2]" />
                </motion.span>
              </div>
              <div className="space-y-1 grow">
                <h4 className="text-xs font-black uppercase text-amber-800 tracking-wider">
                  Health Customs Advisory Warning ({destCountry} Regulations)
                </h4>
                <p className="text-xs text-amber-700 leading-relaxed font-sans font-medium">
                  {advice} Personal shipments of medicines require a clear doctor's prescription detailing patient name and dosage, along with original retail chemist bills.
                </p>
              </div>
            </motion.div>

            {/* 9. FAQs Section (Alternating spring items) */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="inline-block text-lg md:text-xl font-black text-slate-900 border-x-3 border-secondary px-5 uppercase tracking-wider leading-none font-display">
                  Frequently Asked Questions (FAQ)
                </h3>
              </div>

              <div id="faq-accordions" className="max-w-3xl mx-auto space-y-3 font-sans">
                {[
                  {
                    q: `How can I send medicine from ${originCity} to ${destCountry}?`,
                    a: `To send medicine from ${originCity} to ${destCountry}, you need to share a copy of your doctor's prescription and purchase bill with us. We will arrange a free doorstep pickup at your address in ${originCity}, verify and pack the medicines according to air travel guidelines, and ship them securely via priority carriers.`
                  },
                  {
                    q: `Is it legal to courier medicines from ${originCity} to ${destCountry}?`,
                    a: `Yes, it is legal to courier personal-use medications from ${originCity} to ${destCountry} under personal import rules. You must provide a valid medical prescription matching the receiver's name and details.`
                  },
                  {
                    q: `What types of medicines can I send from ${originCity}?`,
                    a: `We courier all types of medicines from ${originCity}: Allopathic, Homeopathic, Ayurvedic, liquid syrups, capsules, tablets, chronic disease care drugs, and temperature-controlled cold chain medicines.`
                  },
                  {
                    q: `How long does it take for the package to reach ${destCountry} from ${originCity}?`,
                    a: `Typical transit delivery timeline from ${originCity} to ${destCountry} is ${getTimelineString(country?.code)} via express global cargo carriers.`
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 120 }}
                    className="border border-slate-100 rounded-2xl bg-white overflow-hidden shadow-xs hover:shadow-sm transition-shadow"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-center p-5 text-left font-sans font-bold text-xs md:text-sm text-slate-800 hover:text-primary transition-colors cursor-pointer select-none bg-gradient-to-r from-white to-slate-50/20"
                    >
                      <span>{item.q}</span>
                      <motion.span
                        animate={{ rotate: activeFaq === idx ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="text-slate-400 shrink-0 ml-4 font-mono text-base font-bold flex items-center justify-center w-5 h-5 rounded-full bg-slate-100/50"
                      >
                        {activeFaq === idx ? "−" : "+"}
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {activeFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="p-5 pt-0 text-xs text-slate-500 leading-relaxed border-t border-slate-100/50 pl-5 pr-5 pb-5">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 10. Call-to-Action Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-gradient-to-r from-[#0052CC] to-[#03ADA4] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden text-center shadow-lg"
            >
              <div className="absolute right-0 top-0 opacity-10 pointer-events-none select-none z-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_100%)]" />
              <div className="relative z-10 space-y-6 max-w-xl mx-auto">
                <span className="text-[10px] uppercase font-black tracking-widest bg-white/20 px-3.5 py-1.5 rounded-full inline-block leading-none">
                  Express Delivery
                </span>
                <h3 className="text-xl md:text-3xl font-black tracking-tight leading-tight font-display">
                  Courier Medicines from {originCity} to {destCountry} Today
                </h3>
                <p className="text-xs md:text-sm text-white/90 leading-relaxed font-sans font-medium">
                  Have questions about pricing, timelines, or local custom regulations? Get direct assistance from our expert helpdesk agent on WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={`https://wa.me/918882691919?text=Hi! I want to courier medicines from ${originCity} to ${destCountry}. Can I get a custom quote?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-white text-secondary font-bold text-xs shadow hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-1.5 leading-none"
                  >
                    <MessageSquare size={14} className="fill-current text-secondary" />
                    <span>WhatsApp Booking Desk</span>
                  </a>
                  <a
                    href="tel:+918882691919"
                    className="px-6 py-3 rounded-xl border border-white/25 hover:border-white/50 bg-white/10 text-white font-bold text-xs hover:bg-white/15 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-1.5 leading-none"
                  >
                    <Phone size={14} className="fill-current text-white" />
                    <span>Call Helpline Support</span>
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
