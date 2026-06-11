import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Target, Zap, Hand, CheckCircle, 
  Lightbulb, Info, Move, GripHorizontal, ChevronRight, 
  Settings, Award, Smile, ShieldAlert,
  ThumbsUp, Frown, AlertTriangle, HelpCircle
} from "lucide-react";
import { NeoButton, cn } from "../components/NeoButton";
import { Textarea, Badge } from "../components/UIComponents";
import { NeoInput } from "../components/NeoInput";

// --- DATA ---

const FUNC_BENEFITS = ['Simplifies your life', 'Saves time', 'Helps your family', 'Works better', 'Gets you noticed', 'Saves money', 'Reduces stress', 'Improves health'];
const EMO_BENEFITS = ['Sense of optimism', 'Feel free', 'Get noticed', 'Stay in control', 'Feel myself', 'Feel comfortable', 'Feel liked', 'Knowledge', 'Belonging'];
const SUPPORT_TYPES = ['Process support', 'Product claims', 'Third-person endorsement', 'Behavioral results'];

// --- DRAG AND DROP COMPONENTS ---

type CardData = {
  id: string;
  text: string;
  type: 'func' | 'emo';
  zone: string | null;
};

const BenefitCard = ({ card, onDrop }: { card: CardData, onDrop?: (id: string, zoneId: string | null) => void }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BENEFIT_CARD',
    item: { id: card.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div 
      ref={drag as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        "px-3 py-2 border-[2px] border-black rounded-[2px] font-bold text-xs flex items-center gap-2 cursor-grab active:cursor-grabbing hover:shadow-[2px_2px_0px_0px_#000] transition-all",
        card.type === 'func' ? "bg-[#00E5FF] text-black" : "bg-[#FF80FF] text-black",
        isDragging ? "opacity-50" : "opacity-100"
      )}
    >
      <GripHorizontal className="w-3 h-3 opacity-50" />
      {card.text}
    </div>
  );
};

const DropZone = ({ 
  zoneId, 
  title, 
  desc, 
  colorClass, 
  icon: Icon,
  cards, 
  onDrop 
}: { 
  zoneId: string, 
  title: string, 
  desc: string,
  colorClass: string,
  icon: any,
  cards: CardData[], 
  onDrop: (id: string, zoneId: string | null) => void 
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'BENEFIT_CARD',
    drop: (item: { id: string }) => onDrop(item.id, zoneId),
    collect: (monitor) => ({ isOver: monitor.isOver() })
  }));

  return (
    <div 
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        "relative flex flex-col p-4 border-[2px] border-black rounded-[4px] transition-colors min-h-[160px]",
        colorClass,
        isOver && "border-dashed border-[3px] scale-[1.02]"
      )}
    >
      <div className="flex items-center gap-2 mb-2 border-b-[2px] border-black/20 pb-2">
        <Icon className="w-5 h-5 opacity-70" />
        <h4 className="font-['Archivo_Black'] uppercase text-sm">{title}</h4>
      </div>
      <p className="text-[10px] font-bold opacity-70 mb-3">{desc}</p>
      
      <div className="flex flex-wrap gap-2 content-start flex-1 bg-white/50 p-2 rounded-[2px] border-[1px] border-black/20 shadow-inner">
        {cards.map(card => <BenefitCard key={card.id} card={card} onDrop={onDrop} />)}
        {cards.length === 0 && <span className="text-xs font-bold opacity-40 m-auto text-center w-full">Drop cards here</span>}
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

