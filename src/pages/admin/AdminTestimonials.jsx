import { useState, useEffect } from "react";
import { 
  Star, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Info,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import api from "../../utils/api";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null); // null when adding new
  const [form, setForm] = useState({ name: "", review: "", rating: 5, isApproved: true });
  
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch testimonials list
  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      // Fetch all testimonials for moderation
      const res = await api.get("/testimonials", { params: { all: "true" } });
      if (res.data && res.data.success) {
        setTestimonials(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Filter list locally for snappy UI
  const filteredTestimonials = testimonials.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    (t.review || "").toLowerCase().includes(search.toLowerCase())
  );

  // Pagination parameters
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage) || 1;
  const paginatedTestimonials = filteredTestimonials.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Open modal
  const openModal = (tObj = null) => {
    setSelectedTestimonial(tObj);
    if (tObj) {
      setForm({
        name: tObj.name || "",
        review: tObj.review || "",
        rating: tObj.rating || 5,
        isApproved: tObj.isApproved !== undefined ? tObj.isApproved : true
      });
    } else {
      setForm({ name: "", review: "", rating: 5, isApproved: true });
    }
    setSaveError("");
    setIsModalOpen(true);
  };

  // Toggle approval state directly for quick moderation
  const handleToggleApproval = async (id, currentVal) => {
    try {
      const res = await api.put(`/testimonials/${id}`, { isApproved: !currentVal });
      if (res.data && res.data.success) {
        setTestimonials(prev => prev.map(t => t._id === id ? { ...t, isApproved: !currentVal } : t));
      }
    } catch (err) {
      console.error("Error toggling approval:", err);
      alert("Failed to moderate testimonial.");
    }
  };

  // Save Testimonial (Create or Update)
  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    setSaveError("");
    setIsSaving(true);
    try {
      if (selectedTestimonial) {
        // Update
        const res = await api.put(`/testimonials/${selectedTestimonial._id}`, form);
        if (res.data && res.data.success) {
          setIsModalOpen(false);
          fetchTestimonials();
        }
      } else {
        // Create (Admin submits pre-approved testimonial)
        const res = await api.post("/testimonials", form);
        if (res.data && res.data.success) {
          setIsModalOpen(false);
          fetchTestimonials();
        }
      }
    } catch (err) {
      console.error("Error saving testimonial:", err);
      setSaveError(err.response?.data?.message || "Failed to save review.");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Testimonial
  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await api.delete(`/testimonials/${id}`);
      if (res.data && res.data.success) {
        setIsModalOpen(false);
        fetchTestimonials();
      }
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      alert("Failed to delete review.");
    }
  };

  return (
    <div id="admin-testimonials-page" className="space-y-6 font-sans">
      
      {/* Header Panel */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by reviewer name or message..."
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
          Add Testimonial
        </button>

      </div>

      {/* Datatable */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <span className="text-xs font-semibold text-slate-500">Checking feedbacks...</span>
          </div>
        ) : paginatedTestimonials.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <Star className="mx-auto text-slate-200 mb-3" size={48} />
            <p className="text-sm font-bold text-slate-800">No testimonials found</p>
            <p className="text-xs text-slate-400 mt-1">Publish customer feedback reviews using the button above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4 whitespace-nowrap">Reviewer Name</th>
                  <th className="px-6 py-4 whitespace-nowrap">Rating</th>
                  <th className="px-6 py-4">Review Message</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {paginatedTestimonials.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-extrabold text-slate-900">
                      {t.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} size={13} fill="currentColor" />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 max-w-sm truncate italic">
                      "{t.review}"
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                        t.isApproved 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : "bg-rose-50 text-rose-700 border-rose-100"
                      }`}>
                        {t.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleApproval(t._id, t.isApproved)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[9px] font-black uppercase transition-colors ${
                            t.isApproved
                              ? "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100"
                              : "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100"
                          }`}
                        >
                          {t.isApproved ? "Suspend" : "Approve"}
                        </button>
                        <button
                          onClick={() => openModal(t)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-black uppercase text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                        >
                          <Edit size={12} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(t._id)}
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
              Showing page {page} of {totalPages} ({filteredTestimonials.length} total reviews)
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
                {selectedTestimonial ? "Edit Review Settings" : "Add Customer Testimonial"}
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
            <form onSubmit={handleSaveTestimonial}>
              <div className="p-6 space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Reviewer Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                      placeholder="e.g. Priyal Sharma"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Rating Stars (1-5)</label>
                    <select
                      value={form.rating}
                      onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })}
                      className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700"
                      required
                    >
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Good)</option>
                      <option value={3}>3 Stars (Average)</option>
                      <option value={2}>2 Stars (Poor)</option>
                      <option value={1}>1 Star (Unacceptable)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Feedback Message Details</label>
                  <textarea
                    value={form.review}
                    onChange={(e) => setForm({ ...form, review: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold h-28 resize-none"
                    placeholder="Provide details about their courier experience..."
                    required
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    id="testimonial-is-approved"
                    type="checkbox"
                    checked={form.isApproved}
                    onChange={(e) => setForm({ ...form, isApproved: e.target.checked })}
                    className="w-4 h-4 text-primary bg-slate-50 border-slate-200 rounded focus:ring-primary focus:ring-1"
                  />
                  <label htmlFor="testimonial-is-approved" className="text-xs font-bold text-slate-700">
                    Approve and show this review on public home page carousel
                  </label>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {selectedTestimonial && (
                  <button
                    type="button"
                    onClick={() => handleDeleteTestimonial(selectedTestimonial._id)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-[10px] font-black uppercase text-red-500 hover:bg-red-50 transition-colors order-last sm:order-first"
                  >
                    <Trash2 size={13} />
                    Delete Review
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
                    {isSaving ? "Saving..." : "Save Testimonial"}
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
