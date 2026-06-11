import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ColorVar = "orange" | "pink" | "yellow" | "black" | "white" | "cream" | "blue" | "red" | "neutral";

export const colors = {
  orange: "#FF5C00",
  pink: "#FF80FF",
  yellow: "#FFDE00",
  blue: "#2563EB",
  red: "#EF4444",
  black: "#000000",
  white: "#FFFFFF",
  cream: "#FAF9F6",
  neutral: "#9CA3AF"
};

export interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "orange" | "pink" | "yellow" | "blue" | "red" | "white" | "black" | "neutral" | "green";
  variant?: "solid" | "outline";
}

export function NeoButton({ color = "yellow", variant = "solid", className, children, disabled, ...props }: NeoButtonProps) {
  const colorMap = {
    orange: "bg-[#FF5C00]",
    pink: "bg-[#FF80FF]",
    yellow: "bg-[#FFDE00]",
    blue: "bg-[#3B82F6] text-white",
    red: "bg-[#EF4444] text-white",
    white: "bg-white",
    black: "bg-black text-white",
    neutral: "bg-gray-400 text-white"
  };

  const shadowMap = {
    orange: "shadow-[6px_6px_0px_0px_#FF5C00]",
    pink: "shadow-[6px_6px_0px_0px_#FF80FF]",
    yellow: "shadow-[6px_6px_0px_0px_#FFDE00]",
    blue: "shadow-[6px_6px_0px_0px_#2563EB]",
    red: "shadow-[6px_6px_0px_0px_#DC2626]",
    white: "shadow-[6px_6px_0px_0px_#D1D5DB]",
    black: "shadow-[6px_6px_0px_0px_#000000]",
    neutral: "shadow-[6px_6px_0px_0px_#6B7280]"
  };

  const isSolid = variant === "solid";

  return (
    <button
      disabled={disabled}
      className={cn(
        "relative px-6 py-3 font-['Space_Grotesk'] font-bold text-black border-[1.5px] border-black rounded-[4px] uppercase tracking-wider text-sm transition-all duration-150 ease-in-out",
        isSolid ? colorMap[color] : "bg-white",
        !disabled && shadowMap[color],
        !disabled && "hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none active:scale-[0.98]",
        disabled && "opacity-50 cursor-not-allowed translate-x-[6px] translate-y-[6px] shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
