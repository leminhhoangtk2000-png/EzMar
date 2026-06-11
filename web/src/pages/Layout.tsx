import React, { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Bell, Search, Download, ChevronRight } from "lucide-react";
import { NeoButton } from "../components/NeoButton";
import { cn } from "../components/NeoButton";
import { Sidebar } from "../components/Sidebar";
import { PlaybookPanel } from "../components/PlaybookPanel";

export function Layout() {
  const location = useLocation();
  const [playbookOpen, setPlaybookOpen] = useState(false);

  // Breadcrumb logic
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = [
    "Home",
    ...pathParts.map(p =>
      p.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    ),
  ];

  return (
    <div className="flex h-screen bg-[#FAF9F6] text-black font-['Space_Grotesk'] overflow-hidden">

      {/* ── Left Sidebar ─────────────────────────────────────────── */}
      <Sidebar onPlaybookOpen={() => setPlaybookOpen(true)} />

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#FAF9F6] relative z-10 overflow-hidden">

        {/* Top Header */}
        <header className="h-14 flex-shrink-0 bg-white border-b-[1.5px] border-black flex items-center justify-between px-6 z-20">

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm font-bold">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-300" />}
                <span className={cn(
                  i === breadcrumbs.length - 1
                    ? "text-black bg-[#FFDE00] px-2 py-0.5 rounded-[2px] border-[1.5px] border-black shadow-[2px_2px_0px_0px_#000] text-[11px]"
                    : "text-gray-400 text-[11px]"
                )}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-8 pr-4 py-1.5 text-[11px] font-bold border-[1.5px] border-black rounded-[4px]
                           focus:outline-none focus:shadow-[3px_3px_0px_0px_#FF80FF] transition-shadow
                           w-52 bg-[#FAF9F6] placeholder:text-gray-300"
              />
            </div>

            <NeoButton color="white" className="!py-1.5 !px-3 h-auto text-[11px] flex gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Export PDF
            </NeoButton>

            <div className="relative w-9 h-9 flex items-center justify-center border-[1.5px] border-black
                            rounded-[4px] bg-white cursor-pointer hover:bg-[#FFDE00] transition-colors
                            shadow-[2px_2px_0px_0px_#000]">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#FF5C00] border-[1.5px] border-black
                               rounded-full flex items-center justify-center text-[8px] font-bold text-white">
                3
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8 relative">
          {/* Subtle dot grid background */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}
          />
          <div className="relative z-10">
            <Outlet />
          </div>
        </div>
      </main>

      {/* ── Beloved Brands Playbook Panel ─────────────────────────── */}
      <PlaybookPanel open={playbookOpen} onClose={() => setPlaybookOpen(false)} />
    </div>
  );
}
