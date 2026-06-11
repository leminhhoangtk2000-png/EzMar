import React, { useState } from "react";
import { cn } from "./NeoButton";
import { Avatar, Badge } from "./UIComponents";
import { LayoutDashboard, Users, FileText, Settings, LogOut, Search, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";

export function SidebarNav({ className }: { className?: string }) {
  const [active, setActive] = useState("Dashboard");
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Campaigns", icon: FileText },
    { name: "Audience", icon: Users },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className={cn("w-64 h-full bg-[#FAF9F6] border-r-[1.5px] border-black flex flex-col font-['Space_Grotesk']", className)}>
      <div className="p-6 border-b-[1.5px] border-black flex items-center gap-3">
        <div className="w-8 h-8 bg-[#FF5C00] border-[1.5px] border-black rounded-[4px] shadow-[3px_3px_0px_0px_#000]" />
        <h2 className="font-['Archivo_Black'] text-xl uppercase tracking-wider">Marketo</h2>
      </div>
      
      <div className="flex-1 p-4 flex flex-col gap-2">
        {navItems.map(item => (
          <div 
            key={item.name}
            onClick={() => setActive(item.name)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-[4px] cursor-pointer transition-all border-[1.5px] border-transparent font-bold",
              active === item.name 
                ? "bg-[#FFDE00] border-black shadow-[4px_4px_0px_0px_#000]" 
                : "hover:bg-black/5"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <div className="p-4 border-t-[1.5px] border-black flex items-center gap-3 mt-auto bg-white">
        <Avatar fallback="JS" src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdmF0YXJ8ZW58MHx8fHwxNzUwMzgxOTM2fDA&ixlib=rb-4.1.0&q=80&w=100" />
        <div className="flex flex-col flex-1">
          <span className="font-bold text-sm">Jane Smith</span>
          <span className="text-xs text-gray-500">Admin</span>
        </div>
        <LogOut className="w-5 h-5 cursor-pointer text-gray-500 hover:text-black" />
      </div>
    </div>
  );
}

export function TaskCardBlank({ className }: { className?: string }) {
  return (
    <div className={cn(
      "bg-white border-[1.5px] border-black rounded-[4px] p-4 shadow-[3px_3px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#000] hover:-translate-y-[2px] hover:-translate-x-[2px] transition-all flex flex-col gap-3 font-['Space_Grotesk']",
      className
    )}>
      <div className="flex justify-between items-start">
        <Badge status="warning">In Progress</Badge>
        <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="font-['Archivo_Black'] text-base uppercase leading-tight">Design New Landing Page</h3>
        <p className="text-xs text-gray-600 line-clamp-2 font-medium">Create wireframes and high-fidelity mockups for the upcoming Q3 marketing campaign.</p>
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t-[1.5px] border-dashed border-black/30 mt-auto">
        <div className="flex -space-x-2">
          <Avatar size="sm" fallback="AB" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" className="w-6 h-6 text-[10px]" />
          <Avatar size="sm" fallback="CD" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" className="w-6 h-6 text-[10px]" />
        </div>
        <span className="text-[10px] font-bold bg-[#FAF9F6] px-2 py-1 rounded-[4px] border-[1.5px] border-black shadow-[2px_2px_0px_0px_#000]">
          Due Apr 15
        </span>
      </div>
    </div>
  );
}

export function DataTable({ className }: { className?: string }) {
  const data = [
    { id: "CMP-01", name: "Summer Sale 2026", status: "Active", budget: "$15,000", roi: "+24%" },
    { id: "CMP-02", name: "Back to School", status: "Draft", budget: "$8,500", roi: "-" },
    { id: "CMP-03", name: "Holiday Special", status: "Completed", budget: "$25,000", roi: "+42%" },
  ];

  return (
    <div className={cn(
      "w-full bg-white border-[1.5px] border-black rounded-[4px] shadow-[8px_8px_0px_0px_#FF5C00] font-['Space_Grotesk'] overflow-hidden flex flex-col",
      className
    )}>
      {/* Toolbar */}
      <div className="p-4 border-b-[1.5px] border-black flex justify-between items-center bg-[#FAF9F6]">
        <h3 className="font-['Archivo_Black'] text-lg uppercase">Campaigns</h3>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 text-sm border-[1.5px] border-black rounded-[4px] focus:outline-none focus:shadow-[4px_4px_0px_0px_#FFDE00] transition-shadow w-48"
          />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 p-4 border-b-[1.5px] border-black bg-[#FFDE00] font-bold text-sm uppercase tracking-wider">
        <div className="col-span-1">ID</div>
        <div className="col-span-2">Name</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-1 text-right">Budget</div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {data.map((row, i) => (
          <div 
            key={row.id} 
            className={cn(
              "grid grid-cols-5 gap-4 p-4 border-b-[1.5px] border-black text-sm items-center hover:bg-black/5 transition-colors cursor-pointer",
              i === data.length - 1 && "border-b-0"
            )}
          >
            <div className="col-span-1 font-mono text-gray-500">{row.id}</div>
            <div className="col-span-2 font-bold">{row.name}</div>
            <div className="col-span-1">
              <Badge status={row.status === "Active" ? "success" : row.status === "Draft" ? "neutral" : "warning"}>
                {row.status}
              </Badge>
            </div>
            <div className="col-span-1 text-right font-mono font-bold">{row.budget}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="p-4 border-t-[1.5px] border-black flex justify-between items-center bg-[#FAF9F6]">
        <span className="text-sm font-bold text-gray-600">Showing 1-3 of 12</span>
        <div className="flex gap-2">
          <button className="p-1 border-[1.5px] border-black rounded-[4px] hover:bg-[#FF80FF] hover:shadow-[3px_3px_0px_0px_#000] transition-all disabled:opacity-50 disabled:shadow-none bg-white">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-1 border-[1.5px] border-black rounded-[4px] hover:bg-[#FF80FF] hover:shadow-[3px_3px_0px_0px_#000] transition-all bg-white">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}