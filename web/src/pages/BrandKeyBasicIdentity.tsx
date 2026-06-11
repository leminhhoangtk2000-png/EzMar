import React from "react";
import { Link } from "react-router";
import { Building2, ChevronRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { useBrand } from "../context/BrandContext";
import {
  SectionBasicIdentity,
  DEFAULT_DATA,
  WizardData,
} from "../components/QuickSetupWizard";

// ── Page header ──────────────────────────────────────────────────────────────
function BrandKeyPageHeader({
  letter,
  title,
  subtitle,
  color,
  isSaved,
}: {
  letter: string;
  title: string;
  subtitle: string;
  color: string;
  isSaved: boolean;
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center border-[2px] border-black rounded-[4px] shadow-[3px_3px_0px_0px_#000] font-['Archivo_Black'] text-sm"
          style={{ backgroundColor: color }}
        >
          {letter}
        </div>
        <div>
          <h1 className="font-['Archivo_Black'] text-2xl uppercase tracking-tight leading-none">
            {title}
          </h1>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mt-1">
            Current Status · Current Brand Keys
          </p>
          <p className="text-sm font-bold text-gray-500 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {isSaved && (
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
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyStateBanner() {
  return (
    <div className="mb-6 p-4 bg-[#FFDE00] border-[1.5px] border-black rounded-[4px] shadow-[3px_3px_0px_0px_#000] flex items-center gap-3">
      <Building2 className="w-5 h-5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-bold">
          No brand data saved yet. Fill in the fields below to set up your Basic Identity — changes are saved automatically.
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

// ── Page ─────────────────────────────────────────────────────────────────────
export function BrandKeyBasicIdentity() {
  const { brandData, setBrandData } = useBrand();
  const data: WizardData = brandData ?? { ...DEFAULT_DATA };

  const handleChange = (patch: Partial<WizardData>) => {
    setBrandData({ ...data, ...patch });
  };

  return (
    <div className="flex flex-col max-w-3xl mx-auto pb-16">
      <BrandKeyPageHeader
        letter="A"
        title="Basic Identity"
        subtitle="Brand name, industry/category, and geographic footprint"
        color="#FFDE00"
        isSaved={!!brandData}
      />

      {!brandData && <EmptyStateBanner />}

      <SectionBasicIdentity data={data} onChange={handleChange} />

      {/* Completion hint */}
      <div className="mt-5 flex items-center gap-2 text-[11px] font-bold text-gray-400">
        <div className="flex-1 h-[1px] bg-black/10" />
        <span>Changes are saved to your workspace automatically</span>
        <div className="flex-1 h-[1px] bg-black/10" />
      </div>
    </div>
  );
}
