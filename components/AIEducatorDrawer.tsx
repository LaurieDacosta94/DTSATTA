'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  X, 
  Sparkles, 
  Share2, 
  Brain, 
  Volume2, 
  VolumeX,
  Play, 
  Pause, 
  CornerDownLeft, 
  Layers, 
  CheckCircle2, 
  Sliders, 
  Award,
  Zap,
  ArrowRight,
  Cpu,
  RotateCcw,
  Plus
} from 'lucide-react';
import { AppState, ChatMessage, TeacherMemoryDossier } from '@/lib/store';
import { getSubModuleById, CURRICULUM_STAGES } from '@/lib/curriculumData';

interface AIEducatorDrawerProps {
  state: AppState;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (text: string, isVoice?: boolean, sharedActivity?: ChatMessage['sharedActivity']) => Promise<void>;
  onExecuteAgentAction: (action: { type: string; targetModuleId?: string; description?: string }) => void;
  onUpdateMemory: (updates: Partial<TeacherMemoryDossier>) => void;
  onOpenModelManager?: () => void;
  onToggleAutoSpeak?: (enabled: boolean) => void;
}

export function AIEducatorDrawer({
  state,
  isOpen,
  onClose,
  onSendMessage,
  onExecuteAgentAction,
  onUpdateMemory,
  onOpenModelManager,
  onToggleAutoSpeak,
}: AIEducatorDrawerProps) {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'memory' | 'call'>('chat');
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [newObsInput, setNewObsInput] = useState('');
  const recognitionSupported = useSyncExternalStore(
    () => () => {},
    () => typeof window !== 'undefined' && !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition),
    () => false
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const handleSendRef = useRef<(customText?: string, isVoice?: boolean) => Promise<void>>(async () => {});

  // Text to Speech playback
  const speakText = (text: string, msgId?: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (currentlySpeakingId === msgId && isSpeaking) {
        setIsSpeaking(false);
        setCurrentlySpeakingId(null);
        return;
      }

      const clean = text.replace(/[*#_`]/g, '').slice(0, 380);
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (englishVoice) utterance.voice = englishVoice;

      utterance.onstart = () => {
        setIsSpeaking(true);
        if (msgId) setCurrentlySpeakingId(msgId);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentlySpeakingId(null);
        // If in call, automatically start listening for student's voice response!
        if (isInCall && recognitionRef.current && !isVoiceRecording) {
          try {
            recognitionRef.current.start();
            setIsVoiceRecording(true);
          } catch {
            // ignore
          }
        }
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentlySpeakingId(null);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentlySpeakingId(null);
    }
  };

  const handleSend = async (customText?: string, isVoice = false) => {
    const textToSend = customText || inputText.trim();
    if (!textToSend || isSending) return;

    setIsSending(true);
    setInputText('');

    try {
      await onSendMessage(textToSend, isVoice);
      const lastMsg = state.chatMessages[state.chatMessages.length - 1];
      if ((isInCall || state.autoSpeakChat) && lastMsg && lastMsg.sender === 'teacher') {
        speakText(lastMsg.text, lastMsg.id);
      }
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    handleSendRef.current = handleSend;
  });

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.chatMessages, isSending]);

  // Call timer effect
  useEffect(() => {
    if (!isInCall) return;
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isInCall]);

  // Speech Recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = false;
        recog.interimResults = false;
        recog.lang = 'en-US';

        recog.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            if (isInCall) {
              handleSendRef.current(transcript, true);
            } else {
              setInputText(transcript);
            }
          }
          setIsVoiceRecording(false);
        };

        recog.onerror = () => {
          setIsVoiceRecording(false);
        };

        recog.onend = () => {
          setIsVoiceRecording(false);
        };

        recognitionRef.current = recog;
      }
    }
  }, [isInCall]);

  const startVoiceRecording = () => {
    if (recognitionRef.current && !isVoiceRecording) {
      try {
        setIsVoiceRecording(true);
        recognitionRef.current.start();
      } catch (e) {
        setIsVoiceRecording(false);
      }
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current && isVoiceRecording) {
      recognitionRef.current.stop();
      setIsVoiceRecording(false);
    }
  };

  const handleShareCurrentActivity = () => {
    const current = getSubModuleById(state.currentModuleId);
    if (!current) return;

    const activityData: ChatMessage['sharedActivity'] = {
      type: 'module',
      title: `${current.subModule.id}: ${current.subModule.title}`,
      details: `Active in Stage 0${current.stage.stageNumber}. Key artifact: ${current.subModule.keyArtifactUnlocked}. Progress: ${state.progress[current.subModule.id]?.labCompleted ? 'Lab Passed' : 'In Progress'}.`,
    };

    onSendMessage(
      `Professor Ada, I am looking at Node ${current.subModule.id} (${current.subModule.title}). Can you review what I should do here?`,
      false,
      activityData
    );
  };

  const handleAddObservation = () => {
    if (!newObsInput.trim()) return;
    onUpdateMemory({
      observations: [...state.teacherMemory.observations, newObsInput.trim()]
    });
    setNewObsInput('');
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!isOpen) return null;

  const currentActiveSub = getSubModuleById(state.currentModuleId);

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-white border-l border-slate-200/90 shadow-2xl flex flex-col font-sans animate-in slide-in-from-right duration-200">
      {/* Header (Zero-overflow responsive topbar) */}
      <div className="p-2.5 sm:p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-1.5 w-full min-w-0 max-w-full overflow-hidden flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-xs font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div className="min-w-0 truncate">
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">Professor Ada</h3>
              <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200 flex-shrink-0">
                Copilot
              </span>
            </div>
            <p className="text-[10px] text-slate-500 truncate hidden xs:block">
              Remembers profile • Controls site
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => setActiveSubTab(activeSubTab === 'call' ? 'chat' : 'call')}
            className={`px-2 py-1 sm:py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
              activeSubTab === 'call' || isInCall
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
            title="Start Simulated Voice Call"
          >
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] hidden xs:inline">{isInCall ? 'In Call' : 'Call'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab(activeSubTab === 'memory' ? 'chat' : 'memory')}
            className={`px-2 py-1 sm:py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
              activeSubTab === 'memory'
                ? 'bg-sky-100 text-sky-900 border border-sky-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
            title="Inspect Teacher Long-Term Memory Dossier"
          >
            <Brain className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] hidden xs:inline">Memory</span>
          </button>

          <button
            onClick={onClose}
            className="p-1 sm:p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex-shrink-0"
            title="Close Educator"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-view: Live Voice Call Mode */}
      {activeSubTab === 'call' ? (
        <div className="flex-1 p-5 flex flex-col justify-between items-center text-center bg-gradient-to-b from-slate-50 via-white to-amber-50/20">
          <div className="space-y-2 mt-3">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-xl shadow-amber-500/20 relative">
              <Bot className="w-10 h-10" />
              {isSpeaking && (
                <span className="absolute inset-0 rounded-3xl border-4 border-amber-400 animate-ping opacity-40 pointer-events-none" />
              )}
            </div>
            <h4 className="font-extrabold text-base text-slate-900">Professor Ada</h4>
            <p className="text-xs font-mono text-slate-500 font-semibold">
              {isInCall ? `Live Voice Call Connected • ${formatSeconds(callDuration)}` : 'Ready to call • Two-Way Audio'}
            </p>
          </div>

          {/* Audio Visualizer Waves */}
          <div className="w-full max-w-xs h-14 flex items-center justify-center gap-1.5 px-4 bg-slate-100 rounded-2xl border border-slate-200">
            {[35, 70, 50, 95, 60, 85, 40, 90, 75, 45, 80, 55].map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-150 ${
                  isSpeaking
                    ? 'bg-amber-500'
                    : isVoiceRecording
                    ? 'bg-emerald-500'
                    : 'bg-slate-300'
                }`}
                style={{
                  height: (isSpeaking || isVoiceRecording) ? `${h}%` : '20%'
                }}
              />
            ))}
          </div>

          {/* Call Controls */}
          <div className="space-y-3 w-full max-w-xs">
            {isInCall ? (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={isVoiceRecording ? stopVoiceRecording : startVoiceRecording}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-105 shadow-md ${
                    isVoiceRecording
                      ? 'bg-emerald-500 text-white animate-pulse'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                  title={isVoiceRecording ? "Speaking..." : "Tap to Speak"}
                >
                  {isVoiceRecording ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => {
                    setIsInCall(false);
                    stopSpeaking();
                  }}
                  className="w-12 h-12 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 transition-transform hover:scale-105"
                  title="End Voice Call"
                >
                  <PhoneOff className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsInCall(true);
                  speakText("Hi Laurie! I'm listening. Ask me any question, or tell me what to operate on this website for you.");
                }}
                className="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
              >
                <Phone className="w-4 h-4" />
                Start Live Voice Call
              </button>
            )}

            <p className="text-[11px] text-slate-500">
              {isInCall
                ? (isVoiceRecording ? 'Listening to your microphone...' : isSpeaking ? 'Professor Ada is speaking...' : 'Tap microphone or speak')
                : 'Real-time spoken dialogue with persistent memory'}
            </p>
          </div>
        </div>
      ) : activeSubTab === 'memory' ? (
        /* Sub-view: Teacher Long-Term Memory Dossier */
        <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs bg-slate-50/50">
          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-sky-900">
              <Brain className="w-4 h-4 text-sky-600" />
              Teacher Memory Dossier
            </div>
            <p className="text-slate-600 text-[11px]">
              Professor Ada automatically remembers your learning speed, strengths, and questions across sessions.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="font-bold text-slate-700 text-[10px] uppercase tracking-wider">
                Student Profile
              </span>
              <div className="text-slate-900 font-extrabold text-sm">{state.teacherMemory.studentName}</div>
              <div className="text-slate-500 text-[11px]">
                Interactions Recorded: <span className="font-mono font-bold text-slate-800">{state.teacherMemory.totalInteractions}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 text-[10px] uppercase tracking-wider">
                  Teacher Observations
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {state.teacherMemory.observations.length} items
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-600 text-[11px]">
                {state.teacherMemory.observations.map((obs, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>

              {/* Add Custom Observation */}
              <div className="flex gap-1.5 pt-1 border-t border-slate-100">
                <input
                  type="text"
                  value={newObsInput}
                  onChange={(e) => setNewObsInput(e.target.value)}
                  placeholder="Add note for Ada to remember..."
                  className="flex-1 py-1 px-2 text-[11px] bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={handleAddObservation}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                  title="Add Note"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
              <span className="font-bold text-slate-700 text-[10px] uppercase tracking-wider">
                Concepts Mastered
              </span>
              <div className="flex flex-wrap gap-1">
                {state.teacherMemory.masteredTopics.map((top, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-medium">
                    ✓ {top}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="font-bold text-slate-700 text-[10px] uppercase tracking-wider">
                Teacher Private Notes
              </span>
              <p className="text-slate-600 text-[11px] italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                &ldquo;{state.teacherMemory.teacherNotes}&rdquo;
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Sub-view: Messenger Chat Thread */
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          {/* Top Chat Bar: Auto-TTS Toggle & Model Badge (Zero-overflow) */}
          <div className="px-2.5 sm:px-3 py-1.5 bg-slate-50 border-b border-slate-200 text-[10px] sm:text-[11px] flex items-center justify-between gap-1.5 min-w-0 max-w-full overflow-hidden flex-shrink-0">
            <div className="flex items-center gap-1 min-w-0 truncate text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="truncate">
                Engine: <strong className="text-slate-800">{state.activeModelId.split('-')[0]}</strong>
              </span>
              {onOpenModelManager && (
                <button 
                  onClick={onOpenModelManager}
                  className="text-amber-700 hover:underline font-bold text-[10px] ml-1 flex-shrink-0"
                >
                  [Models]
                </button>
              )}
            </div>

            {/* In-Chat Auto-TTS switch */}
            <label className="flex items-center gap-1 cursor-pointer text-slate-600 hover:text-slate-900 flex-shrink-0 select-none">
              <input
                type="checkbox"
                checked={state.autoSpeakChat}
                onChange={(e) => onToggleAutoSpeak?.(e.target.checked)}
                className="w-3 h-3 text-amber-600 rounded border-slate-300"
              />
              <Volume2 className="w-3 h-3 text-amber-600 flex-shrink-0" />
              <span className="text-[10px] font-semibold whitespace-nowrap">TTS Auto</span>
            </label>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50/40 text-xs">
            {state.chatMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isThisSpeaking = currentlySpeakingId === msg.id && isSpeaking;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-2.5 sm:p-3 text-xs leading-relaxed shadow-2xs ${
                      isUser
                        ? 'bg-slate-900 text-white rounded-br-xs'
                        : `bg-white border text-slate-800 rounded-bl-xs ${isThisSpeaking ? 'border-amber-400 ring-2 ring-amber-200' : 'border-slate-200/90'}`
                    }`}
                  >
                    {/* Shared Activity Card attached to message */}
                    {msg.sharedActivity && (
                      <div className="mb-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 space-y-0.5">
                        <div className="font-bold flex items-center gap-1">
                          <Share2 className="w-3 h-3 text-amber-700" />
                          Shared Activity: {msg.sharedActivity.title}
                        </div>
                        <p className="text-amber-800 text-[10px]">{msg.sharedActivity.details}</p>
                      </div>
                    )}

                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Agent Action Badge */}
                    {msg.agentAction && (
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-emerald-700">
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-emerald-600" />
                          {msg.agentAction.description}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1">
                    {msg.isVoice && (
                      <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                        <Mic className="w-2.5 h-2.5" /> Voice Note
                      </span>
                    )}
                    <span suppressHydrationWarning>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    
                    {!isUser && (
                      <button
                        onClick={() => speakText(msg.text, msg.id)}
                        className={`hover:text-amber-600 flex items-center gap-0.5 ml-1 transition-colors ${
                          isThisSpeaking ? 'text-amber-600 font-bold' : ''
                        }`}
                        title={isThisSpeaking ? "Stop audio" : "Play Text-to-Speech"}
                      >
                        {isThisSpeaking ? (
                          <>
                            <Pause className="w-3 h-3 text-amber-600 animate-pulse" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {isSending && (
              <div className="flex items-center gap-2 text-slate-500 text-xs italic p-2 bg-white rounded-xl border border-slate-200 w-fit">
                <div className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <span>Professor Ada is operating website & thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Copilot Action Chips */}
          <div className="p-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            <button
              onClick={handleShareCurrentActivity}
              className="px-2 py-0.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold flex-shrink-0 flex items-center gap-1 transition-colors"
            >
              <Share2 className="w-3 h-3 text-amber-700" />
              Share Screen
            </button>
            <button
              onClick={() => {
                onExecuteAgentAction({ type: 'RUN_LAB', description: 'Auto-solved lab simulation' });
                handleSend("Please auto-tune and solve the current interactive simulation for me.");
              }}
              className="px-2 py-0.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold flex-shrink-0 flex items-center gap-1 transition-colors"
            >
              <Zap className="w-3 h-3 text-emerald-600" />
              ⚡ Auto-Tune Lab
            </button>
            <button
              onClick={() => handleSend("Can you explain how this stage connects to the next one?")}
              className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-medium flex-shrink-0 transition-colors"
            >
              Next Step Logic
            </button>
            <button
              onClick={() => handleSend("What is the primary physical bottleneck of this stage?")}
              className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-medium flex-shrink-0 transition-colors"
            >
              Bottleneck Check
            </button>
          </div>

          {/* Text/Voice Input Box */}
          <div className="p-2.5 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-1.5"
            >
              {recognitionSupported && (
                <button
                  type="button"
                  onClick={isVoiceRecording ? stopVoiceRecording : startVoiceRecording}
                  className={`p-2 rounded-xl border transition-colors ${
                    isVoiceRecording
                      ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                  }`}
                  title={isVoiceRecording ? "Recording speech..." : "Record voice message"}
                >
                  <Mic className="w-4 h-4" />
                </button>
              )}

              <input
                type="text"
                placeholder="Ask Ada or command website ('Take me to Silicon', 'Solve lab')..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isSending}
                className={`p-2 rounded-xl transition-all ${
                  inputText.trim() && !isSending
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-xs cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
