export default function Card({
  id,
  children,
  className = "",
  hover = true,
  onClick,
  ...props
}) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`
        bg-white border border-slate-150 rounded-2xl p-6 shadow-sm overflow-hidden transition-all duration-300
        ${hover ? "hover:shadow-md hover:border-slate-200" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
