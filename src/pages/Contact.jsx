import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { CONTACT_PAGE, TOP_BAR, FOOTER } from "../constants";
import { MapPin, Mail, Phone, Send, ThumbsUp, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated loading trigger
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmitContact = (data) => {
    setSubmissionData(data);
    setIsSubmitted(true);
    reset(); // reset form fields
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
          <div 
            id="contact-banner"
            className="relative h-[220px] md:h-[280px] flex items-center overflow-hidden bg-slate-950"
          >
            <motion.div 
              initial={{ scale: 1.12, opacity: 0 }}
              animate={{ scale: 1.0, opacity: 1.0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=1600&q=80')` 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-1"
              >
                <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-white transition-colors mb-2">
                  <ArrowLeft size={14} /> Back to Home
                </Link>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 font-display uppercase drop-shadow-xs">
                  {CONTACT_PAGE.title}
                </h1>
                <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center gap-2 text-white/80">
                  <Link to="/" className="hover:text-primary transition-colors text-white/95">Home</Link>
                  <span className="text-white/40">»</span>
                  <span className="text-primary font-bold">Contact</span>
                </nav>
              </motion.div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            
            {/* Title block */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
                Get in Touch With Us
              </h2>
              <p className="max-w-xl mx-auto text-sm text-slate-500 font-sans leading-relaxed font-medium">
                {CONTACT_PAGE.subtitle}
              </p>
            </motion.div>

            {/* Form and Info Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto mb-16 mt-20 md:mt-28"
            >
              
              {/* Left Panel: Info Cards */}
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
                    {CONTACT_PAGE.officeTitle}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {FOOTER.locateUs.address}
                  </p>
                </motion.div>

                {/* Email Contact */}
                <motion.div variants={leftCardVariants} whileHover={{ y: -7, transition: { type: "spring", stiffness: 200, damping: 18 } }} className="bg-white border border-slate-200/60 p-5 rounded-3xl space-y-2 shadow-sm hover:shadow-lg hover:border-slate-300 transition-shadow">
                  <span className="inline-flex p-2.5 bg-primary/10 text-primary rounded-xl">
                    <Mail size={20} />
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                    Direct Email Inquiry
                  </h4>
                  <a
                    href={`mailto:${TOP_BAR.email.address}`}
                    className="text-sm font-bold text-slate-600 hover:text-primary block transition-colors mt-1"
                  >
                    {TOP_BAR.email.address}
                  </a>
                </motion.div>

                {/* Support Call */}
                <motion.div variants={leftCardVariants} whileHover={{ y: -7, transition: { type: "spring", stiffness: 200, damping: 18 } }} className="bg-white border border-slate-200/60 p-5 rounded-3xl space-y-2 shadow-sm hover:shadow-lg hover:border-slate-300 transition-shadow">
                  <span className="inline-flex p-2.5 bg-purple-100 text-purple-600 rounded-xl">
                    <Phone size={20} />
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                    {CONTACT_PAGE.hoursTitle}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {TOP_BAR.workingHours.hours}
                  </p>
                  <span className="text-sm font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg inline-block">
                    Call: {TOP_BAR.phone.number}
                  </span>
                </motion.div>
              </div>

              {/* Right Panel: Interactive Contact Form with Success trigger */}
              <motion.div variants={rightFormVariants} className="lg:col-span-8">
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

                      <Input
                        id="contact-phone"
                        label="Contact Mobile No."
                        placeholder="e.g. +91 9999999999"
                        required
                        error={errors.phone?.message}
                        {...register("phone", { 
                          required: "Mobile digits are required",
                          pattern: {
                            value: /^\+?[0-9]{8,15}$/,
                            message: "Invalid numbers format"
                          }
                        })}
                      />

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
                  Visit Our Central Logistics Hub
                </h3>
                <p className="text-sm text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                  Conveniently located in the heart of New Delhi. Drop by for in-person support, custom clearances, and international cargo drop-offs.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.3440514113277!2d77.2427166743274!3d28.58945367568826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce363f1a38537%3A0x1323196e318840f6!2sCourier%20Medicines%20International%20Services!5e0!3m2!1sen!2sin!4v1781698839861!5m2!1sen!2sin"
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

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
