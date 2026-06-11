import React from "react";
import { Link } from "react-router";
import { Brain, ChevronRight, ExternalLink, CheckCircle2, Info } from "lucide-react";
import { useBrand } from "../context/BrandContext";
import {
  SectionCoreStrength,
  DEFAULT_DATA,
  WizardData,
} from "../components/QuickSetupWizard";

function EmptyStateBanner() {
  return (
    <div className="mb-6 p-4 bg-[#FF80FF] border-[1.5px] border-black rounded-[4px] shadow-[3px_3px_0px_0px_#000] flex items-center gap-3">
      <Brain className="w-5 h-5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-bold">
          No brand data yet. Use the axis below to define your Core Strength — changes are auto-saved.
        </p>
      </div>
      <Link
        to="/"
        className="flex-shrink-0 flex items-center gap-1.5 text-[11px] font-bold bg-black text-white px-3 py-1.5 rounded-[4px] hover:bg-[#FF5C00] transition-colors"
      >
        Open Full Wizard <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

export function BrandKeyCoreStrength() {
  const { brandData, setBrandData } = useBrand();
  const data: WizardData = brandData ?? { ...DEFAULT_DATA };

  const handleChange = (patch: Partial<WizardData>) => {
    setBrandData({ ...data, ...patch });
  };

  // Find the HC key for a summary badge
  const hcEntry = Object.entries(data.coreStrengthLevels).find(([, v]) => v === 2);
  const hcLabel = hcEntry
    ? { product: "Product", story: "Story", experience: "Experience", price: "Price" }[hcEntry[0]] ?? hcEntry[0]
    : null;

  return (
    <div className="flex flex-col max-w-3xl mx-auto pb-16">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border-[2px] border-black rounded-[4px] shadow-[3px_3px_0px_0px_#000] font-['Archivo_Black'] text-sm bg-[#FF80FF]">
            B1
          </div>
          <div>
            <h1 className="font-['Archivo_Black'] text-2xl uppercase tracking-tight leading-none">
              Core Strength
            </h1>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mt-1">
              Current Status · Current Brand Keys
            </p>
            <p className="text-sm font-bold text-gray-500 mt-0.5">
              4-way forced-choice axis — define your #1 competitive weapon
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {hcLabel && (
            <div className="flex items-center gap-1.5 text-[11px] font-bold bg-[#FF5C00] text-white px-3 py-1.5 rounded-[4px] border-[1.5px] border-black shadow-[2px_2px_0px_0px_#000]">
              HC: {hcLabel}
            </div>
          )}
          {!!brandData && (
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-[4px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Auto-saved
            </div>
          )}
          <Link
            to="/"
            className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 border-[1.5px] border-black px-3 py-1.5 rounded-[4px] hover:bg-[#FFDE00] transition-colors shadow-[2px_2px_0px_0px_#000]"
          >
            <ExternalLink className="w-3 h-3" />
            Full Setup Canvas
          </Link>
        </div>
      </div>

      {!brandData && <EmptyStateBanner />}

      {/* Framework hint */}
      <div className="mb-4 flex items-start gap-2.5 px-4 py-3 bg-white border-[1.5px] border-black/20 rounded-[4px] text-[11px] font-bold text-gray-500">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#FF5C00]" />
        <span>
          The Core Strength Axis forces a <span className="text-black">single Highly Competitive</span> dimension —
          your brand's #1 weapon. Rule: 1 HC, 2 Medium, 1 Low. Click snap points to adjust.
        </span>
      </div>

      <SectionCoreStrength data={data} onChange={handleChange} />

      <div className="mt-5 flex items-center gap-2 text-[11px] font-bold text-gray-400">
        <div className="flex-1 h-[1px] bg-black/10" />
        <span>Changes are saved to your workspace automatically</span>
        <div className="flex-1 h-[1px] bg-black/10" />
      </div>
    </div>
  );
}
