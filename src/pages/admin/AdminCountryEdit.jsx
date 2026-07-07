import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import JoditEditor from 'jodit-react';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function AdminCountryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    slug: '',
    basePrice: 3000,
    advice: '',
    isActive: true,
    heroTitle: '',
    introHeading: '',
    metaViewTitle: '',
    metaKeywords: '',
    metaDescription: '',
    medicineCourierServices: '',
    documentsNeeded: '',
    servicesWeOffer: '',
    serviceHeading: '',
    service1Title: '', service1Content: '',
    service2Title: '', service2Content: '',
    service3Title: '', service3Content: '',
    service4Title: '', service4Content: '',
    docHeading: '',
    doc1Title: '', doc1Content: '',
    doc2Title: '', doc2Content: '',
    doc3Title: '', doc3Content: '',
    faq: '',
    faqHeading: '',
    faq1Q: '', faq1A: '',
    faq2Q: '', faq2A: '',
    faq3Q: '', faq3A: '',
    faq4Q: '', faq4A: '',
    faq5Q: '', faq5A: ''
  });


  useEffect(() => {
    fetchCountry();
  }, [id]);

  const fetchCountry = async () => {
    if (id === 'new') {
      const origin = "India";
      const dest = "Australia"; // Placeholder until user types
      
      const defaultSEO = `<p><strong>Welcome to Courier Medicines - We offer the No.1 International Medicine Delivery from India to ${dest}.</strong></p><p>At Courier Medicines, we deliver your medicines anywhere in the world. Our team is highly experienced in international medicine delivery, so you can relax knowing your medications will arrive safely and quickly. We procure medicines on our customer's behalf from licensed chemist shops, verify batch numbers and expiry dates, and ship them using priority air routes.</p><p>Courier medicine from India is legal and we make the process seamless for you by providing Express International medicine courier services from India to Abroad. We have expertise in couriering different types of medicines be it Liquid or Tablets - allopathic medicine, ayurvedic, homeopathy, herbal, or cold storage / temperature control Medicine.</p>`;
      
      const defaultDocs = `<p class="text-[#444] leading-relaxed"><strong class="text-black">1. Prescription Needed:</strong> We required soft copy of prescription to send medicine to ${dest}. As prescription is attached with parcel for smooth custom clearance. In case of No prescription, you can contact our team we will help you out.</p><p class="text-[#444] leading-relaxed"><strong class="text-black">2. Medicine Invoice:</strong> We required soft copy of medicine invoice purchased from pharmacy. As invoice will be attached with parcel for smooth custom clearance. In case of No Invoice available contact our team, we will help you out.</p><p class="text-[#444] leading-relaxed"><strong class="text-black">3. Receiver Identity Proof:</strong> We need a document of a Receiver/Patient whom medicine is sent for, as its mandatory to be attached with medicine parcel as its one of the demand of custom process and very crucial documents for clearing of medicines.</p><p class="text-[#444] leading-relaxed italic pt-2">Note: Your documents are subject to our privacy policy, which guarantees your information is secure. We do not keep any documents after processing your order to maintain your privacy, and you will need to share them again for future order.</p>`;
      
      const defaultServices = `<p><strong class="text-black">1. Express Premium Service:</strong> <em class="text-[#0052CC]">Courier Medicines offer express service From ${origin} to ${dest} with Delivery time of 3 working days with Including preparing Documentation on customer behalf to 100% custom clearance</em> and assigning a dedicate RM (Relationship Manager) with 24x7 Customer support, help in custom clearance assistance in India as well as ${dest}.</p><p><strong class="text-black">2. Temperate Control Service:</strong> We offer Cold Storage service also, as Some medicines required a certain Temperature to maintain during transit from India to ${dest}. You can contact our team and inform them about our cold storage medicine or you can take guidance on cold storage medication our expert will guide you well.</p><p><strong class="text-black">3. Economy Service:</strong> If you are looking for low-rate service with transit time 10-12 working days with Minimum Coverage of Documentation than this service is for you. Documentation Customer has to provide and Custom clearance assistance is very limited till parcel custom clear from India.</p><p><strong class="text-black">4. Zero Courier Charge:</strong> <em class="not-italic">Keeping the rapid growth of Cancer and HIV Worldwide, Courier medicines have Introduced a new service for cancer and HIV patients living abroad to get their medication at absolutely Zero Courier Cost. For More Information Contact Courier Medicines International Services. T&C</em></p>`;
      
      const defaultProcess1 = `<h3 class="text-[18px] md:text-[20px] font-medium text-black mb-6">Process 1 : Instant Booking At Zero Payment</h3><p><span class="text-[#0052CC]">Step 1.</span> Call /WhatsApp us on +91-8882691919</p><p><span class="text-[#0052CC]">Step 2.</span> Share your medicine details.</p><p><span class="text-[#0052CC]">Step 3.</span> Ask for documentation needed and get it checked.</p><p><span class="text-[#0052CC]">Step 4.</span> Ask for discounted price if applicable. T&C</p><p><span class="text-[#0052CC]">Step 5.</span> Share your pickup/delivery address.</p><p><span class="text-[#0052CC]">Step 6.</span> Booking Done.</p>`;
      
      const defaultProcess2 = `<h3 class="text-[18px] md:text-[20px] font-medium text-black mb-6">Process 2 : Book Directly From Rate Calculator</h3><p><span class="text-[#0052CC]">Step 1.</span> Choose Service you want From Rate Calculator</p><div class="pl-12 space-y-2 text-[#333]"><p>A. Pick up service or</p><p>B. Medicine Procurement service</p></div><p><span class="text-[#0052CC]">Step 2.</span> Fill all Necessary details on Rate Calculator.</p><p><span class="text-[#0052CC]">Step 3.</span> Choose Service from Multiple option</p><p><span class="text-[#0052CC]">Step 4.</span> Fill all the Pick up and Delivery Details</p><p><span class="text-[#0052CC]">Step 5.</span> Make advance payment</p><p><span class="text-[#0052CC]">Step 6.</span> Booking Done.Note your Booking ID</p>`;
      
      const defaultFAQ = `<ul><li><strong>How can I send medicine from ${origin} to ${dest}?</strong><br/>To send medicine from ${origin} to ${dest}, you need to share a copy of your doctor's prescription and purchase bill with us. We will arrange a free doorstep pickup at your address in ${origin}, verify and pack the medicines, and ship them securely via priority carriers.</li><li><strong>Is it legal to courier medicines from ${origin} to ${dest}?</strong><br/>Yes, it is completely legal to courier personal-use medications from ${origin} to ${dest} under personal import rules. You must provide a valid medical prescription matching the receiver's name.</li><li><strong>What types of medicines can I send from ${origin}?</strong><br/>We courier all types of medicines from ${origin}: Allopathic, Homeopathic, Ayurvedic, liquid syrups, capsules, tablets, chronic disease care drugs, and temperature-controlled cold chain medicines.</li><li><strong>How long does it take for the package to reach ${dest} from ${origin}?</strong><br/>Typical transit delivery timeline from ${origin} to ${dest} is 4 to 6 Business days via express global cargo carriers. Delays in customs clearance are excluded from transit times.</li></ul>`;
      
      setFormData({
        name: '', code: '', slug: '', basePrice: 3000, advice: '', isActive: true, heroTitle: '', introHeading: '', docHeading: '', doc1Title: '', doc1Content: '', doc2Title: '', doc2Content: '', doc3Title: '', doc3Content: '', serviceHeading: '', service1Title: '', service1Content: '', service2Title: '', service2Content: '', service3Title: '', service3Content: '', service4Title: '', service4Content: '',
        metaViewTitle: `Medicine Courier Service from ${origin} to ${dest}`,
        metaKeywords: `medicine courier, ${origin} to ${dest}, international courier`,
        metaDescription: `Best medicine courier from ${origin} to ${dest}.`,
        medicineCourierServices: defaultSEO, documentsNeeded: defaultDocs, servicesWeOffer: defaultServices,
        process1: defaultProcess1, process2: defaultProcess2, faq: defaultFAQ
      });
      setLoading(false);
      return;
    }

    try {
      const res = await api.get('/countries', { params: { all: 'true' } });
      const country = res.data.data.find(c => c._id === id);
      if (country) {
        
        const origin = "India";
        const dest = country.name || "Australia";

        const defaultSEO = `<p><strong>Welcome to Courier Medicines - We offer the No.1 International Medicine Delivery from India to ${dest}.</strong></p><p>At Courier Medicines, we deliver your medicines anywhere in the world. Our team is highly experienced in international medicine delivery, so you can relax knowing your medications will arrive safely and quickly. We procure medicines on our customer's behalf from licensed chemist shops, verify batch numbers and expiry dates, and ship them using priority air routes.</p><p>Courier medicine from India is legal and we make the process seamless for you by providing Express International medicine courier services from India to Abroad. We have expertise in couriering different types of medicines be it Liquid or Tablets - allopathic medicine, ayurvedic, homeopathy, herbal, or cold storage / temperature control Medicine.</p>`;
        const defaultDocs = `<p class="text-[#444] leading-relaxed"><strong class="text-black">1. Prescription Needed:</strong> We required soft copy of prescription to send medicine to ${dest}. As prescription is attached with parcel for smooth custom clearance. In case of No prescription, you can contact our team we will help you out.</p><p class="text-[#444] leading-relaxed"><strong class="text-black">2. Medicine Invoice:</strong> We required soft copy of medicine invoice purchased from pharmacy. As invoice will be attached with parcel for smooth custom clearance. In case of No Invoice available contact our team, we will help you out.</p><p class="text-[#444] leading-relaxed"><strong class="text-black">3. Receiver Identity Proof:</strong> We need a document of a Receiver/Patient whom medicine is sent for, as its mandatory to be attached with medicine parcel as its one of the demand of custom process and very crucial documents for clearing of medicines.</p><p class="text-[#444] leading-relaxed italic pt-2">Note: Your documents are subject to our privacy policy, which guarantees your information is secure. We do not keep any documents after processing your order to maintain your privacy, and you will need to share them again for future order.</p>`;
        const defaultServices = `<p><strong class="text-black">1. Express Premium Service:</strong> <em class="text-[#0052CC]">Courier Medicines offer express service From ${origin} to ${dest} with Delivery time of 3 working days with Including preparing Documentation on customer behalf to 100% custom clearance</em> and assigning a dedicate RM (Relationship Manager) with 24x7 Customer support, help in custom clearance assistance in India as well as ${dest}.</p><p><strong class="text-black">2. Temperate Control Service:</strong> We offer Cold Storage service also, as Some medicines required a certain Temperature to maintain during transit from India to ${dest}. You can contact our team and inform them about our cold storage medicine or you can take guidance on cold storage medication our expert will guide you well.</p><p><strong class="text-black">3. Economy Service:</strong> If you are looking for low-rate service with transit time 10-12 working days with Minimum Coverage of Documentation than this service is for you. Documentation Customer has to provide and Custom clearance assistance is very limited till parcel custom clear from India.</p><p><strong class="text-black">4. Zero Courier Charge:</strong> <em class="not-italic">Keeping the rapid growth of Cancer and HIV Worldwide, Courier medicines have Introduced a new service for cancer and HIV patients living abroad to get their medication at absolutely Zero Courier Cost. For More Information Contact Courier Medicines International Services. T&C</em></p>`;
        const defaultProcess1 = `<h3 class="text-[18px] md:text-[20px] font-medium text-black mb-6">Process 1 : Instant Booking At Zero Payment</h3><p><span class="text-[#0052CC]">Step 1.</span> Call /WhatsApp us on +91-8882691919</p><p><span class="text-[#0052CC]">Step 2.</span> Share your medicine details.</p><p><span class="text-[#0052CC]">Step 3.</span> Ask for documentation needed and get it checked.</p><p><span class="text-[#0052CC]">Step 4.</span> Ask for discounted price if applicable. T&C</p><p><span class="text-[#0052CC]">Step 5.</span> Share your pickup/delivery address.</p><p><span class="text-[#0052CC]">Step 6.</span> Booking Done.</p>`;
        const defaultProcess2 = `<h3 class="text-[18px] md:text-[20px] font-medium text-black mb-6">Process 2 : Book Directly From Rate Calculator</h3><p><span class="text-[#0052CC]">Step 1.</span> Choose Service you want From Rate Calculator</p><div class="pl-12 space-y-2 text-[#333]"><p>A. Pick up service or</p><p>B. Medicine Procurement service</p></div><p><span class="text-[#0052CC]">Step 2.</span> Fill all Necessary details on Rate Calculator.</p><p><span class="text-[#0052CC]">Step 3.</span> Choose Service from Multiple option</p><p><span class="text-[#0052CC]">Step 4.</span> Fill all the Pick up and Delivery Details</p><p><span class="text-[#0052CC]">Step 5.</span> Make advance payment</p><p><span class="text-[#0052CC]">Step 6.</span> Booking Done.Note your Booking ID</p>`;
        const defaultFAQ = `<ul><li><strong>How can I send medicine from ${origin} to ${dest}?</strong><br/>To send medicine from ${origin} to ${dest}, you need to share a copy of your doctor's prescription and purchase bill with us. We will arrange a free doorstep pickup at your address in ${origin}, verify and pack the medicines, and ship them securely via priority carriers.</li><li><strong>Is it legal to courier medicines from ${origin} to ${dest}?</strong><br/>Yes, it is completely legal to courier personal-use medications from ${origin} to ${dest} under personal import rules. You must provide a valid medical prescription matching the receiver's name.</li><li><strong>What types of medicines can I send from ${origin}?</strong><br/>We courier all types of medicines from ${origin}: Allopathic, Homeopathic, Ayurvedic, liquid syrups, capsules, tablets, chronic disease care drugs, and temperature-controlled cold chain medicines.</li><li><strong>How long does it take for the package to reach ${dest} from ${origin}?</strong><br/>Typical transit delivery timeline from ${origin} to ${dest} is 4 to 6 Business days via express global cargo carriers. Delays in customs clearance are excluded from transit times.</li></ul>`;

        setFormData({
          name: country.name || '',
          code: country.code || '',
          slug: country.slug || '',
          basePrice: country.basePrice || 3000,
          advice: country.advice || '',
          isActive: country.isActive !== undefined ? country.isActive : true,
          heroTitle: country.heroTitle || '',
          introHeading: country.introHeading || '',
          metaViewTitle: country.metaViewTitle || `Medicine Courier from India to ${dest} | Best Rates`,
          metaKeywords: country.metaKeywords || `medicine courier India, send medicine to ${dest}`,
          metaDescription: country.metaDescription || `Send medicines from India to ${dest} safely. We offer 100% custom clearance and doorstep pickup.`,
          medicineCourierServices: country.medicineCourierServices || defaultSEO,
          documentsNeeded: country.documentsNeeded || defaultDocs,
          servicesWeOffer: country.servicesWeOffer || defaultServices,
          process1: country.process1 || defaultProcess1,
          process2: country.process2 || defaultProcess2,
          serviceHeading: country.serviceHeading || '',
          service1Title: country.service1Title || '', service1Content: country.service1Content || '',
          service2Title: country.service2Title || '', service2Content: country.service2Content || '',
          service3Title: country.service3Title || '', service3Content: country.service3Content || '',
          service4Title: country.service4Title || '', service4Content: country.service4Content || '',
          docHeading: country.docHeading || '',
          doc1Title: country.doc1Title || '', doc1Content: country.doc1Content || '',
          doc2Title: country.doc2Title || '', doc2Content: country.doc2Content || '',
          doc3Title: country.doc3Title || '', doc3Content: country.doc3Content || '',
          faq: country.faq || defaultFAQ,
          faqHeading: country.faqHeading || '',
          faq1Q: country.faq1Q || '', faq1A: country.faq1A || '',
          faq2Q: country.faq2Q || '', faq2A: country.faq2A || '',
          faq3Q: country.faq3Q || '', faq3A: country.faq3A || '',
          faq4Q: country.faq4Q || '', faq4A: country.faq4A || '',
          faq5Q: country.faq5Q || '', faq5A: country.faq5A || '',
        });
        
      }
    } catch (err) {
      console.error('Error fetching country:', err);
      setMessage({ type: 'error', text: 'Failed to fetch country details' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedForm = { ...formData, [name]: type === 'checkbox' ? checked : value };

    // Auto-fill logic for slug when adding a new country
    if (id === 'new' && name === 'name') {
      const nameClean = updatedForm.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
      if (nameClean) {
        updatedForm.slug = `india-to-${nameClean}-medicine-courier-charges.htm`;
      } else {
        updatedForm.slug = '';
      }
    }

    // Force uppercase for country code
    if (name === 'code') {
      updatedForm.code = updatedForm.code.toUpperCase();
    }
    
    // Ensure slug is always lowercase
    if (name === 'slug') {
      updatedForm.slug = updatedForm.slug.toLowerCase();
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
      const submitData = new FormData();
      
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      

      if (id === 'new') {
        const res = await api.post(`/countries`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage({ type: 'success', text: 'Country created successfully!' });
        setTimeout(() => navigate('/admin/countries'), 1000);
      } else {
        await api.put(`/countries/${id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage({ type: 'success', text: 'Country updated successfully!' });
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
        <button type="button" onClick={() => navigate('/admin/countries')} className="p-2 bg-white border border-slate-200/70 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Country Management: {id === 'new' ? 'Register New' : 'Edit Country'}</h1>
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
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Country Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. Australia" required />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Country Code (2 letters) *</label>
            <input type="text" name="code" value={formData.code} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 uppercase" placeholder="e.g. AU" maxLength={2} required />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Website URL (Slug) *</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 text-blue-600 font-mono" required />
            <p className="text-xs text-gray-500 mt-1">Example: india-to-australia-medicine-courier-charges.htm</p>
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Base Price (INR ₹) *</label>
            <input type="number" name="basePrice" value={formData.basePrice} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" required />
          </div>
        </div>

        <hr />

        {/* Meta Data */}
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Meta Information</h2>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Hero Banner Title</label>
            <input type="text" name="heroTitle" value={formData.heroTitle} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. International Medicine Courier Service To Australia" />
            <p className="text-xs text-gray-500 mt-1">Leave blank to use the default title.</p>
          </div>

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
        
        <hr />

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Introduction Heading</label>
            <input type="text" name="introHeading" value={formData.introHeading} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. Send Medicines From India To Australia" />
            <p className="text-xs text-gray-500 mt-1">Leave blank to use default.</p>
          </div>

          <div>
            <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Introduction / Welcome Text (SEO)</label>
            <JoditEditor value={formData.medicineCourierServices} config={editorConfig} onBlur={newContent => handleEditorChange('medicineCourierServices', newContent)} />
          </div>


          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Services We Offer Section</h3>
            
            <div className="mb-6">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Section Heading</label>
              <input type="text" name="serviceHeading" value={formData.serviceHeading} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. SERVICE WE OFFER" />
            </div>

            <div className="space-y-6">
              {/* Card 1 */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-3">Card 1</h4>
                <div className="mb-3">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Heading</label>
                  <input type="text" name="service1Title" value={formData.service1Title} onChange={handleInputChange} className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. Pickup Service" />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Content (SEO text)</label>
                  <JoditEditor value={formData.service1Content} config={editorConfig} onBlur={newContent => handleEditorChange('service1Content', newContent)} />
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-3">Card 2</h4>
                <div className="mb-3">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Heading</label>
                  <input type="text" name="service2Title" value={formData.service2Title} onChange={handleInputChange} className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. Medicine Purchase" />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Content (SEO text)</label>
                  <JoditEditor value={formData.service2Content} config={editorConfig} onBlur={newContent => handleEditorChange('service2Content', newContent)} />
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-3">Card 3</h4>
                <div className="mb-3">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Heading</label>
                  <input type="text" name="service3Title" value={formData.service3Title} onChange={handleInputChange} className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. Tracking Provision" />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Content (SEO text)</label>
                  <JoditEditor value={formData.service3Content} config={editorConfig} onBlur={newContent => handleEditorChange('service3Content', newContent)} />
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-3">Card 4</h4>
                <div className="mb-3">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Heading</label>
                  <input type="text" name="service4Title" value={formData.service4Title} onChange={handleInputChange} className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. Payment Options" />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Content (SEO text)</label>
                  <JoditEditor value={formData.service4Content} config={editorConfig} onBlur={newContent => handleEditorChange('service4Content', newContent)} />
                </div>
              </div>
            </div>
          </div>


          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Customs Advice / Regulatory Framework</label>
            <textarea name="advice" value={formData.advice} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 h-24 resize-none" placeholder="Enter special customs duty and pharmaceutical clearance rules required by this country..." />
          </div>
        </div>


          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Documents Required Section</h3>
            
            <div className="mb-6">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Section Heading</label>
              <input type="text" name="docHeading" value={formData.docHeading} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. DOCUMENT REQUIRED TO SEND MEDICINES" />
            </div>

            <div className="space-y-6">
              {/* Doc 1 */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-3">Item 1</h4>
                <div className="mb-3">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Heading</label>
                  <input type="text" name="doc1Title" value={formData.doc1Title} onChange={handleInputChange} className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. 1. Prescription Required" />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Content (SEO text)</label>
                  <JoditEditor value={formData.doc1Content} config={editorConfig} onBlur={newContent => handleEditorChange('doc1Content', newContent)} />
                </div>
              </div>

              {/* Doc 2 */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-3">Item 2</h4>
                <div className="mb-3">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Heading</label>
                  <input type="text" name="doc2Title" value={formData.doc2Title} onChange={handleInputChange} className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. 2. Medicine Purchase Bill Required" />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Content (SEO text)</label>
                  <JoditEditor value={formData.doc2Content} config={editorConfig} onBlur={newContent => handleEditorChange('doc2Content', newContent)} />
                </div>
              </div>

              {/* Doc 3 */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-3">Item 3</h4>
                <div className="mb-3">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Heading</label>
                  <input type="text" name="doc3Title" value={formData.doc3Title} onChange={handleInputChange} className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. 3. Receiver ID Proof Required" />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Content (SEO text)</label>
                  <JoditEditor value={formData.doc3Content} config={editorConfig} onBlur={newContent => handleEditorChange('doc3Content', newContent)} />
                </div>
              </div>
            </div>
          </div>


        <div className="flex items-center gap-3 py-2">
          <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-4 h-4 text-primary bg-slate-50 border-slate-200 rounded focus:ring-primary focus:ring-1 cursor-pointer" />
          <label htmlFor="isActive" className="text-xs font-bold text-slate-700 cursor-pointer">Publish this country dynamically to home page calculator</label>
        </div>



        {/* Rich Text Areas */}
        <div className="space-y-8">

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-4">FAQ Section</h3>
            
            <div className="mb-6">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Section Heading</label>
              <input type="text" name="faqHeading" value={formData.faqHeading} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. FREQUENTLY ASKED QUESTIONS" />
            </div>

            <div className="space-y-6">
              {/* FAQ 1 */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-3">FAQ 1</h4>
                <div className="mb-3">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Question</label>
                  <input type="text" name="faq1Q" value={formData.faq1Q} onChange={handleInputChange} className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. What are the medicine courier charges?" />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Answer</label>
                  <JoditEditor value={formData.faq1A} config={editorConfig} onBlur={newContent => handleEditorChange('faq1A', newContent)} />
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-3">FAQ 2</h4>
                <div className="mb-3">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Question</label>
                  <input type="text" name="faq2Q" value={formData.faq2Q} onChange={handleInputChange} className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. What documents are required?" />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Answer</label>
                  <JoditEditor value={formData.faq2A} config={editorConfig} onBlur={newContent => handleEditorChange('faq2A', newContent)} />
                </div>
              </div>

              {/* FAQ 3 */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-3">FAQ 3</h4>
                <div className="mb-3">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Question</label>
                  <input type="text" name="faq3Q" value={formData.faq3Q} onChange={handleInputChange} className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. How much time does it take?" />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Answer</label>
                  <JoditEditor value={formData.faq3A} config={editorConfig} onBlur={newContent => handleEditorChange('faq3A', newContent)} />
                </div>
              </div>

              {/* FAQ 4 */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-3">FAQ 4</h4>
                <div className="mb-3">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Question</label>
                  <input type="text" name="faq4Q" value={formData.faq4Q} onChange={handleInputChange} className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. Is there any hidden customs fee?" />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Answer</label>
                  <JoditEditor value={formData.faq4A} config={editorConfig} onBlur={newContent => handleEditorChange('faq4A', newContent)} />
                </div>
              </div>

              {/* FAQ 5 */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-3">FAQ 5</h4>
                <div className="mb-3">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">Question</label>
                  <input type="text" name="faq5Q" value={formData.faq5Q} onChange={handleInputChange} className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700" placeholder="e.g. Can you courier liquid medicines?" />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2 block">Answer</label>
                  <JoditEditor value={formData.faq5A} config={editorConfig} onBlur={newContent => handleEditorChange('faq5A', newContent)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow hover:bg-primary-dark transition-colors disabled:opacity-50">
            {saving ? 'Updating...' : 'Update Country'}
          </button>
          <button type="button" onClick={() => navigate('/admin/countries')} className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors">
            Back
          </button>
        </div>

      </form>
    </div>
  );
}
