import { useState, useEffect } from "react";
import { 
  Globe, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Info, CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../components/ui/ImageUpload";
import { Save } from "lucide-react";

export default function AdminCountries() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [heroImage, setHeroImage] = useState("");
  const [isSavingHero, setIsSavingHero] = useState(false);
  const [heroSaveSuccess, setHeroSaveSuccess] = useState(false);

  // Fetch countries list
  const fetchCountries = async () => {
    try {
      setIsLoading(true);
      // Fetch all including inactive for admin management panel
      
      // Fetch settings for global hero image
      const settingsRes = await api.get("/settings");
      if (settingsRes.data && settingsRes.data.success && settingsRes.data.data.countryHeroImage) {
        setHeroImage(settingsRes.data.data.countryHeroImage);
      }

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

  
  const handleSaveHero = async (e) => {
    e.preventDefault();
    setIsSavingHero(true);
    setHeroSaveSuccess(false);
    try {
      const res = await api.put("/settings", { countryHeroImage: heroImage });
      if (res.data && res.data.success) {
        setHeroSaveSuccess(true);
        setTimeout(() => setHeroSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Error saving hero image:", err);
      alert("Failed to save country hero image.");
    } finally {
      setIsSavingHero(false);
    }
  };

  // Filter list locally for snappy UI
  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  // Delete Country
  const handleDeleteCountry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this country? This will remove its destination page.")) return;
    try {
      const res = await api.delete(`/countries/${id}`);
      if (res.data && res.data.success) {
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
          onClick={() => navigate('/admin/countries/new/edit')}
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-2 shadow-sm transition-all"
        >
          <Plus size={16} />
          Add Country
        </button>

      </div>

      
      {/* Global Hero Image Settings */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">Global Country Background</h3>
            <p className="text-xs text-slate-400 mt-0.5">This image will appear as the top background on all country detail pages.</p>
          </div>
          {heroSaveSuccess && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 flex items-center gap-1.5">
              <CheckCircle2 size={12} />
              Saved successfully!
            </span>
          )}
        </div>
        <form onSubmit={handleSaveHero} className="space-y-4">
          <ImageUpload 
            key="country-hero-bg"
            defaultUrl={heroImage}
            onUploadSuccess={(url) => setHeroImage(url)}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSavingHero}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-50"
            >
              <Save size={13} />
              {isSavingHero ? "Saving..." : "Save Background Image"}
            </button>
          </div>
        </form>
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
                          onClick={() => navigate(`/admin/countries/${c._id}/edit`)}
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
    </div>
  );
}
