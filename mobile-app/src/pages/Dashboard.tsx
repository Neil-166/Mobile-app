import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Award, Calendar, CheckCircle2, ChevronDown, Clock, ExternalLink, Flame,
  Medal, Shield, Sparkles, Trophy, UserRound, Users,
} from 'lucide-react';
import { Github } from '@/components/Icons';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';

import CountUp from '@/components/CountUp';
import EmptyState from '@/components/EmptyState';
import EnergyCheckin from '@/components/EnergyCheckin';
import FocusSprint from '@/components/FocusSprint';
import MidnightRescue from '@/components/MidnightRescue';
import ProgressRing from '@/components/ProgressRing';
import StateTabs from '@/components/StateTabs';
import StreakBadge from '@/components/StreakBadge';
import {
  achievements, communityFeed, currentStudent, day12Challenge, leaderboard,
  students, type Student, weeklyHeatmap,
} from '@/lib/mock-data';
import { formatTime, getAvatarColor, getGreeting, getMidnightCountdown, getRelativeTime, isAfterTenPM } from '@/lib/utils';

type StudentState = Student['state'];
const storageKey = 'abtalks-day-12-submission';

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

function StateNotice({ state, onProfile }: { state: StudentState; onProfile: () => void }) {
  if (state === 'active') return null;

  const map = {
    'first-day': {
      variant: 'first-day' as const,
      title: 'Welcome to day one',
      body: 'Your first commit can be tiny. The point is giving tomorrow’s version of you a starting line.',
      action: 'Explore a sample day',
      href: '/day/12',
    },
    'missed-day': {
      variant: 'missed-day' as const,
      title: 'One missed day does not erase the work.',
      body: 'Your progress is still here. Pick one manageable task, use your next Streak Shield when it is available, and begin again.',
      action: 'Re-enter today',
      href: '/day/12',
    },
    'empty-profile': {
      variant: 'empty-profile' as const,
      title: 'Add the places where you build.',
      body: 'Connect GitHub and LinkedIn when you are ready. A complete profile helps turn quiet effort into a visible learning record.',
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
            {map.action} <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </EmptyState>
  );
}

export default function Dashboard() {
  const [now, setNow] = useState(() => new Date());
  const [selectedState, setSelectedState] = useState<StudentState>('active');
  const [submittedToday, setSubmittedToday] = useState(false);
  const [showAllCommunity, setShowAllCommunity] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    const tick = window.setInterval(() => setNow(new Date()), 30_000);
    const submissionRead = window.setTimeout(() => {
      setSubmittedToday(Boolean(window.localStorage.getItem(storageKey)));
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

  const visibleCommunity = showAllCommunity ? communityFeed : communityFeed.slice(0, 3);
  const visibleLeaderboard = showLeaderboard ? leaderboard : leaderboard.slice(0, 3);
  const hasSubmissions = selectedState === 'active' || selectedState === 'missed-day';

  const scrollToProfile = () => {
    document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const openChallenge = () => {
    if (!completed) toast('Day 12 is waiting for you.');
  };

  return (
    <div className={`min-h-screen bg-bg pb-nav ${nightMode ? 'night-mode' : ''}`}>
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

      <main className="relative mx-auto max-w-lg space-y-6 px-5 pt-6">
        {/* ===== Segmented control ===== */}
        <StateTabs value={selectedState} onChange={setSelectedState} />

        {/* ===== State notice / empty states ===== */}
        <StateNotice state={selectedState} onProfile={scrollToProfile} />

        {/* ===== 1+2. Streak hero (streak + day progress) ===== */}
        <Reveal>
          <section
            aria-label="Your progress"
            className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 surface-gradient shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
          >
            <div
              className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            <div className="relative flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">60-day challenge</p>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <CountUp end={dayDone} className="text-[44px] font-extrabold leading-none tracking-tight text-foreground" />
                  <span className="pb-1 text-sm font-semibold text-subtle">/ 60</span>
                </div>
                <p className="mt-1.5 text-sm text-muted">
                  {completed ? 'Day done. Streak protected.' : 'One meaningful build, then close your laptop guilt-free.'}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-warning/25 bg-warning/10 px-3 py-1">
                  <Flame className="h-3.5 w-3.5 text-warning flame-pulse" />
                  <span className="text-xs font-bold text-warning">{streak} day streak</span>
                </div>
              </div>
              <div className="shrink-0">
                <ProgressRing
                  value={dayDone}
                  max={60}
                  size={96}
                  strokeWidth={8}
                  label={<CountUp end={percent} suffix="%" />}
                  sublabel="complete"
                />
              </div>
            </div>
          </section>
        </Reveal>

        {/* ===== 3+4+5. Today's build — task, remaining time, primary CTA (above the fold) ===== */}
        <Reveal delay={0.05}>
          <section
            aria-labelledby="today-build-title"
            className="relative overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent">Today&apos;s build</p>
                <h2 id="today-build-title" className="mt-1 text-lg font-bold leading-snug text-foreground">
                  {day12Challenge.title}
                </h2>
              </div>
              <span className="shrink-0 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-semibold text-accent">
                {day12Challenge.estimatedTime}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between gap-3 text-xs text-subtle">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {day12Challenge.difficulty} · {day12Challenge.track}
              </span>
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Clock className="h-3.5 w-3.5 text-warning" /> {getMidnightCountdown()} to midnight
              </span>
            </div>

            <Link to="/day/12" className="mt-4 block">
              <Button
                id="open-today-challenge"
                onClick={openChallenge}
                variant={completed ? 'success' : 'gradient'}
                size="lg"
                className="w-full font-bold"
              >
                {completed ? (
                  <><CheckCircle2 className="h-5 w-5" /> View submitted challenge</>
                ) : (
                  <>Open today&apos;s challenge <ExternalLink className="h-4 w-4" /></>
                )}
              </Button>
            </Link>

            {completed && (
              <p className="mt-2 text-center text-xs text-subtle">
                Submitted and saved to your public record.
              </p>
            )}
          </section>
        </Reveal>

        {/* ===== Midnight Rescue (time-based) ===== */}
        <Reveal delay={0.08}>
          <MidnightRescue />
        </Reveal>

        {/* ===== Focus Sprint ===== */}
        <Reveal delay={0.08}>
          <section aria-labelledby="focus-sprint-heading" className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <span className="h-3 w-1 rounded-full bg-primary" aria-hidden="true" />
              <h2 id="focus-sprint-heading" className="text-sm font-semibold text-foreground">Deep work</h2>
            </div>
            <FocusSprint compact />
          </section>
        </Reveal>

        <Reveal><EnergyCheckin /></Reveal>

        {/* ===== This week ===== */}
        <Reveal>
          <section>
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Calendar className="h-4 w-4 text-primary" /> This week
              </h2>
              <span className="text-xs text-subtle">{streak} day streak</span>
            </div>
            <div className="flex justify-between rounded-2xl border border-border bg-surface p-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              {weeklyHeatmap.map((day) => (
                <div key={day.day} className="flex flex-col items-center gap-1.5">
                  <div className={`grid h-8 w-8 place-items-center rounded-lg ${day.completed ? 'bg-gradient-to-br from-primary to-accent shadow-[0_0_12px_rgba(245,158,11,0.15)]' : 'bg-border-muted'}`}>
                    {day.completed ? <CheckCircle2 className="h-4 w-4 text-white" /> : <span className="h-1.5 w-1.5 rounded-full bg-subtle/40" />}
                  </div>
                  <span className={`text-[10px] ${day.completed ? 'text-muted' : 'text-subtle/60'}`}>{day.day}</span>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

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
              <div className="flex items-center justify-between mt-2 text-[10px] text-subtle">
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
                <span className="text-xs font-bold text-muted">#{selectedState === 'active' ? '7' : '—'}</span>
              </div>
              <p className="text-sm font-bold text-foreground">{student.totalXP.toLocaleString()} XP</p>
              <p className="mt-1 text-[11px] leading-relaxed text-subtle">Earned by showing your work.</p>
            </div>
          </section>
        </Reveal>

        {/* ===== Achievements ===== */}
        <Reveal>
          <section>
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Trophy className="h-4 w-4 text-warning" /> Achievement shelf
              </h2>
              <span className="text-xs text-subtle">4 unlocked</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {achievements.slice(0, 4).map((achievement) => (
                <button
                  key={achievement.id}
                  type="button"
                  onClick={() => toast(achievement.description)}
                  className="min-h-24 rounded-2xl border border-border bg-surface p-2 text-center transition-colors hover:border-primary/40 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
                  aria-label={`${achievement.title}: ${achievement.description}`}
                >
                  <span className="block text-xl">{achievement.icon}</span>
                  <span className="mt-1 block text-[9px] font-semibold leading-tight text-muted">{achievement.title}</span>
                </button>
              ))}
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
    </div>
  );
}
