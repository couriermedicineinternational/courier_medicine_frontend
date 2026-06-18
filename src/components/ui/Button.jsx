import { Loader2 } from "lucide-react";

export default function Button({
  id,
  children,
  type = "button",
  variant = "primary", // primary, secondary, outline, text, success, danger
  size = "md", // sm, md, lg
  className = "",
  disabled = false,
  loading = false,
  onClick,
  icon: Icon,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center font-semibold tracking-wide rounded-lg cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none shrink-0";
  
  const variants = {
    primary: "bg-[#03ADA4] hover:bg-[#03ADA4]/90 text-white shadow-md hover:scale-[1.01] active:scale-[0.99] border-b-2 border-black/10",
    secondary: "bg-[#03ADA4] hover:bg-[#03ADA4]/90 text-white shadow-md hover:scale-[1.01] active:scale-[0.99] border-b-2 border-black/10",
    outline: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-secondary focus:ring-secondary",
    text: "text-secondary hover:text-secondary hover:underline p-0 focus:ring-secondary",
    success: "bg-primary hover:bg-primary text-white shadow-sm focus:ring-primary",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base"
  };

  const disabledClasses = (disabled || loading) ? "opacity-60 cursor-not-allowed pointer-events-none transform-none" : "";

  return (
    <button
      id={id}
      type={type}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="w-4 h-4 mr-2 shrink-0 text-current" />
      ) : null}
      {children}
    </button>
  );
}
