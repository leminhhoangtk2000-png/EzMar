import React, { useState } from "react";
import { X, BookOpen, Lightbulb, ChevronRight, ExternalLink, Star } from "lucide-react";
import { cn } from "./NeoButton";

interface PlaybookPanelProps {
  open: boolean;
  onClose: () => void;
}

const TABS = ["Framework", "Lessons", "Case Studies"] as const;
type Tab = (typeof TABS)[number];

const MODULES_DATA = [
  {
    id: 1, title: "Current Status", color: "#FFDE00", textColor: "#000",
    tagline: "Know Where You Stand",
    framework:
      "Before you can build a brand, you must understand where you stand. Current Status captures who you are (Brand Keys) and how you're performing (Brand Audit). Without this foundation, every downstream decision becomes a guess.",
    lessons: [
      "Your Brand Keys are your strategic north star — Basic Identity, Core Strength, Competitors, Customers, DNA.",
      "Brand Audit forces honesty: revenue, funnel health, and competitive dynamics — no spin.",
      "If your Brand Keys are blank, you're flying blind. Fill them before touching Strategy.",
      "The Consumer Funnel reveals your biggest leak — fix that before adding more to the top.",
    ],
    tip: "Start with Brand Keys. Define your Basic Identity in one sentence: 'We are [BRAND], a [CATEGORY] brand that helps [WHO] achieve [WHAT] through [HOW].'",
    caseStudy: "Unilever runs a rigorous Current Status review for each brand twice yearly. They found that Dove's funnel had strong awareness but weak trial-to-repeat conversion — leading to a reformulation that lifted repeat purchase by 18%.",
    brandExamples: [
      { brand: "Patagonia", lesson: "Their Brand Keys are crystal clear: environmental activism as core strength, outdoor enthusiasts as target, radical transparency as DNA. Every decision runs through those keys.", tag: "Brand Keys" },
      { brand: "Nestlé", lesson: "Annual brand audits revealed that Nescafé was losing ground in premium coffee. Insight from the competitor audit led to the Nespresso repositioning — a billion-dollar pivot.", tag: "Brand Audit" },
    ],
  },
  {
    id: 2, title: "Strategy", color: "#FF5C00", textColor: "#fff",
    tagline: "Define Your Brand",
    framework:
      "Brand Strategy is the art of making choices. You decide what your brand stands for, who it serves, and how it beats every competitor. Creating multiple strategy versions lets your team stress-test different directions before committing — activate the one that wins.",
    lessons: [
      "Positioning is not a tagline — it's the decision about which battle you will fight and win.",
      "Your Brand Idea must be: Differentiating, Motivating to consumers, and Ownable by you.",
      "Creating multiple strategy versions forces rigorous thinking — weak strategies collapse under scrutiny.",
      "A good strategy says 'No' to more things than it says 'Yes' to.",
    ],
    tip: "For each strategy version, test it against three questions: (1) Is it different from competitors? (2) Would our target consumer find it compelling? (3) Can only we own it?",
    caseStudy: "Apple tested multiple strategy directions before landing on 'Think Different.' One version focused on 'easiest computers'; another on 'most powerful.' The winning version — owning creative identity — guided every decision for decades.",
    brandExamples: [
      { brand: "Dove", lesson: "'Real Beauty' beat 'moisturising performance' in strategy testing because it owned emotional territory competitors couldn't copy.", tag: "Positioning" },
      { brand: "Oatly", lesson: "Their anti-corporate brand idea — 'It's like milk, but made for humans' — was one of three tested strategies. It won because it was uniquely ownable.", tag: "Brand Idea" },
    ],
  },
  {
    id: 3, title: "Planning", color: "#00C2FF", textColor: "#000",
    tagline: "Plan Your Brand",
    framework:
      "The Brand Plan translates strategy into specific, measurable actions. Every tactic must earn its place by connecting back to your active Strategy. The ROE Grid (Return on Experience) helps you prioritise by impact vs. effort — because great marketing means doing fewer things, better.",
    lessons: [
      "The best brand plans are one page. If you can't simplify it, you don't understand it.",
      "ROI thinking prioritises easy wins. ROE thinking prioritises experiences that build loyalty.",
      "Creative Briefs must start with the consumer's current truth — not what you want them to think.",
      "Planning without budget is daydreaming. Budget without plan is waste.",
    ],
    tip: "Use the Big Easy Grid: Y-axis = Consumer Impact (0–10), X-axis = Execution Effort (Low→High). Fund the top-left quadrant first — high impact, low effort.",
    caseStudy: "Red Bull's plan was never 'sell energy drinks.' It was 'own extreme energy as a platform.' Funding extreme sports events at a loss for years delivered brand-building ROE that dwarfed any short-term ROI.",
    brandExamples: [
      { brand: "LEGO", lesson: "Annual ROE Grid reviews killed hundreds of product lines. Fewer, better products made LEGO the most profitable toy company per unit sold.", tag: "ROE Grid" },
      { brand: "Airbnb", lesson: "Early planning prioritised professional photography over paid ads. High-impact, low-effort — a brief that generated $1M+ in incremental bookings.", tag: "Creative Brief" },
    ],
  },
  {
    id: 4, title: "Execution", color: "#B4FF6E", textColor: "#000",
    tagline: "Execute Your Brand",
    framework:
      "Execution is where strategy lives or dies. Consistent execution across all consumer touchpoints is what builds brand equity over time. The ABC's Checklist forces you to audit every consumer interaction against your Brand Idea before it goes live.",
    lessons: [
      "Consistency of brand expression compounds like interest — the longer you stay on strategy, the more equity you build.",
      "Brief your creative team with consumer language, not brand language.",
      "The best execution makes the strategy invisible — consumers just feel it.",
      "Use Kanban to manage tasks, not just timelines — flow matters more than deadlines.",
    ],
    tip: "Before any execution goes live, run the ABC check: (A) On-brand? (B) On-strategy? (C) Would our target consumer love it? All three must be yes.",
    caseStudy: "Coca-Cola's 'Share a Coke' succeeded because every touchpoint — packaging, social, OOH, retail — delivered the same personal connection. No channel was left off-strategy.",
    brandExamples: [
      { brand: "Nike", lesson: "Every Nike execution — from a $30M Super Bowl ad to a tweet — runs through the same brand voice and visual system. Consistency is their moat.", tag: "Consistency" },
      { brand: "Lululemon", lesson: "In-store Brand Educators turned staff into storytellers — best-in-class execution of the community brand idea at ground level.", tag: "Touchpoints" },
    ],
  },
];

