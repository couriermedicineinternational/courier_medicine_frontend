import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AlertCircle, Scale, ChevronDown, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_COUNTRIES } from "../constants";
import api from "../utils/api";
import { getProvidersForCountry, getProviderUI, calculatePrice as getProviderPrice, getProviderImage } from "../utils/pricing";
import CalculatorForm from "../components/sections/CalculatorForm";

export default function LocationDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [packageWeightIndex, setPackageWeightIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const packageWeight = packageWeightIndex === 0 ? 0.5 : packageWeightIndex === 1 ? 1.0 : 2.0;
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState(null);
  const [country, setCountry] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    import('../utils/pricing').then(m => m.loadPricingData());
    window.scrollTo(0, 0);
    setIsLoading(true);

    api.get(`/locations/${slug}`)
      .then(res => {
        if (res.data && res.data.success) {
          const l = res.data.data;
          const routeObj = {
            ...l,
            id: l.locationId // Keep id mapped to locationId just in case anything relies on it
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
          setRoute(null);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching location detail from API:', err);
        setRoute(null);
        setIsLoading(false);
      });
  }, [slug]);

  // Inject Meta Data for SEO when route loads
  useEffect(() => {
    if (route) {
      // 1. Update View Title
      const title = route.metaViewTitle || `Medicine Courier from ${route.city} to ${route.country} | Best Rates`;
      document.title = title;

      // 2. Update Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = route.metaDescription || `Send medicines from ${route.city} to ${route.country} safely. We offer 100% custom clearance and doorstep pickup.`;

      // 3. Update Meta Keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = route.metaKeywords || `medicine courier ${route.city}, send medicine to ${route.country}`;
    }
  }, [route]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  if (!isLoading && !route) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle size={48} className="text-red-500 mb-3" />
        <h2 className="text-xl font-black text-slate-800">Route Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">The selected shipping route is not registered in our system.</p>
        <Link to="/location.php" className="px-5 py-2.5 bg-[#0052CC] text-white text-xs font-bold rounded shadow">
          Back to Locations List
        </Link>
      </div>
    );
  }

  const originCity = route ? route.city : "";
  const destCountry = route ? route.country : "";
  const providersList = getProvidersForCountry(destCountry);
  const displayProviders = providersList.length > 0 ? providersList : [
    { provider: "DHL", timeline: "4-6 Days" },
    { provider: "UPS", timeline: "5-7 Days" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0052CC]"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const faqs = [
    { q: `How can I send medicine from ${originCity} to ${destCountry}?`, a: `To send medicine from ${originCity} to ${destCountry}, you need to share a copy of your doctor's prescription and purchase bill with us. We will arrange a free doorstep pickup at your address in ${originCity}, verify and pack the medicines, and ship them securely via priority carriers.` },
    { q: `Is it legal to courier medicines from ${originCity} to ${destCountry}?`, a: `Yes, it is completely legal to courier personal-use medications from ${originCity} to ${destCountry} under personal import rules. You must provide a valid medical prescription matching the receiver's name.` },
    { q: `What types of medicines can I send from ${originCity}?`, a: `We courier all types of medicines from ${originCity}: Allopathic, Homeopathic, Ayurvedic, liquid syrups, capsules, tablets, chronic disease care drugs, and temperature-controlled cold chain medicines.` },
    { q: `How long does it take for the package to reach ${destCountry} from ${originCity}?`, a: `Typical transit delivery timeline from ${originCity} to ${destCountry} is 4 to 6 Business days via express global cargo carriers. Delays in customs clearance are excluded from transit times.` },
    { q: `Do I need to pay customs duty for medicines sent from ${originCity} to ${destCountry}?`, a: `Customs duties or taxes depend on the destination country's regulations. Generally, personal use medicines are exempt or have minimal duties, but if any customs charges are levied by ${destCountry}, they must be paid by the receiver.` },
    { q: `Can you help procure medicines in ${originCity} if I live in ${destCountry}?`, a: `Yes! We offer a Medicine Procurement Service. Just share your prescription and we will purchase the medicines from reputed pharmacies in ${originCity} on your behalf and deliver them to your address in ${destCountry}.` },
    { q: `How do I pack the medicines securely for international shipping?`, a: `You don't have to worry about packing. When we pick up your medicines from ${originCity}, our expert team uses international standard packaging, including bubble wraps and secure boxes, to ensure your medicines arrive safely in ${destCountry}.` },
    { q: `Is there a weight limit for sending medicines from ${originCity}?`, a: `While you can send medicines according to your prescribed dosage, typical personal use shipments range from 0.5 KG to 2 KG. Our team will guide you on the permissible limits based on your prescription and ${destCountry}'s regulations.` },
    { q: `How can I track my medicine parcel from ${originCity} to ${destCountry}?`, a: `Once your parcel is dispatched from ${originCity}, we will provide you with a unique tracking number and a link. You can use this to monitor your shipment's status in real-time until it reaches ${destCountry}.` },
    { q: `What if I don't have a prescription?`, a: `A valid prescription is legally required for international medicine shipping. However, if you are facing difficulties, you can contact our expert team in ${originCity}, and we will assist and guide you on the necessary steps to proceed.` }
  ];

  return (
    <div className="bg-[#fcfcfc] text-[#333] font-sans pb-0 overflow-x-hidden">
      <div className="max-w-[1300px] mx-auto px-4 py-6 md:py-10">
        
        {/* Breadcrumb & Header */}
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}
          className="text-[13px] text-[#666] mb-8 font-semibold"
        >
          <Link to="/" className="hover:text-black">Home</Link> &gt; {originCity} To &gt; <span className="text-[#666]">{destCountry}</span>
        </motion.div>
        
        <motion.h1 
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}
          className="text-[22px] md:text-[28px] font-bold text-black mb-6 text-center"
        >
          Medicine Courier From {originCity} To {destCountry}
        </motion.h1>

        {/* SEO Text Section */}
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}
          className="space-y-6 text-[14px] leading-[1.8] text-[#444] mb-12"
        >
          {route?.medicineCourierServices ? (
            <div dangerouslySetInnerHTML={{ __html: route.medicineCourierServices }} className="prose max-w-none" />
          ) : (
            <>
              <p className="text-[18px] md:text-[20px] text-[#e7530f] bg-[#fffee6] inline-block p-1">
                Welcome to Courier Medicines International Services – Top Leading International Medicine Delivery from {originCity} to {destCountry}.
              </p>

              <p>
                We offer Medicine courier service all across world with operating with Partners and Channels from Different States and Cities within India. <span className="text-[#0000ee]">Courier Medicines Aims to Provide Two Services Below</span> and now have Become the Leading Medicine Courier Service by simply Offering Flexibilty to Customers.
              </p>

              <p className="font-bold italic text-black">1. Door step pickup And Delivery to {destCountry}</p>
              <p className="font-bold italic text-black">2. Medicine Procurement Service on Customer Behalf And Delivering to {destCountry}.</p>

              <p>
                <span className="bg-[#fffee6]">We are one of the Best Medicine Courier Company in {originCity} for {destCountry}, trusted by thousands of families for over 15 years for getting their allopathy, Homeopathy to Ayurvedic medicine</span> With our extensive logistics experience and dedication to timely deliveries, we ensure safe and guaranteed medicine delivery.
              </p>

              <p>
                <span className="text-[#0000ee] italic">We Target to send all Disease medication</span> whether it's normal cough cold to-Cancer, HIV or any diseases. <u className="italic">Courier Medicines Sends all life-saving prescription drug, specialized treatments, or regular medication, refills, tablet, liquid, Pills or Injection.</u> we understand how important timely delivery is—especially when loved ones living abroad looking for a Medicine Courier partner for their medical need and as well as company who handle documentation, customs clearance, and packaging and get medicine delivery at their door step.
              </p>

              <p>
                When it comes to health, delays aren't an option. That's why our specialized medicine courier service is designed for speed, safety, and compliance. <span className="text-[#0000ee]">Courier Medicines can Send Medicine From {originCity} to {destCountry}</span> confidently with no stress, no confusion. Our streamlined process includes real-time tracking, documentation support, 100% Guaranteed Custom Clearance and low budget with transparent pricing. <strong className="italic text-black">Our outstanding testimonials below this page is proof of continued loyalty volumes about the care and consistency we deliver and moreover</strong> Courier Medicines International Services have been rated with 4.9 Rating on Google and Excellent by TrustPilot.
              </p>

              <p>
                Speaking of pricing, <strong className="text-black">Courier Medicines offer Best {originCity} to {destCountry} Medicine Courier Rates</strong>, some of the most competitive and Reasonable price as compare to our competitors that too without compromising on quality. No hidden fees, no last-minute surprises—just a transparent, affordable, and reliable service from the very first step. Even during tough times like the COVID-19 pandemic, we remained operational—delivering hope and health across continents. We are not just a courier service—we are your partner in care. <strong className="text-black">If you're looking for a trustworthy Medicine Courier Service to {destCountry}, Than we are Just a call a way.</strong> Call / WhatsApp <a href="https://wa.me/918882691919" className="text-[#0000ee]">+91-8882691919</a>
              </p>
            </>
          )}
        </motion.div>

        {/* Services Overview Section */}
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}
          className="mb-12 text-[14px] leading-[1.8] text-[#444]"
        >
          <h3 className="text-[18px] md:text-[20px] font-bold text-black bg-[#fffee6] inline-block mb-3 px-1">Service 1. Free Pick-Up Service</h3>
          <p className="mb-4">
            Already have the medicines ready? <strong>We offer free doorstep pickup services across {originCity}</strong>, making the entire courier process smooth and stress-free for you.
          </p>
          <p className="mb-4 italic">
            We provide pick up service all over {originCity} Including some major Places like, Sector 42, Sushant Lok Phase 1, MG Road, Golf Course Road, Sector 50 / Nirvana Country, Palam Vihar, Sector 31, Sohna Road, Ambience Island, or any other part of {originCity}—we'll come to you.
          </p>
          <p className="mb-10">
            You'll Aslo receive {originCity} to {destCountry} Medicine Courier Tracking with real-time updates and notifications from the moment your parcel is picked up to the time it is delivered in {destCountry} and Our operations team ensures that all pickups happen on time, with zero delays, so you or your loved ones in {destCountry} get their medications when they need them.
          </p>

          <h3 className="text-[18px] md:text-[20px] font-bold text-black bg-[#fffee6] inline-block mb-3 px-1">Service 2. Medicine Procurement Service</h3>
          <p className="mb-4">
            We understand—it's not always possible to get the right medicines when you need them, especially if you're trying to arrange it from abroad. That's where we step in.
          </p>
          <p className="mb-6 italic text-[#0000ee]">
            Whether you need Allopathy, Ayurvedic, or Homeopathy. Liquid,Tablets,Pills or Injection we can purchase all the medicines on your behalf and get it Deliver in {destCountry} quickly and safely as We've partnered with verified and reputed pharmacies, so you'll always receive genuine, sealed medicines—and often at discounted prices too. You can reach us via <a href="https://wa.me/918882691919" className="underline font-medium">Call/WhatsApp at +91-8882691919 Or email us at couriermedicines@gmail.com</a> — we usually respond within Minutes.
          </p>
          <p className="font-bold text-black">
            Reputed Online Pharmacy to Buy Medicines{' '}
            <span className="text-[#0052CC] font-normal ml-2 space-x-2">
              <span className="cursor-pointer hover:underline">Tata 1mg</span>
              <span className="cursor-pointer hover:underline">PharmEasy</span>
              <span className="cursor-pointer hover:underline">Netmeds</span>
              <span className="cursor-pointer hover:underline">Apollo Pharmacy</span>
              <span className="cursor-pointer hover:underline">Amzaon Pharmacy</span>
            </span>
          </p>
        </motion.div>

        {/* Document Required Section */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
          <h2 className="text-[20px] md:text-[24px] font-bold text-black mb-6 text-center">
            Document Required To Send Medicine From {originCity} To {destCountry}
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
            <div className="flex-1 space-y-6 text-[13px] md:text-[14px]">
              <p className="text-[#444] leading-relaxed">
                <strong className="text-black">1. Prescription Needed:</strong> We required soft copy of prescription to send medicine to {destCountry}. As prescription is attached with parcel for smooth custom clearance. In case of No prescription, you can contact our team we will help you out.
              </p>
              <p className="text-[#444] leading-relaxed">
                <strong className="text-black">2. Medicine Invoice:</strong> We required soft copy of medicine invoice purchased from pharmacy. As invoice will be attached with parcel for smooth custom clearance. In case of No Invoice available contact our team, we will help you out.
              </p>
              <p className="text-[#444] leading-relaxed">
                <strong className="text-black">3. Receiver Identity Proof:</strong> We need a document of a Receiver/Patient whom medicine is sent for, as its mandatory to be attached with medicine parcel as its one of the demand of custom process and very crucial documents for clearing of medicines.
              </p>
              <p className="text-[#444] leading-relaxed italic pt-2">
                Note: Your documents are subject to our privacy policy, which guarantees your information is secure. We do not keep any documents after processing your order to maintain your privacy, and you will need to share them again for future order.
              </p>
            </div>
            
            <div className="shrink-0 w-full max-w-[280px] flex justify-center md:justify-end">
              <img src="/docs-image.png" alt="Documents Required for Courier" className="w-full max-w-[280px] h-auto object-contain drop-shadow-sm rounded-xl" />
            </div>
          </div>
        </motion.div>

        {/* Service We Offer Section */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
          <h2 className="text-[20px] md:text-[24px] font-bold text-black mb-6 text-center">
            Service We Offer
          </h2>
          
          <div className="mb-12">
            <div className="space-y-6 text-[13px] md:text-[14px] text-[#444] leading-relaxed">
              <p>
                <strong className="text-black">1. Express Premium Service:</strong> <em className="text-[#0052CC]">Courier Medicines offer express service From {originCity} to {destCountry} with Delivery time of 3 working days with Including preparing Documentation on customer behalf to 100% custom clearance</em> and assigning a dedicate RM (Relationship Manager) with 24x7 Customer support, help in custom clearance assistance in India as well as {destCountry}.
              </p>
              <p>
                <strong className="text-black">2. Temperate Control Service:</strong> We offer Cold Storage service also, as Some medicines required a certain Temperature to maintain during transit from India to {destCountry}. You can contact our team and inform them about our cold storage medicine or you can take guidance on cold storage medication our expert will guide you well.
              </p>
              <p>
                <strong className="text-black">3. Economy Service:</strong> If you are looking for low-rate service with transit time 10-12 working days with Minimum Coverage of Documentation than this service is for you. Documentation Customer has to provide and Custom clearance assistance is very limited till parcel custom clear from India.
              </p>
              <p>
                <strong className="text-black">4. Zero Courier Charge:</strong> <em className="not-italic">Keeping the rapid growth of Cancer and HIV Worldwide, Courier medicines have Introduced a new service for cancer and HIV patients living abroad to get their medication at absolutely Zero Courier Cost. For More Information Contact Courier Medicines International Services. T&C</em>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* How to Proceed For Booking */}
      <motion.div 
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}
        className="bg-[#f4f4f4] py-10 mb-12 w-full"
      >
        <div className="max-w-[1300px] mx-auto px-4">
          <h2 className="text-[20px] md:text-[24px] font-bold text-black mb-8 text-center capitalize tracking-wide">
            How To Process For Booking
          </h2>
          
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 justify-between items-center">
            <div className="flex-1 space-y-5 text-[14px] md:text-[15px] text-[#444] font-medium pt-2 w-full">
              <h3 className="text-[18px] md:text-[20px] font-medium text-black mb-6">Process 1 : Instant Booking At Zero Payment</h3>
              <p><span className="text-[#0052CC]">Step 1.</span> Call /WhatsApp us on +91-8882691919</p>
              <p><span className="text-[#0052CC]">Step 2.</span> Share your medicine details.</p>
              <p><span className="text-[#0052CC]">Step 3.</span> Ask for documentation needed and get it checked.</p>
              <p><span className="text-[#0052CC]">Step 4.</span> Ask for discounted price if applicable. T&C</p>
              <p><span className="text-[#0052CC]">Step 5.</span> Share your pickup/delivery address.</p>
              <p><span className="text-[#0052CC]">Step 6.</span> Booking Done.</p>
            </div>
            
            {/* The Booking Step Image */}
            <div className="w-full md:w-[480px] shrink-0 rounded-2xl overflow-hidden shadow-sm border border-slate-100 mt-6 md:mt-0">
              <img src="/process_booking_new.png" alt="Booking Process" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Process 2 Section */}
      <motion.div 
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}
        className="bg-[#f8f9fa] py-10 mb-12 border-t border-[#e0e0e0] w-full"
      >
        <div className="max-w-[1300px] mx-auto px-4 flex flex-col md:flex-row gap-10">
          <div className="flex-1 space-y-5 text-[14px] md:text-[15px] text-[#444] font-medium pt-2">
            <h3 className="text-[18px] md:text-[20px] font-medium text-black mb-6">Process 2 : Book Directly From Rate Calculator</h3>
            <p><span className="text-[#0052CC]">Step 1.</span> Choose Service you want From Rate Calculator</p>
            <div className="pl-12 space-y-2 text-[#333]">
              <p>A. Pick up service or</p>
              <p>B. Medicine Procurement service</p>
            </div>
            <p><span className="text-[#0052CC]">Step 2.</span> Fill all Necessary details on Rate Calculator.</p>
            <p><span className="text-[#0052CC]">Step 3.</span> Choose Service from Multiple option</p>
            <p><span className="text-[#0052CC]">Step 4.</span> Fill all the Pick up and Delivery Details</p>
            <p><span className="text-[#0052CC]">Step 5.</span> Make advance payment</p>
            <p><span className="text-[#0052CC]">Step 6.</span> Booking Done.Note your Booking ID</p>
          </div>
          
          {/* The Calculator Form Wrapper */}
          <div className="w-full md:w-[460px] shrink-0">
             <CalculatorForm />
          </div>
        </div>
      </motion.div>

      <div className="max-w-[1300px] mx-auto px-4 mb-16">
        {/* FAQs Section */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
          <h2 className="text-[24px] md:text-[28px] font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            {faqs.map((item, idx) => {
              const isOpen = activeFaq === idx;

              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white border border-slate-200 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:border-[#0052CC]/40 overflow-hidden transition-all duration-300"
                >
                  {/* Collapsible Header */}
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-50/50 cursor-pointer"
                  >
                    <div className="text-[15px] md:text-[16px] font-bold text-slate-800 leading-snug pr-4 flex-1">
                      {item.q}
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#0052CC]" : ""
                      }`}
                    />
                  </button>

                  {/* Collapsible Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="p-5 md:p-6 bg-slate-50/50 border-t border-slate-100">
                          <div className="text-[14px] text-slate-600 leading-[1.8]">
                            {item.a}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}
