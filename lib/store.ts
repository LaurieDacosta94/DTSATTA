import { useSyncExternalStore } from "react";
import { INITIAL_MODELS, LocalModelMeta } from "./localModelManager";

export interface StudentQuestion {
  id: string;
  timestamp: number;
  moduleId: string;
  moduleTitle: string;
  stageTitle: string;
  userQuestion: string;
  status: 'unresolved' | 'clarified' | 'mastered';
  answerData?: {
    directAnswer: string;
    whyThisMatters: string;
    prerequisiteCheck: string;
    steppingStones: string[];
    socraticCheck: string;
    suggestedFollowUp?: string;
  };
  clarificationData?: {
    freshMetaphor: string;
    stepByStepBreakdown: string[];
    theAhaMoment: string;
    verificationQuestions: Array<{ q: string; expected: string }>;
    masteryCheck: string;
  };
  studentNotes?: string;
}

export interface ModuleProgress {
  labCompleted: boolean;
  quizScore: number; // e.g. 100
  feynmanPassed: boolean;
  feynmanScore?: number;
  completedAt?: number;
}

export interface PersonalizedPlan {
  planTitle: string;
  summary: string;
  estimatedWeeks: number;
  dailyRoutine: string;
  milestones: Array<{
    week: number;
    focusStages: string;
    coreGoal: string;
    capstoneChallenge: string;
  }>;
  personalizedTips: string[];
}

export interface StudentProfile {
  name: string;
  goal: string;
  background: string;
  dailyMinutes: number;
  learningStyle: string;
  streakDays: number;
  lastActiveDate: string;
  totalXp: number;
  freeExploreMode: boolean; // if true, all stages open
}

const STORAGE_KEY = "dirt_to_superintelligence_state_v1";

const DEFAULT_PROFILE: StudentProfile = {
  name: "Bootstrapper",
  goal: "Complete Zero-to-AI Reconstruction",
  background: "Complete Beginner",
  dailyMinutes: 25,
  learningStyle: "First-Principles Deep Dive",
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split("T")[0],
  totalXp: 120,
  freeExploreMode: true, // Default to true so beginners can explore the whole tech tree freely without artificial gatekeeping!
};

export interface TeacherMemoryDossier {
  studentName: string;
  observations: string[];
  masteredTopics: string[];
  knownStruggles: string[];
  teacherNotes: string;
  lastSessionSummary: string;
  totalInteractions: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'teacher';
  text: string;
  timestamp: number;
  isVoice?: boolean;
  sharedActivity?: {
    type: 'module' | 'lab' | 'quiz' | 'question';
    title: string;
    details: string;
  };
  agentAction?: {
    type: string;
    description: string;
    status: 'pending' | 'executed';
  };
}

export interface AppState {
  profile: StudentProfile;
  currentModuleId: string;
  unlockedModules: string[];
  progress: Record<string, ModuleProgress>;
  questions: StudentQuestion[];
  plan: PersonalizedPlan | null;
  teacherMemory: TeacherMemoryDossier;
  chatMessages: ChatMessage[];
  activeModelId: string;
  autoSpeakChat: boolean;
  localModels: LocalModelMeta[];
}

const DEFAULT_TEACHER_MEMORY: TeacherMemoryDossier = {
  studentName: "Laurie",
  observations: [
    "Prefers physical mechanical metaphors before entering abstract math equations.",
    "Showed strong intuition for Whitworth 3-plate mutual curvature cancellation."
  ],
  masteredTopics: ["1.1 High Thermal Mastery & Tuyère Nozzles", "2.1 The Foundations of Absolute Flatness"],
  knownStruggles: ["Coincident-current magnetic memory addressing thresholds"],
  teacherNotes: "Laurie responds well to Socratic stepping-stone hints and hands-on lab feedback.",
  lastSessionSummary: "Reviewed thermal reduction of iron bloom in Stage 1 and Whitworth flatness in Stage 2.",
  totalInteractions: 14,
};

const DEFAULT_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-msg",
    sender: "teacher",
    text: "Hello Laurie! I'm Professor Ada, your personal AI Educator. I keep track of everything you learn, remember your questions, and can operate this website for you! You can chat with me, record a voice note, or start a live voice call anytime. How can I guide you today?",
    timestamp: 1728500000000,
  }
];

