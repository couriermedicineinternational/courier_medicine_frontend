import { useState, useEffect } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "motion/react";

import { 

  Globe, ShieldCheck, Phone, Scale, 

  ArrowLeft, CheckCircle, MessageSquare, AlertCircle 

} from "lucide-react";

import { ALL_COUNTRIES } from "../constants";

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

  const [packageWeightIndex, setPackageWeightIndex] = useState(0);

  const packageWeight = packageWeightIndex === 0 ? 0.5 : packageWeightIndex === 1 ? 1.0 : 2.0;

  const [activeFaq, setActiveFaq] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [country, setCountry] = useState(null);
  const [settings, setSettings] = useState(null);



// Fetch country data from route params
  useEffect(() => {
    if (country) {
      const title = country.metaViewTitle || `Medicine Courier from India to ${country.name} | Best Rates`;
      document.title = title;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = country.metaDescription || `Send medicines from India to ${country.name} safely. We offer 100% custom clearance and doorstep pickup.`;

      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = country.metaKeywords || `medicine courier India, send medicine to ${country.name}`;
    }
  }, [country]);

  // Fetch country data from route params

  useEffect(() => {

    import('../utils/pricing').then(m => m.loadPricingData());

    window.scrollTo(0, 0);

    setIsLoading(true);



    
    api.get("/settings").then(res => {
      if (res.data && res.data.success) setSettings(res.data.data);
    });

    api.get(`/countries/${slug}`)

      .then(res => {

        if (res.data && res.data.success) {

          setCountry(res.data.data);

        } else {

          const localCountry = ALL_COUNTRIES.find(c => c.slug === slug);

          setCountry(localCountry || null);

        }

      })
      .catch(err => {
        console.error('Error fetching country detail from API:', err);
        const localCountry = ALL_COUNTRIES.find(c => c.slug === slug);
        setCountry(localCountry || null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  if (!isLoading && !country) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle size={48} className="text-red-500 mb-3" />
        <h2 className="text-xl font-black text-slate-800">Destination Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">The selected shipping destination is not registered in our system.</p>
        <Link to="/countries.php" className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow">
          Back to Countries List
        </Link>
      </div>
    );
  }

  const countryName = country ? country.name : "";

  const providersList = getProvidersForCountry(countryName);
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

  const parsedFaqs = (() => {
    if (!country?.faq) return null;
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(country.faq, "text/html");
      const listItems = doc.querySelectorAll('li');
      if (listItems.length > 0) {
        return Array.from(listItems).map(li => {
          const q = li.querySelector('strong')?.textContent || '';
          let a = li.innerHTML.replace(/<strong[^>]*>.*?<\/strong>/gi, '').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim();
          return { q, a };
        });
      }
    } catch (e) {
      console.error("FAQ parsing error", e);
    }
    return null;
  })();

  const defaultFaqs = [
    {
      q: `What are the medicine courier charges from India to ${countryName}?`,
      a: `Medicine courier charges from India to ${countryName} start at ₹${(country?.basePrice || 3500).toLocaleString("en-IN")} for the first 0.5 Kg. Incremental charges are added per 0.5 Kg. You can check rates directly using the interactive weight slider table above.`
    },
    {
      q: `What documents are required to courier medicines to ${countryName}?`,
      a: "To ship medicines, you require: (1) A valid prescription issued by a registered medical practitioner, (2) Retail purchase bill from a licensed pharmacy store, and (3) Receiver ID identity proof to clear customs on arrival."
    },
    {
      q: `How much time does it take to courier medicines to ${countryName}?`,
      a: `Typically, standard express air courier shipments are delivered to ${countryName} within ${getTimelineString(country?.code)} (working days), backed by priority air routes.`
    },
    {
      q: "Is there any hidden customs fee or duty?",
      a: "Our estimate includes documentation support, packaging, and custom invoice preparations. If any local import customs duty or tariff is levied by the destination custom department, the receiver is responsible to clear it."
    },
    {
      q: "Can you courier liquid medicines?",
      a: "Yes, we courier all types of medicines including liquid formulations, tablets, ayurvedic oils, homeopathic dilutions, and herbal care formulations with structured packaging."
    },
    {
      q: `How can I track my medicine parcel to ${countryName}?`,
      a: `Once your package is dispatched, we provide a unique tracking AWB number. You can use this number on our website or the respective carrier's portal to track your medicine shipment live until it reaches ${countryName}.`
    },
    {
      q: "Do you provide temperature-controlled packaging?",
      a: `Yes, for medicines requiring cold chain maintenance (like insulin or specific drops), we use specialized temperature-controlled packaging with dry ice or gel packs to ensure their efficacy during transit to ${countryName}.`
    },
    {
      q: "Is doorstep pickup available across India?",
      a: "Absolutely! We offer free doorstep pickup services from major cities and towns across India. Our executive will safely collect the medicines along with the necessary documentation directly from your home."
    },
    {
      q: "Can I send homeopathic or ayurvedic medicines?",
      a: "Yes, you can courier Allopathic, Homeopathic, Ayurvedic, and Unani medicines. Just ensure you have a valid prescription and the original pharmacy purchase bill for smooth customs clearance."
    },
    {
      q: `What happens if my package is held at customs in ${countryName}?`,
      a: `Our logistics team ensures all paperwork is perfectly compliant before shipping. In the rare event of a customs hold, our clearance experts coordinate with the local authorities in ${countryName} to resolve queries and expedite release.`
    }
  ];

  const faqsToRender = (() => {
    if (parsedFaqs && parsedFaqs.length > 0) {
      const combined = [...parsedFaqs];
      let i = 0;
      while (combined.length < 10 && i < defaultFaqs.length) {
        combined.push(defaultFaqs[i]);
        i++;
      }
      return combined;
    }
    return country?.faq ? null : defaultFaqs;
  })();

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



            {/* {country?.serviceHeading || 'Service We Offer'} Shimmer */}

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

                backgroundImage: `url(${settings?.countryHeroImage || '/global_network_banner_v3.png'})` 

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



                

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 font-display uppercase drop-shadow-lg leading-tight">

                  {country?.heroTitle || `International Medicine Courier Service To ${countryName}`}

                </h1>

                

                <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center justify-center gap-2 text-white/80 mt-6">

                  <Link to="/" className="hover:text-secondary transition-colors text-white/95">Home</Link>

                  <span className="text-white/40">»</span>

                  <Link to="/countries.php" className="hover:text-secondary transition-colors text-white/95">Countries</Link>

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

                {country?.introHeading || `Send Medicines From India To ${countryName}`}

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

              {country?.medicineCourierServices ? (
                <div dangerouslySetInnerHTML={{ __html: country.medicineCourierServices }} className="prose max-w-none text-slate-600 text-[14px] [&>*:first-child]:text-xl md:[&>*:first-child]:text-2xl [&>*:first-child]:font-extrabold [&>*:first-child]:text-slate-800 [&>*:first-child]:leading-snug [&>*:first-child]:mb-4" />
              ) : (
                <>
                  <p className="font-extrabold text-slate-800 text-xl md:text-2xl leading-snug">
                Welcome to Courier Medicines - We offer the No.1 International Medicine Delivery from India to {countryName}.
              </p>

              <p>

                At Courier Medicines, we deliver your medicines anywhere in the world. Our team is highly experienced in international medicine delivery, so you can relax knowing your medications will arrive safely and quickly. We procure medicines on our customer's behalf from licensed chemist shops, verify batch numbers and expiry dates, and ship them using priority air routes.

              </p>

              <p>

                Courier medicine from India is legal and we make the process seamless for you by providing Express International medicine courier services from India to Abroad. We have expertise in couriering different types of medicines be it Liquid or Tablets - allopathic medicine, ayurvedic, homeopathy, herbal, or cold storage / temperature control Medicine.

              </p>
                </>
              )}

            </motion.div>



            {/* 4. {country?.serviceHeading || 'Service We Offer'} Section (Alternating Left-to-Right Grid) */}

            <div className="space-y-8">

              <div className="text-center">

                <h3 className="inline-block text-lg md:text-xl font-black text-slate-900 border-x-3 border-primary px-5 uppercase tracking-wider leading-none font-display">

                  {country?.serviceHeading || 'Service We Offer'}

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

                    {country?.service1Title || 'Pickup Service'}

                  </h4>

                  <p className="text-slate-500 leading-relaxed pl-10 font-medium text-xs md:text-[13.5px]">

                    {country?.service1Content ? <span dangerouslySetInnerHTML={{ __html: country.service1Content }} /> : `If you already have medicine with you, than We Offer a Free Pick-Up Service Across India, including Delhi, Noida, Faridabad, Gurgaon Hyderabad, Mumbai, Pune, Chennai, Coimbatore, Telangana Bangalore, for seamless Delivery to Any Place In ${countryName}.`}

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

                    {country?.service2Title || 'Medicine Purchase'}

                  </h4>

                  <p className="text-slate-500 leading-relaxed pl-10 font-medium text-xs md:text-[13.5px]">

                    {country?.service2Content ? (
                      <span dangerouslySetInnerHTML={{ __html: country.service2Content }} />
                    ) : (
                      <span className="space-y-3 block">
                        <span>Courier Medicines can purchase all type of medicine on your behalf, Including Allopathy, Homeopathy, Ayurvedic, and Patanjali products. As we have partnered with all the reputable pharmacies, you'll receive genuine with high-quality medications on Good Discounted Price.</span>
                        <span className="block mt-2">
                          Do you also Need a specific medicine? Whether You Have a Prescription or Don’t Have Prescription, we can help you purchase the necessary medicine on your behalf. T&C apply. Call / WhatsApp our medicine expert team at <a href="tel:+918882691919" className="font-bold text-primary hover:underline">+91-8882691919</a> or Query at – <a href="mailto:Couriermedicines@gmail.com" className="font-bold text-primary hover:underline">Couriermedicines@gmail.com</a>
                        </span>
                      </span>
                    )}

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

                    {country?.service3Title || 'Tracking Available'}

                  </h4>

                  <p className="text-slate-500 leading-relaxed pl-10 font-medium text-xs md:text-[13.5px]">

                    {country?.service3Content ? <span dangerouslySetInnerHTML={{ __html: country.service3Content }} /> : "We share live tracking for all shipments. Once your order is dispatched, you'll receive a tracking link to monitor your package in real-time, from pick-up to delivery. Stay informed every step of the way !"}

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

                    {country?.service4Title || 'Payment Options'}

                  </h4>

                  <p className="text-slate-500 leading-relaxed pl-10 font-medium text-xs md:text-[13.5px]">

                    {country?.service4Content ? <span dangerouslySetInnerHTML={{ __html: country.service4Content }} /> : "Paying for your international medicine courier services is hassle-free. You can pay from any part of world effortlessly by using various methods, Credit Cards Debit Cards UPI Instamojo PayPal Stripe Western Union."}

                  </p>

                </motion.div>



              </div>
            </div>



            {/* 5. Document Required Section (Split Slide In) */}

            <div className="space-y-8">

              <div className="text-center">

                <h3 className="inline-block text-lg md:text-xl font-black text-slate-900 border-x-3 border-secondary px-5 uppercase tracking-wider leading-none font-display">

                  {country?.docHeading || 'Document Required to Send Medicines'}

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

                  <div className="space-y-6">

                    <p className="text-slate-600 font-medium leading-relaxed">
                      <strong className="text-slate-900">1. Prescription Required:</strong> To courier medicines, an original or soft copy of the prescription is necessary. If you’re unable to provide the prescription, <strong className="text-slate-800">We Can Help You With This</strong>. Call / WhatsApp our medicine expert team.
                    </p>

                    <p className="text-slate-600 font-medium leading-relaxed">
                      <strong className="text-slate-900">2. Medicine Purchase Bill required:</strong> An original or soft copy of Medicine bill is required, with detailing about the medicines. If you don't have, <strong className="text-slate-800">We Can Help You With This</strong>. Call / WhatsApp our medicine Expert Team.
                    </p>

                    <p className="text-slate-600 font-medium leading-relaxed">
                      <strong className="text-slate-900">3. Receiver ID Required:</strong> We require a valid identification document for the Patient / Receiver as this is important for customs clearance in {countryName} and helps guarantee safe Delivery of your medication.
                    </p>

                    <p className="text-slate-600 font-medium leading-relaxed mt-2">
                      <strong className="text-slate-900">Note :</strong> <em className="italic">Your documents are subject to our privacy policy, which guarantees your information is secure. We do not keep any documents after processing your order to maintain your privacy, and you will need to share them again for future orders.</em>
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

                  <img src="/docs-image.png" alt="Documents Required for Courier" className="w-full max-w-[280px] h-auto object-contain drop-shadow-sm rounded-xl" />

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

                        <span className="text-xl font-black text-[#0052CC] font-mono">{["0.5 kg", "1.0 kg", "Above 1kg"][packageWeightIndex]}</span>

                      </div>

                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="1"
                        value={packageWeightIndex * 50}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          const currentVal = packageWeightIndex * 50;
                          if (val > currentVal) {
                            if (val > 75 && packageWeightIndex === 0) setPackageWeightIndex(2);
                            else setPackageWeightIndex(Math.min(2, packageWeightIndex + 1));
                          } else if (val < currentVal) {
                            if (val < 25 && packageWeightIndex === 2) setPackageWeightIndex(0);
                            else setPackageWeightIndex(Math.max(0, packageWeightIndex - 1));
                          }
                        }}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0052CC]"
                      />

                      <div className="flex justify-between text-[13px] text-slate-500 font-bold pt-1">
                        <span className="cursor-pointer hover:text-[#0052CC] transition-colors" onClick={() => setPackageWeightIndex(0)}>0.5 kg</span>
                        <span className="cursor-pointer hover:text-[#0052CC] transition-colors" onClick={() => setPackageWeightIndex(1)}>1.0 kg</span>
                        <span className="cursor-pointer hover:text-[#0052CC] transition-colors" onClick={() => setPackageWeightIndex(2)}>Above 1kg</span>
                      </div>

                    </div>

                  </div>



                  <div className="border-t border-slate-100 pt-4 text-[10px] text-slate-400 font-medium">

                    ℹ Pricing is estimated under personal medicine cargo import rules.

                  </div>

                </div>



                {/* Dynamic Provider Options */}

                <div className="lg:col-span-2 h-full">
                  {packageWeightIndex === 2 ? (
                    <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 rounded-[30px] p-6 sm:p-10 shadow-sm flex flex-col items-center justify-center text-center space-y-6 h-full min-h-[300px]">
                      <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-snug max-w-lg">
                        For Medicine Weight Above 1 KG, Please Contact Us For Special Rates
                      </h3>
                      
                      <div className="flex flex-col items-center w-full max-w-sm gap-4 mt-2">
                        <a 
                          href="tel:+918882691919"
                          className="w-full bg-[#0052CC] hover:bg-[#0047B3] text-white font-bold py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-sm md:text-base flex items-center justify-center"
                        >
                          Call +91-8882691919
                        </a>
                        
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">OR</span>
                        
                        <a 
                          href="https://wa.me/918882691919"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#00BFA5] hover:bg-[#00A891] text-white font-bold py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-sm md:text-base flex items-center justify-center"
                        >
                          Whatsapp
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 h-full">
                      {displayProviders.map((p) => {

                  const ui = getProviderUI(p.provider);

                  const providerPrice = getProviderPrice(countryName, p.provider, packageWeight) || 3500;

                  

                  return (

                    <div key={p.provider} className="bg-gradient-to-br from-white to-slate-50/20 border border-slate-200/80 rounded-2xl md:rounded-3xl p-3 xs:p-4 md:p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">

                      <div className={`absolute bottom-0 inset-x-0 h-1 ${ui.themeColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-350`} />

                      <div className="space-y-3 md:space-y-4">

                        <div className="flex justify-between items-start">

                          <div className="flex flex-col items-stretch gap-1.5 w-fit">

                            <span className="text-[10px] md:text-xs font-black text-slate-800 tracking-wide pt-1">{p.provider} Express</span>

                            {getProviderImage(p.provider) ? (

                              <div className="h-6 md:h-8 flex items-center select-none">

                                <img src={getProviderImage(p.provider)} alt={p.provider} className="h-6 md:h-8 w-auto object-contain drop-shadow-sm" />

                              </div>

                            ) : (

                              ui.logoNode

                            )}

                          </div>



                        </div>

                        <div className="space-y-1">

                          <span className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Estimated Cost</span>

                          <h4 className="text-lg md:text-2xl font-black text-slate-800 font-mono tracking-tight">₹{providerPrice.toLocaleString("en-IN")}</h4>

                        </div>

                        <div className="space-y-1 md:space-y-2 border-t border-slate-100 pt-3 text-[9px] md:text-xs font-medium text-slate-500">

                          <p className="truncate">⏱ Transit: {p.timeline}</p>

                          <p className="truncate">📦 Free collection</p>

                        </div>

                      </div>

                      

                      <button

                        onClick={(e) => {

                          e.preventDefault();

                          let baseQuote = {
                            country: countryName,
                            countryCode: country?.code || "",
                            weight: packageWeight,
                            provider: p.provider,
                            price: providerPrice,
                            timeline: p.timeline,
                            bookingRef: `CM-${Math.floor(100000 + Math.random() * 900000)}`
                          };



                          if (packageWeightIndex === 2) {

                            baseQuote.weight = "Above 1 KG";

                            navigate("/special-rates.php", { state: { calculatedQuote: baseQuote } });

                          } else {

                            navigate("/calculator.php", { 

                              state: { 

                                calculatedQuote: baseQuote, 

                                selectedProvider: {

                                  name: p.provider,

                                  keyName: p.provider,

                                  price: providerPrice,

                                  timeline: p.timeline

                                } 

                              } 

                            });

                          }

                        }}

                        className={`mt-4 md:mt-6 w-full text-center py-2 md:py-2.5 rounded-lg md:rounded-xl ${ui.themeColor} ${ui.hoverBg} text-white font-bold text-[10px] md:text-xs shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer block leading-none`}

                      >

                        Book {p.provider}

                      </button>

                    </div>

                  );

                      })}
                    </div>
                  )}
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

                  {country?.faqHeading || 'Frequently Asked Questions'}

                </h3>

              </div>



              {faqsToRender ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="space-y-3.5 text-xs md:text-sm"
              >
                {faqsToRender.map((faq, index) => (

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
              ) : (
                <div dangerouslySetInnerHTML={{ __html: country.faq }} className="prose max-w-none text-slate-600 text-sm md:text-[15px] leading-relaxed font-sans space-y-4 bg-slate-50/50 p-6 md:p-8 rounded-3xl border border-slate-100/60 shadow-[0_4px_25px_rgba(0,0,0,0.015)]" />
              )}

            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
