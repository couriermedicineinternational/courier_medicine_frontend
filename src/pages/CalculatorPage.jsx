import { Link } from "react-router-dom";
import CalculatorForm from "../components/sections/CalculatorForm";
import CtaBannerSection from "../components/sections/CtaBannerSection";

export default function CalculatorPage() {
  return (
    <div id="calculator-page" className="pb-12 bg-white font-sans text-slate-700">
      {/* 1. Page Header Banner */}
      <div 
        id="calculator-banner"
        className="relative h-[220px] md:h-[280px] bg-cover bg-center flex items-end pb-8 md:pb-12 bg-slate-950"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80')` 
        }}
      >
        {/* Scrim Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white z-10">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 font-display uppercase drop-shadow-xs">
            Courier Charges
          </h1>
          <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center gap-2 text-white/80">
            <Link to="/" className="hover:text-primary transition-colors text-white/95">Home</Link>
            <span className="text-white/40">»</span>
            <span className="text-primary font-bold">Courier Charges</span>
          </nav>
        </div>
      </div>

      {/* 2. Title Section */}
      <div className="text-center mt-12 mb-8">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 uppercase">
          Calculate <span className="text-secondary">| COURIER CHARGES</span>
        </h2>
      </div>

      {/* 3. Calculator and Illustration Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-5 w-full">
            <CalculatorForm />
          </div>
          
          {/* Right Column: Illustration Image */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <img 
              src="/delivery_guy_hero_light.png" 
              alt="Courier Charges Delivery Illustration" 
              className="w-full max-w-xl h-auto object-contain drop-shadow-md rounded-2xl"
              onError={(e) => {
                e.target.src = "/delivery_guy_hero_new.jpg";
              }}
            />
          </div>
        </div>
      </div>

      {/* 4. CTA Banner Section */}
      <CtaBannerSection />
    </div>
  );
}