const DEFAULT_STATE: AppState = {
  profile: DEFAULT_PROFILE,
  currentModuleId: "1.1",
  unlockedModules: ["1.1", "1.2", "1.3", "2.1", "2.2", "2.3", "3.1", "3.2", "3.3", "4.1", "4.2", "4.3", "5.1", "5.2", "5.3", "6.1", "6.2", "6.3", "7.1", "7.2", "8.1", "8.2", "9.1", "9.2", "9.3", "10.1", "10.2", "10.3"],
  progress: {
    "1.1": {
      labCompleted: true,
      quizScore: 100,
      feynmanPassed: false,
    }
  },
  questions: [
    {
      id: "demo-q1",
      timestamp: 1728490000000,
      moduleId: "2.1",
      moduleTitle: "The Foundations of Absolute Flatness",
      stageTitle: "Stage 02: Mechanical Precision",
      userQuestion: "Why can't you just use 2 plates rubbing together to make a flat surface? Why are 3 strictly necessary?",
      status: "clarified",
      answerData: {
        directAnswer: "If you rub only 2 plates together with abrasive in between, one plate will wear into a concave bowl and the other into a convex dome. They match each other's curves with zero gaps, but neither is actually flat! Introducing a 3rd plate exposes the curve because two convex surfaces rock against each other. Rotating between A-B, B-C, and C-A eliminates all spherical curvature until only absolute zero-curvature planes remain.",
        whyThisMatters: "Without true flat surface plates, machine tool carriages wiggle, pistons leak steam, and precision machining cannot begin.",
        prerequisiteCheck: "Stage 1: Abrasive mineral powder from crushed quartz/sand.",
        steppingStones: [
          "Imagine rubbing two soup bowls together—they fit, but are they flat?",
          "Now take two identical matching domes and try to make them touch flat."
        ],
        socraticCheck: "If plate A is a bowl and plate B is a dome, what happens when you rub plate C against plate A?",
        suggestedFollowUp: "How did Whitworth measure micro-inch gaps before lasers were invented?"
      }
    }
  ],
  plan: {
    planTitle: "Zero-to-Superintelligence Mastery Blueprint",
    summary: "A customized 4-week voyage from primitive earth and high-temperature metallurgy to silicon fabrication, self-play world models, and autonomous robotic loops.",
    estimatedWeeks: 4,
    dailyRoutine: "25 minutes: 10 min first-principles concept, 10 min interactive lab checkpoint, 5 min Feynman reflection & Q&A.",
    milestones: [
      {
        week: 1,
        focusStages: "Stages 1 to 2",
        coreGoal: "Master thermal cascades, refractory crucibles, and Whitworth 3-plate scraping.",
        capstoneChallenge: "Achieve < 2 micron flatness on the 3-plate simulator."
      },
      {
        week: 2,
        focusStages: "Stages 3 to 4",
        coreGoal: "DC electricity, dynamos, telegraph relays, and thermionic vacuum tubes.",
        capstoneChallenge: "Latch a bit on the dual-triode bistable flip-flop."
      },
      {
        week: 3,
        focusStages: "Stages 5 to 7",
        coreGoal: "Monocrystalline silicon pulling, photolithography, CPU buses, and ISO Class 1 fabs.",
        capstoneChallenge: "Tune closed-loop PID servo motor positioning."
      },
      {
        week: 4,
        focusStages: "Stages 8 to 10",
        coreGoal: "Systolic arrays, self-play MCTS, world models, and Von Neumann self-replication.",
        capstoneChallenge: "Balance the 5 self-replication subsystems for positive exponential growth."
      }
    ],
    personalizedTips: [
      "Never leave a question unanswered—log every point of confusion into the triage notebook.",
      "Ground every abstract circuit in physical water/pipe or mechanical gear analogies.",
      "Explain each milestone using the Feynman prompt to cement long-term memory."
    ]
  },
  teacherMemory: DEFAULT_TEACHER_MEMORY,
  chatMessages: DEFAULT_CHAT_MESSAGES,
  activeModelId: "gemini-3.8-flash",
  autoSpeakChat: false,
  localModels: INITIAL_MODELS,
};

export function loadStoredState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveStoredState(state: AppState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state to localStorage", e);
  }
}

// External store synchronization for localStorage
let memoryState: AppState = DEFAULT_STATE;
let isStoreInitialized = false;
const storeListeners = new Set<() => void>();

function initStoreIfNeeded(): AppState {
  if (!isStoreInitialized && typeof window !== "undefined") {
    isStoreInitialized = true;
    const saved = loadStoredState();
    const today = new Date().toISOString().split("T")[0];
    if (saved.profile.lastActiveDate !== today) {
      saved.profile.streakDays += 1;
      saved.profile.lastActiveDate = today;
      saved.profile.totalXp += 20; // Daily login reward
      saveStoredState(saved);
    }
    memoryState = saved;
  }
  return memoryState;
}

function subscribeToStore(callback: () => void): () => void {
  storeListeners.add(callback);
  return () => {
    storeListeners.delete(callback);
  };
}

function emitStoreChange() {
  for (const listener of storeListeners) {
    listener();
  }
}

