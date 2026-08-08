'use client';

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
          className="relative overflow-hidden rounded-2xl border border-[#F59E0B]/20 bg-[#0B0B10]/80 p-4 night-mode"
          role="alert"
          aria-live="polite"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F59E0B]/[0.05] to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#8B5CF6]/10 blur-2xl" aria-hidden="true" />

          <button
            type="button"
            onClick={() => { setVisible(false); onDismiss?.(); }}
            className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-lg text-[#8B8B99] transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Dismiss midnight rescue"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#F59E0B]/10">
              <MoonStar className="h-4 w-4 text-[#F59E0B]/90" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Midnight Rescue is live</p>
              <p className="text-[11px] text-[#8B8B99]">A calm countdown, not a panic button.</p>
            </div>
          </div>

          {/* Live countdown */}
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#F59E0B]/15 bg-black/20 px-3 py-2.5">
            <Clock className="h-4 w-4 shrink-0 text-[#F59E0B]/80" />
            <span className="text-[11px] text-[#C7C7D1]">Before midnight</span>
            <span className="ml-auto font-mono text-base font-bold tabular-nums text-[#FBBF24]">
              {formatLiveCountdown(secondsToMidnight)}
            </span>
          </div>

          {/* Encouraging copy — never guilt-inducing */}
          <p className="mt-3 text-xs leading-relaxed text-[#C7C7D1]/90">
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
                  githubOpened ? 'border-[#22C55E]/30 bg-[#22C55E]/10 text-[#86EFAC]' : 'border-[#27272F] bg-white/5 text-[#C7C7D1] hover:bg-white/10'
                }`}
              >
                {githubOpened ? <CheckCircle className="h-4 w-4" /> : <Github className="h-4 w-4 text-white" />}
                Open GitHub
              </button>
              <button
                id="midnight-linkedin"
                type="button"
                onClick={() => { void handleCopyLinkedIn(); }}
                className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border text-[10px] font-medium transition-all ${
                  linkedinCopied ? 'border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#67E8F9]' : 'border-[#27272F] bg-white/5 text-[#C7C7D1] hover:bg-white/10'
                }`}
              >
                {linkedinCopied ? <CheckCircle className="h-4 w-4" /> : <Linkedin className="h-4 w-4 text-white" />}
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
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#22C55E]/25 bg-[#22C55E]/10 p-3 success-pop">
              <CheckCircle className="h-4 w-4 shrink-0 text-[#4ADE80]" />
              <p className="text-xs font-medium text-[#86EFAC]">Streak protected for tonight. Close the laptop, guilt-free.</p>
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
          className="relative overflow-hidden rounded-2xl border border-[#22D3EE]/15 bg-[#22D3EE]/[0.045] p-4"
          aria-label="Midnight rescue preview"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#22D3EE]/10 blur-3xl" aria-hidden="true" />

          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#22D3EE]/10">
              <MoonStar className="h-4 w-4 text-[#67E8F9]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Midnight Rescue</p>
              <p className="text-[11px] text-[#8B8B99]">Goes live in {minutesToGoLive}m — tonight at 10 PM.</p>
            </div>
          </div>

          {/* Progress toward 10 PM */}
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between text-[10px]">
              <span className="text-[#8B8B99]">Tonight&apos;s window</span>
              <span className="font-mono font-semibold text-[#67E8F9]">{Math.round(progressToGoLive * 100)}%</span>
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

          <p className="mt-3 text-xs leading-relaxed text-[#C7C7D1]/90">
            You&apos;ve got the whole evening. After 10 PM we&apos;ll keep you company with a quiet countdown and a few tiny actions — no guilt, ever.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
