import { ChangeEvent, lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle, ArrowLeft, BookOpen, CheckCircle2, ChevronRight, Clock,
  Code2, ExternalLink, FileImage, FileText, Lightbulb, Loader2,
  Play, Send, Sparkles, Upload, Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { Github } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import FocusSprint from '@/components/FocusSprint';
import { microWin } from '@/components/MicroWin';
import {
  aiReflections, currentStudent, day12Challenge, linkedinDrafts, socialProofStudents,
} from '@/lib/mock-data';
import { copyToClipboard } from '@/lib/utils';

// Heavy / on-demand pieces load only when needed.
const Confetti = lazy(() => import('@/components/Confetti'));
const MomentumCard = lazy(() => import('@/components/MomentumCard'));

const storageKey = 'abtalks-day-12-submission';
type Tab = 'brief' | 'workflow' | 'submit';

function BuildPreview() {
  return (
    <section aria-labelledby="build-preview-title" className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between border-b border-border bg-white/[0.035] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex gap-1" aria-hidden="true">
            <i className="h-2 w-2 rounded-full bg-danger" />
            <i className="h-2 w-2 rounded-full bg-warning" />
            <i className="h-2 w-2 rounded-full bg-success" />
          </span>
          <p id="build-preview-title" className="text-xs font-semibold text-muted">What you&apos;ll make</p>
        </div>
        <span className="font-mono text-[10px] text-subtle/70">portfolio-card.html</span>
      </div>
      <div className="relative min-h-48 overflow-hidden bg-bg-elevated p-5">
        <div
          className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-60 rounded-2xl border border-white/10 bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-xs font-bold text-white">AS</div>
            <div>
              <p className="text-xs font-bold text-foreground">Arjun Sharma</p>
              <p className="text-[10px] text-subtle">Frontend builder · Delhi</p>
            </div>
          </div>
          <p className="mt-3 text-[10px] leading-relaxed text-muted">I turn curious ideas into calm, useful interfaces.</p>
          <div className="mt-3 flex gap-1.5">
            <span className="rounded-md bg-primary/15 px-1.5 py-1 text-[9px] text-accent">React</span>
            <span className="rounded-md bg-accent/10 px-1.5 py-1 text-[9px] text-accent">CSS</span>
            <span className="rounded-md bg-white/5 px-1.5 py-1 text-[9px] text-muted">Motion</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-6 flex-1 rounded-lg bg-white text-center text-[9px] font-bold leading-6 text-black">View work</span>
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/5 text-[10px]">↗</span>
          </div>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-primary/25 via-accent/25 to-transparent" aria-hidden="true" />
    </section>
  );
}

export default function DayChallengePage() {
  const navigate = useNavigate();
  const { day: dayParam } = useParams();
  const challenge = day12Challenge;
  const dayNumber = Number(dayParam) || challenge.day;
  const [requirements, setRequirements] = useState(challenge.requirements);
  const [activeTab, setActiveTab] = useState<Tab>('brief');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [reflectionText, setReflectionText] = useState('');
  const [screenshotName, setScreenshotName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return;
    try {
      const submission = JSON.parse(stored) as { githubUrl?: string; linkedinUrl?: string; reflectionText?: string; screenshotName?: string };
      const hydrateSubmission = window.setTimeout(() => {
        setGithubUrl(submission.githubUrl ?? '');
        setLinkedinUrl(submission.linkedinUrl ?? '');
        setReflectionText(submission.reflectionText ?? '');
        setScreenshotName(submission.screenshotName ?? '');
        setRequirements((items) => items.map((item) => ({ ...item, completed: true })));
        setIsSuccess(true);
      }, 0);
      return () => window.clearTimeout(hydrateSubmission);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  const completedCount = requirements.filter((requirement) => requirement.completed).length;
  const allRequirementsMet = completedCount === requirements.length;
  const submissionReady = allRequirementsMet && Boolean(githubUrl) && !isSubmitting;
  const submitLabel = isSuccess ? 'Submitted' : activeTab === 'submit' ? `Submit Day ${dayNumber}` : 'Review submission';

  // One quiet celebration when the challenge opens — never again this session.
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!isSuccess) microWin(`Day ${dayNumber} unlocked — build something worth showing.`, '🎯');
    }, 900);
    return () => window.clearTimeout(id);
  }, [isSuccess, challenge.day]);

  const toggleRequirement = useCallback((id: string) => {
    if (isSuccess) return;
    setRequirements((items) => items.map((item) => item.id === id ? { ...item, completed: !item.completed } : item));
  }, [isSuccess]);

  const handleCopyLinkedIn = async () => {
    await copyToClipboard(linkedinDrafts[0]);
    microWin('LinkedIn draft copied — make it sound like you.', '📢');
  };

  const generateReflection = () => {
    const nextReflection = aiReflections[Math.floor(Math.random() * aiReflections.length)];
    setReflectionText(nextReflection);
    microWin('A reflection starter is ready. Edit it in your voice.', '💭');
  };

  const handleScreenshot = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setScreenshotName(file.name);
    microWin('Screenshot attached to this local submission.', '📸');
  };

  const submit = async () => {
    if (isSuccess) return;
    if (!allRequirementsMet) {
      setActiveTab('brief');
      toast.error('A couple of checklist items are left — you are close.');
      return;
    }
    if (!githubUrl) {
      setActiveTab('submit');
      toast.error('Drop in your GitHub repository URL and we are done.');
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    window.localStorage.setItem(storageKey, JSON.stringify({ githubUrl, linkedinUrl, reflectionText, screenshotName, submittedAt: new Date().toISOString() }));
    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.success(`Day ${dayNumber} completed 🎉`, {
      description: 'Streak protected for today.',
    });
  };

  const backToDashboard = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/dashboard');
  };

  const tabContent = useMemo(() => {
    if (activeTab === 'brief') {
      return (
        <motion.div key="brief" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} className="space-y-7">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />{challenge.estimatedTime}</Badge>
            <Badge variant="outline" className="gap-1"><Code2 className="h-3 w-3" />{challenge.track}</Badge>
            <Badge variant="warning">{challenge.difficulty}</Badge>
          </div>

          <section>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">Today&apos;s challenge</p>
            <h2 className="mt-1 text-[1.35rem] font-black leading-tight text-foreground">{challenge.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted break-words">{challenge.description}</p>
          </section>

          <BuildPreview />

          <section>
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-warning" />
              <h3 className="text-sm font-semibold text-foreground">You&apos;ll practice</h3>
            </div>
            <div className="space-y-2">
              {challenge.objectives.map((objective, index) => (
                <div key={objective} className="flex gap-3 rounded-xl border border-border bg-surface p-3 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-primary/15 text-[10px] font-bold text-accent">{index + 1}</span>
                  <p className="text-xs leading-relaxed text-muted">{objective}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between border-b border-border bg-white/[0.035] p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />Build checklist
              </h3>
              <span className="text-xs font-semibold text-subtle">{completedCount}/{requirements.length}</span>
            </div>
            <div className="p-2">
              {requirements.map((requirement) => (
                <label
                  key={requirement.id}
                  className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors ${requirement.completed ? 'bg-primary/10' : 'hover:bg-white/5'}`}
                >
                  <Checkbox id={`requirement-${requirement.id}`} checked={requirement.completed} onCheckedChange={() => toggleRequirement(requirement.id)} disabled={isSuccess} className="mt-0.5" />
                  <span className={`text-sm leading-snug ${requirement.completed ? 'text-muted line-through decoration-border-muted' : 'text-foreground'}`}>{requirement.label}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Starter resources</h3>
            </div>
            <div className="space-y-2">
              {challenge.resources.map((resource) => (
                <a
                  key={resource.title}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-primary/40 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {resource.type === 'video' ? <Play className="h-4 w-4 shrink-0 text-danger" /> : resource.type === 'github' ? <Github className="h-4 w-4 shrink-0 text-foreground" /> : <FileText className="h-4 w-4 shrink-0 text-primary" />}
                    <span className="truncate text-xs font-semibold text-muted">{resource.title}</span>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-subtle/70" />
                </a>
              ))}
            </div>
          </section>
        </motion.div>
      );
    }

    if (activeTab === 'workflow') {
      return (
        <motion.div key="workflow" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} className="space-y-7">
          <FocusSprint />
          <section>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">A calm path through it</p>
            <h2 className="mt-1 text-xl font-bold text-foreground">Step-by-step workflow</h2>
            <div className="mt-5 space-y-4">
              {challenge.workflow.map((step, index) => (
                <div key={step.step} className="relative pl-8">
                  {index < challenge.workflow.length - 1 && <div className="absolute bottom-[-17px] left-[7px] top-5 w-px bg-border" aria-hidden="true" />}
                  <span className="absolute left-0 top-1 grid h-4 w-4 place-items-center rounded-full bg-primary text-[8px] font-bold text-white">{step.step}</span>
                  <div className="rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                    <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">{step.description}</p>
                    {step.tip && <p className="mt-3 rounded-lg border border-primary/15 bg-primary/[0.06] p-2.5 text-[11px] leading-relaxed text-accent">Tip · {step.tip}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-warning/25 bg-warning/[0.06] p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl" aria-hidden="true">🛟</span>
              <div>
                <p className="text-sm font-semibold text-foreground">Need a recovery plan?</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">A rough day is not a failed challenge. Take the smallest next step and return when you can.</p>
                <button type="button" onClick={() => setShowRecovery((visible) => !visible)} className="mt-3 min-h-11 text-xs font-semibold text-warning hover:text-foreground transition-colors">
                  {showRecovery ? 'Hide reset plan' : 'Show a five-minute reset'}
                </button>
              </div>
            </div>
            <AnimatePresence>
              {showRecovery && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <ol className="mt-1 space-y-1 border-t border-warning/15 pt-3 text-xs leading-relaxed text-muted">
                    <li>1. Open the project and write one small TODO.</li>
                    <li>2. Work for five minutes, no more required.</li>
                    <li>3. If momentum returns, start a Focus Sprint.</li>
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </motion.div>
      );
    }

    return (
      <motion.div key="submit" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} className="space-y-6">
        {!allRequirementsMet && !isSuccess && (
          <section className="flex gap-3 rounded-2xl border border-warning/30 bg-warning/[0.07] p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
            <div>
              <p className="text-sm font-semibold text-warning">{requirements.length - completedCount} checklist items left</p>
              <p className="mt-1 text-xs leading-relaxed text-warning/80">Finish the build checklist before you submit. You can still save a reflection below.</p>
              <button type="button" onClick={() => setActiveTab('brief')} className="mt-3 min-h-11 text-xs font-semibold text-foreground">
                Go to checklist <ChevronRight className="inline h-3.5 w-3.5" />
              </button>
            </div>
          </section>
        )}

        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">Make it visible</p>
          <h2 className="mt-1 text-xl font-bold text-foreground">Your submission</h2>
          <p className="mt-2 text-xs leading-relaxed text-subtle">The URL, screenshot and reflection stay in this browser for the demo.</p>
        </section>

        <div className="space-y-4">
          <div>
            <label htmlFor="github-url" className="mb-2 flex text-sm font-semibold text-foreground">
              <Github className="mr-2 h-4 w-4" />GitHub repository <span className="ml-1 text-danger">*</span>
            </label>
            <input id="github-url" type="url" disabled={isSuccess} placeholder="https://github.com/you/portfolio-card" value={githubUrl} onChange={(event) => setGithubUrl(event.target.value)} className="input-field min-h-12 w-full px-4 text-sm" />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="linkedin-url" className="flex text-sm font-semibold text-foreground">LinkedIn post <span className="ml-1 font-normal text-subtle">(optional)</span></label>
              <button type="button" disabled={isSuccess} onClick={() => { void handleCopyLinkedIn(); }} className="min-h-11 text-xs font-semibold text-primary hover:text-accent disabled:opacity-40 transition-colors">Copy draft</button>
            </div>
            <input id="linkedin-url" type="url" disabled={isSuccess} placeholder="https://linkedin.com/posts/..." value={linkedinUrl} onChange={(event) => setLinkedinUrl(event.target.value)} className="input-field min-h-12 w-full px-4 text-sm" />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="reflection" className="text-sm font-semibold text-foreground">Daily reflection</label>
              <button type="button" disabled={isSuccess} onClick={generateReflection} className="min-h-11 text-xs font-semibold text-accent hover:text-primary disabled:opacity-40 transition-colors">
                <Sparkles className="mr-1 inline h-3.5 w-3.5" />AI suggestion
              </button>
            </div>
            <textarea id="reflection" rows={5} disabled={isSuccess} placeholder="What did you notice while building today?" value={reflectionText} onChange={(event) => setReflectionText(event.target.value)} className="input-field w-full resize-none px-4 py-3 text-sm" />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-foreground">Build screenshot <span className="font-normal text-subtle">(optional)</span></p>
            <label className={`flex min-h-20 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed p-3 text-xs transition-colors ${isSuccess ? 'border-success/30 bg-success/[0.04] text-success' : 'border-border bg-surface text-muted hover:border-primary/50'}`}>
              <input type="file" accept="image/*" disabled={isSuccess} onChange={handleScreenshot} className="sr-only" />
              {screenshotName ? (
                <><FileImage className="h-4 w-4" />{screenshotName}</>
              ) : (
                <><Upload className="h-4 w-4" />Attach a preview of your build</>
              )}
            </label>
          </div>
        </div>

        <section className="rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Small wins from the community</h3>
          </div>
          <div className="mt-3 space-y-3">
            {socialProofStudents.slice(0, 2).map((student) => (
              <div key={student.name} className="flex gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-[10px] font-bold text-accent">{student.avatar}</div>
                <p className="text-xs leading-relaxed text-muted">
                  <span className="font-semibold text-foreground">{student.name}</span> · &ldquo;{student.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => toast('Your work can be the next bit of momentum for someone else.')} className="mt-3 min-h-11 text-xs font-semibold text-accent hover:text-primary transition-colors">
            Share the energy
          </button>
        </section>
      </motion.div>
    );
  }, [activeTab, allRequirementsMet, challenge, completedCount, githubUrl, isSuccess, linkedinUrl, reflectionText, requirements, screenshotName, showRecovery, toggleRequirement]);

  return (
    <div className="min-h-screen bg-bg pb-32">
      <Suspense fallback={null}>
        <Confetti active={isSuccess} />
      </Suspense>

      <header className="sticky top-0 z-40 border-b border-border glass safe-top">
        <div className="mx-auto flex max-w-lg items-center justify-between px-5 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" onClick={backToDashboard} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/5 text-foreground transition-colors hover:bg-white/10" aria-label="Go back">
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

      <nav className="sticky top-[60px] z-30 border-b border-border bg-bg/95 px-5 backdrop-blur" aria-label="Challenge sections">
        <div className="mx-auto flex max-w-lg">
          {(['brief', 'workflow', 'submit'] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`min-h-12 flex-1 border-b-2 text-xs font-semibold capitalize transition-colors ${activeTab === tab ? 'border-primary text-accent' : 'border-transparent text-subtle hover:text-muted'}`}
              aria-current={activeTab === tab ? 'page' : undefined}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-lg px-5 pt-6">
        {isSuccess && (
          <motion.section
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 overflow-hidden rounded-2xl border border-success/30 bg-success/[0.07] p-4"
            role="status"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-success/15">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">Day {dayNumber} completed 🎉</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">Streak protected for today. Your small, public proof matters.</p>
              </div>
            </div>
            <div className="mt-4">
              <Suspense fallback={<div className="h-72 w-full shimmer rounded-2xl" aria-hidden="true" />}>
                <MomentumCard day={challenge.day} streak={currentStudent.streak + 1} projectName={challenge.title} githubUrl={githubUrl} />
              </Suspense>
            </div>
          </motion.section>
        )}

        <AnimatePresence mode="wait">{tabContent}</AnimatePresence>
      </main>

      {!isSuccess && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-bg via-bg to-transparent px-5 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-8">
          <div className="mx-auto max-w-lg">
            <Button
              type="button"
              onClick={() => activeTab === 'submit' ? submit() : setActiveTab('submit')}
              disabled={activeTab === 'submit' && !submissionReady}
              size="lg"
              className="w-full font-bold shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            >
              {isSubmitting ? (
                <><Loader2 className="h-5 w-5 animate-spin" />Submitting…</>
              ) : (
                <><Send className="h-5 w-5" />{submitLabel}</>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
