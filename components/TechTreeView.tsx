'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Search, 
  Flame, 
  Hammer, 
  Cpu, 
  Zap, 
  Bot, 
  Sparkles,
  ChevronRight,
  HelpCircle,
  BookOpen,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CURRICULUM_STAGES, TOTAL_MODULES_COUNT } from '@/lib/curriculumData';
import { AppState } from '@/lib/store';
import { TriadMatrixModal } from '@/components/TriadMatrixModal';

interface TechTreeViewProps {
  state: AppState;
  onSelectModule: (moduleId: string) => void;
  onNavigateToClassroom: () => void;
  onAskEducator?: (prompt: string) => void;
  onOpenHowToUse?: () => void;
}

export function TechTreeView({ 
  state, 
  onSelectModule, 
  onNavigateToClassroom, 
  onAskEducator,
  onOpenHowToUse
}: TechTreeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [pillarFilter, setPillarFilter] = useState<'all' | 'tooling' | 'automation' | 'selfOrganization'>('all');
  const [isTriadMatrixOpen, setIsTriadMatrixOpen] = useState(false);

  const completedModulesCount = Object.keys(state.progress).filter(
    (k) => state.progress[k]?.labCompleted || state.progress[k]?.feynmanPassed || (state.progress[k]?.quizScore ?? 0) >= 80
  ).length;

  const totalPercent = Math.round((completedModulesCount / TOTAL_MODULES_COUNT) * 100);

  const getStageIcon = (stageNum: number) => {
    switch (stageNum) {
      case 1: return <Flame className="w-4 h-4 text-amber-600" />;
      case 2: return <Hammer className="w-4 h-4 text-emerald-600" />;
      case 3: return <Zap className="w-4 h-4 text-sky-600" />;
      case 4: return <Cpu className="w-4 h-4 text-indigo-600" />;
      case 5: return <Sparkles className="w-4 h-4 text-teal-600" />;
      case 6: return <Cpu className="w-4 h-4 text-cyan-600" />;
      case 7: return <Hammer className="w-4 h-4 text-blue-600" />;
      case 8: return <Zap className="w-4 h-4 text-violet-600" />;
      case 9: return <Bot className="w-4 h-4 text-fuchsia-600" />;
      case 10: return <Bot className="w-4 h-4 text-rose-600" />;
      default: return <Sparkles className="w-4 h-4 text-amber-600" />;
    }
  };

  const filteredStages = CURRICULUM_STAGES.map((stage) => {
    const matchingSubs = stage.subModules.filter((sub) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        q === '' ||
        sub.title.toLowerCase().includes(q) ||
        sub.shortSummary.toLowerCase().includes(q) ||
        sub.id.includes(q) ||
        sub.triadPillars.tooling.title.toLowerCase().includes(q) ||
        sub.triadPillars.automation.title.toLowerCase().includes(q) ||
        sub.triadPillars.selfOrganization.title.toLowerCase().includes(q) ||
        sub.triadPillars.tooling.items.some(i => i.toLowerCase().includes(q)) ||
        sub.triadPillars.automation.items.some(i => i.toLowerCase().includes(q)) ||
        sub.triadPillars.selfOrganization.items.some(i => i.toLowerCase().includes(q));

      if (!matchesSearch) return false;
      return true;
    });

    return { ...stage, subModules: matchingSubs };
  }).filter((stage) => stage.subModules.length > 0);

  const handleLaunchModule = (moduleId: string) => {
    onSelectModule(moduleId);
    onNavigateToClassroom();
  };

  return (
    <div className="space-y-5 pb-16">
      {/* Hero Banner: Compact Light Theme */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50/80 via-white to-sky-50/50 border border-slate-200/90 p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                <Sparkles className="w-3 h-3 text-amber-600" />
                The Bootstrapped Tech Tree
              </span>
              {onOpenHowToUse && (
                <button
                  onClick={onOpenHowToUse}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-slate-700 hover:text-amber-800 border border-slate-300 hover:border-amber-300 shadow-2xs transition-all cursor-pointer"
                >
                  <BookOpen className="w-3 h-3 text-amber-600" />
                  <span>How to Use the Website</span>
                </button>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Dirt to Superintelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Complete survival & technological reconstruction academy. Follow the 10-stage cascade from raw earth, fire, and flatness to single-crystal silicon fabs and autonomous robotic self-replication.
            </p>
          </div>

          {/* Quick Progress Box */}
          <div className="bg-white/90 p-3.5 rounded-xl border border-slate-200/90 sm:w-64 space-y-2 flex-shrink-0 shadow-xs">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Overall Progress</span>
              <span className="font-mono text-amber-600">{totalPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 transition-all duration-500"
                style={{ width: `${Math.max(4, totalPercent)}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 flex justify-between font-mono">
              <span>{completedModulesCount}/{TOTAL_MODULES_COUNT} Modules</span>
              <span className="text-emerald-700 font-semibold">{state.questions.filter(q => q.status === 'mastered').length} Qs Mastered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search concepts, tools, formulas (e.g. 'Whitworth', 'Czochralski')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-xs transition-colors"
          />
        </div>

        {/* Pillar Filter Tabs & Triad Matrix Trigger */}
        <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs shadow-xs overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setPillarFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                pillarFilter === 'all'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Triads
            </button>
            <button
              onClick={() => setPillarFilter('tooling')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                pillarFilter === 'tooling'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🔨 Tools
            </button>
            <button
              onClick={() => setPillarFilter('automation')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                pillarFilter === 'automation'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚙️ Loops
            </button>
            <button
              onClick={() => setPillarFilter('selfOrganization')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                pillarFilter === 'selfOrganization'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏛️ Governance
            </button>
          </div>

          <button
            onClick={() => setIsTriadMatrixOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-300 text-xs font-bold transition-colors cursor-pointer shadow-2xs flex-shrink-0"
            title="Open Complete Triad Matrix across all 10 stages"
          >
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden xs:inline">Triad Matrix</span>
          </button>
        </div>
      </div>

      {/* Active Triad Filter Feedback Banner */}
      {pillarFilter !== 'all' && (
        <div className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 animate-in fade-in duration-150 ${
          pillarFilter === 'tooling'
            ? 'bg-amber-50/90 border-amber-300 text-amber-950'
            : pillarFilter === 'automation'
            ? 'bg-sky-50/90 border-sky-300 text-sky-950'
            : 'bg-purple-50/90 border-purple-300 text-purple-950'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-base flex-shrink-0">
              {pillarFilter === 'tooling' ? '🔨' : pillarFilter === 'automation' ? '⚙️' : '🏛️'}
            </span>
            <div>
              <strong>
                {pillarFilter === 'tooling' 
                  ? 'Highlighting Physical Tooling & Machinery'
                  : pillarFilter === 'automation'
                  ? 'Highlighting Closed-Loop Automation & Feedback'
                  : 'Highlighting Self-Organization & Standards'}
              </strong>
              <p className="text-[11px] opacity-85 mt-0.5">
                {pillarFilter === 'tooling'
                  ? 'Examining the cutters, blast furnaces, quartz crucibles, lathes, and photolithography optics at each milestone.'
                  : pillarFilter === 'automation'
                  ? 'Examining the self-correcting mechanisms: flyball governors, negative feedback amplifiers, and PID loops.'
                  : 'Examining the repeatable standards, calibration metrics, cleanroom specs, and compiler bootstrapping standards.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => setIsTriadMatrixOpen(true)}
              className="px-2 py-1 rounded-lg bg-white/90 border border-slate-200 text-[11px] font-bold text-slate-800 hover:bg-white transition-colors cursor-pointer"
            >
              Compare All Matrix
            </button>
            <button
              onClick={() => setPillarFilter('all')}
              className="text-[11px] underline opacity-75 hover:opacity-100 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* 10-Stage Pipeline Flow: Compact Light Cards */}
      <div className="space-y-4">
        {filteredStages.map((stage) => {
          const stageDoneCount = stage.subModules.filter(
            (m) => state.progress[m.id]?.labCompleted || state.progress[m.id]?.feynmanPassed || (state.progress[m.id]?.quizScore ?? 0) >= 80
          ).length;
          const stageAllDone = stageDoneCount === stage.subModules.length;

          return (
            <div
              key={stage.stageNumber}
              className="rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:border-slate-300 transition-all"
            >
              {/* Stage Header */}
              <div className="p-3 sm:p-3.5 bg-slate-50/70 border-b border-slate-200/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-xs">
                    {getStageIcon(stage.stageNumber)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 font-mono">
                        {stage.badge}
                      </span>
                      <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {stage.title}
                      </h2>
                      {stageAllDone && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Done
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2 flex-shrink-0">
                  <span>{stageDoneCount}/{stage.subModules.length}</span>
                </div>
              </div>

              {/* Submodules Grid */}
              <div className="p-3 sm:p-3.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {stage.subModules.map((sub) => {
                  const isCurrent = state.currentModuleId === sub.id;
                  const isProgress = state.progress[sub.id];
                  const isComplete = isProgress?.labCompleted || isProgress?.feynmanPassed || (isProgress?.quizScore ?? 0) >= 80;

                  return (
                    <div
                      key={sub.id}
                      onClick={() => handleLaunchModule(sub.id)}
                      className={`group relative flex flex-col justify-between p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-amber-50/60 border-amber-400 ring-1 ring-amber-400/40 shadow-xs'
                          : isComplete
                          ? 'bg-slate-50/50 border-emerald-200 hover:border-emerald-300'
                          : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        {/* Top ID & Status */}
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-mono font-bold text-slate-500 group-hover:text-amber-700 transition-colors">
                            {sub.id}
                          </span>
                          {isComplete ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Passed
                            </span>
                          ) : isCurrent ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                              Active
                            </span>
                          ) : (
                            <Circle className="w-3 h-3 text-slate-300" />
                          )}
                        </div>

                        {/* Title & Short Summary */}
                        <h3 className="font-bold text-xs text-slate-800 group-hover:text-slate-900 transition-colors line-clamp-1">
                          {sub.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                          {sub.shortSummary}
                        </p>

                        {/* Dedicated Active Triad Highlight Card when Filter is Selected */}
                        {pillarFilter === 'tooling' && (
                          <div className="mt-2 p-2 rounded-lg bg-amber-50/90 border border-amber-200 text-[11px] text-amber-950">
                            <div className="font-bold flex items-center gap-1 text-amber-900">
                              <span>🔨 Tool:</span>
                              <span className="truncate">{sub.triadPillars.tooling.title}</span>
                            </div>
                            <div className="text-[10px] text-amber-800/80 mt-0.5 line-clamp-1">
                              {sub.triadPillars.tooling.items.slice(0, 3).join(' • ')}
                            </div>
                          </div>
                        )}

                        {pillarFilter === 'automation' && (
                          <div className="mt-2 p-2 rounded-lg bg-sky-50/90 border border-sky-200 text-[11px] text-sky-950">
                            <div className="font-bold flex items-center gap-1 text-sky-900">
                              <span>⚙️ Loop:</span>
                              <span className="truncate">{sub.triadPillars.automation.title}</span>
                            </div>
                            <div className="text-[10px] text-sky-800/80 mt-0.5 line-clamp-1">
                              {sub.triadPillars.automation.items.slice(0, 3).join(' • ')}
                            </div>
                          </div>
                        )}

                        {pillarFilter === 'selfOrganization' && (
                          <div className="mt-2 p-2 rounded-lg bg-purple-50/90 border border-purple-200 text-[11px] text-purple-950">
                            <div className="font-bold flex items-center gap-1 text-purple-900">
                              <span>🏛️ Standard:</span>
                              <span className="truncate">{sub.triadPillars.selfOrganization.title}</span>
                            </div>
                            <div className="text-[10px] text-purple-800/80 mt-0.5 line-clamp-1">
                              {sub.triadPillars.selfOrganization.items.slice(0, 3).join(' • ')}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Key Artifact Pill */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 truncate max-w-[170px]" title={sub.keyArtifactUnlocked}>
                          🔑 {sub.keyArtifactUnlocked}
                        </span>
                        <span className="text-amber-700 font-bold group-hover:translate-x-0.5 transition-transform flex items-center">
                          Study <ChevronRight className="w-3 h-3 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Triad Matrix Modal */}
      <TriadMatrixModal
        isOpen={isTriadMatrixOpen}
        onClose={() => setIsTriadMatrixOpen(false)}
        onSelectModule={(id) => handleLaunchModule(id)}
        initialPillar={pillarFilter}
      />
    </div>
  );
}
