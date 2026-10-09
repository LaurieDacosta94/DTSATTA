'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { 
  X, 
  Cpu, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  HardDrive, 
  RefreshCw, 
  Play, 
  ShieldCheck, 
  Server,
  Layers,
  Check
} from 'lucide-react';
import { LocalModelMeta, getOfflineLocalModelResponse } from '@/lib/localModelManager';

interface LocalModelManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  models: LocalModelMeta[];
  activeModelId: string;
  onSelectModel: (modelId: string) => void;
  onUpdateModels: (models: LocalModelMeta[]) => void;
}

const emptySubscribe = () => () => {};

export function LocalModelManagerModal({
  isOpen,
  onClose,
  models,
  activeModelId,
  onSelectModel,
  onUpdateModels,
}: LocalModelManagerModalProps) {
  const deviceGpuSupported = useSyncExternalStore(
    emptySubscribe,
    () => typeof window !== 'undefined' && 'gpu' in navigator && !!(navigator as any).gpu,
    () => false
  );
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [testQueryPrompt, setTestQueryPrompt] = useState('Why are 3 plates necessary in Whitworth scraping?');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isRunningTest, setIsRunningTest] = useState(false);

  if (!isOpen) return null;

  const activeModel = models.find((m) => m.id === activeModelId) || models[0];

  // Calculate storage usage
  const totalCachedMB = models
    .filter((m) => m.isDownloaded && m.provider === 'local')
    .reduce((acc, m) => acc + m.downloadSizeMB, 0);

  const handleDownloadModel = (modelId: string) => {
    if (downloadingId) return;
    setDownloadingId(modelId);
    setDownloadProgress(5);

    let current = 5;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 12;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setDownloadProgress(100);

        setTimeout(() => {
          const updated = models.map((m) => {
            if (m.id === modelId) {
              return { ...m, isDownloaded: true, isLoaded: true, downloading: false, downloadProgress: 100 };
            }
            return m;
          });
          onUpdateModels(updated);
          onSelectModel(modelId);
          setDownloadingId(null);
          setDownloadProgress(0);
        }, 500);
      } else {
        setDownloadProgress(current);
      }
    }, 200);
  };

  const handleDeleteModel = (modelId: string) => {
    const updated = models.map((m) => {
      if (m.id === modelId) {
        return { ...m, isDownloaded: false, isLoaded: false, downloadProgress: 0 };
      }
      return m;
    });
    onUpdateModels(updated);
    if (activeModelId === modelId) {
      onSelectModel('gemini-3.8-flash');
    }
  };

  const handleToggleLoad = (modelId: string) => {
    const updated = models.map((m) => {
      if (m.id === modelId) {
        return { ...m, isLoaded: !m.isLoaded };
      }
      return m;
    });
    onUpdateModels(updated);
  };

  const handlePurgeAll = () => {
    const updated = models.map((m) => {
      if (m.provider === 'local') {
        return { ...m, isDownloaded: false, isLoaded: false, downloadProgress: 0 };
      }
      return m;
    });
    onUpdateModels(updated);
    onSelectModel('gemini-3.8-flash');
  };

  const handleRunOfflineTest = () => {
    setIsRunningTest(true);
    setTimeout(() => {
      const res = getOfflineLocalModelResponse(testQueryPrompt, activeModelId, 'Mechanical Flatness');
      setTestResult(res.replyText);
      setIsRunningTest(false);
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 font-sans animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header (Light Theme & Super Compact) */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 min-w-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold flex-shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="min-w-0 truncate">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">AI Model & Offline Engine</h3>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200 flex-shrink-0">
                  Offline
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate hidden xs:block">
                Run AI tutors locally in-browser or link to cloud frontier models
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* System Diagnostics Strip */}
        <div className="px-3.5 py-2 bg-indigo-50/50 border-b border-indigo-100 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <span className={`w-2 h-2 rounded-full ${deviceGpuSupported ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              Hardware: {deviceGpuSupported ? 'WebGPU Accelerated' : 'WASM CPU Mode'}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">
              Offline Storage Used: <strong className="text-slate-900">{totalCachedMB} MB</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500">Active Engine:</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-indigo-900 border border-indigo-200 shadow-2xs">
              {activeModel.badge} • {activeModel.name.split('(')[0]}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 text-xs">
          {/* Models Grid */}
          <div className="space-y-2.5">
            {models.map((m) => {
              const isActive = m.id === activeModelId;
              const isDownloadingThis = downloadingId === m.id;

              return (
                <div
                  key={m.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-200/80 shadow-xs'
                      : 'bg-white hover:bg-slate-50/60 border-slate-200/90'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                          {m.name}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${
                          m.provider === 'cloud'
                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          {m.badge}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {m.engine} • {m.quantization}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-snug">
                        {m.description}
                      </p>

                      <div className="flex items-center gap-3 text-[10px] text-slate-500 pt-0.5">
                        <span>Size: <strong className="text-slate-700">{m.sizeFormatted}</strong></span>
                        <span>•</span>
                        <span>Context: <strong className="text-slate-700">{m.contextLength}</strong></span>
                        <span>•</span>
                        <span>Hardware: <strong className="text-slate-700">{m.recommendedHardware}</strong></span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 flex-shrink-0 pt-1 sm:pt-0">
                      {m.provider === 'cloud' ? (
                        <button
                          onClick={() => onSelectModel(m.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            isActive
                              ? 'bg-amber-500 text-slate-950 shadow-2xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isActive ? <Check className="w-3.5 h-3.5" /> : null}
                          {isActive ? 'Active' : 'Select'}
                        </button>
                      ) : (
                        <>
                          {!m.isDownloaded && !isDownloadingThis && (
                            <button
                              onClick={() => handleDownloadModel(m.id)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center gap-1 transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Download ({m.downloadSizeMB}MB)
                            </button>
                          )}

                          {isDownloadingThis && (
                            <div className="flex items-center gap-2 w-32">
                              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-indigo-600 transition-all duration-200"
                                  style={{ width: `${downloadProgress}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-mono font-bold text-indigo-700">{downloadProgress}%</span>
                            </div>
                          )}

                          {m.isDownloaded && (
                            <>
                              <button
                                onClick={() => handleToggleLoad(m.id)}
                                className={`px-2 py-1 rounded-md text-[11px] font-semibold border ${
                                  m.isLoaded
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                }`}
                                title={m.isLoaded ? "Model loaded in VRAM/RAM" : "Model offline on disk"}
                              >
                                {m.isLoaded ? 'Loaded' : 'Unloaded'}
                              </button>

                              <button
                                onClick={() => onSelectModel(m.id)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                  isActive
                                    ? 'bg-emerald-600 text-white shadow-2xs'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                }`}
                              >
                                {isActive ? <Check className="w-3.5 h-3.5" /> : null}
                                {isActive ? 'Active' : 'Select'}
                              </button>

                              <button
                                onClick={() => handleDeleteModel(m.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Delete cached weights to reclaim storage"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Offline Tester Box */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-indigo-600" />
                Live Offline Inference Test Bench
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Testing active: {activeModel.name.split('(')[0]}
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={testQueryPrompt}
                onChange={(e) => setTestQueryPrompt(e.target.value)}
                placeholder="Ask technical question to test offline model..."
                className="flex-1 py-1.5 px-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleRunOfflineTest}
                disabled={isRunningTest}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 shadow-2xs"
              >
                {isRunningTest ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                Run Test
              </button>
            </div>

            {testResult && (
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed font-sans">
                {testResult}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <button
            onClick={handlePurgeAll}
            className="text-slate-500 hover:text-rose-600 flex items-center gap-1 text-[11px] transition-colors"
          >
            <Trash2 className="w-3 h-3" />
            Purge All Offline Weights ({totalCachedMB} MB)
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-colors shadow-2xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
