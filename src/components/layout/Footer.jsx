import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, MapPin, Mail, Phone } from "lucide-react";
import { FOOTER } from "../../constants";
import Logo from "./Logo";

export default function Footer({ settings }) {
  // Format dynamic links and texts
  const aboutTextVal = settings?.aboutText || FOOTER.about.text;
  const addressVal = settings?.address || FOOTER.locateUs.address;
  const emailVal = settings?.email || FOOTER.locateUs.email;
  const phoneVal = settings?.phone || FOOTER.locateUs.phone;

  const facebookHref = settings?.socialLinks?.facebook || "https://facebook.com";
  const instagramHref = settings?.socialLinks?.instagram || "https://instagram.com";
  const youtubeHref = settings?.socialLinks?.youtube || "https://youtube.com";
  const twitterHref = settings?.socialLinks?.twitter || "https://x.com";

  return (
    <footer id="footer-container" className="bg-slate-900 text-slate-300">
      
      {/* Upper footer with columns */}
      <div id="footer-upper" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        
        {/* About Company */}
        <div id="footer-col-about" className="space-y-4">
          <div id="footer-logo" className="flex items-center">
            <div className="bg-white rounded-lg p-1.5 shadow inline-block">
              <Logo className="scale-90 origin-left" />
            </div>
          </div>
          <h3 id="footer-about-title" className="text-white font-bold text-base tracking-wider border-b border-slate-800 pb-2">
            About Company
          </h3>
          <p id="footer-about-text" className="text-[14.5px] text-slate-400 font-sans leading-relaxed">
            {aboutTextVal}
          </p>
          <div id="footer-socials" className="flex items-center gap-3 pt-2">
            <a
              id="social-fb"
              href={facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-[#03ADA4] hover:bg-slate-750 flex items-center justify-center transition-all duration-200"
            >
              <Facebook size={16} />
            </a>
            <a
              id="social-ig"
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram profile"
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-pink-500 hover:bg-slate-750 flex items-center justify-center transition-all duration-200"
            >
              <Instagram size={16} />
            </a>
            <a
              id="social-yt"
              href={youtubeHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our YouTube channel"
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-slate-750 flex items-center justify-center transition-all duration-200"
            >
              <Youtube size={16} />
            </a>
            <a
              id="social-x"
              href={twitterHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our X (Twitter) profile"
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-750 flex items-center justify-center transition-all duration-200"
            >
              <Twitter size={15} />
            </a>
          </div>
        </div>
 
        {/* Informative Pages */}
        <div id="footer-col-informative" className="space-y-4">
          <h3 id="footer-info-title" className="text-white font-bold text-base tracking-wider border-b border-slate-800 pb-2">
            {FOOTER.informative.title}
          </h3>
          <ul id="footer-info-list" className="flex flex-wrap gap-x-5 gap-y-3 text-sm md:flex-col md:gap-y-2.5 md:gap-x-0">
            {FOOTER.informative.links.map((link, idx) => (
              <li key={idx}>
                <Link
                  id={`footer-info-link-${idx}`}
                  to={link.path}
                  className="hover:text-[#03ADA4] hover:underline transition-all text-slate-400 block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div id="footer-col-quick" className="space-y-4">
          <h3 id="footer-quick-title" className="text-white font-bold text-base tracking-wider border-b border-slate-800 pb-2">
            {FOOTER.quickLinks.title}
          </h3>
          <ul id="footer-quick-list" className="flex flex-wrap gap-x-5 gap-y-3 text-sm md:flex-col md:gap-y-2.5 md:gap-x-0">
            {FOOTER.quickLinks.links.map((link, idx) => (
              <li key={idx}>
                <Link
                  id={`footer-quick-link-${idx}`}
                  to={link.path}
                  className="hover:text-[#03ADA4] hover:underline transition-all text-slate-400 block truncate"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Locate Us */}
        <div id="footer-col-locate" className="space-y-4 font-sans">
          <h3 id="footer-locate-title" className="text-white font-bold text-base tracking-wider border-b border-slate-800 pb-2">
            {FOOTER.locateUs.title}
          </h3>
          <div id="footer-locate-details" className="space-y-3.5 text-sm text-slate-400">
            <div id="footer-address" className="flex items-start gap-2.5">
              <MapPin size={18} className="text-secondary/20 shrink-0 mt-0.5" />
              <span id="footer-address-text" className="leading-relaxed">{addressVal}</span>
            </div>
            <a
              id="footer-email-link"
              href={settings?.email ? `https://mail.google.com/mail/?view=cm&fs=1&to=${settings.email}` : `https://mail.google.com/mail/?view=cm&fs=1&to=${FOOTER.locateUs.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:text-[#03ADA4] transition-colors"
            >
              <Mail size={16} className="text-secondary/20 shrink-0" />
              <span id="footer-email-text">{emailVal}</span>
            </a>
            <a
              id="footer-phone-link"
              href={`tel:${phoneVal.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-2.5 hover:text-[#03ADA4] transition-colors"
            >
              <Phone size={16} className="text-secondary/20 shrink-0" />
              <span id="footer-phone-text">{phoneVal}</span>
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
