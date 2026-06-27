import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Save, X, Globe, DollarSign, Image as ImageIcon } from "lucide-react";
import api from "../../utils/api";
import AdminProviders from "./AdminProviders";

export default function AdminPricing() {
  const [activeTab, setActiveTab] = useState('pricing'); // 'pricing' | 'providers'
  const [pricingList, setPricingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPricing, setCurrentPricing] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    country: "",
    providers: []
  });

  const fetchPricing = async () => {
    try {
      setLoading(true);
      const res = await api.get("/pricing");
      if (res.data && res.data.success) {
        setPricingList(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching pricing", err);
      alert("Failed to load pricing data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const handleOpenModal = (pricing = null) => {
    if (pricing) {
      setCurrentPricing(pricing);
      setFormData({
        country: pricing.country,
        providers: pricing.providers.map(p => ({ ...p }))
      });
    } else {
      setCurrentPricing(null);
      setFormData({
        country: "",
        providers: [
          { provider: "", halfKgPrice: "", oneKgPrice: "", timeline: "" }
        ]
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPricing(null);
  };

  const handleProviderChange = (index, field, value) => {
    const updatedProviders = [...formData.providers];
    updatedProviders[index][field] = value;
    setFormData({ ...formData, providers: updatedProviders });
  };

  const addProviderRow = () => {
    setFormData({
      ...formData,
      providers: [
        ...formData.providers,
        { provider: "", halfKgPrice: "", oneKgPrice: "", timeline: "" }
      ]
    });
  };

  const removeProviderRow = (index) => {
    const updatedProviders = formData.providers.filter((_, i) => i !== index);
    setFormData({ ...formData, providers: updatedProviders });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.country.trim()) return alert("Country name is required");
    
    // Convert string prices to numbers
    const payload = {
      country: formData.country,
      providers: formData.providers.map(p => ({
        ...p,
        halfKgPrice: Number(p.halfKgPrice),
        oneKgPrice: Number(p.oneKgPrice)
      }))
    };

    try {
      if (currentPricing) {
        await api.put(`/pricing/${currentPricing._id}`, payload);
      } else {
        await api.post("/pricing", payload);
      }
      handleCloseModal();
      fetchPricing();
    } catch (err) {
      console.error("Failed to save pricing", err);
      alert("Error saving pricing data. Check if country already exists.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this pricing configuration?")) {
      try {
        await api.delete(`/pricing/${id}`);
        fetchPricing();
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  const filteredPricing = pricingList.filter(p => 
    p.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading pricing data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Courier Pricing</h1>
          <p className="text-sm text-slate-500 mt-1">Manage service providers and rates by country.</p>
        </div>
        
        {/* Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'pricing' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            <DollarSign size={16} />
            Pricing Rates
          </button>
          <button
            onClick={() => setActiveTab('providers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'providers' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            <ImageIcon size={16} />
            Provider Images
          </button>
        </div>
        
        {activeTab === 'pricing' && (
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add New Country
          </button>
        )}
      </div>

      {activeTab === 'providers' ? (
        <AdminProviders isEmbedded={true} />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-semibold">Country</th>
                <th className="px-6 py-3 font-semibold">Providers</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPricing.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {item.country}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 flex-wrap">
                      {item.providers.map((p, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          {p.provider} (₹{p.halfKgPrice})
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPricing.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-slate-500">
                    No pricing configurations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">
                {currentPricing ? "Edit Pricing" : "Add New Pricing"}
              </h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Country Name</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g., Australia"
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-semibold text-slate-700">Service Providers</label>
                    <button
                      type="button"
                      onClick={addProviderRow}
                      className="text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      + Add Provider
                    </button>
                  </div>

                  {formData.providers.map((provider, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-3 items-end bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex-1 w-full">
                        <label className="block text-xs font-medium text-slate-500 mb-1">Provider Name</label>
                        <input
                          type="text"
                          value={provider.provider}
                          onChange={(e) => handleProviderChange(index, 'provider', e.target.value)}
                          placeholder="e.g. DHL"
                          className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="w-full sm:w-24">
                        <label className="block text-xs font-medium text-slate-500 mb-1">0.5 KG Price</label>
                        <input
                          type="number"
                          value={provider.halfKgPrice}
                          onChange={(e) => handleProviderChange(index, 'halfKgPrice', e.target.value)}
                          className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="w-full sm:w-24">
                        <label className="block text-xs font-medium text-slate-500 mb-1">1.0 KG Price</label>
                        <input
                          type="number"
                          value={provider.oneKgPrice}
                          onChange={(e) => handleProviderChange(index, 'oneKgPrice', e.target.value)}
                          className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="flex-1 w-full sm:w-32">
                        <label className="block text-xs font-medium text-slate-500 mb-1">Timeline</label>
                        <input
                          type="text"
                          value={provider.timeline}
                          onChange={(e) => handleProviderChange(index, 'timeline', e.target.value)}
                          placeholder="e.g. 4-6 Days"
                          className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                        <button
                          type="button"
                          onClick={() => removeProviderRow(index)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors h-[34px] w-[34px] flex items-center justify-center shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm"
              >
                <Save className="h-4 w-4" />
                Save Pricing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
