'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Timer, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FocusSprintProps {
  compact?: boolean;
}

type SprintState = 'idle' | 'running' | 'paused' | 'completed';

const SPRINT_DURATION = 25 * 60;

export default function FocusSprint({ compact = false }: FocusSprintProps) {
  const [timeLeft, setTimeLeft] = useState(SPRINT_DURATION);
  const [state, setState] = useState<SprintState>('idle');
  const [showCelebration, setShowCelebration] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleStart = useCallback(() => {
    setState('running');
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setState('completed');
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 4000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  const handlePause = useCallback(() => {
    clearTimer();
    setState('paused');
  }, [clearTimer]);

  const handleReset = useCallback(() => {
    clearTimer();
    setState('idle');
    setTimeLeft(SPRINT_DURATION);
    setShowCelebration(false);
  }, [clearTimer]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((SPRINT_DURATION - timeLeft) / SPRINT_DURATION) * 100;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-[#27272A]">
        <div className="relative w-10 h-10 flex-shrink-0">
          <svg className="w-10 h-10 -rotate-90" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke={state === 'completed' ? '#22C55E' : '#8B5CF6'}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * 18}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Timer className="w-4 h-4 text-[#8B5CF6]" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-zinc-500 font-medium">Focus Sprint</p>
          <p className="text-sm font-mono font-semibold text-white">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
        </div>
        <div className="flex gap-1.5">
          {state !== 'completed' && (
            <>
              {state === 'running' ? (
                <button
                  onClick={handlePause}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="Pause"
                >
                  <Pause className="w-3.5 h-3.5 text-white" />
                </button>
              ) : (
                <button
                  onClick={handleStart}
                  className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 flex items-center justify-center transition-colors"
                  aria-label="Start"
                >
                  <Play className="w-3.5 h-3.5 text-[#8B5CF6]" />
                </button>
              )}
              <button
                onClick={handleReset}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </>
          )}
          {state === 'completed' && (
            <button
              onClick={handleReset}
              className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-[#16161A] border border-[#22C55E]/30"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.6 }}
              className="text-5xl mb-3"
            >
              🎉
            </motion.div>
            <p className="text-lg font-bold text-white">Sprint Complete!</p>
            <p className="text-sm text-zinc-400 mt-1">25 minutes of pure focus 🔥</p>
            <Button onClick={handleReset} variant="success" size="sm" className="mt-4">
              Start Another
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-5 rounded-2xl border border-[#27272A] bg-[#16161A]">
        <div className="flex items-center gap-2 mb-5">
          <Timer className="w-4 h-4 text-[#8B5CF6]" />
          <h3 className="text-sm font-semibold text-white">Focus Sprint</h3>
          <span className="ml-auto text-xs text-zinc-500">25 min / Pomodoro</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-5">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={state === 'completed' ? '#22C55E' : state === 'running' ? '#8B5CF6' : '#4B5563'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-mono font-bold text-white">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="text-xs text-zinc-500 mt-0.5">
                {state === 'idle' ? 'ready' : state === 'running' ? 'focusing' : state === 'paused' ? 'paused' : 'done!'}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            {state !== 'completed' && (
              <>
                {state === 'running' ? (
                  <Button onClick={handlePause} variant="outline" size="sm" id="pause-sprint">
                    <Pause className="w-4 h-4 mr-1" />
                    Pause
                  </Button>
                ) : (
                  <Button onClick={handleStart} variant="default" size="sm" id="start-sprint">
                    <Play className="w-4 h-4 mr-1" />
                    {state === 'paused' ? 'Resume' : 'Start Sprint'}
                  </Button>
                )}
                <Button onClick={handleReset} variant="ghost" size="sm" id="reset-sprint">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>

          {state === 'idle' && (
            <p className="text-xs text-zinc-500 mt-3 text-center">
              25 minutes of focused coding, then a 5-min break.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
