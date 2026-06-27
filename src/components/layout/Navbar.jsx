import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowUpRight, Globe, MapPin } from "lucide-react";
import { NAVIGATION } from "../../constants";
import Logo from "./Logo";
import { motion, AnimatePresence } from "motion/react";
import { ALL_COUNTRIES, ALL_LOCATIONS } from "../../constants";

// Build unique city list for locations dropdown
const getLocationItems = () => {
  const seen = new Set();
  const items = [];
  for (const l of ALL_LOCATIONS) {
    if (!seen.has(l.city) && items.length < 8) {
      seen.add(l.city);
      // pick first location for this city as representative link
      items.push({ city: l.city, id: l.id, name: l.name });
    }
  }
  return items;
};

const COUNTRY_ITEMS = ALL_COUNTRIES.slice(0, 9); // show 9 countries in dropdown
const LOCATION_ITEMS = ALL_LOCATIONS.slice(0, 8); // show 8 locations with full names

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);

  // Close everything on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const closeAll = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const toggleMobileDropdown = (label) => {
    setOpenDropdown(prev => prev === label ? null : label);
  };

  // Desktop nav stagger
  const navContainerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } }
  };
  const navItemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } }
  };

  return (
    <nav id="navbar-container" ref={navRef} className="bg-white relative z-50">
      <div id="navbar-inner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="navbar-header" className="flex justify-between items-center min-h-20 py-3">

          {/* Logo */}
          <Link id="navbar-logo-link" to="/" onClick={closeAll}
            className="group hover:scale-[1.02] transition-transform duration-300 flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Links */}
          <motion.div id="navbar-desktop-menu" variants={navContainerVariants}
            initial="hidden" animate="show" className="hidden lg:flex items-center gap-1.5">
            {NAVIGATION.links.map((link, idx) => (
              <motion.div key={link.path + idx} variants={navItemVariants} className="relative group">
                <NavLink id={`nav-link-${idx}`} to={link.path}
                  className={({ isActive }) =>
                    `relative overflow-hidden group/nav flex items-center px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-colors duration-300 font-sans z-10 ${
                      isActive ? "text-white" : "text-[#0052CC] hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`absolute inset-x-0 bottom-0 w-full transition-all duration-300 ease-out -z-10 bg-gradient-to-r from-[#0052CC] to-[#03ADA4] ${isActive ? "h-full shadow-sm" : "h-0 group-hover/nav:h-full"}`} />
                      {link.label}
                      {link.dropdown && <ChevronDown size={14} className="ml-1 opacity-70 group-hover/nav:rotate-180 transition-transform duration-200" />}
                    </>
                  )}
                </NavLink>

                {/* ── Desktop Dropdown: Countries ── */}
                {link.label === "Popular Countries" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[580px] bg-white shadow-2xl rounded-2xl border border-slate-100 opacity-0 invisible translate-y-3 scale-95 origin-top group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out z-50 p-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5 px-1">
                      <Globe size={11} /> Destination Countries
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {COUNTRY_ITEMS.map((country) => (
                        <Link
                          key={country.code}
                          to={`/${country.slug}`}
                          className="flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-gradient-to-r hover:from-[#0052CC] hover:to-[#03ADA4] border border-slate-100 hover:border-transparent rounded-xl group/card transition-all duration-200"
                        >
                          <span className="text-[11px] font-bold text-[#0052CC] group-hover/card:text-white transition-colors leading-snug">
                            India To {country.name} Medicine Courier Charges
                          </span>
                          <ArrowUpRight size={11} className="text-slate-300 group-hover/card:text-white flex-shrink-0 ml-1 transition-colors" />
                        </Link>
                      ))}
                    </div>
                    <Link to="/countries.php"
                      className="flex items-center justify-center gap-1 w-full py-2 text-[11px] font-black text-[#03ADA4] hover:text-[#0052CC] border-t border-slate-100 pt-3 transition-colors">
                      View All Countries →
                    </Link>
                  </div>
                )}

                {/* ── Desktop Dropdown: Locations ── */}
                {link.label === "Popular Locations" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-white shadow-2xl rounded-2xl border border-slate-100 opacity-0 invisible translate-y-3 scale-95 origin-top group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out z-50 p-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5 px-1">
                      <MapPin size={11} /> Medicine Courier Locations
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {LOCATION_ITEMS.map((loc) => (
                        <Link
                          key={loc.id}
                          to={`/${loc.slug}`}
                          className="flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-gradient-to-r hover:from-[#0052CC] hover:to-[#03ADA4] border border-slate-100 hover:border-transparent rounded-xl group/card transition-all duration-200"
                        >
                          <span className="text-[11px] font-bold text-[#0052CC] group-hover/card:text-white transition-colors leading-snug">
                            Medicine Courier from {loc.name}
                          </span>
                          <ArrowUpRight size={11} className="text-slate-300 group-hover/card:text-white flex-shrink-0 ml-1 transition-colors" />
                        </Link>
                      ))}
                    </div>
                    <Link to="/location.php"
                      className="flex items-center justify-center gap-1 w-full py-2 text-[11px] font-black text-[#03ADA4] hover:text-[#0052CC] border-t border-slate-100 pt-3 transition-colors">
                      View All Locations →
                    </Link>
                  </div>
                )}

                {/* ── Desktop Dropdown: Generic (other links with dropdown) ── */}
                {link.dropdown && link.label !== "Popular Countries" && link.label !== "Popular Locations" && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white shadow-xl rounded-xl border border-slate-100 opacity-0 invisible translate-y-2 scale-95 origin-top group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out z-50 flex flex-col py-2">
                    {link.dropdown.map((dropItem, dIdx) => (
                      <Link key={dIdx} to={dropItem.path}
                        className="px-4 py-2.5 text-sm font-semibold hover:text-white hover:bg-gradient-to-r hover:from-[#0052CC] hover:to-[#03ADA4] transition-all duration-200 text-[#0052CC]">
                        {dropItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Hamburger Button */}
          <div id="navbar-mobile-toggle" className="flex items-center lg:hidden">
            <motion.button
              id="navbar-mobile-button"
              onClick={() => { setIsOpen(o => !o); setOpenDropdown(null); }}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[#0052CC] hover:bg-[#0052CC]/8 transition-colors duration-200 cursor-pointer"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.35 }}>
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.35 }}>
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          Mobile Menu Panel
      ═══════════════════════════════════════ */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="navbar-mobile-panel"
            key="mobile-menu"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden fixed inset-x-0 top-[80px] bottom-0 bg-white border-t border-slate-100 z-40 flex flex-col"
            style={{ height: "calc(100vh - 80px)", overflowY: "auto" }}
          >
            <div className="px-3 py-4 space-y-2 flex-grow">
              {NAVIGATION.links.map((link, idx) => {
                const isDropOpen = openDropdown === link.label;
                const hasDropdown = link.label === "Popular Countries" || link.label === "Popular Locations";

                return (
                  <div key={link.path + idx}>
                    {/* Main nav row */}
                    {hasDropdown ? (
                      <button
                        id={`mobile-nav-link-${idx}`}
                        onClick={() => toggleMobileDropdown(link.label)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                          isDropOpen
                            ? "bg-gradient-to-r from-[#0052CC]/8 to-[#03ADA4]/8 text-[#0052CC] border border-[#0052CC]/15"
                            : "text-[#0052CC] hover:bg-slate-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {link.label === "Popular Countries" ? <Globe size={15} /> : <MapPin size={15} />}
                          {link.label}
                        </span>
                        <motion.span animate={{ rotate: isDropOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                          <ChevronDown size={16} className="opacity-70" />
                        </motion.span>
                      </button>
                    ) : (
                      <NavLink
                        id={`mobile-nav-link-${idx}`}
                        to={link.path}
                        onClick={closeAll}
                        className={({ isActive }) =>
                          `flex items-center w-full px-4 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-[#0052CC] to-[#03ADA4] text-white shadow-sm"
                              : "text-[#0052CC] hover:bg-slate-50"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    )}

                    {/* ── Mobile Dropdown: Countries ── */}
                    <AnimatePresence initial={false}>
                      {link.label === "Popular Countries" && isDropOpen && (
                        <motion.div
                          key="countries-mobile-drop"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-1.5 ml-3 mr-1 mb-1">
                            <div className="grid grid-cols-1 gap-1.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                              {COUNTRY_ITEMS.map((country) => (
                                <Link
                                  key={country.code}
                                  to={`/${country.slug}`}
                                  onClick={closeAll}
                                  className="flex items-center justify-between px-3 py-2.5 bg-white hover:bg-gradient-to-r hover:from-[#0052CC] hover:to-[#03ADA4] border border-slate-100 hover:border-transparent rounded-lg group/card transition-all duration-200"
                                >
                                  <span className="text-[11px] font-bold text-[#0052CC] group-hover/card:text-white transition-colors leading-snug">
                                    India To {country.name} Medicine Courier Charges
                                  </span>
                                  <ArrowUpRight size={12} className="text-slate-300 group-hover/card:text-white flex-shrink-0 ml-1 transition-colors" />
                                </Link>
                              ))}
                              <Link
                                to="/countries.php"
                                onClick={closeAll}
                                className="flex items-center justify-center gap-1 w-full py-2 text-[11px] font-black text-[#03ADA4] border-t border-slate-200 pt-3 mt-1"
                              >
                                View All Countries →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* ── Mobile Dropdown: Locations ── */}
                    <AnimatePresence initial={false}>
                      {link.label === "Popular Locations" && isDropOpen && (
                        <motion.div
                          key="locations-mobile-drop"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-1.5 ml-3 mr-1 mb-1">
                            <div className="grid grid-cols-1 gap-1.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                              {LOCATION_ITEMS.map((loc) => (
                                <Link
                                  key={loc.id}
                                  to={`/${loc.slug}`}
                                  onClick={closeAll}
                                  className="flex items-center justify-between px-3 py-2.5 bg-white hover:bg-gradient-to-r hover:from-[#0052CC] hover:to-[#03ADA4] border border-slate-100 hover:border-transparent rounded-lg group/card transition-all duration-200"
                                >
                                  <span className="text-[11px] font-bold text-[#0052CC] group-hover/card:text-white transition-colors leading-snug">
                                    Medicine Courier from {loc.name}
                                  </span>
                                  <ArrowUpRight size={11} className="text-slate-300 group-hover/card:text-white flex-shrink-0 ml-1 transition-colors" />
                                </Link>
                              ))}
                              <Link
                                to="/location.php"
                                onClick={closeAll}
                                className="col-span-1 flex items-center justify-center gap-1 w-full py-2 text-[11px] font-black text-[#03ADA4] border-t border-slate-200 pt-3 mt-1"
                              >
                                View All Locations →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeAll}
            className="lg:hidden fixed inset-0 top-[80px] bg-slate-900/30 z-30 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
    </nav>
  );
}
