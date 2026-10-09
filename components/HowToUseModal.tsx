'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Compass, 
  Hammer, 
  Cpu, 
  Bot, 
  HelpCircle, 
  BookOpen, 
  ShieldCheck, 
  Flame, 
  ArrowRight,
  Layers,
  GraduationCap
} from 'lucide-react';

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToStage?: (stageId: string) => void;
  onOpenModelManager?: () => void;
  onOpenSettings?: () => void;
}

export function HowToUseModal({
  isOpen,
  onClose,
  onNavigateToStage,
  onOpenModelManager,
  onOpenSettings
}: HowToUseModalProps) {
  const [activeSection, setActiveSection] = useState<'flow' | 'triads' | 'labs' | 'ada' | 'offline' | 'data'>('flow');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shadow-xs flex-shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                  How to Use the Tech Tree
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex-shrink-0">
                  Quick Guide
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">
                Dirt to Superintelligence • Complete Civilization Rebuilder Academy
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer flex-shrink-0"
            title="Close Guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1 overflow-x-auto no-scrollbar text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveSection('flow')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSection === 'flow'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'hover:bg-slate-200/70 text-slate-600'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. The 10 Stages</span>
          </button>

          <button
            onClick={() => setActiveSection('triads')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSection === 'triads'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'hover:bg-slate-200/70 text-slate-600'
            }`}
          >
            <Hammer className="w-3.5 h-3.5" />
            <span>2. The Triad Pillars</span>
          </button>

          <button
            onClick={() => setActiveSection('labs')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSection === 'labs'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'hover:bg-slate-200/70 text-slate-600'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>3. Labs & Lessons</span>
          </button>

          <button
            onClick={() => setActiveSection('ada')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSection === 'ada'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'hover:bg-slate-200/70 text-slate-600'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>4. Professor Ada</span>
          </button>

          <button
            onClick={() => setActiveSection('offline')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSection === 'offline'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'hover:bg-slate-200/70 text-slate-600'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>5. Offline Edge AI</span>
          </button>

          <button
            onClick={() => setActiveSection('data')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSection === 'data'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'hover:bg-slate-200/70 text-slate-600'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>6. Data & Privacy</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {activeSection === 'flow' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wide">
                <Sparkles className="w-4 h-4" />
                <span>The 10-Stage Civilizational Cascade</span>
              </div>
              <p>
                This platform is structured as an unbroken chain of mechanical, chemical, electrical, and computational innovations. You begin with raw physical dirt and bootstrap all the way to autonomous self-replicating artificial intelligence:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
                  <span className="font-bold text-slate-900 block">Stage 1: Fire & Refractories</span>
                  <span className="text-slate-500 text-[11px]">Charcoal pyrolysis, tuyères, 1,250°C iron reduction.</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
                  <span className="font-bold text-slate-900 block">Stage 2: Precision Mechanical Flatness</span>
                  <span className="text-slate-500 text-[11px]">Whitworth 3-plate method, lead screws, and lathes.</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
                  <span className="font-bold text-slate-900 block">Stage 3: Electromagnetic Power</span>
                  <span className="text-slate-500 text-[11px]">Faraday dynamos, copper wire drawing, telegraph relays.</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
                  <span className="font-bold text-slate-900 block">Stage 4: Thermionic Electronic Switching</span>
                  <span className="text-slate-500 text-[11px]">Vacuum triodes, electrostatic grids, zero-inertia gates.</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
                  <span className="font-bold text-slate-900 block">Stage 5: Monocrystalline Silicon</span>
                  <span className="text-slate-500 text-[11px]">Czochralski crystal pulling at 1,425°C, defect-free wafers.</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
                  <span className="font-bold text-slate-900 block">Stage 6: Photolithography & Steppers</span>
                  <span className="text-slate-500 text-[11px]">DUV/EUV projection, reticles, sub-micron etching.</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
                  <span className="font-bold text-slate-900 block">Stage 7: Compiler Bootstrapping Chain</span>
                  <span className="text-slate-500 text-[11px]">T-diagrams, binary assemblers, self-hosting compilers.</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
                  <span className="font-bold text-slate-900 block">Stage 8: Systolic Array Compute</span>
                  <span className="text-slate-500 text-[11px]">2D MAC arrays, memory wall defeat, tensor operations.</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
                  <span className="font-bold text-slate-900 block">Stage 9: Zero-Data Reinforcement Learning</span>
                  <span className="text-slate-500 text-[11px]">Adversarial self-play, MCTS search, superhuman play.</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
                  <span className="font-bold text-slate-900 block">Stage 10: Von Neumann Self-Replication</span>
                  <span className="text-slate-500 text-[11px]">Exponential machine self-assembly from planetary raw dirt.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                💡 <strong>Tip:</strong> Click any submodule card in the Tech Tree to launch the interactive lesson and engineering lab!
              </div>
            </div>
          )}

          {activeSection === 'triads' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wide">
                <Hammer className="w-4 h-4" />
                <span>The Triad of Civilization: 3 Indispensable Pillars</span>
              </div>
              <p>
                Every major stage in this tree relies on the <strong>Triad</strong>. You cannot advance a civilization by discovering a tool alone—you need the closed-loop feedback to prevent drift, and the institutional standards to replicate it:
              </p>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/60 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    🔨
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-950 text-xs sm:text-sm">1. Physical Tooling & Machinery</h4>
                    <p className="text-[11px] text-amber-900/80 mt-0.5">
                      The tangible machines, cutting tools, furnaces, quartz crucibles, and optical reticles. (e.g. Whitworth 3 plates, ceramic tuyères, crucible steel).
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-sky-200 bg-sky-50/60 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ⚙️
                  </div>
                  <div>
                    <h4 className="font-bold text-sky-950 text-xs sm:text-sm">2. Closed-Loop Automation & Feedback</h4>
                    <p className="text-[11px] text-sky-900/80 mt-0.5">
                      Self-correcting mechanisms that eliminate human error, thermal drift, and mechanical instability. (e.g. flyball governors, PID servo loops, phase-locked loops).
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-purple-200 bg-purple-50/60 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    🏛️
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-950 text-xs sm:text-sm">3. Self-Organization & Standards</h4>
                    <p className="text-[11px] text-purple-900/80 mt-0.5">
                      Standardized metrics, calibration protocols, and institutional discipline. (e.g. standard screw thread pitch, ISO Class 1 cleanrooms, compiler specifications).
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600">
                In the Tech Tree, click <strong>Tools</strong>, <strong>Loops</strong>, or <strong>Governance</strong> at the top to filter and highlight each pillar directly in the module cards!
              </p>
            </div>
          )}

          {activeSection === 'labs' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wide">
                <BookOpen className="w-4 h-4" />
                <span>Classroom Lessons & Hands-On Engineering Labs</span>
              </div>
              <p>
                Each node contains a full engineering lesson, interactive physics simulation, and mastery checkpoints:
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-2.5">
                  <span className="font-bold text-amber-600">1.</span>
                  <div>
                    <strong>Beginner Intuition & Bottleneck Analysis:</strong> Understand the concept in plain English and learn exactly why primitive earth couldn&apos;t build it yet.
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-2.5">
                  <span className="font-bold text-emerald-600">2.</span>
                  <div>
                    <strong>Interactive Lab Simulators:</strong> Every stage has a playable simulator (e.g. Blast furnace tuyère pressure, Whitworth 3-plate scraping, dynamo RPM, vacuum grid voltage, PID servo oscillation, systolic array dataflow).
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-2.5">
                  <span className="font-bold text-sky-600">3.</span>
                  <div>
                    <strong>Knowledge Quiz & Feynman Check:</strong> Test yourself with 3 multiple-choice checks and write a concise explanation to earn XP and level up.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'ada' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wide">
                <Bot className="w-4 h-4" />
                <span>Professor Ada: Voice, Chat & Autonomous Copilot</span>
              </div>
              <p>
                Professor Ada is your on-demand AI Educator. Click the <strong>big round Ada button</strong> at the bottom right anytime:
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <span><strong>Voice Call Mode:</strong> Speak hands-free and listen to Ada reply.</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Real-time</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <span><strong>In-Chat Text-to-Speech (TTS):</strong> Read aloud message by message.</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">Auto-TTS</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <span><strong>Autonomous Actions:</strong> Say &quot;take me to silicon&quot; or &quot;tune the lab&quot;.</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px]">Agentic</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <span><strong>Share Activity:</strong> Click &quot;Ask Ada about this Lab&quot; in any lesson.</span>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[10px]">Screen Context</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'offline' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wide">
                <Cpu className="w-4 h-4" />
                <span>100% Offline Edge AI Models (Zero Internet)</span>
              </div>
              <p>
                You can run the entire platform without any network connection! Click the <strong>Models</strong> button in the navbar or bottom dock:
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="font-bold text-slate-900 block">⚡ Gemma 2B & Llama 3.2 1B (WebGPU)</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Execute weights directly on your device&apos;s GPU through WebGPU. Ultra-fast, zero cloud telemetry, 100% offline.
                  </p>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="font-bold text-slate-900 block">⚡ SmolLM2 360M (Instant Nano WASM)</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Lightweight CPU fallback that runs anywhere, even on mobile phones and older laptops without WebGPU.
                  </p>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenModelManager) onOpenModelManager();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  Open Offline AI Models Manager
                </button>
              </div>
            </div>
          )}

          {activeSection === 'data' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Private Local Storage & Profile Data Deleter</span>
              </div>
              <p>
                Your progress, question notebook, and chat logs are stored strictly on your device inside your browser&apos;s <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">localStorage</code>. No personal accounts or tracking servers exist.
              </p>

              <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/60 text-xs text-rose-950 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-rose-900">
                  <span>How to delete or wipe your profile data:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-rose-900/90">
                  <li>Click the <strong>Student Settings</strong> button (Graduation Cap 🎓 in top navbar).</li>
                  <li>Scroll to the <strong>Danger Zone: Profile & Data Deleter</strong> section.</li>
                  <li>Choose to wipe all data, clear chat messages, or reset stage progress with 1 click.</li>
                </ol>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenSettings) onOpenSettings();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  Open Student Settings & Data Deleter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            10 Stages • 20+ Submodules • 100% Offline Compatible
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                if (onNavigateToStage) onNavigateToStage('1.1');
              }}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Stage 1.1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
