'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Sliders, 
  Zap, 
  Cpu, 
  Flame, 
  RefreshCw, 
  Award,
  Share2,
  Sparkles
} from 'lucide-react';
import { SubModule } from '@/lib/curriculumData';

interface InteractiveLabViewProps {
  subModule: SubModule;
  isCompleted: boolean;
  onComplete: () => void;
  onShareWithEducator?: (activity: { type: 'module' | 'lab'; title: string; details: string }) => void;
}

export function InteractiveLabView({ 
  subModule, 
  isCompleted, 
  onComplete,
  onShareWithEducator
}: InteractiveLabViewProps) {
  const lab = subModule.interactiveLab;

  // Lab 1: air_temperature (Furnace Bellows & Insulation)
  const [bellowsPumps, setBellowsPumps] = useState(30);
  const [insulationLayers, setInsulationLayers] = useState(2);
  const [fuelType, setFuelType] = useState<'wood' | 'charcoal'>('charcoal');

  // Lab 2: whitworth_plates (3-Plate Scraping)
  const [platePair, setPlatePair] = useState<'A-B' | 'B-C' | 'C-A'>('A-B');
  const [scrapeCycles, setScrapeCycles] = useState<{ 'A-B': number; 'B-C': number; 'C-A': number }>({
    'A-B': 0,
    'B-C': 0,
    'C-A': 0
  });

  // Lab 3: dynamo_voltage (Faraday Dynamo)
  const [dynamoRpm, setDynamoRpm] = useState(900);
  const [magneticFlux, setMagneticFlux] = useState(0.6);
  const [coilTurns, setCoilTurns] = useState(350);

  // Lab 4: vacuum_grid (Triode Vacuum Valve)
  const [gridVoltage, setGridVoltage] = useState(-5.0);

  // Lab 5: czochralski_pull (Silicon Crystal Growth)
  const [heaterTemp, setHeaterTemp] = useState(1425);
  const [pullRate, setPullRate] = useState(85);

  // Lab 6: binary_bootstrap (Toggle switches)
  const [switchBits, setSwitchBits] = useState(['0', '0', '0', '0', '0', '0', '0', '0']);
  const [enteredInstructions, setEnteredInstructions] = useState<string[]>([]);

  // Lab 7: pid_control (CNC Axis Tuning)
  const [kp, setKp] = useState(15);
  const [ki, setKi] = useState(0.5);
  const [kd, setKd] = useState(0.8);

  // Lab 8: systolic_array (2x2 Matrix Flow)
  const [systolicClock, setSystolicClock] = useState(0);

  // Lab 9: mcts_explorer (Self-Play Exploration vs Exploitation)
  const [cPuct, setCPuct] = useState(1.4);
  const [mctsSimulations, setMctsSimulations] = useState(400);

  // Lab 10: self_replication (Von Neumann Factory Subsystems)
  const [solarCapacity, setSolarCapacity] = useState(80);
  const [miningOutput, setMiningOutput] = useState(85);
  const [fabYield, setFabYield] = useState(88);

  const [labPassedLocal, setLabPassedLocal] = useState(isCompleted);

  // Trigger win & celebration
  const triggerWin = () => {
    setLabPassedLocal(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // fallback
    }
    onComplete();
  };

  // Auto-Tune handler for the AI Educator feature
  const handleAutoTuneWithAda = () => {
    switch (lab.type) {
      case 'air_temperature':
        setFuelType('charcoal');
        setBellowsPumps(42);
        setInsulationLayers(3);
        break;
      case 'whitworth_plates':
        setScrapeCycles({ 'A-B': 4, 'B-C': 4, 'C-A': 4 });
        break;
      case 'dynamo_voltage':
        setDynamoRpm(1100);
        setMagneticFlux(0.65);
        setCoilTurns(350);
        break;
      case 'vacuum_grid':
        setGridVoltage(-2.5);
        break;
      case 'czochralski_pull':
        setHeaterTemp(1425);
        setPullRate(85);
        break;
      case 'binary_bootstrap':
        setEnteredInstructions(['0x01', '0x02', '0x04', '0x08']);
        break;
      case 'pid_control':
        setKp(25);
        setKi(2.0);
        setKd(1.5);
        break;
      case 'systolic_array':
        setSystolicClock(4);
        break;
      case 'mcts_explorer':
        setCPuct(1.41);
        setMctsSimulations(650);
        break;
      case 'self_replication':
        setSolarCapacity(95);
        setMiningOutput(95);
        setFabYield(95);
        break;
    }
    setTimeout(() => {
      triggerWin();
    }, 300);
  };

  const handleShareLabState = () => {
    if (!onShareWithEducator) return;
    onShareWithEducator({
      type: 'lab',
      title: `${subModule.id}: ${lab.title}`,
      details: `Active lab simulation. State: ${labPassedLocal ? 'Passed' : 'In Progress'}. Instructions: ${lab.instructions}`
    });
  };

  // Helper calculations for each lab type
  const renderLabContent = () => {
    switch (lab.type) {
      case 'air_temperature': {
        const baseFuelTemp = fuelType === 'wood' ? 620 : 1050;
        const blastBoost = bellowsPumps * 7.5;
        const insulationBoost = insulationLayers * 70;
        const totalTemp = Math.round(baseFuelTemp + blastBoost + insulationBoost);
        const ironSmeltingThreshold = 1250;
        const isTargetMet = totalTemp >= ironSmeltingThreshold && fuelType === 'charcoal';

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="space-y-3.5 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Fuel Selection
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFuelType('wood')}
                    className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                      fuelType === 'wood'
                        ? 'bg-amber-100/70 border-amber-400 text-amber-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Raw Seasoned Wood (Moist)
                  </button>
                  <button
                    onClick={() => setFuelType('charcoal')}
                    className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                      fuelType === 'charcoal'
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-600 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Pyrolyzed Charcoal (Pure C)
                  </button>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Bellows Pump Cadence: <strong>{bellowsPumps}</strong> pumps/min</span>
                    <span className="text-amber-700 font-semibold font-mono">+{Math.round(bellowsPumps * 7.5)}°C blast</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={bellowsPumps}
                    onChange={(e) => setBellowsPumps(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Refractory Layers (Clay & Turf): <strong>{insulationLayers}</strong></span>
                    <span className="text-amber-700 font-semibold font-mono">+{insulationLayers * 70}°C trapped</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={insulationLayers}
                    onChange={(e) => setInsulationLayers(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Thermal Output Display (Light Theme) */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold text-slate-500">Furnace Core Temperature</span>
                    <Flame className={`w-5 h-5 ${totalTemp >= 1250 ? 'text-amber-600 fill-amber-500 animate-pulse' : 'text-slate-400'}`} />
                  </div>
                  <div className="mt-1 text-3xl sm:text-4xl font-black tracking-tight text-amber-700 font-mono">
                    {totalTemp}°C
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    Target: <span className="text-slate-900 font-semibold">≥1,250°C (Iron Bloom Smelting)</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200">
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Iron Oxide Reduction:</span>
                      <span className={isTargetMet ? "text-emerald-700 font-bold" : "text-amber-700 font-medium"}>
                        {isTargetMet ? "Active (Iron Bloom Precipitating!)" : "Too Cold (Ore Unreacted)"}
                      </span>
                    </div>
                    {fuelType === 'wood' && (
                      <p className="text-[11px] text-rose-700">
                        Notice: Raw wood contains moisture that steals enthalpy. Switch to Charcoal!
                      </p>
                    )}
                  </div>
                </div>

                {!labPassedLocal && (
                  <button
                    onClick={triggerWin}
                    disabled={!isTargetMet}
                    className={`mt-3 w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      isTargetMet
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm Smelting Checkpoint
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      }

      case 'whitworth_plates': {
        const totalScrapes = scrapeCycles['A-B'] + scrapeCycles['B-C'] + scrapeCycles['C-A'];
        const minPair = Math.min(scrapeCycles['A-B'], scrapeCycles['B-C'], scrapeCycles['C-A']);
        const errorMicrons = Math.max(0.4, Number((35 * Math.exp(-minPair * 0.85) + 0.2 * (totalScrapes - 3 * minPair)).toFixed(1)));
        const isTargetMet = errorMicrons <= 1.5 && minPair >= 3;

        const handleScrape = () => {
          setScrapeCycles(prev => ({
            ...prev,
            [platePair]: prev[platePair] + 1
          }));
        };

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Plate Pair for Prussian Blue Rubbing:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['A-B', 'B-C', 'C-A'] as const).map((pair) => (
                      <button
                        key={pair}
                        onClick={() => setPlatePair(pair)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-all ${
                          platePair === pair
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-400 shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Pair {pair}
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                          {scrapeCycles[pair]} cycles
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                  <p className="font-bold text-emerald-800 mb-0.5">Whitworth Principle:</p>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Rubbing pair {platePair} transfers ink to high points. Hand-scrape the contact marks to cancel spherical curvature.
                  </p>
                </div>

                <button
                  onClick={handleScrape}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  Prussian Blue Rub & Scrape {platePair}
                </button>
              </div>

              {/* Surface Flatness Meter */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold text-slate-500">Surface Deviation Error</span>
                    <span className="text-xs font-mono text-emerald-700 font-bold">{minPair} / 3 balanced passes</span>
                  </div>
                  <div className="mt-1 text-3xl sm:text-4xl font-black text-emerald-700 font-mono">
                    {errorMicrons} µm
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Target: <span className="text-slate-900 font-semibold">≤ 1.5 µm (Sub-micron Flatness)</span>
                  </p>
                </div>

                <div className="mt-3 p-2 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-0.5 font-mono">
                  <div className="flex justify-between">
                    <span>A-B passes:</span> <strong>{scrapeCycles['A-B']}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>B-C passes:</span> <strong>{scrapeCycles['B-C']}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>C-A passes:</span> <strong>{scrapeCycles['C-A']}</strong>
                  </div>
                </div>

                {!labPassedLocal && (
                  <button
                    onClick={triggerWin}
                    disabled={!isTargetMet}
                    className={`mt-3 w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      isTargetMet
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Verify Absolute Flatness Checkpoint
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      }

      case 'dynamo_voltage': {
        const outputVoltage = Math.round((coilTurns * magneticFlux * dynamoRpm) / 1800);
        const isTargetMet = outputVoltage >= 105 && outputVoltage <= 115;

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Armature RPM: <strong>{dynamoRpm}</strong></span>
                    <span className="text-sky-700 font-semibold font-mono">Rotational Input</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="1800"
                    step="50"
                    value={dynamoRpm}
                    onChange={(e) => setDynamoRpm(Number(e.target.value))}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Magnetic Flux (B): <strong>{magneticFlux.toFixed(2)}</strong> Tesla</span>
                    <span className="text-sky-700 font-semibold font-mono">Field Coil</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.5"
                    step="0.05"
                    value={magneticFlux}
                    onChange={(e) => setMagneticFlux(Number(e.target.value))}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Armature Turns (N): <strong>{coilTurns}</strong></span>
                    <span className="text-sky-700 font-semibold font-mono">Wound Die</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="600"
                    step="25"
                    value={coilTurns}
                    onChange={(e) => setCoilTurns(Number(e.target.value))}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Generator Gauge */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold text-slate-500">Dynamo DC Voltage</span>
                    <Zap className={`w-5 h-5 ${isTargetMet ? 'text-sky-600 fill-sky-600' : 'text-slate-400'}`} />
                  </div>
                  <div className="mt-1 text-3xl sm:text-4xl font-black text-sky-700 font-mono">
                    {outputVoltage} V DC
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Target: <span className="text-slate-900 font-semibold">110V DC (±5V grid tolerance)</span>
                  </p>
                </div>

                <div className="mt-3 p-2 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between text-slate-600 text-[11px]">
                    <span>Commutator Status:</span>
                    <span className="text-emerald-700 font-bold">Split-Ring DC Rectification</span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-[11px]">
                    <span>Grid Status:</span>
                    <span className={isTargetMet ? "text-sky-700 font-bold" : "text-amber-700"}>
                      {outputVoltage < 105 ? "Under-voltage" : outputVoltage > 115 ? "Over-voltage" : "Optimal 110V"}
                    </span>
                  </div>
                </div>

                {!labPassedLocal && (
                  <button
                    onClick={triggerWin}
                    disabled={!isTargetMet}
                    className={`mt-3 w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      isTargetMet
                        ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-md cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Lock In 110V Dynamo Checkpoint
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      }

      case 'vacuum_grid': {
        const plateCurrent = Math.max(0, Number(((gridVoltage + 7.5) * 3.33).toFixed(1)));
        const isCutoff = plateCurrent === 0;

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Control Grid Voltage: <strong>{gridVoltage.toFixed(1)} V</strong></span>
                    <span className="text-indigo-700 font-semibold font-mono">Electrostatic Bias</span>
                  </div>
                  <input
                    type="range"
                    min="-10.0"
                    max="0.0"
                    step="0.5"
                    value={gridVoltage}
                    onChange={(e) => setGridVoltage(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
                  <p className="font-bold text-indigo-900 mb-0.5">Triode Valve Principle:</p>
                  <p className="text-[11px] leading-snug">
                    Negative grid voltage repels negative electrons boiling from the hot cathode, choking plate current to zero with zero moving mechanical mass.
                  </p>
                </div>
              </div>

              {/* Plate Current Readout */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold text-slate-500">Plate Current (Anode Flow)</span>
                    <Cpu className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="mt-1 text-3xl sm:text-4xl font-black text-indigo-700 font-mono">
                    {plateCurrent} mA
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    State: <strong className="text-slate-900">{isCutoff ? "CUTOFF (Logic 0 / Open)" : "CONDUCTING (Logic 1 / Closed)"}</strong>
                  </p>
                </div>

                {!labPassedLocal && (
                  <button
                    onClick={triggerWin}
                    className="mt-3 w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Verify Valve Switching Checkpoint
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      }

      case 'czochralski_pull': {
        const tempDiff = Math.abs(heaterTemp - 1425);
        const rateDiff = Math.abs(pullRate - 85);
        const diameterMm = Math.round(200 - (heaterTemp - 1425) * 2 + (pullRate - 85) * 0.8);
        const isIdeal = tempDiff <= 3 && rateDiff <= 5 && diameterMm >= 195 && diameterMm <= 205;

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Silicon Melt Temp: <strong>{heaterTemp}°C</strong></span>
                    <span className="text-teal-700 font-mono">Target ~1,425°C</span>
                  </div>
                  <input
                    type="range"
                    min="1410"
                    max="1440"
                    value={heaterTemp}
                    onChange={(e) => setHeaterTemp(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Seed Pull Rate: <strong>{pullRate} mm/hr</strong></span>
                    <span className="text-teal-700 font-mono">Target ~85 mm/hr</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="120"
                    value={pullRate}
                    onChange={(e) => setPullRate(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Crystal Ingot Status */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold text-slate-500">Boule Ingot Diameter</span>
                    <span className={`text-xs font-bold ${isIdeal ? 'text-teal-700' : 'text-amber-700'}`}>
                      {isIdeal ? "Flawless Single Crystal" : "Dislocation Risk"}
                    </span>
                  </div>
                  <div className="mt-1 text-3xl sm:text-4xl font-black text-teal-700 font-mono">
                    {diameterMm} mm
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Standard 200mm Wafer Boule (±5mm tolerance)
                  </p>
                </div>

                {!labPassedLocal && (
                  <button
                    onClick={triggerWin}
                    disabled={!isIdeal}
                    className={`mt-3 w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      isIdeal
                        ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-md cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Lock In Crystal Ingot Checkpoint
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      }

      case 'binary_bootstrap': {
        const toggleBit = (index: number) => {
          const next = [...switchBits];
          next[index] = next[index] === '0' ? '1' : '0';
          setSwitchBits(next);
        };

        const currentHex = "0x" + parseInt(switchBits.join(''), 2).toString(16).toUpperCase().padStart(2, '0');

        const handleDeposit = () => {
          setEnteredInstructions(prev => [...prev, currentHex]);
        };

        const isComplete = enteredInstructions.length >= 4;

        return (
          <div className="space-y-4">
            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-slate-700">8-Bit Switch Register Bus</span>
                <span className="text-xs font-mono text-cyan-700 font-bold">{currentHex}</span>
              </div>

              <div className="grid grid-cols-8 gap-1.5">
                {switchBits.map((bit, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleBit(idx)}
                    className={`py-2 px-1 rounded-lg text-xs font-mono font-bold border transition-all flex flex-col items-center gap-0.5 ${
                      bit === '1'
                        ? 'bg-cyan-100 border-cyan-400 text-cyan-900 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    <span className="text-[8px] text-slate-400 font-normal">D{7 - idx}</span>
                    <span>{bit}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleDeposit}
                  disabled={isComplete}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <Play className="w-3.5 h-3.5" />
                  Deposit Instruction #{enteredInstructions.length + 1}
                </button>
                <button
                  onClick={() => setEnteredInstructions([])}
                  className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div className="text-slate-600 font-semibold mb-1">
                  RAM Memory Bank ({enteredInstructions.length}/4 loaded):
                </div>
                {enteredInstructions.length === 0 ? (
                  <p className="text-slate-400 italic">Toggle bits above and click Deposit.</p>
                ) : (
                  <div className="flex gap-1.5 font-mono">
                    {enteredInstructions.map((inst, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs">
                        [{i}]: {inst}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {!labPassedLocal && (
                <button
                  onClick={triggerWin}
                  disabled={!isComplete}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    isComplete
                      ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Execute Bootloader Jump Vector
                </button>
              )}
            </div>
          </div>
        );
      }

      case 'pid_control': {
        const error = Math.abs(kp - 25) * 0.15 + Math.abs(ki - 2.0) * 0.4 + Math.abs(kd - 1.5) * 0.3;
        const isTuned = error < 1.0;

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Proportional Gain (Kp): <strong>{kp}</strong></span>
                    <span className="text-blue-700 font-mono">Target ~25</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="45"
                    value={kp}
                    onChange={(e) => setKp(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Integral Gain (Ki): <strong>{ki.toFixed(1)}</strong></span>
                    <span className="text-blue-700 font-mono">Target ~2.0</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="5.0"
                    step="0.1"
                    value={ki}
                    onChange={(e) => setKi(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Derivative Gain (Kd): <strong>{kd.toFixed(1)}</strong></span>
                    <span className="text-blue-700 font-mono">Target ~1.5</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="4.0"
                    step="0.1"
                    value={kd}
                    onChange={(e) => setKd(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* PID Stability Output */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold text-slate-500">Servo Tracking Error</span>
                    <span className={`text-xs font-bold ${isTuned ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {isTuned ? "Critically Damped" : "Oscillating / Sluggish"}
                    </span>
                  </div>
                  <div className="mt-1 text-3xl sm:text-4xl font-black text-blue-700 font-mono">
                    {error.toFixed(2)} µm
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Target: <span className="text-slate-900 font-semibold">&lt; 1.00 µm steady-state error</span>
                  </p>
                </div>

                {!labPassedLocal && (
                  <button
                    onClick={triggerWin}
                    disabled={!isTuned}
                    className={`mt-3 w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      isTuned
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm Servo Tuning Checkpoint
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      }

      case 'systolic_array': {
        const handleClockStep = () => {
          setSystolicClock(prev => (prev + 1) % 5);
        };
        const isFinished = systolicClock >= 4;

        return (
          <div className="space-y-4">
            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-slate-700">2x2 Systolic Matrix Processing</span>
                <span className="text-xs font-mono text-violet-700 font-bold">Clock Cycle #{systolicClock} / 4</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 max-w-xs mx-auto">
                <div className="p-3 bg-slate-50 rounded-xl border border-violet-200 text-center">
                  <div className="text-[9px] text-slate-400 font-mono uppercase">PE (0,0)</div>
                  <div className="text-lg font-black text-violet-700 font-mono mt-0.5">
                    {systolicClock >= 1 ? `Σ = 14` : 'idle'}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-violet-200 text-center">
                  <div className="text-[9px] text-slate-400 font-mono uppercase">PE (0,1)</div>
                  <div className="text-lg font-black text-violet-700 font-mono mt-0.5">
                    {systolicClock >= 2 ? `Σ = 22` : 'idle'}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-violet-200 text-center">
                  <div className="text-[9px] text-slate-400 font-mono uppercase">PE (1,0)</div>
                  <div className="text-lg font-black text-violet-700 font-mono mt-0.5">
                    {systolicClock >= 2 ? `Σ = 30` : 'idle'}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-violet-200 text-center">
                  <div className="text-[9px] text-slate-400 font-mono uppercase">PE (1,1)</div>
                  <div className="text-lg font-black text-violet-700 font-mono mt-0.5">
                    {systolicClock >= 3 ? `Σ = 46` : 'idle'}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleClockStep}
                  className="py-1.5 px-4 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 mx-auto cursor-pointer transition-all shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Tick Systolic Clock Cycle
                </button>
              </div>

              {!labPassedLocal && (
                <button
                  onClick={triggerWin}
                  disabled={!isFinished}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    isFinished
                      ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-md cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Complete Matrix Multiplication Checkpoint
                </button>
              )}
            </div>
          </div>
        );
      }

      case 'mcts_explorer': {
        const isBalanced = cPuct >= 1.2 && cPuct <= 1.6 && mctsSimulations >= 500;

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Exploration Weight (c_puct): <strong>{cPuct.toFixed(2)}</strong></span>
                    <span className="text-fuchsia-700 font-mono">Target ~1.41 (&radic;2)</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.05"
                    value={cPuct}
                    onChange={(e) => setCPuct(Number(e.target.value))}
                    className="w-full accent-fuchsia-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>MCTS Tree Rollout Simulations: <strong>{mctsSimulations}</strong></span>
                    <span className="text-fuchsia-700 font-mono">&ge; 500 passes</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={mctsSimulations}
                    onChange={(e) => setMctsSimulations(Number(e.target.value))}
                    className="w-full accent-fuchsia-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* MCTS Result */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold text-slate-500">Self-Play Elo Gain</span>
                    <span className={`text-xs font-bold ${isBalanced ? 'text-fuchsia-700' : 'text-amber-700'}`}>
                      {isBalanced ? "Superhuman Convergence" : "Over-exploring"}
                    </span>
                  </div>
                  <div className="mt-1 text-3xl sm:text-4xl font-black text-fuchsia-700 font-mono">
                    {isBalanced ? "+480 Elo" : "+120 Elo"}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Zero-Human Knowledge Bootstrapping
                  </p>
                </div>

                {!labPassedLocal && (
                  <button
                    onClick={triggerWin}
                    disabled={!isBalanced}
                    className={`mt-3 w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      isBalanced
                        ? 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-md cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Lock In Self-Play Convergence
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      }

      case 'self_replication': {
        const netR0 = Number(((solarCapacity * miningOutput * fabYield) / (80 * 85 * 85)).toFixed(2));
        const isSelfSustaining = netR0 >= 1.05;

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Solar Sintering Energy: <strong>{solarCapacity}%</strong></span>
                    <span className="text-rose-700 font-mono">Power Autonomy</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={solarCapacity}
                    onChange={(e) => setSolarCapacity(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Ore Extraction & Refining: <strong>{miningOutput}%</strong></span>
                    <span className="text-rose-700 font-mono">Silica & Copper</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={miningOutput}
                    onChange={(e) => setMiningOutput(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Robotic Fab Assembly Yield: <strong>{fabYield}%</strong></span>
                    <span className="text-rose-700 font-mono">Machine Tools</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={fabYield}
                    onChange={(e) => setFabYield(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Net R0 Result */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold text-slate-500">Reproduction Ratio (R0)</span>
                    <span className={`text-xs font-bold ${isSelfSustaining ? 'text-rose-700' : 'text-amber-700'}`}>
                      {isSelfSustaining ? "Exponential Growth" : "Sub-critical Loop"}
                    </span>
                  </div>
                  <div className="mt-1 text-3xl sm:text-4xl font-black text-rose-700 font-mono">
                    {netR0}x
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Target: <span className="text-slate-900 font-semibold">R0 &ge; 1.05 (Self-Sustaining Von Neumann Flywheel)</span>
                  </p>
                </div>

                {!labPassedLocal && (
                  <button
                    onClick={triggerWin}
                    disabled={!isSelfSustaining}
                    className={`mt-3 w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      isSelfSustaining
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Achieve Self-Replication Flywheel
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50/70 rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 space-y-3 font-sans shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-bold">
            <Sliders className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
              {lab.title}
              {labPassedLocal && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.2 rounded-full">
                  <Award className="w-3 h-3 text-emerald-600" /> Passed
                </span>
              )}
            </h3>
            <p className="text-[11px] text-slate-500">{lab.instructions}</p>
          </div>
        </div>

        {/* AI Educator Helper Buttons in Lab */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {onShareWithEducator && (
            <button
              onClick={handleShareLabState}
              className="px-2 py-1 rounded-md text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1 transition-colors shadow-2xs"
              title="Share simulation telemetry with Ada"
            >
              <Share2 className="w-3 h-3 text-amber-600" />
              <span>Share with Ada</span>
            </button>
          )}

          <button
            onClick={handleAutoTuneWithAda}
            className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1 shadow-2xs transition-all"
            title="Professor Ada will tune parameters to solve the lab for you"
          >
            <Sparkles className="w-3 h-3" />
            <span>⚡ Auto-Tune with Ada</span>
          </button>
        </div>
      </div>

      {renderLabContent()}
    </div>
  );
}