export function BrandPositioning() {
  const [productFeatures, setProductFeatures] = useState("");
  const [funcBenefits, setFuncBenefits] = useState<string[]>([]);
  const [emoBenefits, setEmoBenefits] = useState<string[]>([]);

  const [cards, setCards] = useState<CardData[]>([]);

  const [rtb1Type, setRtb1Type] = useState(SUPPORT_TYPES[0]);
  const [rtb1Text, setRtb1Text] = useState("");
  const [rtb2Type, setRtb2Type] = useState(SUPPORT_TYPES[1]);
  const [rtb2Text, setRtb2Text] = useState("");

  const [targetAudience, setTargetAudience] = useState("");
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");

  // Sync selected benefits to cards state
  useEffect(() => {
    const selectedFunc = funcBenefits.map(text => ({ id: `func-${text}`, text, type: 'func' as const }));
    const selectedEmo = emoBenefits.map(text => ({ id: `emo-${text}`, text, type: 'emo' as const }));
    const allSelected = [...selectedFunc, ...selectedEmo];

    setCards(prev => {
      // Keep existing cards (to preserve their zone assignment)
      const next = allSelected.map(s => {
        const existing = prev.find(p => p.id === s.id);
        return existing ? existing : { ...s, zone: null };
      });
      return next;
    });
  }, [funcBenefits, emoBenefits]);

  const handleDrop = (id: string, zoneId: string | null) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, zone: zoneId } : c));
  };

  const toggleFunc = (text: string) => {
    setFuncBenefits(prev => prev.includes(text) ? prev.filter(t => t !== text) : [...prev, text]);
  };

  const toggleEmo = (text: string) => {
    setEmoBenefits(prev => prev.includes(text) ? prev.filter(t => t !== text) : [...prev, text]);
  };

  const winningCards = cards.filter(c => c.zone === 'winning');
  const mainBenefit = winningCards.length > 0 ? winningCards.map(c => c.text).join(" and ") : "[Select from Winning Zone]";
  
  const isComplete = targetAudience && brandName && category && winningCards.length > 0 && rtb1Text;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-8 font-['Space_Grotesk'] max-w-7xl mx-auto pb-12 relative h-full">
        
        {/* Header */}
        <section className="flex flex-col gap-2">
          <h1 className="font-['Archivo_Black'] text-4xl uppercase tracking-tighter flex items-center gap-3">
            Brand Positioning Statement
            <Badge status="success">Step 4</Badge>
          </h1>
          <p className="text-gray-600 font-bold mt-1">
            Find the intersection between what consumers want, what we do best, and what competitors cannot do.
          </p>
        </section>

        {/* Global Inputs for Mad-Libs */}
        <div className="flex gap-4 p-4 bg-white border-[2px] border-black rounded-[4px] shadow-[4px_4px_0px_0px_#000]">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-bold uppercase">Target Audience</label>
            <NeoInput value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="e.g., Suburban working moms" className="h-10 text-sm" />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-bold uppercase">Brand Name</label>
            <NeoInput value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="e.g., Gray's Cookies" className="h-10 text-sm" />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-bold uppercase">Category</label>
            <NeoInput value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g., The healthy snack option" className="h-10 text-sm" />
          </div>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start relative">
          
          {/* Left Canvas (70%) */}
          <div className="xl:col-span-8 flex flex-col gap-12">
            
            {/* Block 1: Consumer Benefits Ladder */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b-[2px] border-black pb-2">
                <div className="w-8 h-8 bg-[#FFDE00] border-[2px] border-black rounded-[4px] shadow-[2px_2px_0px_0px_#000] flex items-center justify-center">
                  <Move className="w-5 h-5 text-black" />
                </div>
                <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide">1. Consumer Benefits Ladder</h2>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {/* Step 1 */}
                <div className="bg-white border-[2px] border-black p-4 flex flex-col gap-3 rounded-[4px] shadow-[4px_4px_0px_0px_#E5E7EB]">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-['Archivo_Black'] uppercase text-gray-400">Step 1</span>
                    <h3 className="font-bold text-sm">Product Features</h3>
                    <span className="text-xs italic text-gray-500">"What do I have?"</span>
                  </div>
                  <Textarea 
                    className="flex-1 min-h-[120px] text-sm"
                    placeholder="List the objective attributes of your product..."
                    value={productFeatures}
                    onChange={e => setProductFeatures(e.target.value)}
                  />
                </div>

                {/* Step 2 */}
                <div className="bg-[#00E5FF]/10 border-[2px] border-black p-4 flex flex-col gap-3 rounded-[4px] shadow-[4px_4px_0px_0px_#00E5FF]">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-['Archivo_Black'] uppercase text-gray-400">Step 2</span>
                    <h3 className="font-bold text-sm">Functional Benefits</h3>
                    <span className="text-xs italic text-gray-500">"So, what do I get?"</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {FUNC_BENEFITS.map(b => (
                      <button 
                        key={b} onClick={() => toggleFunc(b)}
                        className={cn("px-2 py-1 text-xs font-bold border-[2px] border-black rounded-[2px] transition-transform", funcBenefits.includes(b) ? "bg-[#00E5FF] shadow-[2px_2px_0px_0px_#000] scale-105" : "bg-white text-gray-600 hover:bg-gray-100")}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-[#FF80FF]/10 border-[2px] border-black p-4 flex flex-col gap-3 rounded-[4px] shadow-[4px_4px_0px_0px_#FF80FF]">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-['Archivo_Black'] uppercase text-gray-400">Step 3</span>
                    <h3 className="font-bold text-sm">Emotional Benefits</h3>
                    <span className="text-xs italic text-gray-500">"How does that make me feel?"</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {EMO_BENEFITS.map(b => (
                      <button 
                        key={b} onClick={() => toggleEmo(b)}
                        className={cn("px-2 py-1 text-xs font-bold border-[2px] border-black rounded-[2px] transition-transform", emoBenefits.includes(b) ? "bg-[#FF80FF] shadow-[2px_2px_0px_0px_#000] scale-105" : "bg-white text-gray-600 hover:bg-gray-100")}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: Winning Zone Matrix */}
            <div className="flex flex-col gap-4 relative">
              <div className="flex items-center gap-3 border-b-[2px] border-black pb-2">
                <div className="w-8 h-8 bg-black border-[2px] border-black rounded-[4px] shadow-[2px_2px_0px_0px_#E5E7EB] flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide">2. Winning Zone Matrix</h2>
              </div>
              <p className="text-sm font-bold text-gray-600 mb-2">Drag your selected benefits from the pool below into the matrix to find your core positioning.</p>

              {/* Unassigned Pool */}
              <div className="bg-[#FAF9F6] border-[2px] border-dashed border-black rounded-[4px] p-4 min-h-[80px] flex flex-col gap-2">
                <span className="text-xs font-['Archivo_Black'] uppercase text-gray-500">Unassigned Benefits</span>
                <div className="flex flex-wrap gap-2">
                  {cards.filter(c => !c.zone).map(card => (
                    <BenefitCard key={card.id} card={card} onDrop={handleDrop} />
                  ))}
                  {cards.length === 0 && <p className="text-xs text-gray-400 font-bold italic">Select benefits from the ladder above first.</p>}
                </div>
              </div>

              {/* 2x2 Matrix */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-2">
                <DropZone 
                  zoneId="winning" title="Winning Zone" desc="What consumers want + We do best."
                  colorClass="bg-[#4ADE80]/20 border-[#4ADE80]" icon={ThumbsUp}
                  cards={cards.filter(c => c.zone === 'winning')} onDrop={handleDrop}
                />
                <DropZone 
                  zoneId="losing" title="Losing Zone" desc="What consumers want + Competitor does better."
                  colorClass="bg-[#F87171]/20 border-[#F87171]" icon={Frown}
                  cards={cards.filter(c => c.zone === 'losing')} onDrop={handleDrop}
                />
                <DropZone 
                  zoneId="risky" title="Risky Zone" desc="Both we and competitors do it well."
                  colorClass="bg-[#FFDE00]/20 border-[#FFDE00]" icon={AlertTriangle}
                  cards={cards.filter(c => c.zone === 'risky')} onDrop={handleDrop}
                />
                <DropZone 
                  zoneId="dumb" title="Dumb Zone" desc="Nobody cares about this."
                  colorClass="bg-gray-200 border-gray-400" icon={HelpCircle}
                  cards={cards.filter(c => c.zone === 'dumb')} onDrop={handleDrop}
                />
              </div>
            </div>

            {/* Block 3: RTB */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b-[2px] border-black pb-2">
                <div className="w-8 h-8 bg-[#FF5C00] border-[2px] border-black rounded-[4px] shadow-[2px_2px_0px_0px_#000] flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide">3. Reasons To Believe (RTB)</h2>
              </div>
              <p className="text-sm font-bold text-gray-600 mb-2">Provide maximum 2 strong support points. Do not dilute your message with a long list.</p>

              <div className="flex flex-col gap-4">
                {/* RTB 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-black text-white font-['Archivo_Black'] flex items-center justify-center rounded-[2px] shrink-0 mt-1">1</div>
                  <div className="flex-1 flex flex-col gap-2">
                    <select 
                      className="w-full max-w-xs p-2 bg-white border-[2px] border-black rounded-[2px] font-bold text-sm outline-none cursor-pointer focus:shadow-[2px_2px_0px_0px_#000]"
                      value={rtb1Type} onChange={e => setRtb1Type(e.target.value)}
                    >
                      {SUPPORT_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <NeoInput 
                      value={rtb1Text} onChange={e => setRtb1Text(e.target.value)} 
                      placeholder="Enter your proof point..." 
                      className="shadow-none border-[2px] focus:shadow-[2px_2px_0px_0px_#000]"
                    />
                  </div>
                </div>

                {/* RTB 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-black text-white font-['Archivo_Black'] flex items-center justify-center rounded-[2px] shrink-0 mt-1">2</div>
                  <div className="flex-1 flex flex-col gap-2">
                    <select 
                      className="w-full max-w-xs p-2 bg-white border-[2px] border-black rounded-[2px] font-bold text-sm outline-none cursor-pointer focus:shadow-[2px_2px_0px_0px_#000]"
                      value={rtb2Type} onChange={e => setRtb2Type(e.target.value)}
                    >
                      {SUPPORT_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <NeoInput 
                      value={rtb2Text} onChange={e => setRtb2Text(e.target.value)} 
                      placeholder="Enter your proof point..." 
                      className="shadow-none border-[2px] focus:shadow-[2px_2px_0px_0px_#000]"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Canvas: Positioning Statement Preview (30%) */}
          <div className="xl:col-span-4 lg:sticky lg:top-8 flex flex-col gap-4 mt-8 xl:mt-0">
            <div className="bg-white border-[2px] border-black rounded-[4px] shadow-[8px_8px_0px_0px_#000] p-6 flex flex-col relative">
              
              <div className="flex items-center gap-3 border-b-[2px] border-black pb-4 mb-6">
                <Lightbulb className="w-6 h-6 text-[#FF5C00]" />
                <h3 className="font-['Archivo_Black'] text-xl uppercase tracking-wide leading-tight">Positioning<br/>Statement</h3>
              </div>

              <div className="flex flex-col gap-6 text-base leading-relaxed text-black/80 font-medium">
                <div>
                  <span className="font-bold">To </span>
                  <span className={cn("font-bold", targetAudience ? "text-black border-b-[2px] border-[#00E5FF]" : "text-gray-400 italic border-b-[2px] border-gray-300")}>
                    {targetAudience || "[Target Audience]"}
                  </span>,
                </div>

                <div>
                  <span className={cn("font-bold", brandName ? "text-black border-b-[2px] border-[#FFDE00]" : "text-gray-400 italic border-b-[2px] border-gray-300")}>
                    {brandName || "[Brand Name]"}
                  </span>
                  <span className="font-bold"> is the </span>
                  <span className={cn("font-bold", category ? "text-black border-b-[2px] border-[#FFDE00]" : "text-gray-400 italic border-b-[2px] border-gray-300")}>
                    {category || "[Category]"}
                  </span>
                </div>

                <div>
                  <span className="font-bold">That is the </span>
                  <span className={cn("font-bold", winningCards.length > 0 ? "text-[#4ADE80] border-b-[2px] border-[#4ADE80]" : "text-gray-400 italic border-b-[2px] border-gray-300")}>
                    {winningCards.length > 0 ? mainBenefit : "[Main Benefit]"}
                  </span>.
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-bold">That's because:</span>
                  <ul className="list-none pl-0 flex flex-col gap-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF5C00] font-bold shrink-0 mt-0.5">•</span>
                      <span className={cn("font-bold", rtb1Text ? "text-black" : "text-gray-400 italic")}>
                        {rtb1Text || `[${rtb1Type}]`}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF5C00] font-bold shrink-0 mt-0.5">•</span>
                      <span className={cn("font-bold", rtb2Text ? "text-black" : "text-gray-400 italic")}>
                        {rtb2Text || `[${rtb2Type}]`}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-[2px] border-black/10 flex flex-col gap-3">
                <NeoButton color="white" className="w-full flex justify-center gap-2">
                  Refine with AI ✨
                </NeoButton>
                <Link to="/planning/brand-plan" className={cn("transition-opacity", !isComplete && "opacity-50 pointer-events-none")}>
                  <NeoButton color="pink" className="w-full flex justify-center gap-2">
                    Save to Brand Plan <ChevronRight className="w-4 h-4" />
                  </NeoButton>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </DndProvider>
  );
}
