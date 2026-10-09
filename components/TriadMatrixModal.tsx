'use client';

import React, { useState } from 'react';
import { 
  X, 
  Hammer, 
  Layers, 
  Search, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { CURRICULUM_STAGES } from '@/lib/curriculumData';

interface TriadMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (moduleId: string) => void;
  initialPillar?: 'all' | 'tooling' | 'automation' | 'selfOrganization';
}

export function TriadMatrixModal({
  isOpen,
  onClose,
  onSelectModule,
  initialPillar = 'all'
}: TriadMatrixModalProps) {
  const [filterPillar, setFilterPillar] = useState<'all' | 'tooling' | 'automation' | 'selfOrganization'>(initialPillar);
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center font-black shadow-xs flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                  The Triad Civilization Matrix
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex-shrink-0">
                  10 Epochs
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">
                Physical Tooling • Closed-Loop Automation • Self-Organization Standards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer flex-shrink-0"
            title="Close Triad Matrix"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 flex-shrink-0">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold overflow-x-auto no-scrollbar">
            <button
              onClick={() => setFilterPillar('all')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filterPillar === 'all'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All 3 Pillars
            </button>
            <button
              onClick={() => setFilterPillar('tooling')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filterPillar === 'tooling'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🔨 Tooling & Machinery
            </button>
            <button
              onClick={() => setFilterPillar('automation')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filterPillar === 'automation'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚙️ Closed Loops
            </button>
            <button
              onClick={() => setFilterPillar('selfOrganization')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filterPillar === 'selfOrganization'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏛️ Standards & Governance
            </button>
          </div>

          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search tools, loops, standards..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Matrix Rows */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {CURRICULUM_STAGES.map((stage) => {
            return (
              <div 
                key={stage.stageNumber}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs"
              >
                {/* Stage Header */}
                <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                      Stage 0{stage.stageNumber}
                    </span>
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-900">
                      {stage.title}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                    {stage.subModules.length} Submodules
                  </span>
                </div>

                {/* Submodules Matrix Cards */}
                <div className="p-3 divide-y divide-slate-100 space-y-3">
                  {stage.subModules.map((sub) => {
                    const matchSearch = search === '' ||
                      sub.title.toLowerCase().includes(search.toLowerCase()) ||
                      sub.triadPillars.tooling.title.toLowerCase().includes(search.toLowerCase()) ||
                      sub.triadPillars.automation.title.toLowerCase().includes(search.toLowerCase()) ||
                      sub.triadPillars.selfOrganization.title.toLowerCase().includes(search.toLowerCase()) ||
                      sub.triadPillars.tooling.items.some(i => i.toLowerCase().includes(search.toLowerCase())) ||
                      sub.triadPillars.automation.items.some(i => i.toLowerCase().includes(search.toLowerCase())) ||
                      sub.triadPillars.selfOrganization.items.some(i => i.toLowerCase().includes(search.toLowerCase()));

                    if (!matchSearch) return null;

                    return (
                      <div key={sub.id} className="pt-3 first:pt-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-slate-500">
                              {sub.id}
                            </span>
                            <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                              {sub.title}
                            </h4>
                          </div>
                          <button
                            onClick={() => {
                              onClose();
                              onSelectModule(sub.id);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-800 hover:underline cursor-pointer"
                          >
                            Open Lesson <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>

                        {/* The 3 Triad Pillar Blocks */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                          {/* 1. Tooling */}
                          {(filterPillar === 'all' || filterPillar === 'tooling') && (
                            <div className="p-2.5 rounded-lg border border-amber-200/80 bg-amber-50/40 space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                                <span>🔨 Tooling:</span>
                                <span className="truncate">{sub.triadPillars.tooling.title}</span>
                              </div>
                              <p className="text-[11px] text-slate-600 line-clamp-2">
                                {sub.triadPillars.tooling.description}
                              </p>
                              <div className="flex flex-wrap gap-1 pt-1">
                                {sub.triadPillars.tooling.items.map((item, idx) => (
                                  <span key={idx} className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-white border border-amber-200 text-amber-800">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 2. Automation */}
                          {(filterPillar === 'all' || filterPillar === 'automation') && (
                            <div className="p-2.5 rounded-lg border border-sky-200/80 bg-sky-50/40 space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-sky-900">
                                <span>⚙️ Closed Loop:</span>
                                <span className="truncate">{sub.triadPillars.automation.title}</span>
                              </div>
                              <p className="text-[11px] text-slate-600 line-clamp-2">
                                {sub.triadPillars.automation.description}
                              </p>
                              <div className="flex flex-wrap gap-1 pt-1">
                                {sub.triadPillars.automation.items.map((item, idx) => (
                                  <span key={idx} className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-white border border-sky-200 text-sky-800">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 3. Self-Organization */}
                          {(filterPillar === 'all' || filterPillar === 'selfOrganization') && (
                            <div className="p-2.5 rounded-lg border border-purple-200/80 bg-purple-50/40 space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-purple-900">
                                <span>🏛️ Standards:</span>
                                <span className="truncate">{sub.triadPillars.selfOrganization.title}</span>
                              </div>
                              <p className="text-[11px] text-slate-600 line-clamp-2">
                                {sub.triadPillars.selfOrganization.description}
                              </p>
                              <div className="flex flex-wrap gap-1 pt-1">
                                {sub.triadPillars.selfOrganization.items.map((item, idx) => (
                                  <span key={idx} className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-white border border-purple-200 text-purple-800">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Every epoch links physical tooling, feedback control, and organizational standards.
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
