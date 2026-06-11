import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { cn } from "./NeoButton";

const data = [
  { name: "Mon", visitors: 400, conversions: 240 },
  { name: "Tue", visitors: 300, conversions: 139 },
  { name: "Wed", visitors: 520, conversions: 380 },
  { name: "Thu", visitors: 278, conversions: 190 },
  { name: "Fri", visitors: 189, conversions: 48 },
  { name: "Sat", visitors: 239, conversions: 380 },
  { name: "Sun", visitors: 349, conversions: 430 },
];

export interface MetricWidgetProps {
  title: string;
  value: string;
  trend: string;
  dataKey: string;
  color?: "orange" | "pink" | "yellow";
  className?: string;
}

export function MetricWidget({ title, value, trend, dataKey, color = "orange", className }: MetricWidgetProps) {
  const colorMap = {
    orange: "#FF5C00",
    pink: "#FF80FF",
    yellow: "#FFDE00",
  };

  const shadowMap = {
    orange: "shadow-[6px_6px_0px_0px_#FF5C00]",
    pink: "shadow-[6px_6px_0px_0px_#FF80FF]",
    yellow: "shadow-[6px_6px_0px_0px_#FFDE00]",
  };

  const isPositive = trend.startsWith("+");

  return (
    <div
      className={cn(
        "flex flex-col bg-white border-[1.5px] border-black rounded-[4px] overflow-hidden",
        shadowMap[color],
        "transition-transform duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_var(--tw-shadow-color)]",
        className
      )}
      style={{ "--tw-shadow-color": colorMap[color] } as React.CSSProperties}
    >
      <div className="p-5 border-b-[1.5px] border-black flex items-end justify-between font-['Space_Grotesk'] bg-[#FAF9F6]">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{title}</span>
          <span className="font-['Archivo_Black'] text-4xl text-black">{value}</span>
        </div>
        <div className="flex flex-col items-end mb-1">
          <span
            className={cn(
              "px-2 py-1 text-xs font-bold border-[1.5px] border-black rounded-[4px]",
              isPositive ? "bg-[#FFDE00] text-black" : "bg-[#FF80FF] text-black" // use pink for negative, yellow for positive as per palette
            )}
          >
            {trend}
          </span>
        </div>
      </div>
      
      <div className="h-[200px] w-full p-4 relative bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} id={title.replace(/\s+/g, '-')} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {/* We want flat 2D style, so no gradients, sharp CartesianGrid */}
            <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#000" vertical={false} />
            <XAxis key="xaxis" dataKey="name" tick={{ fill: "#000", fontSize: 10, fontWeight: "bold", fontFamily: "Space Grotesk" }} tickLine={false} axisLine={false} />
            <YAxis key="yaxis" tick={{ fill: "#000", fontSize: 10, fontWeight: "bold", fontFamily: "Space Grotesk" }} tickLine={false} axisLine={false} />
            <Tooltip
              key="tooltip"
              contentStyle={{
                backgroundColor: "#fff",
                border: "1.5px solid #000",
                boxShadow: "3px 3px 0px 0px #000",
                borderRadius: "4px",
                fontFamily: "Space Grotesk",
                fontWeight: "bold",
                fontSize: "12px",
                textTransform: "uppercase"
              }}
              itemStyle={{ color: "#000" }}
            />
            {/* Flat area fill with strong border line for neo-brutalism */}
            <Area
              key="area"
              type="step" // Step or linear, step is more brutalist
              dataKey={dataKey}
              stroke="#000"
              strokeWidth={3}
              fill={colorMap[color]}
              fillOpacity={1}
              isAnimationActive={false}
              activeDot={{ r: 6, fill: colorMap[color], stroke: "#000", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
