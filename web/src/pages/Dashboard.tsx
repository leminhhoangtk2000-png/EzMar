import React, { useState } from "react";
import { Link } from "react-router";
import { Play, ArrowRight, Zap, Target, Flame, CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { NeoButton } from "../components/NeoButton";
import { Badge, Avatar } from "../components/UIComponents";
import { TaskCardBlank, DataTable } from "../components/Organisms";
import { QuickSetupWizard, WizardData } from "../components/QuickSetupWizard";
import { useBrand } from "../context/BrandContext";

const PLANNING_STEPS = [
  { label: "Deep-Dive Business Review", path: "/planning/deep-dive", step: 1 },
  { label: "Strategic ThinkBox", path: "/planning/thinkbox", step: 2 },
  { label: "Target Profile Canvas", path: "/planning/target-profile", step: 3 },
  { label: "Brand Positioning Statement", path: "/planning/brand-positioning", step: 4 },
  { label: "Brand Idea Blueprint", path: "/planning/brand-idea", step: 5 },
  { label: "One-Page Brand Plan", path: "/planning/brand-plan", step: 6 },
];

const CS_LABELS: Record<string, string> = { product: "Product", story: "Story", experience: "Experience", price: "Price" };

export function Dashboard() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { brandData: wizardData, setBrandData } = useBrand();

  const handleWizardComplete = (data: WizardData) => {
    setBrandData(data);
    setWizardOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const brandName = wizardData?.brandName || "Acme Corp";
  const isConfigured = !!wizardData;

  // Derive HC core strength from levels
  const hcKey = wizardData
    ? (Object.entries(wizardData.coreStrengthLevels).find(([, v]) => v === 2)?.[0] ?? "")
    : "";
  const hcLabel = hcKey ? CS_LABELS[hcKey] : "";

  // Geo display
  const geoDisplay = wizardData?.geographies[0] ?? "";

  // Named competitors
  const namedCompetitors = wizardData?.competitors.filter(c => c.trim()) ?? [];

  return (
    <>
      <QuickSetupWizard isOpen={wizardOpen} onClose={() => setWizardOpen(false)} onComplete={handleWizardComplete} />

      {/* Success toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#4ADE80] border-[2px] border-black rounded-[4px] shadow-[6px_6px_0px_0px_#000] px-5 py-4 flex items-center gap-3 font-['Space_Grotesk'] animate-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-['Archivo_Black'] text-sm uppercase">Workspace Ready!</span>
            <span className="text-xs font-bold text-black/60">{wizardData?.brandName} has been configured successfully.</span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-12 font-['Space_Grotesk'] max-w-7xl mx-auto pb-12">

        {/* ── Welcome Header ── */}
        <section className="bg-white border-[1.5px] border-black rounded-[4px] p-8 md:p-12 shadow-[8px_8px_0px_0px_#FF5C00] relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#FFDE00] rounded-full blur-3xl opacity-30 pointer-events-none" />
          <div className="flex flex-col gap-4 max-w-2xl relative z-10">
            <Badge status="neutral" className="w-fit mb-2">Q3 Planning Cycle</Badge>
            <h1 className="font-['Archivo_Black'] text-4xl md:text-5xl uppercase tracking-tighter leading-[1.1]">
              {isConfigured
                ? <><span className="text-[#FF80FF]">{brandName}</span><br />workspace ready.</>
                : <>Ready to crush <br /><span className="text-[#FF80FF]">your goals?</ span></>
              }
            </h1>
            <p className="text-lg font-bold text-gray-700 mt-2">
              {isConfigured
                ? `Your ${wizardData?.competitivePosition || "brand"} strategy canvas is live. Kick off with the Deep-Dive Review.`
                : "New here? Run the Brand Setup Canvas to pre-fill your entire workspace in under 3 minutes."
              }
            </p>
            {isConfigured && (
              <div className="flex flex-wrap gap-2 mt-1">
                {[
                  { label: wizardData!.competitivePosition, color: "#FF80FF" },
                  { label: hcLabel ? `${hcLabel} Strength` : "", color: "#FFDE00" },
                  { label: geoDisplay, color: "#00E5FF" },
                  { label: wizardData!.category, color: "#4ADE80" },
                ].filter(p => p.label).map(pill => (
                  <span key={pill.label} className="px-2.5 py-1 border-[1.5px] border-black rounded-[4px] shadow-[2px_2px_0px_0px_#000] font-bold text-xs uppercase tracking-wide" style={{ backgroundColor: pill.color }}>
                    {pill.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right CTA card */}
          <div className="bg-[#FAF9F6] border-[2px] border-black rounded-[4px] p-6 shadow-[6px_6px_0px_0px_#00E5FF] min-w-[300px] flex flex-col gap-5 relative z-10 transform rotate-1 hover:rotate-0 transition-transform">
            {!isConfigured ? (
              <>
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-[#FF5C00] border-[1.5px] border-black rounded-[4px] shadow-[3px_3px_0px_0px_#000] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest bg-[#FFDE00] border-[1.5px] border-black px-2 py-1 rounded-[2px] shadow-[2px_2px_0px_0px_#000]">~3 min</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-['Archivo_Black'] text-xl uppercase leading-tight">Brand Setup Canvas</h3>
                  <p className="text-sm font-bold text-gray-600">Core Strength · Competitors · Positioning · Targets — all pre-filled.</p>
                </div>
                <NeoButton color="orange" onClick={() => setWizardOpen(true)} className="w-full justify-between items-center group flex">
                  <span>Launch Setup Canvas</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </NeoButton>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-[#FFDE00] border-[1.5px] border-black rounded-[4px] shadow-[3px_3px_0px_0px_#000] flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest bg-black text-white px-2 py-1 rounded-[2px]">Step 1/6</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-['Archivo_Black'] text-xl uppercase leading-tight">Start Deep-Dive Review</h3>
                  <p className="text-sm font-bold text-gray-600">Competitors pre-filled. Dive in and add your metrics.</p>
                </div>
                <Link to="/planning/deep-dive">
                  <NeoButton color="pink" className="w-full justify-between items-center group flex">
                    <span>Begin Review</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </NeoButton>
                </Link>
                <button onClick={() => setWizardOpen(true)} className="text-xs font-bold text-gray-400 hover:text-black underline text-center transition-colors">
                  Re-run Setup Canvas
                </button>
              </>
            )}
          </div>
        </section>

        {/* ── Planning Roadmap (post-setup) ── */}
        {isConfigured && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b-[1.5px] border-black pb-2">
              <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide">Planning Roadmap</h2>
              <Badge status="neutral">{brandName}</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PLANNING_STEPS.map((s, i) => (
                <Link key={s.step} to={s.path} className="group">
                  <div className="bg-white border-[1.5px] border-black rounded-[4px] p-4 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#FF80FF] hover:-translate-y-[2px] transition-all flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-[4px] border-[1.5px] border-black flex items-center justify-center flex-shrink-0 font-['Archivo_Black'] text-sm ${i === 0 ? "bg-[#FF5C00] text-white shadow-[3px_3px_0px_0px_#000]" : "bg-white"}`}>
                      {i === 0 ? <Circle className="w-4 h-4 fill-white" /> : <span className="text-gray-400">{s.step}</span>}
                    </div>
                    <span className="font-bold text-sm flex-1 leading-tight">{s.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Metrics ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-[1.5px] border-black rounded-[4px] p-5 shadow-[4px_4px_0px_0px_#00E5FF] flex items-center gap-4">
            <div className="w-12 h-12 bg-[#00E5FF] border-[1.5px] border-black rounded-[4px] flex items-center justify-center shadow-[3px_3px_0px_0px_#000]"><Target className="w-6 h-6" /></div>
            <div className="flex flex-col flex-1"><span className="text-sm font-bold uppercase text-gray-500 tracking-wider">Campaign ROI</span><span className="font-['Archivo_Black'] text-3xl">28.4%</span></div>
          </div>
          <div className="bg-white border-[1.5px] border-black rounded-[4px] p-5 shadow-[4px_4px_0px_0px_#FFDE00] flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFDE00] border-[1.5px] border-black rounded-[4px] flex items-center justify-center shadow-[3px_3px_0px_0px_#000]"><Flame className="w-6 h-6" /></div>
            <div className="flex flex-col flex-1"><span className="text-sm font-bold uppercase text-gray-500 tracking-wider">Active Leads</span><span className="font-['Archivo_Black'] text-3xl">1,492</span></div>
          </div>
          <div className="bg-white border-[1.5px] border-black rounded-[4px] p-5 shadow-[4px_4px_0px_0px_#4ADE80] flex items-center gap-4">
            <div className="w-12 h-12 bg-[#4ADE80] border-[1.5px] border-black rounded-[4px] flex items-center justify-center shadow-[3px_3px_0px_0px_#000]"><Play className="w-6 h-6" /></div>
            <div className="flex flex-col flex-1"><span className="text-sm font-bold uppercase text-gray-500 tracking-wider">Live Ads</span><span className="font-['Archivo_Black'] text-3xl">14</span></div>
          </div>
        </section>

        {/* ── Competitor Radar (post-setup) ── */}
        {isConfigured && namedCompetitors.length > 0 && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b-[1.5px] border-black pb-2">
              <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide">Competitor Radar</h2>
              <Badge status="warning">Pre-filled from Setup</Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {namedCompetitors.map((comp, i) => (
                <div key={i} className="bg-white border-[1.5px] border-black rounded-[4px] p-4 shadow-[4px_4px_0px_0px_#FF5C00] flex flex-col gap-2">
                  <div className="w-8 h-8 bg-[#FAF9F6] border-[1.5px] border-black rounded-[4px] flex items-center justify-center font-['Archivo_Black'] text-xs shadow-[2px_2px_0px_0px_#000]">
                    {comp.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-['Archivo_Black'] text-sm uppercase">{comp}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Competitor</span>
                </div>
              ))}
              {/* Own brand */}
              <div className="bg-[#FF5C00] border-[1.5px] border-black rounded-[4px] p-4 shadow-[4px_4px_0px_0px_#000] flex flex-col gap-2">
                <div className="w-8 h-8 bg-white border-[1.5px] border-black rounded-[4px] flex items-center justify-center font-['Archivo_Black'] text-xs shadow-[2px_2px_0px_0px_#000]">
                  {brandName.charAt(0).toUpperCase()}
                </div>
                <span className="font-['Archivo_Black'] text-sm uppercase text-white">{brandName}</span>
                {hcLabel && <span className="text-[10px] font-bold text-white/70 uppercase">🏆 {hcLabel} HC</span>}
              </div>
            </div>
          </section>
        )}

        {/* ── Active Campaigns + Tasks ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b-[1.5px] border-black pb-2">
              <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide">Active Campaigns</h2>
              <Link to="#" className="text-sm font-bold border-b-[1.5px] border-black hover:text-[#FF5C00] hover:border-[#FF5C00] transition-colors">View All</Link>
            </div>
            <DataTable />
          </section>
          <section className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b-[1.5px] border-black pb-2">
              <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide">Pending Tasks</h2>
              <Badge status="warning">3 Due Soon</Badge>
            </div>
            <div className="flex flex-col gap-4">
              <TaskCardBlank className="w-full shadow-[4px_4px_0px_0px_#FF80FF]" />
              <div className="bg-white border-[1.5px] border-black rounded-[4px] p-4 shadow-[4px_4px_0px_0px_#FFDE00] hover:-translate-y-[2px] transition-transform flex flex-col gap-3">
                <Badge status="neutral">Review</Badge>
                <h3 className="font-['Archivo_Black'] text-base uppercase leading-tight">Approve Q3 Budget</h3>
                <p className="text-xs text-gray-600 font-medium">Review the allocated spend across social and search channels.</p>
                <div className="flex items-center justify-between pt-3 border-t-[1.5px] border-dashed border-black/30 mt-auto">
                  <Avatar size="sm" fallback="JS" className="w-6 h-6 text-[10px]" />
                  <span className="text-[10px] font-bold bg-[#FAF9F6] px-2 py-1 rounded-[4px] border-[1.5px] border-black shadow-[2px_2px_0px_0px_#000]">Due Tomorrow</span>
                </div>
              </div>
              <NeoButton color="yellow" variant="outline" className="w-full justify-center border-dashed">+ Create Task</NeoButton>
            </div>
          </section>
        </div>

      </div>
    </>
  );
}
