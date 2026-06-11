import React from "react";
import { cn } from "./NeoButton";

export interface NeoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  accentColor?: "orange" | "pink" | "yellow";
}

export function NeoInput({
  label,
  error,
  helperText,
  accentColor = "yellow",
  className,
  ...props
}: NeoInputProps) {
  const shadowMap = {
    orange: "focus:shadow-[6px_6px_0px_0px_#FF5C00]",
    pink: "focus:shadow-[6px_6px_0px_0px_#FF80FF]",
    yellow: "focus:shadow-[6px_6px_0px_0px_#FFDE00]",
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full font-['Space_Grotesk']", className)}>
      {label && <label className="text-sm font-bold uppercase tracking-wide text-black">{label}</label>}
      <input
        className={cn(
          "w-full px-4 py-3 bg-white text-black border-[1.5px] border-black rounded-[4px] text-base font-medium outline-none transition-all duration-150 ease-in-out",
          "placeholder:text-gray-400 placeholder:font-normal",
          "focus:border-[3px] focus:px-[14.5px] focus:py-[10.5px]",
          shadowMap[accentColor],
          error && "border-red-500 text-red-500 focus:border-red-500 focus:shadow-[6px_6px_0px_0px_red]"
        )}
        {...props}
      />
      {(error || helperText) && (
        <span className={cn("text-xs font-semibold", error ? "text-red-500" : "text-gray-500")}>
          {error || helperText}
        </span>
      )}
    </div>
  );
}
