import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BookOpen, CalendarDays, CheckCircle2, ChevronDown,
  ExternalLink, Flame, Lightbulb, Loader2, Palette, Send, Target, Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ChallengeHeader from '@/components/ChallengeHeader';
import TaskChecklist from '@/components/TaskChecklist';
import SubmissionForm from '@/components/SubmissionForm';
import Skeleton from '@/components/Skeleton';
import { microWin } from '@/components/MicroWin';
import { currentStudent, day12Challenge, linkedinDrafts, type Requirement, type Resource } from '@/lib/mock-data';
import { copyToClipboard } from '@/lib/utils';
import { STORAGE_KEYS, storageGet, storageSet } from '@/lib/storage';

// Heavy / on-demand pieces load only when needed.
const Confetti = lazy(() => import('@/components/Confetti'));
const MomentumCard = lazy(() => import('@/components/MomentumCard'));

interface Day12Submission {
  githubRepo?: string;
  githubCommit?: string;
  linkedin?: string;
  buildNotes?: string;
  submittedAt?: string;
}

const XP_EARNED = 50;

const resourceMeta: Record<'starter' | 'inspiration' | 'guide', { label: string; icon: React.ElementType; color: string; hint: string }> = {
  starter: { label: 'Starter idea', icon: Lightbulb, color: '#F59E0B', hint: 'Boilerplate to clone' },
  inspiration: { label: 'UI inspiration', icon: Palette, color: '#8B5CF6', hint: 'Patterns to borrow' },
  guide: { label: 'Submission guide', icon: BookOpen, color: '#22C55E', hint: 'How to commit + post' },
};

