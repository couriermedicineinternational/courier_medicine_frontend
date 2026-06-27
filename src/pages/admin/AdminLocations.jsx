import { useState, useEffect } from "react";
import { 
  MapPin, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Info,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import api from "../../utils/api";

export default function AdminLocations() {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null); // null when adding new
  const [form, setForm] = useState({ 
    locationId: "", 
    city: "", 
    country: "", 
    name: "", 
    slug: "", 
    isActive: true 
  });
  
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch locations list
  const fetchLocations = async () => {
    try {
      setIsLoading(true);
      // Fetch all including inactive for admin management panel
      const res = await api.get("/locations", { params: { all: "true" } });
      if (res.data && res.data.success) {
        setLocations(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching locations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Sync route name/slug/id as city and country change in add mode
  const handleCityOrCountryChange = (field, value) => {
    const updatedForm = { ...form, [field]: value };
    
    // Only auto-generate in Create mode (when selectedLocation is null)
    if (!selectedLocation) {
      const cityClean = updatedForm.city.trim();
      const countryClean = updatedForm.country.trim();
      
      if (cityClean && countryClean) {
        const urlPart = `${cityClean.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-to-${countryClean.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        updatedForm.name = `${cityClean} to ${countryClean}`;
        updatedForm.locationId = urlPart;
        updatedForm.slug = `medicine-courier-from-${urlPart}.htm`;
      }
    }
    
    setForm(updatedForm);
  };

  // Filter list locally for snappy UI
  const filteredLocations = locations.filter(l => 
    l.city.toLowerCase().includes(search.toLowerCase()) || 
    l.country.toLowerCase().includes(search.toLowerCase()) ||
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination parameters
  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage) || 1;
  const paginatedLocations = filteredLocations.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Open modal
  const openModal = (locationObj = null) => {
    setSelectedLocation(locationObj);
    if (locationObj) {
      setForm({
        locationId: locationObj.locationId || "",
        city: locationObj.city || "",
        country: locationObj.country || "",
        name: locationObj.name || "",
        slug: locationObj.slug || "",
        isActive: locationObj.isActive !== undefined ? locationObj.isActive : true
      });
    } else {
      setForm({ locationId: "", city: "", country: "", name: "", slug: "", isActive: true });
    }
    setSaveError("");
    setIsModalOpen(true);
  };

  // Save Location (Create or Update)
  const handleSaveLocation = async (e) => {
    e.preventDefault();
    setSaveError("");
    setIsSaving(true);
    try {
      if (selectedLocation) {
        // Update
        const res = await api.put(`/locations/${selectedLocation._id}`, form);
        if (res.data && res.data.success) {
          setIsModalOpen(false);
          fetchLocations();
        }
      } else {
        // Create
        const res = await api.post("/locations", form);
        if (res.data && res.data.success) {
          setIsModalOpen(false);
          fetchLocations();
        }
      }
    } catch (err) {
      console.error("Error saving location:", err);
      setSaveError(err.response?.data?.message || "Failed to save location configuration.");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Location
  const handleDeleteLocation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this route? This will remove its metadata page.")) return;
    try {
      const res = await api.delete(`/locations/${id}`);
      if (res.data && res.data.success) {
        setIsModalOpen(false);
        fetchLocations();
      }
    } catch (err) {
      console.error("Error deleting location:", err);
      alert("Failed to delete location.");
    }
  };

  return (
    <div id="admin-locations-page" className="space-y-6 font-sans">
      
      {/* Header Panel */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by city, country, route name..."
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
          Add Location Route
        </button>

      </div>

      {/* Datatable */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <span className="text-xs font-semibold text-slate-500">Mapping logistics hubs...</span>
          </div>
        ) : paginatedLocations.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <MapPin className="mx-auto text-slate-200 mb-3" size={48} />
            <p className="text-sm font-bold text-slate-800">No location routes registered</p>
            <p className="text-xs text-slate-400 mt-1">Register a new courier pickup route using the button above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4 whitespace-nowrap">Pickup City</th>
                  <th className="px-6 py-4 whitespace-nowrap">Destination</th>
                  <th className="px-6 py-4 whitespace-nowrap">Route Route Name</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {paginatedLocations.map((l) => (
                  <tr key={l._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-900 font-extrabold">
                      {l.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span>{l.country}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 truncate max-w-xs font-mono">
                      {l.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                        l.isActive 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}>
                        {l.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(l)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-black uppercase text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                        >
                          <Edit size={12} />
                          Configure
                        </button>
                        <button
                          onClick={() => handleDeleteLocation(l._id)}
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

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-400">
              Showing page {page} of {totalPages} ({filteredLocations.length} total routes)
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(prev => prev - 1)}
                className="p-2 border border-slate-200/80 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(prev => prev + 1)}
                className="p-2 border border-slate-200/80 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
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
                {selectedLocation ? "Configure Location Route" : "Register New Pickup Route"}
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
            <form onSubmit={handleSaveLocation}>
              <div className="p-6 space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Pickup City</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => handleCityOrCountryChange("city", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                      placeholder="e.g. Pune"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Destination Country</label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={(e) => handleCityOrCountryChange("country", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                      placeholder="e.g. Canada"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Route Unique ID</label>
                  <input
                    type="text"
                    value={form.locationId}
                    onChange={(e) => setForm({ ...form, locationId: e.target.value })}
                    className="w-full bg-slate-100 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-500 font-mono"
                    placeholder="e.g. pune-to-canada"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Full Display Route Title</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                    placeholder="e.g. Pune to Canada"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">URL SEO Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold font-mono"
                    placeholder="e.g. medicine-courier-from-pune-to-canada.htm"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    id="location-is-active"
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-4 h-4 text-primary bg-slate-50 border-slate-200 rounded focus:ring-primary focus:ring-1"
                  />
                  <label htmlFor="location-is-active" className="text-xs font-bold text-slate-700">
                    Publish this route dynamically on directory lists
                  </label>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {selectedLocation && (
                  <button
                    type="button"
                    onClick={() => handleDeleteLocation(selectedLocation._id)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-[10px] font-black uppercase text-red-500 hover:bg-red-50 transition-colors order-last sm:order-first"
                  >
                    <Trash2 size={13} />
                    Delete Route
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
                    {isSaving ? "Saving..." : "Save Route"}
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
