import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "./NeoButton";
import { NeoButton } from "./NeoButton";
import {
  X, Check, Zap, Trophy, Swords, Sparkles,
  Package, BookOpen, Star, DollarSign,
  ChevronDown, ChevronUp, Plus, Trash2, MapPin,
  Eye, EyeOff, ChevronRight, Tag, Info, GripVertical,
} from "lucide-react";

/* ═══════════════════════════════════════════════
   1. TYPES
═══════════════════════════════════════════════ */
export interface TargetSegment {
  id: string;
  name: string;
  demographics: string[];
  geography: string;
  customerStatus: "current" | "new" | "";
  needStates: string[];
  purchaseOccasions: string[];
  adoptionProfile: string;
  lifestyleValues: string[];
  keyDrivers: string[];
  isFocusTarget: boolean;
}

export interface WizardData {
  brandName: string;
  category: string;
  geographies: string[];
  coreStrengthLevels: { product: number; story: number; experience: number; price: number };
  coreStrengthDescription: string;
  competitors: string[];
  showPerceptualMap: boolean;
  perceptualMapAxisX: string;
  perceptualMapAxisY: string;
  perceptualMapPositions: Record<string, { x: number; y: number }>;
  competitivePosition: string;
  targetSegments: TargetSegment[];
  insights: string;
  functionalBenefits: string[];
  emotionalBenefits: string[];
  values: string;
  beliefs: string;
  inspirations: string;
  rtbs: { text: string; type: string }[];
  discriminator: string;
  brandIdea: string;
  brandVision: string;
}

interface QuickSetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: WizardData) => void;
}

/* ═══════════════════════════════════════════════
   2. CONSTANTS
═══════════════════════════════════════════════ */
const CATEGORIES = [
  "FMCG / CPG", "Technology / SaaS", "Financial Services", "Healthcare",
  "Retail / E-commerce", "Automotive", "Media & Entertainment",
  "Food & Beverage", "Luxury / Fashion", "B2B Services",
  "Hospitality & Travel", "Education", "Other",
];

const GEO_SUGGESTIONS = [
  "Vietnam", "Southeast Asia", "United States", "European Union",
  "United Kingdom", "Australia", "Japan", "South Korea",
  "India", "APAC", "LATAM", "MENA", "Global",
];

const RTB_TYPES = ["Process", "Product Claim", "3rd-party Endorsement", "Behavioral Results", "Technology"];
const MAP_AXES = ["Price", "Quality", "Innovation", "Accessibility", "Prestige", "Speed", "Simplicity"];

const DEMO_GROUPS = [
  { label: "Age", options: ["Gen Z (18\u201324)", "Millennials (25\u201340)", "Gen X (41\u201356)", "Boomers (57+)"] },
  { label: "Gender", options: ["Male", "Female", "Non-binary"] },
  { label: "Income / SES", options: ["Low-income", "Middle-income", "High-income"] },
];
const GEOGRAPHY_CHANNEL_OPTIONS = ["Urban", "Suburban", "Rural", "Local", "National", "Global"];
const FUNCTIONAL_NEEDS = [
  "Simplifies your life", "Helps you be healthier", "Works better",
  "Makes you smarter", "Saves you money", "Helps your family",
  "Sensory appeal", "Stay connected", "Experience",
];
const EMOTIONAL_NEEDS = [
  "Sense of optimism", "Feel free", "Curious for knowledge",
  "Stay in control", "Get noticed", "Feel comfortable",
  "Feel myself", "Feel liked",
];
const PURCHASE_OCCASIONS = [
  "Daily routine", "Impulse purchase", "Planned purchase",
  "Gift giving", "Seasonal / Occasion-based",
];
const ADOPTION_PROFILES = [
  "Trend influencers \u2014 Try everything new first",
  "Early adopters \u2014 Lead trends, influence others",
  "Early mass \u2014 Wait for proven results",
  "Late mass \u2014 Resist change, follow later",
];
const LIFESTYLE_TAGS = [
  "Health-conscious", "Family-oriented", "Eco-friendly",
  "Status-driven", "Convenience-seeker", "Value-hunter",
];

const COMPETITIVE_POSITIONS = [
  { key: "Power Player", label: "Power Player", description: "Market leader with dominant share.", icon: Trophy, color: "#FFDE00" },
  { key: "Challenger", label: "Challenger", description: "Strong #2 fighting to topple the leader.", icon: Swords, color: "#FF80FF" },
  { key: "Disruptor", label: "Disruptor", description: "Game-changer rewriting category rules.", icon: Zap, color: "#FF5C00" },
  { key: "Craft", label: "Craft / Niche", description: "Premium specialist in a focused segment.", icon: Sparkles, color: "#00E5FF" },
];

const CORE_AXIS_CONFIGS = [
  { key: "product" as const, label: "Product", Icon: Package },
  { key: "story" as const, label: "Story", Icon: BookOpen },
  { key: "experience" as const, label: "Experience", Icon: Star },
  { key: "price" as const, label: "Price", Icon: DollarSign },
];

const RADII = [30, 65, 100];
const LEVEL_LABELS = ["Low", "Medium", "Highly Competitive"];
const LEVEL_COLORS: Record<number, string> = { 2: "#FF5C00", 1: "#FF80FF", 0: "#D1D5DB" };
const CX = 150, CY = 150;

export const DEFAULT_DATA: WizardData = {
  brandName: "",
  category: "",
  geographies: [],
  coreStrengthLevels: { product: 2, story: 1, experience: 1, price: 0 },
  coreStrengthDescription: "",
  competitors: ["", "", ""],
  showPerceptualMap: false,
  perceptualMapAxisX: "Price",
  perceptualMapAxisY: "Quality",
  perceptualMapPositions: {},
  competitivePosition: "",
  targetSegments: [{
    id: "1", name: "",
    demographics: [], geography: "", customerStatus: "",
    needStates: [], purchaseOccasions: [],
    adoptionProfile: "", lifestyleValues: [], keyDrivers: [], isFocusTarget: true,
  }],
  insights: "",
  functionalBenefits: [],
  emotionalBenefits: [],
  values: "",
  beliefs: "",
  inspirations: "",
  rtbs: [{ text: "", type: "" }, { text: "", type: "" }],
  discriminator: "",
  brandIdea: "",
  brandVision: "",
};

const LOADING_MESSAGES = [
  "Analyzing competitive positioning\u2026",
  "Mapping Core Strength signals\u2026",
  "Building Target Customer segments\u2026",
  "Pre-filling Deep-Dive Review\u2026",
  "Calibrating Strategic ThinkBox\u2026",
  "Generating your Strategy Dashboard\u2026",
];

/* ═══════════════════════════════════════════════
   3. HELPER FUNCTIONS
═══════════════════════════════════════════════ */
type CSKey = "product" | "story" | "experience" | "price";

function applyForcedChoice(
  current: WizardData["coreStrengthLevels"],
  changedKey: CSKey,
  newLevel: number,
): WizardData["coreStrengthLevels"] {
  const result = { ...current, [changedKey]: newLevel };
  const others = (["product", "story", "experience", "price"] as CSKey[]).filter(k => k !== changedKey);

  const countOf = (l: number) => Object.values(result).filter(v => v === l).length;

  while (countOf(2) > 1) {
    const key = others.find(k => result[k] === 2);
    if (key) result[key] = 1; else break;
  }
  while (countOf(0) > 1) {
    const key = others.find(k => result[k] === 0);
    if (key) result[key] = 1; else break;
  }
  if (countOf(2) === 0) {
    const key = others.find(k => result[k] === 1);
    if (key) result[key] = 2;
  }
  if (countOf(0) === 0) {
    const key = others.find(k => result[k] === 1 && k !== (Object.entries(result).find(([, v]) => v === 2)?.[0]));
    if (key) result[key] = 0;
  }
  return result;
}

