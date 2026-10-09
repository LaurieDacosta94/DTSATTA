'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  Search, 
  Send, 
  Sparkles, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Lightbulb, 
  ExternalLink,
  Clock
} from 'lucide-react';
import { AppState } from '@/lib/store';
import { CURRICULUM_STAGES } from '@/lib/curriculumData';

interface QuestionsTriageHubProps {
  state: AppState;
  onAskQuestion: (question: string, moduleId?: string, notes?: string) => Promise<void>;
  onUpdateStatus: (id: string, status: 'unresolved' | 'clarified' | 'mastered', notes?: string) => void;
  onClarifyQuestion: (id: string) => Promise<void>;
  onSelectModuleAndNavigate: (moduleId: string) => void;
}

export function QuestionsTriageHub({
  state,
  onAskQuestion,
  onUpdateStatus,
  onClarifyQuestion,
  onSelectModuleAndNavigate,
}: QuestionsTriageHubProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'unresolved' | 'mastered'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState(state.currentModuleId);
  const [notesInput, setNotesInput] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [clarifyingId, setClarifyingId] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || isAsking) return;
    setIsAsking(true);
    try {
      await onAskQuestion(newQuestionText.trim(), selectedModuleId, notesInput.trim());
      setNewQuestionText('');
      setNotesInput('');
    } finally {
      setIsAsking(false);
    }
  };

  const handleDeepClarify = async (questionId: string) => {
    if (clarifyingId) return;
    setClarifyingId(questionId);
    try {
      await onClarifyQuestion(questionId);
      setExpandedCards(prev => ({ ...prev, [questionId]: true }));
    } finally {
      setClarifyingId(null);
    }
  };

  const filteredQuestions = state.questions.filter((q) => {
    const matchesFilter = filterStatus === 'all' || q.status === filterStatus;
    const matchesSearch = 
      searchQuery === '' ||
      q.userQuestion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.moduleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.stageTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unresolvedCount = state.questions.filter(q => q.status === 'unresolved').length;
  const masteredCount = state.questions.filter(q => q.status === 'mastered').length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 font-sans">
      {/* Header Banner: Compact Light Theme */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-50/70 via-white to-emerald-50/40 border border-emerald-200 p-5 sm:p-6 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 border border-emerald-200 text-emerald-900">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            Core Law: No Unanswered Questions Left Behind
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold shadow-2xs">
              {masteredCount} Mastered
            </span>
            <span className={`px-2 py-0.5 rounded-md border font-bold ${
              unresolvedCount > 0 
                ? 'bg-emerald-100 border-emerald-300 text-emerald-900 animate-pulse'
                : 'bg-white border-slate-200 text-slate-400'
            }`}>
              {unresolvedCount} In Progress
            </span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Questions Notebook & Socratic Triage
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
          Every question logged here is deconstructed into first-principles stepping stones. Revisit anytime until marked Mastered (+50 XP).
        </p>
      </div>

      {/* Ask Question Form */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Ask the AI Tutor
          </h2>
          <span className="text-[11px] text-slate-400">First-Principles Deconstruction</span>
        </div>

        <form onSubmit={handleAskSubmit} className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Curriculum Node
              </label>
              <select
                value={selectedModuleId}
                onChange={(e) => setSelectedModuleId(e.target.value)}
                className="w-full py-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
              >
                {CURRICULUM_STAGES.flatMap(s => s.subModules).map(sub => (
                  <option key={sub.id} value={sub.id}>
                    {sub.id} {sub.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Your Question or Point of Confusion
              </label>
              <input
                type="text"
                placeholder="e.g. Why can't two rubbed plates make a flat surface?"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                className="w-full py-1.5 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <input
              type="text"
              placeholder="Optional: What is your current intuition? (Helps AI pinpoint your misunderstanding)"
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              className="flex-1 py-1.5 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={!newQuestionText.trim() || isAsking}
              className={`py-1.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                newQuestionText.trim() && !isAsking
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isAsking ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deconstructing...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Ask & Save
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search your logged questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs shadow-2xs">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              filterStatus === 'all'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({state.questions.length})
          </button>
          <button
            onClick={() => setFilterStatus('unresolved')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              filterStatus === 'unresolved'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            In Progress ({unresolvedCount})
          </button>
          <button
            onClick={() => setFilterStatus('mastered')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              filterStatus === 'mastered'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mastered ({masteredCount})
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-10 px-4 bg-white rounded-xl border border-slate-200 text-slate-500 space-y-1.5 shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm">No Questions in This Filter</h3>
            <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
              All questions resolved or clear. Ask new questions whenever any concept feels fuzzy!
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedCards[q.id] ?? true;
            const isMastered = q.status === 'mastered';

            return (
              <div
                key={q.id}
                className={`rounded-xl border transition-all ${
                  isMastered
                    ? 'bg-slate-50/50 border-slate-200'
                    : 'bg-white border-slate-200/90 shadow-xs'
                }`}
              >
                {/* Question Header */}
                <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                        Node {q.moduleId}
                      </span>
                      <button
                        onClick={() => onSelectModuleAndNavigate(q.moduleId)}
                        className="text-xs text-slate-500 hover:text-amber-700 flex items-center gap-1 transition-colors"
                      >
                        {q.moduleTitle}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 pt-0.5">
                      &ldquo;{q.userQuestion}&rdquo;
                    </h3>
                  </div>

                  {/* Actions & Status Button */}
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <button
                      onClick={() => onUpdateStatus(q.id, isMastered ? 'unresolved' : 'mastered')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-all ${
                        isMastered
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                      }`}
                    >
                      {isMastered ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          Mastered (+50 XP)
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-slate-500" />
                          Mark Mastered
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Question Body */}
                {isExpanded && (
                  <div className="p-3.5 sm:p-4 space-y-3 text-xs text-slate-700">
                    {q.answerData && (
                      <div className="space-y-2.5">
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                            <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                            Intuitive Direct Explanation
                          </div>
                          <p className="text-slate-800 leading-relaxed text-xs">
                            {q.answerData.directAnswer}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-0.5">
                            <strong className="text-amber-800">Why this matters: </strong>
                            <p className="text-slate-600">{q.answerData.whyThisMatters}</p>
                          </div>

                          <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-0.5">
                            <strong className="text-sky-800">Prerequisite check: </strong>
                            <p className="text-slate-600">{q.answerData.prerequisiteCheck}</p>
                          </div>
                        </div>

                        {q.answerData.steppingStones && q.answerData.steppingStones.length > 0 && (
                          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                            <span className="text-[11px] font-bold text-slate-800">
                              Stepping Stones (Deconstructed Checks):
                            </span>
                            <ul className="space-y-1 text-slate-600 text-[11px]">
                              {q.answerData.steppingStones.map((stone, sIdx) => (
                                <li key={sIdx} className="flex items-start gap-1.5">
                                  <span className="text-emerald-600 font-bold">✓</span>
                                  <span>{stone}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Deep Clarification Data */}
                    {q.clarificationData && (
                      <div className="p-3 rounded-lg bg-indigo-50/50 border border-indigo-200 space-y-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-900 uppercase tracking-wider">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          Alternate Angle: The &ldquo;Aha!&rdquo; Metaphor
                        </div>
                        <p className="text-xs text-indigo-950 italic">
                          &ldquo;{q.clarificationData.freshMetaphor}&rdquo;
                        </p>
                        <div className="text-[11px] text-slate-700">
                          <strong>Aha Moment: </strong> {q.clarificationData.theAhaMoment}
                        </div>
                      </div>
                    )}

                    {/* Bottom Card Bar */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 text-[11px]">
                      <div className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Logged {new Date(q.timestamp).toLocaleDateString()}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {!q.clarificationData && (
                          <button
                            onClick={() => handleDeepClarify(q.id)}
                            disabled={clarifyingId === q.id}
                            className="px-2.5 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3 text-indigo-600" />
                            Deep Clarify with Ada
                          </button>
                        )}

                        <button
                          onClick={() => onSelectModuleAndNavigate(q.moduleId)}
                          className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <BookOpen className="w-3 h-3 text-amber-600" />
                          Open Lesson
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
