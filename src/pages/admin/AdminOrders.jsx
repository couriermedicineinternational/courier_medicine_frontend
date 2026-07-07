import { useState, useEffect } from "react";
import { 
  Package, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import api from "../../utils/api";

const parseReceiverDetails = (destinationAddress, destinationCountry) => {
  if (!destinationAddress) return { name: "N/A", phone: "N/A", email: "N/A", address: destinationCountry || "N/A" };
  
  const nameMatch = destinationAddress.match(/Name:\s*(.+)/i);
  const phoneMatch = destinationAddress.match(/Phone:\s*(.+)/i);
  const emailMatch = destinationAddress.match(/Email:\s*(.+)/i);
  const addressMatch = destinationAddress.match(/Address:\s*([\s\S]+)/i);
  
  if (nameMatch || phoneMatch) {
    return {
      name: nameMatch ? nameMatch[1].trim() : "N/A",
      phone: phoneMatch ? phoneMatch[1].trim() : "N/A",
      email: emailMatch ? emailMatch[1].trim() : "N/A",
      address: addressMatch ? addressMatch[1].trim() : destinationAddress
    };
  }
  
  return {
    name: "Receiver",
    phone: "N/A",
    email: "N/A",
    address: destinationAddress
  };
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch orders list
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const params = {
        page,
        limit: 10,
        search: search || undefined,
        status: statusFilter || undefined
      };
      const res = await api.get("/orders", { params });
      if (res.data && res.data.success) {
        setOrders(res.data.data || []);
        setPagination(res.data.pagination || { page: 1, limit: 10, total: 0, pages: 1 });
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchOrders();
  };


  // Quick status change from datatable
  const handleQuickStatusChange = async (orderId, newStatus) => {
    try {
      setIsLoading(true);
      const res = await api.put(`/orders/${orderId}/status`, { status: newStatus });
      if (res.data && res.data.success) {
        fetchOrders();
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert(err.response?.data?.message || "Failed to update status.");
    } finally {
      setIsLoading(false);
    }
  };



  // Status mapping
  const statuses = [
    { value: "booking_confirmed", label: "Booking Confirmed" },
    { value: "dispatched", label: "Dispatched" },
    { value: "delivered", label: "Delivered" }
  ];

  const statusBadges = {
    booking_confirmed: "bg-blue-50 text-blue-700 border-blue-100",
    pickup_scheduled: "bg-yellow-50 text-yellow-700 border-yellow-100",
    picked_up: "bg-indigo-50 text-indigo-700 border-indigo-100",
    reached_warehouse: "bg-purple-50 text-purple-700 border-purple-100",
    photo_verified: "bg-sky-50 text-sky-700 border-sky-100",
    documentation_prepared: "bg-violet-50 text-violet-700 border-violet-100",
    packing_done: "bg-pink-50 text-pink-700 border-pink-100",
    customs_clearance: "bg-amber-50 text-amber-700 border-amber-100",
    dispatched: "bg-orange-50 text-orange-700 border-orange-100",
    in_transit: "bg-teal-50 text-teal-700 border-teal-100",
    out_for_delivery: "bg-yellow-50 text-yellow-800 border-yellow-200",
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
    cancelled: "bg-rose-50 text-rose-700 border-rose-100",
    returned: "bg-slate-100 text-slate-700 border-slate-200"
  };

  const getStatusLabel = (val) => {
    return statuses.find(s => s.value === val)?.label || val;
  };

  return (
    <div id="admin-orders-page" className="space-y-6 font-sans">
      
      {/* 1. Header controls & Search */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            id="orders-search-input"
            type="text"
            placeholder="Search booking ref, customer name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/70 hover:border-slate-350 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
          />
        </form>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Status:</span>
          </div>
          <select
            id="orders-status-filter"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-slate-50 border border-slate-200/70 focus:outline-none focus:ring-1 focus:ring-primary px-3 py-2 rounded-xl text-xs font-bold text-slate-700 transition-all"
          >
            <option value="">All Statuses</option>
            {statuses.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

      </div>

      {/* 2. Main Datatable */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <span className="text-xs font-semibold text-slate-500">Retrieving cargo logs...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <Package className="mx-auto text-slate-200 mb-3" size={48} />
            <p className="text-sm font-bold text-slate-800">No shipments found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  <th className="px-2 sm:px-3 py-3 whitespace-nowrap">Booking Ref</th>
                  <th className="px-2 sm:px-3 py-3 min-w-[140px]">Sender Details</th>
                  <th className="px-2 sm:px-3 py-3 min-w-[140px]">Receiver Details</th>
                  <th className="px-2 sm:px-3 py-3 min-w-[80px]">Route</th>
                  <th className="px-2 sm:px-3 py-3 min-w-[70px]">Provider</th>
                  <th className="px-2 sm:px-3 py-3 min-w-[70px]">Est. Delivery</th>
                  <th className="px-2 sm:px-3 py-3 min-w-[100px]">Price</th>
                  <th className="px-2 sm:px-3 py-3 min-w-[120px]">Status</th>
                  <th className="px-2 sm:px-3 py-3 min-w-[80px]">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-2 sm:px-3 py-3 whitespace-nowrap">
                      <span className="font-extrabold text-slate-900 tracking-wider font-mono">{order.bookingRef}</span>
                    </td>
                    <td className="px-2 sm:px-3 py-3">
                      {order.originAddress && order.originAddress.includes("Buy Medicines") ? (
                        <div className="flex flex-col items-start justify-center p-1.5 bg-indigo-50/50 border border-indigo-100/50 rounded-lg max-w-[160px]">
                          <span className="text-[9px] font-extrabold text-indigo-500 uppercase tracking-wider">Buy on Behalf</span>
                          <span className="text-[8px] font-semibold text-indigo-400/80 mt-0.5">Receiver details only</span>
                        </div>
                      ) : (
                        <div className="flex flex-col max-w-[160px]">
                          <span className="font-extrabold text-slate-900 text-xs truncate">{order.customerName}</span>
                          <span className="text-[9px] text-slate-500 mt-0.5 font-semibold">{order.customerPhone}</span>
                          {order.customerEmail && (
                            <span className="text-[9px] text-slate-400 mt-0.5 font-sans break-all">{order.customerEmail}</span>
                          )}
                          <span className="text-[9px] text-slate-400 mt-0.5 font-sans whitespace-normal break-words leading-tight">
                            {order.originAddress || order.customerAddress || order.originCity || "N/A"}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-2 sm:px-3 py-3">
                      {(() => {
                        const rec = parseReceiverDetails(order.destinationAddress, order.destinationCountry);
                        return (
                          <div className="flex flex-col max-w-[160px]">
                            <span className="font-extrabold text-slate-900 text-xs truncate">{rec.name}</span>
                            <span className="text-[9px] text-slate-500 mt-0.5 font-semibold">{rec.phone}</span>
                            {rec.email && rec.email !== "N/A" && (
                              <span className="text-[9px] text-slate-400 mt-0.5 font-sans break-all">{rec.email}</span>
                            )}
                            <span className="text-[9px] text-slate-400 mt-0.5 font-sans whitespace-normal break-words leading-tight">
                              {rec.address}
                            </span>
                          </div>
                        );
                      })()}
                    </td>
                    <td className="px-2 sm:px-3 py-3">
                      <span className="font-extrabold text-slate-900 bg-[#0052CC]/5 text-[#0052CC] px-2 py-0.5 rounded-full text-[10px] tracking-wide inline-block max-w-full truncate" title={order.destinationCountry}>
                        {order.destinationCountry}
                      </span>
                    </td>
                    <td className="px-2 sm:px-3 py-3 whitespace-nowrap">
                      <span className="font-extrabold text-slate-800 text-[10px]">{order.courierPartner || "—"}</span>
                    </td>
                    <td className="px-2 sm:px-3 py-3 whitespace-nowrap">
                      <span className="text-[10px] text-slate-600 font-bold">{order.estimatedDeliveryTime || "—"}</span>
                    </td>
                    <td className="px-2 sm:px-3 py-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500">Base: <span className="font-extrabold text-slate-800">₹{order.basePrice?.toLocaleString("en-IN") || 0}</span></span>
                        <span className="text-[9px] text-emerald-600 mt-0.5">+GST: <span className="font-extrabold">₹{Math.round((order.basePrice || 0) * 0.18).toLocaleString("en-IN")}</span></span>
                        <span className="text-[10px] font-extrabold text-slate-900 mt-0.5 border-t border-slate-100 pt-0.5">Total: ₹{order.finalPrice?.toLocaleString("en-IN") || 0}</span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3 py-3 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleQuickStatusChange(order._id, e.target.value)}
                        className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase border cursor-pointer focus:outline-none ${
                          statusBadges[order.status] || "bg-slate-50 text-slate-500 border-slate-100"
                        }`}
                      >
                        {statuses.map((s) => (
                          <option key={s.value} value={s.value} className="bg-white text-slate-700 normal-case font-semibold text-xs">
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 sm:px-3 py-3 whitespace-nowrap text-slate-500 text-[10px]">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
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



    </div>
  );
}
