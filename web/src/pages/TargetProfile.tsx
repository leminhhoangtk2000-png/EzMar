import React, { useState } from "react";
import { Link } from "react-router";
import { 
  UserCircle2, Lightbulb, Target, Search, Heart, 
  ShieldAlert, Frown, Zap, Brain, Hand, Eye, MessageCircle, ChevronRight, Check
} from "lucide-react";
import { NeoButton, cn } from "../components/NeoButton";
import { Textarea, Badge } from "../components/UIComponents";
import { NeoInput } from "../components/NeoInput";

const FUNCTIONAL_NEEDS = ['Easy', 'Saves time', 'Helps your family', 'Healthier', 'Cost-effective', 'Reliable', 'Reduces risk', 'High performance'];
const EMOTIONAL_NEEDS = ['Optimism', 'Stay in control', 'Feel myself', 'Get noticed', 'Peace of mind', 'Belonging', 'Confidence', 'Freedom'];

export function TargetProfile() {
  const [description, setDescription] = useState("");
  const [funcNeeds, setFuncNeeds] = useState<string[]>([]);
  const [emoNeeds, setEmotionalNeeds] = useState<string[]>([]);
  
  const [enemy, setEnemy] = useState("");
  const [insight, setInsight] = useState("");
  
  const [currentThink, setCurrentThink] = useState("");
  const [currentBuy, setCurrentBuy] = useState("");
  
  const [desiredSee, setDesiredSee] = useState("");
  const [desiredThink, setDesiredThink] = useState("");
  const [desiredDo, setDesiredDo] = useState("");
  const [desiredFeel, setDesiredFeel] = useState("");
  const [desiredWhisper, setDesiredWhisper] = useState("");

  const toggleFuncNeed = (need: string) => {
    setFuncNeeds(prev => prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]);
  };

  const toggleEmoNeed = (need: string) => {
    setEmotionalNeeds(prev => prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]);
  };

  const isFormComplete = description && funcNeeds.length > 0 && emoNeeds.length > 0 && enemy && insight && currentThink && currentBuy && desiredSee && desiredThink && desiredDo && desiredFeel && desiredWhisper;

  return (
    <div className="flex flex-col gap-8 font-['Space_Grotesk'] max-w-7xl mx-auto pb-12 relative h-full">
      
      {/* Header */}
      <section className="flex flex-col gap-2">
        <h1 className="font-['Archivo_Black'] text-4xl uppercase tracking-tighter flex items-center gap-3">
          Ideal Consumer Target
          <Badge status="success">Step 3</Badge>
        </h1>
        <p className="text-gray-600 font-bold mt-1">Shift from asking "Who do we want to target?" to <span className="text-[#FF5C00] uppercase font-['Archivo_Black']">"Who strongly desires what we offer?"</span> Complete the canvas below.</p>
      </section>

      {/* Split Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start relative">
        
        {/* Left Side - Interactive Forms (65%) */}
        <div className="xl:col-span-8 flex flex-col gap-12">
          
          {/* Block 1: Description & Needs */}
          <div className="flex flex-col gap-6 relative">
            <div className="flex items-center gap-3 border-b-[2px] border-black pb-2">
              <div className="w-8 h-8 bg-[#00E5FF] border-[2px] border-black rounded-[4px] shadow-[2px_2px_0px_0px_#000] flex items-center justify-center">
                <UserCircle2 className="w-5 h-5 text-black" />
              </div>
              <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide">1. Description & Needs</h2>
            </div>
            
            <div className="flex flex-col gap-4 bg-white p-6 border-[2px] border-black rounded-[4px] shadow-[6px_6px_0px_0px_#00E5FF]">
              <div className="flex flex-col gap-2">
                <label className="font-['Archivo_Black'] uppercase text-sm tracking-wider">Target Description</label>
                <p className="text-xs font-bold text-gray-500">Define their demographics and lifestyle (e.g., Suburban working moms, 35-40, willing to try anything to stay fit).</p>
                <Textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="E.g., Gen-Z creatives looking for tools that don't restrict their workflow..."
                  rows={2}
                  className="bg-[#FAF9F6] border-black focus:border-[#00E5FF]"
                />
              </div>

              <div className="flex flex-col gap-4 mt-2 pt-4 border-t-[2px] border-dashed border-black/20">
                <div className="flex flex-col gap-2">
                  <label className="font-['Archivo_Black'] uppercase text-sm tracking-wider flex items-center gap-2">
                    <Target className="w-4 h-4" /> Functional Needs
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {FUNCTIONAL_NEEDS.map(need => (
                      <button 
                        key={need}
                        onClick={() => toggleFuncNeed(need)}
                        className={cn(
                          "px-3 py-1.5 text-sm font-bold border-[2px] rounded-[4px] transition-all",
                          funcNeeds.includes(need) 
                            ? "bg-[#FFDE00] border-black text-black shadow-[2px_2px_0px_0px_#000] scale-[1.02]" 
                            : "bg-white border-gray-300 text-gray-500 hover:border-black hover:text-black"
                        )}
                      >
                        {funcNeeds.includes(need) && <Check className="w-3 h-3 inline-block mr-1" />}
                        {need}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <label className="font-['Archivo_Black'] uppercase text-sm tracking-wider flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-500" /> Emotional Needs
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EMOTIONAL_NEEDS.map(need => (
                      <button 
                        key={need}
                        onClick={() => toggleEmoNeed(need)}
                        className={cn(
                          "px-3 py-1.5 text-sm font-bold border-[2px] rounded-[4px] transition-all",
                          emoNeeds.includes(need) 
                            ? "bg-[#FF80FF] border-black text-black shadow-[2px_2px_0px_0px_#000] scale-[1.02]" 
                            : "bg-white border-gray-300 text-gray-500 hover:border-black hover:text-black"
                        )}
                      >
                        {emoNeeds.includes(need) && <Check className="w-3 h-3 inline-block mr-1" />}
                        {need}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: Enemy & Insights */}
          <div className="flex flex-col gap-6 relative">
            <div className="flex items-center gap-3 border-b-[2px] border-black pb-2">
              <div className="w-8 h-8 bg-[#F87171] border-[2px] border-black rounded-[4px] shadow-[2px_2px_0px_0px_#000] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-black" />
              </div>
              <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide">2. Enemy & Insights</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Enemy */}
              <div className="bg-[#FAF9F6] border-[2px] border-black rounded-[4px] p-6 shadow-[6px_6px_0px_0px_#F87171] flex flex-col gap-3 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#F87171]/20 rounded-bl-full pointer-events-none" />
                <label className="font-['Archivo_Black'] uppercase text-base tracking-wider flex items-center gap-2">
                  <Frown className="w-5 h-5 text-red-500" /> The Enemy
                </label>
                <p className="text-xs font-bold text-gray-600">What is the daily pain point or frustration that tortures them?</p>
                <Textarea 
                  value={enemy}
                  onChange={(e) => setEnemy(e.target.value)}
                  placeholder="e.g., The guilt of failing a diet, the complexity of enterprise tech..."
                  rows={4}
                  className="bg-white border-red-300 focus:border-red-500 mt-2"
                />
              </div>

              {/* Insight */}
              <div className="bg-white border-[2px] border-black rounded-[4px] p-6 shadow-[6px_6px_0px_0px_#FFDE00] flex flex-col gap-3 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFDE00]/30 rounded-bl-full pointer-events-none" />
                <label className="font-['Archivo_Black'] uppercase text-base tracking-wider flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#FF5C00]" /> Consumer Insight
                </label>
                <p className="text-xs font-bold text-gray-600">Must be written in the first person. Express their hidden truth.</p>
                
                {/* Forced Insight Input */}
                <div className="mt-2 flex flex-col gap-1">
                  <div className="flex bg-[#FAF9F6] border-[2px] border-black rounded-[4px] p-3 shadow-inner focus-within:ring-2 focus-within:ring-[#FFDE00] transition-shadow items-start h-32">
                    <span className="font-['Archivo_Black'] text-xl text-black mr-2 italic">"I </span>
                    <textarea 
                      value={insight}
                      onChange={(e) => setInsight(e.target.value)}
                      placeholder="know I should lose weight. I try, but I give in to one cookie and lose control..."
                      className="flex-1 h-full outline-none resize-none bg-transparent font-bold text-gray-700 leading-relaxed pt-1"
                    />
                    <span className="font-['Archivo_Black'] text-xl text-black ml-1 italic self-end">"</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Block 3: Behavior Shift */}
          <div className="flex flex-col gap-6 relative">
            <div className="flex items-center gap-3 border-b-[2px] border-black pb-2">
              <div className="w-8 h-8 bg-[#4ADE80] border-[2px] border-black rounded-[4px] shadow-[2px_2px_0px_0px_#000] flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide">3. Behavior Shift</h2>
            </div>

            <div className="bg-white border-[2px] border-black rounded-[4px] p-6 shadow-[6px_6px_0px_0px_#4ADE80] flex flex-col gap-6">
              
              {/* Current State */}
              <div className="flex flex-col gap-4 bg-[#FAF9F6] p-4 border-[2px] border-black border-dashed rounded-[4px]">
                <h3 className="font-['Archivo_Black'] uppercase text-sm bg-black text-white px-3 py-1 inline-block w-fit rounded-[2px] shadow-[2px_2px_0px_0px_#FF5C00]">Current State</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">What they think now?</label>
                    <NeoInput value={currentThink} onChange={(e) => setCurrentThink(e.target.value)} placeholder="e.g., Health food tastes like cardboard." />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">How they buy?</label>
                    <NeoInput value={currentBuy} onChange={(e) => setCurrentBuy(e.target.value)} placeholder="e.g., Buys whatever is cheapest on the shelf." />
                  </div>
                </div>
              </div>

              {/* Desired Response */}
              <div className="flex flex-col gap-4">
                <h3 className="font-['Archivo_Black'] uppercase text-sm bg-[#FFDE00] border-[2px] border-black text-black px-3 py-1 inline-block w-fit rounded-[2px] shadow-[2px_2px_0px_0px_#000]">Desired Brand Response</h3>
                
                <div className="flex flex-col gap-3">
                  {[
                    { id: 'see', icon: Eye, label: 'See', val: desiredSee, setter: setDesiredSee, color: 'bg-blue-100', ph: 'What should catch their eye?' },
                    { id: 'think', icon: Brain, label: 'Think', val: desiredThink, setter: setDesiredThink, color: 'bg-purple-100', ph: 'What should they believe about us?' },
                    { id: 'do', icon: Hand, label: 'Do', val: desiredDo, setter: setDesiredDo, color: 'bg-green-100', ph: 'What exact action should they take?' },
                    { id: 'feel', icon: Heart, label: 'Feel', val: desiredFeel, setter: setDesiredFeel, color: 'bg-pink-100', ph: 'What emotion should linger?' },
                    { id: 'whisper', icon: MessageCircle, label: 'Whisper', val: desiredWhisper, setter: setDesiredWhisper, color: 'bg-yellow-100', ph: 'What will they tell their friends?' },
                  ].map((row, i) => (
                    <div key={row.id} className={cn("flex items-stretch border-[2px] border-black rounded-[4px] overflow-hidden focus-within:shadow-[4px_4px_0px_0px_#000] transition-shadow", row.color)}>
                      <div className="w-24 bg-black text-white flex flex-col items-center justify-center py-2 border-r-[2px] border-black shrink-0">
                        <row.icon className="w-5 h-5 mb-1" />
                        <span className="font-['Archivo_Black'] uppercase text-xs tracking-wider">{row.label}</span>
                      </div>
                      <input 
                        className="flex-1 bg-transparent px-4 py-3 outline-none font-bold text-sm"
                        placeholder={row.ph}
                        value={row.val}
                        onChange={(e) => row.setter(e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Side - Sticky Persona Card (35%) */}
        <div className="xl:col-span-4 lg:sticky lg:top-8 flex flex-col gap-4 mt-8 xl:mt-0">
          <div className="bg-black border-[2px] border-black rounded-[4px] shadow-[8px_8px_0px_0px_#FFDE00] flex flex-col relative overflow-hidden text-white">
            
            {/* Header */}
            <div className="p-5 border-b-[2px] border-white/20 flex items-center justify-between bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
              <h3 className="font-['Archivo_Black'] text-xl uppercase tracking-wide text-[#FFDE00]">Persona Card</h3>
              <UserCircle2 className="w-8 h-8 opacity-50" />
            </div>

            {/* Content Body */}
            <div className="p-5 flex flex-col gap-6 min-h-[400px]">
              
              {!description && !insight ? (
                <div className="flex flex-col items-center justify-center text-center h-full gap-4 opacity-50 my-auto py-10">
                  <Search className="w-10 h-10 mb-2" />
                  <p className="font-bold text-sm">Start typing on the left canvas to build your consumer persona profile.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                  
                  {/* Desc */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-['Archivo_Black'] text-gray-400 uppercase tracking-widest">Target Core</span>
                    <p className="font-bold text-sm leading-relaxed text-[#00E5FF]">
                      {description || "..."}
                    </p>
                  </div>

                  {/* Needs */}
                  {(funcNeeds.length > 0 || emoNeeds.length > 0) && (
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-['Archivo_Black'] text-gray-400 uppercase tracking-widest">Needs</span>
                      <div className="flex flex-wrap gap-1.5">
                        {funcNeeds.map(n => <span key={n} className="text-[10px] font-bold bg-white text-black px-2 py-0.5 rounded-[2px] uppercase">{n}</span>)}
                        {emoNeeds.map(n => <span key={n} className="text-[10px] font-bold bg-[#FF80FF] text-black px-2 py-0.5 rounded-[2px] uppercase">{n}</span>)}
                      </div>
                    </div>
                  )}

                  {/* Enemy & Insight */}
                  <div className="flex flex-col gap-3 p-4 border-[2px] border-[#FF5C00] bg-[#FF5C00]/10 rounded-[4px]">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-['Archivo_Black'] text-[#FF5C00] uppercase tracking-widest">The Enemy</span>
                      <p className="font-bold text-sm leading-snug">{enemy || "..."}</p>
                    </div>
                    <div className="flex flex-col gap-1 pt-2 border-t-[1px] border-dashed border-[#FF5C00]/50">
                      <span className="text-[10px] font-['Archivo_Black'] text-[#FFDE00] uppercase tracking-widest">Core Insight</span>
                      <p className="font-bold text-sm italic leading-snug">"I {insight || "..."}"</p>
                    </div>
                  </div>

                  {/* Desired Output */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-['Archivo_Black'] text-gray-400 uppercase tracking-widest">Desired Shift</span>
                    <div className="flex flex-col gap-1.5 border-l-[2px] border-[#4ADE80] pl-3">
                      {desiredSee && <p className="text-xs"><span className="font-bold text-[#4ADE80]">See:</span> {desiredSee}</p>}
                      {desiredThink && <p className="text-xs"><span className="font-bold text-[#4ADE80]">Think:</span> {desiredThink}</p>}
                      {desiredDo && <p className="text-xs"><span className="font-bold text-[#4ADE80]">Do:</span> {desiredDo}</p>}
                      {desiredFeel && <p className="text-xs"><span className="font-bold text-[#4ADE80]">Feel:</span> {desiredFeel}</p>}
                      {desiredWhisper && <p className="text-xs"><span className="font-bold text-[#4ADE80]">Whisper:</span> {desiredWhisper}</p>}
                    </div>
                  </div>

                </div>
              )}
              
            </div>

            <div className="p-4 bg-white/10 mt-auto flex justify-between items-center text-xs font-bold border-t-[2px] border-white/20">
              <span className="uppercase tracking-wider">Status</span>
              {isFormComplete ? (
                <span className="text-[#4ADE80] flex items-center gap-1"><Check className="w-3 h-3" /> Ready for Brand Plan</span>
              ) : (
                <span className="text-[#FF5C00]">Drafting...</span>
              )}
            </div>
            
          </div>

          <Link to="/planning/brand-plan" className={cn("transition-opacity", !isFormComplete && "opacity-50 pointer-events-none")}>
            <NeoButton color="pink" className="w-full flex justify-center gap-2 mt-2 !py-4 text-base">
              Continue to Brand Plan <ChevronRight className="w-5 h-5" />
            </NeoButton>
          </Link>
        </div>

      </div>
    </div>
  );
}
