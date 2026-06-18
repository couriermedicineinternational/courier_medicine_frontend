import React from "react";
import { PlaneTakeoff } from "lucide-react";
import Modal from "../ui/Modal";

export default function TrackModal({
  isOpen,
  onClose,
  trackResult
}) {
  return (
    <Modal
      id="track-result-modal"
      isOpen={isOpen}
      onClose={onClose}
      title="🚚 Live Package Journey Status"
    >
      {trackResult && (
        <div className="space-y-4 font-sans text-slate-700">
          <div className="bg-slate-900 text-white rounded-xl p-4 relative overflow-hidden">
            <div className="absolute right-3 top-3 opacity-15">
              <PlaneTakeoff size={48} className="text-white" />
            </div>
            <span className="text-[9px] uppercase font-black text-slate-400 block tracking-widest">
              TRACKING ID: {trackResult.number}
            </span>
            <h4 className="text-sm font-black text-rose-400 mt-1 flex items-center gap-1.5 leading-none">
              <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping shrink-0" />
              {trackResult.status}
            </h4>
            <span className="text-[10px] text-slate-400 block mt-2 font-mono">
              Last checked: {trackResult.updatedAt}
            </span>
          </div>

          {/* Origin & Destination indicators */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div>
              <span className="font-bold text-slate-400 uppercase text-[9px] block">Shipping Origin</span>
              <span className="font-semibold text-slate-800 uppercase block mt-0.5">{trackResult.origin}</span>
            </div>
            <div>
              <span className="font-bold text-slate-400 uppercase text-[9px] block">Final Destination</span>
              <span className="font-semibold text-slate-800 uppercase block mt-0.5">{trackResult.destination}</span>
            </div>
          </div>

          {/* Waypoint History timeline */}
          <div className="space-y-4 pt-2">
            <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Logistics Tracking Log
            </h5>
            
            <div className="relative border-l border-slate-200 pl-4 ml-2 space-y-6">
              {trackResult.history.map((h, i) => {
                const isLatest = i === trackResult.history.length - 1;
                return (
                  <div key={i} className="relative">
                    {/* Circle bullet identifier */}
                    <div className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 ${
                      isLatest ? "bg-primary border-primary/20 scale-125" : "bg-slate-300 border-white"
                    }`} />
                    
                    <div className="text-xs">
                      <span className="font-bold text-slate-400 text-[10px] block leading-none mb-1">
                        {h.date} - {h.details}
                      </span>
                      <h4 className={`font-semibold tracking-wide ${isLatest ? "text-slate-900" : "text-slate-600"}`}>
                        {h.status}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <a
              href={`https://wa.me/918882691919?text=Hi! Can I get update on Tracking: ${trackResult.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="grow text-center py-2.5 rounded-lg bg-primary hover:bg-primary text-white font-bold text-xs shadow hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              💬 Discuss with Live Desk
            </a>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
