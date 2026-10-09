'use client';

import React, { useState } from 'react';
import { Eye, Info, Sparkles } from 'lucide-react';

interface ModuleSchematicProps {
  moduleId: string;
  moduleTitle: string;
}

export function ModuleSchematic({ moduleId }: ModuleSchematicProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const renderSchematic = () => {
    switch (moduleId) {
      case '1.1': // Blast Tuyere & Charcoal Furnace
        return (
          <div className="relative w-full h-60 bg-slate-50/80 rounded-xl border border-slate-200/90 p-3.5 flex flex-col justify-between overflow-hidden shadow-2xs font-sans">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-amber-800 font-bold">SCHEMATIC 1.1: High-Temperature Blast Furnace</span>
              <span className="text-[11px] text-slate-500">Refractory Core</span>
            </div>
            
            <div className="relative flex-1 flex items-center justify-center my-1">
              <svg viewBox="0 0 400 180" className="w-full h-full max-h-44">
                {/* Furnace Chimney Wall */}
                <path d="M 120 160 L 140 20 L 260 20 L 280 160 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="2.5" />
                {/* Refractory Inner Lining */}
                <path d="M 140 160 L 155 30 L 245 30 L 260 160 Z" fill="#f8fafc" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />
                
                {/* Fuel & Ore Stack */}
                <rect x="160" y="40" width="80" height="40" fill="#cbd5e1" rx="4" />
                <text x="200" y="63" fill="#334155" fontSize="9" textAnchor="middle" fontWeight="bold">Charcoal + Iron Ore</text>
                
                {/* Combustion Core (Hot) */}
                <circle cx="200" cy="115" r="32" fill="url(#fireGradient)" opacity="0.9" className="animate-pulse" />
                <text x="200" y="118" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">1,250°C Core</text>

                {/* Tuyere Nozzle Left */}
                <rect x="80" y="110" width="70" height="10" fill="#d97706" rx="2" stroke="#b45309" strokeWidth="1.5" />
                <path d="M 150 110 L 165 115 L 150 120 Z" fill="#b45309" />
                <text x="95" y="102" fill="#b45309" fontSize="8" fontWeight="bold">Clay Tuyère</text>

                {/* Forced Air Arrows */}
                <path d="M 50 115 L 75 115" stroke="#0284c7" strokeWidth="3" strokeDasharray="4 2" />
                <text x="50" y="105" fill="#0284c7" fontSize="8" fontWeight="bold">Blast Air</text>

                {/* Molten Bloom Basin */}
                <ellipse cx="200" cy="155" rx="35" ry="8" fill="#f97316" />
                <text x="200" y="158" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">Iron Bloom</text>

                <defs>
                  <radialGradient id="fireGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="40%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#b45309" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            <div className="text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
              <span><strong>Principle:</strong> Blast air injected via clay tuyère converts pure carbon into CO at 1,250°C, precipitating iron bloom.</span>
            </div>
          </div>
        );

      case '2.1': // Whitworth Three-Plate Scraping
        return (
          <div className="relative w-full h-60 bg-slate-50/80 rounded-xl border border-slate-200/90 p-3.5 flex flex-col justify-between overflow-hidden shadow-2xs font-sans">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-emerald-800 font-bold">SCHEMATIC 2.1: The Three-Plate Flatness Cascade</span>
              <span className="text-[11px] text-slate-500">Mutual Curvature Cancellation</span>
            </div>

            <div className="relative flex-1 flex items-center justify-center my-1">
              <svg viewBox="0 0 420 180" className="w-full h-full max-h-44">
                {/* 2-Plate Trap (Concave vs Convex) */}
                <g transform="translate(10, 15)">
                  <rect x="0" y="0" width="120" height="135" fill="#ffffff" rx="8" stroke="#cbd5e1" strokeWidth="1.5" />
                  <text x="60" y="20" fill="#e11d48" fontSize="9" textAnchor="middle" fontWeight="bold">2-Plate Trap</text>
                  
                  {/* Plate A concave */}
                  <path d="M 20 50 Q 60 65 100 50 L 100 65 Q 60 80 20 65 Z" fill="#bae6fd" opacity="0.9" />
                  <text x="60" y="60" fill="#0369a1" fontSize="8" textAnchor="middle" fontWeight="bold">Plate A (Concave)</text>
                  
                  {/* Plate B convex */}
                  <path d="M 20 70 Q 60 85 100 70 L 100 85 Q 60 100 20 85 Z" fill="#fef08a" opacity="0.9" />
                  <text x="60" y="80" fill="#854d0e" fontSize="8" textAnchor="middle" fontWeight="bold">Plate B (Convex)</text>

                  <text x="60" y="115" fill="#e11d48" fontSize="8" textAnchor="middle">Fit snugly, but</text>
                  <text x="60" y="127" fill="#e11d48" fontSize="8" textAnchor="middle" fontWeight="bold">NEITHER is flat!</text>
                </g>

                {/* Arrow */}
                <path d="M 145 80 L 175 80" stroke="#059669" strokeWidth="2.5" strokeDasharray="3 3" />

                {/* 3-Plate Solution */}
                <g transform="translate(190, 15)">
                  <rect x="0" y="0" width="220" height="135" fill="#ffffff" rx="8" stroke="#059669" strokeWidth="1.5" />
                  <text x="110" y="20" fill="#065f46" fontSize="9" textAnchor="middle" fontWeight="bold">Whitworth 3-Plate Solution (A &harr; B &harr; C)</text>

                  {/* 3 Perfect Flat Bars */}
                  <rect x="30" y="40" width="160" height="12" fill="#d1fae5" rx="2" stroke="#059669" strokeWidth="1" />
                  <text x="110" y="49" fill="#065f46" fontSize="8" textAnchor="middle" fontWeight="bold">Plate A: True Flat Plane</text>

                  <rect x="30" y="60" width="160" height="12" fill="#d1fae5" rx="2" stroke="#059669" strokeWidth="1" />
                  <text x="110" y="69" fill="#065f46" fontSize="8" textAnchor="middle" fontWeight="bold">Plate B: True Flat Plane</text>

                  <rect x="30" y="80" width="160" height="12" fill="#d1fae5" rx="2" stroke="#059669" strokeWidth="1" />
                  <text x="110" y="89" fill="#065f46" fontSize="8" textAnchor="middle" fontWeight="bold">Plate C: True Flat Plane</text>

                  <text x="110" y="112" fill="#047857" fontSize="8" textAnchor="middle">Prussian Blue Ink Highlights High Spots</text>
                  <text x="110" y="125" fill="#065f46" fontSize="8" textAnchor="middle" fontWeight="bold">Result: 0.0001 mm Zero Curvature</text>
                </g>
              </svg>
            </div>

            <div className="text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
              <span><strong>Whitworth Theorem:</strong> The only geometric surface that can simultaneously match three surfaces in every orientation is a plane of zero curvature.</span>
            </div>
          </div>
        );

      case '3.3': // Regenerative Telegraph Relay
      case '3.1':
      case '3.2':
        return (
          <div className="relative w-full h-60 bg-slate-50/80 rounded-xl border border-slate-200/90 p-3.5 flex flex-col justify-between overflow-hidden shadow-2xs font-sans">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-sky-800 font-bold">SCHEMATIC 3.3: Regenerative Telegraph Relay</span>
              <span className="text-[11px] text-slate-500">The Birth of the Digital Bit</span>
            </div>

            <div className="relative flex-1 flex items-center justify-center my-1">
              <svg viewBox="0 0 400 180" className="w-full h-full max-h-44">
                {/* Weak input circuit */}
                <rect x="20" y="60" width="70" height="50" fill="#f1f5f9" rx="6" stroke="#0284c7" strokeWidth="1.5" />
                <text x="55" y="80" fill="#0369a1" fontSize="8" textAnchor="middle" fontWeight="bold">Long Line</text>
                <text x="55" y="95" fill="#64748b" fontSize="8" textAnchor="middle">100km wire</text>

                {/* Electromagnet Coil */}
                <rect x="130" y="65" width="50" height="40" fill="#e2e8f0" rx="4" stroke="#d97706" strokeWidth="2" />
                <path d="M 140 65 L 140 105 M 150 65 L 150 105 M 160 65 L 160 105 M 170 65 L 170 105" stroke="#d97706" strokeWidth="2.5" />
                <text x="155" y="55" fill="#b45309" fontSize="8" textAnchor="middle" fontWeight="bold">Electromagnet</text>

                {/* Armature Spring Switch */}
                <line x1="195" y1="50" x2="195" y2="120" stroke="#475569" strokeWidth="4" />
                <circle cx="195" cy="120" r="5" fill="#ef4444" />
                <path d="M 195 50 Q 215 45 230 50" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2 2" />
                <text x="215" y="40" fill="#64748b" fontSize="8">Return Spring</text>

                {/* Fresh Battery & Local Loop */}
                <rect x="260" y="60" width="110" height="50" fill="#ecfdf5" rx="6" stroke="#059669" strokeWidth="1.5" />
                <text x="315" y="80" fill="#065f46" fontSize="8" textAnchor="middle" fontWeight="bold">Local High-Power Battery</text>
                <text x="315" y="95" fill="#047857" fontSize="8" textAnchor="middle">Clean 100% Regenerated Pulse</text>

                {/* Signal Flow Arrow */}
                <path d="M 90 85 L 130 85" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 2" />
                <path d="M 200 85 L 260 85" stroke="#059669" strokeWidth="2" />
              </svg>
            </div>

            <div className="text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
              <span><strong>Regeneration:</strong> Faint incoming current activates the electromagnet, closing a local switch connected to a fresh battery to emit a pristine digital square wave.</span>
            </div>
          </div>
        );

      case '4.1': // Vacuum Tube Triode
        return (
          <div className="relative w-full h-60 bg-slate-50/80 rounded-xl border border-slate-200/90 p-3.5 flex flex-col justify-between overflow-hidden shadow-2xs font-sans">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-indigo-800 font-bold">SCHEMATIC 4.1: Thermionic Audion Triode Valve</span>
              <span className="text-[11px] text-slate-500">Zero Mechanical Inertia</span>
            </div>

            <div className="relative flex-1 flex items-center justify-center my-1">
              <svg viewBox="0 0 400 180" className="w-full h-full max-h-44">
                {/* Glass Bulb Outline */}
                <circle cx="200" cy="90" r="70" fill="#f8fafc" stroke="#6366f1" strokeWidth="2" opacity="0.9" />
                
                {/* Hot Filament (Cathode) */}
                <path d="M 170 140 L 185 90 L 190 140" fill="none" stroke="#d97706" strokeWidth="3" className="animate-pulse" />
                <text x="160" y="155" fill="#b45309" fontSize="8" textAnchor="middle" fontWeight="bold">Hot Cathode</text>

                {/* Control Grid Mesh */}
                <line x1="200" y1="50" x2="200" y2="130" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
                <text x="200" y="40" fill="#4338ca" fontSize="8" textAnchor="middle" fontWeight="bold">Control Grid (Vg)</text>

                {/* Anode Plate */}
                <rect x="225" y="55" width="8" height="70" fill="#4f46e5" rx="2" stroke="#4338ca" strokeWidth="1" />
                <text x="245" y="95" fill="#312e81" fontSize="8" fontWeight="bold">Plate (+250V)</text>

                {/* Electrons Stream */}
                <circle cx="192" cy="75" r="2" fill="#0284c7" />
                <circle cx="195" cy="90" r="2" fill="#0284c7" />
                <circle cx="208" cy="80" r="2" fill="#0284c7" />
                <circle cx="215" cy="95" r="2" fill="#0284c7" />
                <text x="200" y="150" fill="#0284c7" fontSize="7" textAnchor="middle">e- stream</text>
              </svg>
            </div>

            <div className="text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
              <span><strong>Principle:</strong> Negative voltage on the grid mesh repels electrons boiling from the hot filament, choking plate current to zero at speed of light.</span>
            </div>
          </div>
        );

      case '5.1': // Czochralski Crystal Pulling
        return (
          <div className="relative w-full h-60 bg-slate-50/80 rounded-xl border border-slate-200/90 p-3.5 flex flex-col justify-between overflow-hidden shadow-2xs font-sans">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-teal-800 font-bold">SCHEMATIC 5.1: Czochralski Monocrystalline Puller</span>
              <span className="text-[11px] text-slate-500">9N Electronic Purity</span>
            </div>

            <div className="relative flex-1 flex items-center justify-center my-1">
              <svg viewBox="0 0 400 180" className="w-full h-full max-h-44">
                {/* Quartz Crucible Basin */}
                <path d="M 130 110 Q 130 160 200 160 Q 270 160 270 110 Z" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2.5" />
                <rect x="135" y="115" width="130" height="35" fill="#5eead4" opacity="0.8" />
                <text x="200" y="140" fill="#134e4a" fontSize="8" textAnchor="middle" fontWeight="bold">Molten Silicon (1,425°C)</text>

                {/* RF Induction Heating Coils */}
                <circle cx="115" cy="120" r="6" fill="#f97316" />
                <circle cx="115" cy="140" r="6" fill="#f97316" />
                <circle cx="285" cy="120" r="6" fill="#f97316" />
                <circle cx="285" cy="140" r="6" fill="#f97316" />
                <text x="95" y="133" fill="#ea580c" fontSize="7">RF Coils</text>

                {/* Seed Crystal & Ingot Boule */}
                <rect x="195" y="15" width="10" height="25" fill="#d97706" />
                <text x="200" y="10" fill="#d97706" fontSize="8" textAnchor="middle">Seed Pull &uarr;</text>

                {/* Cylindrical Silicon Ingot */}
                <path d="M 180 40 L 220 40 L 225 105 L 175 105 Z" fill="#14b8a6" stroke="#0f766e" strokeWidth="2" />
                <text x="200" y="75" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">200mm Boule</text>
              </svg>
            </div>

            <div className="text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
              <span><strong>Crystal Formation:</strong> A seed crystal dipped into molten silicon at 1,425°C pulls atoms into a continuous diamond-cubic lattice with zero grain defects.</span>
            </div>
          </div>
        );

      case '8.1': // Systolic Array Matrix Processing
      case '10.3':
      default:
        return (
          <div className="relative w-full h-60 bg-slate-50/80 rounded-xl border border-slate-200/90 p-3.5 flex flex-col justify-between overflow-hidden shadow-2xs font-sans">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-rose-800 font-bold">SCHEMATIC: The Closed Self-Sustaining Flywheel</span>
              <span className="text-[11px] text-slate-500">Von Neumann Universal Replicator</span>
            </div>

            <div className="relative flex-1 flex items-center justify-center my-1">
              <svg viewBox="0 0 400 180" className="w-full h-full max-h-44">
                {/* 5 Stages in circular loop */}
                <circle cx="200" cy="90" r="60" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 5" className="animate-spin origin-center" />

                {/* Node 1: Raw Ore */}
                <circle cx="200" cy="30" r="18" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                <text x="200" y="33" fill="#92400e" fontSize="7" textAnchor="middle" fontWeight="bold">Raw Earth</text>

                {/* Node 2: Refining */}
                <circle cx="260" cy="70" r="18" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
                <text x="260" y="73" fill="#065f46" fontSize="7" textAnchor="middle" fontWeight="bold">Smelters</text>

                {/* Node 3: Chip Fab */}
                <circle cx="240" cy="135" r="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
                <text x="240" y="138" fill="#075985" fontSize="7" textAnchor="middle" fontWeight="bold">Cleanroom</text>

                {/* Node 4: CNC & Servos */}
                <circle cx="160" cy="135" r="18" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
                <text x="160" y="138" fill="#5b21b6" fontSize="7" textAnchor="middle" fontWeight="bold">CNC Mill</text>

                {/* Node 5: Autonomous Robot */}
                <circle cx="140" cy="70" r="18" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" />
                <text x="140" y="73" fill="#9f1239" fontSize="7" textAnchor="middle" fontWeight="bold">New Robot!</text>

                {/* Center Core R0 */}
                <circle cx="200" cy="90" r="22" fill="#be123c" />
                <text x="200" y="93" fill="#fff" fontSize="9" textAnchor="middle" fontWeight="black">R0 &gt; 1.0</text>
              </svg>
            </div>

            <div className="text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
              <span><strong>The Closed Loop:</strong> The machine extracts stone, refines elements, fabricates microchips, and constructs duplicates of itself with zero human or external assistance.</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-1.5 font-sans">
      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
        <span className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-amber-600" />
          Interactive Physical Mechanism Schematic
        </span>
      </div>
      {renderSchematic()}
    </div>
  );
}
