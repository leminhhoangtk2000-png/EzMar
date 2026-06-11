import React from "react";
import { cn } from "./NeoButton";

export function ColorSwatch({ color, name, hex }: { color: string; name: string; hex: string }) {
  return (
    <div className="flex flex-col gap-3 group">
      <div
        className={cn(
          "w-full aspect-square border-[1.5px] border-black rounded-[4px] shadow-[6px_6px_0px_0px_#000] cursor-pointer transition-all duration-300",
          "group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[8px_8px_0px_0px_#000]"
        )}
        style={{ backgroundColor: color }}
      >
        <div className="h-full flex items-end justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/80 backdrop-blur-sm px-2 py-1 rounded-sm border border-black shadow-[2px_2px_0px_0px_#000]">
            {hex}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wide">{name}</span>
        <span className="font-mono text-xs text-gray-500">{hex}</span>
      </div>
    </div>
  );
}

export function TypographyExample() {
  return (
    <div className="flex flex-col gap-6 bg-white p-6 border-[1.5px] border-black rounded-[4px] shadow-[6px_6px_0px_0px_#FF80FF]">
      <div className="border-b-[1.5px] border-black pb-4">
        <h1 className="font-['Archivo_Black'] text-5xl uppercase tracking-tight text-black leading-none mb-2">Heading 1</h1>
        <p className="font-mono text-xs text-gray-500">Archivo Black / 48px</p>
      </div>

      <div className="border-b-[1.5px] border-black pb-4">
        <h2 className="font-['Archivo_Black'] text-4xl uppercase tracking-tight text-black leading-none mb-2">Heading 2</h2>
        <p className="font-mono text-xs text-gray-500">Archivo Black / 36px</p>
      </div>

      <div className="border-b-[1.5px] border-black pb-4">
        <h3 className="font-['Archivo_Black'] text-3xl uppercase text-black leading-snug mb-2">Heading 3</h3>
        <p className="font-mono text-xs text-gray-500">Archivo Black / 30px</p>
      </div>

      <div className="border-b-[1.5px] border-black pb-4">
        <h4 className="font-['Space_Grotesk'] font-bold text-2xl text-black leading-snug mb-2">Heading 4</h4>
        <p className="font-mono text-xs text-gray-500">Space Grotesk / Bold / 24px</p>
      </div>

      <div className="border-b-[1.5px] border-black pb-4">
        <h5 className="font-['Space_Grotesk'] font-bold text-xl text-black leading-snug mb-2">Heading 5</h5>
        <p className="font-mono text-xs text-gray-500">Space Grotesk / Bold / 20px</p>
      </div>

      <div className="border-b-[1.5px] border-black pb-4">
        <h6 className="font-['Space_Grotesk'] font-bold text-lg text-black leading-snug mb-2 uppercase tracking-wide">Heading 6</h6>
        <p className="font-mono text-xs text-gray-500">Space Grotesk / Bold / 18px</p>
      </div>

      <div className="border-b-[1.5px] border-black pb-4">
        <p className="font-['Space_Grotesk'] text-base text-gray-800 leading-relaxed mb-2">
          Body Text: This is the primary body text. It utilizes Space Grotesk, offering excellent legibility while maintaining the quirky, geometric structure essential to our Pop-Art brutalist identity.
        </p>
        <p className="font-mono text-xs text-gray-500">Space Grotesk / Regular / 16px</p>
      </div>

      <div>
        <p className="font-['Space_Grotesk'] text-sm text-gray-600 mb-2">Caption: For smaller supplementary text and helper descriptions.</p>
        <p className="font-mono text-xs text-gray-500">Space Grotesk / Regular / 14px</p>
      </div>
    </div>
  );
}
