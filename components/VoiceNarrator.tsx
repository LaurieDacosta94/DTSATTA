'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

interface VoiceNarratorProps {
  textToRead: string;
  label?: string;
}

const emptySubscribe = () => () => {};

export function VoiceNarrator({ textToRead, label = "Listen to Professor Bootstrap" }: VoiceNarratorProps) {
  const isSupported = useSyncExternalStore(
    emptySubscribe,
    () => typeof window !== 'undefined' && 'speechSynthesis' in window,
    () => false
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const cleanText = (raw: string) => {
    return raw
      .replace(/#+\s/g, '')
      .replace(/\$\$.*?\$\$/g, ' equation omitted ')
      .replace(/\$.*?\$/g, ' ')
      .replace(/\*\*|__|\*|_/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/```[\s\S]*?```/g, '')
      .slice(0, 800); // Friendly chunk for speech
  };

  const handleTogglePlay = () => {
    if (!isSupported) return;

    if (isPlaying) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText(textToRead));
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200/90 rounded-full px-2.5 py-1 text-xs text-slate-700 shadow-2xs font-sans">
      <button
        onClick={handleTogglePlay}
        className="flex items-center gap-1.5 hover:text-amber-700 transition-colors focus:outline-none cursor-pointer"
        title={isPlaying ? (isPaused ? "Resume Narration" : "Pause Narration") : "Listen to Explanation"}
      >
        {isPlaying ? (
          isPaused ? <Play className="w-3.5 h-3.5 text-amber-600" /> : <Pause className="w-3.5 h-3.5 text-amber-600" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-amber-600" />
        )}
        <span className="font-semibold text-[11px]">{isPlaying ? (isPaused ? "Paused" : "Speaking...") : label}</span>
      </button>

      {isPlaying && (
        <button
          onClick={handleStop}
          className="text-slate-400 hover:text-rose-600 transition-colors ml-1 cursor-pointer"
          title="Stop narration"
        >
          <VolumeX className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
