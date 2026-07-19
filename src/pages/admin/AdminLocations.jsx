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
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../components/ui/ImageUpload";

export default function AdminLocations() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Global images state
  const [documentImage, setDocumentImage] = useState("");
  const [isSavingImages, setIsSavingImages] = useState(false);

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

  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings");
      if (res.data && res.data.success && res.data.data) {
        setDocumentImage(res.data.data.documentImage || "");
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  };

  useEffect(() => {
    fetchLocations();
    fetchSettings();
  }, []);

  const handleSaveGlobalImages = async () => {
    setIsSavingImages(true);
    try {
      await api.put("/settings", { documentImage });
      alert("Global document image updated successfully!");
    } catch (err) {
      console.error("Error saving global images:", err);
      alert("Failed to save global image.");
    } finally {
      setIsSavingImages(false);
    }
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

  // Delete Location
  const handleDeleteLocation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this route? This will remove its metadata page.")) return;
    try {
      const res = await api.delete(`/locations/${id}`);
      if (res.data && res.data.success) {
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
          onClick={() => navigate('/admin/locations/new/edit')}
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-2 shadow-sm transition-all"
        >
          <Plus size={16} />
          Add Location
        </button>

      </div>

      {/* Global Images Panel */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-5 md:p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Locations Page Banner</h2>
            <p className="text-[10px] text-slate-400 mt-0.5">Upload a banner image to Cloudinary to update the main Locations page cover banner.</p>
          </div>
          <button
            onClick={handleSaveGlobalImages}
            disabled={isSavingImages}
            className="px-4 py-2 bg-[#0052CC] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#0052CC]/90 transition-colors disabled:opacity-50"
          >
            {isSavingImages ? "Saving..." : "Save Image Link"}
          </button>
        </div>
        <div className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-4">
          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">Cover Banner Image</label>
          <ImageUpload 
            defaultUrl={documentImage}
            onUploadSuccess={(url) => setDocumentImage(url)}
          />
        </div>
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
                          onClick={() => navigate(`/admin/locations/${l._id}/edit`)}
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
    </div>
  );
}
