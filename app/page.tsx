'use client';

import React, { useState } from 'react';
import { 
  Navbar 
} from '@/components/Navbar';
import { 
  TechTreeView 
} from '@/components/TechTreeView';
import { 
  LessonView 
} from '@/components/LessonView';
import { 
  QuestionsTriageHub 
} from '@/components/QuestionsTriageHub';
import { 
  PersonalizedPlanView 
} from '@/components/PersonalizedPlanView';
import { 
  AIEducatorDrawer 
} from '@/components/AIEducatorDrawer';
import { 
  LocalModelManagerModal 
} from '@/components/LocalModelManagerModal';
import { 
  HowToUseModal 
} from '@/components/HowToUseModal';
import { 
  useTechTreeStore,
  ChatMessage
} from '@/lib/store';
import { 
  getSubModuleById 
} from '@/lib/curriculumData';
import { 
  getOfflineLocalModelResponse 
} from '@/lib/localModelManager';
import { 
  GraduationCap, 
  X, 
  Sparkles,
  Bot,
  Compass,
  BookOpen,
  HelpCircle,
  Target,
  Cpu,
  Trash2,
  AlertTriangle,
  Check,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';

export default function HomePage() {
  const {
    state,
    loaded,
    setCurrentModule,
    addQuestion,
    updateQuestionStatus,
    setQuestionClarification,
    recordModuleProgress,
    savePersonalizedPlan,
    updateProfile,
    addChatMessage,
    updateTeacherMemory,
    setActiveModel,
    setAutoSpeakChat,
    updateLocalModels,
    clearChatMessages,
    clearQuestions,
    clearProgress,
    resetProfileData,
    resetAllData,
  } = useTechTreeStore();

  const [activeTab, setActiveTab] = useState<'tree' | 'lesson' | 'questions' | 'plan'>('tree');
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState(false);
  const [isEducatorDrawerOpen, setIsEducatorDrawerOpen] = useState(false);
  const [isModelManagerOpen, setIsModelManagerOpen] = useState(false);
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);
  const [deleteConfirmType, setDeleteConfirmType] = useState<'all' | 'chat' | 'questions' | 'progress' | null>(null);
  const [deleteSuccessNotice, setDeleteSuccessNotice] = useState<string | null>(null);

  // Global question asking handler
  const handleAskQuestion = async (userQuestion: string, moduleId?: string, notes?: string) => {
    const targetModuleId = moduleId || state.currentModuleId;
    const moduleInfo = getSubModuleById(targetModuleId);

    const moduleTitle = moduleInfo ? moduleInfo.subModule.title : "Curriculum Concept";
    const stageTitle = moduleInfo ? `Stage 0${moduleInfo.stage.stageNumber}: ${moduleInfo.stage.title}` : "Tech Tree";

    // If active model is offline local model, answer locally without network
    if (state.activeModelId !== 'gemini-3.8-flash') {
      const offlineRes = getOfflineLocalModelResponse(userQuestion, state.activeModelId, moduleTitle, targetModuleId);
      addQuestion({
        moduleId: targetModuleId,
        moduleTitle,
        stageTitle,
        userQuestion,
        studentNotes: notes,
        answerData: {
          directAnswer: offlineRes.replyText,
          whyThisMatters: "Derived directly from local offline reasoning weights.",
          prerequisiteCheck: "Bootstrapped foundational knowledge.",
          steppingStones: [
            "What raw material does this node require?",
            "How does feedback prevent drift in this mechanism?"
          ],
          socraticCheck: "Can you explain this step without relying on uninvented tools?",
          suggestedFollowUp: "What comes immediately next in the technological hierarchy?"
        }
      });
      return;
    }

    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ask_question',
          payload: {
            question: userQuestion,
            currentModuleId: targetModuleId,
            moduleTitle,
            stageTitle,
            studentNotes: notes,
          }
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        addQuestion({
          moduleId: targetModuleId,
          moduleTitle,
          stageTitle,
          userQuestion,
          studentNotes: notes,
          answerData: json.data,
        });
      } else {
        addQuestion({
          moduleId: targetModuleId,
          moduleTitle,
          stageTitle,
          userQuestion,
          studentNotes: notes,
          answerData: {
            directAnswer: "Every advanced machine in this tree starts from a simpler physical ancestor. By mastering heat, flatness, and wire drawing first, you unlock the ability to manipulate electrons and autonomous robots.",
            whyThisMatters: "Direct link in the bootstrapped technological hierarchy.",
            prerequisiteCheck: "Solid foundation!",
            steppingStones: [
              "What is the simplest physical tool you need before building this?",
              "How does negative feedback keep this system stable?"
            ],
            socraticCheck: "Can this technology function without electrical energy from earlier stages?",
            suggestedFollowUp: "What is the primary physical bottleneck of this stage?"
          }
        });
      }
    } catch (e) {
      console.error("Error asking question:", e);
      addQuestion({
        moduleId: targetModuleId,
        moduleTitle,
        stageTitle,
        userQuestion,
        studentNotes: notes,
        answerData: {
          directAnswer: "Great question! Even in survival conditions, remember the Bootstrapping Triad: you must have the physical tool, the closed feedback loop, and the standardized rules.",
          whyThisMatters: "Core tech tree principle.",
          prerequisiteCheck: "Check previous stage.",
          steppingStones: ["Identify the material required", "Identify the energy source required"],
          socraticCheck: "How does this prevent human error?",
        }
      });
    }
  };

  // Deep Clarification Handler for Unresolved Questions
  const handleClarifyQuestion = async (questionId: string) => {
    const targetQ = state.questions.find(q => q.id === questionId);
    if (!targetQ) return;

    if (state.activeModelId !== 'gemini-3.8-flash') {
      const offlineRes = getOfflineLocalModelResponse(targetQ.userQuestion, state.activeModelId, targetQ.moduleTitle);
      setQuestionClarification(questionId, {
        freshMetaphor: offlineRes.speechAudioScript || "Imagine starting with clay and charcoal before building silicon wafers.",
        stepByStepBreakdown: [
          "1. Isolate the simplest physical prerequisite.",
          "2. Establish temperature or mechanical alignment.",
          "3. Close the feedback loop."
        ],
        theAhaMoment: "You never need to jump across epochs—every tier creates the tool to make the next tier.",
        verificationQuestions: [
          { q: "What happens if you skip flatness?", expected: "Gears bind and steam leaks." }
        ],
        masteryCheck: "Understood from offline first principles."
      });
      return;
    }

    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'clarify_question',
          payload: {
            unresolvedQuestion: targetQ.userQuestion,
            originalAnswer: targetQ.answerData?.directAnswer || "",
            moduleTitle: targetQ.moduleTitle,
            stageTitle: targetQ.stageTitle,
          }
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setQuestionClarification(questionId, json.data);
      }
    } catch (e) {
      console.error("Clarification error:", e);
    }
  };

  // Agentic Action Execution (AI Educator does all for you on the website!)
  const handleExecuteAgentAction = (action: { type: string; targetModuleId?: string; description?: string }) => {
    if (action.type === 'NAVIGATE' && action.targetModuleId) {
      setCurrentModule(action.targetModuleId);
      setActiveTab('lesson');
    } else if (action.type === 'RUN_LAB') {
      recordModuleProgress(state.currentModuleId, { labCompleted: true }, 60);
    } else if (action.type === 'SOLVE_QUIZ') {
      recordModuleProgress(state.currentModuleId, { quizScore: 100 }, 40);
    } else if (action.type === 'LOG_QUESTION') {
      handleAskQuestion("AI Educator noted student concept to review", state.currentModuleId);
    }
  };

  // Chat message sending with AI Educator agent
  const handleSendChatMessage = async (
    text: string, 
    isVoice = false, 
    sharedActivity?: ChatMessage['sharedActivity']
  ) => {
    // 1. Add student message
    addChatMessage({
      sender: 'user',
      text,
      isVoice,
      sharedActivity,
    });

    const currentSub = getSubModuleById(state.currentModuleId);

    // If active model is an offline local model:
    if (state.activeModelId !== 'gemini-3.8-flash') {
      setTimeout(() => {
        const offlineReply = getOfflineLocalModelResponse(
          text,
          state.activeModelId,
          currentSub ? currentSub.subModule.title : "The Tech Tree"
        );

        addChatMessage({
          sender: 'teacher',
          text: offlineReply.replyText,
          agentAction: offlineReply.agentAction ? {
            type: offlineReply.agentAction.type,
            description: offlineReply.agentAction.description,
            status: 'executed'
          } : undefined
        });

        if (offlineReply.agentAction) {
          handleExecuteAgentAction(offlineReply.agentAction);
        }

        updateTeacherMemory({
          totalInteractions: state.teacherMemory.totalInteractions + 1,
          lastSessionSummary: offlineReply.replyText.slice(0, 140)
        });
      }, 350);
      return;
    }

    // 2. Cloud Query to Gemini Educator Agent
    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'educator_agent',
          payload: {
            userMessage: text,
            teacherMemory: state.teacherMemory,
            activeContext: {
              currentModuleId: state.currentModuleId,
              currentModuleTitle: currentSub ? currentSub.subModule.title : "",
              currentStageTitle: currentSub ? `Stage 0${currentSub.stage.stageNumber}: ${currentSub.stage.title}` : "",
              unresolvedQuestionsCount: state.questions.filter(q => q.status === 'unresolved').length,
              sharedActivity,
            },
            chatHistory: state.chatMessages.slice(-6).map(m => ({
              sender: m.sender,
              text: m.text,
            })),
          }
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        const { replyText, agentAction, teacherObservationUpdate } = data.data;

        // 3. Add teacher response
        addChatMessage({
          sender: 'teacher',
          text: replyText || "I'm with you! Let me guide you through this step.",
          agentAction: agentAction && agentAction.type !== 'NONE' ? {
            type: agentAction.type,
            description: agentAction.description || "Action performed on website",
            status: 'executed',
          } : undefined,
        });

        // 4. If agent action present, execute it autonomously on the website!
        if (agentAction && agentAction.type !== 'NONE') {
          handleExecuteAgentAction(agentAction);
        }

        // 5. Update long-term teacher memory if new observation made
        if (teacherObservationUpdate) {
          updateTeacherMemory({
            observations: [...state.teacherMemory.observations, teacherObservationUpdate],
            lastSessionSummary: replyText.slice(0, 150),
          });
        }
      } else {
        addChatMessage({
          sender: 'teacher',
          text: "I understand! I'm right here beside you. You can ask me to navigate to any stage or explain any mechanism on your screen.",
        });
      }
    } catch (e) {
      console.error("Educator message failed:", e);
      addChatMessage({
        sender: 'teacher',
        text: "I'm right here with you! Let me help you break down this concept into first principles.",
      });
    }
  };

  const handleShareScreenWithAda = (activity: { type: 'module' | 'lab'; title: string; details: string }) => {
    setIsEducatorDrawerOpen(true);
    handleSendChatMessage(
      `Professor Ada, I am currently studying this: "${activity.title}". Can you give me your best intuitive breakdown of what I should do?`,
      false,
      activity
    );
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-sans">
        <div className="flex flex-col items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 animate-spin" />
          <p className="text-[11px] font-mono uppercase tracking-widest text-amber-800 font-bold">Bootstrapping Tech Tree...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900 pb-16 sm:pb-0">
      {/* Top Sticky Navigation (Compact Light Theme) */}
      <Navbar
        state={state}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDiagnostic={() => setIsDiagnosticModalOpen(true)}
        onOpenEducator={() => setIsEducatorDrawerOpen(true)}
        onOpenModelManager={() => setIsModelManagerOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-6 pt-3 sm:pt-5">
        {activeTab === 'tree' && (
          <TechTreeView
            state={state}
            onSelectModule={(id) => setCurrentModule(id)}
            onNavigateToClassroom={() => setActiveTab('lesson')}
            onAskEducator={(prompt) => {
              setIsEducatorDrawerOpen(true);
              handleSendChatMessage(prompt);
            }}
          />
        )}

        {activeTab === 'lesson' && (
          <LessonView
            currentModuleId={state.currentModuleId}
            state={state}
            onSelectModule={(id) => setCurrentModule(id)}
            onRecordProgress={(id, updates, xp) => recordModuleProgress(id, updates, xp)}
            onAskQuestion={handleAskQuestion}
            onNavigateToQuestions={() => setActiveTab('questions')}
            onShareWithEducator={handleShareScreenWithAda}
          />
        )}

        {activeTab === 'questions' && (
          <QuestionsTriageHub
            state={state}
            onAskQuestion={handleAskQuestion}
            onUpdateStatus={(id, status, notes) => updateQuestionStatus(id, status, notes)}
            onClarifyQuestion={handleClarifyQuestion}
            onSelectModuleAndNavigate={(id) => {
              setCurrentModule(id);
              setActiveTab('lesson');
            }}
          />
        )}

        {activeTab === 'plan' && (
          <PersonalizedPlanView
            state={state}
            onSavePlan={savePersonalizedPlan}
            onUpdateProfile={updateProfile}
          />
        )}
      </main>

      {/* Prominent Big Round AI Educator Trigger Button (Desktop & Tablet) */}
      {!isEducatorDrawerOpen && (
        <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-2 group">
          {/* Friendly Floating Badge */}
          <div className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-amber-200/90 text-amber-900 text-xs font-black shadow-md flex items-center gap-1.5 transition-all group-hover:scale-105 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ask Professor Ada</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </div>

          {/* Big Round Ada Chat Button */}
          <button
            onClick={() => setIsEducatorDrawerOpen(true)}
            className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white flex items-center justify-center shadow-2xl shadow-amber-500/40 border-3 border-white ring-4 ring-amber-300/40 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
            title="Open Professor Ada - Voice Call, Text Chat & Autonomous Copilot"
            aria-label="Open Professor Ada AI Educator"
          >
            {/* Ambient Pulsing Aura */}
            <span className="absolute -inset-1.5 rounded-full bg-amber-400/30 animate-pulse pointer-events-none -z-10" />

            {/* Main Bot Icon (Generous, crisp size) */}
            <Bot className="w-8 h-8 sm:w-9 sm:h-9 text-white drop-shadow-md" />

            {/* Online / Ready Indicator */}
            <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center shadow-xs">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </span>
          </button>
        </div>
      )}

      {/* Mobile Nano-Responsive Bottom Dock (320px - 640px) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 flex items-center justify-around shadow-xl text-[10px] font-bold">
        <button
          onClick={() => setActiveTab('tree')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'tree' ? 'text-amber-600 font-extrabold' : 'text-slate-500'}`}
        >
          <Compass className="w-4 h-4" />
          <span>Tree</span>
        </button>

        <button
          onClick={() => setActiveTab('lesson')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'lesson' ? 'text-amber-600 font-extrabold' : 'text-slate-500'}`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Lesson</span>
        </button>

        {/* Big Round Center Ada Button for Mobile */}
        <button
          onClick={() => setIsEducatorDrawerOpen(true)}
          className="flex flex-col items-center gap-0.5 text-amber-700 font-extrabold -mt-6 group focus:outline-none"
          title="Open Professor Ada"
        >
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 border-3 border-white flex items-center justify-center text-white shadow-xl shadow-amber-500/40 transform group-hover:scale-110 active:scale-95 transition-all ring-2 ring-amber-300/40">
            <Bot className="w-7 h-7 drop-shadow-xs" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-pulse" />
          </div>
          <span className="text-[11px] font-black tracking-tight text-amber-800">Ada AI</span>
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'questions' ? 'text-emerald-600 font-extrabold' : 'text-slate-500'}`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Q&A</span>
        </button>

        <button
          onClick={() => setIsModelManagerOpen(true)}
          className={`flex flex-col items-center gap-0.5 ${state.activeModelId !== 'gemini-3.8-flash' ? 'text-indigo-600 font-extrabold' : 'text-slate-500'}`}
        >
          <Cpu className="w-4 h-4" />
          <span>Models</span>
        </button>
      </div>

      {/* AI Educator Drawer (Voice, Text, Call, Autonomous Copilot) */}
      <AIEducatorDrawer
        state={state}
        isOpen={isEducatorDrawerOpen}
        onClose={() => setIsEducatorDrawerOpen(false)}
        onSendMessage={handleSendChatMessage}
        onExecuteAgentAction={handleExecuteAgentAction}
        onUpdateMemory={updateTeacherMemory}
        onOpenModelManager={() => setIsModelManagerOpen(true)}
        onToggleAutoSpeak={(enabled) => setAutoSpeakChat(enabled)}
      />

      {/* Local AI Model Manager Modal */}
      <LocalModelManagerModal
        isOpen={isModelManagerOpen}
        onClose={() => setIsModelManagerOpen(false)}
        models={state.localModels}
        activeModelId={state.activeModelId}
        onSelectModel={(id) => setActiveModel(id)}
        onUpdateModels={(models) => updateLocalModels(models)}
      />

      {/* Settings / Diagnostic Modal */}
      {isDiagnosticModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-4 sm:p-5 shadow-2xl relative space-y-3.5 text-slate-800">
            <button
              onClick={() => setIsDiagnosticModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-bold">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Student Settings
                </h3>
                <p className="text-[11px] text-slate-500">Personalization & Pacing Options</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-1 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Student Name / Alias
                </label>
                <input
                  type="text"
                  value={state.profile.name}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Target Track
                </label>
                <select
                  value={state.profile.goal}
                  onChange={(e) => updateProfile({ goal: e.target.value })}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-500"
                >
                  <option value="Complete Zero-to-AI Reconstruction">Complete Zero-to-AI Reconstruction (All 10 Stages)</option>
                  <option value="Hardware, Silicon & Precision Deep Dive">Hardware, Silicon & Precision Deep Dive</option>
                  <option value="Synthetic AI & Autonomous Robotics">Synthetic AI & Autonomous Robotics</option>
                  <option value="Primitive & Mechanical Survivalist Rebuilder">Primitive & Mechanical Survivalist Rebuilder</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div>
                  <div className="font-semibold text-slate-800 text-xs">Free Exploration Mode</div>
                  <div className="text-[10px] text-slate-500">Explore all 10 stages without sequential locks.</div>
                </div>
                <input
                  type="checkbox"
                  checked={state.profile.freeExploreMode}
                  onChange={(e) => updateProfile({ freeExploreMode: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setIsDiagnosticModalOpen(false);
                  setActiveTab('plan');
                }}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Customize in Planner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