// React hook to use the application state
export function useTechTreeStore() {
  const state = useSyncExternalStore(
    subscribeToStore,
    initStoreIfNeeded,
    () => DEFAULT_STATE
  );

  const loaded = useSyncExternalStore(
    subscribeToStore,
    () => isStoreInitialized,
    () => false
  );

  const updateState = (updater: (prev: AppState) => AppState) => {
    initStoreIfNeeded();
    memoryState = updater(memoryState);
    saveStoredState(memoryState);
    emitStoreChange();
  };

  const setCurrentModule = (moduleId: string) => {
    updateState((prev) => ({
      ...prev,
      currentModuleId: moduleId,
      unlockedModules: prev.unlockedModules.includes(moduleId)
        ? prev.unlockedModules
        : [...prev.unlockedModules, moduleId],
    }));
  };

  const addQuestion = (question: Omit<StudentQuestion, "id" | "timestamp" | "status"> & { answerData?: StudentQuestion["answerData"] }) => {
    const newQ: StudentQuestion = {
      ...question,
      id: "q-" + Date.now(),
      timestamp: Date.now(),
      status: "unresolved",
    };
    updateState((prev) => ({
      ...prev,
      profile: { ...prev.profile, totalXp: prev.profile.totalXp + 35 },
      questions: [newQ, ...prev.questions],
    }));
    return newQ.id;
  };

  const updateQuestionStatus = (id: string, status: 'unresolved' | 'clarified' | 'mastered', studentNotes?: string) => {
    updateState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        totalXp: status === "mastered" ? prev.profile.totalXp + 50 : prev.profile.totalXp,
      },
      questions: prev.questions.map((q) => (q.id === id ? { ...q, status, studentNotes: studentNotes ?? q.studentNotes } : q)),
    }));
  };

  const setQuestionClarification = (id: string, clarificationData: StudentQuestion["clarificationData"]) => {
    updateState((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => (q.id === id ? { ...q, clarificationData, status: "clarified" } : q)),
    }));
  };

  const recordModuleProgress = (moduleId: string, updates: Partial<ModuleProgress>, xpGained = 50) => {
    updateState((prev) => {
      const existing = prev.progress[moduleId] || { labCompleted: false, quizScore: 0, feynmanPassed: false };
      const nextProgress = {
        ...existing,
        ...updates,
        completedAt: Date.now(),
      };
      return {
        ...prev,
        profile: { ...prev.profile, totalXp: prev.profile.totalXp + xpGained },
        progress: {
          ...prev.progress,
          [moduleId]: nextProgress,
        },
      };
    });
  };

  const savePersonalizedPlan = (plan: PersonalizedPlan) => {
    updateState((prev) => ({
      ...prev,
      plan,
      profile: { ...prev.profile, totalXp: prev.profile.totalXp + 100 },
    }));
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    updateState((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updates },
    }));
  };

  const addChatMessage = (msg: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: "msg-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      timestamp: Date.now(),
    };
    updateState((prev) => ({
      ...prev,
      chatMessages: [...prev.chatMessages, newMsg],
      teacherMemory: {
        ...prev.teacherMemory,
        totalInteractions: prev.teacherMemory.totalInteractions + 1,
      }
    }));
    return newMsg;
  };

  const updateTeacherMemory = (updates: Partial<TeacherMemoryDossier>) => {
    updateState((prev) => ({
      ...prev,
      teacherMemory: {
        ...prev.teacherMemory,
        ...updates,
      }
    }));
  };

  const setActiveModel = (modelId: string) => {
    updateState((prev) => ({
      ...prev,
      activeModelId: modelId,
    }));
  };

  const setAutoSpeakChat = (enabled: boolean) => {
    updateState((prev) => ({
      ...prev,
      autoSpeakChat: enabled,
    }));
  };

  const updateLocalModels = (models: LocalModelMeta[]) => {
    updateState((prev) => ({
      ...prev,
      localModels: models,
    }));
  };

  const clearChatMessages = () => {
    updateState((prev) => ({
      ...prev,
      chatMessages: DEFAULT_CHAT_MESSAGES,
    }));
  };

  const clearQuestions = () => {
    updateState((prev) => ({
      ...prev,
      questions: [],
    }));
  };

  const clearProgress = () => {
    updateState((prev) => ({
      ...prev,
      progress: {},
      unlockedModules: ["1.1"],
      profile: {
        ...prev.profile,
        totalXp: 0,
        level: 1,
      },
    }));
  };

  const resetProfileData = () => {
    updateState((prev) => ({
      ...prev,
      profile: {
        name: "Student",
        goal: "Complete Zero-to-AI Reconstruction",
        level: 1,
        totalXp: 0,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split("T")[0],
        diagnosticCompleted: false,
        freeExploreMode: false,
      },
    }));
  };

  const resetAllData = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error("Failed to remove localStorage item", e);
      }
    }
    initStoreIfNeeded();
    memoryState = {
      ...DEFAULT_STATE,
      localModels: INITIAL_MODELS,
      profile: {
        ...DEFAULT_STATE.profile,
        name: "Student",
        totalXp: 0,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split("T")[0],
      },
      questions: [],
      progress: {},
      unlockedModules: ["1.1"],
      currentModuleId: "1.1",
      chatMessages: DEFAULT_CHAT_MESSAGES,
      teacherMemory: DEFAULT_TEACHER_MEMORY,
    };
    saveStoredState(memoryState);
    emitStoreChange();
  };

  return {
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
  };
}
