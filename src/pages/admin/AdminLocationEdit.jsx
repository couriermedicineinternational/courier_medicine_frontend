import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import JoditEditor from 'jodit-react';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function AdminLocationEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    country: '',
    locationId: '',
    slug: '',
    metaViewTitle: '',
    metaKeywords: '',
    metaDescription: '',
    medicineCourierServices: '',
    documentsNeeded: '',
    servicesWeOffer: '',
    process1: '',
    process2: '',
    faq: '',
    faqHeading: '',
    faq1Q: '', faq1A: '',
    faq2Q: '', faq2A: '',
    faq3Q: '', faq3A: '',
    faq4Q: '', faq4A: '',
    faq5Q: '', faq5A: '',
    faq6Q: '', faq6A: '',
    faq7Q: '', faq7A: '',
    faq8Q: '', faq8A: '',
    faq9Q: '', faq9A: '',
    faq10Q: '', faq10A: ''
  });



  useEffect(() => {
    fetchLocation();
  }, [id]);

  const fetchLocation = async () => {
    if (id === 'new') {
      const origin = "Delhi";
      const dest = "USA";
      
      const defaultSEO = `<p class="text-[18px] md:text-[20px] text-[#e7530f] bg-[#fffee6] inline-block p-1">Welcome to Courier Medicines International Services – Top Leading International Medicine Delivery from ${origin} to ${dest}.</p><p>We offer Medicine courier service all across world with operating with Partners and Channels from Different States and Cities within India. <span class="text-[#0000ee]">Courier Medicines Aims to Provide Two Services Below</span> and now have Become the Leading Medicine Courier Service by simply Offering Flexibilty to Customers.</p><p class="font-bold italic text-black">1. Door step pickup And Delivery to ${dest}</p><p class="font-bold italic text-black">2. Medicine Procurement Service on Customer Behalf And Delivering to ${dest}.</p><p><span class="bg-[#fffee6]">We are one of the Best Medicine Courier Company in ${origin} for ${dest}, trusted by thousands of families for over 15 years for getting their allopathy, Homeopathy to Ayurvedic medicine</span> With our extensive logistics experience and dedication to timely deliveries, we ensure safe and guaranteed medicine delivery.</p><p><span class="text-[#0000ee] italic">We Target to send all Disease medication</span> whether it's normal cough cold to-Cancer, HIV or any diseases. <u class="italic">Courier Medicines Sends all life-saving prescription drug, specialized treatments, or regular medication, refills, tablet, liquid, Pills or Injection.</u> we understand how important timely delivery is—especially when loved ones living abroad looking for a Medicine Courier partner for their medical need and as well as company who handle documentation, customs clearance, and packaging and get medicine delivery at their door step.</p><p>When it comes to health, delays aren't an option. That's why our specialized medicine courier service is designed for speed, safety, and compliance. <span class="text-[#0000ee]">Courier Medicines can Send Medicine From ${origin} to ${dest}</span> confidently with no stress, no confusion. Our streamlined process includes real-time tracking, documentation support, 100% Guaranteed Custom Clearance and low budget with transparent pricing. <strong class="italic text-black">Our outstanding testimonials below this page is proof of continued loyalty volumes about the care and consistency we deliver and moreover</strong> Courier Medicines International Services have been rated with 4.9 Rating on Google and Excellent by TrustPilot.</p><p>Speaking of pricing, <strong class="text-black">Courier Medicines offer Best ${origin} to ${dest} Medicine Courier Rates</strong>, some of the most competitive and Reasonable price as compare to our competitors that too without compromising on quality. No hidden fees, no last-minute surprises—just a transparent, affordable, and reliable service from the very first step. Even during tough times like the COVID-19 pandemic, we remained operational—delivering hope and health across continents. We are not just a courier service—we are your partner in care. <strong class="text-black">If you're looking for a trustworthy Medicine Courier Service to ${dest}, Than we are Just a call a way.</strong> Call / WhatsApp <a href="https://wa.me/918882691919" class="text-[#0000ee]">+91-8882691919</a></p>`;
      
      const defaultDocs = `<p class="text-[#444] leading-relaxed"><strong class="text-black">1. Prescription Needed:</strong> We required soft copy of prescription to send medicine to ${dest}. As prescription is attached with parcel for smooth custom clearance. In case of No prescription, you can contact our team we will help you out.</p><p class="text-[#444] leading-relaxed"><strong class="text-black">2. Medicine Invoice:</strong> We required soft copy of medicine invoice purchased from pharmacy. As invoice will be attached with parcel for smooth custom clearance. In case of No Invoice available contact our team, we will help you out.</p><p class="text-[#444] leading-relaxed"><strong class="text-black">3. Receiver Identity Proof:</strong> We need a document of a Receiver/Patient whom medicine is sent for, as its mandatory to be attached with medicine parcel as its one of the demand of custom process and very crucial documents for clearing of medicines.</p><p class="text-[#444] leading-relaxed italic pt-2">Note: Your documents are subject to our privacy policy, which guarantees your information is secure. We do not keep any documents after processing your order to maintain your privacy, and you will need to share them again for future order.</p>`;
      
      const defaultServices = `<p><strong class="text-black">1. Express Premium Service:</strong> <em class="text-[#0052CC]">Courier Medicines offer express service From ${origin} to ${dest} with Delivery time of 3 working days with Including preparing Documentation on customer behalf to 100% custom clearance</em> and assigning a dedicate RM (Relationship Manager) with 24x7 Customer support, help in custom clearance assistance in India as well as ${dest}.</p><p><strong class="text-black">2. Temperate Control Service:</strong> We offer Cold Storage service also, as Some medicines required a certain Temperature to maintain during transit from India to ${dest}. You can contact our team and inform them about our cold storage medicine or you can take guidance on cold storage medication our expert will guide you well.</p><p><strong class="text-black">3. Economy Service:</strong> If you are looking for low-rate service with transit time 10-12 working days with Minimum Coverage of Documentation than this service is for you. Documentation Customer has to provide and Custom clearance assistance is very limited till parcel custom clear from India.</p><p><strong class="text-black">4. Zero Courier Charge:</strong> <em class="not-italic">Keeping the rapid growth of Cancer and HIV Worldwide, Courier medicines have Introduced a new service for cancer and HIV patients living abroad to get their medication at absolutely Zero Courier Cost. For More Information Contact Courier Medicines International Services. T&C</em></p>`;
      
      const defaultProcess1 = `<ul class="list-decimal pl-5 space-y-2 text-[#444] text-[15px]"><li class="pl-2">The very first step is simple: <strong>Contact us</strong>. You can call, WhatsApp, or request a quote through our website. Our dedicated customer support team will immediately attend to your inquiry, taking down all necessary details about the medicine you wish to send.</li><li class="pl-2">Based on the specifics—type of medicine, destination, and urgency—<strong>we'll provide a transparent, competitive quote instantly.</strong> There are no hidden fees. Once you approve the pricing, our team swings into action.</li></ul>`;
      
      const defaultProcess2 = `<ul class="list-decimal pl-5 space-y-2 text-[#444] text-[15px]"><li class="pl-2">International medical shipments require precise paperwork. Our experts will guide you on the necessary documents, such as doctor's prescriptions, pharmacy invoices, and receiver ID proofs. <strong class="text-[#0052CC]">Don't worry if you find this overwhelming—we prepare and organize all the required documentation on your behalf</strong> to ensure 100% guaranteed customs clearance.</li><li class="pl-2">You don't need to step out of your home. <strong class="text-black">We offer free doorstep pickup.</strong> Our trained personnel will collect the medicines safely. If you prefer, we also offer a unique <em>Medicine Procurement Service</em> where we purchase the prescribed medicines on your behalf from trusted pharmacies and ship them directly.</li></ul>`;
      
      const defaultFaq = `<h3 class="text-xl font-bold text-slate-800 mb-3">1. Is a doctor's prescription mandatory?</h3><p class="text-slate-600 mb-6">Yes, a valid doctor's prescription is required for most international medicine shipments. However, if you are facing difficulties obtaining one, please contact our support team. We can provide guidance and assistance to help facilitate your shipment.</p><h3 class="text-xl font-bold text-slate-800 mb-3">2. How long does the delivery take?</h3><p class="text-slate-600 mb-6">With our <strong>Express Premium Service</strong>, delivery typically takes 3 to 6 working days. If you opt for our Economy Service, the transit time is usually 10 to 12 working days. We ensure the fastest possible routing for all medical shipments.</p>`;
      
      setFormData({
        name: '', city: '', country: '', locationId: '', slug: '',
        metaViewTitle: `Medicine Courier Service from ${origin} to ${dest}`,
        metaKeywords: `medicine courier, ${origin} to ${dest}, international courier`,
        metaDescription: `Best medicine courier from ${origin} to ${dest}.`,
        medicineCourierServices: defaultSEO, documentsNeeded: defaultDocs, servicesWeOffer: defaultServices,
        process1: defaultProcess1, process2: defaultProcess2, faq: defaultFaq
      });
      setLoading(false);
      return;
    }

    try {
      // Find the location by fetching all and filtering (since we only have get by slug or get all)
      const token = localStorage.getItem('token');
      const { data } = await api.get('/locations?all=true', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const loc = data.data.find(l => l._id === id);
      if (loc) {
        
        const origin = loc.city || "Delhi";
        const dest = loc.country || "USA";

        const defaultSEO = `<p class="text-[18px] md:text-[20px] text-[#e7530f] bg-[#fffee6] inline-block p-1">Welcome to Courier Medicines International Services – Top Leading International Medicine Delivery from ${origin} to ${dest}.</p><p>We offer Medicine courier service all across world with operating with Partners and Channels from Different States and Cities within India. <span class="text-[#0000ee]">Courier Medicines Aims to Provide Two Services Below</span> and now have Become the Leading Medicine Courier Service by simply Offering Flexibilty to Customers.</p><p class="font-bold italic text-black">1. Door step pickup And Delivery to ${dest}</p><p class="font-bold italic text-black">2. Medicine Procurement Service on Customer Behalf And Delivering to ${dest}.</p><p><span class="bg-[#fffee6]">We are one of the Best Medicine Courier Company in ${origin} for ${dest}, trusted by thousands of families for over 15 years for getting their allopathy, Homeopathy to Ayurvedic medicine</span> With our extensive logistics experience and dedication to timely deliveries, we ensure safe and guaranteed medicine delivery.</p><p><span class="text-[#0000ee] italic">We Target to send all Disease medication</span> whether it's normal cough cold to-Cancer, HIV or any diseases. <u class="italic">Courier Medicines Sends all life-saving prescription drug, specialized treatments, or regular medication, refills, tablet, liquid, Pills or Injection.</u> we understand how important timely delivery is—especially when loved ones living abroad looking for a Medicine Courier partner for their medical need and as well as company who handle documentation, customs clearance, and packaging and get medicine delivery at their door step.</p><p>When it comes to health, delays aren't an option. That's why our specialized medicine courier service is designed for speed, safety, and compliance. <span class="text-[#0000ee]">Courier Medicines can Send Medicine From ${origin} to ${dest}</span> confidently with no stress, no confusion. Our streamlined process includes real-time tracking, documentation support, 100% Guaranteed Custom Clearance and low budget with transparent pricing. <strong class="italic text-black">Our outstanding testimonials below this page is proof of continued loyalty volumes about the care and consistency we deliver and moreover</strong> Courier Medicines International Services have been rated with 4.9 Rating on Google and Excellent by TrustPilot.</p><p>Speaking of pricing, <strong class="text-black">Courier Medicines offer Best ${origin} to ${dest} Medicine Courier Rates</strong>, some of the most competitive and Reasonable price as compare to our competitors that too without compromising on quality. No hidden fees, no last-minute surprises—just a transparent, affordable, and reliable service from the very first step. Even during tough times like the COVID-19 pandemic, we remained operational—delivering hope and health across continents. We are not just a courier service—we are your partner in care. <strong class="text-black">If you're looking for a trustworthy Medicine Courier Service to ${dest}, Than we are Just a call a way.</strong> Call / WhatsApp <a href="https://wa.me/918882691919" class="text-[#0000ee]">+91-8882691919</a></p>`;

        const defaultDocs = `<p class="text-[#444] leading-relaxed"><strong class="text-black">1. Prescription Needed:</strong> We required soft copy of prescription to send medicine to ${dest}. As prescription is attached with parcel for smooth custom clearance. In case of No prescription, you can contact our team we will help you out.</p><p class="text-[#444] leading-relaxed"><strong class="text-black">2. Medicine Invoice:</strong> We required soft copy of medicine invoice purchased from pharmacy. As invoice will be attached with parcel for smooth custom clearance. In case of No Invoice available contact our team, we will help you out.</p><p class="text-[#444] leading-relaxed"><strong class="text-black">3. Receiver Identity Proof:</strong> We need a document of a Receiver/Patient whom medicine is sent for, as its mandatory to be attached with medicine parcel as its one of the demand of custom process and very crucial documents for clearing of medicines.</p><p class="text-[#444] leading-relaxed italic pt-2">Note: Your documents are subject to our privacy policy, which guarantees your information is secure. We do not keep any documents after processing your order to maintain your privacy, and you will need to share them again for future order.</p>`;
        
        const defaultServices = `<p><strong class="text-black">1. Express Premium Service:</strong> <em class="text-[#0052CC]">Courier Medicines offer express service From ${origin} to ${dest} with Delivery time of 3 working days with Including preparing Documentation on customer behalf to 100% custom clearance</em> and assigning a dedicate RM (Relationship Manager) with 24x7 Customer support, help in custom clearance assistance in India as well as ${dest}.</p><p><strong class="text-black">2. Temperate Control Service:</strong> We offer Cold Storage service also, as Some medicines required a certain Temperature to maintain during transit from India to ${dest}. You can contact our team and inform them about our cold storage medicine or you can take guidance on cold storage medication our expert will guide you well.</p><p><strong class="text-black">3. Economy Service:</strong> If you are looking for low-rate service with transit time 10-12 working days with Minimum Coverage of Documentation than this service is for you. Documentation Customer has to provide and Custom clearance assistance is very limited till parcel custom clear from India.</p><p><strong class="text-black">4. Zero Courier Charge:</strong> <em class="not-italic">Keeping the rapid growth of Cancer and HIV Worldwide, Courier medicines have Introduced a new service for cancer and HIV patients living abroad to get their medication at absolutely Zero Courier Cost. For More Information Contact Courier Medicines International Services. T&C</em></p>`;

        const defaultProcess1 = `<h3 class="text-[18px] md:text-[20px] font-medium text-black mb-6">Process 1 : Instant Booking At Zero Payment</h3><p><span class="text-[#0052CC]">Step 1.</span> Call /WhatsApp us on +91-8882691919</p><p><span class="text-[#0052CC]">Step 2.</span> Share your medicine details.</p><p><span class="text-[#0052CC]">Step 3.</span> Ask for documentation needed and get it checked.</p><p><span class="text-[#0052CC]">Step 4.</span> Ask for discounted price if applicable. T&C</p><p><span class="text-[#0052CC]">Step 5.</span> Share your pickup/delivery address.</p><p><span class="text-[#0052CC]">Step 6.</span> Booking Done.</p>`;

        const defaultProcess2 = `<h3 class="text-[18px] md:text-[20px] font-medium text-black mb-6">Process 2 : Book Directly From Rate Calculator</h3><p><span class="text-[#0052CC]">Step 1.</span> Choose Service you want From Rate Calculator</p><div class="pl-12 space-y-2 text-[#333]"><p>A. Pick up service or</p><p>B. Medicine Procurement service</p></div><p><span class="text-[#0052CC]">Step 2.</span> Fill all Necessary details on Rate Calculator.</p><p><span class="text-[#0052CC]">Step 3.</span> Choose Service from Multiple option</p><p><span class="text-[#0052CC]">Step 4.</span> Fill all the Pick up and Delivery Details</p><p><span class="text-[#0052CC]">Step 5.</span> Make advance payment</p><p><span class="text-[#0052CC]">Step 6.</span> Booking Done.Note your Booking ID</p>`;

        const defaultFAQ = `<ul><li><strong>How can I send medicine from ${origin} to ${dest}?</strong><br/>To send medicine from ${origin} to ${dest}, you need to share a copy of your doctor's prescription and purchase bill with us. We will arrange a free doorstep pickup at your address in ${origin}, verify and pack the medicines, and ship them securely via priority carriers.</li><li><strong>Is it legal to courier medicines from ${origin} to ${dest}?</strong><br/>Yes, it is completely legal to courier personal-use medications from ${origin} to ${dest} under personal import rules. You must provide a valid medical prescription matching the receiver's name.</li><li><strong>What types of medicines can I send from ${origin}?</strong><br/>We courier all types of medicines from ${origin}: Allopathic, Homeopathic, Ayurvedic, liquid syrups, capsules, tablets, chronic disease care drugs, and temperature-controlled cold chain medicines.</li><li><strong>How long does it take for the package to reach ${dest} from ${origin}?</strong><br/>Typical transit delivery timeline from ${origin} to ${dest} is 4 to 6 Business days via express global cargo carriers. Delays in customs clearance are excluded from transit times.</li></ul>`;

        const defaultFaqs = [
          { q: `How can I send medicine from ${origin} to ${dest}?`, a: `<p>To send medicine from ${origin} to ${dest}, you need to share a copy of your doctor's prescription and purchase bill with us. We will arrange a free doorstep pickup at your address in ${origin}, verify and pack the medicines, and ship them securely via priority carriers.</p>` },
          { q: `Is it legal to courier medicines from ${origin} to ${dest}?`, a: `<p>Yes, it is completely legal to courier personal-use medications from ${origin} to ${dest} under personal import rules. You must provide a valid medical prescription matching the receiver's name.</p>` },
          { q: `What types of medicines can I send from ${origin}?`, a: `<p>We courier all types of medicines from ${origin}: Allopathic, Homeopathic, Ayurvedic, liquid syrups, capsules, tablets, chronic disease care drugs, and temperature-controlled cold chain medicines.</p>` },
          { q: `How long does it take for the package to reach ${dest} from ${origin}?`, a: `<p>Typical transit delivery timeline from ${origin} to ${dest} is 4 to 6 Business days via express global cargo carriers. Delays in customs clearance are excluded from transit times.</p>` },
          { q: `Do I need to pay customs duty for medicines sent from ${origin} to ${dest}?`, a: `<p>Customs duties or taxes depend on the destination country's regulations. Generally, personal use medicines are exempt or have minimal duties, but if any customs charges are levied by ${dest}, they must be paid by the receiver.</p>` },
          { q: `Can you help procure medicines in ${origin} if I live in ${dest}?`, a: `<p>Yes! We offer a Medicine Procurement Service. Just share your prescription and we will purchase the medicines from reputed pharmacies in ${origin} on your behalf and deliver them to your address in ${dest}.</p>` },
          { q: `How do I pack the medicines securely for international shipping?`, a: `<p>You don't have to worry about packing. When we pick up your medicines from ${origin}, our expert team uses international standard packaging, including bubble wraps and secure boxes, to ensure your medicines arrive safely in ${dest}.</p>` },
          { q: `Is there a weight limit for sending medicines from ${origin}?`, a: `<p>While you can send medicines according to your prescribed dosage, typical personal use shipments range from 0.5 KG to 2 KG. Our team will guide you on the permissible limits based on your prescription and ${dest}'s regulations.</p>` },
          { q: `How can I track my medicine parcel from ${origin} to ${dest}?`, a: `<p>Once your parcel is dispatched from ${origin}, we will provide you with a unique tracking number and a link. You can use this to monitor your shipment's status in real-time until it reaches ${dest}.</p>` },
          { q: `What if I don't have a prescription?`, a: `<p>A valid prescription is legally required for international medicine shipping. However, if you are facing difficulties, you can contact our expert team in ${origin}, and we will assist and guide you on the necessary steps to proceed.</p>` }
        ];

        setFormData({
          name: loc.name || '',
          city: loc.city || '',
          country: loc.country || '',
          locationId: loc.locationId || '',
          slug: loc.slug || '',
          metaViewTitle: loc.metaViewTitle || `Medicine Courier Service from ${origin} to ${dest}`,
          metaKeywords: loc.metaKeywords || `medicine courier, ${origin} to ${dest}, international courier`,
          metaDescription: loc.metaDescription || `Best medicine courier from ${origin} to ${dest}.`,
          medicineCourierServices: loc.medicineCourierServices || defaultSEO,
          documentsNeeded: loc.documentsNeeded || defaultDocs,
          servicesWeOffer: loc.servicesWeOffer || defaultServices,
          process1: loc.process1 || defaultProcess1,
          process2: loc.process2 || defaultProcess2,
          faq: loc.faq || defaultFAQ,
          faqHeading: loc.faqHeading || 'Frequently Asked Questions',
          faq1Q: loc.faq1Q || defaultFaqs[0].q, faq1A: loc.faq1A || defaultFaqs[0].a,
          faq2Q: loc.faq2Q || defaultFaqs[1].q, faq2A: loc.faq2A || defaultFaqs[1].a,
          faq3Q: loc.faq3Q || defaultFaqs[2].q, faq3A: loc.faq3A || defaultFaqs[2].a,
          faq4Q: loc.faq4Q || defaultFaqs[3].q, faq4A: loc.faq4A || defaultFaqs[3].a,
          faq5Q: loc.faq5Q || defaultFaqs[4].q, faq5A: loc.faq5A || defaultFaqs[4].a,
          faq6Q: loc.faq6Q || defaultFaqs[5].q, faq6A: loc.faq6A || defaultFaqs[5].a,
          faq7Q: loc.faq7Q || defaultFaqs[6].q, faq7A: loc.faq7A || defaultFaqs[6].a,
          faq8Q: loc.faq8Q || defaultFaqs[7].q, faq8A: loc.faq8A || defaultFaqs[7].a,
          faq9Q: loc.faq9Q || defaultFaqs[8].q, faq9A: loc.faq9A || defaultFaqs[8].a,
          faq10Q: loc.faq10Q || defaultFaqs[9].q, faq10A: loc.faq10A || defaultFaqs[9].a
        });
        
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to fetch location details' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...formData, [name]: value };

    // Auto-fill logic for new locations
    if (id === 'new' && (name === 'city' || name === 'country')) {
      const cityClean = updatedForm.city.trim();
      const countryClean = updatedForm.country.trim();
      if (cityClean && countryClean) {
        const urlPart = `${cityClean.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-to-${countryClean.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        updatedForm.name = `${cityClean} to ${countryClean}`;
        updatedForm.locationId = urlPart;
        updatedForm.slug = `medicine-courier-from-${urlPart}.htm`;
      }
    }
    
    setFormData(updatedForm);
  };

  const handleEditorChange = (field, content) => {
    setFormData({ ...formData, [field]: content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const submitData = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (key === 'pricingMatrix') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });
      

      if (id === 'new') {
        const res = await api.post(`/locations`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage({ type: 'success', text: 'Location created successfully!' });
        setTimeout(() => navigate('/admin/locations'), 1000);
      } else {
        await api.put(`/locations/${id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage({ type: 'success', text: 'Location updated successfully!' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' });
    } finally {
      setSaving(false);
    }
  };

  const editorConfig = {
    readonly: false,
    height: 300,
    buttons: ['bold', 'italic', 'underline', 'strikethrough', 'ul', 'ol', 'font', 'fontsize', 'paragraph', 'brush', 'align', 'link', 'image', 'video', 'table', 'undo', 'redo', 'hr']
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin w-8 h-8" /></div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/locations')} className="p-2 bg-white border border-slate-200/70 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Location Management: Edit Location</h1>
      </div>

      {message.text && (
        <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-slate-200/70 p-6 md:p-8 rounded-3xl shadow-sm">
        
        {/* Core Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Location Title *</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" required />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">City *</label>
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" required />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Country *</label>
            <input type="text" name="country" value={formData.country} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" required />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Website URL (Slug) *</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" required />
            <p className="text-xs text-gray-500 mt-1">Example: medicine-courier-from-delhi-to-australia.htm</p>
          </div>
        </div>

        <hr />

        {/* Meta Data */}
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Meta Information</h2>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Meta View Title</label>
            <input type="text" name="metaViewTitle" value={formData.metaViewTitle} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Meta Keywords</label>
            <input type="text" name="metaKeywords" value={formData.metaKeywords} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Meta Description</label>
            <textarea name="metaDescription" value={formData.metaDescription} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 h-20" />
          </div>
        </div>



        {/* Rich Text Areas */}
        <div className="space-y-8">
          <div>
            <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Medicine Courier Services (SEO Text)</label>
            <JoditEditor value={formData.medicineCourierServices} config={editorConfig} onBlur={newContent => handleEditorChange('medicineCourierServices', newContent)} />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Document Needed</label>
            <JoditEditor value={formData.documentsNeeded} config={editorConfig} onBlur={newContent => handleEditorChange('documentsNeeded', newContent)} />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Service We Offer</label>
            <JoditEditor value={formData.servicesWeOffer} config={editorConfig} onBlur={newContent => handleEditorChange('servicesWeOffer', newContent)} />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Process 1 : Instant Booking</label>
            <JoditEditor value={formData.process1} config={editorConfig} onBlur={newContent => handleEditorChange('process1', newContent)} />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Process 2 : Book Directly From Rate Calculator</label>
            <JoditEditor value={formData.process2} config={editorConfig} onBlur={newContent => handleEditorChange('process2', newContent)} />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">FAQ Heading</label>
            <input type="text" name="faqHeading" value={formData.faqHeading} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. FREQUENTLY ASKED QUESTIONS" />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 mb-4">FAQ Items (10 FAQs)</h3>
            
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(idx => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-3">FAQ {idx}</h4>
                <div className="mb-3">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Question</label>
                  <input 
                    type="text" 
                    name={`faq${idx}Q`} 
                    value={formData[`faq${idx}Q`] || ''} 
                    onChange={handleInputChange} 
                    className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" 
                    placeholder="Enter FAQ question..." 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Answer</label>
                  <JoditEditor 
                    value={formData[`faq${idx}A`] || ''} 
                    config={editorConfig} 
                    onBlur={newContent => handleEditorChange(`faq${idx}A`, newContent)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow hover:bg-primary-dark transition-colors disabled:opacity-50">
            {saving ? 'Updating...' : 'Update'}
          </button>
          <button type="button" onClick={() => navigate('/admin/locations')} className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors">
            Back
          </button>
        </div>

      </form>
    </div>
  );
}
