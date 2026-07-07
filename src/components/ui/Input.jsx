import { forwardRef } from "react";

const Input = forwardRef(({
  id,
  label,
  error,
  type = "text",
  placeholder = "",
  className = "",
  required = false,
  componentType = "input", // input, select, textarea
  options = [], // [{ value: '...', label: '...' }]
  ...props
}, ref) => {
  const isSelect = componentType === "select";
  const isTextArea = componentType === "textarea";

  const inputStyles = `
    w-full px-4 py-2.5 rounded-lg border text-sm font-sans font-medium transition-all duration-250 focus:outline-none focus:ring-2 bg-slate-50
    ${error 
      ? "border-red-400 focus:border-red-500 focus:ring-red-100 placeholder-red-300 text-red-900" 
      : "border-slate-200 focus:border-secondary focus:ring-secondary/20 placeholder-slate-400 text-slate-800 focus:bg-white"
    }
  `;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label id={`${id}-label`} className="text-xs font-bold uppercase tracking-wider text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {isSelect ? (
        <select
          id={id}
          ref={ref}
          className={`${inputStyles} cursor-pointer`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt, idx) => (
            <option key={opt.value || idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : isTextArea ? (
        <textarea
          id={id}
          ref={ref}
          rows={4}
          placeholder={placeholder}
          className={inputStyles}
          {...props}
        />
      ) : (
        <input
          id={id}
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={inputStyles}
          {...props}
        />
      )}

      {error && (
        <span id={`${id}-error-text`} className="text-xs font-medium text-red-500 mt-0.5 animate-in fade-in duration-200">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
