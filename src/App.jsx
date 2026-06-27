import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Layout components
import Topbar from "./components/layout/Topbar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import MobileBottomNav from "./components/layout/MobileBottomNav";

// Pages (Lazy Loaded)
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const PopularCountries = lazy(() => import("./pages/PopularCountries"));
const PopularLocations = lazy(() => import("./pages/PopularLocations"));
const Blog = lazy(() => import("./pages/Blog"));
const Faq = lazy(() => import("./pages/Faq"));
const Contact = lazy(() => import("./pages/Contact"));
const ServiceProvider = lazy(() => import("./pages/ServiceProvider"));
const Booking = lazy(() => import("./pages/Booking"));
const Thanks = lazy(() => import("./pages/Thanks"));
const SpecialRates = lazy(() => import("./pages/SpecialRates"));
const CalculatorPage = lazy(() => import("./pages/CalculatorPage"));
const SlugResolver = lazy(() => import("./pages/SlugResolver"));

// Admin Pages (Lazy Loaded)
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminQuotes = lazy(() => import("./pages/admin/AdminQuotes"));
const AdminContacts = lazy(() => import("./pages/admin/AdminContacts"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));

// Expanded Admin Pages
const AdminCountries = lazy(() => import("./pages/admin/AdminCountries"));
const AdminLocations = lazy(() => import("./pages/admin/AdminLocations"));
const AdminBlogs = lazy(() => import("./pages/admin/AdminBlogs"));
const AdminFaqs = lazy(() => import("./pages/admin/AdminFaqs"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminHomepage = lazy(() => import("./pages/admin/AdminHomepage"));
const AdminAbout = lazy(() => import("./pages/admin/AdminAbout"));
const AdminPricing = lazy(() => import("./pages/admin/AdminPricing"));

// Helper component to scroll window to top on route navigation change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    // Load pricing data globally when the application boots
    import("./utils/pricing").then((m) => m.loadPricingData());
  }, []);

  useEffect(() => {
    if (isAdminRoute) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show header at the very top
      if (currentScrollY <= 10) {
        setShowHeader(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Check if scroll difference is significant to avoid jitter
      if (Math.abs(currentScrollY - lastScrollY.current) < 8) {
        return;
      }

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down -> slide header out of view
        setShowHeader(false);
      } else {
        // Scrolling up -> slide header back into view
        showHeader === false && setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showHeader, isAdminRoute]);

  return (
    <>
      <ScrollToTop />
      <div id="app-root-wrapper" className="min-h-screen flex flex-col justify-between bg-white text-slate-800">
        {!isAdminRoute && (
          <div 
            id="app-header-block" 
            className={`sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm transition-transform duration-300 ease-in-out ${
              showHeader ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            {/* Information bar */}
            <Topbar />
            {/* Desktop/Mobile Navigation */}
            <Navbar />
          </div>
        )}

        {/* Main interactive router canvas */}
        <main id="app-main-content" className={`grow ${!isAdminRoute ? 'pb-24 md:pb-0' : ''}`}>
          <Suspense fallback={
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about.htm" element={<About />} />
              <Route path="/countries.php" element={<PopularCountries />} />
              <Route path="/location.php" element={<PopularLocations />} />
              <Route path="/blog.htm" element={<Blog />} />
              <Route path="/faq.htm" element={<Faq />} />
              <Route path="/contact.htm" element={<Contact />} />
              <Route path="/service-provider.php" element={<ServiceProvider />} />
              <Route path="/booking.php" element={<Booking />} />
              <Route path="/thanks.php" element={<Thanks />} />
              <Route path="/special-rates.php" element={<SpecialRates />} />
              <Route path="/calculator.php" element={<CalculatorPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
              <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
              <Route path="/admin/quotes" element={<AdminLayout><AdminQuotes /></AdminLayout>} />
              <Route path="/admin/contacts" element={<AdminLayout><AdminContacts /></AdminLayout>} />
              <Route path="/admin/countries" element={<AdminLayout><AdminCountries /></AdminLayout>} />
              <Route path="/admin/locations" element={<AdminLayout><AdminLocations /></AdminLayout>} />
              <Route path="/admin/blogs" element={<AdminLayout><AdminBlogs /></AdminLayout>} />
              <Route path="/admin/faqs" element={<AdminLayout><AdminFaqs /></AdminLayout>} />
              <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
              <Route path="/admin/homepage" element={<AdminLayout><AdminHomepage /></AdminLayout>} />
              <Route path="/admin/about" element={<AdminLayout><AdminAbout /></AdminLayout>} />
              <Route path="/admin/pricing" element={<AdminLayout><AdminPricing /></AdminLayout>} />
              <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
              <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />

              {/* Root-level dynamic routes should be placed last before catch-all */}
              <Route path="/:slug" element={<SlugResolver />} />
              {/* Catch all fallback redirects to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>

        {/* Shared footer section */}
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <MobileBottomNav />}
      </div>
    </>
  );
}
