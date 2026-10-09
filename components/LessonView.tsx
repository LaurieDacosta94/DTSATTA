'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  Send, 
  Award, 
  AlertCircle, 
  BookOpen, 
  Sliders, 
  Layers, 
  Check, 
  X,
  Share2,
  Bot
} from 'lucide-react';
import { SubModule, Stage, CURRICULUM_STAGES, getSubModuleById } from '@/lib/curriculumData';
import { AppState, StudentQuestion } from '@/lib/store';
import { InteractiveLabView } from './InteractiveLabView';
import { VoiceNarrator } from './VoiceNarrator';
import { ModuleSchematic } from './ModuleSchematic';

interface LessonViewProps {
  currentModuleId: string;
  state: AppState;
  onSelectModule: (moduleId: string) => void;
  onRecordProgress: (moduleId: string, updates: Record<string, unknown>, xp: number) => void;
  onAskQuestion: (question: string) => Promise<void>;
  onNavigateToQuestions: () => void;
  onShareWithEducator?: (activity: { type: 'module' | 'lab'; title: string; details: string }) => void;
}

export function LessonView({
  currentModuleId,
  state,
  onSelectModule,
  onRecordProgress,
  onAskQuestion,
  onNavigateToQuestions,
  onShareWithEducator,
}: LessonViewProps) {
  const current = getSubModuleById(currentModuleId);
  const [activePillarTab, setActivePillarTab] = useState<'tooling' | 'automation' | 'selfOrganization'>('tooling');

  // Inline question ask state
  const [questionInput, setQuestionInput] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [inlineAskSuccess, setInlineAskSuccess] = useState(false);
  const [latestInlineAnswer, setLatestInlineAnswer] = useState<StudentQuestion['answerData'] | null>(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Feynman Technique state
  const [feynmanText, setFeynmanText] = useState('');
  const [isEvaluatingFeynman, setIsEvaluatingFeynman] = useState(false);
  const [feynmanResult, setFeynmanResult] = useState<{
    score: number;
    verdict: string;
    whatYouNailed: string;
    whatNeedsWork: string;
    mentorInsight: string;
    encouragement: string;
  } | null>(null);

  if (!current) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
        Module not found. Please return to the Tech Tree.
      </div>
    );
  }

  const { stage, subModule } = current;
  const progress = state.progress[subModule.id] || { labCompleted: false, quizScore: 0, feynmanPassed: false };

  // Contextual Beginner Question Suggestions
  const getSuggestedQuestions = () => {
    switch (subModule.stageNumber) {
      case 1:
        return [
          "Why can't wood campfires melt iron even if you make them huge?",
          "What stops the clay blast nozzle (tuyère) from melting?",
          "What is the difference between wrought iron bloom and cast iron?"
        ];
      case 2:
        return [
          "Why do two rubbed plates form concave/convex spheres instead of flat planes?",
          "Why was lead used for sulfuric acid when it reacts with other things?",
          "How did James Watt's spinning balls keep an engine from blowing up?"
        ];
      case 3:
        return [
          "How does a chemical battery pump electrons without losing weight quickly?",
          "Why does an electromagnet relay count as a digital repeater?",
          "What is the physical difference between voltage and current?"
        ];
      case 4:
        return [
          "How does an empty glass tube let electrons fly at light speed?",
          "Why did early computers require thousands of hot vacuum tubes?",
          "How can a mesh of wire with negative voltage block electrons?"
        ];
      case 5:
        return [
          "Why does silicon have to be a 'single crystal' with zero defects?",
          "How can light print wires smaller than a dust particle?",
          "Why does CMOS draw almost zero power when sitting idle?"
        ];
      case 6:
        return [
          "How did the first computer program boot up before an OS existed?",
          "Why does a CPU need a Tri-State buffer on its bus?",
          "What happens during an OS preemptive context switch?"
        ];
      case 7:
        return [
          "How does an optical glass encoder measure millionths of a millimeter?",
          "Why is Extreme Ultraviolet light absorbed by normal room air?"
        ];
      case 8:
        return [
          "Why is a systolic array compared to a human bucket brigade?",
          "What is the memory wall in modern deep learning hardware?"
        ];
      case 9:
        return [
          "How can an AI become superhuman without human internet data?",
          "What is domain randomization in robot simulation?"
        ];
      case 10:
      default:
        return [
          "What is the closed-loop Von Neumann self-replication cycle?",
          "How does a harmonic strain-wave drive eliminate gear backlash?"
        ];
    }
  };

  // Sequence navigation
  const allSubModules: { stage: Stage; sub: SubModule }[] = [];
  CURRICULUM_STAGES.forEach(s => {
    s.subModules.forEach(sub => allSubModules.push({ stage: s, sub }));
  });
  const currentIndex = allSubModules.findIndex(item => item.sub.id === subModule.id);
  const prevModule = currentIndex > 0 ? allSubModules[currentIndex - 1] : null;
  const nextModule = currentIndex < allSubModules.length - 1 ? allSubModules[currentIndex + 1] : null;

  const handleInlineAsk = async (textToAsk?: string) => {
    const q = textToAsk || questionInput.trim();
    if (!q || isAsking) return;
    setIsAsking(true);
    setInlineAskSuccess(false);
    try {
      await onAskQuestion(q);
      const lastQ = state.questions[0];
      if (lastQ && lastQ.answerData) {
        setLatestInlineAnswer(lastQ.answerData);
      }
      setQuestionInput('');
      setInlineAskSuccess(true);
    } finally {
      setIsAsking(false);
    }
  };

  const handleQuizSubmit = () => {
    let correctCount = 0;
    subModule.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.answerIndex) {
        correctCount += 1;
      }
    });
    const scorePct = Math.round((correctCount / subModule.quiz.length) * 100);
    setQuizSubmitted(true);
    onRecordProgress(subModule.id, { quizScore: scorePct }, scorePct >= 80 ? 40 : 15);
  };

  const handleFeynmanSubmit = async () => {
    if (!feynmanText.trim() || isEvaluatingFeynman) return;
    setIsEvaluatingFeynman(true);
    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'evaluate_feynman',
          payload: {
            promptTopic: subModule.feynmanPrompt,
            studentExplanation: feynmanText,
            moduleTitle: subModule.title,
            stageTitle: stage.title,
          }
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setFeynmanResult(data.data);
        const passed = (data.data.score ?? 0) >= 70;
        onRecordProgress(subModule.id, { feynmanPassed: passed, feynmanScore: data.data.score }, passed ? 60 : 20);
      }
    } catch (e) {
      console.error("Feynman evaluation failed:", e);
    } finally {
      setIsEvaluatingFeynman(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 font-sans">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <button
            onClick={() => onSelectModule(subModule.id)}
            className="hover:text-amber-700 transition-colors uppercase font-bold text-amber-700"
          >
            Stage 0{stage.stageNumber}: {stage.title}
          </button>
          <span>/</span>
          <span className="text-slate-700 font-semibold">Node {subModule.id}</span>
        </div>

        <div className="flex items-center gap-2">
          {onShareWithEducator && (
            <button
              onClick={() => onShareWithEducator({
                type: 'module',
                title: `${subModule.id}: ${subModule.title}`,
                details: `Artifact: ${subModule.keyArtifactUnlocked}. Bottleneck: ${subModule.whyDirtCantDoThisYet}`,
              })}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors shadow-2xs"
            >
              <Share2 className="w-3 h-3 text-amber-600" />
              Share Screen with Ada
            </button>
          )}

          <VoiceNarrator 
            textToRead={`${subModule.title}. ${subModule.beginnerIntuition}. ${subModule.triadPillars.tooling.description}. ${subModule.triadPillars.automation.description}`}
          />
        </div>
      </div>

      {/* Module Title Header */}
      <div className="space-y-2 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-amber-700">
            Node {subModule.id}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            🔑 Artifact: <strong className="text-slate-800">{subModule.keyArtifactUnlocked}</strong>
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
          {subModule.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {subModule.shortSummary}
        </p>
      </div>

      {/* ELI5 Complete Beginner Intuition Box (Light Theme) */}
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 p-4 sm:p-5 space-y-2.5 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900">
          <Sparkles className="w-4 h-4 text-amber-600" />
          First-Principles Intuition (For Complete Beginners)
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {subModule.beginnerIntuition}
        </p>

        <div className="pt-2 border-t border-amber-200/80 text-xs text-slate-600 flex items-start gap-1.5">
          <span className="font-bold text-rose-700 flex-shrink-0">The Bottleneck:</span>
          <span>{subModule.whyDirtCantDoThisYet}</span>
        </div>
      </div>

      {/* The Three Triad Pillars */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-600" />
            The Three Triad Pillars at This Stage
          </h2>
          <span className="text-[11px] text-slate-400">All 3 are mandatory to advance</span>
        </div>

        {/* Pillar Switcher Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setActivePillarTab('tooling')}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
              activePillarTab === 'tooling'
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>🔨</span>
            <span className="hidden sm:inline">1. Tooling</span>
            <span className="sm:hidden">1. Tools</span>
          </button>
          <button
            onClick={() => setActivePillarTab('automation')}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
              activePillarTab === 'automation'
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>⚙️</span>
            <span className="hidden sm:inline">2. Automated Loops</span>
            <span className="sm:hidden">2. Loops</span>
          </button>
          <button
            onClick={() => setActivePillarTab('selfOrganization')}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
              activePillarTab === 'selfOrganization'
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>🏛️</span>
            <span className="hidden sm:inline">3. Governance</span>
            <span className="sm:hidden">3. Rules</span>
          </button>
        </div>

        {/* Active Pillar Card Content */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 space-y-3 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 className="font-bold text-xs sm:text-sm text-slate-900">
              {subModule.triadPillars[activePillarTab].title}
            </h3>
            <span className="text-[11px] text-slate-500 italic">
              {subModule.triadPillars[activePillarTab].description}
            </span>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700">
            {subModule.triadPillars[activePillarTab].items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Physical Mechanism Schematic */}
      <ModuleSchematic moduleId={subModule.id} moduleTitle={subModule.title} />

      {/* Deep Dive Walkthrough */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-amber-600" />
          First-Principles Engineering Deep Dive
        </h2>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3 whitespace-pre-line shadow-xs">
          {subModule.deepDiveMarkdown}
        </div>

        {/* Common Misconceptions */}
        <div className="bg-rose-50/50 rounded-xl border border-rose-200 p-3.5 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-rose-800 text-[11px]">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            Common Beginner Traps & Misconceptions
          </div>
          <ul className="space-y-1 text-slate-700">
            {subModule.commonMisconceptions.map((misc, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-rose-600 font-bold">✕</span>
                <span>{misc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Hands-On Lab Simulation */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-amber-600" />
            Interactive Lab Challenge
          </h2>
          <span className="text-[11px] text-slate-400">Real-Time Feedback</span>
        </div>

        <InteractiveLabView
          subModule={subModule}
          isCompleted={progress.labCompleted}
          onComplete={() => onRecordProgress(subModule.id, { labCompleted: true }, 50)}
          onShareWithEducator={onShareWithEducator}
        />
      </div>

      {/* Check for Understanding: Quiz */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            <h2 className="text-xs sm:text-sm font-bold text-slate-900">
              Checkpoint Knowledge Quiz
            </h2>
          </div>
          {quizSubmitted && (
            <span className="text-xs font-mono font-bold text-emerald-700">
              Score: {progress.quizScore}%
            </span>
          )}
        </div>

        <div className="space-y-4">
          {subModule.quiz.map((q, qIdx) => {
            const selectedOpt = quizAnswers[qIdx];
            const isCorrect = selectedOpt === q.answerIndex;

            return (
              <div key={qIdx} className="space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-slate-800">
                  {qIdx + 1}. {q.question}
                </p>
                <div className="space-y-1.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    let optStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";

                    if (quizSubmitted) {
                      if (optIdx === q.answerIndex) {
                        optStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold";
                      } else if (isSelected && !isCorrect) {
                        optStyle = "bg-rose-50 border-rose-400 text-rose-900";
                      }
                    } else if (isSelected) {
                      optStyle = "bg-amber-100 border-amber-500 text-amber-950 font-semibold";
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                        className={`w-full p-2.5 rounded-lg border text-xs text-left transition-all flex items-center justify-between ${optStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && optIdx === q.answerIndex && (
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        )}
                        {quizSubmitted && isSelected && !isCorrect && (
                          <X className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <strong className="text-amber-800">Explanation: </strong> {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {!quizSubmitted && (
          <button
            onClick={handleQuizSubmit}
            disabled={Object.keys(quizAnswers).length < subModule.quiz.length}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              Object.keys(quizAnswers).length === subModule.quiz.length
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            Submit Quiz Answers
          </button>
        )}
      </div>

      {/* Feynman Technique AI Challenge */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h2 className="text-xs sm:text-sm font-bold text-slate-900">
              Feynman Technique AI Challenge
            </h2>
          </div>
          <span className="text-[11px] text-amber-700 font-semibold">Real-Time Evaluation</span>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs font-semibold text-amber-900">
          Prompt: &ldquo;{subModule.feynmanPrompt}&rdquo;
        </div>

        <textarea
          rows={3}
          placeholder="Explain in your own words. Use simple analogies like water, heat, rocks, or pipes..."
          value={feynmanText}
          onChange={(e) => setFeynmanText(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
        />

        <button
          onClick={handleFeynmanSubmit}
          disabled={!feynmanText.trim() || isEvaluatingFeynman}
          className={`py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
            feynmanText.trim() && !isEvaluatingFeynman
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs cursor-pointer'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isEvaluatingFeynman ? (
            <>
              <div className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              Grading with Professor Ada...
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              Submit Explanation for AI Feedback
            </>
          )}
        </button>

        {feynmanResult && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Feynman Evaluation</span>
              <span className={`font-mono font-bold ${feynmanResult.score >= 70 ? 'text-emerald-700' : 'text-amber-700'}`}>
                {feynmanResult.score}/100 ({feynmanResult.verdict})
              </span>
            </div>

            <p className="text-slate-700"><strong className="text-emerald-700">What you nailed: </strong>{feynmanResult.whatYouNailed}</p>
            {feynmanResult.whatNeedsWork && (
              <p className="text-slate-700"><strong className="text-amber-800">Nuance to sharpen: </strong>{feynmanResult.whatNeedsWork}</p>
            )}
            <p className="text-slate-700 pt-1 border-t border-slate-200"><strong className="text-sky-800">Mentor Insight: </strong>{feynmanResult.mentorInsight}</p>
          </div>
        )}
      </div>

      {/* Inline AI Tutor: "No Unanswered Questions Left Behind" */}
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50/60 via-white to-emerald-50/40 p-4 sm:p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs sm:text-sm font-bold text-slate-900">
              No Unanswered Questions Left Behind
            </h2>
          </div>
          <button
            onClick={onNavigateToQuestions}
            className="text-xs text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-semibold"
          >
            Notebook ({state.questions.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Suggested Beginner Questions Chips */}
        <div className="flex flex-wrap items-center gap-1 pt-1">
          <span className="text-[11px] text-slate-500 font-semibold mr-1">
            Common questions:
          </span>
          {getSuggestedQuestions().map((sq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleInlineAsk(sq)}
              disabled={isAsking}
              className="text-[11px] px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 transition-colors cursor-pointer shadow-2xs"
            >
              &ldquo;{sq}&rdquo;
            </button>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleInlineAsk(); }} className="flex gap-2">
          <input
            type="text"
            placeholder={`Ask anything about ${subModule.title}...`}
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            className="flex-1 py-2 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
          />
          <button
            type="submit"
            disabled={!questionInput.trim() || isAsking}
            className={`py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
              questionInput.trim() && !isAsking
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isAsking ? (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            Ask
          </button>
        </form>

        {inlineAskSuccess && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Answer saved to your Unresolved Notebook!
            </span>
            <button
              onClick={onNavigateToQuestions}
              className="font-bold underline text-emerald-800 hover:text-emerald-950"
            >
              Review All
            </button>
          </div>
        )}

        {/* Live Answer Card Inline */}
        {latestInlineAnswer && (
          <div className="p-4 rounded-xl bg-white border border-emerald-300 space-y-2 mt-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Professor Ada&apos;s Intuitive Answer
              </span>
              <button
                onClick={() => setLatestInlineAnswer(null)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                Dismiss
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              {latestInlineAnswer.directAnswer}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <strong className="text-amber-800">Why this matters: </strong>
                <span className="text-slate-600">{latestInlineAnswer.whyThisMatters}</span>
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <strong className="text-sky-800">Prerequisite check: </strong>
                <span className="text-slate-600">{latestInlineAnswer.prerequisiteCheck}</span>
              </div>
            </div>

            {latestInlineAnswer.socraticCheck && (
              <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                <strong>Quick Socratic Check: </strong>
                {latestInlineAnswer.socraticCheck}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Sequence Navigation */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        {prevModule ? (
          <button
            onClick={() => onSelectModule(prevModule.sub.id)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-amber-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev: {prevModule.sub.id} {prevModule.sub.title}</span>
          </button>
        ) : <div />}

        {nextModule && (
          <button
            onClick={() => onSelectModule(nextModule.sub.id)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-amber-700 transition-colors ml-auto"
          >
            <span>Next: {nextModule.sub.id} {nextModule.sub.title}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
