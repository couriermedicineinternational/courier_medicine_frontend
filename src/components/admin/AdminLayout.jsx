import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Mail, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User as UserIcon,
  Shield,
  Globe,
  MapPin,
  BookOpen,
  HelpCircle,
  Star,
  Layers,
  DollarSign,
  Image
} from "lucide-react";
import api from "../../utils/api";
import Logo from "../layout/Logo";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [isValidating, setIsValidating] = useState(true);

  // Grouped Navigation Configuration
  const navSections = [
    {
      title: "Core Operations",
      items: [
        { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Orders", path: "/admin/orders", icon: Package },
        { name: "Visitors", path: "/admin/quotes", icon: FileText },
        { name: "Contacts", path: "/admin/contacts", icon: Mail },
      ]
    },
    {
      title: "Directories & Content",
      items: [
        { name: "Countries", path: "/admin/countries", icon: Globe },
        { name: "Locations", path: "/admin/locations", icon: MapPin },
        { name: "Courier Pricing", path: "/admin/pricing", icon: DollarSign },
        { name: "Blogs", path: "/admin/blogs", icon: BookOpen },
        { name: "FAQs", path: "/admin/faqs", icon: HelpCircle },
        { name: "Homepage CMS", path: "/admin/homepage", icon: Layers },
        { name: "About Page CMS", path: "/admin/about", icon: Layers },
        { name: "Refund Policy CMS", path: "/admin/refund-policy", icon: Layers },
        { name: "Privacy Policy CMS", path: "/admin/privacy-policy", icon: Layers },
        { name: "Contact Page CMS", path: "/admin/contacts?mode=cms", icon: Mail },
      ]
    },
    {
      title: "Settings",
      items: [
        { name: "Site Settings", path: "/admin/settings", icon: Settings },
      ]
    }
  ];

  // Helper to flat list for headers and title resolving
  const allNavItems = navSections.flatMap(s => s.items);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    // Verify token and fetch profile
    api.get("/auth/me")
      .then(res => {
        if (res.data && res.data.success) {
          setAdminUser(res.data.data);
        } else {
          handleLogout();
        }
        setIsValidating(false);
      })
      .catch(err => {
        console.error("Token verification failed:", err);
        handleLogout();
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login", { replace: true });
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  if (isValidating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          <span className="text-sm font-semibold text-slate-500">Securing environment...</span>
        </div>
      </div>
    );
  }

  // Sidebar link renderer
  const renderNavSection = (section) => (
    <div key={section.title} className="space-y-2">
      <h4 className="px-4 text-[9px] font-extrabold text-slate-500 uppercase tracking-widest mt-4 first:mt-0">
        {section.title}
      </h4>
      <div className="space-y-1">
        {section.items.map((item) => {
          const Icon = item.icon;
          const isActive = (item.path === "/admin/dashboard" && (location.pathname === "/admin" || location.pathname === "/admin/dashboard")) ||
                           (item.path === "/admin/contacts" && location.pathname === "/admin/contacts" && !location.search.includes("mode=cms")) ||
                           (item.path === "/admin/contacts?mode=cms" && location.pathname === "/admin/contacts" && location.search.includes("mode=cms")) ||
                           (item.path !== "/admin/dashboard" && item.path !== "/admin/contacts" && item.path !== "/admin/contacts?mode=cms" && location.pathname === item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all ${
                isActive 
                  ? "bg-primary text-white shadow-md shadow-primary/10" 
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              <Icon size={14} className="shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div id="admin-dashboard-container" className="h-screen w-full flex overflow-hidden bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0">
        {/* Brand Header */}
        <div className="py-6 flex flex-col items-center justify-center border-b border-slate-800 gap-1 shrink-0">
          <Logo className="scale-[0.8] origin-center" hideSubtitle={true} />
          <span className="font-extrabold text-[10px] text-[#03ADA4] tracking-widest uppercase bg-[#03ADA4]/10 px-3 py-1 rounded-full mt-2.5">
            Admin Portal
          </span>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto dark-scrollbar">
          {navSections.map(renderNavSection)}
        </nav>

        {/* User profile footer info */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 flex flex-col gap-2 shrink-0">
          <div className="flex items-center gap-2 px-1">
            <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-white font-extrabold text-xs shrink-0 border border-slate-700">
              {adminUser?.name ? adminUser.name[0].toUpperCase() : "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-white truncate">{adminUser?.name || "Admin"}</p>
              <p className="text-[9px] text-slate-500 truncate">{adminUser?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-[10px] font-black uppercase text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut size={12} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* 2. Mobile Sidebar Drawer */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col transition-transform duration-300 lg:hidden ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="py-6 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
          <div className="flex flex-col items-start gap-1">
            <Logo className="scale-[0.7] origin-left -ml-1.5" hideSubtitle={true} />
            <span className="font-extrabold text-[9px] text-[#03ADA4] tracking-widest uppercase bg-[#03ADA4]/10 px-2.5 py-0.5 rounded-full mt-1.5">
              Admin Portal
            </span>
          </div>
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-850 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto dark-scrollbar">
          {navSections.map(renderNavSection)}
        </nav>

        <div className="p-3 border-t border-slate-800 bg-slate-950/40 flex flex-col gap-2 shrink-0">
          <div className="flex items-center gap-2 px-1">
            <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-white font-extrabold text-xs shrink-0 border border-slate-700">
              {adminUser?.name ? adminUser.name[0].toUpperCase() : "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-white truncate">{adminUser?.name || "Admin"}</p>
              <p className="text-[9px] text-slate-500 truncate">{adminUser?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-[10px] font-black uppercase text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut size={12} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* 3. Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200/85 flex items-center justify-between px-6 shrink-0 shadow-sm z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">
              {allNavItems.find(i => {
                if (i.path.includes("?")) {
                  return (location.pathname + location.search) === i.path;
                }
                return location.pathname === i.path && !location.search.includes("mode=cms");
              })?.name || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-800">{adminUser?.name || "Administrator"}</span>
              <span className="text-[9px] text-slate-400 font-extrabold tracking-wider uppercase">{adminUser?.role}</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-sm shadow-inner">
              <UserIcon size={16} />
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
          {children}
        </main>
      </div>

    </div>
  );
}
