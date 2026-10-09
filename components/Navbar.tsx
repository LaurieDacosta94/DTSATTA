'use client';

import React from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Flame, 
  Target, 
  Compass, 
  BookOpen, 
  Layers, 
  GraduationCap, 
  Bot, 
  Cpu, 
  Phone 
} from 'lucide-react';
import { AppState } from '@/lib/store';
import { getSubModuleById } from '@/lib/curriculumData';

interface NavbarProps {
  state: AppState;
  activeTab: 'tree' | 'lesson' | 'questions' | 'plan';
  setActiveTab: (tab: 'tree' | 'lesson' | 'questions' | 'plan') => void;
  onOpenDiagnostic: () => void;
  onOpenEducator: () => void;
  onOpenModelManager?: () => void;
  onOpenHowToUse?: () => void;
}

export function Navbar({ 
  state, 
  activeTab, 
  setActiveTab, 
  onOpenDiagnostic, 
  onOpenEducator,
  onOpenModelManager,
  onOpenHowToUse
}: NavbarProps) {
  const unresolvedQuestionsCount = state.questions.filter((q) => q.status === 'unresolved').length;
  const currentSub = getSubModuleById(state.currentModuleId);
  const isLocalOffline = state.activeModelId !== 'gemini-3.8-flash';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 text-slate-800 shadow-2xs overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 h-12 sm:h-14 flex items-center justify-between gap-1.5 sm:gap-3 w-full min-w-0">
        {/* Brand & Stage Location */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-shrink">
          <button 
            onClick={() => setActiveTab('tree')}
            className="flex items-center gap-1.5 sm:gap-2 group text-left focus:outline-none min-w-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-xs text-white group-hover:scale-105 transition-transform flex-shrink-0 font-bold">
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-extrabold tracking-tight text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors truncate max-w-[130px] xs:max-w-[190px] sm:max-w-none">
                  Dirt to Superintelligence
                </span>
                <span className="hidden xl:inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex-shrink-0">
                  Tech Tree
                </span>
              </div>
              <span className="block text-[10px] text-slate-500 truncate hidden md:block max-w-[220px] lg:max-w-none">
                {currentSub ? `Stage 0${currentSub.stage.stageNumber}: ${currentSub.subModule.title}` : 'The Bootstrapped Civilization Engine'}
              </span>
            </div>
          </button>
        </div>

        {/* Center Navigation Tabs (Hidden on mobile < md to prevent topbar overflow; mobile uses bottom dock) */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 flex-shrink-0">
          <button
            onClick={() => setActiveTab('tree')}
            className={`flex items-center gap-1 lg:gap-1.5 px-2 lg:px-2.5 py-1 lg:py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'tree'
                ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden lg:inline">Tech Tree</span>
            <span className="lg:hidden text-[11px]">Tree</span>
          </button>

          <button
            onClick={() => setActiveTab('lesson')}
            className={`flex items-center gap-1 lg:gap-1.5 px-2 lg:px-2.5 py-1 lg:py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'lesson'
                ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden lg:inline">Classroom</span>
            <span className="lg:hidden text-[11px]">Lesson</span>
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={`relative flex items-center gap-1 lg:gap-1.5 px-2 lg:px-2.5 py-1 lg:py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'questions'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden lg:inline">Questions Hub</span>
            <span className="lg:hidden text-[11px]">Q&A</span>
            {unresolvedQuestionsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-600 text-white animate-pulse">
                {unresolvedQuestionsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('plan')}
            className={`flex items-center gap-1 lg:gap-1.5 px-2 lg:px-2.5 py-1 lg:py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'plan'
                ? 'bg-sky-50 text-sky-900 border border-sky-300 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden lg:inline">My Plan</span>
            <span className="lg:hidden text-[11px]">Plan</span>
          </button>
        </nav>

        {/* Right Stats & Action Controls (Ultra-compact, zero-overflow) */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          {/* AI Model Manager Button */}
          {onOpenModelManager && (
            <button
              onClick={onOpenModelManager}
              className={`flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-lg text-xs font-bold border transition-colors ${
                isLocalOffline
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs'
                  : 'bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 border-indigo-200'
              }`}
              title="Manage local offline AI models & cloud engine"
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
              <span className="hidden sm:inline text-[11px]">
                {isLocalOffline ? 'Offline AI' : 'Gemini Cloud'}
              </span>
            </button>
          )}

          {/* AI Educator Copilot Button */}
          <button
            onClick={onOpenEducator}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-extrabold shadow-2xs transition-transform active:scale-95 flex-shrink-0"
            title="Open Professor Ada (Voice Call / Chat / Copilot)"
          >
            <Bot className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">Ask Ada</span>
            <span className="inline-flex items-center justify-center w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
          </button>

          {/* Daily Streak */}
          <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-amber-700 flex-shrink-0" title="Daily Streak">
            <Flame className="w-3 h-3 text-amber-600 fill-amber-600 flex-shrink-0" />
            <span className="text-[11px]">{state.profile.streakDays}d</span>
          </div>

          {/* How to Use Guide Button */}
          {onOpenHowToUse && (
            <button
              onClick={onOpenHowToUse}
              className="p-1 sm:p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors flex-shrink-0"
              title="How to Use Website (10 Stages, Triads & Labs Guide)"
            >
              <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
            </button>
          )}

          {/* Diagnostic Button */}
          <button
            onClick={onOpenDiagnostic}
            className="p-1 sm:p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors flex-shrink-0"
            title="Settings & Profile Data Deleter"
          >
            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
