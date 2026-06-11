import React, { useState } from "react";
import { 
  Target, Edit2, Lock, Sparkles, AlertTriangle, X, 
  CheckCircle, Plus, FileText, Download, Music,
  Heart, Zap, Compass
} from "lucide-react";
import { NeoButton, cn } from "../components/NeoButton";
import { Textarea, Badge, Tooltip } from "../components/UIComponents";
import { NeoInput } from "../components/NeoInput";

// --- MOCK AUTO-EXTRACTED DATA ---
const MOCK_TARGET = "Suburban working moms seeking healthy options";
const MOCK_BENEFIT = "Healthy snacks that actually taste good";
const MOCK_IDEA = "The Guilt-Free Joyride";

type ExecutionRow = {
  issue: string;
  strategy: string;
  tactics: string[];
};

export function BrandPlan() {
  // Top Section
  const [vision, setVision] = useState("");
  const [purpose, setPurpose] = useState("");
  const [values, setValues] = useState<string[]>(["Quality", "Integrity"]);
  const [valInput, setValInput] = useState("");
  const [goals, setGoals] = useState("");

  // Bottom Section
  const [rows, setRows] = useState<ExecutionRow[]>([
    { issue: "", strategy: "", tactics: [""] },
    { issue: "", strategy: "", tactics: [""] },
    { issue: "", strategy: "", tactics: [""] },
  ]);

  const [tubaAlert, setTubaAlert] = useState<{row: number, tactic: number} | null>(null);

  // --- Handlers ---

  const handleAddValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && valInput.trim()) {
      e.preventDefault();
      if (!values.includes(valInput.trim())) {
        setValues([...values, valInput.trim()]);
      }
      setValInput("");
    }
  };

  const removeValue = (tag: string) => {
    setValues(values.filter(v => v !== tag));
  };

  const updateRow = (rowIndex: number, field: 'issue' | 'strategy', value: string) => {
    const newRows = [...rows];
    newRows[rowIndex][field] = value;
    setRows(newRows);
  };

  const updateTactic = (rowIndex: number, tacticIndex: number, value: string) => {
    const newRows = [...rows];
    newRows[rowIndex].tactics[tacticIndex] = value;
    setRows(newRows);
    
    // Clear tuba alert if editing the affected tactic
    if (tubaAlert?.row === rowIndex && tubaAlert?.tactic === tacticIndex) {
      setTubaAlert(null);
    }
  };

  const addTactic = (rowIndex: number) => {
    const newRows = [...rows];
    if (newRows[rowIndex].tactics.length < 3) {
      newRows[rowIndex].tactics.push("");
      setRows(newRows);
    }
  };

  const removeTactic = (rowIndex: number, tacticIndex: number) => {
    const newRows = [...rows];
    newRows[rowIndex].tactics.splice(tacticIndex, 1);
    setRows(newRows);
    
    if (tubaAlert?.row === rowIndex && tubaAlert?.tactic === tacticIndex) {
      setTubaAlert(null);
    }
  };

  const scanForTubas = () => {
    // Mock AI Scan: Find the first non-empty tactic that is at index 1 or 2 (to simulate a disconnected tactic)
    for (let r = 0; r < rows.length; r++) {
      for (let t = 1; t < rows[r].tactics.length; t++) {
        if (rows[r].tactics[t].trim() !== "") {
          setTubaAlert({ row: r, tactic: t });
          return;
        }
      }
    }
    // Fallback if no specific tactic found
    if (rows[0].tactics[0].trim() !== "") {
      setTubaAlert({ row: 0, tactic: 0 });
    }
  };

  return (
    <div className="flex flex-col gap-8 font-['Space_Grotesk'] max-w-[1400px] mx-auto pb-20 relative h-full">
      
      {/* Header */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="font-['Archivo_Black'] text-4xl uppercase tracking-tighter flex items-center gap-3">
            One-Page Brand Plan
            <Badge status="success">Step 6</Badge>
          </h1>
          <div className="flex gap-3">
            <NeoButton color="white" className="flex gap-2 !py-2 !px-4">
              <Download className="w-4 h-4" /> Export PDF
            </NeoButton>
          </div>
        </div>
        <p className="text-gray-600 font-bold mt-1 max-w-3xl">
          The ultimate decision-making tool. Strictly limited to one page. Use the Power of Threes (3x3) to align your team and focus resources.
        </p>
      </section>

      {/* The A4-like Canvas */}
      <div className="bg-white border-[3px] border-black rounded-[2px] shadow-[12px_12px_0px_0px_#000] p-8 md:p-10 flex flex-col gap-10 min-h-[800px] relative">
        
        {/* --- KHỐI 1: FOUNDATION --- */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b-[3px] border-black pb-2">
            <Target className="w-6 h-6 text-[#FF5C00]" />
            <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide">1. Foundation</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Vision */}
            <div className="flex flex-col gap-2 bg-[#FAF9F6] border-[2px] border-black p-4 rounded-[2px] shadow-[4px_4px_0px_0px_#00E5FF]">
              <div className="flex flex-col gap-0.5">
                <h3 className="font-['Archivo_Black'] uppercase text-sm">Vision</h3>
                <span className="text-[10px] font-bold text-gray-500">Where are we going in 5-10 years?</span>
              </div>
              <Textarea 
                className="h-20 text-sm border-[2px] border-black focus:shadow-[2px_2px_0px_0px_#000]"
                placeholder="e.g., To be the #1 healthy snack brand globally."
                value={vision} onChange={e => setVision(e.target.value)}
              />
            </div>

            {/* Purpose */}
            <div className="flex flex-col gap-2 bg-[#FAF9F6] border-[2px] border-black p-4 rounded-[2px] shadow-[4px_4px_0px_0px_#FF80FF]">
              <div className="flex flex-col gap-0.5">
                <h3 className="font-['Archivo_Black'] uppercase text-sm">Purpose</h3>
                <span className="text-[10px] font-bold text-gray-500">Why do we exist?</span>
              </div>
              <Textarea 
                className="h-20 text-sm border-[2px] border-black focus:shadow-[2px_2px_0px_0px_#000]"
                placeholder="e.g., To make healthy living joyful."
                value={purpose} onChange={e => setPurpose(e.target.value)}
              />
            </div>

            {/* Values */}
            <div className="flex flex-col gap-2 bg-[#FAF9F6] border-[2px] border-black p-4 rounded-[2px] shadow-[4px_4px_0px_0px_#4ADE80]">
              <div className="flex flex-col gap-0.5">
                <h3 className="font-['Archivo_Black'] uppercase text-sm">Values</h3>
                <span className="text-[10px] font-bold text-gray-500">Our core beliefs (Press Enter to add)</span>
              </div>
              <NeoInput 
                className="h-8 text-sm" placeholder="Add value..."
                value={valInput} onChange={e => setValInput(e.target.value)}
                onKeyDown={handleAddValue}
              />
              <div className="flex flex-wrap gap-1.5 mt-1">
                {values.map(v => (
                  <span key={v} className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-[2px] flex items-center gap-1">
                    {v}
                    <X className="w-3 h-3 cursor-pointer hover:text-red-400" onClick={() => removeValue(v)} />
                  </span>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div className="flex flex-col gap-2 bg-[#FAF9F6] border-[2px] border-black p-4 rounded-[2px] shadow-[4px_4px_0px_0px_#FFDE00]">
              <div className="flex flex-col gap-0.5">
                <h3 className="font-['Archivo_Black'] uppercase text-sm">Goals</h3>
                <span className="text-[10px] font-bold text-gray-500">Key metrics (Revenue, Share)</span>
              </div>
              <Textarea 
                className="h-20 text-sm border-[2px] border-black focus:shadow-[2px_2px_0px_0px_#000]"
                placeholder="e.g., $10M ARR, 15% market share."
                value={goals} onChange={e => setGoals(e.target.value)}
              />
            </div>

          </div>
        </div>

        {/* --- KHỐI 2: CORE STRATEGY (READ-ONLY) --- */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center gap-2 border-b-[3px] border-black pb-2">
            <Heart className="w-6 h-6 text-[#FF80FF]" />
            <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide">2. Core Strategy</h2>
            <Badge status="info" className="ml-2">Auto-filled</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gray-50 border-[2px] border-dashed border-black/30 p-6 rounded-[2px] relative">
            
            {/* Locked Badge Overlay */}
            <div className="absolute -top-3 -right-3 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-[2px_2px_0px_0px_#FFDE00]">
              <Lock className="w-3 h-3" /> Synchronized
            </div>

            <div className="flex flex-col gap-2 bg-white/80 backdrop-blur-sm border-[2px] border-black/40 p-4 rounded-[2px] relative group">
              <Edit2 className="w-4 h-4 absolute top-3 right-3 text-black/20 group-hover:text-black cursor-pointer transition-colors" />
              <span className="text-[10px] font-['Archivo_Black'] uppercase text-gray-500">Target Market (Step 3)</span>
              <p className="text-sm font-bold text-black/80">{MOCK_TARGET}</p>
            </div>

            <div className="flex flex-col gap-2 bg-white/80 backdrop-blur-sm border-[2px] border-black/40 p-4 rounded-[2px] relative group">
              <Edit2 className="w-4 h-4 absolute top-3 right-3 text-black/20 group-hover:text-black cursor-pointer transition-colors" />
              <span className="text-[10px] font-['Archivo_Black'] uppercase text-gray-500">Main Benefit (Step 4)</span>
              <p className="text-sm font-bold text-black/80">{MOCK_BENEFIT}</p>
            </div>

            <div className="flex flex-col gap-2 bg-[#FFDE00]/90 backdrop-blur-sm border-[2px] border-black p-4 rounded-[2px] relative group shadow-[4px_4px_0px_0px_#000]">
              <Edit2 className="w-4 h-4 absolute top-3 right-3 text-black/40 group-hover:text-black cursor-pointer transition-colors" />
              <span className="text-[10px] font-['Archivo_Black'] uppercase text-black/70">The Brand Idea (Step 5)</span>
              <p className="text-lg font-['Archivo_Black'] uppercase leading-tight text-black">{MOCK_IDEA}</p>
            </div>

          </div>
        </div>

        {/* --- KHỐI 3: EXECUTION GRID --- */}
        <div className="flex flex-col gap-4 mt-2 flex-1">
          <div className="flex items-center justify-between border-b-[3px] border-black pb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#00E5FF]" />
              <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide">3. Execution Grid</h2>
              <Badge status="warning" className="ml-2">Power of 3s</Badge>
            </div>
          </div>
          <p className="text-sm font-bold text-gray-600 mb-2">
            Identify your top 3 issues, pair them with 3 strategies, and deploy maximum 3 tactics per strategy. Do not exceed 9 total projects.
          </p>

          <div className="flex flex-col border-[2px] border-black rounded-[2px] bg-white">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-black text-white">
              <div className="col-span-4 p-3 border-r-[2px] border-black/20 font-['Archivo_Black'] uppercase text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#FFDE00]" /> Key Issues (Max 3)
              </div>
              <div className="col-span-4 p-3 border-r-[2px] border-black/20 font-['Archivo_Black'] uppercase text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#00E5FF]" /> Strategies (Max 3)
              </div>
              <div className="col-span-4 p-3 font-['Archivo_Black'] uppercase text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#4ADE80]" /> Tactics (Max 3/Strategy)
              </div>
            </div>

            {/* Table Body */}
            <div className="flex flex-col divide-y-[2px] divide-black">
              {rows.map((row, i) => (
                <div key={i} className="grid grid-cols-12 bg-[#FAF9F6] relative group">
                  
                  {/* Row Number Marker */}
                  <div className="absolute -left-3 top-4 w-6 h-6 bg-black text-white font-['Archivo_Black'] text-xs flex items-center justify-center rounded-full z-10 border-[2px] border-white shadow-[2px_2px_0px_0px_#000]">
                    {i + 1}
                  </div>

                  {/* Column 1: Issues */}
                  <div className="col-span-4 p-4 border-r-[2px] border-black">
                    <div className="relative">
                      <span className="absolute left-3 top-[11px] font-bold text-gray-500 italic text-sm pointer-events-none">How do we</span>
                      <Textarea 
                        className="pl-[95px] min-h-[100px] text-sm font-bold border-black focus:shadow-[2px_2px_0px_0px_#000]"
                        placeholder="...overcome X?"
                        value={row.issue} onChange={e => updateRow(i, 'issue', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Column 2: Strategies */}
                  <div className="col-span-4 p-4 border-r-[2px] border-black">
                    <Textarea 
                      className="min-h-[100px] text-sm font-bold border-black focus:shadow-[2px_2px_0px_0px_#000]"
                      placeholder="e.g., Focus on retail expansion in urban areas."
                      value={row.strategy} onChange={e => updateRow(i, 'strategy', e.target.value)}
                    />
                  </div>

                  {/* Column 3: Tactics */}
                  <div className="col-span-4 p-4 flex flex-col gap-3">
                    {row.tactics.map((t, j) => {
                      const isTuba = tubaAlert?.row === i && tubaAlert?.tactic === j;
                      return (
                        <div key={j} className="flex items-start gap-2 relative">
                          <span className="mt-2.5 text-black font-bold shrink-0">•</span>
                          <div className="flex-1 relative">
                            <NeoInput 
                              className={cn(
                                "h-10 text-sm font-medium border-black pr-8",
                                isTuba && "bg-[#FFDE00] border-[#FF5C00] shadow-[0px_0px_0px_2px_#FF5C00]"
                              )}
                              placeholder="Actionable tactic..."
                              value={t} onChange={e => updateTactic(i, j, e.target.value)}
                            />
                            {row.tactics.length > 1 && (
                              <X 
                                className="w-4 h-4 absolute right-2 top-3 text-gray-400 hover:text-red-500 cursor-pointer" 
                                onClick={() => removeTactic(i, j)} 
                              />
                            )}

                            {/* Tuba Alert Tooltip */}
                            {isTuba && (
                              <div className="absolute top-full left-0 z-50 bg-black text-white p-3 text-xs font-bold rounded-[2px] mt-2 shadow-[4px_4px_0px_0px_#FF5C00] w-[120%] border-[2px] border-[#FF5C00] animate-in slide-in-from-top-2">
                                <div className="absolute -top-2 left-4 w-3 h-3 bg-black border-l-[2px] border-t-[2px] border-[#FF5C00] rotate-45"></div>
                                <span className="flex items-center gap-2 text-[#FFDE00] text-sm mb-1 uppercase tracking-wide">
                                  <Music className="w-4 h-4" /> Tuba Alert!
                                </span>
                                This tactic seems disconnected from the strategy above. Does it really solve the key issue, or is it wasting resources?
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {row.tactics.length < 3 ? (
                      <button 
                        onClick={() => addTactic(i)} 
                        className="text-xs font-bold self-start mt-1 text-gray-500 hover:text-black flex items-center gap-1 uppercase tracking-wider"
                      >
                        <Plus className="w-3 h-3" /> Add Tactic
                      </button>
                    ) : (
                      <span className="text-[10px] text-[#FF5C00] font-bold mt-1 uppercase tracking-wider flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Max 3 Tactics Reached
                      </span>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating AI Scan Button */}
        <div className="absolute -bottom-6 -right-6 z-20">
          <NeoButton 
            color="yellow" 
            onClick={scanForTubas} 
            className="flex items-center gap-2 !p-4 !text-lg shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all"
          >
            <Music className="w-5 h-5" /> 
            AI Scan for Tubas (Logic Check)
          </NeoButton>
        </div>

      </div>
    </div>
  );
}

// Ensure the necessary icons are imported at the top.
// Add Heart and Compass and Music to the import from lucide-react.