const PRINCIPLES = [
  "Brands that win own a specific idea in the consumer's mind — not features, not benefits.",
  "Strategy without execution is a dream. Execution without strategy is a nightmare.",
  "The best brand plans are one page. If you can't simplify it, you don't understand it yet.",
  "Your Brand Idea must be differentiating, motivating to consumers, and ownable by you.",
  "Great marketing is about doing fewer things — better. Say no more than you say yes.",
  "Consistency of brand expression compounds like interest over time.",
  "Brief the consumer's current truth first. The desired truth comes second.",
  "Measure leading indicators (equity) to predict lagging indicators (profit).",
];

export function PlaybookPanel({ open, onClose }: PlaybookPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Framework");
  const [activeModId, setActiveModId] = useState(1);

  const mod = MODULES_DATA.find(m => m.id === activeModId) || MODULES_DATA[0];

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-[440px] bg-white border-l-[1.5px] border-black z-50",
        "flex flex-col shadow-[-8px_0px_0px_0px_rgba(0,0,0,0.12)]",
        "transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "translate-x-full"
      )}>

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="flex-shrink-0 bg-[#FF5C00] border-b-[1.5px] border-black px-5 py-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <BookOpen className="w-4 h-4 text-white/80" />
                <span className="font-['Archivo_Black'] text-white/80 uppercase tracking-widest text-[10px]">
                  Beloved Brands Framework
                </span>
              </div>
              <h2 className="font-['Archivo_Black'] text-white uppercase leading-tight text-[22px]">
                Strategy Playbook
              </h2>
              <p className="text-white/60 text-[11px] mt-1 font-bold">
                by Graham Robertson · 6-Module Framework
              </p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 bg-white/20 border-[1.5px] border-white/40 rounded-[4px]
                         flex items-center justify-center hover:bg-white/40 transition-all">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* ── Module Selector ────────────────────────────────────── */}
        <div className="flex-shrink-0 px-4 py-3 border-b-[1.5px] border-black/10 bg-[#FAF9F6]">
          <p className="text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-2">Select Module</p>
          <div className="flex flex-wrap gap-1.5">
            {MODULES_DATA.map(m => (
              <button key={m.id}
                onClick={() => setActiveModId(m.id)}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-[4px] border-[1.5px] border-black transition-all",
                  activeModId === m.id
                    ? "shadow-[2px_2px_0px_0px_#000] -translate-x-[1px] -translate-y-[1px]"
                    : "bg-white hover:bg-black/5"
                )}
                style={activeModId === m.id ? { backgroundColor: m.color } : {}}
              >
                <span className="text-[8px] font-bold opacity-50">{m.id}.</span>
                {m.title}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tabs ──────────────────────────────────────────────── */}
        <div className="flex-shrink-0 flex border-b-[1.5px] border-black">
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wide transition-all",
                i < TABS.length - 1 && "border-r-[1.5px] border-black",
                activeTab === tab ? "bg-black text-white" : "bg-white hover:bg-black/5 text-gray-600"
              )}>
              {tab}
            </button>
          ))}
        </div>

        {/* ── Content ───────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">

          {/* Framework Tab */}
          {activeTab === "Framework" && (
            <>
              {/* Module card */}
              <div className="p-4 rounded-[4px] border-[1.5px] border-black shadow-[5px_5px_0px_0px_#000]"
                   style={{ backgroundColor: mod.color }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 bg-black/20 border border-black/30 rounded-[3px]
                                   flex items-center justify-center text-[10px] font-black">
                    {mod.id}
                  </span>
                  <div>
                    <div className="font-['Archivo_Black'] text-[13px] uppercase leading-none">{mod.title}</div>
                    <div className="text-[9px] font-bold opacity-60 uppercase tracking-widest">{mod.tagline}</div>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed font-bold">{mod.framework}</p>
              </div>

              {/* Strategic Flow */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2.5">
                  The 6-Step Strategic Flow
                </p>
                <div className="flex flex-col gap-1.5">
                  {MODULES_DATA.map((m, i) => (
                    <button key={m.id}
                      onClick={() => setActiveModId(m.id)}
                      className={cn(
                        "flex items-center gap-3 p-2.5 rounded-[4px] border-[1.5px] border-black",
                        "transition-all text-left w-full",
                        m.id === activeModId
                          ? "shadow-[3px_3px_0px_0px_#000] -translate-x-[1px] -translate-y-[1px]"
                          : "bg-white hover:bg-black/5"
                      )}
                      style={m.id === activeModId ? { backgroundColor: m.color } : {}}
                    >
                      <span className="w-5 h-5 bg-black/15 rounded-[3px] border border-black/20
                                       flex items-center justify-center text-[9px] font-black flex-shrink-0">
                        {m.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold truncate">{m.title}</div>
                        <div className="text-[9px] text-gray-500 truncate">{m.tagline}</div>
                      </div>
                      {i < MODULES_DATA.length - 1 && (
                        <ChevronRight className="w-3.5 h-3.5 text-black/30 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Lessons Tab */}
          {activeTab === "Lessons" && (
            <>
              {/* Power tip */}
              <div className="flex gap-3 p-4 bg-[#FFDE00] border-[1.5px] border-black rounded-[4px] shadow-[4px_4px_0px_0px_#000]">
                <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5">
                    Power Tip — {mod.title}
                  </p>
                  <p className="text-[12px] leading-relaxed font-bold">{mod.tip}</p>
                </div>
              </div>

              {/* Module-specific lessons */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2.5">
                  Key Lessons for {mod.title}
                </p>
                <div className="flex flex-col gap-2">
                  {mod.lessons.map((lesson, i) => (
                    <div key={i}
                      className="flex items-start gap-3 p-3 bg-white border-[1.5px] border-black/20
                                 rounded-[4px] hover:border-black hover:shadow-[2px_2px_0px_0px_#000] transition-all">
                      <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-[9px]
                                       font-black rounded-[3px] border-[1.5px] border-black bg-[#FF80FF]">
                        {i + 1}
                      </span>
                      <p className="text-[11px] leading-relaxed text-gray-700 font-bold">{lesson}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Universal principles */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2.5">
                  Universal Principles from Beloved Brands
                </p>
                <div className="flex flex-col gap-1.5">
                  {PRINCIPLES.map((p, i) => (
                    <div key={i}
                      className="flex items-start gap-2.5 p-2.5 bg-[#FAF9F6] border-[1.5px] border-black/10
                                 rounded-[4px] hover:bg-white hover:border-black/30 transition-all">
                      <Star className="w-3 h-3 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] leading-relaxed text-gray-600">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Case Studies Tab */}
          {activeTab === "Case Studies" && (
            <>
              {/* Featured case study */}
              <div className="p-4 border-[1.5px] border-black rounded-[4px] shadow-[4px_4px_0px_0px_#000]"
                   style={{ backgroundColor: mod.color }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">
                    Real-World Example — {mod.title}
                  </span>
                </div>
                <p className="text-[12px] leading-relaxed font-bold">{mod.caseStudy}</p>
              </div>

              {/* Module brand examples */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2.5">
                  Brand Examples for {mod.title}
                </p>
                {mod.brandExamples.map((ex, i) => (
                  <div key={i}
                    className="mb-3 p-3.5 bg-white border-[1.5px] border-black rounded-[4px]
                               hover:shadow-[3px_3px_0px_0px_#000] hover:-translate-x-[1px] hover:-translate-y-[1px]
                               transition-all cursor-default">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-['Archivo_Black'] text-[14px] uppercase">{ex.brand}</span>
                      <span className="text-[8px] font-bold uppercase tracking-widest bg-[#00E5FF]
                                       px-1.5 py-0.5 rounded-[2px] border border-black/20">
                        {ex.tag}
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-gray-600">{ex.lesson}</p>
                  </div>
                ))}
              </div>

              {/* Cross-industry case studies */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2.5">
                  Broader Brand Success Stories
                </p>
                {[
                  { brand: "Nike", lesson: "'Just Do It' captured a universal human truth. Their strategy — inspire the athlete in everyone — guided 40 years of executions without wavering.", tag: "Brand Idea" },
                  { brand: "Oatly", lesson: "Radical transparency and anti-corporate voice built credibility that traditional advertising can't buy. Brand idea drove product, packaging, and comms.", tag: "Positioning" },
                  { brand: "Lululemon", lesson: "By turning customers into community ambassadors and Brand Educators into storytellers, they built brand equity that no ad budget can replicate.", tag: "Execution" },
                ].map((cs, i) => (
                  <div key={i}
                    className="mb-2.5 p-3 bg-[#FAF9F6] border-[1.5px] border-black/15 rounded-[4px]
                               hover:border-black hover:bg-white hover:shadow-[2px_2px_0px_0px_#000] transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-['Archivo_Black'] text-[12px] uppercase">{cs.brand}</span>
                      <span className="text-[8px] font-bold uppercase tracking-widest bg-black/8
                                       text-gray-500 px-1.5 py-0.5 rounded-[2px]">
                        {cs.tag}
                      </span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-gray-600">{cs.lesson}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Footer ────────────────────────────────────────────── */}
        <div className="flex-shrink-0 border-t-[1.5px] border-black px-5 py-3 bg-[#FAF9F6]
                        flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-600">
              Based on <em className="font-['Archivo_Black'] not-italic">Beloved Brands</em>
            </p>
            <p className="text-[9px] text-gray-400">by Graham Robertson</p>
          </div>
          <button className="flex items-center gap-1.5 text-[10px] font-bold text-[#FF5C00] hover:underline">
            <ExternalLink className="w-3 h-3" /> Full Book
          </button>
        </div>
      </div>
    </>
  );
}