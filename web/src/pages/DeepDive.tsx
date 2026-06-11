import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { 
  Target, Filter, Users, Globe, Flag, Hexagon, Crosshair, ArrowRight, ShieldAlert, Sparkles, 
  TrendingUp, AlertTriangle, ChevronRight, CheckCircle2, AlertCircle, GripVertical, Download,
  TrendingDown, FileText, ArrowDown, ArrowUp
} from "lucide-react";
import { Badge, Textarea, SelectMenu, Tooltip } from "../components/UIComponents";
import { NeoInput } from "../components/NeoInput";
import { NeoButton, cn } from "../components/NeoButton";

// ==========================================
// 1. MARKETPLACE TAB
// ==========================================
function MarketplaceTab() {
  const [marketData, setMarketData] = useState([
    { year: '2020', sales: 100, units: 50 },
    { year: '2021', sales: 120, units: 60 },
    { year: '2022', sales: 115, units: 55 },
    { year: '2023', sales: 140, units: 70 },
    { year: '2024', sales: 160, units: 85 },
  ]);

  const [pest, setPest] = useState({
    political: { text: "New tax regulations on digital imports", type: "negative" },
    economic: { text: "Inflation reducing average order value", type: "negative" },
    social: { text: "Trend towards sustainable, eco-friendly choices", type: "positive" },
    technology: { text: "AI automation reducing customer service costs", type: "positive" },
  });

  const handlePestChange = (key: keyof typeof pest, field: string, value: string) => {
    setPest(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Trendline Chart */}
      <div className="bg-white border-[1.5px] border-black rounded-[4px] p-6 shadow-[6px_6px_0px_0px_#00E5FF] flex flex-col gap-6">
        <h3 className="font-['Archivo_Black'] text-xl uppercase tracking-wide border-b-[1.5px] border-black pb-2">Category Growth Trend</h3>
        <div className="h-72 w-full bg-[#FAF9F6] border-[1.5px] border-black rounded-[4px] p-4 shadow-[inset_3px_3px_0px_0px_rgba(0,0,0,0.05)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketData}>
              <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis key="xaxis" dataKey="year" stroke="#000" axisLine={{ strokeWidth: 1.5 }} tickLine={{ strokeWidth: 1.5 }} tick={{ fontWeight: 'bold', fontSize: 12, fontFamily: 'Space Grotesk' }} />
              <YAxis key="yaxis-left" yAxisId="left" stroke="#000" axisLine={{ strokeWidth: 1.5 }} tickLine={{ strokeWidth: 1.5 }} tick={{ fontWeight: 'bold', fontSize: 12, fontFamily: 'Space Grotesk' }} />
              <YAxis key="yaxis-right" yAxisId="right" orientation="right" stroke="#FF5C00" axisLine={{ strokeWidth: 1.5 }} tickLine={{ strokeWidth: 1.5 }} tick={{ fontWeight: 'bold', fontSize: 12, fontFamily: 'Space Grotesk' }} />
              <RechartsTooltip key="tooltip" 
                contentStyle={{ border: '1.5px solid #000', borderRadius: 4, boxShadow: '4px 4px 0px 0px #000', fontFamily: 'Space Grotesk', fontWeight: 'bold' }} 
              />
              <Line key="line-left" yAxisId="left" type="monotone" name="Sales ($M)" dataKey="sales" stroke="#000" strokeWidth={3} dot={{ stroke: '#000', strokeWidth: 2, r: 5, fill: '#00E5FF' }} activeDot={{ r: 7 }} />
              <Line key="line-right" yAxisId="right" type="monotone" name="Units (k)" dataKey="units" stroke="#FF5C00" strokeWidth={3} dot={{ stroke: '#FF5C00', strokeWidth: 2, r: 5, fill: '#fff' }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {marketData.map((d, i) => (
            <div key={d.year || i} className="flex flex-col gap-2 p-3 bg-[#FAF9F6] border-[1.5px] border-black rounded-[4px]">
              <span className="font-['Archivo_Black'] text-center border-b-[1.5px] border-black pb-1">{d.year}</span>
              <div className="flex justify-between items-center text-xs font-bold">
                <span>Sales:</span>
                <input type="number" className="w-12 border-b-[1.5px] border-black bg-transparent outline-none text-right" value={d.sales} onChange={(e) => {
                  const newData = [...marketData];
                  newData[i].sales = Number(e.target.value);
                  setMarketData(newData);
                }} />
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-[#FF5C00]">
                <span>Units:</span>
                <input type="number" className="w-12 border-b-[1.5px] border-black bg-transparent outline-none text-right" value={d.units} onChange={(e) => {
                  const newData = [...marketData];
                  newData[i].units = Number(e.target.value);
                  setMarketData(newData);
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PEST Analysis */}
      <div className="bg-white border-[1.5px] border-black rounded-[4px] p-6 shadow-[6px_6px_0px_0px_#FFDE00] flex flex-col gap-6">
        <h3 className="font-['Archivo_Black'] text-xl uppercase tracking-wide border-b-[1.5px] border-black pb-2">PEST Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(pest).map(([key, data]) => (
            <div key={key} className={cn(
              "flex flex-col gap-3 p-4 border-[1.5px] border-black rounded-[4px] shadow-[4px_4px_0px_0px_#000] transition-colors",
              data.type === 'positive' ? "bg-green-50" : "bg-red-50"
            )}>
              <div className="flex items-center justify-between">
                <h4 className="font-['Archivo_Black'] text-base uppercase">{key}</h4>
                <select 
                  className={cn("text-xs font-bold px-2 py-1 border-[1.5px] border-black rounded-[2px] outline-none cursor-pointer shadow-[2px_2px_0px_0px_#000]", 
                    data.type === 'positive' ? 'bg-[#4ADE80] text-black' : 'bg-[#F87171] text-white'
                  )}
                  value={data.type}
                  onChange={(e) => handlePestChange(key as any, 'type', e.target.value)}
                >
                  <option value="positive">Positive</option>
                  <option value="negative">Negative</option>
                </select>
              </div>
              <Textarea 
                value={data.text} 
                onChange={(e) => handlePestChange(key as any, 'text', e.target.value)} 
                rows={2} 
                className="bg-white"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. CONSUMERS TAB
// ==========================================
function ConsumersTab() {
  const [funnel, setFunnel] = useState([
    { id: 'awareness', label: 'Awareness', val: 10000, color: '#FF80FF' },
    { id: 'familiar', label: 'Familiar', val: 8000, color: '#FFDE00' },
    { id: 'consider', label: 'Consider', val: 4000, color: '#00E5FF' },
    { id: 'purchase', label: 'Purchase', val: 1500, color: '#4ADE80' },
    { id: 'repeat', label: 'Repeat', val: 500, color: '#FF5C00' },
    { id: 'loyal', label: 'Loyal', val: 200, color: '#000000', textColor: 'white' },
  ]);

  const [leakyBucket, setLeakyBucket] = useState("Consider to Purchase");

  const handleFunnelChange = (index: number, value: number) => {
    const newFunnel = [...funnel];
    newFunnel[index].val = value;
    setFunnel(newFunnel);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Left: Funnel Visualization */}
      <div className="lg:col-span-6 bg-white border-[1.5px] border-black rounded-[4px] p-6 shadow-[6px_6px_0px_0px_#FF80FF] flex flex-col gap-6">
        <h3 className="font-['Archivo_Black'] text-xl uppercase tracking-wide border-b-[1.5px] border-black pb-2 flex justify-between items-center">
          Visual Brand Funnel
          <Filter className="w-5 h-5" />
        </h3>
        
        <div className="flex flex-col gap-2 relative mt-4">
          {funnel.map((stage, i) => {
            const width = Math.max(20, (stage.val / funnel[0].val) * 100);
            const prevVal = i > 0 ? funnel[i-1].val : stage.val;
            const convRate = i > 0 ? ((stage.val / prevVal) * 100).toFixed(1) : "100";
            const isSevereDrop = i > 0 && (stage.val / prevVal) < 0.4; // less than 40% conv rate is severe
            
            return (
              <div key={stage.id} className="flex flex-col items-center group relative">
                
                {/* Conversion Arrow (between steps) */}
                {i > 0 && (
                  <div className="flex flex-col items-center my-1 z-10 relative">
                    <div className="w-[1.5px] h-4 bg-black"></div>
                    <div className={cn(
                      "absolute top-1/2 -translate-y-1/2 left-4 flex items-center gap-1 whitespace-nowrap bg-white px-2 py-0.5 border-[1.5px] rounded-[2px] text-[10px] font-bold shadow-[2px_2px_0px_0px_#000] z-20",
                      isSevereDrop ? "border-red-500 text-red-600 animate-pulse" : "border-black text-black"
                    )}>
                      <ArrowDown className="w-3 h-3" />
                      {convRate}% Conversion
                    </div>
                  </div>
                )}

                {/* Funnel Stage Bar */}
                <div className="flex items-center w-full gap-4 relative z-0">
                  <div className="w-24 text-right shrink-0">
                    <input 
                      type="number" 
                      value={stage.val} 
                      onChange={(e) => handleFunnelChange(i, Number(e.target.value))}
                      className="w-full text-right font-['Space_Grotesk'] font-bold text-sm bg-[#FAF9F6] border-[1.5px] border-black rounded-[2px] px-2 py-1 outline-none focus:shadow-[2px_2px_0px_0px_#000]"
                    />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div 
                      className="border-[1.5px] border-black rounded-[4px] p-2 text-center shadow-[4px_4px_0px_0px_#000] transition-all duration-300"
                      style={{ 
                        width: `${width}%`, 
                        backgroundColor: stage.color, 
                        color: stage.textColor || 'black' 
                      }}
                    >
                      <span className="font-['Archivo_Black'] uppercase text-sm md:text-base truncate px-2">{stage.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Data Entry */}
      <div className="lg:col-span-6 bg-white border-[1.5px] border-black rounded-[4px] p-6 shadow-[6px_6px_0px_0px_#00E5FF] flex flex-col gap-6">
        <h3 className="font-['Archivo_Black'] text-xl uppercase tracking-wide border-b-[1.5px] border-black pb-2">
          Leaky Bucket Analysis
        </h3>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 p-4 bg-[#FAF9F6] border-[1.5px] border-black border-dashed rounded-[4px]">
            <label className="text-sm font-bold uppercase tracking-wide">Where are we losing most consumers?</label>
            <SelectMenu 
              options={[
                "Awareness to Familiar (Low Reach)",
                "Familiar to Consider (Weak Value Prop)",
                "Consider to Purchase (Pricing / Friction)",
                "Purchase to Repeat (Poor Onboarding)",
                "Repeat to Loyal (Lack of Community)"
              ]} 
              value={leakyBucket}
              onChange={(v) => setLeakyBucket(v)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-red-500" />
              Primary Reason for Drop-off
            </label>
            <NeoInput placeholder="e.g., Competitor discounts are too aggressive" accentColor="pink" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-500" />
              Proposed Solution
            </label>
            <Textarea placeholder="e.g., Introduce a price-match guarantee program" rows={3} />
          </div>
        </div>
      </div>

    </div>
  );
}

// ==========================================
// 3. CHANNELS TAB
// ==========================================
function ChannelsTab() {
  const [channels, setChannels] = useState([
    { id: 1, name: 'Supermarkets', sales: 1200000, chShare: 45, brShare: 30 },
    { id: 2, name: 'Convenience Stores', sales: 400000, chShare: 20, brShare: 25 },
    { id: 3, name: 'E-Commerce', sales: 600000, chShare: 35, brShare: 15 },
  ]);

  const handleUpdate = (index: number, field: string, val: number | string) => {
    const newCh = [...channels];
    (newCh[index] as any)[field] = val;
    setChannels(newCh);
  };

  return (
    <div className="bg-white border-[1.5px] border-black rounded-[4px] shadow-[8px_8px_0px_0px_#4ADE80] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 border-b-[1.5px] border-black bg-[#FAF9F6]">
        <h3 className="font-['Archivo_Black'] text-xl uppercase tracking-wide">Customer Scorecards</h3>
        <p className="text-sm font-bold text-gray-600 mt-1">Analyze Fair Share Index (Brand Share / Channel Share) to spot distribution gaps.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-white font-['Archivo_Black'] uppercase text-sm tracking-wider">
              <th className="p-4 border-r-[1.5px] border-black/20">Channel Name</th>
              <th className="p-4 border-r-[1.5px] border-black/20">Total Sales ($)</th>
              <th className="p-4 border-r-[1.5px] border-black/20">Channel Share (%)</th>
              <th className="p-4 border-r-[1.5px] border-black/20">Brand Share (%)</th>
              <th className="p-4">Fair Share Index</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((ch, i) => {
              const index = ch.chShare > 0 ? (ch.brShare / ch.chShare).toFixed(2) : "0.00";
              const isWarning = parseFloat(index) < 1.0;

              return (
                <tr key={ch.id} className="border-b-[1.5px] border-black last:border-b-0 hover:bg-black/5 transition-colors">
                  <td className="p-4 border-r-[1.5px] border-black font-bold">
                    <input 
                      type="text" 
                      value={ch.name} 
                      onChange={(e) => handleUpdate(i, 'name', e.target.value)}
                      className="w-full bg-transparent outline-none"
                    />
                  </td>
                  <td className="p-4 border-r-[1.5px] border-black font-mono">
                    <input 
                      type="number" 
                      value={ch.sales} 
                      onChange={(e) => handleUpdate(i, 'sales', Number(e.target.value))}
                      className="w-full bg-transparent outline-none"
                    />
                  </td>
                  <td className="p-4 border-r-[1.5px] border-black font-mono">
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={ch.chShare} 
                        onChange={(e) => handleUpdate(i, 'chShare', Number(e.target.value))}
                        className="w-16 bg-transparent outline-none border-b-[1.5px] border-black/20 focus:border-black"
                      />%
                    </div>
                  </td>
                  <td className="p-4 border-r-[1.5px] border-black font-mono">
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={ch.brShare} 
                        onChange={(e) => handleUpdate(i, 'brShare', Number(e.target.value))}
                        className="w-16 bg-transparent outline-none border-b-[1.5px] border-black/20 focus:border-black"
                      />%
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={cn(
                      "inline-flex items-center justify-center px-3 py-1 font-['Archivo_Black'] text-sm rounded-[4px] border-[1.5px] border-black shadow-[2px_2px_0px_0px_#000]",
                      isWarning ? "bg-[#F87171] text-white" : "bg-[#4ADE80] text-black"
                    )}>
                      {index}
                      {isWarning && <AlertTriangle className="w-3 h-3 ml-2" />}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-[#FAF9F6] border-t-[1.5px] border-black flex justify-between items-center">
        <span className="text-xs font-bold text-gray-500">Index &lt; 1.0 indicates under-performance in that channel.</span>
        <NeoButton color="white" className="!py-1.5 text-sm">+ Add Channel</NeoButton>
      </div>
    </div>
  );
}

// ==========================================
// 4. COMPETITORS TAB
// ==========================================
function CompetitorsTab() {
  const [comps, setComps] = useState([
    { id: 'us', name: 'Our Brand', target: 'Urban Millennials', benefit: 'Time-saving convenience', price: 15.99 },
    { id: 'c1', name: 'Competitor A', target: 'Gen Z', benefit: 'Lowest absolute price', price: 11.99 },
    { id: 'c2', name: 'Competitor B', target: 'Families', benefit: 'Bulk value & Trust', price: 14.50 },
  ]);

  const handleUpdate = (index: number, field: string, val: string | number) => {
    const newC = [...comps];
    (newC[index] as any)[field] = val;
    setComps(newC);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Comparison Matrix */}
      <div className="bg-white border-[1.5px] border-black rounded-[4px] p-6 shadow-[6px_6px_0px_0px_#FF5C00] overflow-x-auto">
        <h3 className="font-['Archivo_Black'] text-xl uppercase tracking-wide border-b-[1.5px] border-black pb-2 mb-6">Comparison Matrix</h3>
        <div className="flex gap-4 min-w-[800px]">
          {comps.map((c, i) => (
            <div key={c.id} className={cn(
              "flex-1 border-[1.5px] border-black rounded-[4px] flex flex-col overflow-hidden shadow-[4px_4px_0px_0px_#000]",
              i === 0 ? "bg-[#FFDE00]" : "bg-[#FAF9F6]"
            )}>
              <div className="p-3 border-b-[1.5px] border-black bg-black text-white font-['Archivo_Black'] uppercase text-center">
                {i === 0 ? "Us" : `Competitor ${i}`}
              </div>
              <div className="p-4 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Brand Name</label>
                  <input type="text" value={c.name} onChange={(e) => handleUpdate(i, 'name', e.target.value)} className="w-full bg-white border-[1.5px] border-black rounded-[2px] px-2 py-1 text-sm font-bold outline-none" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Target Audience</label>
                  <Textarea value={c.target} onChange={(e) => handleUpdate(i, 'target', e.target.value)} rows={2} className="text-sm bg-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Main Benefit</label>
                  <Textarea value={c.benefit} onChange={(e) => handleUpdate(i, 'benefit', e.target.value)} rows={2} className="text-sm bg-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Table */}
      <div className="bg-white border-[1.5px] border-black rounded-[4px] p-6 shadow-[6px_6px_0px_0px_#00E5FF]">
        <h3 className="font-['Archivo_Black'] text-xl uppercase tracking-wide border-b-[1.5px] border-black pb-2 mb-6">Pricing Tracker</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-white font-['Archivo_Black'] uppercase text-sm tracking-wider">
              <th className="p-3 border-r-[1.5px] border-black/20">Brand</th>
              <th className="p-3 border-r-[1.5px] border-black/20">Avg Price ($)</th>
              <th className="p-3">Price Index (vs Us)</th>
            </tr>
          </thead>
          <tbody>
            {comps.map((c, i) => {
              const ourPrice = comps[0].price;
              const index = ((c.price / ourPrice) * 100).toFixed(0);
              const isUs = i === 0;

              return (
                <tr key={c.id} className="border-b-[1.5px] border-black last:border-b-0 hover:bg-black/5">
                  <td className="p-3 border-r-[1.5px] border-black font-bold">{c.name}</td>
                  <td className="p-3 border-r-[1.5px] border-black font-mono">
                    <input 
                      type="number" 
                      step="0.01"
                      value={c.price} 
                      onChange={(e) => handleUpdate(i, 'price', Number(e.target.value))}
                      className="w-20 bg-transparent outline-none border-b-[1.5px] border-black/20 focus:border-black"
                    />
                  </td>
                  <td className="p-3">
                    {isUs ? (
                      <Badge status="neutral">100 (Baseline)</Badge>
                    ) : (
                      <span className={cn(
                        "font-mono font-bold px-2 py-1 rounded-[2px] border-[1.5px] border-black shadow-[2px_2px_0px_0px_#000]",
                        Number(index) > 100 ? "bg-[#FFDE00]" : "bg-[#4ADE80]"
                      )}>
                        {index}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 5. BRAND TAB
// ==========================================
function BrandTab() {
  const [health, setHealth] = useState([
    { id: 1, metric: 'Aided Recall', score: 85, norm: 80 },
    { id: 2, metric: 'Unaided Recall', score: 40, norm: 55 },
    { id: 3, metric: 'Brand Link', score: 60, norm: 65 },
    { id: 4, metric: 'Purchase Intent', score: 45, norm: 50 },
  ]);

  const handleUpdate = (index: number, field: string, val: number) => {
    const newH = [...health];
    (newH[index] as any)[field] = val;
    setHealth(newH);
  };

  return (
    <div className="bg-white border-[1.5px] border-black rounded-[4px] p-6 shadow-[6px_6px_0px_0px_#FF80FF] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="font-['Archivo_Black'] text-xl uppercase tracking-wide border-b-[1.5px] border-black pb-2 mb-6">Brand Health Tracking</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {health.map((item, i) => {
          const diff = item.score - item.norm;
          const isPositive = diff >= 0;

          return (
            <div key={item.id} className="flex flex-col border-[1.5px] border-black rounded-[4px] overflow-hidden shadow-[4px_4px_0px_0px_#000]">
              <div className="bg-black text-white p-3 font-['Archivo_Black'] uppercase flex justify-between items-center">
                {item.metric}
                <div className={cn(
                  "text-xs px-2 py-0.5 rounded-[2px] border-[1.5px] border-black flex items-center gap-1",
                  isPositive ? "bg-[#4ADE80] text-black" : "bg-[#F87171] text-white"
                )}>
                  {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {Math.abs(diff)} pts
                </div>
              </div>
              <div className="bg-[#FAF9F6] p-4 flex justify-between items-center">
                <div className="flex flex-col gap-1 w-1/2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Our Score (%)</label>
                  <input 
                    type="number" 
                    value={item.score} 
                    onChange={(e) => handleUpdate(i, 'score', Number(e.target.value))}
                    className="w-20 font-['Archivo_Black'] text-2xl bg-transparent outline-none border-b-[2px] border-black focus:border-[#FF5C00]"
                  />
                </div>
                <div className="flex flex-col gap-1 w-1/2 border-l-[1.5px] border-dashed border-black/30 pl-4">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Industry Norm (%)</label>
                  <input 
                    type="number" 
                    value={item.norm} 
                    onChange={(e) => handleUpdate(i, 'norm', Number(e.target.value))}
                    className="w-20 font-['Space_Grotesk'] text-xl font-bold bg-transparent outline-none border-b-[1.5px] border-black/30 focus:border-black"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 6. SUMMARY OUTPUT TAB (DRAG & DROP)
// ==========================================

const DraggableSuggestion = ({ item }: { item: any }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'SUGGESTION',
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));
  
  return (
    <div 
      ref={drag as unknown as React.RefObject<HTMLDivElement>} 
      className={cn(
        "p-3 border-[1.5px] border-black rounded-[4px] text-sm font-bold cursor-grab active:cursor-grabbing bg-white shadow-[2px_2px_0px_0px_#000] hover:-translate-y-[2px] transition-transform flex gap-2 items-start",
        isDragging && "opacity-50 shadow-none translate-y-0",
        item.type === 'positive' ? "border-l-[6px] border-l-green-500" : "border-l-[6px] border-l-red-500"
      )}
    >
      <GripVertical className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
      <span className="leading-tight">{item.text}</span>
    </div>
  );
}

const DropQuadrant = ({ title, type, items, onDrop, colorClass }: { title: string, type: string, items: any[], onDrop: any, colorClass: string }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'SUGGESTION',
    drop: (item) => onDrop(item, type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  return (
    <div 
      ref={drop as unknown as React.RefObject<HTMLDivElement>} 
      className={cn(
        "flex flex-col gap-3 p-5 border-[1.5px] border-black rounded-[4px] bg-white min-h-[220px] transition-colors shadow-[4px_4px_0px_0px_#000]",
        isOver && "bg-gray-100",
        colorClass
      )}
    >
      <div className="flex items-center justify-between border-b-[1.5px] border-black pb-2 mb-2">
        <h3 className="font-['Archivo_Black'] uppercase text-lg">{title}</h3>
        <Badge status={type === 'drivers' || type === 'opportunities' ? 'success' : 'error'} className="!text-[10px]">Max 3</Badge>
      </div>
      
      {items.map(item => (
        <div key={item.id} className="p-3 border-[1.5px] border-black bg-[#FAF9F6] rounded-[2px] text-sm font-bold flex gap-2 items-start">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-black" />
          <span className="leading-tight">{item.text}</span>
        </div>
      ))}
      
      {items.length === 0 && (
        <div className="text-gray-400 text-sm font-bold italic text-center my-auto border-[1.5px] border-dashed border-gray-300 p-4 rounded-[4px]">
          Drop key factor here
        </div>
      )}
    </div>
  );
};

function SummaryTab() {
  // Mock auto-generated suggestions based on previous tabs
  const [suggestions, setSuggestions] = useState([
    { id: 's1', text: 'Inflation reducing average order value (PEST)', type: 'negative', area: 'pool' },
    { id: 's2', text: 'Trend towards sustainable choices (PEST)', type: 'positive', area: 'pool' },
    { id: 's3', text: 'Severe drop from Consider to Purchase (Funnel)', type: 'negative', area: 'pool' },
    { id: 's4', text: 'Underperforming in E-Commerce channel (Index < 1)', type: 'negative', area: 'pool' },
    { id: 's5', text: 'Strong pricing advantage vs Competitor A', type: 'positive', area: 'pool' },
    { id: 's6', text: 'Unaided recall is 15pts below industry norm', type: 'negative', area: 'pool' },
  ]);

  const handleDrop = (item: any, targetArea: string) => {
    setSuggestions(prev => prev.map(s => {
      if (s.id === item.id) {
        // Enforce max 3 per quadrant logic here if needed
        return { ...s, area: targetArea };
      }
      return s;
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Left: Auto-generated Suggestions Pool */}
      <div className="lg:col-span-4 bg-[#FAF9F6] border-[1.5px] border-black rounded-[4px] p-6 shadow-[6px_6px_0px_0px_#9CA3AF] flex flex-col gap-4 h-[calc(100vh-200px)] overflow-y-auto">
        <div className="flex items-center gap-2 border-b-[1.5px] border-black pb-4 mb-2">
          <Sparkles className="w-5 h-5 text-[#FF5C00]" />
          <h3 className="font-['Archivo_Black'] text-lg uppercase tracking-wide">AI Findings</h3>
        </div>
        <p className="text-xs font-bold text-gray-500 mb-2">Drag the most critical factors into the Strategic Matrix on the right to finalize your summary.</p>
        
        <div className="flex flex-col gap-3">
          {suggestions.filter(s => s.area === 'pool').map(s => (
            <DraggableSuggestion key={s.id} item={s} />
          ))}
        </div>
      </div>

      {/* Right: 2x2 Matrix & Export */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="flex justify-between items-center bg-black p-4 rounded-[4px] border-[1.5px] border-black shadow-[6px_6px_0px_0px_#FFDE00]">
          <h2 className="font-['Archivo_Black'] text-2xl uppercase tracking-wide text-white">Strategic Summary Matrix</h2>
          <NeoButton color="blue" className="!py-2 flex items-center gap-2" onClick={() => window.print()}>
            <Download className="w-4 h-4" /> Export Slide PDF
          </NeoButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAF9F6] p-6 rounded-[4px] border-[1.5px] border-black border-dashed">
          <DropQuadrant 
            title="Drivers (Strengths)" 
            type="drivers" 
            colorClass="shadow-[4px_4px_0px_0px_#4ADE80]"
            items={suggestions.filter(s => s.area === 'drivers')} 
            onDrop={handleDrop} 
          />
          <DropQuadrant 
            title="Opportunities" 
            type="opportunities" 
            colorClass="shadow-[4px_4px_0px_0px_#00E5FF]"
            items={suggestions.filter(s => s.area === 'opportunities')} 
            onDrop={handleDrop} 
          />
          <DropQuadrant 
            title="Inhibitors (Weaknesses)" 
            type="inhibitors" 
            colorClass="shadow-[4px_4px_0px_0px_#FF5C00]"
            items={suggestions.filter(s => s.area === 'inhibitors')} 
            onDrop={handleDrop} 
          />
          <DropQuadrant 
            title="Threats" 
            type="threats" 
            colorClass="shadow-[4px_4px_0px_0px_#F87171]"
            items={suggestions.filter(s => s.area === 'threats')} 
            onDrop={handleDrop} 
          />
        </div>

        {/* Analytical Slide Preview */}
        <div className="bg-white border-[1.5px] border-black rounded-[4px] p-6 shadow-[6px_6px_0px_0px_#2563EB] mt-4 print:block">
          <div className="flex items-center gap-2 mb-4 text-[#2563EB]">
            <FileText className="w-5 h-5" />
            <h3 className="font-['Archivo_Black'] text-lg uppercase tracking-wide">Slide Format Preview</h3>
          </div>
          <div className="border-[1.5px] border-black p-8 bg-[#FAF9F6] aspect-video flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFDE00] opacity-20 rounded-full blur-2xl -mr-10 -mt-10" />
            
            <div>
              <h1 className="font-['Archivo_Black'] text-3xl uppercase leading-tight mb-2 max-w-2xl text-black">
                Headline: Significant drop at Consideration stage signals weak value proposition.
              </h1>
              <div className="w-16 h-[4px] bg-[#FF5C00] mb-8" />
            </div>

            <div className="flex gap-8 items-center z-10">
              <div className="w-1/2 h-32 bg-white border-[1.5px] border-black rounded-[2px] flex items-center justify-center font-bold text-gray-400 border-dashed">
                [ Funnel Chart Visual Inserted Here ]
              </div>
              <div className="w-1/2 flex flex-col gap-2">
                <span className="font-['Archivo_Black'] uppercase text-sm text-[#2563EB]">Impact Recommendation:</span>
                <p className="text-sm font-bold text-gray-700 bg-white p-3 border-[1.5px] border-black shadow-[2px_2px_0px_0px_#000]">
                  Overhaul the pricing page UI and introduce a clear feature comparison table to reduce friction before purchase.
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-auto pt-4 border-t-[1.5px] border-black/10">
              <span>Deep-Dive Review / Q3 Planning</span>
              <span>Confidential</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export function DeepDive() {
  const [activeTab, setActiveTab] = useState("Marketplace");

  const tabs = [
    { id: "Marketplace", icon: Globe },
    { id: "Consumers", icon: Users },
    { id: "Channels", icon: Flag },
    { id: "Competitors", icon: Target },
    { id: "Brand", icon: Hexagon },
    { id: "Summary Output", icon: Sparkles },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Marketplace": return <MarketplaceTab />;
      case "Consumers": return <ConsumersTab />;
      case "Channels": return <ChannelsTab />;
      case "Competitors": return <CompetitorsTab />;
      case "Brand": return <BrandTab />;
      case "Summary Output": return <SummaryTab />;
      default: return null;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-8 font-['Space_Grotesk'] max-w-7xl mx-auto pb-12">
        
        {/* Header & Tabs */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-['Archivo_Black'] text-4xl uppercase tracking-tighter">
                Deep-Dive Business Review
              </h1>
              <p className="text-gray-600 font-bold mt-1">Analyze your business environment to uncover strategic opportunities.</p>
            </div>
            <NeoButton color="blue" className="!px-6 w-fit">Save Draft</NeoButton>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2 border-b-[3px] border-black hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 lg:px-6 py-3 font-bold uppercase tracking-wider border-t-[1.5px] border-l-[1.5px] border-r-[1.5px] rounded-t-[4px] transition-all whitespace-nowrap -mb-[3px]",
                  activeTab === tab.id
                    ? tab.id === "Summary Output" 
                      ? "bg-black border-black text-[#FFDE00] border-b-[3px] border-b-black z-10 shadow-[0px_-4px_0px_0px_#FFDE00]"
                      : "bg-white border-black text-black border-b-[3px] border-b-white z-10 shadow-[0px_-4px_0px_0px_#FF80FF]"
                    : "bg-[#FAF9F6] border-transparent text-gray-500 hover:text-black hover:bg-black/5 border-b-[3px] border-b-black"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.id}
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content Rendering */}
        <div className="min-h-[500px]">
          {renderTabContent()}
        </div>

      </div>
    </DndProvider>
  );
}
