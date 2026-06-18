import React from "react";

const flagsRow1 = [
  { code: "GB", name: "United Kingdom" },
  { code: "PL", name: "Poland" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "KW", name: "Kuwait" },
  { code: "AE", name: "UAE" },
  { code: "IT", name: "Italy" },
  { code: "MX", name: "Mexico" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
  { code: "JP", name: "Japan" },
  { code: "SG", name: "Singapore" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "QA", name: "Qatar" },
];

const flagsRow2 = [
  { code: "HK", name: "Hong Kong" },
  { code: "GL", name: "Greenland" },
  { code: "ET", name: "Ethiopia" },
  { code: "EG", name: "Egypt" },
  { code: "BR", name: "Brazil" },
  { code: "BE", name: "Belgium" },
  { code: "AF", name: "Afghanistan" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "NG", name: "Nigeria" },
  { code: "KE", name: "Kenya" },
  { code: "ZA", name: "South Africa" },
  { code: "MY", name: "Malaysia" },
  { code: "TH", name: "Thailand" },
  { code: "NP", name: "Nepal" },
  { code: "LK", name: "Sri Lanka" },
  { code: "OM", name: "Oman" },
];

function FlagCard({ code, name }) {
  return (
    <div 
      className="flex-shrink-0 w-[100px] h-[70px] md:w-[128px] md:h-[90px] bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center mx-1.5 md:mx-2 hover:scale-110 hover:shadow-md transition-transform duration-300"
      title={name}
    >
      <img
        src={`https://flagcdn.com/w160/${code.toLowerCase()}.png`}
        alt={name}
        className="w-[84px] h-[54px] md:w-[108px] md:h-[70px] object-cover rounded-xl"
        loading="lazy"
      />
    </div>
  );
}

export default function FlagsSection() {
  return (
    <section id="flags-section" className="py-10 md:py-12 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
          Global Courier Network –{" "}
          <br className="hidden sm:block" />
          Deliveries to <span className="text-[#0052CC]">220+</span> Countries
        </h2>
      </div>

      {/* Row 1 — slides LEFT */}
      <div className="relative mb-3 md:mb-4">
        <div className="flags-marquee-left flex w-max">
          {/* Original set */}
          {flagsRow1.map((f, i) => (
            <FlagCard key={`r1a-${i}`} code={f.code} name={f.name} />
          ))}
          {/* Duplicate for seamless loop */}
          {flagsRow1.map((f, i) => (
            <FlagCard key={`r1b-${i}`} code={f.code} name={f.name} />
          ))}
        </div>
      </div>

      {/* Row 2 — slides RIGHT */}
      <div className="relative">
        <div className="flags-marquee-right flex w-max">
          {/* Original set */}
          {flagsRow2.map((f, i) => (
            <FlagCard key={`r2a-${i}`} code={f.code} name={f.name} />
          ))}
          {/* Duplicate for seamless loop */}
          {flagsRow2.map((f, i) => (
            <FlagCard key={`r2b-${i}`} code={f.code} name={f.name} />
          ))}
        </div>
      </div>

      {/* Inline keyframe styles for marquee */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .flags-marquee-left {
          animation: marqueeLeft 30s linear infinite;
        }
        .flags-marquee-left:hover {
          animation-play-state: paused;
        }
        .flags-marquee-right {
          animation: marqueeRight 30s linear infinite;
        }
        .flags-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
