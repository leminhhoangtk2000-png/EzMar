import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { 
  Package, BookOpen, Star, DollarSign, 
  Crown, Swords, Zap, Wrench, 
  ArrowUpRight, Activity, RefreshCcw, Rocket,
  Lightbulb, Save, Edit3, ChevronRight
} from "lucide-react";
import { NeoButton, cn } from "../components/NeoButton";
import { Tooltip, Textarea } from "../components/UIComponents";

// --- DATA DEFINITIONS ---

const STRENGTHS = [
  { id: 'product', title: 'Product', desc: 'Superior product, focused on R&D and features', icon: Package, statement: 'superior product quality' },
  { id: 'story', title: 'Story', desc: 'Differentiated idea, strong emotional connection', icon: BookOpen, statement: 'an inspiring brand story' },
  { id: 'experience', title: 'Experience', desc: 'Excellent service, unique internal culture', icon: Star, statement: 'exceptional customer experience' },
  { id: 'price', title: 'Price', desc: 'Cost advantage, lower price, high performance', icon: DollarSign, statement: 'a competitive pricing advantage' },
];

const LOVE_CURVE = [
  { id: 'unknown', label: 'Unknown', hint: 'Goal: Stand out in the crowd', statement: 'attract attention from unknown audiences', x: 5, y: 90 },
  { id: 'indifferent', label: 'Indifferent', hint: 'Goal: Create differentiation to get noticed', statement: 'change the perspective of indifferent customers', x: 25, y: 75 },
  { id: 'likeit', label: 'Like It', hint: 'Goal: Build habits and trust', statement: 'convert preference into loyalty', x: 50, y: 55 },
  { id: 'loveit', label: 'Love It', hint: 'Goal: Increase frequency and lifetime value', statement: 'strengthen intense brand love', x: 75, y: 25 },
  { id: 'beloved', label: 'Beloved', hint: 'Goal: Turn customers into brand ambassadors', statement: 'maintain an irreplaceable beloved status', x: 95, y: 10 },
];

const POSITIONS = [
  { id: 'power', title: 'Power Player', desc: 'Market domination, defensive strategy', icon: Crown, statement: 'consolidate our market leadership position' },
  { id: 'challenger', title: 'Challenger', desc: 'Direct confrontation with the leader', icon: Swords, statement: 'directly challenge major competitors' },
  { id: 'disruptor', title: 'Disruptor', desc: 'Explore blue oceans, change the rules', icon: Zap, statement: 'disrupt traditional industry rules' },
  { id: 'craft', title: 'Craft', desc: 'Focus on a small, highly engaged niche', icon: Wrench, statement: 'serve a highly specialized niche market' },
];

const SITUATIONS = [
  { id: 'momentum', title: 'Momentum', desc: 'Maintain speed and fix minor gaps', color: 'bg-[#4ADE80] border-black text-black shadow-[4px_4px_0px_0px_#000]', hover: 'hover:shadow-[6px_6px_0px_0px_#000]', icon: ArrowUpRight, statement: 'maintain strong growth momentum' },
  { id: 'fixit', title: 'Fix It', desc: 'Declining performance, turnaround needed', color: 'bg-[#F87171] border-black text-white shadow-[4px_4px_0px_0px_#000]', hover: 'hover:shadow-[6px_6px_0px_0px_#000]', icon: Activity, statement: 'invest in a comprehensive turnaround to fix weaknesses' },
  { id: 'realign', title: 'Re-align', desc: 'Internal drift, disconnected activities', color: 'bg-[#FF5C00] border-black text-white shadow-[4px_4px_0px_0px_#000]', hover: 'hover:shadow-[6px_6px_0px_0px_#000]', icon: RefreshCcw, statement: 'restructure and synchronize our operations' },
  { id: 'startup', title: 'Start-up', desc: 'New brand or new product launch', color: 'bg-[#00E5FF] border-black text-black shadow-[4px_4px_0px_0px_#000]', hover: 'hover:shadow-[6px_6px_0px_0px_#000]', icon: Rocket, statement: 'build a solid foundation for the initial launch phase' },
];

