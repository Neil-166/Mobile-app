import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Award, CheckCircle2, ChevronDown, Flame, Medal, Shield,
  Sparkles, Trophy, UserRound, Users,
} from 'lucide-react';
import { Github } from '@/components/Icons';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';

import EmptyState from '@/components/EmptyState';
import EnergyCheckin from '@/components/EnergyCheckin';
import FocusSprint from '@/components/FocusSprint';
import MidnightRescue from '@/components/MidnightRescue';
import MissedDayBanner from '@/components/resume/MissedDayBanner';
import ResumeChallengeFlow from '@/components/resume/ResumeChallengeFlow';
import StateTabs from '@/components/StateTabs';
import StreakBadge from '@/components/StreakBadge';

import ProgressTimeline from '@/components/ProgressTimeline';
import AchievementGrid from '@/components/AchievementGrid';
import ReflectionCard from '@/components/ReflectionCard';
import {
  achievements, communityFeed, currentStudent, day12Challenge, leaderboard,
  students, type Student,
} from '@/lib/mock-data';
import { formatTime, getAvatarColor, getGreeting, getRelativeTime, isAfterTenPM } from '@/lib/utils';
import { STORAGE_KEYS, storageGet, storageSet } from '@/lib/storage';

type StudentState = Student['state'];

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StateNotice({ state, onProfile, onResume }: { state: StudentState; onProfile: () => void; onResume: () => void }) {
  if (state === 'active') return null;

  // The missed-day edge case gets its own recovery banner + resume flow.
  if (state === 'missed-day') {
    return <MissedDayBanner onResume={onResume} />;
  }

  const map = {
    'first-day': {
      variant: 'first-day' as const,
      title: 'Welcome to day one',
      body: 'Your first commit can be tiny. The point is giving tomorrow’s version of you a starting line.',
      action: 'Explore a sample day',
      href: '/day/12',
    },
    'empty-profile': {
      variant: 'empty-profile' as const,
      title: 'Add the places where you build.',
      body: 'Connect GitHub and LinkedIn when you are ready. A complete profile turns quiet effort into a visible learning record.',
      action: 'Complete profile',
      href: '#profile',
    },
  }[state];

  return (
    <EmptyState variant={map.variant} title={map.title} body={map.body}>
      {state === 'empty-profile' ? (
        <Button onClick={onProfile} variant="secondary" size="sm" className="w-full min-h-12">
          <UserRound className="h-4 w-4" /> {map.action}
        </Button>
      ) : (
        <Link to={map.href} className="block w-full">
          <Button variant="secondary" size="sm" className="w-full min-h-12">
            {map.action} <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </EmptyState>
  );
}

export default function Dashboard() {
  const [now, setNow] = useState(() => new Date());
  const [selectedState, setSelectedState] = useState<StudentState>(() => {
    const saved = storageGet<StudentState>(STORAGE_KEYS.dashboardTab);
    return saved && ['active', 'first-day', 'missed-day', 'empty-profile'].includes(saved) ? saved : 'active';
  });
  const [submittedToday, setSubmittedToday] = useState(false);
  const [showAllCommunity, setShowAllCommunity] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const tick = window.setInterval(() => setNow(new Date()), 30_000);
    const submissionRead = window.setTimeout(() => {
      setSubmittedToday(Boolean(storageGet(STORAGE_KEYS.day12Submission)));
    }, 0);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(submissionRead);
    };
  }, []);

  const student = useMemo(() => {
    if (selectedState === 'first-day') return students.firstDay;
    if (selectedState === 'missed-day') return students.missedDay;
    if (selectedState === 'empty-profile') return students.emptyProfile;
    return currentStudent;
  }, [selectedState]);

  const greeting = getGreeting(now.getHours());
  const nightMode = isAfterTenPM();
  const completed = selectedState === 'active' && submittedToday;
  const dayDone = completed ? student.currentDay + 1 : student.currentDay;
  const streak = completed ? student.streak + 1 : student.streak;
  const percent = Math.round((dayDone / 60) * 100);
  const earnedCount = achievements.filter((a) => a.earned).length;

  const visibleCommunity = showAllCommunity ? communityFeed : communityFeed.slice(0, 3);
  const visibleLeaderboard = showLeaderboard ? leaderboard : leaderboard.slice(0, 3);
  const hasSubmissions = selectedState === 'active' || selectedState === 'missed-day';

  const scrollToProfile = () => {
    document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const stickyCta = {
    active: { label: completed ? 'Day 12 complete' : 'Continue Day 12', href: '/day/12' },
    'first-day': { label: 'Start Day 1', href: '/day/12' },
    'missed-day': { label: 'Resume the challenge', href: null, onClick: () => setResumeOpen(true) },
    'empty-profile': { label: 'Complete your profile', href: null },
  }[selectedState];

  return (
    <div className={`min-h-screen bg-bg pb-dashboard ${nightMode ? 'night-mode' : ''}`}>
      <AnimatedBackground />

      {/* ===== Two-row header ===== */}
      <header className="sticky top-0 z-30 glass safe-top">
        <div className="mx-auto max-w-lg px-5 pb-3 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted">{greeting}</p>
            <time dateTime={now.toISOString()} className="font-mono text-[11px] tabular-nums text-subtle">
              {formatTime(now)}
            </time>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <h1 className="min-w-0 truncate text-2xl font-extrabold leading-tight tracking-tight text-foreground">
              {student.name}
            </h1>
            <div className="flex shrink-0 items-center gap-2.5">
              <StreakBadge streak={streak} size="sm" />
              <button
                type="button"
                onClick={scrollToProfile}
                aria-label={`Go to ${student.name}'s profile`}
                className="grid h-12 w-12 place-items-center rounded-full text-sm font-bold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)] transition-transform active:scale-95"
                style={{ background: getAvatarColor(student.avatar) }}
              >
                {student.avatar}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-lg space-y-7 px-5 pt-6">
        {/* ===== Segmented control (demo edge states) ===== */}
        <StateTabs value={selectedState} onChange={(tab) => { setSelectedState(tab); storageSet(STORAGE_KEYS.dashboardTab, tab); }} />

        {/* ===== Edge-state notice ===== */}
        <StateNotice state={selectedState} onProfile={scrollToProfile} onResume={() => setResumeOpen(true)} />

        {/* ===== Today's Task — dominant card ===== */}
        {selectedState === 'active' && (
          <Reveal delay={0.05}>
            <Link to="/day/12" className="block">
              <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-surface p-5 shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-colors hover:border-primary/45">
                <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,90,0,0.12) 0%, transparent 70%)' }} aria-hidden="true" />
                <div className="relative">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                    {completed ? 'Day complete ✓' : "Today's task"}
                  </p>
                  <h2 className="mt-1.5 text-[20px] font-extrabold leading-snug text-foreground">
                    {completed ? `Day ${dayDone} submitted` : day12Challenge.title}
                  </h2>
                  <p className="mt-1 text-[12px] text-subtle">
                    {completed ? `+${student.streak + 1} streak · ${percent}% done` : `${day12Challenge.estimatedTime} · Day ${dayDone} of 60`}
                  </p>
                </div>
                <div className="mt-4">
                  <Button variant={completed ? 'success' : 'gradient'} size="lg" className="w-full font-bold shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
                    {completed ? <><CheckCircle2 className="h-5 w-5" /> Day {dayDone} complete</> : <><Flame className="h-5 w-5 flame-pulse" /> Continue Day 12 <ArrowRight className="h-4 w-4" /></>}
                  </Button>
                </div>
              </div>
            </Link>
          </Reveal>
        )}

        {/* ===== Tonight's Session — detail card ===== */}
        {selectedState === 'active' && !completed && (
          <Reveal>
            <section className="rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-3 w-1 rounded-full bg-primary" aria-hidden="true" />
                <h2 className="text-sm font-semibold text-foreground">Tonight&apos;s session</h2>
              </div>
              <div className="rounded-xl border border-border bg-bg-elevated p-3.5">
                <p className="text-[13px] font-bold text-foreground">{day12Challenge.title}</p>
                <p className="mt-1 text-[11px] text-subtle">{day12Challenge.estimatedTime} · {day12Challenge.difficulty}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{day12Challenge.goal}</p>
              </div>
              <Link to="/day/12" className="mt-3 block">
                <Button variant="default" size="sm" className="w-full min-h-12 font-bold">
                  Start tonight&apos;s challenge <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </section>
          </Reveal>
        )}

        {/* ===== Progress hierarchy — prominent display ===== */}
        <Reveal>
          <section aria-label="Challenge progress" className="rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold text-foreground">Your progress</h2>
              <span className="text-xs font-semibold text-primary">{percent}% done</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-border bg-bg-elevated p-3 text-center">
                <p className="text-[18px] font-extrabold text-foreground">{dayDone}<span className="text-subtle"> / 60</span></p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-subtle">Days</p>
              </div>
              <div className="rounded-xl border border-border bg-bg-elevated p-3 text-center">
                <p className="text-[18px] font-extrabold text-foreground">{60 - dayDone}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-subtle">Left</p>
              </div>
              <div className="rounded-xl border border-border bg-bg-elevated p-3 text-center">
                <p className="text-[18px] font-extrabold text-warning">{streak}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-subtle">Streak 🔥</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/8" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Challenge progress">
              <div className="progress-bar h-full" style={{ width: `${percent}%` }} />
            </div>
          </section>
        </Reveal>

        {/* ===== Last 7 days ===== */}
        <Reveal>
          <ProgressTimeline streak={streak} />
        </Reveal>

        {/* ===== Achievements ===== */}
        <Reveal>
          <section>
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Trophy className="h-4 w-4 text-warning" /> Achievements
              </h2>
              <span className="text-xs text-subtle">{earnedCount} unlocked</span>
            </div>
            <AchievementGrid />
            {selectedState === 'active' && (
              <p className="mt-2 px-1 text-[11px] leading-relaxed text-subtle">
                Top 18% this week. Complete Day 12 to maintain your standing.
                <br />
                <span className="text-subtle">Based on consecutive submissions this week.</span>
              </p>
            )}
          </section>
        </Reveal>

        {/* ===== 2-minute nightly reflection ===== */}
        <Reveal>
          <ReflectionCard />
        </Reveal>

        {/* ===== Midnight Rescue (time-based) ===== */}
        <Reveal>
          <MidnightRescue />
        </Reveal>

        {/* ===== Focus Sprint ===== */}
        <Reveal>
          <section aria-labelledby="focus-sprint-heading" className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <span className="h-3 w-1 rounded-full bg-primary" aria-hidden="true" />
              <h2 id="focus-sprint-heading" className="text-sm font-semibold text-foreground">Deep work</h2>
            </div>
            <FocusSprint compact />
          </section>
        </Reveal>

        <Reveal><EnergyCheckin /></Reveal>

        {/* ===== GitHub Contribution Graph ===== */}
        <Reveal>
          <section>
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Github className="h-4 w-4 text-success" /> GitHub Activity
              </h2>
              <span className="text-xs text-subtle">Last 12 weeks</span>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(18, 1fr)' }}>
                {Array.from({ length: 126 }, (_, i) => {
                  const r = Math.sin(i * 127 + 311) * 0.5 + 0.5;
                  const level = r > 0.35 ? Math.min(4, Math.floor(r * 5)) : 0;
                  const colors = ['#151821', '#0e4429', '#006d32', '#26a641', '#39d353'];
                  return <div key={i} className="aspect-square rounded-[2px]" style={{ background: colors[level] }} />;
                })}
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-subtle">
                <span>Less</span>
                <div className="flex items-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((l) => (
                    <div key={l} className="h-2 w-2 rounded-sm" style={{ background: ['#151821', '#0e4429', '#006d32', '#26a641', '#39d353'][l] }} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ===== Stats ===== */}
        <Reveal>
          <section className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div className="mb-4 flex items-center justify-between">
                <Shield className="h-5 w-5 text-success" />
                <span className="text-xs font-bold text-muted">{student.shieldsRemaining}/1</span>
              </div>
              <p className="text-sm font-bold text-foreground">Streak Shield</p>
              <p className="mt-1 text-[11px] leading-relaxed text-subtle">One protected miss every 14 days.</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div className="mb-4 flex items-center justify-between">
                <Award className="h-5 w-5 text-warning" />
                <span className="text-xs font-bold text-muted">{student.totalXP.toLocaleString()} XP</span>
              </div>
              <p className="text-sm font-bold text-foreground">Total XP</p>
              <p className="mt-1 text-[11px] leading-relaxed text-subtle">Earned by showing your work.</p>
            </div>
          </section>
        </Reveal>

        {/* ===== Momentum board ===== */}
        <Reveal>
          <section>
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Medal className="h-4 w-4 text-primary" /> Momentum board
              </h2>
              <span className="text-xs text-subtle">Full Stack</span>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              {visibleLeaderboard.map((entry) => (
                <div key={entry.rank} className={`flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0 ${entry.isCurrentUser ? 'bg-primary/10' : ''}`}>
                  <span className="w-4 text-xs font-bold text-subtle">{entry.rank}</span>
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-[10px] font-bold text-white">{entry.avatar}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-foreground">{entry.name}</p>
                    <p className="truncate text-[10px] text-subtle">{entry.college}</p>
                  </div>
                  <span className="text-xs font-bold text-warning">🔥 {entry.streak}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowLeaderboard((value) => !value)}
              className="mt-3 flex min-h-12 w-full items-center justify-center gap-1 text-xs font-semibold text-primary hover:text-accent"
            >
              {showLeaderboard ? 'Show less' : 'View leaderboard'} <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showLeaderboard ? 'rotate-180' : ''}`} />
            </button>
          </section>
        </Reveal>

        {/* ===== Community feed ===== */}
        <Reveal>
          <section aria-labelledby="community-heading">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 id="community-heading" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Users className="h-4 w-4 text-accent" /> Community momentum
              </h2>
              <span className="text-xs text-subtle">Live</span>
            </div>

            {hasSubmissions ? (
              <>
                <div className="space-y-2">
                  {visibleCommunity.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-accent/30 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
                    >
                      <div
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
                        style={{ background: getAvatarColor(post.avatar) }}
                        aria-hidden="true"
                      >
                        {post.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs leading-snug text-muted">
                          <span className="font-semibold text-foreground">{post.name}</span>
                          <span className="mx-1 text-subtle">·</span>
                          <span className="font-semibold text-accent">Day {post.day}</span>
                          <span className="mx-1 text-subtle">·</span>
                          {post.action}
                        </p>
                        <p className="mt-0.5 flex items-center gap-2 text-[10px] text-subtle">
                          <span>{post.college}</span>
                          <span aria-hidden="true">·</span>
                          <time>{getRelativeTime(post.time)}</time>
                        </p>
                      </div>
                      <span className="shrink-0 rounded-md bg-white/[0.04] px-2 py-1 text-[9px] font-semibold text-subtle">
                        {post.track}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllCommunity((value) => !value)}
                  className="mt-3 flex min-h-12 w-full items-center justify-center gap-1 text-xs font-semibold text-accent hover:text-primary"
                >
                  {showAllCommunity ? 'Show less' : 'View all momentum'} <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showAllCommunity ? 'rotate-180' : ''}`} />
                </button>
              </>
            ) : (
              <EmptyState
                variant="no-submissions"
                title="No submissions yet"
                body="Once you finish a build, your daily wins show up here — alongside the rest of the community's."
              >
                <Link to="/day/12" className="block w-full">
                  <Button size="sm" className="w-full min-h-12">Make your first submission</Button>
                </Link>
              </EmptyState>
            )}
          </section>
        </Reveal>

        {/* ===== Profile ===== */}
        <Reveal>
          <section id="profile" className="scroll-mt-28 rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold text-white" style={{ background: getAvatarColor(student.avatar) }}>
                {student.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-foreground">{student.name}</p>
                <p className="text-xs text-subtle">{student.college} · {student.track}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                  <span className="rounded-lg bg-white/5 px-2 py-2 text-muted">{student.githubUsername ? `github.com/${student.githubUsername}` : 'Add GitHub'}</span>
                  <span className="rounded-lg bg-white/5 px-2 py-2 text-muted">{student.linkedinUsername ? 'LinkedIn linked' : 'Add LinkedIn'}</span>
                </div>
              </div>
            </div>
            <Button onClick={() => toast.success('Profile details are ready to edit in the full product.')} variant="outline" size="sm" className="mt-4 w-full min-h-12">
              <Sparkles className="h-4 w-4" /> Review profile
            </Button>
          </section>
        </Reveal>
      </main>

      {/* ===== Sticky primary CTA above the bottom nav ===== */}
      <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+64px)] left-0 right-0 z-40 px-5">
        <div className="mx-auto max-w-lg">
          {stickyCta.href ? (
            <Link to={stickyCta.href} className="block">
              <Button
                variant={completed ? 'success' : 'gradient'}
                size="lg"
                className="w-full font-bold shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
              >
                {completed ? <CheckCircle2 className="h-5 w-5" /> : <Flame className="h-5 w-5 flame-pulse" />}
                {stickyCta.label} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button onClick={stickyCta.onClick ?? scrollToProfile} size="lg" className="w-full font-bold shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
              <UserRound className="h-5 w-5" /> {stickyCta.label} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* ===== Missed-day resume flow (full-screen sheet) ===== */}
      <ResumeChallengeFlow open={resumeOpen} onOpenChange={setResumeOpen} />
    </div>
  );
}
