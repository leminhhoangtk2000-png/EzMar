import React, { useState } from "react";
import { cn } from "./NeoButton";
import { Check, ChevronDown, CalendarIcon, X } from "lucide-react";

// Badges
export function Badge({ children, status = "neutral", className }: { children: React.ReactNode, status?: "success" | "warning" | "error" | "neutral" | "info", className?: string }) {
  const statusMap = {
    success: "bg-[#4ADE80] shadow-[3px_3px_0px_0px_#22C55E]",
    warning: "bg-[#FBBF24] shadow-[3px_3px_0px_0px_#D97706]",
    error: "bg-[#F87171] shadow-[3px_3px_0px_0px_#DC2626]",
    neutral: "bg-[#D1D5DB] shadow-[3px_3px_0px_0px_#9CA3AF]",
  };
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-[4px] text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider text-black border-[1.5px] border-black",
      statusMap[status],
      className
    )}>
      {children}
    </span>
  );
}

// Avatar
export function Avatar({ src, fallback, size = "md", className }: { src?: string, fallback: string, size?: "sm" | "md" | "lg", className?: string }) {
  const sizeMap = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
  };
  return (
    <div className={cn(
      "relative inline-flex items-center justify-center rounded-[4px] border-[1.5px] border-black bg-[#FFDE00] shadow-[4px_4px_0px_0px_#000] overflow-hidden font-['Archivo_Black'] text-black",
      sizeMap[size],
      className
    )}>
      {src ? (
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}

// Checkbox
export function Checkbox({ label, id, checked, onChange, error }: { label: string, id: string, checked?: boolean, onChange?: (checked: boolean) => void, error?: boolean }) {
  return (
    <div className="flex items-center space-x-2 font-['Space_Grotesk']">
      <div 
        className={cn(
          "relative flex items-center justify-center w-6 h-6 border-[1.5px] border-black rounded-[4px] bg-white cursor-pointer transition-all",
          checked ? "bg-[#FF5C00] shadow-[3px_3px_0px_0px_#000]" : "shadow-[3px_3px_0px_0px_#000]",
          error && "border-red-500 shadow-[3px_3px_0px_0px_#EF4444]"
        )}
        onClick={() => onChange?.(!checked)}
      >
        {checked && <Check className="w-4 h-4 text-white font-bold" strokeWidth={4} />}
      </div>
      <label htmlFor={id} className={cn("text-sm font-bold cursor-pointer select-none", error && "text-red-500")} onClick={() => onChange?.(!checked)}>
        {label}
      </label>
    </div>
  );
}

// Radio
export function Radio({ label, id, checked, onChange, error }: { label: string, id: string, checked?: boolean, onChange?: (checked: boolean) => void, error?: boolean }) {
  return (
    <div className="flex items-center space-x-2 font-['Space_Grotesk']">
      <div 
        className={cn(
          "relative flex items-center justify-center w-6 h-6 border-[1.5px] border-black rounded-full bg-white cursor-pointer transition-all",
          checked ? "shadow-[3px_3px_0px_0px_#000]" : "shadow-[3px_3px_0px_0px_#000]",
          error && "border-red-500 shadow-[3px_3px_0px_0px_#EF4444]"
        )}
        onClick={() => onChange?.(!checked)}
      >
        {checked && <div className="w-3 h-3 bg-[#FF80FF] rounded-full border-[1.5px] border-black" />}
      </div>
      <label htmlFor={id} className={cn("text-sm font-bold cursor-pointer select-none", error && "text-red-500")} onClick={() => onChange?.(!checked)}>
        {label}
      </label>
    </div>
  );
}

// Toggle Switch
export function ToggleSwitch({ label, checked, onChange }: { label?: string, checked?: boolean, onChange?: (checked: boolean) => void }) {
  return (
    <div className="flex items-center space-x-3 font-['Space_Grotesk']">
      <div 
        className={cn(
          "relative w-12 h-6 rounded-[4px] border-[1.5px] border-black cursor-pointer transition-colors shadow-[3px_3px_0px_0px_#000]",
          checked ? "bg-[#FFDE00]" : "bg-white"
        )}
        onClick={() => onChange?.(!checked)}
      >
        <div className={cn(
          "absolute top-0.5 left-0.5 w-[16px] h-[16px] bg-black rounded-[2px] transition-transform duration-200",
          checked ? "translate-x-6" : "translate-x-0"
        )} />
      </div>
      {label && <span className="text-sm font-bold select-none cursor-pointer" onClick={() => onChange?.(!checked)}>{label}</span>}
    </div>
  );
}

// Textarea
export function Textarea({ label, error, className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string, error?: string }) {
  return (
    <div className={cn("flex flex-col gap-2 w-full font-['Space_Grotesk']", className)}>
      {label && <label className="text-sm font-bold uppercase tracking-wide text-black">{label}</label>}
      <textarea
        className={cn(
          "w-full px-4 py-3 bg-white text-black border-[1.5px] border-black rounded-[4px] text-base font-medium outline-none transition-all duration-150 ease-in-out min-h-[100px]",
          "placeholder:text-gray-400 placeholder:font-normal",
          "focus:border-[3px] focus:px-[14.5px] focus:py-[10.5px]",
          "focus:shadow-[6px_6px_0px_0px_#FF80FF]",
          error && "border-red-500 text-red-500 focus:border-red-500 focus:shadow-[6px_6px_0px_0px_red]"
        )}
        {...props}
      />
      {error && <span className="text-xs font-semibold text-red-500">{error}</span>}
    </div>
  );
}

// Select Menu (Simple custom implementation)
export function SelectMenu({ label, options, value, onChange, forceOpen = false }: { label?: string, options: string[], value?: string, onChange?: (val: string) => void, forceOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(forceOpen);
  return (
    <div className="flex flex-col gap-2 w-full font-['Space_Grotesk'] relative">
      {label && <label className="text-sm font-bold uppercase tracking-wide text-black">{label}</label>}
      <div 
        className={cn(
          "w-full px-4 py-3 bg-white text-black border-[1.5px] border-black rounded-[4px] text-base font-medium outline-none transition-all duration-150 ease-in-out flex justify-between items-center cursor-pointer",
          isOpen ? "border-[3px] px-[14.5px] py-[10.5px] shadow-[6px_6px_0px_0px_#FF5C00]" : ""
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || "Select an option..."}</span>
        <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")} />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border-[1.5px] border-black rounded-[4px] shadow-[6px_6px_0px_0px_#000] z-10 flex flex-col overflow-hidden">
          {options.map((opt, i) => (
            <div 
              key={i} 
              className="px-4 py-3 hover:bg-[#FFDE00] cursor-pointer font-bold border-b-[1.5px] border-black last:border-b-0"
              onClick={() => { onChange?.(opt); setIsOpen(false); }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Tooltip
export function Tooltip({ text, children }: { text: string, children: React.ReactNode }) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black text-white text-xs font-bold font-['Space_Grotesk'] whitespace-nowrap rounded-[4px] border-[1.5px] border-black shadow-[4px_4px_0px_0px_#FFDE00] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black" />
      </div>
    </div>
  );
}

// Modal/Dialog
export function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white border-[3px] border-black rounded-[4px] shadow-[12px_12px_0px_0px_#FF80FF] w-full max-w-md animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b-[3px] border-black bg-[#FFDE00]">
          <h2 className="font-['Archivo_Black'] text-xl uppercase">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-black hover:text-white rounded-[4px] transition-colors border-[1.5px] border-transparent hover:border-black">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 font-['Space_Grotesk']">
          {children}
        </div>
      </div>
    </div>
  );
}

// Toast
export function Toast({ message, type = "info", onClose }: { message: string, type?: "info" | "success" | "error", onClose: () => void }) {
  const typeMap = {
    info: "bg-[#FFDE00] shadow-[6px_6px_0px_0px_#000]",
    success: "bg-[#4ADE80] shadow-[6px_6px_0px_0px_#000]",
    error: "bg-[#F87171] shadow-[6px_6px_0px_0px_#000]",
  };
  return (
    <div className={cn(
      "fixed bottom-4 right-4 flex items-center justify-between p-4 border-[1.5px] border-black rounded-[4px] w-80 z-50 font-['Space_Grotesk'] font-bold animate-in slide-in-from-bottom-5",
      typeMap[type]
    )}>
      <span>{message}</span>
      <button onClick={onClose} className="p-1 hover:bg-black/10 rounded-[4px]">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

// Date Picker (2D style visual rep)
export function DatePicker({ label, value, forceOpen = false }: { label?: string, value?: string, forceOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(forceOpen);
  return (
    <div className="flex flex-col gap-2 w-full font-['Space_Grotesk'] relative">
      {label && <label className="text-sm font-bold uppercase tracking-wide text-black">{label}</label>}
      <div 
        className={cn(
          "w-full px-4 py-3 bg-white text-black border-[1.5px] border-black rounded-[4px] text-base font-medium outline-none transition-all duration-150 ease-in-out flex justify-between items-center cursor-pointer",
          isOpen ? "border-[3px] px-[14.5px] py-[10.5px] shadow-[6px_6px_0px_0px_#00E5FF]" : ""
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || "Pick a date"}</span>
        <CalendarIcon className="w-5 h-5" />
      </div>
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-64 bg-white border-[1.5px] border-black rounded-[4px] shadow-[6px_6px_0px_0px_#000] z-20 p-4">
          <div className="flex justify-between items-center mb-4 pb-2 border-b-[1.5px] border-black">
            <span className="font-bold">April 2026</span>
            <div className="flex gap-2">
              <span className="cursor-pointer">&lt;</span>
              <span className="cursor-pointer">&gt;</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm font-bold mb-2">
            {['S','M','T','W','T','F','S'].map((d, i) => <span key={`${d}-${i}`} className="text-gray-500">{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {Array.from({length: 30}).map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "p-1 cursor-pointer rounded-[2px] border-[1.5px] border-transparent hover:border-black",
                  i + 1 === 15 ? "bg-[#FF80FF] border-black shadow-[2px_2px_0px_0px_#000]" : ""
                )}
                onClick={() => setIsOpen(false)}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}