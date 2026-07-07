import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Check,
  PlaneTakeoff,
  Activity,
  Clock,
  ChevronDown
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";
import { HERO, ALL_COUNTRIES } from "../../constants";
import { calculatePrice, getDefaultProvider, getProvidersForCountry, getProviderImage, getProviderUI } from "../../utils/pricing";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import api from "../../utils/api";
import CalculatorForm from "./CalculatorForm";

const heroSlides = [
  {
    heading: "Customer’s First & Trusted Choice",
    subheading: "For International Medicine Courier Services"
  }
];

export default function HeroSection({ title, subtitle, content }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [prescriptionValue, setPrescriptionValue] = useState("YES");
  const [countries, setCountries] = useState(ALL_COUNTRIES || []);
  const [locations, setLocations] = useState(HERO.locationsList || []);
  const [weightIndex, setWeightIndex] = useState(0);
  const [serviceType, setServiceType] = useState("PICKUP");

  const slides = content?.slides || heroSlides;
  const bullets = content?.bullets || HERO.bullets || [];

  useEffect(() => {
    import('../../utils/pricing').then(m => m.loadPricingData());
  }, []);

  useEffect(() => {
    // Fetch locations list from API
    api.get('/locations')
      .then(res => {
        if (res.data && res.data.data) {
          const uniqueCities = [];
          const seen = new Set();
          res.data.data.forEach(l => {
            const cityName = l.city || l.name.split(" to ")[0];
            const cleanName = cityName.trim();
            const lowerKey = cleanName.toLowerCase();
            if (!seen.has(lowerKey)) {
              seen.add(lowerKey);
              uniqueCities.push({
                id: lowerKey,
                name: cleanName
              });
            }
          });
          setLocations(uniqueCities);
        }
      })
      .catch(err => console.error('Error fetching locations:', err));
  }, []);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      weight: "0.5"
    }
  });

  useEffect(() => {
    if (location.state?.prefill) {
      const prefill = location.state.prefill;
      // Map country name back to country code
      const matchedCountry = ALL_COUNTRIES.find(c => c.name.toLowerCase() === prefill.country.toLowerCase());
      if (matchedCountry) {
        setValue("country", matchedCountry.code);
      }
      
      // Map medicineType back to id
      const matchedMed = HERO.medicineTypes.find(m => m.name.toLowerCase() === prefill.medicineType.toLowerCase());
      if (matchedMed) {
        setValue("medicineType", matchedMed.id);
      }

      if (prefill.mobile) {
        setValue("mobile", prefill.mobile);
      }

      if (prefill.prescription) {
        setPrescriptionValue(prefill.prescription);
      }

      if (prefill.serviceType) {
        setServiceType(prefill.serviceType === "I WANT PICK UP" ? "PICKUP" : "BUY");
      }

      if (prefill.weight !== undefined) {
        const wVal = parseFloat(prefill.weight);
        setValue("weight", wVal.toFixed(1));
        const idx = wVal === 0.5 ? 0 : wVal === 1.0 ? 1 : 2;
        setWeightIndex(idx);
      }
    }
  }, [location.state, setValue]);

  const weightLabels = ["0.5 kg", "1.0 kg", "Above"];

  const handleSliderChange = (e) => {
    const idx = parseInt(e.target.value);
    setWeightIndex(idx);
    const val = idx === 0 ? "0.5" : idx === 1 ? "1.0" : "2.0"; // "2.0" represents "Above" for calculations
    setValue("weight", val);
  };

  const weightOptions = Array.from({ length: 40 }, (_, i) => ({
    value: (0.5 * (i + 1)).toFixed(1),
    label: `${(0.5 * (i + 1)).toFixed(1)} KG`
  }));



  const onSubmitCalculator = async (data) => {
    const defaultLocId = locations[0]?.id || "delhi";
    const defaultLocName = locations[0]?.name || "Delhi";

    if (weightIndex === 2) {
      const countryObj = countries.find(c => c.code === data.country);
      const medTypeObj = HERO.medicineTypes.find(m => m.id === data.medicineType);

      const specialQuoteObj = {
        country: countryObj?.name || "Target Destination",
        countryCode: data.country,
        location: defaultLocName,
        medicineType: medTypeObj?.name || "Allopathic",
        mobile: data.mobile,
        prescription: prescriptionValue,
        weight: "Above 1 KG",
        serviceType: serviceType === "PICKUP" ? "I WANT PICK UP" : "BUY MEDICINES ON MY BEHALF"
      };

      navigate("/special-rates.php", { state: { calculatedQuote: specialQuoteObj } });
      return;
    }

    try {
      const response = await api.post('/quotes', {
        country: data.country,
        location: defaultLocId,
        locationName: defaultLocName,
        medicineType: data.medicineType,
        mobile: data.mobile,
        hasPrescription: prescriptionValue,
        notes: serviceType === "PICKUP" ? "I WANT PICK UP" : "BUY MEDICINES ON MY BEHALF"
      });

      if (response.data && response.data.success) {
        const quote = response.data.data;
        const countryObj = countries.find(c => c.code === quote.country);
        const locationObj = locations.find(l => l.id === quote.location) || { id: defaultLocId, name: defaultLocName };
        const medTypeObj = HERO.medicineTypes.find(m => m.id === quote.medicineType);

        const weightVal = parseFloat(data.weight || 0.5);
        const defaultProvider = getDefaultProvider(countryObj?.name || quote.countryName);

        const quoteObj = {
          country: quote.countryName || countryObj?.name || quote.country,
          countryCode: quote.country,
          location: quote.locationName || locationObj?.name || quote.location,
          medicineType: medTypeObj?.name || quote.medicineType,
          mobile: quote.mobile,
          prescription: quote.hasPrescription,
          weight: weightVal,
          provider: defaultProvider ? defaultProvider.provider : "Premium Provider",
          price: quote.estimatedPrice,
          timeline: quote.estimatedTimeline,
          bookingRef: quote.bookingRef,
          serviceType: serviceType === "PICKUP" ? "I WANT PICK UP" : "BUY MEDICINES ON MY BEHALF"
        };

        navigate("/service-provider.php", { state: { calculatedQuote: quoteObj } });
        return;
      }
    } catch (err) {
      console.error('Error generating quote from API, using fallback logic:', err);
    }

    // Fallback calculation logic if API call fails
    const countryObj = countries.find(c => c.code === data.country);
    const medTypeObj = HERO.medicineTypes.find(m => m.id === data.medicineType);
    const weightVal = parseFloat(data.weight || 0.5);

    let basePrice = 2850;
    let estTimeline = "3-5 Business Days";
    let defaultProviderName = "Premium Provider";

    const defaultProvider = getDefaultProvider(countryObj?.name);
    if (defaultProvider) {
      basePrice = calculatePrice(countryObj?.name, defaultProvider.provider, weightVal);
      estTimeline = defaultProvider.timeline;
      defaultProviderName = defaultProvider.provider;
    } else {
      if (countryObj?.code === "US") basePrice = 3300;
      if (countryObj?.code === "GB") basePrice = 3100;
      if (countryObj?.code === "AU") basePrice = 3400;
      if (countryObj?.code === "CA") basePrice = 3500;
      if (countryObj?.code === "AE") basePrice = 1800;
      estTimeline = countryObj?.code === "AE" ? "2-3 Business Days" : "3-5 Business Days";
    }

    const totalEstimate = Math.round(basePrice);

    const fallbackQuoteObj = {
      country: countryObj?.name || "Target Destination",
      countryCode: data.country,
      location: defaultLocName,
      medicineType: medTypeObj?.name || "Allopathic",
      mobile: data.mobile,
      prescription: prescriptionValue,
      weight: weightVal,
      provider: defaultProviderName,
      price: totalEstimate,
      timeline: estTimeline,
      bookingRef: `CM-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceType: serviceType === "PICKUP" ? "I WANT PICK UP" : "BUY MEDICINES ON MY BEHALF"
    };

    navigate("/service-provider.php", { state: { calculatedQuote: fallbackQuoteObj } });
  };

  return (
    <>
      <section id="hero-section" className="relative w-full pt-2 md:pt-3 pb-6 md:pb-8 font-sans">
        
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-white">
          <img 
            src="https://res.cloudinary.com/dib6l7ocv/image/upload/v1781865141/courier-medicine-static/bright-bg.jpg" 
            alt="Medical Abstract Background" 
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        </div>

        {/* Hero Content Layer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div id="hero-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-0">
          
          {/* Left Hero: Picture Column with Text Overlay */}
          <motion.div 
            id="hero-left-col" 
            className="lg:col-span-7 flex flex-col justify-start relative rounded-2xl overflow-hidden shadow-2xl pt-6 px-6 pb-2.5 md:pt-8 md:px-8 md:pb-3.5 lg:pt-10 lg:px-10 lg:pb-4.5 border border-slate-700/50"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            
            {/* Background Image Layer for Left Column */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://res.cloudinary.com/dib6l7ocv/image/upload/v1781865151/courier-medicine-static/delivery_guy_hero_new.jpg" 
                alt="Medical Courier Agent" 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/85 via-slate-900/60 to-slate-900/25"></div>
            </div>

            {/* Static Hero Headings Overlay */}
            <div className="relative z-10 flex flex-col justify-end h-full pb-0 min-h-[240px] md:min-h-[290px]">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[11px] sm:text-xs md:text-sm font-black text-[#00E5C9] tracking-widest uppercase drop-shadow-sm">
                  {slides[0]?.heading}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-black text-white tracking-tight leading-tight max-w-xl drop-shadow-md">
                  {slides[0]?.subheading}
                </h1>

                {/* Features Bullet List */}
                {bullets && bullets.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-3 w-full max-w-xl">
                    {bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-white">
                        <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-[#03ADA4] text-white shrink-0 mt-0.5 shadow-sm">
                          <Check size={10} className="stroke-[3.5]" />
                        </span>
                        <span className="text-xs font-semibold tracking-wide leading-tight drop-shadow-sm">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </motion.div>

          {/* Right Hero: Calculator Form */}
          <motion.div 
            id="hero-right-col" 
            className="hidden lg:block lg:col-span-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
          >
            <CalculatorForm />
          </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
