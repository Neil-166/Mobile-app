import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCircle, Clock, MoonStar, X } from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { microWin } from '@/components/MicroWin';
import { linkedinDrafts } from '@/lib/mock-data';
import { copyToClipboard, getMinutesUntilTenPM, getSecondsUntilMidnight, getTenPMProgress, getRescuePhase } from '@/lib/utils';

interface MidnightRescueProps {
  onMarkProgress?: () => void;
  onDismiss?: () => void;
}

function formatLiveCountdown(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, '0')}m`;
  if (minutes >= 1) return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  return `${secs}s`;
}

/**
 * Time-based "Midnight Rescue".
 * Before 10 PM it runs a countdown to go-live with a progress bar.
 * After 10 PM it flips to a calm, dimmed live countdown to midnight with quick actions.
 * Copy is always encouraging — never guilt-inducing.
 */
export default function MidnightRescue({ onMarkProgress, onDismiss }: MidnightRescueProps) {
  const reduced = useReducedMotion();
  const [now, setNow] = useState(() => new Date());
  const [visible, setVisible] = useState(true);
  const [githubOpened, setGithubOpened] = useState(false);
  const [linkedinCopied, setLinkedinCopied] = useState(false);
  const [markedDone, setMarkedDone] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (!visible) return null;

  const lateNight = getRescuePhase(now) === 'late-night';
  const minutesToGoLive = getMinutesUntilTenPM(now);
  const progressToGoLive = getTenPMProgress(now);
  const secondsToMidnight = getSecondsUntilMidnight(now);

  const handleMarkProgress = () => {
    setMarkedDone(true);
    onMarkProgress?.();
    microWin('Progress saved. Streak protected for tonight.', '🛡️');
  };

  const handleCopyLinkedIn = async () => {
    await copyToClipboard(linkedinDrafts[0]);
    setLinkedinCopied(true);
    microWin('LinkedIn draft copied — make it sound like you.', '📢');
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {lateNight ? (
        /* ===== AFTER 10 PM — live rescue, dimmed & calm ===== */
        <motion.div
          key="late-night"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative overflow-hidden rounded-2xl border border-warning/20 bg-bg-elevated/80 p-4 night-mode"
          role="alert"
          aria-live="polite"
        >
          <div className="pointer-events-none absolute inset-0 surface-gradient" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,90,0,0.10) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={() => { setVisible(false); onDismiss?.(); }}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg text-subtle transition-colors hover:bg-white/5 hover:text-foreground"
            aria-label="Dismiss midnight rescue"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-warning/10">
              <MoonStar className="h-4 w-4 text-warning/90" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Midnight Rescue is live</p>
              <p className="text-[11px] text-subtle">A calm countdown, not a panic button.</p>
            </div>
          </div>

          {/* Live countdown */}
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-warning/15 bg-black/20 px-3 py-2.5">
            <Clock className="h-4 w-4 shrink-0 text-warning/80" />
            <span className="text-[11px] text-muted">Before midnight</span>
            <span className="ml-auto font-mono text-base font-bold tabular-nums text-warning">
              {formatLiveCountdown(secondsToMidnight)}
            </span>
          </div>

          {/* Encouraging copy — never guilt-inducing */}
          <p className="mt-3 text-xs leading-relaxed text-muted/90">
            {markedDone
              ? 'You showed up tonight. That is enough — rest now.'
              : 'Even a small commit counts. Open GitHub, paste your draft, or mark your progress. No pressure, just one step.'}
          </p>

          {/* Quick actions */}
          {!markedDone ? (
            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                id="midnight-github"
                type="button"
                onClick={() => { setGithubOpened(true); window.open('https://github.com', '_blank', 'noopener,noreferrer'); }}
                className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border text-[10px] font-medium transition-all ${
                  githubOpened ? 'border-success/30 bg-success/10 text-success' : 'border-border bg-white/5 text-muted hover:bg-white/10'
                }`}
              >
                {githubOpened ? <CheckCircle className="h-4 w-4" /> : <Github className="h-4 w-4 text-foreground" />}
                Open GitHub
              </button>
              <button
                id="midnight-linkedin"
                type="button"
                onClick={() => { void handleCopyLinkedIn(); }}
                className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border text-[10px] font-medium transition-all ${
                  linkedinCopied ? 'border-primary/30 bg-primary/10 text-accent' : 'border-border bg-white/5 text-muted hover:bg-white/10'
                }`}
              >
                {linkedinCopied ? <CheckCircle className="h-4 w-4" /> : <Linkedin className="h-4 w-4 text-foreground" />}
                Copy draft
              </button>
              <Button
                id="midnight-mark-progress"
                variant="secondary"
                size="sm"
                onClick={handleMarkProgress}
                className="flex h-auto min-h-12 flex-col items-center justify-center rounded-xl text-[10px]"
              >
                <CheckCircle className="mb-0.5 h-4 w-4" />
                Mark progress
              </Button>
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-success/25 bg-success/10 p-3 success-pop">
              <CheckCircle className="h-4 w-4 shrink-0 text-success" />
              <p className="text-xs font-medium text-success">Streak protected for tonight. Close the laptop, guilt-free.</p>
            </div>
          )}
        </motion.div>
      ) : (
        /* ===== BEFORE 10 PM — go-live countdown + progress bar ===== */
        <motion.div
          key="daytime"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative overflow-hidden rounded-2xl border border-primary/15 bg-primary/[0.04] p-4"
          aria-label="Midnight rescue preview"
        >
          <div
            className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,90,0,0.08) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10">
              <MoonStar className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Midnight Rescue</p>
              <p className="text-[11px] text-subtle">Goes live in {minutesToGoLive}m — tonight at 10 PM.</p>
            </div>
          </div>

          {/* Progress toward 10 PM */}
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between text-[10px]">
              <span className="text-subtle">Tonight&apos;s window</span>
              <span className="font-mono font-semibold text-accent">{Math.round(progressToGoLive * 100)}%</span>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-white/8"
              role="progressbar"
              aria-valuenow={Math.round(progressToGoLive * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progress toward 10 PM"
            >
              <div
                className="progress-bar h-full"
                style={{ width: `${progressToGoLive * 100}%` }}
              />
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-muted/90">
            You&apos;ve got the whole evening. After 10 PM we&apos;ll keep you company with a quiet countdown and a few tiny actions — no guilt, ever.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
