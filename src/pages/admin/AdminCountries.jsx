import { useState, useEffect } from "react";
import { 
  Globe, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Info,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import api from "../../utils/api";

export default function AdminCountries() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null); // null when adding new
  const [form, setForm] = useState({ name: "", code: "", slug: "", basePrice: 3000, advice: "", isActive: true });

  // Sync slug as name changes in add mode
  const handleNameChange = (val) => {
    const updatedForm = { ...form, name: val };
    if (!selectedCountry) {
      updatedForm.slug = val.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    setForm(updatedForm);
  };
  
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch countries list
  const fetchCountries = async () => {
    try {
      setIsLoading(true);
      // Fetch all including inactive for admin management panel
      const res = await api.get("/countries", { params: { all: "true" } });
      if (res.data && res.data.success) {
        setCountries(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching countries:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Filter list locally for snappy UI
  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  // Open modal
  const openModal = (country = null) => {
    setSelectedCountry(country);
    if (country) {
      setForm({
        name: country.name || "",
        code: country.code || "",
        slug: country.slug || "",
        basePrice: country.basePrice || 3000,
        advice: country.advice || "",
        isActive: country.isActive !== undefined ? country.isActive : true
      });
    } else {
      setForm({ name: "", code: "", slug: "", basePrice: 3000, advice: "", isActive: true });
    }
    setSaveError("");
    setIsModalOpen(true);
  };

  // Save Country (Create or Update)
  const handleSaveCountry = async (e) => {
    e.preventDefault();
    setSaveError("");
    setIsSaving(true);
    try {
      if (selectedCountry) {
        // Update
        const res = await api.put(`/countries/${selectedCountry._id}`, form);
        if (res.data && res.data.success) {
          setIsModalOpen(false);
          fetchCountries();
        }
      } else {
        // Create
        const res = await api.post("/countries", form);
        if (res.data && res.data.success) {
          setIsModalOpen(false);
          fetchCountries();
        }
      }
    } catch (err) {
      console.error("Error saving country:", err);
      setSaveError(err.response?.data?.message || "Failed to save country configuration.");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Country
  const handleDeleteCountry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this country? All location routes mapping to this country might need cleanup.")) return;
    try {
      const res = await api.delete(`/countries/${id}`);
      if (res.data && res.data.success) {
        setIsModalOpen(false);
        fetchCountries();
      }
    } catch (err) {
      console.error("Error deleting country:", err);
      alert("Failed to delete country.");
    }
  };

  return (
    <div id="admin-countries-page" className="space-y-6 font-sans">
      
      {/* Header Panel */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search country name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/70 hover:border-slate-350 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary pl-9 pr-4 py-2 rounded-xl text-xs font-semibold transition-all"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={() => openModal(null)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm shadow-primary/10"
        >
          <Plus size={14} />
          Add Country
        </button>

      </div>

      {/* Datatable */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <span className="text-xs font-semibold text-slate-500">Accessing border logs...</span>
          </div>
        ) : filteredCountries.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <Globe className="mx-auto text-slate-200 mb-3" size={48} />
            <p className="text-sm font-bold text-slate-800">No countries registered</p>
            <p className="text-xs text-slate-400 mt-1">Add a new shipping destination using the button above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4 whitespace-nowrap">Country Code</th>
                  <th className="px-6 py-4 whitespace-nowrap">Country Name</th>
                  <th className="px-6 py-4 whitespace-nowrap">Base Price</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {filteredCountries.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-extrabold text-slate-900 tracking-wider font-mono">{c.code}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-900">
                      <span>{c.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-extrabold text-slate-900">
                      ₹{c.basePrice?.toLocaleString("en-IN") || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                        c.isActive 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}>
                        {c.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(c)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-black uppercase text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                        >
                          <Edit size={12} />
                          Configure
                        </button>
                        <button
                          onClick={() => handleDeleteCountry(c._id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-[10px] font-black uppercase text-red-500 bg-white hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/70 rounded-3xl max-w-lg w-full overflow-hidden flex flex-col shadow-2xl animate-scaleUp">
            
            {/* Header */}
            <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 shrink-0 bg-slate-50/50">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                {selectedCountry ? "Configure Destination Country" : "Register New Country"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Error notifications */}
            {saveError && (
              <div className="bg-red-500/10 border-b border-red-500/20 text-red-500 px-6 py-3 text-xs font-semibold flex items-center gap-2">
                <Info size={14} />
                <span>{saveError}</span>
              </div>
            )}

            {/* Form body */}
            <form onSubmit={handleSaveCountry}>
              <div className="p-6 space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Country Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                      placeholder="e.g. France"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Country Code (2 letters)</label>
                    <input
                      type="text"
                      value={form.code}
                      onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                      placeholder="e.g. FR"
                      maxLength={2}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">URL SEO Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase() })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold font-mono"
                    placeholder="e.g. france"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Base Price (INR ₹)</label>
                  <input
                    type="number"
                    value={form.basePrice}
                    onChange={(e) => setForm({ ...form, basePrice: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Customs Advice / regulatory Framework</label>
                  <textarea
                    value={form.advice}
                    onChange={(e) => setForm({ ...form, advice: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold h-28 resize-none"
                    placeholder="Enter special customs duty and pharmaceutical clearance rules required by this country..."
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    id="country-is-active"
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-4 h-4 text-primary bg-slate-50 border-slate-200 rounded focus:ring-primary focus:ring-1"
                  />
                  <label htmlFor="country-is-active" className="text-xs font-bold text-slate-700">
                    Publish this country dynamically to home page calculator
                  </label>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {selectedCountry && (
                  <button
                    type="button"
                    onClick={() => handleDeleteCountry(selectedCountry._id)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-[10px] font-black uppercase text-red-500 hover:bg-red-50 transition-colors order-last sm:order-first"
                  >
                    <Trash2 size={13} />
                    Delete Country
                  </button>
                )}
                <div className="flex gap-2 justify-end flex-1">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Settings"}
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
