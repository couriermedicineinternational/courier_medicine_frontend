import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes float-btn {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float-btn {
          animation: float-btn 2.8s ease-in-out infinite;
        }
      `}</style>
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-28 md:bottom-8 right-6 z-50 w-12 h-12 bg-gradient-to-r from-[#0052CC] to-[#03ADA4] text-white flex items-center justify-center rounded-2xl shadow-lg hover:shadow-xl active:scale-95 hover:scale-105 transition-all duration-300 animate-float-btn"
      >
        <ArrowUp size={22} className="stroke-[2.5px]" />
      </button>
    </>
  );
}
