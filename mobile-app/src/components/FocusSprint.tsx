import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Timer, CheckCircle2, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { microWin } from '@/components/MicroWin';

interface FocusSprintProps {
  compact?: boolean;
}

type SprintState = 'idle' | 'running' | 'paused' | 'completed';

const SPRINT_DURATION = 25 * 60;
const STORAGE_KEY = 'abtalks-focus-sprint';

interface PersistedState {
  sessions: number;
  timeLeft: number;
  state: 'idle' | 'paused';
}

function loadPersisted(): PersistedState {
  if (typeof window === 'undefined') return { sessions: 0, timeLeft: SPRINT_DURATION, state: 'idle' };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { sessions: 0, timeLeft: SPRINT_DURATION, state: 'idle' };
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    const sessions = typeof parsed.sessions === 'number' ? parsed.sessions : 0;
    const savedTimeLeft = typeof parsed.timeLeft === 'number' ? Math.min(Math.max(parsed.timeLeft, 0), SPRINT_DURATION) : SPRINT_DURATION;
    const restored = savedTimeLeft > 0 && savedTimeLeft < SPRINT_DURATION ? 'paused' : 'idle';
    return { sessions, timeLeft: savedTimeLeft, state: restored };
  } catch {
    return { sessions: 0, timeLeft: SPRINT_DURATION, state: 'idle' };
  }
}

export default function FocusSprint({ compact = false }: FocusSprintProps) {
  const initial = loadPersisted();
  const [timeLeft, setTimeLeft] = useState(initial.timeLeft);
  const [state, setState] = useState<SprintState>(initial.state);
  const [sessions, setSessions] = useState(initial.sessions);
  const [showCelebration, setShowCelebration] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Persist sessions + timer so a refresh never resets progress.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessions, timeLeft, state: state === 'idle' ? 'idle' : 'paused' }));
    } catch {
      /* storage unavailable — the sprint still works for this session */
    }
  }, [sessions, timeLeft, state]);

  const handleStart = useCallback(() => {
    if (state === 'completed') return;
    setState('running');
    microWin('Focus on. Phone down.', '🎯');
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setState('completed');
          setShowCelebration(true);
          setSessions((count) => count + 1);
          setTimeout(() => setShowCelebration(false), 4000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer, state]);

  const handlePause = useCallback(() => {
    clearTimer();
    setState((current) => (current === 'running' ? 'paused' : current));
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

  const sessionLabel = sessions === 1 ? '1 focus session today' : `${sessions} focus sessions today`;

  if (compact) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
        <div className="relative h-11 w-11 shrink-0">
          <svg className="h-11 w-11 -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
            <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke={state === 'completed' ? '#38B46A' : state === 'running' ? '#6F7EF7' : 'rgba(255,255,255,0.18)'}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * 18}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {state === 'completed' ? (
              <CheckCircle2 className="h-4 w-4 text-success" />
            ) : (
              <Timer className="h-4 w-4 text-primary" />
            )}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-subtle">{sessionLabel}</p>
          <p className="font-mono text-sm font-semibold tabular-nums text-foreground">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
        </div>
        <div className="flex gap-1.5">
          {state !== 'completed' && (
            <>
              {state === 'running' ? (
                <button
                  type="button"
                  onClick={handlePause}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-foreground transition-colors hover:bg-white/10"
                  aria-label="Pause sprint"
                >
                  <Pause className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStart}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary transition-colors hover:bg-primary/25"
                  aria-label="Start sprint"
                >
                  <Play className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-subtle transition-colors hover:bg-white/10"
                aria-label="Reset sprint"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </>
          )}
          {state === 'completed' && (
            <button
              type="button"
              onClick={handleReset}
              className="grid h-9 w-9 place-items-center rounded-lg bg-success/15 text-success"
              aria-label="Start another sprint"
            >
              <RotateCcw className="h-4 w-4" />
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
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl border border-success/30 bg-surface p-6"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 16 }}
              className="grid h-16 w-16 place-items-center rounded-full bg-success/15"
            >
              <svg viewBox="0 0 52 52" className="h-9 w-9" aria-hidden="true">
                <circle cx="26" cy="26" r="24" fill="none" stroke="#38B46A" strokeOpacity="0.25" strokeWidth="4" />
                <path
                  className="check-path"
                  d="M14 27l8 8 16-18"
                  fill="none"
                  stroke="#3DA86A"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <p className="mt-3 text-lg font-bold text-foreground">Sprint complete</p>
            <p className="mt-1 text-sm text-muted">25 minutes of focus. You earned a real break.</p>
            <Button onClick={handleReset} variant="success" size="sm" className="mt-4">
              <Play className="h-4 w-4" /> Start another
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="card-pad">
        <div className="mb-5 flex items-center gap-2">
          <Timer className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Focus Sprint</h3>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-warning/20 bg-warning/10 px-2 py-0.5 text-[10px] font-semibold text-warning">
            <Flame className="h-3 w-3" /> {sessions}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative mb-5 h-40 w-40">
            <svg className="h-40 w-40 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <linearGradient id="sprint-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#6F7EF7" />
                  <stop offset="1" stopColor="#8B97D8" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={state === 'completed' ? '#38B46A' : 'url(#sprint-grad)'}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-3xl font-bold tabular-nums text-foreground">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="mt-1 text-xs text-subtle">
                {state === 'idle' ? 'ready' : state === 'running' ? 'focusing' : state === 'paused' ? 'paused' : 'done!'}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            {state !== 'completed' && (
              <>
                {state === 'running' ? (
                  <Button onClick={handlePause} variant="outline" size="sm" id="pause-sprint">
                    <Pause className="h-4 w-4" /> Pause
                  </Button>
                ) : (
                  <Button onClick={handleStart} variant="default" size="sm" id="start-sprint">
                    <Play className="h-4 w-4" /> {state === 'paused' ? 'Resume' : 'Start Sprint'}
                  </Button>
                )}
                <Button onClick={handleReset} variant="ghost" size="sm" id="reset-sprint" aria-label="Reset sprint">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {state === 'idle' && (
            <p className="mt-3 text-center text-xs leading-relaxed text-subtle">
              Phone down. Code for 25 minutes.
            </p>
          )}
          {state === 'paused' && (
            <p className="mt-3 text-center text-xs leading-relaxed text-subtle">
              Paused — resume when you&apos;re ready. The streak is patient.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
