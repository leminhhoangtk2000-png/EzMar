import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import {
  Activity, Target, Calendar, Zap, LayoutDashboard,
  Building2, Brain, Users, Grid2X2, Fingerprint,
  BarChart3, TrendingUp, Filter, Layers,
  KeyRound, AlertCircle, MapPin,
  LayoutGrid, Table2, PenTool,
  CheckSquare, Sparkles, ClipboardCheck,
  Plug, Users2, Settings, BookOpen,
  Lock, Check, ChevronDown, ChevronLeft, ChevronRight,
  Plus, CircleDot,
} from "lucide-react";
import { cn } from "./NeoButton";
import { useBrand } from "../context/BrandContext";

// ── Types ────────────────────────────────────────────────────────────────────
interface SubItem {
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  comingSoon?: boolean;
}
interface SubGroup {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: SubItem[];
}
interface StrategyVersion {
  id: number;
  name: string;
  date: string;
  isActive: boolean;
}
interface ModuleConfig {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  subGroups?: SubGroup[];   // grouped nav — used by Current Status
  subItems?: SubItem[];     // flat nav — used by Planning / Execution
  isMultiVersion?: boolean; // version selector — used by Strategy
}

// ── Module Definitions ───────────────────────────────────────────────────────
const MODULES: ModuleConfig[] = [
  {
    id: 1,
    title: "Current Status",
    icon: Activity,
    color: "#FFDE00",
    subGroups: [
      {
        label: "Current Brand Keys",
        icon: KeyRound,
        items: [
          { title: "Basic Identity",    path: "/current-status/basic-identity",   icon: Building2 },
          { title: "Core Strength",     path: "/current-status/core-strength",    icon: Brain },
          { title: "Key Competitors",   path: "/current-status/key-competitors",  icon: Grid2X2 },
          { title: "Target Customer",   path: "/current-status/target-customer",  icon: Users },
          { title: "Strategic DNA",     path: "#dna",                             icon: Fingerprint, comingSoon: true },
        ],
      },
      {
        label: "Brand Audit",
        icon: BarChart3,
        items: [
          { title: "Sales & Profit",    path: "#sales",      icon: TrendingUp, comingSoon: true },
          { title: "Funnel",            path: "#funnel",     icon: Filter,     comingSoon: true },
          { title: "Competitor",        path: "#comp-audit", icon: Layers,     comingSoon: true },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Strategy",
    icon: Target,
    color: "#FF5C00",
    isMultiVersion: true,
    subItems: [
      { title: "Brand Positioning",   path: "/planning/brand-positioning", icon: KeyRound },
      { title: "Key Issues",          path: "#s-issues",                   icon: AlertCircle, comingSoon: true },
      { title: "Touchpoints Mapping", path: "/planning/brand-idea",        icon: MapPin },
    ],
  },
  {
    id: 3,
    title: "Planning",
    icon: Calendar,
    color: "#00C2FF",
    subItems: [
      { title: "ROE Grid",         path: "/planning/brand-plan", icon: LayoutGrid },
      { title: "Execution Grid",   path: "#p-exec",              icon: Table2,   comingSoon: true },
      { title: "Creative Briefs",  path: "#p-brief",             icon: PenTool,  comingSoon: true },
    ],
  },
  {
    id: 4,
    title: "Execution",
    icon: Zap,
    color: "#B4FF6E",
    subItems: [
      { title: "Task Management",  path: "#exec-tasks", icon: CheckSquare,    comingSoon: true },
      { title: "AI Assistants",    path: "#exec-ai",    icon: Sparkles,       comingSoon: true },
      { title: "ABC's Checklist",  path: "#exec-check", icon: ClipboardCheck, comingSoon: true },
    ],
  },
];

const BOTTOM_LINKS = [
  { title: "Integrations", icon: Plug },
  { title: "Team & PICs",  icon: Users2 },
  { title: "Settings",     icon: Settings },
];

const MOCK_BRANDS = [
  { name: "Acme Corp",    category: "FMCG" },
  { name: "TechNova",     category: "B2B SaaS" },
  { name: "Bloom Beauty", category: "Cosmetics" },
];

// ── Progress Ring ────────────────────────────────────────────────────────────
function ProgressRing({ pct, size = 28, locked = false }: { pct: number; size?: number; locked?: boolean }) {
  const sw = 2.5;
  const r  = (size - sw * 2) / 2;
  const circ   = 2 * Math.PI * r;
  const offset = circ - (Math.min(pct, 100) / 100) * circ;
  const complete = pct >= 100;
  const fill = complete ? "#22C55E" : pct >= 50 ? "#FFDE00" : pct > 0 ? "#FF5C00" : "#D1D5DB";

  if (locked) {
    return (
      <div className="flex-shrink-0 flex items-center justify-center rounded-full bg-gray-100 border-[1.5px] border-gray-300"
        style={{ width: size, height: size }}>
        <Lock className="w-3 h-3 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="relative flex-shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0" style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={sw} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={fill} strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={pct > 0 ? offset : circ} strokeLinecap="round" />
      </svg>
      {complete
        ? <Check className="w-2.5 h-2.5 text-green-500 relative z-10" />
        : <span className="relative z-10 text-[8px] font-black leading-none" style={{ color: fill }}>
            {pct > 0 ? pct : ""}
          </span>
      }
    </div>
  );
}

// ── Tooltip (collapsed mode) ─────────────────────────────────────────────────
function SideTooltip({ label, children, sublabel }: { label: string; children: React.ReactNode; sublabel?: string }) {
  return (
    <div className="relative group/tip">
      {children}
      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-[999] pointer-events-none
                      opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150">
        <div className="bg-black text-white text-[11px] font-bold px-2.5 py-1.5 rounded-[4px]
                        whitespace-nowrap shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)] flex items-center gap-1.5">
          <span>{label}</span>
          {sublabel && <span className="text-gray-400 font-normal text-[10px]">{sublabel}</span>}
        </div>
        <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0
                        border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent
                        border-r-[6px] border-r-black" />
      </div>
    </div>
  );
}

// ── Progress computation ─────────────────────────────────────────────────────
function computeProgress(brandData: any): Record<number, number> {
  if (!brandData) return { 1: 0, 2: 0, 3: 0, 4: 0 };
  let status = 0;
  if (brandData.brandName)        status += 20;
  if (brandData.category)         status += 15;
  if (brandData.brandDescription) status += 15;
  if (Array.isArray(brandData.targetSegments) && brandData.targetSegments.length > 0) status += 25;
  if (Array.isArray(brandData.brandValues)    && brandData.brandValues.length > 0)    status += 25;
  return { 1: Math.min(status, 100), 2: 0, 3: 0, 4: 0 };
}

// ── Sub-item Row ─────────────────────────────────────────────────────────────
function SubItemRow({ sub, isActive }: { sub: SubItem; isActive: boolean }) {
  const Icon = sub.icon;
  const base = "flex items-center gap-2 py-1.5 px-2 rounded-[4px] border-[1.5px] transition-all";
  if (sub.comingSoon) {
    return (
      <div className="flex items-center gap-2 py-1.5 px-2 rounded-[4px] opacity-40 cursor-default">
        <Icon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span className="flex-1 text-[11px] font-bold text-gray-400 truncate">{sub.title}</span>
        <span className="text-[8px] font-bold uppercase tracking-widest bg-black/10 text-gray-500 px-1.5 py-0.5 rounded-[2px] flex-shrink-0">
          Soon
        </span>
      </div>
    );
  }
  return (
    <NavLink to={sub.path} end={sub.path === "/"}
      className={() => cn(base, isActive
        ? "bg-[#00E5FF] border-black shadow-[2px_2px_0px_0px_#000]"
        : "border-transparent hover:bg-black/5 hover:border-black/10"
      )}
    >
      <Icon className={cn("w-3.5 h-3.5 flex-shrink-0", isActive ? "text-black" : "text-gray-500")} />
      <span className={cn("flex-1 text-[11px] font-bold truncate", isActive ? "text-black" : "text-gray-600")}>
        {sub.title}
      </span>
    </NavLink>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────────────────
interface SidebarProps { onPlaybookOpen: () => void }

export function Sidebar({ onPlaybookOpen }: SidebarProps) {
  const [collapsed,     setCollapsed]     = useState(false);
  const [expandedId,    setExpandedId]    = useState<number>(1);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [lockedMsg,     setLockedMsg]     = useState<number | null>(null);
  const [activeBrand,   setActiveBrand]   = useState(0);

  // Strategy multi-version state
  const [strategyVersions, setStrategyVersions] = useState<StrategyVersion[]>([
    { id: 1, name: "Strategy v1", date: "Apr 2025", isActive: true },
  ]);

  const workspaceRef = useRef<HTMLDivElement>(null);
  const { brandData }   = useBrand();
  const location        = useLocation();
  const progress        = computeProgress(brandData);

  const brandName     = brandData?.brandName || MOCK_BRANDS[activeBrand].name;
  const brandCat      = brandData?.category  || MOCK_BRANDS[activeBrand].category;
  const brandInitials = brandName.slice(0, 2).toUpperCase();

  // Lock logic
  const hasActiveStrategy = strategyVersions.some(v => v.isActive);
  const isLocked = (id: number) => {
    if (id === 1) return false;
    if (id === 2) return progress[1] < 20;
    if (id === 3) return !hasActiveStrategy || progress[1] < 20;
    if (id === 4) return progress[3] < 1 && !hasActiveStrategy;
    return true;
  };

  // Close workspace dropdown on outside click
  useEffect(() => {
    if (!workspaceOpen) return;
    const h = (e: MouseEvent) => {
      if (workspaceRef.current && !workspaceRef.current.contains(e.target as Node))
        setWorkspaceOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [workspaceOpen]);

  const handleModuleClick = (id: number) => {
    if (isLocked(id)) {
      if (!collapsed) {
        setLockedMsg(id);
        setTimeout(() => setLockedMsg(null), 3000);
      }
      return;
    }
    if (collapsed) { setCollapsed(false); setExpandedId(id); return; }
    setExpandedId(expandedId === id ? 0 : id);
  };

  const isSubActive = (path: string) => !path.startsWith("#") && location.pathname === path;

  const isModuleActive = (mod: ModuleConfig) => {
    if (mod.subItems) return mod.subItems.some(s => isSubActive(s.path));
    if (mod.subGroups) return mod.subGroups.some(g => g.items.some(s => isSubActive(s.path)));
    return false;
  };

  const addStrategyVersion = () => {
    const next = strategyVersions.length + 1;
    setStrategyVersions(v => [...v, {
      id: next, name: `Strategy v${next}`, date: "Apr 2025", isActive: false
    }]);
  };
  const setActiveVersion = (id: number) => {
    setStrategyVersions(v => v.map(ver => ({ ...ver, isActive: ver.id === id })));
  };

  // Lock hint messages per module
  const lockHints: Record<number, string> = {
    2: "Complete Current Status → Brand Keys first.",
    3: "Create & activate a Strategy version first.",
    4: "Complete Planning before Execution.",
  };

  return (
    <aside
      className={cn(
        "relative flex-shrink-0 bg-white border-r-[1.5px] border-black flex flex-col z-20",
        "transition-[width] duration-300 ease-in-out overflow-hidden",
        collapsed ? "w-[56px]" : "w-64"
      )}
      style={{ minHeight: "100vh" }}
    >
      {/* ── Logo ─────────────────────────────────────────────────── */}
      <div className={cn(
        "flex-shrink-0 border-b-[1.5px] border-black bg-black",
        collapsed ? "h-12 flex justify-center items-center" : "px-4 py-3 flex items-center gap-2.5"
      )}>
        {collapsed
          ? <SideTooltip label="Beloved Brands">
              <div className="w-7 h-7 bg-[#FFDE00] rounded-[3px] flex items-center justify-center">
                <span className="font-['Archivo_Black'] text-[9px] text-black">BB</span>
              </div>
            </SideTooltip>
          : <>
              <div className="w-7 h-7 bg-[#FFDE00] rounded-[3px] flex items-center justify-center flex-shrink-0">
                <span className="font-['Archivo_Black'] text-[9px] text-black">BB</span>
              </div>
              <span className="font-['Archivo_Black'] text-[11px] uppercase tracking-widest text-white whitespace-nowrap">
                Beloved Brands
              </span>
            </>
        }
      </div>

      {/* ── Brand Workspace ──────────────────────────────────────── */}
      <div
        ref={workspaceRef}
        className={cn(
          "flex-shrink-0 relative border-b-[1.5px] border-black bg-[#FFDE00]",
          collapsed ? "p-2 flex justify-center" : "p-3"
        )}
      >
        {collapsed
          ? <SideTooltip label={brandName} sublabel={brandCat}>
              <button onClick={() => { setCollapsed(false); setWorkspaceOpen(true); }}
                className="w-8 h-8 bg-[#FF5C00] border-[1.5px] border-black rounded-[4px]
                           shadow-[2px_2px_0px_0px_#000] flex items-center justify-center
                           font-['Archivo_Black'] text-white text-[10px]">
                {brandInitials}
              </button>
            </SideTooltip>
          : <>
              <button onClick={() => setWorkspaceOpen(v => !v)}
                className="w-full flex items-center gap-2.5 bg-white p-2 rounded-[4px] border-[1.5px] border-black
                           shadow-[3px_3px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000]
                           hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                <div className="w-7 h-7 bg-[#FF5C00] border-[1.5px] border-black rounded-[4px]
                                flex items-center justify-center font-['Archivo_Black'] text-white text-[10px] flex-shrink-0">
                  {brandInitials}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="font-['Archivo_Black'] text-[11px] uppercase truncate leading-tight">{brandName}</div>
                  <div className="text-[9px] font-bold text-gray-500 truncate">{brandCat}</div>
                </div>
                <ChevronDown className={cn("w-3.5 h-3.5 flex-shrink-0 transition-transform", workspaceOpen && "rotate-180")} />
              </button>
              {workspaceOpen && (
                <div className="absolute top-full left-3 right-3 mt-1 bg-white border-[1.5px] border-black
                                rounded-[4px] shadow-[4px_4px_0px_0px_#000] z-50 overflow-hidden">
                  {MOCK_BRANDS.map((b, i) => (
                    <button key={b.name} onClick={() => { setActiveBrand(i); setWorkspaceOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-[#FFDE00] transition-colors",
                        i < MOCK_BRANDS.length - 1 && "border-b border-black/10"
                      )}>
                      <div className="w-5 h-5 bg-black/10 border border-black/20 rounded-[2px]
                                      flex items-center justify-center text-[8px] font-black">
                        {b.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold truncate">{b.name}</div>
                        <div className="text-[9px] text-gray-400">{b.category}</div>
                      </div>
                      {i === activeBrand && <Check className="w-3 h-3 text-[#FF5C00] flex-shrink-0" />}
                    </button>
                  ))}
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold
                                     text-[#FF5C00] hover:bg-[#FF5C00] hover:text-white transition-colors
                                     border-t border-black/10">
                    <Plus className="w-3.5 h-3.5" /> New Brand
                  </button>
                </div>
              )}
            </>
        }
      </div>

      {/* ── Overview Dashboard ───────────────────────────────────── */}
      <div className="flex-shrink-0 px-2 py-2 border-b-[1.5px] border-black/10">
        {collapsed
          ? <SideTooltip label="Overview Dashboard">
              <NavLink to="/" end className={({ isActive }) => cn(
                "w-8 h-8 mx-auto flex items-center justify-center rounded-[4px] border-[1.5px] transition-all",
                isActive ? "bg-[#00E5FF] border-black shadow-[2px_2px_0px_0px_#000]"
                         : "border-transparent hover:bg-black/5 hover:border-black/20"
              )}>
                <LayoutDashboard className="w-4 h-4" />
              </NavLink>
            </SideTooltip>
          : <NavLink to="/" end className={({ isActive }) => cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-[4px] border-[1.5px] transition-all font-bold",
              isActive ? "bg-[#00E5FF] border-black shadow-[2px_2px_0px_0px_#000]"
                       : "border-transparent hover:bg-black/5 hover:border-black/10 text-gray-600"
            )}>
              <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
              <span className="text-[11px] uppercase tracking-wide">Overview Dashboard</span>
            </NavLink>
        }
      </div>

      {/* ── Main Navigation ──────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2 flex flex-col gap-0.5">
        {!collapsed && (
          <p className="text-[8px] font-bold uppercase tracking-widest text-gray-400 px-2 pb-1 pt-0.5">
            Core Modules
          </p>
        )}

        {MODULES.map((mod) => {
          const locked   = isLocked(mod.id);
          const expanded = expandedId === mod.id && !collapsed;
          const active   = isModuleActive(mod);
          const pct      = progress[mod.id] ?? 0;
          const Icon     = mod.icon;

          return (
            <div key={mod.id}>

              {/* ── Module Parent Button ── */}
              {collapsed
                ? <SideTooltip label={`${mod.id}. ${mod.title}`}
                               sublabel={locked ? "🔒 Locked" : `${pct}% complete`}>
                    <button onClick={() => handleModuleClick(mod.id)}
                      className={cn(
                        "relative w-10 h-10 mx-auto flex items-center justify-center rounded-[4px] border-[1.5px] transition-all",
                        locked ? "border-gray-200 bg-gray-50 opacity-40 cursor-not-allowed"
                               : active
                                 ? "border-black shadow-[2px_2px_0px_0px_#000]"
                                 : "border-transparent hover:bg-black/5 hover:border-black/20"
                      )}
                      style={active && !locked ? { backgroundColor: mod.color } : {}}
                    >
                      {locked
                        ? <Lock className="w-3.5 h-3.5 text-gray-400" />
                        : <>
                            <Icon className="w-4 h-4" />
                            <div className="absolute -top-1.5 -right-1.5">
                              <ProgressRing pct={pct} size={14} />
                            </div>
                          </>
                      }
                    </button>
                  </SideTooltip>
                : <button onClick={() => handleModuleClick(mod.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-2 rounded-[4px] border-[1.5px] transition-all text-left",
                      locked
                        ? "border-transparent opacity-40 cursor-not-allowed"
                        : expanded || active
                          ? "border-black shadow-[3px_3px_0px_0px_#000] -translate-x-[1px] -translate-y-[1px]"
                          : "border-transparent hover:bg-black/5 hover:border-black/20"
                    )}
                    style={!locked && (expanded || active) ? { backgroundColor: mod.color } : {}}
                  >
                    <span className={cn(
                      "flex-shrink-0 w-5 h-5 flex items-center justify-center text-[9px] font-black",
                      "border-[1.5px] border-black rounded-[3px]",
                      expanded || active ? "bg-white/60" : "bg-black/5"
                    )}>
                      {mod.id}
                    </span>
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-[11px] font-bold uppercase tracking-wide truncate">{mod.title}</span>
                    {locked
                      ? <Lock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      : <ProgressRing pct={pct} size={26} />
                    }
                  </button>
              }

              {/* ── Locked Toast ── */}
              {lockedMsg === mod.id && !collapsed && (
                <div className="mx-1 mt-1 px-3 py-2 bg-black text-white text-[10px] font-bold
                                rounded-[4px] border-[1.5px] border-black shadow-[2px_2px_0px_0px_#FF5C00]
                                flex items-start gap-2">
                  <Lock className="w-3 h-3 flex-shrink-0 mt-0.5 text-[#FFDE00]" />
                  <span>{lockHints[mod.id] ?? "Complete previous modules first."}</span>
                </div>
              )}

              {/* ── Expanded Content ── */}
              {expanded && !locked && (
                <div className="mt-0.5 flex flex-col">

                  {/* ── A: Current Status — grouped sub-items ── */}
                  {mod.subGroups && (
                    <div className="flex flex-col gap-0">
                      {mod.subGroups.map((group, gi) => {
                        const GIcon = group.icon;
                        return (
                          <div key={group.label} className={cn(gi > 0 && "mt-1")}>
                            {/* Group header */}
                            <div className="flex items-center gap-1.5 px-3 pt-2 pb-1.5">
                              <div className="h-[1.5px] w-3 rounded-full"
                                   style={{ backgroundColor: mod.color }} />
                              <GIcon className="w-3 h-3 text-gray-400 flex-shrink-0" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 truncate">
                                {group.label}
                              </span>
                            </div>

                            {/* Items */}
                            <div className="flex flex-col gap-0.5 pl-4 pr-1 relative">
                              <div className="absolute left-[10px] top-0 bottom-2 w-[1.5px] rounded-full"
                                   style={{ backgroundColor: mod.color + "60" }} />
                              {group.items.map(sub => (
                                <SubItemRow key={sub.title} sub={sub} isActive={isSubActive(sub.path)} />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* ── B: Strategy — multi-version + sub-items ── */}
                  {mod.isMultiVersion && mod.subItems && (
                    <div className="flex flex-col gap-2 px-1 pt-1 pb-1.5">

                      {/* Version list */}
                      <div>
                        <div className="flex items-center gap-1.5 px-2 pb-1.5">
                          <div className="h-[1.5px] w-3 rounded-full" style={{ backgroundColor: mod.color }} />
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                            Versions
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          {strategyVersions.map(ver => (
                            <div key={ver.id}
                              className={cn(
                                "flex items-center gap-2 px-2.5 py-2 rounded-[4px] border-[1.5px] border-black transition-all",
                                ver.isActive
                                  ? "shadow-[2px_2px_0px_0px_#000] -translate-x-[1px] -translate-y-[1px]"
                                  : "bg-white hover:bg-black/5"
                              )}
                              style={ver.isActive ? { backgroundColor: mod.color + "40" } : {}}
                            >
                              {ver.isActive
                                ? <CircleDot className="w-3.5 h-3.5 flex-shrink-0 text-[#FF5C00]" />
                                : <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-gray-300 flex-shrink-0" />
                              }
                              <div className="flex-1 min-w-0">
                                <div className="text-[11px] font-bold truncate">{ver.name}</div>
                                <div className="text-[9px] text-gray-400">{ver.date}</div>
                              </div>
                              {ver.isActive
                                ? <span className="text-[8px] font-black uppercase tracking-widest
                                                   bg-[#FF5C00] text-white px-1.5 py-0.5 rounded-[2px] flex-shrink-0">
                                    Active
                                  </span>
                                : <button onClick={() => setActiveVersion(ver.id)}
                                    className="text-[9px] font-bold text-gray-400 hover:text-[#FF5C00] flex-shrink-0 transition-colors">
                                    Activate
                                  </button>
                              }
                            </div>
                          ))}
                          <button onClick={addStrategyVersion}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-bold
                                       text-[#FF5C00] border-[1.5px] border-dashed border-[#FF5C00]/60
                                       rounded-[4px] hover:bg-[#FF5C00]/5 hover:border-[#FF5C00] transition-all">
                            <Plus className="w-3.5 h-3.5" /> New Strategy Version
                          </button>
                        </div>
                      </div>

                      {/* Active strategy sub-items */}
                      {hasActiveStrategy && (
                        <div>
                          <div className="flex items-center gap-1.5 px-2 pb-1.5">
                            <div className="h-[1.5px] w-3 rounded-full" style={{ backgroundColor: mod.color }} />
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                              Active Strategy
                            </span>
                          </div>
                          <div className="flex flex-col gap-0.5 pl-4 pr-1 relative">
                            <div className="absolute left-[10px] top-0 bottom-2 w-[1.5px] rounded-full"
                                 style={{ backgroundColor: mod.color + "60" }} />
                            {mod.subItems.map(sub => (
                              <SubItemRow key={sub.title} sub={sub} isActive={isSubActive(sub.path)} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── C: Planning / Execution — flat sub-items ── */}
                  {!mod.isMultiVersion && !mod.subGroups && mod.subItems && (
                    <div className="flex flex-col gap-0.5 pl-4 pr-1 pt-1 pb-1.5 relative">
                      <div className="absolute left-[10px] top-0 bottom-2 w-[1.5px] rounded-full"
                           style={{ backgroundColor: mod.color + "80" }} />
                      {mod.subItems.map(sub => (
                        <SubItemRow key={sub.title} sub={sub} isActive={isSubActive(sub.path)} />
                      ))}
                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}
      </nav>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="flex-shrink-0 h-[1.5px] bg-black/10" />

      {/* ── Bottom Section ───────────────────────────────────────── */}
      <div className="flex-shrink-0 flex flex-col gap-0.5 px-2 py-2">
        {!collapsed && (
          <p className="text-[8px] font-bold uppercase tracking-widest text-gray-400 px-2 pb-1">System</p>
        )}

        {BOTTOM_LINKS.map((link) => {
          const Icon = link.icon;
          return collapsed
            ? <SideTooltip key={link.title} label={link.title}>
                <button className="w-8 h-8 mx-auto flex items-center justify-center rounded-[4px]
                                   border-[1.5px] border-transparent hover:bg-black/5 hover:border-black/20 transition-all">
                  <Icon className="w-4 h-4 text-gray-500" />
                </button>
              </SideTooltip>
            : <button key={link.title}
                className="flex items-center gap-2.5 px-3 py-2 rounded-[4px] border-[1.5px] border-transparent
                           hover:bg-black/5 hover:border-black/10 transition-all text-left">
                <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">{link.title}</span>
              </button>;
        })}

        {/* Playbook */}
        {collapsed
          ? <SideTooltip label="Beloved Brands Playbook">
              <button onClick={onPlaybookOpen}
                className="w-8 h-8 mx-auto flex items-center justify-center rounded-[4px]
                           border-[1.5px] border-[#FF5C00] bg-[#FF5C00]/10 hover:bg-[#FF5C00]
                           transition-all group">
                <BookOpen className="w-4 h-4 text-[#FF5C00] group-hover:text-white" />
              </button>
            </SideTooltip>
          : <button onClick={onPlaybookOpen}
              className="flex items-center gap-2.5 px-3 py-2 rounded-[4px] border-[1.5px] border-[#FF5C00]
                         bg-[#FF5C00]/5 hover:bg-[#FF5C00] transition-all group">
              <BookOpen className="w-4 h-4 text-[#FF5C00] group-hover:text-white flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="text-[11px] font-bold text-[#FF5C00] group-hover:text-white uppercase tracking-wide">Playbook</div>
                <div className="text-[9px] text-gray-400 group-hover:text-white/70">Beloved Brands</div>
              </div>
              <span className="text-[8px] font-bold bg-[#FF5C00] text-white group-hover:bg-white
                               group-hover:text-[#FF5C00] px-1.5 py-0.5 rounded-[2px] flex-shrink-0">
                Help
              </span>
            </button>
        }
      </div>

      {/* ── User + Collapse Toggle ────────────────────────────────── */}
      <div className={cn(
        "flex-shrink-0 border-t-[1.5px] border-black bg-white",
        collapsed ? "p-2 flex flex-col items-center gap-2" : "px-3 py-3 flex items-center gap-2.5"
      )}>
        {collapsed
          ? <>
              <SideTooltip label="Jane Smith" sublabel="Marketing Dir.">
                <div className="w-8 h-8 rounded-full bg-[#FF80FF] border-[1.5px] border-black
                                shadow-[2px_2px_0px_0px_#000] flex items-center justify-center
                                text-[10px] font-black cursor-default">
                  JS
                </div>
              </SideTooltip>
              <SideTooltip label="Expand Sidebar">
                <button onClick={() => setCollapsed(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-[4px] border-[1.5px] border-black
                             bg-[#FFDE00] shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000]
                             hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </SideTooltip>
            </>
          : <>
              <div className="w-7 h-7 rounded-full bg-[#FF80FF] border-[1.5px] border-black
                              shadow-[2px_2px_0px_0px_#000] flex items-center justify-center
                              text-[9px] font-black flex-shrink-0">
                JS
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold truncate">Jane Smith</div>
                <div className="text-[9px] text-gray-400 truncate">Marketing Dir.</div>
              </div>
              <button onClick={() => setCollapsed(true)} title="Collapse Sidebar"
                className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-[4px]
                           border-[1.5px] border-black hover:bg-[#FFDE00] transition-all
                           shadow-[2px_2px_0px_0px_#000]">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </>
        }
      </div>
    </aside>
  );
}