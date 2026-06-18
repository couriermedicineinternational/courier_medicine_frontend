import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { 
  Check,
  PlaneTakeoff,
  Activity,
  Clock
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";
import { HERO } from "../../constants";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";

const heroSlides = [
  {
    heading: "Send Medicines Worldwide with Confidence",
    subheading: "Fast, Safe & Reliable International Medicine Courier Services with Free Doorstep Pickup from India."
  },
  {
    heading: "Your Medicines. Delivered Anywhere in the World.",
    subheading: "Helping Families Stay Connected to Essential Healthcare with Fast International Delivery."
  },
  {
    heading: "Need Medicines Abroad? We Deliver Worldwide.",
    subheading: "From Prescription Medicines to Ayurvedic & Homeopathic Products, Safely Delivered to Your Doorstep."
  }
];

export default function HeroSection() {
  const [prescriptionValue, setPrescriptionValue] = useState("YES");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [calculatedQuote, setCalculatedQuote] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmitCalculator = (data) => {
    const countryObj = HERO.countriesList.find(c => c.code === data.country);
    const locationObj = HERO.locationsList.find(l => l.id === data.location);
    const medTypeObj = HERO.medicineTypes.find(m => m.id === data.medicineType);

    let basePrice = 2850;
    if (countryObj?.code === "US") basePrice = 3300;
    if (countryObj?.code === "GB") basePrice = 3100;
    if (countryObj?.code === "AU") basePrice = 3400;
    if (countryObj?.code === "CA") basePrice = 3500;
    if (countryObj?.code === "AE") basePrice = 1800;

    let markupMultiplier = 1.0;
    if (medTypeObj?.id === "critical") markupMultiplier = 1.25;
    if (prescriptionValue === "NO") markupMultiplier = 1.15;

    const totalEstimate = Math.round(basePrice * markupMultiplier);
    const estTimeline = countryObj?.code === "AE" ? "2-3 Business Days" : "3-5 Business Days";

    setCalculatedQuote({
      country: countryObj?.name || "Target Destination",
      location: locationObj?.name || "Pickup Point",
      medicineType: medTypeObj?.name || "Allopathic",
      mobile: data.mobile,
      prescription: prescriptionValue,
      price: totalEstimate,
      timeline: estTimeline,
      bookingRef: `CM-${Math.floor(100000 + Math.random() * 900000)}`
    });

    setIsQuoteModalOpen(true);
  };

  return (
    <>
      <section id="hero-section" className="relative w-full pt-4 md:pt-6 pb-6 md:pb-10 font-sans">
        
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-white">
          <img 
            src="/bright-bg.png" 
            alt="Medical Abstract Background" 
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        </div>

        {/* Hero Content Layer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div id="hero-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Left Hero: Picture & Bullet Points */}
          <motion.div 
            id="hero-left-col" 
            className="lg:col-span-7 flex flex-col justify-start relative rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 lg:p-10 border border-slate-700/50"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            
            {/* Background Image Layer for Left Column */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/delivery_guy_hero_new.jpg" 
                alt="Medical Courier Agent" 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-slate-900/40"></div>
            </div>

            {/* Animated Rotating Headings */}
            <div className="relative z-10 flex flex-col justify-end h-full pb-0 min-h-[220px] md:min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ x: -120, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 120, opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-start gap-3"
                >
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00C2A8] to-[#4D90FF] tracking-tight leading-tight pb-1">
                    {heroSlides[activeSlide].heading}
                  </h1>
                  <p className="text-sm md:text-base text-white/85 font-medium leading-relaxed max-w-lg drop-shadow">
                    {heroSlides[activeSlide].subheading}
                  </p>

                  {/* Slide indicator dots */}
                  <div className="flex items-center gap-2 mt-3">
                    {heroSlides.map((_, idx) => (
                      <span
                        key={idx}
                        className={`block rounded-full transition-all duration-500 ${
                          idx === activeSlide
                            ? "w-7 h-2 bg-white"
                            : "w-2 h-2 bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>

          {/* Right Hero: Calculator Form */}
          <motion.div 
            id="hero-right-col" 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
          >
            <div id="hero-form-card" className="bg-white border-2 border-primary/80 shadow-xl rounded-2xl p-6 relative overflow-hidden h-full flex flex-col justify-between">
              
              {/* Solid Bottom Border highlight */}
              <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#03ADA4]" />
              
              <div>
                <h2 id="calculator-form-title" className="text-base font-black tracking-tight text-slate-800 border-b border-dashed border-slate-100 pb-3 mb-4 flex items-center justify-between">
                  <span>{HERO.form.title}</span>
                  <Activity size={18} className="text-primary animate-pulse shrink-0" />
                </h2>

                <form id="calculator-form" onSubmit={handleSubmit(onSubmitCalculator)} className="space-y-4 font-sans">
                  {/* Country & Selector row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      id="form-country"
                      label={HERO.form.countryLabel}
                      placeholder={HERO.form.countryPlaceholder}
                      componentType="select"
                      required
                      options={HERO.countriesList.map(c => ({ value: c.code, label: c.name }))}
                      error={errors.country?.message}
                      {...register("country", { required: "Destination country is required" })}
                    />
                    <Input
                      id="form-location"
                      label={HERO.form.locationLabel}
                      placeholder={HERO.form.locationPlaceholder}
                      componentType="select"
                      required
                      options={HERO.locationsList.map(l => ({ value: l.id, label: l.name }))}
                      error={errors.location?.message}
                      {...register("location", { required: "Pickup point city is required" })}
                    />
                  </div>

                  {/* Medicines Type & Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      id="form-medicines-type"
                      label={HERO.form.medicineTypeLabel}
                      placeholder={HERO.form.medicineTypePlaceholder}
                      componentType="select"
                      required
                      options={HERO.medicineTypes.map(m => ({ value: m.id, label: m.name }))}
                      error={errors.medicineType?.message}
                      {...register("medicineType", { required: "Medicine category is required" })}
                    />
                    <Input
                      id="form-mobile"
                      label={HERO.form.mobileLabel}
                      placeholder={HERO.form.mobilePlaceholder}
                      type="tel"
                      required
                      error={errors.mobile?.message}
                      {...register("mobile", { 
                        required: "Mobile phone is required",
                        pattern: {
                          value: /^\+?[0-9]{8,15}$/,
                          message: "Invalid mobile phone format"
                        }
                      })}
                    />
                  </div>

                  {/* Yes or No Prescription Radios styled from screenshot */}
                  <div id="prescription-option-container" className="pt-2">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-2">
                      {HERO.form.prescriptionQuestion}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        id="presc-yes-btn"
                        type="button"
                        onClick={() => setPrescriptionValue("YES")}
                        className={`py-2 px-4 rounded-lg font-bold text-xs border text-center transition-all ${
                          prescriptionValue === "YES"
                            ? "bg-secondary/10 border-secondary text-secondary shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {HERO.form.prescriptionYes}
                      </button>
                      <button
                        id="presc-no-btn"
                        type="button"
                        onClick={() => setPrescriptionValue("NO")}
                        className={`py-2 px-4 rounded-lg font-bold text-xs border text-center transition-all ${
                          prescriptionValue === "NO"
                            ? "bg-secondary/10 border-secondary text-secondary shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {HERO.form.prescriptionNo}
                      </button>
                    </div>
                  </div>

                  {/* Submit Trigger */}
                  <Button
                    id="submit-charges-btn"
                    type="submit"
                    variant="primary"
                    className="w-full mt-4"
                  >
                    {HERO.form.submitButton}
                  </Button>
                </form>
              </div>

              {/* Secure logistics footer details */}
              <div className="text-center pt-3 mt-4 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
                🔒 Data encrypted. Authorized under CDSCO medicine export directives.
              </div>
            </div>
          </motion.div>

          </div>
        </div>
      </section>

      <Modal
        id="quote-result-modal"
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        title="📝 Estimated Courier Charges"
      >
        {calculatedQuote && (
          <div className="space-y-4 font-sans text-slate-700">
            <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                BOOKING REFERENCE
              </span>
              <h4 className="text-lg font-black text-secondary mt-0.5 tracking-tight">
                {calculatedQuote.bookingRef}
              </h4>
              <div className="text-primary font-extrabold text-[11px] tracking-wider uppercase mt-1">
                ✔ PROVISIONALLY RESERVED
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs py-2">
              <div className="flex justify-between py-2">
                <span className="font-bold text-slate-500">Destination Country</span>
                <span className="font-semibold text-slate-800">{calculatedQuote.country}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-bold text-slate-500">Pickup Location</span>
                <span className="font-semibold text-slate-800">{calculatedQuote.location}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-bold text-slate-500">Type of Medicines</span>
                <span className="font-semibold text-slate-800">{calculatedQuote.medicineType}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-bold text-slate-500">Prescription Upload</span>
                <span className={`font-semibold ${calculatedQuote.prescription === "YES" ? "text-primary" : "text-amber-600"}`}>
                  {calculatedQuote.prescription === "YES" ? "Registered Doctors Copy" : "Pending Proxy Request"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-bold text-slate-500">Transit Duration</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Clock size={12} className="text-secondary" />
                  {calculatedQuote.timeline}
                </span>
              </div>
              <div className="flex justify-between py-2 pt-3">
                <span className="font-extrabold text-sm text-slate-900">Estimated Cost (INR)*</span>
                <span className="font-extrabold text-lg text-primary">
                  ₹{calculatedQuote.price.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 leading-relaxed text-center font-medium">
              * Charges are estimated for weights up to 0.5kg including professional high-grade packaging materials, labeling, customs paperwork, and flight cargo fees. Value added tax or remote area courier offsets may alter final rates.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href={`https://wa.me/918882691919?text=Hi! I want to courier ${calculatedQuote.medicineType} from ${calculatedQuote.location} to ${calculatedQuote.country}. My Booking code is: ${calculatedQuote.bookingRef}. Estimate: ₹${calculatedQuote.price}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 rounded-lg bg-primary hover:bg-primary text-white font-bold text-xs select-none shadow border-b-2 border-primary hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                💬 Send Quote To WhatsApp & Book Pickup
              </a>
              <a
                href="tel:+918882691919"
                className="w-full text-center py-2.5 rounded-lg bg-secondary hover:bg-secondary text-white font-bold text-xs select-none shadow border-b-2 border-secondary hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                📞 Call Team for Free Doorstep Collection
              </a>
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(false)}
                className="w-full text-center py-2 text-xs font-semibold text-slate-400 hover:text-slate-600 hover:underline"
              >
                Close and recalculate
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
