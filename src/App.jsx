import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Layout components
import Topbar from "./components/layout/Topbar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages (Lazy Loaded)
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const PopularCountries = lazy(() => import("./pages/PopularCountries"));
const PopularLocations = lazy(() => import("./pages/PopularLocations"));
const Blog = lazy(() => import("./pages/Blog"));
const Faq = lazy(() => import("./pages/Faq"));
const Contact = lazy(() => import("./pages/Contact"));
const Track = lazy(() => import("./pages/Track"));
const SlugResolver = lazy(() => import("./pages/SlugResolver"));

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

  useEffect(() => {
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
  }, [showHeader]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div id="app-root-wrapper" className="min-h-screen flex flex-col justify-between bg-white text-slate-800">
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



        {/* Main interactive router canvas */}
        <main id="app-main-content" className="grow">
          <Suspense fallback={
            <div className="min-h-[50vh]"></div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about.htm" element={<About />} />
              <Route path="/popular-countries.htm" element={<PopularCountries />} />
              <Route path="/popular-locations.htm" element={<PopularLocations />} />
              <Route path="/blog.htm" element={<Blog />} />
              <Route path="/faq.htm" element={<Faq />} />
              <Route path="/contact.htm" element={<Contact />} />
              <Route path="/track.htm" element={<Track />} />
              {/* Root-level dynamic routes should be placed last before catch-all */}
              <Route path="/:slug" element={<SlugResolver />} />
              {/* Catch all fallback redirects to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>

        {/* Shared footer section */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
