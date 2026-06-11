import React, { useState } from "react";
import { Link } from "react-router";
import { 
  Heart, Star, Zap, User, Users, Shield, Lightbulb, 
  ChevronRight, Lock, Unlock, Sparkles, MessageCircle, Compass, Smile, Flame
} from "lucide-react";
import { NeoButton, cn } from "../components/NeoButton";
import { Textarea, Badge, Tooltip } from "../components/UIComponents";
import { NeoInput } from "../components/NeoInput";

// --- MOCK AUTO-EXTRACTED DATA ---
const MOCK_INSIGHT = "I know I should eat healthy, but I give in to cravings and feel guilty.";
const MOCK_PROMISE = "The guilt-free snack that tastes like a real treat.";
const MOCK_RTBS = ["Baked with 100% natural ingredients", "Clinically proven to reduce sugar spikes"];

// --- CONSTANTS ---
const CULTURE_TAGS = ['Never satisfied', 'Passionate', 'Creative', 'Customer first', 'Disruptive', 'Data-driven', 'Empathetic', 'Fearless'];

const ARCHETYPES = [
  { id: 'innocent', name: 'Innocent', group: 'spiritual', color: 'bg-green-100 border-green-500', hover: 'hover:shadow-[4px_4px_0px_0px_#22C55E]', text: 'text-green-800', desc: 'Desires safety, doing things right. Optimistic and simple.', icon: Smile },
  { id: 'sage', name: 'Sage', group: 'spiritual', color: 'bg-green-100 border-green-500', hover: 'hover:shadow-[4px_4px_0px_0px_#22C55E]', text: 'text-green-800', desc: 'Seeks truth and wisdom. Analytical and intelligent.', icon: Lightbulb },
  { id: 'explorer', name: 'Explorer', group: 'spiritual', color: 'bg-green-100 border-green-500', hover: 'hover:shadow-[4px_4px_0px_0px_#22C55E]', text: 'text-green-800', desc: 'Craves freedom and discovery. Adventurous and independent.', icon: Compass },
  
  { id: 'creator', name: 'Creator', group: 'stability', color: 'bg-blue-100 border-blue-500', hover: 'hover:shadow-[4px_4px_0px_0px_#3B82F6]', text: 'text-blue-800', desc: 'Driven by imagination and innovation. Wants to build things.', icon: Sparkles },
  { id: 'ruler', name: 'Ruler', group: 'stability', color: 'bg-blue-100 border-blue-500', hover: 'hover:shadow-[4px_4px_0px_0px_#3B82F6]', text: 'text-blue-800', desc: 'Desires control and structure. Authoritative and responsible.', icon: Shield },
  { id: 'caregiver', name: 'Caregiver', group: 'stability', color: 'bg-blue-100 border-blue-500', hover: 'hover:shadow-[4px_4px_0px_0px_#3B82F6]', text: 'text-blue-800', desc: 'Motivated by compassion. Wants to protect and care for others.', icon: Heart },

  { id: 'hero', name: 'Hero', group: 'impact', color: 'bg-red-100 border-red-500', hover: 'hover:shadow-[4px_4px_0px_0px_#EF4444]', text: 'text-red-800', desc: 'Wants to prove worth through courage. Strong and competent.', icon: Star },
  { id: 'rebel', name: 'Rebel', group: 'impact', color: 'bg-red-100 border-red-500', hover: 'hover:shadow-[4px_4px_0px_0px_#EF4444]', text: 'text-red-800', desc: 'Desires revolution and disruption. Rule-breaker.', icon: Zap },
  { id: 'magician', name: 'Magician', group: 'impact', color: 'bg-red-100 border-red-500', hover: 'hover:shadow-[4px_4px_0px_0px_#EF4444]', text: 'text-red-800', desc: 'Visionary, charismatic, brings transformational knowledge. (e.g. Disney)', icon: Flame },

  { id: 'everyman', name: 'Everyman', group: 'belonging', color: 'bg-yellow-100 border-yellow-500', hover: 'hover:shadow-[4px_4px_0px_0px_#EAB308]', text: 'text-yellow-800', desc: 'Wants to belong and connect. Relatable and down-to-earth.', icon: Users },
  { id: 'jester', name: 'Jester', group: 'belonging', color: 'bg-yellow-100 border-yellow-500', hover: 'hover:shadow-[4px_4px_0px_0px_#EAB308]', text: 'text-yellow-800', desc: 'Lives in the moment. Playful, humorous, and entertaining.', icon: Smile },
  { id: 'lover', name: 'Lover', group: 'belonging', color: 'bg-yellow-100 border-yellow-500', hover: 'hover:shadow-[4px_4px_0px_0px_#EAB308]', text: 'text-yellow-800', desc: 'Seeks intimacy and connection. Passionate and sensory.', icon: Heart },
];

