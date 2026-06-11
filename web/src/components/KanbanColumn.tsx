import React from "react";
import { cn } from "./NeoButton";
import { MoreVertical, Plus } from "lucide-react";


export interface KanbanColumnProps {
  title: string;
  count?: number;
  color?: "orange" | "pink" | "yellow";
  children: React.ReactNode;
}

export function KanbanColumn({ title, count = 0, color = "yellow", children }: KanbanColumnProps) {
  const colorMap = {
    orange: "bg-[#FF5C00]",
    pink: "bg-[#FF80FF]",
    yellow: "bg-[#FFDE00]",
  };

  const shadowMap = {
    orange: "shadow-[6px_6px_0px_0px_#FF5C00]",
    pink: "shadow-[6px_6px_0px_0px_#FF80FF]",
    yellow: "shadow-[6px_6px_0px_0px_#FFDE00]",
  };

  return (
    <div
      className={cn(
        "flex flex-col w-[320px] min-w-[320px] h-full bg-white border-[1.5px] border-black rounded-[4px] font-['Space_Grotesk']",
        shadowMap[color],
        "transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_var(--tw-shadow-color)]", // making it pop on hover slightly
      )}
      style={{ "--tw-shadow-color": color === "orange" ? "#FF5C00" : color === "pink" ? "#FF80FF" : "#FFDE00" } as React.CSSProperties}
    >
      {/* Header */}
      <div className={cn("flex items-center justify-between p-4 border-b-[1.5px] border-black", colorMap[color])}>
        <div className="flex items-center gap-3">
          <h3 className="font-['Archivo_Black'] text-lg text-black tracking-wide uppercase">{title}</h3>
          <span className="flex items-center justify-center w-6 h-6 bg-white border-[1.5px] border-black rounded-full text-xs font-bold text-black">
            {count}
          </span>
        </div>
        <button className="text-black hover:bg-black/10 p-1 rounded-sm transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 bg-[#FAF9F6] flex flex-col gap-4 overflow-y-auto">
        {children}
      </div>

      {/* Footer / Add Button */}
      <div className="p-4 bg-white border-t-[1.5px] border-black">
        <button className="flex w-full items-center gap-2 justify-center py-2 font-bold text-black border-[1.5px] border-dashed border-black hover:border-solid hover:bg-black hover:text-white transition-all rounded-[4px] uppercase text-sm tracking-wide">
          <Plus size={18} /> Add Task
        </button>
      </div>
    </div>
  );
}

export interface KanbanCardProps {
  title: string;
  tag?: string;
  tagColor?: "orange" | "pink" | "yellow";
  date?: string;
  avatar?: string;
}

export function KanbanCard({ title, tag, tagColor = "pink", date, avatar }: KanbanCardProps) {
  const tagColorMap = {
    orange: "bg-[#FF5C00]",
    pink: "bg-[#FF80FF]",
    yellow: "bg-[#FFDE00]",
  };

  return (
    <div className="bg-white p-4 border-[1.5px] border-black rounded-[4px] shadow-[3px_3px_0px_0px_#000000] cursor-grab active:cursor-grabbing hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[5px_5px_0px_0px_#000000] transition-all flex flex-col gap-3 group">
      {tag && (
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-wider px-2 py-1 border-[1.5px] border-black rounded-sm w-fit inline-block",
            tagColorMap[tagColor]
          )}
        >
          {tag}
        </span>
      )}
      <p className="font-bold text-sm text-black leading-snug font-['Space_Grotesk']">{title}</p>
      
      <div className="flex items-center justify-between mt-2 pt-3 border-t-[1.5px] border-black/20">
        <span className="text-xs font-semibold text-gray-500">{date}</span>
        {avatar && (
          <img src={avatar} alt="Assignee" className="w-6 h-6 rounded-full border-[1.5px] border-black object-cover" />
        )}
      </div>
    </div>
  );
}
