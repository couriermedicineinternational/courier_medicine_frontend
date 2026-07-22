import { Link, useLocation } from "react-router-dom";
import { Home, Banknote, Phone } from "lucide-react";

export default function MobileBottomNav({ settings }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  const whatsappHref = settings?.whatsapp 
    ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}` 
    : "https://wa.me/918882691919";

  const phoneHref = settings?.phone 
    ? `tel:${settings.phone.replace(/[^0-9+]/g, "")}` 
    : "tel:+918882691919";

  return (
    <div className="lg:hidden md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#eaeaea] border-t border-slate-300/80 py-2 px-1 flex items-center justify-around shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {/* Home */}
      <Link 
        to="/" 
        className={`flex flex-col items-center gap-1 text-center px-3 py-1.5 rounded-xl transition-all duration-200 ${
          isActive("/") 
            ? "bg-[#0052cc]/10 text-[#0052cc]" 
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <Home size={18} className={`${isActive("/") ? "text-[#0052cc]" : "text-slate-600"} stroke-[2.5px]`} />
        <span className={`text-[10px] font-extrabold tracking-wide mt-0.5 ${isActive("/") ? "text-[#0052cc]" : "text-slate-700"}`}>Home</span>
      </Link>

      {/* Courier Charges */}
      <Link 
        to="/calculator.htm" 
        state={location.state}
        className={`flex flex-col items-center gap-1 text-center px-3 py-1.5 rounded-xl transition-all duration-200 ${
          isActive("/calculator.htm") || isActive("/calculator.php")
            ? "bg-[#0052cc]/10 text-[#0052cc]" 
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <Banknote size={18} className={`${isActive("/calculator.htm") || isActive("/calculator.php") ? "text-[#0052cc]" : "text-slate-600"} stroke-[2.5px]`} />
        <span className={`text-[10px] font-extrabold tracking-wide mt-0.5 ${isActive("/calculator.htm") || isActive("/calculator.php") ? "text-[#0052cc]" : "text-slate-700"}`}>Courier Charges</span>
      </Link>

      {/* Whatsapp */}
      <a 
        href={whatsappHref} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex flex-col items-center gap-1 text-center px-3 py-1.5 rounded-xl text-slate-600 hover:text-slate-900 transition-all duration-200"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" className="text-[#25D366] fill-current">
          <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.758.459 3.473 1.332 4.988L2 22l5.188-1.36c1.47.8 3.125 1.22 4.82 1.22 5.507 0 9.989-4.482 9.989-9.989C22 6.482 17.519 2 12.012 2zm0 1.636c4.6 0 8.353 3.753 8.353 8.353 0 4.6-3.753 8.353-8.353 8.353-1.503 0-2.981-.403-4.28-1.168l-.307-.183-3.085.808.823-3.007-.202-.32a8.312 8.312 0 0 1-1.272-4.483c0-4.6 3.753-8.353 8.353-8.353zm-2.02 2.76c-.22 0-.41.082-.572.245-.253.252-.647.76-.647 1.644s.642 1.738.736 1.862c.095.124 1.238 1.892 3.013 2.66.422.183.752.292 1.01.374.424.135.81.116 1.114.07.34-.05.992-.405 1.132-.796.14-.39.14-.725.097-.796-.042-.07-.156-.112-.328-.198-.172-.086-1.02-.503-1.178-.56-.157-.058-.27-.086-.385.086-.114.172-.44.56-.54.673-.1.112-.2.127-.37.04-.173-.085-.73-.27-1.392-.86-.514-.457-.86-.983-.962-1.155-.102-.172-.01-.265.076-.35.077-.076.172-.2.258-.3.086-.1.114-.17.172-.284.057-.114.028-.214-.014-.3-.042-.085-.385-.928-.528-1.272-.138-.335-.28-.29-.385-.295-.102-.005-.22-.005-.34-.005z"/>
        </svg>
        <span className="text-[10px] font-extrabold tracking-wide text-slate-700 mt-0.5">Whatsapp</span>
      </a>

      {/* Call Us */}
      <a 
        href={phoneHref} 
        className="flex flex-col items-center gap-1 text-center px-3 py-1.5 rounded-xl text-slate-600 hover:text-slate-900 transition-all duration-200"
      >
        <Phone size={18} className="text-slate-600 stroke-[2px]" />
        <span className="text-[10px] font-extrabold tracking-wide text-slate-700 mt-0.5">Call Us</span>
      </a>
    </div>
  );
}
