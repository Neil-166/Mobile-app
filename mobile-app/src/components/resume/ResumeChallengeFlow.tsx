import { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import {
  CalendarDays, ChevronRight, Flame, MoonStar, RotateCcw, Rocket, TriangleAlert, X, Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { microWin } from '@/components/MicroWin';
import { missedDayFlow, type ResumeOption } from '@/lib/mock-data';
import { getReminderPreference, getResumeChoice, setReminderPreference, setResumeChoice } from '@/lib/resume';
import ChallengePreviewCard from './ChallengePreviewCard';
import ReminderToggle from './ReminderToggle';
import ResumeOptionCard from './ResumeOptionCard';

interface ResumeChallengeFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** One stat cell inside the resume sheet's stats card. */
function StatTile({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3 text-center">
      <div className="mx-auto grid h-8 w-8 place-items-center rounded-lg bg-white/5">{icon}</div>
      <p className="mt-1.5 truncate text-[15px] font-extrabold tracking-tight text-foreground">{value}</p>
      <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.1em] text-subtle">{label}</p>
    </div>
  );
}

/**
 * Mobile-first full-screen sheet for the missed-day recovery flow.
 * Built on Radix Dialog so focus trapping, Escape-to-close, scroll lock and
 * backdrop-click dismissal come for free; the footer CTA stays pinned to the
 * bottom because the body is the only scrollable region.
 */
export default function ResumeChallengeFlow({ open, onOpenChange }: ResumeChallengeFlowProps) {
  const navigate = useNavigate();
  const flow = missedDayFlow;
  const { missedDay, nextDay, previousStreak, progress, status, preview, reminder, encouragement, copy } = flow;

  // Hydrated once, then kept in sync with localStorage on every change.
  const [option, setOption] = useState<ResumeOption>(() => getResumeChoice());
  const [reminderOn, setReminderOn] = useState<boolean>(() => getReminderPreference());

  const titleId = useId();
  const descId = useId();

  const handleSelect = (next: ResumeOption) => {
    setOption(next);
    setResumeChoice(next);
  };

  const handleReminder = (next: boolean) => {
    setReminderOn(next);
    setReminderPreference(next);
  };

  const handlePrimary = () => {
    if (option === 'continue') {
      navigate(`/day/${nextDay}`);
    } else {
      microWin(`Day ${missedDay} reopened (demo mode).`, '🔓');
    }
  };

  const handleRedo = () => microWin(`Day ${missedDay} reopened (demo mode).`, '🔓');

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Dimmed, blurred backdrop */}
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-[rcf-fade-in_0.22s_ease-out] data-[state=closed]:animate-[rcf-fade-out_0.18s_ease-in]"
          aria-hidden="true"
        />

        <Dialog.Content
          aria-labelledby={titleId}
          aria-describedby={descId}
          className="fixed inset-x-0 bottom-0 z-50 mx-auto flex h-dvh w-full max-w-lg flex-col overflow-hidden border border-border bg-bg-elevated shadow-[0_-8px_40px_rgba(0,0,0,0.5)] outline-none data-[state=open]:animate-[rcf-sheet-in_0.34s_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[rcf-sheet-out_0.24s_ease-in]"
        >
          {/* Sheet + overlay keyframes (kept local so the component is self-contained) */}
          <style>{`
            @keyframes rcf-sheet-in  { from { transform: translate3d(0, 100%, 0); } to { transform: translate3d(0, 0, 0); } }
            @keyframes rcf-sheet-out { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(0, 100%, 0); } }
            @keyframes rcf-fade-in   { from { opacity: 0; } to { opacity: 1; } }
            @keyframes rcf-fade-out  { from { opacity: 1; } to { opacity: 0; } }
          `}</style>

          {/* ===== Header ===== */}
          <header className="relative shrink-0 border-b border-border px-5 pb-4 pt-5">
            <div className="flex items-start gap-3 pr-12">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-warning/15">
                <TriangleAlert className="h-5.5 w-5.5 text-warning" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <Dialog.Title id={titleId} className="text-lg font-extrabold tracking-tight text-foreground">
                  {copy.modalTitle}
                </Dialog.Title>
                <Dialog.Description id={descId} className="mt-0.5 text-[13px] leading-snug text-muted">
                  {copy.modalSupport}
                </Dialog.Description>
              </div>
            </div>

            <Dialog.Close
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-xl text-subtle transition-colors hover:bg-white/5 hover:text-foreground"
              aria-label="Close resume challenge"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>

            {/* Thin progress: Day 11 missed → Day 12 ready */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-warning/15">
                  <TriangleAlert className="h-3.5 w-3.5 text-warning" aria-hidden="true" />
                </span>
                <span className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-warning/70 to-primary/70" aria-hidden="true" />
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/15">
                  <Zap className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[10px] font-semibold">
                <span className="text-warning">Day {missedDay} missed</span>
                <span className="text-accent">Day {nextDay} ready</span>
              </div>
            </div>
          </header>

          {/* ===== Scrollable body ===== */}
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5">
            {/* Stats card */}
            <div className="grid grid-cols-3 gap-2">
              <StatTile
                icon={<Flame className="h-4 w-4 text-warning" aria-hidden="true" />}
                value={`${previousStreak} days`}
                label="Previous streak"
              />
              <StatTile
                icon={<CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />}
                value={`${progress.current} / ${progress.total}`}
                label="Challenge progress"
              />
              <StatTile
                icon={<MoonStar className="h-4 w-4 text-subtle" aria-hidden="true" />}
                value={status}
                label="Current status"
              />
            </div>

            {/* Continue options */}
            <section aria-labelledby="resume-options-title">
              <h3
                id="resume-options-title"
                className="mb-2 px-1 text-[11px] font-bold uppercase tracking-[0.12em] text-subtle"
              >
                Continue options
              </h3>
              <div className="space-y-2" role="radiogroup" aria-labelledby="resume-options-title">
                <ResumeOptionCard
                  value="continue"
                  icon={<Rocket className="h-4 w-4 text-accent" aria-hidden="true" />}
                  title={`Continue from Day ${nextDay}`}
                  description="Keep your progress and continue tonight."
                  selected={option === 'continue'}
                  onSelect={handleSelect}
                />
                <ResumeOptionCard
                  value="redo"
                  icon={<RotateCcw className="h-4 w-4 text-muted" aria-hidden="true" />}
                  title={`Redo Day ${missedDay} first`}
                  description="Complete the missed task before moving forward."
                  selected={option === 'redo'}
                  onSelect={handleSelect}
                />
              </div>
            </section>

            {/* Tonight's challenge preview */}
            <ChallengePreviewCard
              day={preview.day}
              title={preview.title}
              estimatedTime={preview.estimatedTime}
              description={preview.description}
            />

            {/* Reminder toggle — saved to localStorage */}
            <ReminderToggle
              checked={reminderOn}
              onChange={handleReminder}
              label={reminder.label}
              hint={reminder.hint}
            />

            {/* Late-night encouragement */}
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-bg-elevated p-4">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5">
                <MoonStar className="h-4 w-4 text-muted" aria-hidden="true" />
              </div>
              <p className="text-xs leading-relaxed text-muted">{encouragement}</p>
            </div>
          </div>

          {/* ===== Sticky footer CTA ===== */}
          <footer className="shrink-0 border-t border-border bg-bg-elevated/95 px-5 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3 backdrop-blur">
            <Button onClick={handlePrimary} variant="gradient" size="lg" className="w-full font-bold shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
              {option === 'continue' ? `Continue to Day ${nextDay}` : `Redo Day ${missedDay}`}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            {option === 'continue' && (
              <button
                type="button"
                onClick={handleRedo}
                className="mt-2 flex min-h-11 w-full items-center justify-center gap-1.5 text-xs font-semibold text-subtle transition-colors hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Redo Day {missedDay}
              </button>
            )}
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
