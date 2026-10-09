'use client';

import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  Calendar, 
  Download, 
  Flame, 
  Award, 
  Check, 
  RefreshCw 
} from 'lucide-react';
import { AppState, PersonalizedPlan } from '@/lib/store';
import { CURRICULUM_STAGES, TOTAL_MODULES_COUNT } from '@/lib/curriculumData';

interface PersonalizedPlanViewProps {
  state: AppState;
  onSavePlan: (plan: PersonalizedPlan) => void;
  onUpdateProfile: (updates: Record<string, unknown>) => void;
}

export function PersonalizedPlanView({
  state,
  onSavePlan,
  onUpdateProfile,
}: PersonalizedPlanViewProps) {
  const [goal, setGoal] = useState(state.profile.goal);
  const [background, setBackground] = useState(state.profile.background);
  const [dailyMinutes, setDailyMinutes] = useState(state.profile.dailyMinutes);
  const [learningStyle, setLearningStyle] = useState(state.profile.learningStyle);
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportedCopied, setExportedCopied] = useState(false);

  const completedCount = Object.keys(state.progress).filter(
    (k) => state.progress[k]?.labCompleted || state.progress[k]?.feynmanPassed || (state.progress[k]?.quizScore ?? 0) >= 80
  ).length;

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_plan',
          payload: {
            userGoal: goal,
            background,
            dailyMinutes,
            learningStyle,
          }
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        onSavePlan(data.data);
        onUpdateProfile({ goal, background, dailyMinutes, learningStyle });
      }
    } catch (e) {
      console.error("Failed to generate plan:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportFieldGuide = () => {
    let guide = `# Civilization Reboot Field Guide: Dirt to Superintelligence\n`;
    guide += `Generated for: ${state.profile.name} | Mastery XP: ${state.profile.totalXp} | Modules Completed: ${completedCount}/${TOTAL_MODULES_COUNT}\n\n`;
    guide += `## Core Bootstrapping Philosophy\n`;
    guide += `Zero-to-AI Survival & Reconstruction: Precision, Purity, and Heat Cascades.\n`;
    guide += `The Triad at Every Stage: 1. Tooling & Crafting | 2. Automation Mechanics | 3. Self-Organization.\n\n`;

    CURRICULUM_STAGES.forEach(s => {
      guide += `### Stage ${s.stageNumber}: ${s.title} (${s.subtitle})\n`;
      s.subModules.forEach(sub => {
        const isDone = state.progress[sub.id]?.labCompleted ? ' [COMPLETED]' : ' [UNLOCKED]';
        guide += `#### ${sub.id} ${sub.title}${isDone}\n`;
        guide += `- Beginner Intuition: ${sub.beginnerIntuition}\n`;
        guide += `- Key Artifact Unlocked: ${sub.keyArtifactUnlocked}\n`;
        guide += `- Needed Tools: ${sub.triadPillars.tooling.items.join(', ')}\n`;
        guide += `- Automated Loops: ${sub.triadPillars.automation.items.join(', ')}\n`;
        guide += `- Self-Organization: ${sub.triadPillars.selfOrganization.items.join(', ')}\n\n`;
      });
    });

    navigator.clipboard.writeText(guide);
    setExportedCopied(true);
    setTimeout(() => setExportedCopied(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 font-sans">
      {/* Top Banner: Compact Light Theme */}
      <div className="rounded-2xl bg-gradient-to-r from-sky-50/70 via-white to-sky-50/40 border border-sky-200 p-5 sm:p-6 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 border border-sky-200 text-sky-900">
            <Target className="w-3.5 h-3.5 text-sky-700" />
            Adaptive Pacing & Custom Syllabus
          </div>
          <button
            onClick={handleExportFieldGuide}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
          >
            {exportedCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Copied Markdown!
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-sky-600" />
                Export Field Guide
              </>
            )}
          </button>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Personalized Lesson Plan & Academy Metrics
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
          Customize your progression from dirt to superintelligence. Professor Ada adapts milestones based on your available study time and background.
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Mastery XP</div>
            <div className="text-lg font-black text-amber-700 font-mono mt-0.5">{state.profile.totalXp}</div>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Daily Streak</div>
            <div className="text-lg font-black text-amber-600 font-mono mt-0.5 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-amber-600" />
              {state.profile.streakDays}d
            </div>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Modules Mastered</div>
            <div className="text-lg font-black text-emerald-700 font-mono mt-0.5">
              {completedCount} / {TOTAL_MODULES_COUNT}
            </div>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Questions Mastered</div>
            <div className="text-lg font-black text-sky-700 font-mono mt-0.5">
              {state.questions.filter(q => q.status === 'mastered').length}
            </div>
          </div>
        </div>
      </div>

      {/* Plan Diagnostic Configurator */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 space-y-3.5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-600" />
            Diagnostic Questionnaire (Tailor My Curriculum)
          </h2>
          <span className="text-[11px] text-slate-400">AI-Powered Roadmap</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Primary Goal / Focus
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full py-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-sky-500"
            >
              <option value="Complete Zero-to-AI Reconstruction">Complete Zero-to-AI Reconstruction (All 10 Stages)</option>
              <option value="Hardware, Silicon & Precision Deep Dive">Hardware, Silicon & Precision Deep Dive (Stages 1 - 7)</option>
              <option value="Synthetic AI, World Models & Autonomous Robotics">Synthetic AI, World Models & Autonomous Robotics (Stages 8 - 10)</option>
              <option value="Primitive & Mechanical Survivalist Rebuilder">Primitive & Mechanical Survivalist Rebuilder (Stages 1 - 4)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Student Background
            </label>
            <select
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-full py-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-sky-500"
            >
              <option value="Complete Beginner (Zero prior engineering)">Complete Beginner (Zero prior engineering)</option>
              <option value="Software Developer / Programmer">Software Developer / Programmer</option>
              <option value="Electronics / DIY Hobbyist">Electronics / DIY Hobbyist</option>
              <option value="STEM / Physics Student">STEM / Physics Student</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Daily Commitment: {dailyMinutes} mins/day
            </label>
            <input
              type="range"
              min="15"
              max="60"
              step="5"
              value={dailyMinutes}
              onChange={(e) => setDailyMinutes(Number(e.target.value))}
              className="w-full accent-sky-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>15 min</span>
              <span>25 min (Recommended)</span>
              <span>60 min</span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Learning Style
            </label>
            <select
              value={learningStyle}
              onChange={(e) => setLearningStyle(e.target.value)}
              className="w-full py-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-sky-500"
            >
              <option value="First-Principles Deep Dive">First-Principles Deep Dive (Physical intuitions)</option>
              <option value="Hands-on Labs First">Hands-on Labs First (Simulation experiments)</option>
              <option value="Feynman Mastery Sprint">Feynman Mastery Sprint (Self-explanation)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGeneratePlan}
          disabled={isGenerating}
          className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all"
        >
          {isGenerating ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating Custom Roadmap with Ada...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              Generate / Update My Roadmap
            </>
          )}
        </button>
      </div>

      {/* Active Personalized Plan Display */}
      {state.plan && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2.5">
            <div>
              <span className="text-[10px] uppercase font-bold text-sky-700">Active Syllabus</span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                {state.plan.planTitle}
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              <span>{state.plan.estimatedWeeks} Weeks Roadmap</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {state.plan.summary}
          </p>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <strong className="text-amber-800">Daily Routine: </strong>
            <span className="text-slate-700">{state.plan.dailyRoutine}</span>
          </div>

          {/* Weekly Milestones */}
          <div className="space-y-2.5">
            <h3 className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">
              Roadmap Milestones & Capstone Challenges
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {state.plan.milestones.map((m) => (
                <div key={m.week} className="p-3 rounded-lg bg-slate-50/70 border border-slate-200 space-y-1 text-xs">
                  <span className="font-mono font-bold text-sky-800">Week {m.week}: {m.focusStages}</span>
                  <p className="font-medium text-slate-800">{m.coreGoal}</p>
                  <div className="pt-1 border-t border-slate-200/80 text-[11px] text-amber-800 flex items-start gap-1">
                    <Award className="w-3 h-3 flex-shrink-0 mt-0.5 text-amber-600" />
                    <span>Capstone: {m.capstoneChallenge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
