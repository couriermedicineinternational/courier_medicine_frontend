import { useState, useEffect } from "react";
import { 
  FileText, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  X, 
  XCircle,
  CheckCircle, 
  MapPin, 
  Info,
  PackagePlus,
  Trash2
} from "lucide-react";
import api from "../../utils/api";

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Convert modal states
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({});
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch quotes list
  const fetchQuotes = async () => {
    try {
      setIsLoading(true);
      const params = {
        page,
        limit: 10,
        search: search || undefined,
        status: statusFilter || undefined
      };
      const res = await api.get("/quotes", { params });
      if (res.data && res.data.success) {
        setQuotes(res.data.data || []);
        setPagination(res.data.pagination || { page: 1, limit: 10, total: 0, pages: 1 });
      }
    } catch (err) {
      console.error("Error fetching quotes:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [page, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchQuotes();
  };

  // Open "Convert to Order" Wizard
  const openConvertWizard = (quote) => {
    setSelectedQuote(quote);
    setOrderForm({
      quoteRequest: quote._id,
      bookingRef: "",
      // Sender
      senderName: "",
      senderPhone: quote.mobile || "",
      senderEmail: "",
      senderPickupDate: "",
      senderPickupAddress: "",
      // Receiver
      receiverName: "",
      receiverPhone: "",
      receiverEmail: "",
      medicineUsedFor: "Diabetes",
      receiverDeliveryAddress: "",
      // Legacy / backend required
      customerName: "",
      customerEmail: "",
      customerPhone: quote.mobile || "",
      customerAddress: "",
      originCity: quote.locationName || quote.location || "",
      originAddress: "",
      destinationCountry: quote.countryName || "",
      destinationCountryCode: quote.country || "",
      destinationAddress: "",
      destinationCity: "",
      medicineType: quote.medicineType || "",
      weight: quote.weight || 0.5,
      basePrice: quote.estimatedPrice || 0,
      finalPrice: quote.estimatedPrice || 0,
      paymentStatus: "pending",
      status: "booking_confirmed",
      currentLocation: quote.locationName || quote.location || "",
      courierPartner: "",
      courierTrackingId: "",
      estimatedDelivery: "",
      notes: `Converted from quote request ref: ${quote._id}`
    });
    setSaveError("");
    setIsConvertModalOpen(true);
  };

  // Submit Converted Order
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setSaveError("");
    setIsSaving(true);
    try {
      const res = await api.post("/orders", orderForm);
      if (res.data && res.data.success) {
        setIsConvertModalOpen(false);
        fetchQuotes(); // Refresh quote statuses (will show as confirmed)
      }
    } catch (err) {
      console.error("Conversion failed:", err);
      setSaveError(err.response?.data?.message || "Failed to create shipment order.");
    } finally {
      setIsSaving(false);
    }
  };

  // Mark quote as Not Confirmed (rejected)
  const handleMarkRejected = async (quoteId) => {
    try {
      const res = await api.put(`/quotes/${quoteId}`, { status: "rejected" });
      if (res.data && res.data.success) {
        setQuotes(prev => prev.map(q => q._id === quoteId ? { ...q, status: "rejected" } : q));
      }
    } catch (err) {
      console.error("Failed to mark as rejected:", err);
    }
  };

  // Delete visitor (soft delete)
  const handleDeleteQuote = async (quoteId) => {
    if (!window.confirm("Are you sure you want to delete this visitor entry?")) return;
    try {
      const res = await api.delete(`/quotes/${quoteId}`);
      if (res.data && res.data.success) {
        setQuotes(prev => prev.filter(q => q._id !== quoteId));
      }
    } catch (err) {
      console.error("Failed to delete visitor entry:", err);
      alert("Failed to delete visitor entry.");
    }
  };

  return (
    <div id="admin-quotes-page" className="space-y-6 font-sans">
      
      {/* 1. Filter Panel */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            id="quotes-search-input"
            type="text"
            placeholder="Search by sender name or mobile digits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/70 hover:border-slate-350 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
          />
        </form>

        {/* Status filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Status:</span>
          </div>
          <select
            id="quotes-status-filter"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-slate-50 border border-slate-200/70 focus:outline-none focus:ring-1 focus:ring-primary px-3 py-2 rounded-xl text-xs font-bold text-slate-700 transition-all"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Not Confirmed</option>
          </select>
        </div>

      </div>

      {/* 2. Main Datatable */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <span className="text-xs font-semibold text-slate-500">Reading calculator inputs...</span>
          </div>
        ) : quotes.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <FileText className="mx-auto text-slate-200 mb-3" size={48} />
            <p className="text-sm font-bold text-slate-800">No visitors found</p>
            <p className="text-xs text-slate-400 mt-1">Check back later or try adjusting search terms.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Mobile</th>
                  <th className="px-6 py-4 whitespace-nowrap">Medicine / Weight</th>
                  <th className="px-6 py-4 whitespace-nowrap">Est. Charge</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 whitespace-nowrap">Date Received</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {quotes.map((quote) => (
                  <tr key={quote._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-900">{quote.mobile || "N/A"}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">📦 {quote.countryName || quote.country || "—"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="capitalize">{quote.medicineType}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">
                          {quote.weight ? `${quote.weight} Kg` : (quote.notes?.includes('Above') ? 'Above 1 Kg' : '0.5 Kg')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-extrabold text-slate-900">
                      ₹{quote.estimatedPrice?.toLocaleString("en-IN") || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                        quote.status === "confirmed" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : quote.status === "rejected"
                          ? "bg-red-50 text-red-600 border-red-100"
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}>
                        {quote.status === "rejected" ? "Not Confirmed" : quote.status || "new"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                      {new Date(quote.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {quote.status === "confirmed" ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-600">
                            <CheckCircle size={12} />
                            Converted
                          </span>
                        ) : quote.status === "rejected" ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-red-500">
                            <XCircle size={12} />
                            Not Confirmed
                          </span>
                        ) : (
                          <div className="flex flex-col items-end gap-1.5 w-[130px]">
                            <button
                              onClick={() => openConvertWizard(quote)}
                              className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white text-[9px] font-black uppercase shadow-sm transition-all hover:scale-[1.02] whitespace-nowrap"
                            >
                              <PackagePlus size={11} />
                              Convert to Order
                            </button>
                            <button
                              onClick={() => handleMarkRejected(quote._id)}
                              className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-[9px] font-black uppercase transition-all hover:scale-[1.02] whitespace-nowrap"
                              title="Mark as Not Confirmed"
                            >
                              <XCircle size={12} />
                              Not Confirmed
                            </button>
                          </div>
                        )}

                        <button
                          onClick={() => handleDeleteQuote(quote._id)}
                          className="p-2 border border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 rounded-lg transition-colors flex items-center justify-center shrink-0 self-center"
                          title="Delete Quote"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-400">
              Showing page {pagination.page} of {pagination.pages} ({pagination.total} entries)
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
                disabled={page >= pagination.pages}
                onClick={() => setPage(prev => prev + 1)}
                className="p-2 border border-slate-200/80 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 3. Convert To Order Modal Wizard */}
      {isConvertModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/70 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-scaleUp">
            
            {/* Modal Header */}
            <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 shrink-0 bg-slate-50/50">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                Convert Calculator Inquiry to Active Order
              </h3>
              <button 
                onClick={() => setIsConvertModalOpen(false)}
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

            {/* Form */}
            <form onSubmit={handleCreateOrder} className="flex-1 overflow-y-auto flex flex-col justify-between">
              
              <div className="p-6 space-y-8">

                 {/* ─── SENDER DETAILS ─── */}
                 <div>
                   <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-200">Sender Details</h4>
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     <div className="space-y-1">
                       <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Name *</label>
                       <input
                         type="text"
                         placeholder="Your Full Name"
                         value={orderForm.senderName}
                         onChange={(e) => setOrderForm({ ...orderForm, senderName: e.target.value, customerName: e.target.value })}
                         className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                         required
                       />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Contact Number *</label>
                       <input
                         type="text"
                         placeholder="10 Digit Mobile No"
                         value={orderForm.senderPhone}
                         onChange={(e) => setOrderForm({ ...orderForm, senderPhone: e.target.value, customerPhone: e.target.value })}
                         className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                         required
                       />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Email Address</label>
                       <input
                         type="email"
                         placeholder="Email address"
                         value={orderForm.senderEmail}
                         onChange={(e) => setOrderForm({ ...orderForm, senderEmail: e.target.value, customerEmail: e.target.value })}
                         className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                       />
                     </div>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                     <div className="space-y-1">
                       <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Pick Up Date *</label>
                       <input
                         type="date"
                         value={orderForm.senderPickupDate}
                         onChange={(e) => setOrderForm({ ...orderForm, senderPickupDate: e.target.value })}
                         className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                         required
                       />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Pick Up Address with Pin Code *</label>
                       <input
                         type="text"
                         placeholder="Enter complete pickup street details and pin code"
                         value={orderForm.senderPickupAddress}
                         onChange={(e) => setOrderForm({ ...orderForm, senderPickupAddress: e.target.value, originAddress: e.target.value, customerAddress: e.target.value })}
                         className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                         required
                       />
                     </div>
                   </div>
                 </div>

                 {/* ─── RECEIVER DETAILS ─── */}
                 <div>
                   <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-200">Receiver Details</h4>
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     <div className="space-y-1">
                       <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Name *</label>
                       <input
                         type="text"
                         placeholder="Your Full Name"
                         value={orderForm.receiverName}
                         onChange={(e) => setOrderForm({ ...orderForm, receiverName: e.target.value })}
                         className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                         required
                       />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Contact Number *</label>
                       <input
                         type="text"
                         placeholder="10 Digit Mobile No"
                         value={orderForm.receiverPhone}
                         onChange={(e) => setOrderForm({ ...orderForm, receiverPhone: e.target.value })}
                         className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                         required
                       />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Email Address</label>
                       <input
                         type="email"
                         placeholder="Email address"
                         value={orderForm.receiverEmail}
                         onChange={(e) => setOrderForm({ ...orderForm, receiverEmail: e.target.value })}
                         className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                       />
                     </div>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                     <div className="space-y-1">
                       <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Medicine Used For *</label>
                       <select
                         value={orderForm.medicineUsedFor}
                         onChange={(e) => setOrderForm({ ...orderForm, medicineUsedFor: e.target.value })}
                         className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700"
                         required
                       >
                         <option>Diabetes</option>
                         <option>Blood pressure</option>
                         <option>Cold cough</option>
                         <option>Fever</option>
                         <option>Sinusitis</option>
                         <option>Allergies</option>
                         <option>Heart related issues</option>
                         <option>Cancer</option>
                         <option>Thyroid</option>
                         <option>Other issues</option>
                       </select>
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Delivery Address with Zip Code *</label>
                       <input
                         type="text"
                         placeholder="Enter complete international destination street details and ZIP code"
                         value={orderForm.receiverDeliveryAddress}
                         onChange={(e) => setOrderForm({ ...orderForm, receiverDeliveryAddress: e.target.value, destinationAddress: e.target.value })}
                         className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                         required
                       />
                     </div>
                   </div>
                 </div>

                 {/* ─── CARGO SPECS & PRICING ─── */}
                 <div>
                   <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-200">Cargo Specs & Pricing</h4>
                   <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                     <div className="space-y-1">
                       <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Medicine Type</label>
                       <input
                         type="text"
                         value={orderForm.medicineType}
                         onChange={(e) => setOrderForm({ ...orderForm, medicineType: e.target.value })}
                         className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold capitalize"
                       />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Weight (Kg)</label>
                       <input
                         type="number"
                         step={0.5}
                         min={0.5}
                         value={orderForm.weight}
                         onChange={(e) => setOrderForm({ ...orderForm, weight: parseFloat(e.target.value) || 0.5 })}
                         className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                       />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Charged Price (₹)</label>
                       <input
                         type="number"
                         value={orderForm.finalPrice}
                         onChange={(e) => setOrderForm({ ...orderForm, finalPrice: parseInt(e.target.value) || 0 })}
                         className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                         required
                       />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Payment Status</label>
                       <select
                         value={orderForm.paymentStatus}
                         onChange={(e) => setOrderForm({ ...orderForm, paymentStatus: e.target.value })}
                         className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700"
                       >
                         <option value="pending">Pending</option>
                         <option value="paid">Paid</option>
                         <option value="failed">Failed</option>
                       </select>
                     </div>
                   </div>
                 </div>

               </div>

              {/* Actions footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsConvertModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSaving ? "Converting..." : "Complete & Generate Order"}
                  <ArrowRight size={14} />
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