export function BrandIdea() {
  // Satellites
  const [products, setProducts] = useState("");
  const [cultureTags, setCultureTags] = useState<string[]>([]);
  const [cultureText, setCultureText] = useState("");
  const [consumer, setConsumer] = useState("");
  const [influencer, setInfluencer] = useState("");
  const [archetype, setArchetype] = useState<string | null>(null);

  // Center
  const [brandIdea, setBrandIdea] = useState("");

  // Output
  const [cta, setCta] = useState("");

  const isSatellitesComplete = products && cultureTags.length > 0 && cultureText && consumer && influencer && archetype;
  const isAllComplete = isSatellitesComplete && brandIdea && cta;

  const toggleCultureTag = (tag: string) => {
    setCultureTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const applyAISuggestion = () => {
    setBrandIdea("The Ultimate Guilt-Free Joyride");
  };

  return (
    <div className="flex flex-col gap-8 font-['Space_Grotesk'] max-w-[1400px] mx-auto pb-12 relative h-full">
      
      {/* Header */}
      <section className="flex flex-col gap-2">
        <h1 className="font-['Archivo_Black'] text-4xl uppercase tracking-tighter flex items-center gap-3">
          Brand Idea Blueprint
          <Badge status="success">Step 5</Badge>
        </h1>
        <p className="text-gray-600 font-bold mt-1">
          Define the heart of your brand. A Brand Idea connects your Internal Soul with your External Reputation.
        </p>
      </section>

      {/* Split Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start relative">
        
        {/* Left Canvas: Radial Mindmap (65%) */}
        <div className="xl:col-span-8 flex flex-col gap-8 bg-[#FAF9F6] border-[2px] border-black border-dashed rounded-[4px] p-6 md:p-10 relative overflow-hidden">
          
          <div className="text-center mb-4">
            <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide">Interactive Blueprint</h2>
            <p className="text-sm font-bold text-gray-500 mt-1">Complete the 5 outer satellites to unlock the Center Brand Idea.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 relative">
            
            {/* --- TOP LEFT: Products --- */}
            <div className="col-span-1 flex flex-col gap-3 relative z-10 bg-white border-[2px] border-black p-4 rounded-[4px] shadow-[4px_4px_0px_0px_#00E5FF]">
              <div className="flex items-center gap-2 border-b-[2px] border-black pb-2">
                <Badge status="warning">Internal</Badge>
                <h3 className="font-['Archivo_Black'] uppercase text-sm">Products</h3>
              </div>
              <p className="text-[10px] font-bold text-gray-500">Refine functional benefits into 1 sentence.</p>
              <Textarea 
                className="h-20 text-sm border-black focus:border-[#00E5FF]"
                placeholder="e.g., Healthy snacks that actually taste good."
                value={products} onChange={e => setProducts(e.target.value)}
              />
            </div>

            {/* --- TOP CENTER: Blank / Connection Space --- */}
            <div className="hidden md:flex items-center justify-center pointer-events-none opacity-20">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path d="M 0,100 Q 50,50 50,100" fill="none" stroke="black" strokeWidth="4" strokeDasharray="5,5" />
                <path d="M 100,100 Q 50,50 50,100" fill="none" stroke="black" strokeWidth="4" strokeDasharray="5,5" />
              </svg>
            </div>

            {/* --- TOP RIGHT: Consumer Reputation --- */}
            <div className="col-span-1 flex flex-col gap-3 relative z-10 bg-white border-[2px] border-black p-4 rounded-[4px] shadow-[4px_4px_0px_0px_#FF80FF]">
              <div className="flex items-center justify-between border-b-[2px] border-black pb-2">
                <h3 className="font-['Archivo_Black'] uppercase text-sm">Consumer Rep</h3>
                <Badge status="error">External</Badge>
              </div>
              <p className="text-[10px] font-bold text-gray-500">What will they think of you?</p>
              <Textarea 
                className="h-20 text-sm border-black focus:border-[#FF80FF]"
                placeholder="e.g., My daily treat that I don't feel bad about."
                value={consumer} onChange={e => setConsumer(e.target.value)}
              />
            </div>

            {/* --- MIDDLE LEFT: Culture --- */}
            <div className="col-span-1 flex flex-col gap-3 relative z-10 bg-white border-[2px] border-black p-4 rounded-[4px] shadow-[4px_4px_0px_0px_#4ADE80]">
              <div className="flex items-center gap-2 border-b-[2px] border-black pb-2">
                <Badge status="warning">Internal</Badge>
                <h3 className="font-['Archivo_Black'] uppercase text-sm">Culture</h3>
              </div>
              <p className="text-[10px] font-bold text-gray-500">Select rallying cry keywords:</p>
              <div className="flex flex-wrap gap-1.5">
                {CULTURE_TAGS.map(tag => (
                  <button 
                    key={tag} onClick={() => toggleCultureTag(tag)}
                    className={cn("px-2 py-0.5 text-[10px] font-bold border-[2px] border-black rounded-[2px]", cultureTags.includes(tag) ? "bg-black text-white" : "bg-white text-gray-500 hover:bg-gray-100")}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <Textarea 
                className="h-16 text-sm border-black focus:border-[#4ADE80] mt-1"
                placeholder="We are driven by..."
                value={cultureText} onChange={e => setCultureText(e.target.value)}
              />
            </div>

            {/* --- CENTER: BRAND IDEA --- */}
            <div className="col-span-1 flex flex-col items-center justify-center relative z-20">
              <div className={cn(
                "w-full bg-black text-white border-[3px] border-black p-6 flex flex-col gap-4 shadow-[8px_8px_0px_0px_#FFDE00] transition-all duration-500 rounded-full aspect-square justify-center text-center",
                !isSatellitesComplete && "opacity-50 grayscale scale-95"
              )}>
                <div className="flex flex-col items-center justify-center gap-2 h-full w-full mx-auto">
                  {!isSatellitesComplete ? (
                    <>
                      <Lock className="w-8 h-8 text-[#FFDE00] mb-2" />
                      <h3 className="font-['Archivo_Black'] text-xl uppercase leading-tight">The Brand<br/>Idea</h3>
                      <p className="text-[10px] font-bold opacity-70 max-w-[120px]">Finish the 5 satellites to unlock.</p>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-6 h-6 text-[#FFDE00]" />
                      <h3 className="font-['Archivo_Black'] text-lg uppercase leading-tight text-[#FFDE00]">The Brand Idea</h3>
                      <textarea 
                        className="w-full text-center bg-transparent border-b-[2px] border-white/20 focus:border-[#FFDE00] text-base font-bold outline-none resize-none px-2 py-1 placeholder-white/30"
                        placeholder="e.g., The Guilt-Free Joyride"
                        value={brandIdea} onChange={e => setBrandIdea(e.target.value)}
                        rows={2}
                        autoFocus
                      />
                      <button onClick={applyAISuggestion} className="text-[10px] font-bold bg-[#FFDE00] text-black px-2 py-1 rounded-[2px] hover:bg-white transition-colors uppercase flex items-center gap-1 mt-2">
                        <Sparkles className="w-3 h-3" /> AI Suggest
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* --- MIDDLE RIGHT: Influencer Reputation --- */}
            <div className="col-span-1 flex flex-col gap-3 relative z-10 bg-white border-[2px] border-black p-4 rounded-[4px] shadow-[4px_4px_0px_0px_#FF5C00]">
              <div className="flex items-center justify-between border-b-[2px] border-black pb-2">
                <h3 className="font-['Archivo_Black'] uppercase text-sm">Influencer</h3>
                <Badge status="error">External</Badge>
              </div>
              <p className="text-[10px] font-bold text-gray-500">What will experts/KOLs say about you?</p>
              <Textarea 
                className="h-20 text-sm border-black focus:border-[#FF5C00]"
                placeholder="e.g., The only brand truly innovating in healthy snacking."
                value={influencer} onChange={e => setInfluencer(e.target.value)}
              />
            </div>

          </div>

          {/* --- BOTTOM ROW: Archetype Bridge --- */}
          <div className="mt-8 border-t-[2px] border-black pt-8 relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center border-[2px] border-black shadow-[3px_3px_0px_0px_#FFDE00]">
                <User className="w-5 h-5" />
              </div>
              <h3 className="font-['Archivo_Black'] text-xl uppercase tracking-wide">Brand Archetype</h3>
              <Badge status="info">The Bridge</Badge>
            </div>
            <p className="text-sm font-bold text-center text-gray-600 mb-6 max-w-lg mx-auto">
              Select 1 primary archetype that perfectly represents your brand's personality and role in the world.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ARCHETYPES.map(arch => {
                const isSelected = archetype === arch.id;
                const isDimmed = archetype !== null && archetype !== arch.id;

                return (
                  <Tooltip key={arch.id} text={arch.desc}>
                    <div 
                      onClick={() => setArchetype(arch.id)}
                      className={cn(
                        "p-3 border-[2px] border-black rounded-[4px] cursor-pointer transition-all flex flex-col items-center text-center gap-2 bg-white",
                        isSelected ? cn(arch.color, "shadow-[4px_4px_0px_0px_#000] scale-105 border-[3px]") : cn(arch.hover, "hover:-translate-y-1"),
                        isDimmed && "opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                      )}
                    >
                      <arch.icon className={cn("w-6 h-6", isSelected ? arch.text : "text-gray-500")} />
                      <span className="font-['Archivo_Black'] uppercase text-xs tracking-wider">{arch.name}</span>
                    </div>
                  </Tooltip>
                );
              })}
            </div>
          </div>
          
          {/* Background Connectors */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
             {/* Center Cross */}
             <div className="absolute top-1/2 left-1/4 w-1/2 h-[2px] bg-black/10 -translate-y-1/2" />
             <div className="absolute left-1/2 top-1/4 w-[2px] h-1/2 bg-black/10 -translate-x-1/2" />
          </div>
        </div>

        {/* Right Canvas: Concept Card Preview (35%) */}
        <div className="xl:col-span-4 lg:sticky lg:top-8 flex flex-col gap-4 mt-8 xl:mt-0">
          <div className="bg-black border-[2px] border-black rounded-[4px] shadow-[8px_8px_0px_0px_#00E5FF] flex flex-col relative text-white">
            
            {/* Header */}
            <div className="p-5 border-b-[2px] border-white/20 bg-[#00E5FF] text-black">
              <div className="flex items-center justify-between">
                <h3 className="font-['Archivo_Black'] text-xl uppercase tracking-wide">Brand Concept</h3>
                <Star className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold mt-1 opacity-80">Auto-assembled Pitch Card</p>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col gap-6 min-h-[400px] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
              
              {!brandIdea ? (
                <div className="flex flex-col items-center justify-center text-center h-full gap-4 opacity-50 my-auto py-10">
                  <MessageCircle className="w-10 h-10 mb-2" />
                  <p className="font-bold text-sm">Unlock and fill in the Brand Idea to generate your Concept Card.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                  
                  {/* Headline */}
                  <div className="flex flex-col gap-1 border-b-[2px] border-white/20 pb-4">
                    <span className="text-[10px] font-['Archivo_Black'] text-[#FFDE00] uppercase tracking-widest">Headline (Brand Idea)</span>
                    <h2 className="font-['Archivo_Black'] text-2xl text-[#00E5FF] leading-tight uppercase">
                      {brandIdea}
                    </h2>
                  </div>

                  {/* Insight */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-['Archivo_Black'] text-gray-400 uppercase tracking-widest flex justify-between">
                      Consumer Insight <span>(From Step 3)</span>
                    </span>
                    <p className="font-bold text-sm italic text-gray-300 border-l-[2px] border-[#FF5C00] pl-3">
                      "{MOCK_INSIGHT}"
                    </p>
                  </div>

                  {/* Promise */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-['Archivo_Black'] text-gray-400 uppercase tracking-widest flex justify-between">
                      The Promise <span>(From Step 4)</span>
                    </span>
                    <p className="font-bold text-sm text-white bg-white/10 p-2 rounded-[2px] border-[1px] border-white/20">
                      {MOCK_PROMISE}
                    </p>
                  </div>

                  {/* RTB */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-['Archivo_Black'] text-gray-400 uppercase tracking-widest flex justify-between">
                      Support Points <span>(From Step 4)</span>
                    </span>
                    <ul className="list-disc pl-5 flex flex-col gap-1">
                      {MOCK_RTBS.map((rtb, i) => (
                        <li key={i} className="text-xs font-bold text-gray-300">{rtb}</li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Input */}
                  <div className="flex flex-col gap-2 mt-2 pt-4 border-t-[2px] border-white/20">
                    <span className="text-[10px] font-['Archivo_Black'] text-[#4ADE80] uppercase tracking-widest">Call to Action</span>
                    <NeoInput 
                      className="bg-white/10 border-white/30 text-white placeholder-white/30 focus:border-[#4ADE80]" 
                      placeholder="e.g., Try Gray's Cookies today..."
                      value={cta} onChange={e => setCta(e.target.value)}
                    />
                  </div>

                </div>
              )}
            </div>
            
          </div>

          <Link to="/planning/brand-plan" className={cn("transition-opacity", !isAllComplete && "opacity-50 pointer-events-none")}>
            <NeoButton color="pink" className="w-full flex justify-center gap-2 mt-2 !py-4 text-base">
              Finish Planning <ChevronRight className="w-5 h-5" />
            </NeoButton>
          </Link>
        </div>

      </div>
    </div>
  );
}
