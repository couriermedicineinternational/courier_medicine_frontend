import api from "./api";

let PRICING_DATA = {};
let PROVIDERS_DATA = [];
let isPricingLoaded = false;
let pricingLoadPromise = null;

export const loadPricingData = async () => {
  if (isPricingLoaded) return { PRICING_DATA, PROVIDERS_DATA };
  if (pricingLoadPromise) return pricingLoadPromise;

  pricingLoadPromise = Promise.all([
    api.get('/pricing'),
    api.get('/providers')
  ]).then(([pricingRes, providersRes]) => {
    if (pricingRes.data && pricingRes.data.success) {
      const data = pricingRes.data.data;
      data.forEach(item => {
        // use lower case for normalized keys
        PRICING_DATA[item.country.toLowerCase()] = item.providers;
      });
    }
    
    if (providersRes.data && providersRes.data.success) {
      PROVIDERS_DATA = providersRes.data.data;
    }

    isPricingLoaded = true;
    return { PRICING_DATA, PROVIDERS_DATA };
  }).catch(err => {
    console.error('Failed to load pricing or providers data', err);
    return { PRICING_DATA, PROVIDERS_DATA };
  });
  
  return pricingLoadPromise;
};

export const getGlobalProviders = () => PROVIDERS_DATA;

export const getProviderImage = (providerName) => {
  const p = PROVIDERS_DATA.find(p => p.name.toUpperCase() === providerName.toUpperCase());
  return p ? p.image : null;
};

const normalizeCountryName = (name) => {
  if (!name) return "";
  const n = name.toLowerCase();
  if (n.includes("usa") || n.includes("united states")) return "usa";
  if (n.includes("uk") || n.includes("united kingdom")) return "united kingdom";
  if (n.includes("uae") || n.includes("united arab emirates")) return "united arab emirates";
  return n.trim();
};

export const calculatePrice = (countryName, providerName, weightInKg) => {
  const normalizedName = normalizeCountryName(countryName);
  const countryData = PRICING_DATA[normalizedName];
  if (!countryData) {
    // Fallback if country not in JSON
    const fallbackBase = 3500;
    const diff = 1500;
    if (weightInKg <= 0.5) return fallbackBase;
    if (weightInKg <= 1.0) return fallbackBase + diff;
    return fallbackBase + diff + Math.ceil((weightInKg - 1.0) / 0.5) * diff;
  }

  const providerData = countryData.find(p => p.provider === providerName);
  if (!providerData) return null;

  const { halfKgPrice, oneKgPrice } = providerData;

  if (weightInKg <= 0.5) {
    return halfKgPrice;
  } else if (weightInKg <= 1.0) {
    return oneKgPrice;
  } else {
    // For every 0.5kg beyond 1kg, add the difference
    const diff = oneKgPrice - halfKgPrice;
    const extraWeight = weightInKg - 1.0;
    const steps = Math.ceil(extraWeight / 0.5);
    return oneKgPrice + (steps * diff);
  }
};

export const getProvidersForCountry = (countryName) => {
  const normalizedName = normalizeCountryName(countryName);
  return PRICING_DATA[normalizedName] || [];
};

export const getDefaultProvider = (countryName) => {
  const providers = getProvidersForCountry(countryName);
  if (providers.length === 0) return null;

  const dhl = providers.find(p => p.provider === 'DHL');
  return dhl || providers[0];
};

export const PROVIDER_UI_CONFIG = {
  "DHL": {
    themeColor: "bg-primary",
    themeText: "text-primary",
    hoverBg: "hover:bg-primary",
    badgeLabel: "Fastest",
    logoNode: (
      <div className="h-6 w-full flex items-center justify-center bg-[#FFCC00] px-2.5 py-0.5 rounded shadow-xs select-none">
        <svg className="h-4 w-auto" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="skewX(-15)">
            <text x="50" y="18" fill="#D40511" fontWeight="900" fontSize="18" fontFamily="Impact, Arial Black, sans-serif" letterSpacing="0.5" textAnchor="middle">DHL</text>
          </g>
        </svg>
      </div>
    )
  },
  "UPS": {
    themeColor: "bg-secondary",
    themeText: "text-secondary",
    hoverBg: "hover:bg-[#0047b3]",
    badgeLabel: "Best Value",
    logoNode: (
      <div className="h-8 flex items-center select-none">
        <svg className="h-8 w-auto" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2 C28 2, 38 4, 38 16 C38 28, 28 38, 20 44 C12 38, 2 28, 2 16 C2 4, 12 2, 20 2 Z" fill="#351C15" stroke="#FFC72C" strokeWidth="2.5" />
          <path d="M4 14C10 11 30 11 36 14" stroke="#FFC72C" strokeWidth="2" />
          <text x="20" y="32" fill="#FFC72C" fontWeight="bold" fontSize="15" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-0.5">ups</text>
        </svg>
      </div>
    )
  },
  "FedEx": {
    themeColor: "bg-[#4d148c]",
    themeText: "text-[#4d148c]",
    hoverBg: "hover:bg-[#3b0f6b]",
    badgeLabel: "Reliable",
    logoNode: (
      <div className="h-8 flex items-center select-none">
        <span className="text-2xl font-black tracking-tighter">
          <span className="text-[#4d148c]">Fed</span><span className="text-[#ff6600]">Ex</span>
        </span>
      </div>
    )
  },
  "ARAMEX": {
    themeColor: "bg-[#e2001a]",
    themeText: "text-[#e2001a]",
    hoverBg: "hover:bg-[#b30014]",
    badgeLabel: "Middle East Spec.",
    logoNode: (
      <div className="h-8 flex items-center select-none">
        <span className="text-xl font-black tracking-tight text-[#e2001a] italic uppercase">Aramex</span>
      </div>
    )
  },
  "DPD": {
    themeColor: "bg-[#dc0032]",
    themeText: "text-[#dc0032]",
    hoverBg: "hover:bg-[#b00028]",
    badgeLabel: "Euro Express",
    logoNode: (
      <div className="h-8 flex items-center select-none">
        <div className="bg-[#dc0032] text-white px-2 py-0.5 rounded font-black text-lg italic uppercase">DPD</div>
      </div>
    )
  },
  "ECONOMY POST": {
    themeColor: "bg-slate-600",
    themeText: "text-slate-600",
    hoverBg: "hover:bg-slate-700",
    badgeLabel: "Budget",
    logoNode: (
      <div className="h-8 flex items-center select-none">
        <span className="text-sm font-black tracking-widest text-slate-700 uppercase">India Post</span>
      </div>
    )
  }
};

export const getProviderUI = (providerName) => {
  return PROVIDER_UI_CONFIG[providerName] || {
    themeColor: "bg-slate-800",
    themeText: "text-slate-800",
    hoverBg: "hover:bg-slate-900",
    badgeLabel: "Standard",
    logoNode: (
      <div className="h-8 flex items-center select-none">
        <span className="text-sm font-black tracking-widest text-slate-800 uppercase">{providerName}</span>
      </div>
    )
  };
};