function getSnapPoint(key: CSKey, levelIdx: number): { x: number; y: number } {
  const r = RADII[levelIdx];
  const angles: Record<CSKey, number> = { product: -90, story: 0, experience: 90, price: 180 };
  const rad = (angles[key] * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

/* ═══════════════════════════════════════════════
   4. SHARED UI PRIMITIVES
═══════════════════════════════════════════════ */
function SectionHeader({ letter, title, subtitle }: { letter: string; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="w-7 h-7 bg-black text-white rounded-[4px] flex items-center justify-center font-['Archivo_Black'] text-xs flex-shrink-0 mt-0.5">
        {letter}
      </div>
      <div>
        <h3 className="font-['Archivo_Black'] text-base uppercase tracking-wide leading-tight">{title}</h3>
        {subtitle && <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function CustomSelect({
  value, onChange, options, placeholder,
}: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button" onClick={() => setOpen(!open)}
        className={cn("w-full px-4 py-2.5 bg-white text-black border-[1.5px] border-black rounded-[4px] text-sm font-bold outline-none flex justify-between items-center cursor-pointer transition-all",
          open && "shadow-[4px_4px_0px_0px_#FF5C00]")}
      >
        <span className={cn(!value && "text-gray-400 font-normal")}>{value || placeholder || "Select\u2026"}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform flex-shrink-0", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border-[1.5px] border-black rounded-[4px] shadow-[6px_6px_0px_0px_#000] z-50 max-h-44 overflow-y-auto">
          {options.map(opt => (
            <div key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              className={cn("px-4 py-2 text-sm font-bold cursor-pointer border-b border-black/5 last:border-b-0 hover:bg-[#FFDE00] transition-colors", value === opt && "bg-[#FFDE00]")}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   5. SECTION A — BASIC IDENTITY
═══════════════════════════════════════════════ */
function GeoTagInput({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) {
  const [inputVal, setInputVal] = useState("");
  const [showSug, setShowSug] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const suggestions = GEO_SUGGESTIONS.filter(s => s.toLowerCase().includes(inputVal.toLowerCase()) && !tags.includes(s));

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) onChange([...tags, trimmed]);
    setInputVal("");
    setShowSug(false);
  };

  const removeTag = (tag: string) => onChange(tags.filter(t => t !== tag));

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setShowSug(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="flex flex-wrap gap-1.5 p-2 border-[1.5px] border-black rounded-[4px] bg-white min-h-[44px] cursor-text focus-within:shadow-[4px_4px_0px_0px_#FF5C00] transition-shadow"
        onClick={() => (ref.current?.querySelector("input") as HTMLInputElement)?.focus()}>
        {tags.map(t => (
          <span key={t} className="flex items-center gap-1 bg-[#FFDE00] border-[1.5px] border-black rounded-[4px] px-2 py-0.5 text-xs font-bold shadow-[2px_2px_0px_0px_#000]">
            <MapPin className="w-3 h-3" />
            {t}
            <button type="button" onClick={() => removeTag(t)} className="hover:text-red-600 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          value={inputVal}
          onChange={e => { setInputVal(e.target.value); setShowSug(true); }}
          onKeyDown={e => {
            if ((e.key === "Enter" || e.key === ",") && inputVal.trim()) { e.preventDefault(); addTag(inputVal); }
            if (e.key === "Backspace" && !inputVal && tags.length) removeTag(tags[tags.length - 1]);
          }}
          onFocus={() => setShowSug(true)}
          placeholder={tags.length === 0 ? "Type country/region, press Enter\u2026" : ""}
          className="flex-1 min-w-[140px] text-sm font-bold outline-none bg-transparent placeholder:text-gray-300 placeholder:font-normal"
        />
      </div>
      {showSug && suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border-[1.5px] border-black rounded-[4px] shadow-[6px_6px_0px_0px_#000] z-50 max-h-40 overflow-y-auto">
          {suggestions.map(s => (
            <div key={s} onClick={() => addTag(s)}
              className="px-4 py-2 text-sm font-bold cursor-pointer hover:bg-[#FFDE00] border-b border-black/5 last:border-b-0 transition-colors flex items-center gap-2">
              <MapPin className="w-3 h-3 text-gray-400" />{s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SectionBasicIdentity({ data, onChange }: { data: WizardData; onChange: (p: Partial<WizardData>) => void }) {
  return (
    <div className="bg-white border-[2px] border-black rounded-[6px] p-6 shadow-[6px_6px_0px_0px_#FF5C00] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 flex">
        {["#FF5C00", "#FF80FF", "#FFDE00", "#00E5FF"].map((c, i) => <div key={i} className="flex-1" style={{ backgroundColor: c }} />)}
      </div>
      <div className="pt-2">
        <SectionHeader letter="A" title="Basic Identity" subtitle="The foundation of your brand workspace" />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Brand Name *</label>
            <input
              autoFocus
              type="text"
              value={data.brandName}
              onChange={e => onChange({ brandName: e.target.value })}
              placeholder="e.g. Acme Corp, BrandX\u2026"
              className="w-full px-5 py-4 bg-[#FAF9F6] text-black border-[2px] border-black rounded-[4px] font-['Archivo_Black'] text-2xl outline-none placeholder:text-gray-300 placeholder:font-normal focus:shadow-[6px_6px_0px_0px_#FF5C00] transition-shadow"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Industry / Category *</label>
              <CustomSelect value={data.category} onChange={v => onChange({ category: v })} options={CATEGORIES} placeholder="Select industry\u2026" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Geography (multi-select)</label>
              <GeoTagInput tags={data.geographies} onChange={v => onChange({ geographies: v })} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   6. SECTION B1 — CORE STRENGTH AXIS
═══════════════════════════════════════════════ */
function CoreStrengthAxisSVG({
  levels, onLevelChange,
}: { levels: WizardData["coreStrengthLevels"]; onLevelChange: (l: WizardData["coreStrengthLevels"]) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const polygonPoints = CORE_AXIS_CONFIGS.map(({ key }) => {
    const pt = getSnapPoint(key, levels[key]);
    return `${pt.x},${pt.y}`;
  }).join(" ");

  const handleClick = (key: CSKey, levelIdx: number) => {
    onLevelChange(applyForcedChoice(levels, key, levelIdx));
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 300 300" className="w-full max-w-[260px]">
        {RADII.map((r, i) => (
          <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="#E5E7EB"
            strokeWidth={i === 2 ? "1.5" : "1"} strokeDasharray={i < 2 ? "4 4" : undefined} />
        ))}
        {CORE_AXIS_CONFIGS.map(({ key }) => {
          const end = getSnapPoint(key, 2);
          const lineColor = LEVEL_COLORS[levels[key]];
          return (
            <line key={key} x1={CX} y1={CY} x2={end.x} y2={end.y}
              stroke={lineColor} strokeWidth="2" strokeLinecap="round" />
          );
        })}
        <polygon points={polygonPoints} fill="rgba(255,92,0,0.12)" stroke="#FF5C00" strokeWidth="2.5" strokeLinejoin="round" />
        {CORE_AXIS_CONFIGS.map(({ key }) =>
          [0, 1, 2].map(lvlIdx => {
            const pt = getSnapPoint(key, lvlIdx);
            const isActive = levels[key] === lvlIdx;
            const snapId = `${key}-${lvlIdx}`;
            return (
              <g key={snapId} onMouseEnter={() => setHovered(snapId)} onMouseLeave={() => setHovered(null)}>
                <circle cx={pt.x} cy={pt.y} r={isActive ? 9 : 6}
                  fill={isActive ? LEVEL_COLORS[lvlIdx] : "white"}
                  stroke={isActive ? "black" : "#D1D5DB"}
                  strokeWidth={isActive ? "2" : "1"}
                  className="cursor-pointer transition-all duration-150"
                  onClick={() => handleClick(key, lvlIdx)}
                />
                {isActive && <circle cx={pt.x} cy={pt.y} r={5} fill="black" className="pointer-events-none" />}
                {hovered === snapId && !isActive && (
                  <circle cx={pt.x} cy={pt.y} r={9} fill="none" stroke="#FF5C00" strokeWidth="1.5" className="pointer-events-none" />
                )}
                <title>{CORE_AXIS_CONFIGS.find(a => a.key === key)?.label} \u2014 {LEVEL_LABELS[lvlIdx]}</title>
              </g>
            );
          })
        )}
        <text x={CX} y={CY - 118} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="bold" fill={levels.product === 2 ? "#FF5C00" : "#374151"} fontFamily="Space Grotesk, sans-serif">Product</text>
        <text x={CX + 118} y={CY} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="bold" fill={levels.story === 2 ? "#FF5C00" : "#374151"} fontFamily="Space Grotesk, sans-serif">Story</text>
        <text x={CX} y={CY + 118} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="bold" fill={levels.experience === 2 ? "#FF5C00" : "#374151"} fontFamily="Space Grotesk, sans-serif">Experience</text>
        <text x={CX - 118} y={CY} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="bold" fill={levels.price === 2 ? "#FF5C00" : "#374151"} fontFamily="Space Grotesk, sans-serif">Price</text>
        <text x={CX + 6} y={CY - RADII[0]} textAnchor="start" dominantBaseline="middle" fontSize="8" fill="#9CA3AF" fontFamily="Space Grotesk, sans-serif">Low</text>
        <text x={CX + 6} y={CY - RADII[1]} textAnchor="start" dominantBaseline="middle" fontSize="8" fill="#9CA3AF" fontFamily="Space Grotesk, sans-serif">Med</text>
        <text x={CX + 6} y={CY - RADII[2]} textAnchor="start" dominantBaseline="middle" fontSize="8" fill="#FF5C00" fontFamily="Space Grotesk, sans-serif">HC</text>
      </svg>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">
        Click snap points to adjust \u00b7 Forced choice: 1 HC, 2 Med, 1 Low
      </p>
    </div>
  );
}

export function SectionCoreStrength({ data, onChange }: { data: WizardData; onChange: (p: Partial<WizardData>) => void }) {
  const hcKey = (Object.entries(data.coreStrengthLevels).find(([, v]) => v === 2)?.[0] ?? "product") as CSKey;
  const hcConfig = CORE_AXIS_CONFIGS.find(a => a.key === hcKey)!;

  return (
    <div className="bg-white border-[1.5px] border-black rounded-[6px] p-6 shadow-[4px_4px_0px_0px_#000]">
      <SectionHeader letter="B1" title="Core Strength" subtitle="Set your #1 weapon via the 4-way axis \u2014 forced choice" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <CoreStrengthAxisSVG levels={data.coreStrengthLevels} onLevelChange={l => onChange({ coreStrengthLevels: l })} />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Current State</span>
            {CORE_AXIS_CONFIGS.map(({ key, label, Icon }) => {
              const lvl = data.coreStrengthLevels[key];
              return (
                <div key={key} className="flex items-center justify-between py-2 px-3 border-[1.5px] border-black rounded-[4px] bg-[#FAF9F6]"
                  style={lvl === 2 ? { backgroundColor: "#FF5C00", border: "2px solid black", boxShadow: "3px 3px 0px #000" } : {}}>
                  <div className="flex items-center gap-2">
                    <Icon className={cn("w-4 h-4", lvl === 2 ? "text-white" : "text-gray-600")} />
                    <span className={cn("text-sm font-['Archivo_Black'] uppercase", lvl === 2 ? "text-white" : "text-black")}>{label}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-[3px] border border-black/20"
                    style={{ backgroundColor: LEVEL_COLORS[lvl], color: lvl === 0 ? "#9CA3AF" : "black", borderColor: "rgba(0,0,0,0.3)" }}>
                    {LEVEL_LABELS[lvl]}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#FF5C00]">
              Why is your {hcConfig.label} Highly Competitive?
            </label>
            <textarea
              value={data.coreStrengthDescription}
              onChange={e => onChange({ coreStrengthDescription: e.target.value })}
              placeholder={`Explain why your ${hcConfig.label} is your #1 weapon vs competitors\u2026`}
              rows={3}
              className="w-full px-4 py-3 bg-[#FAF9F6] border-[1.5px] border-black rounded-[4px] text-sm font-medium outline-none resize-none focus:shadow-[4px_4px_0px_0px_#FF5C00] transition-shadow placeholder:text-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   7. SECTION B2 — KEY COMPETITORS
═══════════════════════════════════════════════ */
function PerceptualMap({
  competitors, brandName, axisX, axisY, positions, onPositionChange, onAxisChange,
}: {
  competitors: string[]; brandName: string;
  axisX: string; axisY: string;
  positions: Record<string, { x: number; y: number }>;
  onPositionChange: (key: string, pos: { x: number; y: number }) => void;
  onAxisChange: (axis: "X" | "Y", val: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<{ key: string; startX: number; startY: number; startPX: number; startPY: number } | null>(null);

  const allChips = [
    { key: "__brand__", label: brandName || "Your Brand", color: "#FF5C00", isOwn: true },
    ...competitors.filter(c => c.trim()).map(c => ({ key: c, label: c, color: "#FF80FF", isOwn: false })),
  ];

  const getPos = (key: string) => positions[key] ?? { x: 50, y: 50 };

  const handleMouseDown = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    const p = getPos(key);
    dragging.current = { key, startX: e.clientX, startY: e.clientY, startPX: p.x, startPY: p.y };
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = ((e.clientX - dragging.current.startX) / rect.width) * 100;
    const dy = ((e.clientY - dragging.current.startY) / rect.height) * 100;
    const newX = Math.max(4, Math.min(96, dragging.current.startPX + dx));
    const newY = Math.max(4, Math.min(96, dragging.current.startPY + dy));
    onPositionChange(dragging.current.key, { x: newX, y: newY });
  }, [onPositionChange]);

  const handleMouseUp = useCallback(() => { dragging.current = null; }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => { window.removeEventListener("mousemove", handleMouseMove); window.removeEventListener("mouseup", handleMouseUp); };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="flex flex-col gap-3 mt-4 animate-in slide-in-from-top-2 duration-300">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">X-Axis (horizontal)</label>
          <CustomSelect value={axisX} onChange={v => onAxisChange("X", v)} options={MAP_AXES} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Y-Axis (vertical)</label>
          <CustomSelect value={axisY} onChange={v => onAxisChange("Y", v)} options={MAP_AXES} />
        </div>
      </div>
      <div className="relative" style={{ paddingLeft: 40, paddingBottom: 36 }}>
        <div className="absolute left-0 top-0 bottom-9 flex items-center justify-center" style={{ width: 36 }}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 -rotate-90 whitespace-nowrap">{axisY} \u2191</span>
        </div>
        <div className="absolute bottom-0 left-10 right-0 h-9 flex items-center justify-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{axisX} \u2192</span>
        </div>
        <div
          ref={containerRef}
          className="relative border-[2px] border-black rounded-[4px] bg-[#FAF9F6] shadow-[4px_4px_0px_0px_#000]"
          style={{ height: 260, userSelect: "none" }}
        >
          <div className="absolute inset-0 flex">
            <div className="flex-1 border-r-[1.5px] border-dashed border-black/20" />
            <div className="flex-1" />
          </div>
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 border-b-[1.5px] border-dashed border-black/20" />
            <div className="flex-1" />
          </div>
          <span className="absolute top-2 left-2 text-[9px] font-bold text-black/20 uppercase">Low {axisX} \u00b7 High {axisY}</span>
          <span className="absolute top-2 right-2 text-[9px] font-bold text-black/20 uppercase text-right">High {axisX} \u00b7 High {axisY}</span>
          <span className="absolute bottom-2 left-2 text-[9px] font-bold text-black/20 uppercase">Low {axisX} \u00b7 Low {axisY}</span>
          <span className="absolute bottom-2 right-2 text-[9px] font-bold text-black/20 uppercase text-right">High {axisX} \u00b7 Low {axisY}</span>
          {allChips.map(chip => {
            const pos = getPos(chip.key);
            return (
              <div
                key={chip.key}
                onMouseDown={e => handleMouseDown(chip.key, e)}
                style={{
                  position: "absolute",
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                  cursor: "grab",
                }}
              >
                <div
                  className="px-2 py-1 border-[2px] border-black rounded-[4px] text-xs font-['Archivo_Black'] uppercase shadow-[3px_3px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all whitespace-nowrap select-none"
                  style={{ backgroundColor: chip.color }}
                >
                  {chip.isOwn ? "\u2605 " : ""}{chip.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
        <Info className="w-3 h-3" /> Drag chips to position brands on the map
      </p>
    </div>
  );
}

export function SectionKeyCompetitors({ data, onChange }: { data: WizardData; onChange: (p: Partial<WizardData>) => void }) {
  const [inputVals, setInputVals] = useState<string[]>(data.competitors);

  const updateCompetitor = (i: number, val: string) => {
    const updated = [...inputVals];
    updated[i] = val;
    setInputVals(updated);
    onChange({ competitors: updated });
  };

  const addRow = () => {
    if (inputVals.length < 5) { setInputVals([...inputVals, ""]); onChange({ competitors: [...inputVals, ""] }); }
  };

  const removeRow = (i: number) => {
    const updated = inputVals.filter((_, idx) => idx !== i);
    setInputVals(updated);
    onChange({ competitors: updated });
  };

  const namedCompetitors = data.competitors.filter(c => c.trim());

  return (
    <div className="bg-white border-[1.5px] border-black rounded-[6px] p-6 shadow-[4px_4px_0px_0px_#000]">
      <div className="flex items-start justify-between mb-5">
        <SectionHeader letter="B2" title="Key Competitors" subtitle="Type names \u2192 hit Enter to create chip" />
        <button
          type="button"
          onClick={() => onChange({ showPerceptualMap: !data.showPerceptualMap })}
          className={cn("flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-3 py-1.5 border-[1.5px] border-black rounded-[4px] transition-all hover:shadow-[3px_3px_0px_0px_#000]",
            data.showPerceptualMap ? "bg-[#00E5FF] shadow-[3px_3px_0px_0px_#000]" : "bg-white")}
        >
          {data.showPerceptualMap ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          Perceptual Map
        </button>
      </div>

      {namedCompetitors.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {namedCompetitors.map(c => (
            <span key={c} className="flex items-center gap-1 bg-[#FF80FF] border-[1.5px] border-black rounded-[4px] px-2.5 py-1 text-xs font-['Archivo_Black'] uppercase shadow-[2px_2px_0px_0px_#000]">
              {c}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {inputVals.map((val, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black text-white flex items-center justify-center rounded-[3px] text-xs font-bold flex-shrink-0">{i + 1}</div>
            <input
              type="text"
              value={val}
              onChange={e => updateCompetitor(i, e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && i < inputVals.length - 1 && inputVals.length < 5) addRow(); }}
              placeholder={`Competitor ${i + 1} name\u2026`}
              className="flex-1 px-4 py-2.5 bg-[#FAF9F6] text-black border-[1.5px] border-black rounded-[4px] text-sm font-bold outline-none placeholder:text-gray-300 placeholder:font-normal focus:shadow-[4px_4px_0px_0px_#FF80FF] transition-shadow"
            />
            {inputVals.length > 1 && (
              <button type="button" onClick={() => removeRow(i)}
                className="w-8 h-8 border-[1.5px] border-black rounded-[4px] flex items-center justify-center hover:bg-[#F87171] transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
        {inputVals.length < 5 && (
          <button type="button" onClick={addRow}
            className="flex items-center gap-2 text-sm font-bold border-[1.5px] border-dashed border-black/50 rounded-[4px] px-4 py-2 hover:border-black hover:bg-black/5 transition-all w-fit">
            <Plus className="w-3.5 h-3.5" /> Add competitor
          </button>
        )}
      </div>

      {data.showPerceptualMap && (
        <PerceptualMap
          competitors={data.competitors}
          brandName={data.brandName}
          axisX={data.perceptualMapAxisX}
          axisY={data.perceptualMapAxisY}
          positions={data.perceptualMapPositions}
          onPositionChange={(key, pos) => onChange({ perceptualMapPositions: { ...data.perceptualMapPositions, [key]: pos } })}
          onAxisChange={(axis, val) => axis === "X" ? onChange({ perceptualMapAxisX: val }) : onChange({ perceptualMapAxisY: val })}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   8. SECTION B3 — COMPETITIVE POSITION
═══════════════════════════════════════════════ */
function SelectCard({ label, description, icon: Icon, selected, onClick, accentColor }: {
  label: string; description: string; icon: React.ElementType;
  selected: boolean; onClick: () => void; accentColor: string;
}) {
  return (
    <button type="button" onClick={onClick}
      className={cn("relative flex flex-col gap-2 p-4 border-[2px] rounded-[6px] text-left transition-all cursor-pointer",
        selected ? "border-black shadow-[4px_4px_0px_0px_#000] -translate-x-[1px] -translate-y-[1px]"
          : "border-black/30 bg-white hover:border-black hover:shadow-[3px_3px_0px_0px_#000]")}
      style={selected ? { backgroundColor: accentColor } : {}}>
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-black rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </div>
      )}
      <div className={cn("w-9 h-9 rounded-[4px] border-[1.5px] border-black flex items-center justify-center",
        selected ? "bg-black" : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]")}>
        <Icon className={cn("w-4 h-4", selected ? "text-white" : "text-black")} />
      </div>
      <span className="font-['Archivo_Black'] text-xs uppercase leading-tight">{label}</span>
      <span className={cn("text-[11px] leading-snug", selected ? "text-black/70" : "text-gray-500")}>{description}</span>
    </button>
  );
}

export function SectionCompetitivePosition({ data, onChange }: { data: WizardData; onChange: (p: Partial<WizardData>) => void }) {
  return (
    <div className="bg-white border-[1.5px] border-black rounded-[6px] p-6 shadow-[4px_4px_0px_0px_#000]">
      <SectionHeader letter="B3" title="Competitive Position" subtitle="Radio-card \u2014 select one" />
      <div className="grid grid-cols-2 gap-3">
        {COMPETITIVE_POSITIONS.map(item => (
          <SelectCard key={item.key} label={item.label} description={item.description} icon={item.icon}
            selected={data.competitivePosition === item.key}
            onClick={() => onChange({ competitivePosition: item.key })}
            accentColor={item.color} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   9. SECTION B4 — TARGET CUSTOMER
═══════════════════════════════════════════════ */
function DemographicsMultiSelect({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  const safe = Array.isArray(value) ? value : [];
  const toggle = (opt: string) => onChange(safe.includes(opt) ? safe.filter(v => v !== opt) : [...safe, opt]);
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)}
        className={cn("w-full px-3 py-2 bg-[#FAF9F6] text-left text-xs font-bold border-[1.5px] border-black rounded-[4px] flex items-center justify-between transition-all", open && "shadow-[3px_3px_0px_0px_#FF5C00]")}>
        <span className={cn(safe.length === 0 && "text-gray-400 font-normal")}>
          {safe.length === 0 ? "Select\u2026" : safe.length === 1 ? safe[0] : `${safe.length} selected`}
        </span>
        <ChevronDown className={cn("w-3.5 h-3.5 flex-shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border-[1.5px] border-black rounded-[4px] shadow-[6px_6px_0px_0px_#000] z-50 overflow-hidden">
          {DEMO_GROUPS.map(g => (
            <div key={g.label}>
              <div className="px-3 py-1.5 bg-[#FAF9F6] border-b border-black/10">
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{g.label}</span>
              </div>
              {g.options.map(opt => (
                <div key={opt} onClick={() => toggle(opt)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-[#FFDE00] cursor-pointer border-b border-black/5 last:border-b-0 transition-colors">
                  <div className={cn("w-3.5 h-3.5 border-[1.5px] border-black rounded-[2px] flex items-center justify-center flex-shrink-0", safe.includes(opt) ? "bg-[#FF5C00]" : "bg-white")}>
                    {safe.includes(opt) && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-xs font-bold">{opt}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {safe.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {safe.map(v => (
            <span key={v} className="flex items-center gap-0.5 bg-[#FFDE00] border-[1.5px] border-black rounded-[3px] px-1.5 py-0.5 text-[9px] font-bold shadow-[1px_1px_0px_0px_#000]">
              {v}
              <button type="button" onClick={() => toggle(v)}><X className="w-2.5 h-2.5" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SegmentForm({
  segment, onChange, axisX, axisY,
}: { segment: TargetSegment; onChange: (p: Partial<TargetSegment>) => void; axisX: string; axisY: string }) {
  const [customDriverInput, setCustomDriverInput] = useState("");
  return (
    <div className="divide-y-[1.5px] divide-black/10">
      <div className="p-5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 mb-4">
          <span className="w-4 h-[1.5px] bg-gray-200 inline-block" />Consumer Profiling
          <span className="flex-1 h-[1.5px] bg-gray-100 inline-block" />
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Demographics</label>
            <DemographicsMultiSelect value={segment.demographics} onChange={v => onChange({ demographics: v })} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Geography / Channel</label>
            <CustomSelect value={segment.geography} onChange={v => onChange({ geography: v })}
              options={GEOGRAPHY_CHANNEL_OPTIONS} placeholder="Select\u2026" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Customer Status <span className="text-[#FF5C00]">*</span>
            </label>
            <div className="flex gap-2">
              {(["current", "new"] as const).map(s => (
                <button key={s} type="button" onClick={() => onChange({ customerStatus: s })}
                  className={cn("flex-1 py-2 text-[11px] font-bold uppercase border-[1.5px] border-black rounded-[4px] transition-all",
                    segment.customerStatus === s ? "bg-black text-white shadow-[2px_2px_0px_0px_#000]" : "bg-white hover:bg-black/5")}>
                  {s === "current" ? "Current" : "New"}
                </button>
              ))}
            </div>
            {segment.customerStatus && (
              <p className="text-[9px] text-gray-400 leading-snug">
                {segment.customerStatus === "current" ? "\u2192 Drive usage & loyalty" : "\u2192 Drive penetration"}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 mb-4">
          <span className="w-4 h-[1.5px] bg-gray-200 inline-block" />Consumer Behavior
          <span className="flex-1 h-[1.5px] bg-gray-100 inline-block" />
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Need States</label>
              {(() => {
                const n = Array.isArray(segment.needStates) ? segment.needStates.length : 0;
                return n > 0 ? (
                  <span className="text-[9px] font-bold bg-black text-white rounded-full px-1.5 py-0.5 leading-none">{n}</span>
                ) : null;
              })()}
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#FF5C00] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] inline-block" /> Functional
              </span>
              <div className="flex flex-wrap gap-1.5">
                {FUNCTIONAL_NEEDS.map(need => {
                  const safeNeeds = Array.isArray(segment.needStates) ? segment.needStates : [];
                  const active = safeNeeds.includes(need);
                  return (
                    <button key={need} type="button"
                      onClick={() => onChange({ needStates: active ? safeNeeds.filter(n => n !== need) : [...safeNeeds, need] })}
                      className={cn("px-2 py-1 text-[10px] font-bold border-[1.5px] border-black rounded-[3px] transition-all leading-snug",
                        active
                          ? "bg-[#FF5C00] text-white shadow-[2px_2px_0px_0px_#000] -translate-x-[1px] -translate-y-[1px]"
                          : "bg-white hover:bg-[#FF5C00]/10")}>
                      {need}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#FF80FF] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF80FF] inline-block" /> Emotional
              </span>
              <div className="flex flex-wrap gap-1.5">
                {EMOTIONAL_NEEDS.map(need => {
                  const safeNeeds = Array.isArray(segment.needStates) ? segment.needStates : [];
                  const active = safeNeeds.includes(need);
                  return (
                    <button key={need} type="button"
                      onClick={() => onChange({ needStates: active ? safeNeeds.filter(n => n !== need) : [...safeNeeds, need] })}
                      className={cn("px-2 py-1 text-[10px] font-bold border-[1.5px] border-black rounded-[3px] transition-all leading-snug",
                        active
                          ? "bg-[#FF80FF] shadow-[2px_2px_0px_0px_#000] -translate-x-[1px] -translate-y-[1px]"
                          : "bg-white hover:bg-[#FF80FF]/30")}>
                      {need}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Purchase Occasions</label>
              {(() => {
                const n = Array.isArray(segment.purchaseOccasions) ? segment.purchaseOccasions.length : 0;
                return n > 0 ? (
                  <span className="text-[9px] font-bold bg-black text-white rounded-full px-1.5 py-0.5 leading-none">{n}</span>
                ) : null;
              })()}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PURCHASE_OCCASIONS.map(occ => {
                const safeOcc = Array.isArray(segment.purchaseOccasions) ? segment.purchaseOccasions : [];
                const active = safeOcc.includes(occ);
                return (
                  <button key={occ} type="button"
                    onClick={() => onChange({ purchaseOccasions: active ? safeOcc.filter(o => o !== occ) : [...safeOcc, occ] })}
                    className={cn("px-2 py-1 text-[10px] font-bold border-[1.5px] border-black rounded-[3px] transition-all leading-snug",
                      active
                        ? "bg-[#FFDE00] shadow-[2px_2px_0px_0px_#000] -translate-x-[1px] -translate-y-[1px]"
                        : "bg-white hover:bg-[#FFDE00]/40")}>
                    {occ}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 mb-4">
          <span className="w-4 h-[1.5px] bg-gray-200 inline-block" />Consumer Psychographics
          <span className="flex-1 h-[1.5px] bg-gray-100 inline-block" />
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Adoption Profile</label>
            <CustomSelect value={segment.adoptionProfile} onChange={v => onChange({ adoptionProfile: v })}
              options={ADOPTION_PROFILES} placeholder="Select profile\u2026" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lifestyle &amp; Values</label>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {LIFESTYLE_TAGS.map(tag => {
                const safeLifestyle = Array.isArray(segment.lifestyleValues) ? segment.lifestyleValues : [];
                const active = safeLifestyle.includes(tag);
                return (
                  <button key={tag} type="button"
                    onClick={() => onChange({ lifestyleValues: active ? safeLifestyle.filter(t => t !== tag) : [...safeLifestyle, tag] })}
                    className={cn("px-2 py-1 text-[10px] font-bold border-[1.5px] border-black rounded-[3px] transition-all",
                      active ? "bg-[#FF80FF] shadow-[2px_2px_0px_0px_#000]" : "bg-white hover:bg-[#FF80FF]/30")}>
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 bg-[#FAF9F6]">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-3.5 h-3.5 text-[#FF5C00]" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#FF5C00]">Key Drivers</span>
          {(() => {
            const n = Array.isArray(segment.keyDrivers) ? segment.keyDrivers.length : 0;
            return n > 0 ? (
              <span className="text-[9px] font-bold bg-[#FF5C00] text-white rounded-full px-1.5 py-0.5 leading-none">{n}</span>
            ) : null;
          })()}
          <div className="flex-1 h-[1.5px] bg-[#FF5C00]/20" />
          <span className="text-[9px] font-bold text-gray-400 uppercase">Auto-pulled + Custom</span>
        </div>

        {(() => {
          const mapOptions = [axisX, axisY].filter(Boolean);
          const safeDrivers = Array.isArray(segment.keyDrivers) ? segment.keyDrivers : [];
          const isMapDriver = (d: string) => mapOptions.includes(d);
          const toggleDriver = (opt: string) => {
            const next = safeDrivers.includes(opt) ? safeDrivers.filter(d => d !== opt) : [...safeDrivers, opt];
            onChange({ keyDrivers: next });
          };
          const addCustomDriver = () => {
            const trimmed = customDriverInput.trim();
            if (!trimmed || safeDrivers.includes(trimmed)) return;
            onChange({ keyDrivers: [...safeDrivers, trimmed] });
            setCustomDriverInput("");
          };
          const moveUp = (i: number) => {
            const d = [...safeDrivers]; [d[i - 1], d[i]] = [d[i], d[i - 1]]; onChange({ keyDrivers: d });
          };
          const moveDown = (i: number) => {
            const d = [...safeDrivers]; [d[i + 1], d[i]] = [d[i], d[i + 1]]; onChange({ keyDrivers: d });
          };
          const remove = (driver: string) => onChange({ keyDrivers: safeDrivers.filter(d => d !== driver) });

          return (
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1.5">
                  <span className="w-3 h-[1.5px] bg-gray-300 inline-block" />From Perceptual Map
                </p>
                {mapOptions.length === 0 ? (
                  <div className="text-[10px] font-bold text-gray-400 p-2.5 border-[1.5px] border-dashed border-black/20 rounded-[4px] leading-relaxed flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gray-300" />
                    Enable Perceptual Map in Section B2 to auto-unlock competitive axis options.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {mapOptions.map((opt, idx) => {
                      const active = safeDrivers.includes(opt);
                      const COLORS = ["#FF5C00", "#FF80FF"];
                      const col = COLORS[idx % COLORS.length];
                      return (
                        <button key={opt} type="button"
                          onClick={() => toggleDriver(opt)}
                          style={active ? { backgroundColor: col } : {}}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold border-[1.5px] border-black rounded-[4px] transition-all",
                            active ? "text-white shadow-[3px_3px_0px_0px_#000] -translate-x-[1px] -translate-y-[1px]" : "bg-white hover:bg-black/5"
                          )}>
                          <span className={cn("text-[9px] font-bold uppercase tracking-widest", active ? "text-white/80" : "text-gray-400")}>
                            {idx === 0 ? "X" : "Y"}
                          </span>
                          {opt}
                          {active && <Check className="w-3 h-3 ml-0.5" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1.5">
                  <span className="w-3 h-[1.5px] bg-gray-300 inline-block" />Add Custom Driver
                </p>
                <form onSubmit={e => { e.preventDefault(); addCustomDriver(); }} className="flex gap-2">
                  <input
                    type="text" value={customDriverInput} onChange={e => setCustomDriverInput(e.target.value)}
                    placeholder="e.g. Sustainability, Price Sensitivity\u2026" maxLength={40}
                    className="flex-1 min-w-0 px-3 py-2 text-[11px] font-bold border-[1.5px] border-black rounded-[4px] bg-white placeholder:text-gray-300 focus:outline-none focus:border-[#FFDE00] focus:shadow-[2px_2px_0px_0px_#FFDE00] transition-all"
                  />
                  <button type="submit" disabled={!customDriverInput.trim() || safeDrivers.includes(customDriverInput.trim())}
                    className={cn("flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold border-[1.5px] border-black rounded-[4px] transition-all whitespace-nowrap",
                      customDriverInput.trim() && !safeDrivers.includes(customDriverInput.trim())
                        ? "bg-[#FFDE00] shadow-[2px_2px_0px_0px_#000] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#000]"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed")}>
                    <Plus className="w-3.5 h-3.5" />Add
                  </button>
                </form>
                {customDriverInput.trim() && safeDrivers.includes(customDriverInput.trim()) && (
                  <p className="text-[10px] font-bold text-red-500 mt-1.5 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Already in your driver list
                  </p>
                )}
              </div>
              {safeDrivers.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                    <GripVertical className="w-3 h-3" /> Priority Order
                    <span className="text-gray-300 font-normal normal-case tracking-normal">\u2014 use arrows to reorder</span>
                  </p>
                  {safeDrivers.map((driver, i) => {
                    const RANK_COLORS = ["#FF5C00", "#FF80FF", "#FFDE00", "#00C2FF", "#B4FF6E", "#FF8C42"];
                    const rc = RANK_COLORS[i] ?? "#E5E7EB";
                    const isCustom = !isMapDriver(driver);
                    return (
                      <div key={driver} className="flex items-center gap-2 px-3 py-2 bg-white border-[1.5px] border-black rounded-[4px] shadow-[2px_2px_0px_0px_#000]">
                        <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-[10px] font-bold rounded-[3px] border-[1.5px] border-black" style={{ backgroundColor: rc }}>
                          {i + 1}
                        </span>
                        <span className="flex-1 flex items-center gap-1.5 min-w-0">
                          <span className="text-[11px] font-bold truncate">{driver}</span>
                          {isCustom && (
                            <span className="flex-shrink-0 text-[8px] font-bold uppercase tracking-widest px-1 py-0.5 bg-[#FFDE00] border border-black/30 rounded-[2px] leading-none">Custom</span>
                          )}
                        </span>
                        <div className="flex items-center gap-0.5">
                          <button type="button" disabled={i === 0} onClick={() => moveUp(i)}
                            className={cn("w-6 h-6 flex items-center justify-center border-[1.5px] border-black rounded-[3px] transition-all",
                              i === 0 ? "opacity-25 cursor-not-allowed bg-gray-50" : "bg-white hover:bg-[#FF5C00] hover:text-white")}>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button type="button" disabled={i === safeDrivers.length - 1} onClick={() => moveDown(i)}
                            className={cn("w-6 h-6 flex items-center justify-center border-[1.5px] border-black rounded-[3px] transition-all",
                              i === safeDrivers.length - 1 ? "opacity-25 cursor-not-allowed bg-gray-50" : "bg-white hover:bg-[#FF5C00] hover:text-white")}>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          <button type="button" onClick={() => remove(driver)}
                            className="w-6 h-6 flex items-center justify-center border-[1.5px] border-black rounded-[3px] bg-white hover:bg-red-500 hover:text-white transition-all ml-0.5">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

export function SectionTargetCustomer({ data, onChange }: { data: WizardData; onChange: (p: Partial<WizardData>) => void }) {
  const normalise = (s: TargetSegment): TargetSegment => ({
    demographics: [], lifestyleValues: [], needStates: [], purchaseOccasions: [],
    geography: "", customerStatus: "" as const,
    adoptionProfile: "", keyDrivers: [],
    ...s,
  });

  const updateSegment = (id: string, patch: Partial<TargetSegment>) => {
    onChange({ targetSegments: data.targetSegments.map(s => s.id === id ? normalise({ ...s, ...patch }) : s) });
  };
  const setFocus = (id: string) => {
    onChange({ targetSegments: data.targetSegments.map(s => ({ ...normalise(s), isFocusTarget: s.id === id })) });
  };
  const addSegment = () => {
    if (data.targetSegments.length >= 4) return;
    const id = Date.now().toString();
    const newSeg: TargetSegment = {
      id, name: "", demographics: [], geography: "", customerStatus: "",
      needStates: [], purchaseOccasions: [],
      adoptionProfile: "", lifestyleValues: [], keyDrivers: [], isFocusTarget: false,
    };
    onChange({ targetSegments: [...data.targetSegments, newSeg] });
  };
  const removeSegment = (id: string) => {
    const updated = data.targetSegments.filter(s => s.id !== id);
    if (!updated.some(s => s.isFocusTarget) && updated.length > 0) updated[0].isFocusTarget = true;
    onChange({ targetSegments: updated });
  };
  const rawFocused = data.targetSegments.find(s => s.isFocusTarget) ?? data.targetSegments[0];
  const focusedSeg = rawFocused ? normalise(rawFocused) : rawFocused;

  return (
    <div className="bg-white border-[1.5px] border-black rounded-[6px] overflow-hidden shadow-[4px_4px_0px_0px_#000]">
      <div className="flex items-start justify-between px-6 pt-6 pb-3">
        <SectionHeader letter="B4" title="Target Customer" subtitle="Build segments \u00b7 Forced choice: 1 Focus Target" />
      </div>
      <div className="px-6 pb-0 flex items-end gap-1.5 flex-wrap border-b-[2px] border-black">
        {data.targetSegments.map((seg, i) => {
          const isFocus = seg.isFocusTarget;
          return (
            <div key={seg.id}
              onClick={() => setFocus(seg.id)}
              className={cn(
                "relative flex items-center gap-1.5 px-3 cursor-pointer transition-all duration-150 rounded-t-[6px] border-[2px] border-b-0",
                isFocus
                  ? "bg-[#4ADE80] border-black py-2.5 pb-[13px] -mb-[2px]"
                  : "bg-[#FAF9F6] border-black/25 py-2 hover:border-black/50 hover:bg-[#E5E7EB]"
              )}>
              {isFocus && (
                <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </div>
              )}
              <input
                type="text"
                value={seg.name}
                onChange={e => { e.stopPropagation(); updateSegment(seg.id, { name: e.target.value }); }}
                onClick={e => e.stopPropagation()}
                placeholder={`Segment ${i + 1}`}
                className={cn(
                  "bg-transparent outline-none text-xs font-['Archivo_Black'] uppercase w-20 placeholder:font-normal placeholder:normal-case",
                  isFocus ? "text-black placeholder:text-black/40" : "text-gray-500 placeholder:text-gray-300"
                )}
              />
              {!isFocus && seg.customerStatus && (
                <span className="text-[9px] font-bold bg-white/80 border border-black/20 rounded-[2px] px-1 py-0.5 leading-none uppercase">
                  {seg.customerStatus === "current" ? "Cur" : "New"}
                </span>
              )}
              {!isFocus && Array.isArray(seg.keyDrivers) && seg.keyDrivers.length > 0 && (
                <span className="text-[9px] font-bold bg-[#FFDE00]/70 border border-black/20 rounded-[2px] px-1 py-0.5 leading-none truncate max-w-[56px]">
                  #1 {seg.keyDrivers[0]}
                </span>
              )}
              {data.targetSegments.length > 1 && (
                <button type="button"
                  onClick={e => { e.stopPropagation(); removeSegment(seg.id); }}
                  className={cn("w-4 h-4 flex items-center justify-center rounded-sm transition-colors flex-shrink-0 ml-0.5",
                    isFocus ? "hover:bg-black/10" : "hover:bg-[#F87171]/50")}>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
        {data.targetSegments.length < 4 && (
          <button type="button" onClick={addSegment}
            className="flex items-center gap-1 px-3 py-2 rounded-t-[6px] border-[2px] border-dashed border-black/30 text-[11px] font-bold uppercase hover:border-black hover:bg-black/5 transition-all bg-transparent">
            <Plus className="w-3.5 h-3.5" /> Add Segment
          </button>
        )}
        <div className="ml-auto pb-2 flex items-center gap-1 text-[9px] font-bold text-gray-400 uppercase tracking-wide self-end">
          <Info className="w-3 h-3" /> 1 Focus Target only
        </div>
      </div>
      {focusedSeg && (
        <SegmentForm
          segment={focusedSeg}
          onChange={patch => updateSegment(focusedSeg.id, patch)}
          axisX={data.perceptualMapAxisX}
          axisY={data.perceptualMapAxisY}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   10. SECTION C — ADVANCED STRATEGIC DNA
═══════════════════════════════════════════════ */
function TagInput({ tags, onChange, placeholder, suggestions }: {
  tags: string[]; onChange: (t: string[]) => void; placeholder?: string; suggestions?: string[];
}) {
  const [val, setVal] = useState("");
  const addTag = (t: string) => { if (t.trim() && !tags.includes(t.trim())) onChange([...tags, t.trim()]); setVal(""); };
  const filteredSugg = suggestions?.filter(s => s.toLowerCase().includes(val.toLowerCase()) && !tags.includes(s)) ?? [];
  const ref = useRef<HTMLDivElement>(null);
  const [showSug, setShowSug] = useState(false);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setShowSug(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="flex flex-wrap gap-1 p-2 border-[1.5px] border-black rounded-[4px] bg-[#FAF9F6] min-h-[38px] focus-within:shadow-[3px_3px_0px_0px_#FF80FF] transition-shadow cursor-text"
        onClick={() => (ref.current?.querySelector("input") as HTMLInputElement)?.focus()}>
        {tags.map(t => (
          <span key={t} className="flex items-center gap-1 bg-[#FF80FF] border-[1.5px] border-black rounded-[3px] px-2 py-0.5 text-xs font-bold shadow-[2px_2px_0px_0px_#000]">
            <Tag className="w-2.5 h-2.5" />{t}
            <button type="button" onClick={() => onChange(tags.filter(x => x !== t))} className="hover:text-red-700"><X className="w-2.5 h-2.5" /></button>
          </span>
        ))}
        <input value={val} onChange={e => { setVal(e.target.value); setShowSug(true); }}
          onKeyDown={e => { if ((e.key === "Enter" || e.key === ",") && val.trim()) { e.preventDefault(); addTag(val); } }}
          onFocus={() => setShowSug(true)}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[80px] text-xs font-medium outline-none bg-transparent placeholder:text-gray-300"
        />
      </div>
      {showSug && filteredSugg.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border-[1.5px] border-black rounded-[4px] shadow-[4px_4px_0px_0px_#000] z-50 max-h-32 overflow-y-auto">
          {filteredSugg.map(s => (
            <div key={s} onClick={() => addTag(s)} className="px-3 py-1.5 text-xs font-bold cursor-pointer hover:bg-[#FF80FF] transition-colors">{s}</div>
          ))}
        </div>
      )}
    </div>
  );
}

const FUNC_SUGGESTIONS = ["Saves time", "Reduces cost", "Increases efficiency", "Improves quality", "Simplifies process", "Scales easily"];
const EMOT_SUGGESTIONS = ["Builds confidence", "Creates joy", "Reduces anxiety", "Inspires pride", "Fosters belonging", "Empowers action"];

export function SectionAdvancedDNA({ data, onChange, brandName }: { data: WizardData; onChange: (p: Partial<WizardData>) => void; brandName: string }) {
  const [open, setOpen] = useState(false);

  const updateRTB = (i: number, field: "text" | "type", val: string) => {
    const updated = [...data.rtbs];
    updated[i] = { ...updated[i], [field]: val };
    onChange({ rtbs: updated });
  };

  const focusTarget = data.targetSegments.find(s => s.isFocusTarget);
  const funcBenef = data.functionalBenefits[0] || "[benefit]";
  const rtbText = data.rtbs[0]?.text || "[reason to believe]";
  const positioningPreview = `To ${focusTarget?.name || "[target customer]"}, ${brandName || "[Brand]"} is the ${data.category || "[category]"} that delivers ${funcBenef}. That's because ${rtbText}.`;

  return (
    <div className={cn("border-[1.5px] border-black rounded-[6px] overflow-hidden transition-all", open ? "shadow-[4px_4px_0px_0px_#FFDE00]" : "shadow-[2px_2px_0px_0px_#000]")}>
      <button type="button" onClick={() => setOpen(!open)}
        className={cn("w-full flex items-center justify-between px-6 py-4 transition-colors", open ? "bg-[#FFDE00]" : "bg-white hover:bg-[#FFDE00]/30")}>
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-black text-white rounded-[4px] flex items-center justify-center font-['Archivo_Black'] text-xs">C</div>
          <div className="text-left">
            <span className="font-['Archivo_Black'] text-sm uppercase tracking-wide block">Advanced Strategic DNA</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nice to have \u00b7 Opens with more fields</span>
          </div>
        </div>
        <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div className="bg-white border-t-[1.5px] border-black p-6 flex flex-col gap-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Consumer Insight</label>
            <p className="text-[10px] text-gray-400 font-medium">Write from the consumer's POV. Must start with "I\u2026"</p>
            <div className="flex">
              <span className="px-3 py-2.5 bg-[#FFDE00] border-[1.5px] border-r-0 border-black rounded-l-[4px] font-['Archivo_Black'] text-sm shadow-[2px_2px_0px_0px_#000]">I\u2026</span>
              <textarea value={data.insights} onChange={e => onChange({ insights: e.target.value })}
                placeholder="\u2026often feel that existing solutions don't truly understand my needs as a\u2026"
                rows={2}
                className="flex-1 px-4 py-2.5 bg-[#FAF9F6] border-[1.5px] border-black rounded-r-[4px] text-sm font-medium outline-none resize-none focus:shadow-[4px_4px_0px_0px_#FFDE00] transition-shadow placeholder:text-gray-300" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Functional Benefits</label>
              <TagInput tags={data.functionalBenefits} onChange={v => onChange({ functionalBenefits: v })}
                placeholder="Type & press Enter\u2026" suggestions={FUNC_SUGGESTIONS} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Emotional Benefits</label>
              <TagInput tags={data.emotionalBenefits} onChange={v => onChange({ emotionalBenefits: v })}
                placeholder="Type & press Enter\u2026" suggestions={EMOT_SUGGESTIONS} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {([
              { field: "values" as const, label: "Values", placeholder: "What we stand for\u2026" },
              { field: "beliefs" as const, label: "Beliefs", placeholder: "What we believe in\u2026" },
              { field: "inspirations" as const, label: "Inspirations", placeholder: "What drives us\u2026" },
            ]).map(({ field, label, placeholder }) => (
              <div key={field} className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</label>
                <input type="text" value={data[field]} onChange={e => onChange({ [field]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border-[1.5px] border-black rounded-[4px] text-sm font-bold outline-none focus:shadow-[3px_3px_0px_0px_#FFDE00] transition-shadow placeholder:text-gray-300 placeholder:font-normal" />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Reasons to Believe (max 2)</label>
            {data.rtbs.map((rtb, i) => (
              <div key={i} className="flex gap-2">
                <div className="w-5 h-8 flex items-center justify-center font-bold text-xs text-gray-400">{i + 1}.</div>
                <input type="text" value={rtb.text} onChange={e => updateRTB(i, "text", e.target.value)}
                  placeholder="e.g. Patented technology that reduces processing time by 40%\u2026"
                  className="flex-1 px-3 py-2 bg-[#FAF9F6] border-[1.5px] border-black rounded-[4px] text-sm font-bold outline-none focus:shadow-[3px_3px_0px_0px_#FFDE00] transition-shadow placeholder:text-gray-300 placeholder:font-normal" />
                <div className="w-44 flex-shrink-0">
                  <CustomSelect value={rtb.type} onChange={v => updateRTB(i, "type", v)} options={RTB_TYPES} placeholder="RTB type\u2026" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Discriminator</label>
            <p className="text-[10px] text-gray-400 font-medium">What is the single most compelling reason to choose you over competitors?</p>
            <input type="text" value={data.discriminator} onChange={e => onChange({ discriminator: e.target.value })}
              placeholder="e.g. The only platform that\u2026"
              className="w-full px-4 py-2.5 bg-[#FAF9F6] border-[1.5px] border-black rounded-[4px] text-sm font-bold outline-none focus:shadow-[4px_4px_0px_0px_#FFDE00] transition-shadow placeholder:text-gray-300 placeholder:font-normal" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Brand Idea &amp; Essence</label>
            <p className="text-[10px] text-gray-400 font-medium">Your 7-second pitch \u2014 keep it short and powerful.</p>
            <input type="text" value={data.brandIdea} onChange={e => onChange({ brandIdea: e.target.value })}
              placeholder="e.g. Marketing intelligence, without the complexity\u2026"
              className="w-full px-4 py-3 bg-[#FAF9F6] border-[1.5px] border-black rounded-[4px] font-['Archivo_Black'] text-base outline-none focus:shadow-[4px_4px_0px_0px_#FFDE00] transition-shadow placeholder:text-gray-300 placeholder:font-normal" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Positioning Preview (Mad-libs)</label>
            <div className="bg-[#FAF9F6] border-[1.5px] border-black rounded-[4px] p-4 shadow-[3px_3px_0px_0px_#FFDE00]">
              <p className="text-sm font-medium italic text-gray-600 leading-relaxed">{positioningPreview}</p>
            </div>
            <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
              <Info className="w-3 h-3" /> Auto-generated from your data above \u00b7 Fill in sections to improve
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Brand Vision</label>
            <p className="text-[10px] text-gray-400 font-medium">Where could you be in 5\u201310 years? Write a goal that scares you a little and excites you a lot.</p>
            <textarea value={data.brandVision} onChange={e => onChange({ brandVision: e.target.value })}
              placeholder="In 5 years, we will be the default choice for\u2026"
              rows={3}
              className="w-full px-4 py-3 bg-[#FAF9F6] border-[1.5px] border-black rounded-[4px] text-sm font-medium outline-none resize-none focus:shadow-[4px_4px_0px_0px_#FFDE00] transition-shadow placeholder:text-gray-300" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   11. BRAND SETUP CANVAS
═══════════════════════════════════════════════ */
function BrandSetupCanvas({ data, onChange }: { data: WizardData; onChange: (p: Partial<WizardData>) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <SectionBasicIdentity data={data} onChange={onChange} />
      <SectionCoreStrength data={data} onChange={onChange} />
      <SectionKeyCompetitors data={data} onChange={onChange} />
      <SectionCompetitivePosition data={data} onChange={onChange} />
      <SectionTargetCustomer data={data} onChange={onChange} />
      <SectionAdvancedDNA data={data} onChange={onChange} brandName={data.brandName} />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   12. LOADING SCREEN
═══════════════════════════════════════════════ */
function LoadingScreen({ brandName, onDone }: { brandName: string; onDone: () => void }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => setMsgIndex(p => Math.min(p + 1, LOADING_MESSAGES.length - 1)), 500);
    const progInterval = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(progInterval); return 100; } return p + 3.5; }), 100);
    const doneTimer = setTimeout(onDone, 3200);
    return () => { clearInterval(msgInterval); clearInterval(progInterval); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-10">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full px-8 text-center">
        <div className="relative w-24 h-24">
          <div className="w-24 h-24 border-[4px] border-white/10 rounded-full" />
          <div className="absolute inset-0 w-24 h-24 border-[4px] border-transparent border-t-[#FF5C00] border-r-[#FF80FF] rounded-full animate-spin" />
          <div className="absolute inset-3 w-[72px] h-[72px] border-[3px] border-transparent border-b-[#FFDE00] rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
          <div className="absolute inset-0 flex items-center justify-center"><Zap className="w-8 h-8 text-[#FFDE00]" /></div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Building workspace for</span>
          <span className="font-['Archivo_Black'] text-4xl uppercase text-white tracking-tight">{brandName || "Your Brand"}</span>
        </div>
        <div className="h-6 overflow-hidden">
          <p key={msgIndex} className="text-sm font-bold text-white/60 uppercase tracking-wider animate-in fade-in slide-in-from-bottom-2 duration-300">
            {LOADING_MESSAGES[msgIndex]}
          </p>
        </div>
        <div className="w-full bg-white/10 h-2 rounded-full border border-white/20 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-100"
            style={{ width: `${Math.min(progress, 100)}%`, background: "linear-gradient(90deg, #FF5C00, #FF80FF, #FFDE00)" }} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   13. MAIN WIZARD
═══════════════════════════════════════════════ */
export function QuickSetupWizard({ isOpen, onClose, onComplete }: QuickSetupWizardProps) {
  const [data, setData] = useState<WizardData>(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (patch: Partial<WizardData>) => setData(prev => ({ ...prev, ...patch }));
  const handleGenerate = () => setIsLoading(true);
  const handleLoadingDone = () => {
    setIsLoading(false);
    onComplete(data);
    setData(DEFAULT_DATA);
  };

  const canGenerate = !!data.brandName.trim() && !!data.category;

  if (!isOpen) return null;
  if (isLoading) return <LoadingScreen brandName={data.brandName} onDone={handleLoadingDone} />;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-[#FAF9F6] border-[2.5px] border-black rounded-[8px] shadow-[12px_12px_0px_0px_#FF5C00] w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        <button onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white border-[1.5px] border-black rounded-[4px] shadow-[3px_3px_0px_0px_#000] flex items-center justify-center hover:bg-[#F87171] transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="flex-shrink-0 bg-white border-b-[2px] border-black px-8 pt-6 pb-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-[#FF5C00] border-[1.5px] border-black rounded-[4px] shadow-[3px_3px_0px_0px_#000] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h2 className="font-['Archivo_Black'] text-xl uppercase tracking-tight">Brand Setup Canvas</h2>
            <span className="text-xs font-bold uppercase tracking-widest bg-[#FFDE00] border-[1.5px] border-black px-2 py-0.5 rounded-[3px] shadow-[2px_2px_0px_0px_#000]">Step 0</span>
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-11">
            Complete your Brand DNA \u00b7 Your workspace will be pre-filled automatically
          </p>
          <div className="flex gap-2 mt-3 ml-11 flex-wrap">
            {[
              { id: "a", label: "Identity", required: true },
              { id: "b1", label: "Core Strength" },
              { id: "b2", label: "Competitors" },
              { id: "b3", label: "Position" },
              { id: "b4", label: "Targets" },
              { id: "c", label: "Advanced \u2193" },
            ].map(sec => (
              <span key={sec.id}
                className={cn("text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-[3px] border-[1.5px] border-black cursor-default",
                  sec.required ? "bg-[#FF5C00] text-white shadow-[2px_2px_0px_0px_#000]" : "bg-[#FAF9F6]")}>
                {sec.id === "a" || sec.id === "b1" || sec.id === "b2" ? "\u2605 " : ""}{sec.label}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <BrandSetupCanvas data={data} onChange={handleChange} />
        </div>
        <div className="flex-shrink-0 flex items-center justify-between px-8 py-5 border-t-[1.5px] border-black bg-white">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {!canGenerate ? "Fill in Brand Name + Category to continue" : `Ready \u00b7 ${data.brandName}`}
            </span>
            <div className="flex gap-1">
              {[
                !!data.brandName && !!data.category,
                !!data.coreStrengthDescription,
                data.competitors.some(c => c.trim()),
                !!data.competitivePosition,
                data.targetSegments.some(s => s.name.trim()),
              ].map((done, i) => (
                <div key={i} className={cn("w-6 h-1.5 rounded-full border border-black", done ? "bg-[#FF5C00]" : "bg-gray-200")} />
              ))}
            </div>
          </div>
          <NeoButton color="orange" onClick={handleGenerate} disabled={!canGenerate}
            className="flex items-center gap-2 !py-3 !px-6">
            <Zap className="w-4 h-4" />
            Generate My Dashboard
            <ChevronRight className="w-4 h-4" />
          </NeoButton>
        </div>
      </div>
    </div>
  );
}
