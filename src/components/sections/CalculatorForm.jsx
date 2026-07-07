import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { HERO, ALL_COUNTRIES } from "../../constants";
import { calculatePrice, getDefaultProvider } from "../../utils/pricing";
import { COUNTRY_CALLING_CODES } from "../../constants/countryCodes";
import Input from "../ui/Input";
import api from "../../utils/api";

const weightLabels = ["0.5 kg", "1.0 kg", "Above 1kg"];

export default function CalculatorForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [prescriptionValue, setPrescriptionValue] = useState("YES");
  const [countries, setCountries] = useState(ALL_COUNTRIES || []);
  const [locations, setLocations] = useState(HERO.locationsList || []);
  const [weightIndex, setWeightIndex] = useState(0);
  const [serviceType, setServiceType] = useState(null);
  const [serviceTypeError, setServiceTypeError] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  useEffect(() => {
    import('../../utils/pricing').then(m => m.loadPricingData());
    api.get('/countries')
      .then(res => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          setCountries(res.data.data);
        }
      })
      .catch(err => console.error('Error fetching countries:', err));
      
    api.get('/locations')
      .then(res => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          setLocations(res.data.data);
        }
      })
      .catch(err => console.error('Error fetching locations:', err));
  }, []);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      country: "",
      weight: "0.5",
      medicineType: "allopathic",
      mobile: ""
    }
  });

  useEffect(() => {
    // Prefill form values from location state if coming back from service provider page (Modify Search)
    const prefill = location.state?.calculatedQuote;
    if (prefill) {
      if (prefill.countryCode) setValue("country", prefill.countryCode);
      if (prefill.medicineType) {
        const matchingType = HERO.medicineTypes.find(m => m.name.toLowerCase() === prefill.medicineType.toLowerCase());
        if (matchingType) setValue("medicineType", matchingType.id);
      }
      if (prefill.mobile) {
        const parts = prefill.mobile.split(' ');
        if (parts.length > 1 && parts[0].startsWith('+')) {
          setCountryCode(parts[0]);
          setValue("mobile", parts.slice(1).join(' '));
        } else {
          setValue("mobile", prefill.mobile);
        }
      }
      if (prefill.prescription) setPrescriptionValue(prefill.prescription);
      if (prefill.serviceType) {
        setServiceType(prefill.serviceType.includes("PICK") ? "PICKUP" : "BUY");
      }

      if (prefill.weight !== undefined) {
        const wVal = parseFloat(prefill.weight);
        setValue("weight", wVal.toFixed(1));
        const idx = wVal === 0.5 ? 0 : wVal === 1.0 ? 1 : 2;
        setWeightIndex(idx);
      }
    }
  }, [location.state, setValue, countries]);

  const handleIndexChange = (newIndex) => {
    setWeightIndex(newIndex);
    const val = newIndex === 0 ? "0.5" : newIndex === 1 ? "1.0" : "2.0"; // "2.0" represents "Above" for calculations
    setValue("weight", val);
  };

  const onSubmitCalculator = async (data) => {
    if (!serviceType) {
      setServiceTypeError(true);
      return;
    }
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
        mobile: `${countryCode} ${data.mobile}`,
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
        mobile: `${countryCode} ${data.mobile}`,
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
      mobile: `${countryCode} ${data.mobile}`,
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
    <div id="hero-form-card" className="bg-white border-2 border-primary/80 shadow-xl rounded-2xl relative overflow-hidden h-full flex flex-col justify-between">
      
      {/* Solid Bottom Border highlight */}
      <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#03ADA4]" />
      
      <div className="flex flex-col h-full justify-between">
        <div>
          <h2 id="calculator-form-title" className="bg-[#1EB848] text-white text-center py-3.5 px-4 font-extrabold text-[13px] md:text-sm uppercase tracking-wide w-full flex items-center justify-center shrink-0">
            <span>CHOOSE SERVICE FROM BELOW OPTION</span>
          </h2>

          <div className="p-5">
            <form id="calculator-form" onSubmit={handleSubmit(onSubmitCalculator)} className="space-y-3.5 font-sans">
              {/* Service Option Buttons */}
              <div className="flex flex-col gap-1.5 mb-3 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  Select Service Mode <span className="text-red-500">*</span>
                </label>
                <div className={`grid grid-cols-2 gap-3 p-1 rounded-2xl transition-all duration-200 ${
                  serviceTypeError ? "ring-2 ring-red-400 bg-red-50/50 p-2" : ""
                }`}>
                  <button
                    type="button"
                    onClick={() => {
                      setServiceType("PICKUP");
                      setServiceTypeError(false);
                    }}
                    className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border-2 text-center transition-all duration-200 shadow-xs hover:shadow-sm cursor-pointer group active:scale-97 select-none relative overflow-hidden ${
                      serviceType === "PICKUP"
                        ? "bg-[#0052cc] border-[#0052cc] text-white font-black scale-[1.01] shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-700 font-extrabold"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <svg className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${serviceType === "PICKUP" ? "text-white" : "text-slate-500 group-hover:text-secondary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a3 3 0 003-3V9.5a2.5 2.5 0 00-2.5-2.5H18m-5-3.5h-8A2.5 2.5 0 002.5 6v8a3 3 0 003 3h2m10 0a3 3 0 11-6 0m6 0h-2m-3 0a3 3 0 11-6 0m6 0H9" />
                      </svg>
                      <span className="text-[9.5px] sm:text-[11px] uppercase tracking-wide">I Want Pick Up</span>
                    </div>
                    {serviceType === "PICKUP" && (
                      <div className="absolute top-0.5 right-0.5 bg-white text-[#0052cc] rounded-full p-0.5 shadow-xs">
                        <svg className="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setServiceType("BUY");
                      setServiceTypeError(false);
                    }}
                    className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border-2 text-center transition-all duration-200 shadow-xs hover:shadow-sm cursor-pointer group active:scale-97 select-none relative overflow-hidden ${
                      serviceType === "BUY"
                        ? "bg-[#0052cc] border-[#0052cc] text-white font-black scale-[1.01] shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-700 font-extrabold"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <svg className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${serviceType === "BUY" ? "text-white" : "text-slate-500 group-hover:text-secondary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span className="text-[9px] sm:text-[11px] uppercase tracking-wide">Buy Medicines For Me</span>
                    </div>
                    {serviceType === "BUY" && (
                      <div className="absolute top-0.5 right-0.5 bg-white text-[#0052cc] rounded-full p-0.5 shadow-xs">
                        <svg className="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
                {serviceTypeError && (
                  <span className="text-[10px] text-red-500 font-bold ml-1 animate-in fade-in duration-200">
                    Please select a service option (Pick Up or Buy Medicines)
                  </span>
                )}
              </div>

              {/* Country & Weight row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                <Input
                  id="form-country"
                  label={HERO.form.countryLabel}
                  placeholder={HERO.form.countryPlaceholder}
                  componentType="select"
                  required
                  options={countries.map(c => ({ value: c.code, label: c.name }))}
                  error={errors.country?.message}
                  {...register("country", { required: "Destination country is required" })}
                />
                
                {/* Custom Weight Slider */}
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      WEIGHT (KG)
                    </span>
                    <span className="text-[20px] font-black text-secondary leading-none">
                      {weightLabels[weightIndex]}
                    </span>
                  </div>
                  
                  <div className="relative mt-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={weightIndex * 50}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        const currentVal = weightIndex * 50;
                        let newIdx = weightIndex;
                        if (val > currentVal) {
                          if (val > 75 && weightIndex === 0) newIdx = 2;
                          else newIdx = Math.min(2, weightIndex + 1);
                        } else if (val < currentVal) {
                          if (val < 25 && weightIndex === 2) newIdx = 0;
                          else newIdx = Math.max(0, weightIndex - 1);
                        }
                        handleIndexChange(newIdx);
                      }}
                      className="w-full custom-slider cursor-pointer"
                    />
                    <input type="hidden" {...register("weight")} />
                  </div>

                  <div className="flex justify-between text-[11px] font-bold text-slate-400 px-1 mt-1">
                    <span className="cursor-pointer hover:text-secondary transition-colors" onClick={() => handleIndexChange(0)}>0.5 kg</span>
                    <span className="cursor-pointer hover:text-secondary transition-colors" onClick={() => handleIndexChange(1)}>1.0 kg</span>
                    <span className="cursor-pointer hover:text-secondary transition-colors" onClick={() => handleIndexChange(2)}>Above 1kg</span>
                  </div>
                </div>
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
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="form-mobile" className="text-[10.5px] font-bold uppercase tracking-wider text-slate-700">
                    {HERO.form.mobileLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className={`flex h-11 relative shadow-sm rounded-xl border ${errors.mobile ? "border-red-400 focus-within:ring-2 focus-within:ring-red-200 focus-within:border-red-500 bg-red-50/50" : "border-slate-200 focus-within:ring-2 focus-within:ring-secondary/20 focus-within:border-secondary bg-white"} transition-all overflow-hidden`}>
                    <select 
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-[62px] shrink-0 px-1 bg-slate-100/50 text-[11px] font-bold text-slate-800 focus:outline-none border-r border-slate-200 cursor-pointer"
                    >
                      {COUNTRY_CALLING_CODES.map(c => (
                        <option key={c.iso} value={c.code}>{c.iso} {c.code}</option>
                      ))}
                    </select>
                    <input
                      id="form-mobile"
                      type="tel"
                      placeholder={HERO.form.mobilePlaceholder}
                      {...register("mobile", { 
                        required: "Mobile phone is required",
                        pattern: {
                          value: /^\+?[0-9]{8,15}$/,
                          message: "Invalid mobile phone format"
                        }
                      })}
                      className="w-full px-2 bg-transparent text-[10px] sm:text-[11px] md:text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none tracking-tight"
                    />
                  </div>
                  {errors.mobile && <span className="text-[10px] text-red-500 font-bold ml-1">{errors.mobile.message}</span>}
                </div>
              </div>

              {/* Yes or No Prescription Radios */}
              <div id="prescription-option-container" className="pt-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-2">
                  {HERO.form.prescriptionQuestion}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="presc-yes-btn"
                    type="button"
                    onClick={() => setPrescriptionValue("YES")}
                    className={`py-1.5 px-3 rounded-lg font-bold text-[11px] border text-center transition-all ${
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
                    className={`py-1.5 px-3 rounded-lg font-bold text-[11px] border text-center transition-all ${
                      prescriptionValue === "NO"
                        ? "bg-secondary/10 border-secondary text-secondary shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {HERO.form.prescriptionNo}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-calculator-btn"
                  className="w-full py-3.5 px-4 bg-primary hover:bg-[#0047B3] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all scale-[1.01] hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
                >
                  Check Courier Charges
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