export default function DayChallengePage() {
  const navigate = useNavigate();
  const { day: dayParam } = useParams();
  const challenge = day12Challenge;
  const dayNumber = Number(dayParam) || challenge.day;

  const [requirements, setRequirements] = useState<Requirement[]>(challenge.requirements);
  const [githubRepo, setGithubRepo] = useState('');
  const [githubCommit, setGithubCommit] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [buildNotes, setBuildNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Hydrate persisted state (submission + checklist) from localStorage.
  useEffect(() => {
    const submission = storageGet<Day12Submission>(STORAGE_KEYS.day12Submission);
    const completedIds = storageGet<string[]>(STORAGE_KEYS.day12Checklist);
    const hydrate = window.setTimeout(() => {
      if (completedIds?.length) {
        setRequirements((items) => items.map((item) => ({ ...item, completed: completedIds.includes(item.id) })));
      }
      if (submission) {
        setGithubRepo(submission.githubRepo ?? '');
        setGithubCommit(submission.githubCommit ?? '');
        setLinkedin(submission.linkedin ?? '');
        setBuildNotes(submission.buildNotes ?? '');
        setRequirements((items) => items.map((item) => ({ ...item, completed: true })));
        setIsSuccess(true);
      }
    }, 0);
    return () => window.clearTimeout(hydrate);
  }, []);

  const completedCount = requirements.filter((requirement) => requirement.completed).length;
  const allRequirementsMet = completedCount === requirements.length;
  const githubOk = Boolean(githubRepo.trim() || githubCommit.trim());
  const linkedinOk = Boolean(linkedin.trim());
  const canSubmit = allRequirementsMet && githubOk && linkedinOk && !isSubmitting && !isSuccess;

  // One quiet celebration when the challenge opens — never again this session.
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!isSuccess) microWin(`Day ${dayNumber} unlocked — build something worth showing.`, '🎯');
    }, 900);
    return () => window.clearTimeout(id);
  }, [isSuccess, dayNumber]);

  const toggleRequirement = useCallback((id: string) => {
    if (isSuccess) return;
    setRequirements((items) => {
      const next = items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item));
      storageSet(
        STORAGE_KEYS.day12Checklist,
        next.filter((item) => item.completed).map((item) => item.id)
      );
      return next;
    });
  }, [isSuccess]);

  const handleCopyLinkedIn = async () => {
    await copyToClipboard(linkedinDrafts[0]);
    microWin('LinkedIn draft copied — make it sound like you.', '📢');
  };

  const submit = () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    window.setTimeout(() => {
      storageSet<Day12Submission>(STORAGE_KEYS.day12Submission, {
        githubRepo,
        githubCommit,
        linkedin,
        buildNotes,
        submittedAt: new Date().toISOString(),
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success(`Day ${dayNumber} submitted successfully 🎉`, {
        description: `+${XP_EARNED} XP · Streak ${currentStudent.streak} → ${currentStudent.streak + 1}`,
      });
    }, 900);
  };

  const backToDashboard = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/dashboard');
  };

  const resources = Object.entries(resourceMeta).map(([kind, meta]) => ({
    kind: kind as keyof typeof resourceMeta,
    meta,
    resource: challenge.resources.find((r: Resource) => r.kind === kind),
  })).filter((entry) => entry.resource);

  return (
    <div className="min-h-screen bg-bg pb-36">
      <Suspense fallback={null}>
        <Confetti active={isSuccess} />
      </Suspense>

      <header className="sticky top-0 z-40 border-b border-border glass safe-top">
        <div className="mx-auto flex max-w-lg items-center justify-between px-5 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={backToDashboard}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/5 text-foreground transition-colors hover:bg-white/10"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent">Day {dayNumber} of 60</p>
              <h1 className="truncate text-sm font-bold text-foreground">{challenge.title}</h1>
            </div>
          </div>
          <Badge variant={isSuccess ? 'success' : 'outline'}>{isSuccess ? 'Submitted' : 'Open'}</Badge>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-7 px-5 pt-6">
        {/* ===== Success state — replaces the flow once submitted ===== */}
        {isSuccess ? (
          <motion.section
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-2xl border border-success/30 bg-success/[0.07] p-5"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-success/15">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Day {dayNumber} submitted successfully</h2>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Your proof is locked in and your streak is protected for today.
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-border bg-surface p-2.5 text-center">
                <Zap className="mx-auto h-4 w-4 text-primary" />
                <p className="mt-1 text-sm font-extrabold text-foreground">+{XP_EARNED} XP</p>
                <p className="text-[9px] uppercase tracking-wide text-subtle">Earned</p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-2.5 text-center">
                <Flame className="mx-auto h-4 w-4 text-warning flame-pulse" />
                <p className="mt-1 text-sm font-extrabold text-foreground">
                  {currentStudent.streak} → {currentStudent.streak + 1}
                </p>
                <p className="text-[9px] uppercase tracking-wide text-subtle">Streak</p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-2.5 text-center">
                <CalendarDays className="mx-auto h-4 w-4 text-success" />
                <p className="mt-1 text-sm font-extrabold text-foreground">{dayNumber}/60</p>
                <p className="text-[9px] uppercase tracking-wide text-subtle">Progress</p>
              </div>
            </div>

            <Button onClick={() => navigate('/dashboard')} size="lg" className="mt-4 w-full font-bold">
              Go to Dashboard <ArrowRight className="ml-1 h-4 w-4" />
            </Button>

            <div className="mt-5">
              <Suspense fallback={<Skeleton className="h-80 w-full rounded-2xl" />}>
                <MomentumCard day={dayNumber} streak={currentStudent.streak + 1} projectName={challenge.title} githubUrl={githubRepo || githubCommit} />
              </Suspense>
            </div>
          </motion.section>
        ) : (
          <>
            {/* ===== Header identity ===== */}
            <ChallengeHeader
              dayNumber={dayNumber}
              title={challenge.title}
              estimatedTime={challenge.estimatedTime}
              difficulty={challenge.difficulty}
              track={challenge.track}
            />

            {/* ===== Goal card ===== */}
            <section aria-labelledby="goal-title" className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-accent" />
                <p id="goal-title" className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">Today&apos;s goal</p>
              </div>
              <p className="mt-2 text-[15px] font-semibold leading-snug text-foreground">{challenge.goal}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{challenge.description}</p>
            </section>

            {/* ===== Build checklist ===== */}
            <TaskChecklist
              tasks={requirements}
              completedCount={completedCount}
              onToggle={toggleRequirement}
              disabled={isSuccess}
            />

            {/* ===== Resources ===== */}
            <section aria-labelledby="resources-title">
              <div className="mb-3 flex items-center gap-2 px-1">
                <span className="h-3 w-1 rounded-full bg-primary" aria-hidden="true" />
                <h3 id="resources-title" className="text-sm font-semibold text-foreground">Jump-start your build</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {resources.map(({ kind, meta, resource }) => {
                  const Icon = meta.icon;
                  return (
                    <a
                      key={kind}
                      href={resource!.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-28 flex-col items-start justify-between rounded-2xl border border-border bg-surface p-3 shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-colors hover:border-primary/40"
                    >
                      <div className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: `${meta.color}1a` }}>
                        <Icon className="h-4.5 w-4.5" style={{ color: meta.color }} />
                      </div>
                      <span className="mt-2 block text-[12px] font-bold leading-tight text-foreground">{meta.label}</span>
                      <span className="mt-0.5 flex items-center gap-1 text-[10px] text-subtle">
                        <ExternalLink className="h-3 w-3 opacity-60" /> {meta.hint}
                      </span>
                    </a>
                  );
                })}
              </div>
            </section>

            {/* ===== Step-by-step path (collapsible) ===== */}
            <details className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm font-semibold text-foreground transition-colors hover:bg-white/[0.03] [&::-webkit-details-marker]:hidden">
                A calm path through it
                <ChevronDown className="h-4 w-4 text-subtle transition-transform group-open:rotate-180" />
              </summary>
              <ol className="space-y-3 border-t border-border p-4">
                {challenge.workflow.map((step) => (
                  <li key={step.step} className="flex gap-3">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-[9px] font-bold text-accent">
                      {step.step}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground">{step.title}</p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{step.description}</p>
                      {step.tip && <p className="mt-1 text-[11px] text-accent">Tip · {step.tip}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </details>

            {/* ===== Submission ===== */}
            <SubmissionForm
              githubRepo={githubRepo}
              githubCommit={githubCommit}
              linkedin={linkedin}
              buildNotes={buildNotes}
              isSuccess={isSuccess}
              checklistDone={allRequirementsMet}
              onGithubRepoChange={setGithubRepo}
              onGithubCommitChange={setGithubCommit}
              onLinkedinChange={setLinkedin}
              onBuildNotesChange={setBuildNotes}
              onCopyLinkedInDraft={() => { void handleCopyLinkedIn(); }}
              onGoToChecklist={() => document.getElementById('challenge-title')?.scrollIntoView({ behavior: 'smooth' })}
            />
          </>
        )}
      </main>

      {/* ===== Sticky submit bar ===== */}
      {!isSuccess && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-bg via-bg to-transparent px-5 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-8">
          <div className="mx-auto max-w-lg">
            <p className="mb-2 text-center text-[11px] text-subtle">
              {allRequirementsMet
                ? 'Add a GitHub link + LinkedIn post to unlock submit.'
                : `Tick every checklist task (${completedCount}/${requirements.length}) to unlock submit.`}
            </p>
            <Button
              type="button"
              onClick={submit}
              disabled={!canSubmit}
              size="lg"
              className="w-full font-bold shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            >
              {isSubmitting ? (
                <><Loader2 className="h-5 w-5 animate-spin" />Submitting…</>
              ) : (
                <><Send className="h-5 w-5" />Submit Day {dayNumber}</>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
