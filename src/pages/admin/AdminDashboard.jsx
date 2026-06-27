import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Package, 
  FileText, 
  Mail, 
  HelpCircle, 
  ChevronRight, 
  TrendingUp, 
  MapPin, 
  Clock, 
  User 
} from "lucide-react";
import api from "../../utils/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [statsRes, quotesRes, contactsRes] = await Promise.all([
          api.get("/dashboard/stats"),
          api.get("/quotes?limit=5"),
          api.get("/contacts?limit=5")
        ]);

        if (statsRes.data && statsRes.data.success) {
          setStats(statsRes.data.data);
        }
        if (quotesRes.data && quotesRes.data.success) {
          setRecentQuotes(quotesRes.data.data || []);
        }
        if (contactsRes.data && contactsRes.data.success) {
          setRecentContacts(contactsRes.data.data || []);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Shimmer Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 h-28 animate-pulse flex items-center justify-between">
              <div className="space-y-3 flex-1">
                <div className="h-3 w-16 bg-slate-100 rounded" />
                <div className="h-6 w-10 bg-slate-100 rounded" />
              </div>
              <div className="h-10 w-10 bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
        
        {/* Shimmer Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 h-96 animate-pulse" />
          <div className="bg-white border border-slate-100 rounded-2xl p-6 h-96 animate-pulse" />
        </div>
      </div>
    );
  }

  const summary = stats?.summary || {
    totalOrders: 0,
    totalQuotes: 0,
    totalContacts: 0,
    unreadContacts: 0,
    newQuotesToday: 0
  };



  return (
    <div id="admin-dashboard-page" className="flex flex-col min-h-[calc(100vh-10rem)] font-sans gap-5">
      
      {/* 1. Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        
        {/* Total Orders Card */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Total Orders</span>
            <span className="text-2xl font-black text-slate-800 block">{summary.totalOrders}</span>
            <span className="text-[10px] text-slate-400 font-bold block">Active Shipments</span>
          </div>
          <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl shrink-0">
            <Package size={22} />
          </div>
        </div>

        {/* Public Bookings Card */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Public Bookings</span>
            <span className="text-2xl font-black text-slate-800 block">{summary.publicOrders || 0}</span>
            <span className="text-[10px] text-slate-400 font-bold block">Direct Checkout Hits</span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-xl shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
        </div>

        {/* Total Visitors Card */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Total Visitors</span>
            <span className="text-2xl font-black text-slate-800 block">{summary.totalQuotes}</span>
            <span className="text-[10px] text-slate-400 font-bold block">{summary.newQuotesToday} visitors today</span>
          </div>
          <div className="w-12 h-12 bg-secondary/15 text-secondary flex items-center justify-center rounded-xl shrink-0">
            <FileText size={22} />
          </div>
        </div>

        {/* Total Contacts Card */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Inquiries</span>
            <span className="text-2xl font-black text-slate-800 block">{summary.totalContacts}</span>
            <span className="text-[10px] text-slate-400 font-bold block">{summary.unreadContacts} unread inquiries</span>
          </div>
          <div className="w-12 h-12 bg-teal-50 text-teal-600 flex items-center justify-center rounded-xl shrink-0">
            <Mail size={22} />
          </div>
        </div>

        {/* Today's Velocity Card */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">New Today</span>
            <span className="text-2xl font-black text-slate-800 block">{summary.newQuotesToday}</span>
            <span className="text-[10px] text-slate-400 font-bold block">Visitors and Hits</span>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-xl shrink-0">
            <TrendingUp size={22} />
          </div>
        </div>

      </div>


      {/* 3. Recent Activity Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        {/* Recent Visitors */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-4 sm:p-5 md:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3">Recent Visitors</h3>
            {recentQuotes.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs font-semibold">No visitors logged yet</div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-[260px] overflow-y-auto pr-1">
                {recentQuotes.map((item) => (
                  <div key={item._id} className="py-2.5 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{item.mobile || "Unknown Sender"}</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                        {item.originCity} ➔ {item.destinationCountry} • {item.weight} Kg
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-slate-850">₹{item.estimatedPrice?.toLocaleString("en-IN") || 0}</span>
                      <span className={`block text-[9px] font-extrabold uppercase mt-0.5 ${
                        item.status === 'confirmed' ? 'text-emerald-500' : 'text-amber-500'
                      }`}>
                        {item.status || 'pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
            <Link to="/admin/quotes" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/90 hover:underline">
              View All Visitors
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-4 sm:p-5 md:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3">Recent Inquiries</h3>
            {recentContacts.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs font-semibold">No contact inquiries submitted yet</div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-[260px] overflow-y-auto pr-1">
                {recentContacts.map((item) => (
                  <div key={item._id} className="py-2.5 flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-850 truncate">{item.name || "Unknown"}</span>
                        {item.status === 'unread' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">{item.email}</p>
                      <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-1 italic">"{item.message}"</p>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase shrink-0 mt-0.5">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
            <Link to="/admin/contacts" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/90 hover:underline">
              View All Inquiries
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
