import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Search, Image as ImageIcon } from "lucide-react";
import ImageUpload from "../../components/ui/ImageUpload";
import api from "../../utils/api";
import { getProviderUI } from "../../utils/pricing";

export default function AdminProviders({ isEmbedded = false }) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form State
  const [currentId, setCurrentId] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/providers");
      if (res.data && res.data.success) {
        setProviders(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch providers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleEdit = (provider) => {
    setCurrentId(provider._id);
    setName(provider.name);
    setImage(provider.image || "");
  };

  const handleClearForm = () => {
    setCurrentId(null);
    setName("");
    setImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Provider name is required");

    setIsSaving(true);
    try {
      const payload = { name, image };
      
      if (currentId) {
        await api.put(`/providers/${currentId}`, payload);
      } else {
        await api.post("/providers", payload);
      }
      
      handleClearForm();
      fetchProviders();
    } catch (err) {
      console.error("Failed to save provider", err);
      alert(err.response?.data?.error || "Error saving provider");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this provider? It might be used in pricing configurations!")) {
      try {
        await api.delete(`/providers/${id}`);
        if (currentId === id) {
          handleClearForm();
        }
        fetchProviders();
      } catch (err) {
        console.error("Failed to delete", err);
        alert("Failed to delete provider");
      }
    }
  };

  const filteredProviders = providers.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`space-y-6 mx-auto font-sans ${isEmbedded ? '' : 'max-w-6xl'}`}>
      {!isEmbedded && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Service Provider Images</h1>
            <p className="text-sm text-slate-500 mt-1">Manage global logos for courier service providers.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: List */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col h-[700px]">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-white"
              />
            </div>
            <span className="text-xs font-bold text-slate-400 bg-white px-2.5 py-1 border border-slate-200 rounded-lg shadow-sm">
              {filteredProviders.length} Providers
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {loading ? (
              <div className="text-center p-8 text-slate-400 text-sm font-semibold">Loading providers...</div>
            ) : filteredProviders.length === 0 ? (
              <div className="text-center p-12 border-2 border-dashed border-slate-200 rounded-2xl">
                <ImageIcon className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-semibold text-sm">No service providers found.</p>
                <p className="text-slate-400 text-xs mt-1">Add a new provider using the form.</p>
              </div>
            ) : (
              filteredProviders.map((provider) => (
                <div 
                  key={provider._id} 
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${currentId === provider._id ? 'border-primary bg-primary/5 shadow-sm' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm bg-white'}`}
                >
                  <div className="h-12 shrink-0 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden px-4">
                    {provider.image ? (
                      <img src={provider.image} alt={provider.name} className="h-full w-auto max-w-[80px] object-contain mix-blend-multiply" />
                    ) : (
                      getProviderUI(provider.name).logoNode
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{provider.name}</h3>
                    {provider.image ? (
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 mt-1 inline-block">Custom Image</span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 mt-1 inline-block">Default Logo</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(provider)}
                      className={`p-2 rounded-xl transition-colors ${currentId === provider._id ? 'bg-primary text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(provider._id)}
                      className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-5 sticky top-24">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              {currentId ? (
                <><Edit2 className="h-4 w-4 text-primary" /> Edit Provider</>
              ) : (
                <><Plus className="h-4 w-4 text-primary" /> Add Provider</>
              )}
            </h3>
            {currentId && (
              <button 
                onClick={handleClearForm}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                Clear Form
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Provider Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., DHL, UPS, FedEx"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-primary focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide block">Provider Logo Image</label>
              <p className="text-xs text-slate-400 mb-2">Upload a transparent PNG or SVG logo for best results.</p>
              
              <ImageUpload 
                defaultUrl={image}
                onUploadSuccess={(url) => setImage(url)}
              />
              
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-2 text-[10px] font-bold text-slate-400 uppercase">OR</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>
              
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Paste direct Image URL here..."
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-sm transition-all disabled:opacity-70"
              >
                {isSaving ? (
                  <span className="animate-pulse">Saving...</span>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {currentId ? "Update Provider" : "Save New Provider"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
