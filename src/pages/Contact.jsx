import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { CONTACT_PAGE, TOP_BAR, FOOTER } from "../constants";
import { MapPin, Mail, Phone, Send, ThumbsUp, ArrowLeft } from "lucide-react";
import DOMPurify from "dompurify";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { COUNTRY_CALLING_CODES } from "../constants/countryCodes";
import api from "../utils/api";

const DEFAULT_SECTIONS = [
  {
    key: "contact-hero",
    title: "Contact Us",
    subtitle: "Home » Contact",
    isActive: true,
    content: {
      bgImage: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=1600&q=80"
    }
  },
  {
    key: "contact-intro",
    title: "Get in Touch With Us",
    subtitle: "Have questions about shipping prescription drugs internationally? Get in touch with our team.",
    isActive: true,
    content: {
      officeTitle: "Delhi Office Headquarter",
      address: "Shop No. 7, 1st Floor, Nizamuddin West Market, Block C, New Delhi, Delhi-110013",
      emailTitle: "Direct Email Inquiry",
      email: "couriermedicines@gmail.com",
      hoursTitle: "Office Timing Hours",
      hours: "Mon - Sat 09:00 AM - 07:00 PM",
      phone: "+91-8882691919"
    }
  },
  {
    key: "contact-map",
    title: "Visit Our Central Logistics Hub",
    subtitle: "Conveniently located in the heart of New Delhi. Drop by for in-person support, custom clearances, and international cargo drop-offs.",
    isActive: true,
    content: {
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.3440514113277!2d77.2427166743274!3d28.58945367568826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce363f1a38537%3A0x1323196e318840f6!2sCourier%20Medicines%20International%20Services!5e0!3m2!1sen!2sin!4v1781698839861!5m2!1sen!2sin"
    }
  }
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sections, setSections] = useState([]);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get('/contacts/sections')
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          setSections(res.data.data);
          setApiLoaded(true);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching contact sections:', err);
        setApiLoaded(false);
        setIsLoading(false);
      });
  }, []);

  const getSection = (key) => {
    const sec = sections.find(s => s.key === key);
    return sec || { isActive: false };
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmitContact = async (data) => {
    try {
      const response = await api.post('/contacts', {
        fullName: data.name,
        email: data.email,
        phone: `${countryCode} ${data.phone}`,
        subject: "Support Request from Website",
        message: data.message
      });

      if (response.data && response.data.success) {
        setSubmissionData(data);
        setIsSubmitted(true);
        reset(); // reset form fields
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      // Fallback local UI success if API fails so user doesn't get blocked
      setSubmissionData(data);
      setIsSubmitted(true);
      reset();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const leftCardVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  const rightFormVariants = {
    hidden: { opacity: 0, x: 30 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="shimmer-contact"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="pb-20 bg-white font-sans text-slate-700"
        >
          {/* Hero Banner Shimmer */}
          <div className="h-[220px] md:h-[280px] bg-slate-900/10 flex items-center relative overflow-hidden">
            <div className="shimmer-bg absolute inset-0" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-4">
              <div className="shimmer-bg h-4 w-24 rounded-md" />
              <div className="shimmer-bg h-10 w-2/3 rounded-lg" />
              <div className="shimmer-bg h-4 w-1/3 rounded-md" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-6">
                <div className="shimmer-bg h-4 w-1/2 rounded-md mb-4" />
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3">
                    <div className="shimmer-bg h-8 w-8 rounded-lg" />
                    <div className="shimmer-bg h-4 w-3/4 rounded-md" />
                    <div className="shimmer-bg h-3.5 w-full rounded-md" />
                  </div>
                ))}
              </div>
              <div className="lg:col-span-8">
                <div className="bg-white border border-slate-150 rounded-3xl p-6 md:p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="shimmer-bg h-12 w-full rounded-xl" />
                    <div className="shimmer-bg h-12 w-full rounded-xl" />
                  </div>
                  <div className="shimmer-bg h-12 w-full rounded-xl" />
                  <div className="shimmer-bg h-28 w-full rounded-xl" />
                  <div className="shimmer-bg h-12 w-full rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          key="content-contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          id="contact-page" 
          className="bg-[#FAFDFD] font-sans text-slate-700"
        >
          {/* 1. Page Header Banner */}
          {getSection("contact-hero")?.isActive && (
            <div 
              id="contact-banner"
              className="relative h-[250px] md:h-[320px] overflow-hidden flex items-end pb-8 md:pb-12 bg-slate-950"
            >
              <motion.div 
                initial={{ scale: 1.12, opacity: 0 }}
                animate={{ scale: 1.0, opacity: 1.0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url('${getSection("contact-hero")?.content?.bgImage}')` 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white relative z-20">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="space-y-2"
                >
                  <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-white transition-colors mb-2">
                    <ArrowLeft size={14} /> Back to Home
                  </Link>
                  <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 font-display uppercase drop-shadow-xs">
                    {getSection("contact-hero")?.title}
                  </h1>
                  <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center gap-2 text-white/80">
                    <Link to="/" className="hover:text-primary transition-colors text-white/95">Home</Link>
                    <span className="text-white/40">»</span>
                    <span className="text-primary font-bold">Contact</span>
                  </nav>
                </motion.div>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            
            {/* Title block */}
            {getSection("contact-intro")?.isActive && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
                  {getSection("contact-intro")?.title}
                </h2>
                <div 
                  className="max-w-xl mx-auto text-sm text-slate-500 font-sans leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getSection("contact-intro")?.subtitle) }}
                />
              </motion.div>
            )}

            {/* Form and Info Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto mb-16 mt-20 md:mt-28"
            >
              
              {/* Left Panel: Info Cards */}
              {getSection("contact-intro")?.isActive && (
                <div className="lg:col-span-4 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">
                    Branch & Contact Details
                  </h3>

                  {/* Address */}
                  <motion.div variants={leftCardVariants} whileHover={{ y: -7, transition: { type: "spring", stiffness: 200, damping: 18 } }} className="bg-white border border-slate-200/60 p-5 rounded-3xl space-y-2 shadow-sm hover:shadow-lg hover:border-slate-300 transition-shadow">
                    <span className="inline-flex p-2.5 bg-secondary/10 text-secondary rounded-xl">
                      <MapPin size={20} />
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                      {getSection("contact-intro")?.content?.officeTitle || "Delhi Office Headquarter"}
                    </h4>
                    <div 
                      className="text-sm text-slate-500 leading-relaxed font-medium"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getSection("contact-intro")?.content?.address) }}
                    />
                  </motion.div>

                  {/* Email Contact */}
                  <motion.div variants={leftCardVariants} whileHover={{ y: -7, transition: { type: "spring", stiffness: 200, damping: 18 } }} className="bg-white border border-slate-200/60 p-5 rounded-3xl space-y-2 shadow-sm hover:shadow-lg hover:border-slate-300 transition-shadow">
                    <span className="inline-flex p-2.5 bg-primary/10 text-primary rounded-xl">
                      <Mail size={20} />
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                      {getSection("contact-intro")?.content?.emailTitle || "Direct Email Inquiry"}
                    </h4>
                    <a
                      href={`mailto:${getSection("contact-intro")?.content?.email}`}
                      className="text-sm font-bold text-slate-600 hover:text-primary block transition-colors mt-1"
                    >
                      {getSection("contact-intro")?.content?.email}
                    </a>
                  </motion.div>

                  {/* Support Call */}
                  <motion.div variants={leftCardVariants} whileHover={{ y: -7, transition: { type: "spring", stiffness: 200, damping: 18 } }} className="bg-white border border-slate-200/60 p-5 rounded-3xl space-y-2 shadow-sm hover:shadow-lg hover:border-slate-300 transition-shadow">
                    <span className="inline-flex p-2.5 bg-purple-100 text-purple-600 rounded-xl">
                      <Phone size={20} />
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                      {getSection("contact-intro")?.content?.hoursTitle || "Office Timing Hours"}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      {getSection("contact-intro")?.content?.hours}
                    </p>
                    <span className="text-sm font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg inline-block">
                      Call: {getSection("contact-intro")?.content?.phone}
                    </span>
                  </motion.div>
                </div>
              )}

              {/* Right Panel: Interactive Contact Form with Success trigger */}
              <motion.div variants={rightFormVariants} className={getSection("contact-intro")?.isActive ? "lg:col-span-8" : "lg:col-span-12 max-w-4xl mx-auto w-full"}>
                <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-10 shadow-lg shadow-slate-200/40">
                  {isSubmitted ? (
                    /* Success banner on submittal */
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      id="contact-success-banner" 
                      className="text-center py-10 space-y-5"
                    >
                      <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <ThumbsUp size={36} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none">
                        Inquiry Received Successfully!
                      </h3>
                      <p className="max-w-md mx-auto text-sm text-slate-500 font-sans leading-relaxed font-medium">
                        Thank you, <span className="font-extrabold text-slate-800">{submissionData?.name}</span>. Our international logistics clearance experts have registered your interest successfully with email ID <span className="font-extrabold text-slate-800">{submissionData?.email}</span>. We will follow up inside 2 hours flat.
                      </p>
                      
                      <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                          href="https://wa.me/918882691919"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold text-center block w-full sm:w-auto hover:bg-[#003d99] transition-colors"
                        >
                          💬 Discuss on WhatsApp
                        </a>
                        <button
                          id="reset-contact-btn"
                          type="button"
                          onClick={() => setIsSubmitted(false)}
                          className="px-6 py-3 rounded-xl border border-slate-200 text-sm font-bold w-full sm:w-auto hover:bg-slate-50 transition-colors"
                        >
                          Submit Another Query
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* Simple raw form with fields details */
                    <form id="contact-form" onSubmit={handleSubmit(onSubmitContact)} className="space-y-6">
                      <div className="border-b border-slate-100 pb-4">
                        <h3 className="text-sm font-black text-slate-900 tracking-wider uppercase font-display">
                          HAVE ANY QUESTIONS
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold mt-1">
                          Write your query team will contact immediately
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                          id="contact-name"
                          label="Your Complete Name"
                          placeholder="e.g. Rahul Sharma"
                          required
                          error={errors.name?.message}
                          {...register("name", { required: "Name is required" })}
                        />
                        <Input
                          id="contact-email"
                          label="Your Email ID"
                          placeholder="e.g. rahul@gmail.com"
                          type="email"
                          required
                          error={errors.email?.message}
                          {...register("email", { 
                            required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email format"
                            }
                          })}
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="contact-phone" className="text-[10.5px] font-bold uppercase tracking-wider text-slate-700">
                          Contact Mobile No. <span className="text-red-500">*</span>
                        </label>
                        <div className={`flex h-11 relative shadow-sm rounded-xl border ${errors.phone ? "border-red-400 focus-within:ring-2 focus-within:ring-red-200 focus-within:border-red-500 bg-red-50/50" : "border-slate-200 focus-within:ring-2 focus-within:ring-secondary/20 focus-within:border-secondary bg-white"} transition-all overflow-hidden`}>
                          <select 
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-[85px] px-2 bg-slate-100/50 text-xs font-semibold text-slate-800 focus:outline-none border-r border-slate-200 cursor-pointer"
                          >
                            {COUNTRY_CALLING_CODES.map(c => (
                              <option key={c.iso} value={c.code}>{c.iso} {c.code}</option>
                            ))}
                          </select>
                          <input
                            id="contact-phone"
                            type="tel"
                            placeholder="e.g. 9999999999"
                            {...register("phone", { 
                              required: "Mobile digits are required",
                              pattern: {
                                value: /^\+?[0-9]{8,15}$/,
                                message: "Invalid numbers format"
                              }
                            })}
                            className="w-full px-4 bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                          />
                        </div>
                        {errors.phone && <span className="text-[10px] text-red-500 font-bold ml-1">{errors.phone.message}</span>}
                      </div>

                      <Input
                        id="contact-message"
                        label="Inquiry / Message details"
                        placeholder="Provide details about the medicines, volume, and any custom clearances help you need..."
                        componentType="textarea"
                        required
                        error={errors.message?.message}
                        {...register("message", { required: "Message details is required" })}
                      />

                      <Button
                        id="send-contact-btn"
                        type="submit"
                        variant="primary"
                        className="w-full mt-2 py-4 text-sm font-black tracking-wide"
                      >
                        Submit Support Request
                      </Button>
                    </form>
                  )}
                </div>
              </motion.div>

            </motion.div>

            {/* Real Google Maps Interface */}
            {getSection("contact-map")?.isActive && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", stiffness: 60, damping: 20 }}
                id="office-map-container" 
                className="bg-white border border-slate-200/60 rounded-3xl p-4 md:p-8 relative overflow-hidden max-w-6xl mx-auto shadow-sm mb-16"
              >
                <div className="text-center mb-8 mt-2 space-y-2">
                  <span className="inline-flex items-center justify-center p-3.5 bg-secondary/10 text-secondary rounded-2xl mb-2 shadow-sm">
                    <MapPin size={26} />
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    {getSection("contact-map")?.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                    {getSection("contact-map")?.subtitle}
                  </p>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                  <iframe
                    src={getSection("contact-map")?.content?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.3440514113277!2d77.2427166743274!3d28.58945367568826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce363f1a38537%3A0x1323196e318840f6!2sCourier%20Medicines%20International%20Services!5e0!3m2!1sen!2sin!4v1781698839861!5m2!1sen!2sin"}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Courier Medicines Location Map"
                  ></iframe>
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