export function ThinkBox() {
  const [strength, setStrength] = useState<string | null>(null);
  const [love, setLove] = useState<string | null>(null);
  const [position, setPosition] = useState<string | null>(null);
  const [situation, setSituation] = useState<string | null>(null);

  const [statement, setStatement] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const allSelected = strength && love && position && situation;

  // Auto-generate statement when all 4 are selected (and not currently editing manually)
  useEffect(() => {
    if (allSelected && !isEditing) {
      const a = SITUATIONS.find(s => s.id === situation)?.statement || "";
      const b = STRENGTHS.find(s => s.id === strength)?.statement || "";
      const c = POSITIONS.find(s => s.id === position)?.statement || "";
      const d = LOVE_CURVE.find(s => s.id === love)?.statement || "";

      setStatement(`The brand will deploy resources to [${a}], by focusing on our core strength of [${b}] in order to [${c}]. The ultimate goal is to [${d}], thereby driving breakthrough business results.`);
    }
  }, [strength, love, position, situation, allSelected, isEditing]);

  return (
    <div className="flex flex-col gap-8 font-['Space_Grotesk'] max-w-7xl mx-auto pb-12 relative h-full">
      
      {/* Header */}
      <section className="flex flex-col gap-2">
        <h1 className="font-['Archivo_Black'] text-4xl uppercase tracking-tighter">
          Strategic ThinkBox
        </h1>
        <p className="text-gray-600 font-bold mt-1">Force yourself to make difficult decisions. Eliminate the urge to do everything by choosing a <span className="text-[#FF5C00] uppercase font-['Archivo_Black']">single path</span> for each quadrant.</p>
      </section>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
        
        {/* Left Side - Interactive Forms (65%) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-14">
          
          {/* Q1: Strengths */}
          <div className="flex flex-col gap-5 relative">
            <div className="absolute -left-8 top-1 font-['Archivo_Black'] text-3xl text-gray-200">01</div>
            <h2 className="font-['Archivo_Black'] text-xl uppercase tracking-wide border-b-[2px] border-black pb-2">What is the brand's core strength?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {STRENGTHS.map((item) => {
                const isSelected = strength === item.id;
                const isDimmed = strength !== null && strength !== item.id;
                return (
                  <div 
                    key={item.id}
                    onClick={() => { setStrength(item.id); setIsEditing(false); }}
                    className={cn(
                      "p-5 border-[2px] rounded-[4px] cursor-pointer transition-all duration-300 flex flex-col gap-3 relative overflow-hidden group",
                      isSelected ? "border-black bg-[#FFDE00] shadow-[6px_6px_0px_0px_#000] scale-[1.02] z-10" : "border-black bg-white shadow-[3px_3px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#000]",
                      isDimmed && "opacity-40 grayscale hover:opacity-80 hover:grayscale-0"
                    )}
                  >
                    {isSelected && (
                      <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 font-['Archivo_Black'] text-xs uppercase shadow-[-2px_2px_0px_0px_#FF5C00]">Selected</div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-[4px] border-[1.5px] border-black", isSelected ? "bg-white" : "bg-[#FAF9F6] group-hover:bg-[#FFDE00] transition-colors")}>
                        <item.icon className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="font-['Archivo_Black'] text-lg uppercase leading-tight">{item.title}</h3>
                    </div>
                    <p className="text-sm font-bold text-gray-700">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Q2: Love Curve */}
          <div className="flex flex-col gap-5 relative">
            <div className="absolute -left-8 top-1 font-['Archivo_Black'] text-3xl text-gray-200">02</div>
            <h2 className="font-['Archivo_Black'] text-xl uppercase tracking-wide flex items-center justify-between border-b-[2px] border-black pb-2">
              <span>Brand Love Curve</span>
            </h2>
            <div className="bg-white border-[2px] border-black rounded-[4px] p-6 shadow-[6px_6px_0px_0px_#FF80FF] h-80 relative overflow-hidden flex flex-col justify-end">
              
              {/* Background Graph Lines */}
              <div className="absolute inset-0 p-8 pt-12 pb-16 w-full h-full pointer-events-none">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                  <path d="M 0,100 C 30,100 40,50 100,0" fill="none" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="2 2" />
                  <path d="M 0,100 C 30,100 40,50 100,0" fill="none" stroke="black" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Waypoints */}
              <div className="absolute inset-0 p-8 pt-12 pb-16 w-full h-full">
                {LOVE_CURVE.map((point) => {
                  const isSelected = love === point.id;
                  const isDimmed = love !== null && love !== point.id;
                  
                  return (
                    <Tooltip key={point.id} text={point.hint}>
                      <div 
                        onClick={() => { setLove(point.id); setIsEditing(false); }}
                        className={cn(
                          "absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-[2px] cursor-pointer transition-all duration-300 flex items-center justify-center z-10",
                          isSelected ? "bg-[#FF5C00] border-black scale-150 shadow-[3px_3px_0px_0px_#000]" : "bg-white border-black hover:scale-125 hover:bg-[#FFDE00]",
                          isDimmed && "opacity-40 grayscale"
                        )}
                        style={{ left: `${point.x}%`, top: `${point.y}%` }}
                      >
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                        
                        {/* Label underneath */}
                        <div className={cn(
                          "absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-['Archivo_Black'] text-xs uppercase px-2 py-1 rounded-[2px]",
                          isSelected ? "bg-black text-white shadow-[2px_2px_0px_0px_#FF5C00]" : "text-gray-500 bg-white border-[1px] border-gray-300"
                        )}>
                          {point.label}
                        </div>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Q3: Competitive Position */}
          <div className="flex flex-col gap-5 relative">
            <div className="absolute -left-8 top-1 font-['Archivo_Black'] text-3xl text-gray-200">03</div>
            <h2 className="font-['Archivo_Black'] text-xl uppercase tracking-wide border-b-[2px] border-black pb-2">Current Competitive Position</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#FAF9F6] p-6 border-[2px] border-black border-dashed rounded-[4px]">
              {POSITIONS.map((item) => {
                const isSelected = position === item.id;
                const isDimmed = position !== null && position !== item.id;
                return (
                  <div 
                    key={item.id}
                    onClick={() => { setPosition(item.id); setIsEditing(false); }}
                    className={cn(
                      "p-4 border-[2px] rounded-[4px] cursor-pointer transition-all duration-300 flex items-center gap-4",
                      isSelected ? "border-black bg-black text-white shadow-[4px_4px_0px_0px_#00E5FF] scale-[1.02]" : "border-black bg-white text-black hover:bg-black hover:text-white",
                      isDimmed && "opacity-30 grayscale hover:opacity-100 hover:grayscale-0"
                    )}
                  >
                    <item.icon className={cn("w-8 h-8", isSelected ? "text-[#00E5FF]" : "text-gray-400")} />
                    <div className="flex flex-col">
                      <h3 className="font-['Archivo_Black'] text-base uppercase leading-tight">{item.title}</h3>
                      <p className={cn("text-xs font-bold mt-1", isSelected ? "text-gray-300" : "text-gray-500")}>{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Q4: Business Situation */}
          <div className="flex flex-col gap-5 relative">
            <div className="absolute -left-8 top-1 font-['Archivo_Black'] text-3xl text-gray-200">04</div>
            <h2 className="font-['Archivo_Black'] text-xl uppercase tracking-wide border-b-[2px] border-black pb-2">Internal Business Situation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SITUATIONS.map((item) => {
                const isSelected = situation === item.id;
                const isDimmed = situation !== null && situation !== item.id;
                return (
                  <div 
                    key={item.id}
                    onClick={() => { setSituation(item.id); setIsEditing(false); }}
                    className={cn(
                      "p-5 border-[2px] rounded-[4px] cursor-pointer transition-all duration-300 flex flex-col gap-3",
                      item.color, item.hover,
                      isSelected ? "scale-[1.02] z-10 border-[3px]" : "bg-white text-black border-black",
                      isDimmed && "opacity-40 grayscale hover:opacity-100 hover:grayscale-0 border-[2px]"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-['Archivo_Black'] text-lg uppercase leading-tight">{item.title}</h3>
                      <div className="bg-white p-1.5 rounded-full border-[2px] border-black text-black">
                        <item.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-sm font-bold opacity-90">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

        {/* Right Side - Sticky Auto-Generated Panel (35%) */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8 flex flex-col gap-4 mt-8 lg:mt-0">
          <div className="bg-white border-[2px] border-black rounded-[4px] p-6 shadow-[8px_8px_0px_0px_#00E5FF] flex flex-col gap-6 relative overflow-hidden">
            
            {/* Panel Header */}
            <div className="flex items-center gap-3 border-b-[2px] border-black pb-4 relative z-10">
              <div className="w-12 h-12 bg-[#FFDE00] border-[2px] border-black rounded-[4px] shadow-[3px_3px_0px_0px_#000] flex items-center justify-center shrink-0">
                <Lightbulb className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="font-['Archivo_Black'] text-xl uppercase tracking-wide leading-tight">Strategic<br/>Objective</h3>
              </div>
            </div>

            {/* Panel Body */}
            <div className="relative z-10 min-h-[300px] flex flex-col">
              {!allSelected ? (
                <div className="flex flex-col items-center justify-center text-center h-full gap-5 opacity-50 my-auto py-8">
                  <div className="grid grid-cols-2 gap-3 opacity-60">
                    <div className={cn("w-8 h-8 border-[2px] border-black rounded-[2px]", strength ? "bg-black shadow-[2px_2px_0px_0px_#FFDE00]" : "bg-gray-200")} />
                    <div className={cn("w-8 h-8 border-[2px] border-black rounded-[2px]", love ? "bg-black shadow-[2px_2px_0px_0px_#FF80FF]" : "bg-gray-200")} />
                    <div className={cn("w-8 h-8 border-[2px] border-black rounded-[2px]", position ? "bg-black shadow-[2px_2px_0px_0px_#00E5FF]" : "bg-gray-200")} />
                    <div className={cn("w-8 h-8 border-[2px] border-black rounded-[2px]", situation ? "bg-black shadow-[2px_2px_0px_0px_#FF5C00]" : "bg-gray-200")} />
                  </div>
                  <p className="font-bold text-sm max-w-[200px]">Please complete the 4 selections on the left to automatically generate the strategic statement.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6 h-full animate-in fade-in duration-500 flex-1">
                  <div className="bg-[#FAF9F6] border-[2px] border-black border-dashed p-5 rounded-[4px] flex-1 flex flex-col">
                    {isEditing ? (
                      <Textarea 
                        className="w-full h-full min-h-[250px] text-base font-bold bg-white focus:bg-white resize-none shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.05)] border-black"
                        value={statement}
                        onChange={(e) => setStatement(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <p className="text-lg font-bold leading-relaxed whitespace-pre-wrap text-black">
                        {statement}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 mt-auto">
                    {isEditing ? (
                      <NeoButton color="green" className="w-full flex justify-center gap-2" onClick={() => setIsEditing(false)}>
                        <Save className="w-4 h-4" /> Save Changes
                      </NeoButton>
                    ) : (
                      <div className="flex gap-3">
                        <NeoButton color="white" className="flex-1 flex justify-center gap-2" onClick={() => setIsEditing(true)}>
                          <Edit3 className="w-4 h-4" /> Edit
                        </NeoButton>
                        <Link to="/planning/brand-plan" className="flex-[2]">
                          <NeoButton color="pink" className="w-full flex justify-center gap-2">
                            Brand Plan <ChevronRight className="w-4 h-4" />
                          </NeoButton>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Brutalist Decor */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#00E5FF] opacity-10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Reset Action */}
          <button 
            onClick={() => { setStrength(null); setLove(null); setPosition(null); setSituation(null); setIsEditing(false); }}
            className="text-xs font-bold text-gray-400 hover:text-black underline underline-offset-4 text-center mt-2 transition-colors"
          >
            Reset all selections
          </button>
        </div>

      </div>
    </div>
  );
}
