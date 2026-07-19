import { Phone, MessageCircle, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { TOP_BAR } from "../../constants";

export default function Topbar() {
  return (
    <div id="topbar-container" className="hidden sm:block bg-white text-xs pt-3 pb-0.5 px-4">
      <div id="topbar-inner" className="max-w-7xl mx-auto flex items-center justify-between text-slate-600 font-sans">
        
        {/* Left Side: Call & Whatsapp */}
        <div id="topbar-left" className="flex items-center gap-3">
          {/* Call Us */}
          <a
            id="topbar-phone-link"
            href={TOP_BAR.phone.href}
            className="group flex items-center h-9 bg-[#0052CC]/5 hover:bg-[#0052CC]/10 border border-[#0052CC]/10 hover:border-[#0052CC]/30 rounded-full px-2.5 transition-all duration-300 ease-out shadow-xs hover:shadow-sm"
          >
            <span className="flex items-center justify-center shrink-0 w-5 h-5">
              <Phone id="topbar-phone-icon" size={16} className="text-secondary transition-transform duration-300 group-hover:scale-110" />
            </span>
            <span className="flex items-center gap-1 max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 ease-out overflow-hidden whitespace-nowrap">
              <span id="topbar-phone-label" className="font-semibold text-slate-600">{TOP_BAR.phone.label}</span>
              <span id="topbar-phone-value" className="text-secondary font-bold">{TOP_BAR.phone.number}</span>
            </span>
          </a>

          {/* Whatsapp */}
          <a
            id="topbar-whatsapp-link"
            href={TOP_BAR.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center h-9 bg-[#03ADA4]/5 hover:bg-[#03ADA4]/10 border border-[#03ADA4]/15 hover:border-[#03ADA4]/35 rounded-full px-2.5 transition-all duration-300 ease-out shadow-xs hover:shadow-sm"
          >
            <span className="flex items-center justify-center shrink-0 w-5 h-5">
              <MessageCircle id="topbar-whatsapp-icon" size={16} className="text-primary fill-primary/10 transition-transform duration-300 group-hover:scale-110" />
            </span>
            <span className="flex items-center gap-1 max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 ease-out overflow-hidden whitespace-nowrap">
              <span id="topbar-whatsapp-label" className="font-semibold text-slate-600">{TOP_BAR.whatsapp.label}</span>
              <span id="topbar-whatsapp-value" className="text-primary font-bold">{TOP_BAR.whatsapp.number}</span>
            </span>
          </a>
        </div>

        {/* Right Side: Email & Hours */}
        <div id="topbar-right" className="flex items-center gap-3">
          {/* Email */}
          <a
            id="topbar-email-link"
            href={TOP_BAR.email.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center h-9 bg-[#0052CC]/5 hover:bg-[#0052CC]/10 border border-[#0052CC]/10 hover:border-[#0052CC]/30 rounded-full px-2.5 transition-all duration-300 ease-out shadow-xs hover:shadow-sm"
          >
            <span className="flex items-center justify-center shrink-0 w-5 h-5">
              <Mail id="topbar-email-icon" size={16} className="text-secondary transition-transform duration-300 group-hover:scale-110" />
            </span>
            <span className="flex items-center gap-1 max-w-0 opacity-0 group-hover:max-w-[300px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 ease-out overflow-hidden whitespace-nowrap">
              <span id="topbar-email-label" className="font-semibold text-slate-600">{TOP_BAR.email.label}</span>
              <span id="topbar-email-value" className="text-primary font-bold">{TOP_BAR.email.address}</span>
            </span>
          </a>

          {/* Working Hours */}
          <div
            id="topbar-hours"
            className="group flex items-center h-9 bg-[#0052CC]/5 hover:bg-[#0052CC]/10 border border-[#0052CC]/10 hover:border-[#0052CC]/30 rounded-full px-2.5 transition-all duration-300 ease-out shadow-xs hover:shadow-sm cursor-default"
          >
            <span className="flex items-center justify-center shrink-0 w-5 h-5">
              <Clock id="topbar-hours-icon" size={16} className="text-secondary transition-transform duration-300 group-hover:rotate-12" />
            </span>
            <span className="flex items-center gap-1 max-w-0 opacity-0 group-hover:max-w-[300px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 ease-out overflow-hidden whitespace-nowrap">
              <span id="topbar-hours-label" className="font-semibold text-slate-600">{TOP_BAR.workingHours.label}</span>
              <span id="topbar-hours-value" className="text-secondary font-bold">{TOP_BAR.workingHours.hours}</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
