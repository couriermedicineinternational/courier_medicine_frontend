import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import { COUNTRY_CALLING_CODES } from "../constants/countryCodes";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve calculated quote and selected provider details from routing state
  const calculatedQuote = location.state?.calculatedQuote || {
    country: "Australia",
    countryCode: "AU",
    location: "Delhi",
    medicineType: "Homeopathic Medicines",
    mobile: "8882691919",
    prescription: "YES",
    weight: 0.5,
    provider: "DHL",
    price: 3729,
    timeline: "6-7 Days",
    bookingRef: "CM-631479",
    serviceType: "I WANT PICK UP"
  };

  const selectedProvider = location.state?.selectedProvider || {
    name: "DHL",
    keyName: "DHL",
    price: 3729,
    timeline: "6-7 Days"
  };

  // Form handling
  const { register, handleSubmit, formState: { errors } } = useForm();
  const isPickup = calculatedQuote.serviceType === "I WANT PICK UP";
  
  // States for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [senderCountryCode, setSenderCountryCode] = useState("+91");
  const [receiverCountryCode, setReceiverCountryCode] = useState("+91");

  // Calculate pricing breakdown
  const baseCharges = selectedProvider.price;
  const gstAmount = parseFloat((baseCharges * 0.18).toFixed(2));
  const totalAmount = Math.round(baseCharges + gstAmount);

  // Submit Handler
  const onSubmitBooking = async (data) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        customerName: isPickup ? data.senderName : data.receiverName,
        customerEmail: isPickup ? (data.senderEmail || "") : (data.receiverEmail || ""),
        customerPhone: isPickup ? `${senderCountryCode} ${data.senderPhone}` : `${receiverCountryCode} ${data.receiverPhone}`,
        originAddress: isPickup ? data.pickupAddress : "N/A (Buy Medicines Service)",
        originCity: calculatedQuote.location || "Delhi",
        destinationCountry: calculatedQuote.country,
        destinationAddress: `Name: ${data.receiverName}\nPhone: ${receiverCountryCode} ${data.receiverPhone}\nEmail: ${data.receiverEmail || "N/A"}\nAddress: ${data.deliveryAddress}`,
        medicineType: (calculatedQuote.medicineType || "allopathic").toLowerCase().includes("homeo") 
          ? "homeopathic" 
          : (calculatedQuote.medicineType || "allopathic").toLowerCase().includes("ayur") 
            ? "ayurvedic" 
            : (calculatedQuote.medicineType || "allopathic").toLowerCase().includes("critical") 
              ? "critical" 
              : "allopathic",
        hasPrescription: calculatedQuote.prescription === "YES",
        weight: calculatedQuote.weight,
        basePrice: baseCharges,
        finalPrice: totalAmount,
        courierPartner: selectedProvider.name || "",
        estimatedDeliveryTime: selectedProvider.timeline || "",
        notes: isPickup 
          ? `Medicine used for: ${data.medicineUsedFor}\nPickup Date: ${data.pickupDate}\nCarrier: ${selectedProvider.name}\nService Mode: ${calculatedQuote.serviceType}`
          : `Medicine used for: ${data.medicineUsedFor}\nCarrier: ${selectedProvider.name}\nService Mode: ${calculatedQuote.serviceType}`
      };

      const response = await api.post("/orders/public", payload);
      
      if (response.data && response.data.success) {
        navigate("/thanks.php", {
          state: {
            successData: response.data.data,
            selectedProvider,
            totalAmount
          }
        });
      } else {
        setErrorMsg("Failed to book order. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMsg("An error occurred during booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to render provider logo
  const renderProviderLogo = (keyName) => {
    switch (keyName.toUpperCase()) {
      case "UPS":
        return (
          <svg className="h-14 w-auto" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2 C28 2, 38 4, 38 16 C38 28, 28 38, 20 44 C12 38, 2 28, 2 16 C2 4, 12 2, 20 2 Z" fill="#351C15" stroke="#FFC72C" strokeWidth="2.5" />
            <path d="M4 14C10 11 30 11 36 14" stroke="#FFC72C" strokeWidth="2" />
            <text x="20" y="32" fill="#FFC72C" fontWeight="bold" fontSize="15" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-0.5">ups</text>
          </svg>
        );
      case "FEDEX":
        return (
          <div className="flex flex-col items-center">
            <span className="text-3.5xl font-black tracking-tighter leading-none">
              <span className="text-[#4D148C]">Fed</span><span className="text-[#FF6600]">Ex</span>
            </span>
            <span className="text-[9px] font-bold text-[#4D148C] tracking-widest uppercase mt-0.5">Express</span>
          </div>
        );
      case "DHL":
        return (
          <div className="h-10 w-28 flex items-center justify-center bg-[#FFCC00] rounded-sm px-3 select-none">
            <svg className="h-5 w-auto" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="skewX(-15)">
                <text x="50" y="18" fill="#D40511" fontWeight="900" fontSize="18" fontFamily="Impact, Arial Black, sans-serif" letterSpacing="0.5" textAnchor="middle">DHL</text>
              </g>
            </svg>
          </div>
        );
      case "ECONOMY POST":
      default:
        return (
          <div className="h-14 w-28 flex flex-col items-center justify-center bg-[#0052CC]/90 text-white rounded-lg px-2 text-center select-none shadow-xs">
            <span className="text-[10px] font-black tracking-widest uppercase leading-none">Economy</span>
            <span className="text-[14px] font-black tracking-wider uppercase mt-1 leading-none">Post</span>
          </div>
        );
    }
  };

  return (
    <div id="booking-checkout-page" className="pb-20 bg-slate-50/50 font-sans text-slate-700">
      
      {/* Dynamic Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1 uppercase font-display">
          Complete Shipment Booking
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Booking Details Form */}
          <form 
            onSubmit={handleSubmit(onSubmitBooking)} 
            className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 space-y-8 shadow-xs"
          >
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-semibold border border-red-100 animate-pulse">
                {errorMsg}
              </div>
            )}

            {/* A. Sender Details Section */}
            {isPickup && (
              <div className="space-y-4">
                <h2 className="text-base font-black text-slate-900 uppercase tracking-tight font-display border-b border-slate-100 pb-2">
                  Sender Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">Name *</label>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      {...register("senderName", { required: "Name is required" })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                    />
                    {errors.senderName && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.senderName.message}</span>}
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">Contact number *</label>
                    <div className="flex rounded-xl border border-slate-200 bg-slate-50/50 focus-within:ring-2 focus-within:ring-secondary/20 focus-within:border-secondary transition-all overflow-hidden">
                      <select 
                        value={senderCountryCode}
                        onChange={(e) => setSenderCountryCode(e.target.value)}
                        className="w-[85px] px-2 py-2.5 bg-slate-100/50 border-r border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                      >
                        {COUNTRY_CALLING_CODES.map(c => (
                          <option key={c.iso} value={c.code}>{c.iso} {c.code}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Mobile No"
                        {...register("senderPhone", { 
                          required: "Contact number is required",
                          pattern: { value: /^[0-9]{8,15}$/, message: "Please enter a valid mobile number" }
                        })}
                        className="w-full px-3.5 py-2.5 bg-transparent text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                      />
                    </div>
                    {errors.senderPhone && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.senderPhone.message}</span>}
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">Email address</label>
                    <input
                      type="email"
                      placeholder="Email address"
                      {...register("senderEmail")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">Pick up date *</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      {...register("pickupDate", { required: "Pickup date is required" })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                    />
                    {errors.pickupDate && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.pickupDate.message}</span>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">Pick Up Address With Pin Code *</label>
                    <textarea
                      rows={2}
                      placeholder="Enter complete pickup street details and pin code"
                      {...register("pickupAddress", { required: "Pickup address is required" })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-none"
                    />
                    {errors.pickupAddress && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.pickupAddress.message}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* B. Receiver Details Section */}
            <div className={`space-y-4 ${isPickup ? "pt-4" : ""}`}>
              <h2 className="text-base font-black text-slate-900 uppercase tracking-tight font-display border-b border-slate-100 pb-2">
                Receiver Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">Name *</label>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    {...register("receiverName", { required: "Name is required" })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  />
                  {errors.receiverName && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.receiverName.message}</span>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">Contact number *</label>
                  <div className="flex rounded-xl border border-slate-200 bg-slate-50/50 focus-within:ring-2 focus-within:ring-secondary/20 focus-within:border-secondary transition-all overflow-hidden">
                    <select 
                      value={receiverCountryCode}
                      onChange={(e) => setReceiverCountryCode(e.target.value)}
                      className="w-[85px] px-2 py-2.5 bg-slate-100/50 border-r border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                    >
                      {COUNTRY_CALLING_CODES.map(c => (
                        <option key={c.iso} value={c.code}>{c.iso} {c.code}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Mobile No"
                      {...register("receiverPhone", { 
                        required: "Contact number is required",
                        pattern: { value: /^[0-9]{8,15}$/, message: "Please enter a valid mobile number" }
                      })}
                      className="w-full px-3.5 py-2.5 bg-transparent text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                  {errors.receiverPhone && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.receiverPhone.message}</span>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">Email address</label>
                  <input
                    type="email"
                    placeholder="Email address"
                    {...register("receiverEmail")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">Medicine used For *</label>
                  <select
                    defaultValue="Diabetes"
                    {...register("medicineUsedFor")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  >
                    <option value="Diabetes">Diabetes</option>
                    <option value="Blood pressure">Blood pressure</option>
                    <option value="Cold cough">Cold cough</option>
                    <option value="Fever">Fever</option>
                    <option value="Sinusitis">Sinusitis</option>
                    <option value="Allergies">Allergies</option>
                    <option value="Heart related issues">Heart related issues</option>
                    <option value="Cancer">Cancer</option>
                    <option value="Thyroid">Thyroid</option>
                    <option value="Other issues.">Other issues.</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">Delivery address with zip code *</label>
                  <textarea
                    rows={2}
                    placeholder="Enter complete international destination street details and ZIP code"
                    {...register("deliveryAddress", { required: "Delivery address is required" })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-none"
                  />
                  {errors.deliveryAddress && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.deliveryAddress.message}</span>}
                </div>
              </div>
            </div>

            {/* Form Footer Action */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FFCC00] text-slate-800 hover:bg-[#E6B800] font-black uppercase text-xs tracking-wider py-3.5 px-8 rounded-xl shadow-xs transition-all disabled:opacity-50 select-none cursor-pointer"
              >
                {isSubmitting ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>

          {/* Right Column: Checkout Pricing Summary Card */}
          <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col items-center">
            
            {/* selected provider logo */}
            <div className="h-20 flex items-center justify-center mb-4">
              {renderProviderLogo(selectedProvider.keyName)}
            </div>

            <div className="w-full border-t border-slate-100 my-2" />

            {/* Pricing Summary List */}
            <div className="w-full divide-y divide-slate-100 text-xs font-semibold font-sans mt-2">
              <div className="flex justify-between py-2.5">
                <span className="text-slate-400 uppercase tracking-wide text-[10px]">Service Type</span>
                <span className="text-slate-800 font-extrabold">{selectedProvider.name}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-400 uppercase tracking-wide text-[10px]">Sending to</span>
                <span className="text-slate-800 font-extrabold">{calculatedQuote.country}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-400 uppercase tracking-wide text-[10px]">Weight</span>
                <span className="text-slate-800 font-extrabold">
                  {calculatedQuote.weight} KG ({calculatedQuote.medicineType})
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-400 uppercase tracking-wide text-[10px]">Approx Delivery Time</span>
                <span className="text-slate-800 font-extrabold">{selectedProvider.timeline}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-400 uppercase tracking-wide text-[10px]">Charges</span>
                <span className="text-slate-800 font-extrabold">Rs. {baseCharges}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-400 uppercase tracking-wide text-[10px]">GST 18%</span>
                <span className="text-slate-800 font-extrabold">Rs. {gstAmount}</span>
              </div>
              <div className="flex justify-between py-3 pt-4 border-t border-slate-200">
                <span className="text-slate-900 font-black uppercase tracking-wide text-xs">Total</span>
                <span className="text-base font-black text-[#0052CC]">Rs. {totalAmount}</span>
              </div>
            </div>
          </div>

        </div>
      </div>


    </div>
  );
}
