'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Award, Calendar, CheckCircle2, ChevronDown, Clock, ExternalLink, Flame,
  Medal, Shield, Sparkles, Trophy, UserRound, Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';
import BottomNav from '@/components/BottomNav';
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
import { formatTime, getAvatarColor, getGreeting, getRelativeTime, isAfterTenPM } from '@/lib/utils';

type StudentState = Student['state'];
const storageKey = 'abtalks-day-12-submission';

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
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
        <Button onClick={onProfile} variant="secondary" size="sm" className="w-full">
          <UserRound className="h-4 w-4" /> {map.action}
        </Button>
      ) : (
        <Link href={map.href} className="block w-full">
          <Button variant="secondary" size="sm" className="w-full">
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
    <div className={`min-h-screen bg-[#07070A] pb-safe ${nightMode ? 'night-mode' : ''}`}>
      <AnimatedBackground />

      {/* ===== Two-row header ===== */}
      <header className="sticky top-0 z-30 glass safe-top">
        <div className="mx-auto max-w-lg px-5 pb-3 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#C7C7D1]">{greeting}</p>
            <time dateTime={now.toISOString()} className="font-mono text-[11px] tabular-nums text-[#8B8B99]">
              {formatTime(now)}
            </time>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <h1 className="min-w-0 truncate text-[24px] font-black leading-tight tracking-tight text-white">
              {student.name}
            </h1>
            <div className="flex shrink-0 items-center gap-2.5">
              <StreakBadge streak={streak} size="sm" />
              <button
                type="button"
                onClick={scrollToProfile}
                aria-label={`Go to ${student.name}'s profile`}
                className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)] transition-transform active:scale-95"
                style={{ background: getAvatarColor(student.avatar) }}
              >
                {student.avatar}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-lg space-y-5 px-5 pt-5">
        {/* ===== Segmented control ===== */}
        <StateTabs value={selectedState} onChange={setSelectedState} />

        {/* ===== State notice / empty states ===== */}
        <StateNotice state={selectedState} onProfile={scrollToProfile} />

        {/* ===== 1. Streak hero (taller, count-up) ===== */}
        <Reveal>
          <section
            aria-label="Your progress"
            className="glow-purple-soft relative overflow-hidden rounded-3xl border border-[#8B5CF6]/25 bg-[#16161D] p-6"
          >
            <div className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 rounded-full bg-[#8B5CF6]/20 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-[#22D3EE]/10 blur-3xl" aria-hidden="true" />

            <div className="relative flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A78BFA]">60-day challenge</p>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <CountUp end={dayDone} className="text-[44px] font-black leading-none tracking-tight text-white" />
                  <span className="pb-1 text-sm font-semibold text-[#8B8B99]">/ 60</span>
                </div>
                <p className="mt-1.5 text-sm text-[#C7C7D1]">
                  {completed ? 'Day done. Streak protected.' : 'One meaningful build, then close your laptop guilt-free.'}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#F59E0B]/25 bg-[#F59E0B]/10 px-3 py-1">
                  <Flame className="h-3.5 w-3.5 text-[#F59E0B] flame-pulse" />
                  <span className="text-xs font-bold text-[#F59E0B]">{streak} day streak</span>
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

        {/* ===== 2+3. Day card + primary CTA (above the fold) ===== */}
        <Reveal delay={0.05}>
          <section
            aria-labelledby="today-build-title"
            className="relative overflow-hidden rounded-3xl border border-[#27272F] bg-[#16161D] p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#22D3EE]">Today&apos;s build</p>
                <h2 id="today-build-title" className="mt-1 text-lg font-bold leading-snug text-white">
                  {day12Challenge.title}
                </h2>
              </div>
              <span className="shrink-0 rounded-md bg-[#22D3EE]/10 px-2 py-1 text-[10px] font-semibold text-[#67E8F9]">
                {day12Challenge.estimatedTime}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-[#8B8B99]">
              <Clock className="h-3.5 w-3.5" /> {day12Challenge.difficulty} · {day12Challenge.track}
            </div>

            <Link href="/day/12" className="mt-4 block">
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
              <p className="mt-2 text-center text-xs text-[#8B8B99]">
                Submitted and saved to your public record.
              </p>
            )}
          </section>
        </Reveal>

        {/* ===== 4. Midnight Rescue (time-based) ===== */}
        <Reveal delay={0.08}>
          <MidnightRescue />
        </Reveal>

        {/* ===== 5. Focus Sprint ===== */}
        <Reveal delay={0.08}>
          <section aria-labelledby="focus-sprint-heading" className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <span className="h-3 w-1 rounded-full bg-[#8B5CF6]" aria-hidden="true" />
              <h2 id="focus-sprint-heading" className="text-sm font-semibold text-white">Deep work</h2>
            </div>
            <FocusSprint compact />
          </section>
        </Reveal>

        <Reveal><EnergyCheckin /></Reveal>

        {/* ===== This week ===== */}
        <Reveal>
          <section>
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <Calendar className="h-4 w-4 text-[#22D3EE]" /> This week
              </h2>
              <span className="text-xs text-[#8B8B99]">{streak} day streak</span>
            </div>
            <div className="flex justify-between rounded-2xl border border-[#27272F] bg-[#16161D] p-3.5">
              {weeklyHeatmap.map((day) => (
                <div key={day.day} className="flex flex-col items-center gap-1.5">
                  <div className={`grid h-8 w-8 place-items-center rounded-lg ${day.completed ? 'bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] shadow-[0_0_16px_rgba(139,92,246,.2)]' : 'bg-[#27272F]'}`}>
                    {day.completed ? <CheckCircle2 className="h-4 w-4 text-white" /> : <span className="h-1.5 w-1.5 rounded-full bg-[#8B8B99]/40" />}
                  </div>
                  <span className={`text-[10px] ${day.completed ? 'text-[#C7C7D1]' : 'text-[#8B8B99]/60'}`}>{day.day}</span>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ===== Stats ===== */}
        <Reveal>
          <section className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-[#27272F] bg-[#16161D] p-4">
              <div className="mb-4 flex items-center justify-between">
                <Shield className="h-5 w-5 text-[#22C55E]" />
                <span className="text-xs font-bold text-[#C7C7D1]">{student.shieldsRemaining}/1</span>
              </div>
              <p className="text-sm font-bold text-white">Streak Shield</p>
              <p className="mt-1 text-[11px] leading-relaxed text-[#8B8B99]">One protected miss every 14 days.</p>
            </div>
            <div className="rounded-2xl border border-[#27272F] bg-[#16161D] p-4">
              <div className="mb-4 flex items-center justify-between">
                <Award className="h-5 w-5 text-[#F59E0B]" />
                <span className="text-xs font-bold text-[#C7C7D1]">#{selectedState === 'active' ? '7' : '—'}</span>
              </div>
              <p className="text-sm font-bold text-white">{student.totalXP.toLocaleString()} XP</p>
              <p className="mt-1 text-[11px] leading-relaxed text-[#8B8B99]">Earned by showing your work.</p>
            </div>
          </section>
        </Reveal>

        {/* ===== Achievements ===== */}
        <Reveal>
          <section>
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <Trophy className="h-4 w-4 text-[#F59E0B]" /> Achievement shelf
              </h2>
              <span className="text-xs text-[#8B8B99]">4 unlocked</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {achievements.slice(0, 4).map((achievement) => (
                <button
                  key={achievement.id}
                  type="button"
                  onClick={() => toast(achievement.description)}
                  className="min-h-24 rounded-2xl border border-[#27272F] bg-[#16161D] p-2 text-center transition-colors hover:border-[#8B5CF6]/40"
                  aria-label={`${achievement.title}: ${achievement.description}`}
                >
                  <span className="block text-xl">{achievement.icon}</span>
                  <span className="mt-1 block text-[9px] font-semibold leading-tight text-[#C7C7D1]">{achievement.title}</span>
                </button>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ===== Momentum board ===== */}
        <Reveal>
          <section>
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <Medal className="h-4 w-4 text-[#22D3EE]" /> Momentum board
              </h2>
              <span className="text-xs text-[#8B8B99]">Full Stack</span>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#27272F] bg-[#16161D]">
              {visibleLeaderboard.map((entry) => (
                <div key={entry.rank} className={`flex items-center gap-3 border-b border-[#27272F] px-4 py-3 last:border-b-0 ${entry.isCurrentUser ? 'bg-[#8B5CF6]/10' : ''}`}>
                  <span className="w-4 text-xs font-bold text-[#8B8B99]/70">{entry.rank}</span>
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] text-[10px] font-bold text-white">{entry.avatar}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-white">{entry.name}</p>
                    <p className="truncate text-[10px] text-[#8B8B99]">{entry.college}</p>
                  </div>
                  <span className="text-xs font-bold text-[#F59E0B]">🔥 {entry.streak}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowLeaderboard((value) => !value)}
              className="mt-3 flex min-h-10 w-full items-center justify-center gap-1 text-xs font-semibold text-[#8B5CF6] hover:text-[#A78BFA]"
            >
              {showLeaderboard ? 'Show less' : 'View leaderboard'} <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showLeaderboard ? 'rotate-180' : ''}`} />
            </button>
          </section>
        </Reveal>

        {/* ===== Community feed ===== */}
        <Reveal>
          <section aria-labelledby="community-heading">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 id="community-heading" className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <Users className="h-4 w-4 text-[#EC4899]" /> Community momentum
              </h2>
              <span className="text-xs text-[#8B8B99]">Live</span>
            </div>

            {hasSubmissions ? (
              <>
                <div className="space-y-2">
                  {visibleCommunity.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center gap-3 rounded-2xl border border-[#27272F] bg-[#16161D] p-3 transition-colors hover:border-[#EC4899]/30"
                    >
                      <div
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
                        style={{ background: getAvatarColor(post.avatar) }}
                        aria-hidden="true"
                      >
                        {post.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs leading-snug text-[#C7C7D1]">
                          <span className="font-semibold text-white">{post.name}</span>
                          <span className="mx-1 text-[#8B8B99]">·</span>
                          <span className="font-semibold text-[#A78BFA]">Day {post.day}</span>
                          <span className="mx-1 text-[#8B8B99]">·</span>
                          {post.action}
                        </p>
                        <p className="mt-0.5 flex items-center gap-2 text-[10px] text-[#8B8B99]">
                          <span>{post.college}</span>
                          <span aria-hidden="true">·</span>
                          <time>{getRelativeTime(post.time)}</time>
                        </p>
                      </div>
                      <span className="shrink-0 rounded-md bg-white/[0.04] px-2 py-1 text-[9px] font-semibold text-[#8B8B99]">
                        {post.track}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllCommunity((value) => !value)}
                  className="mt-3 flex min-h-10 w-full items-center justify-center gap-1 text-xs font-semibold text-[#EC4899] hover:text-[#F472B6]"
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
                <Link href="/day/12" className="block w-full">
                  <Button size="sm" className="w-full">Make your first submission</Button>
                </Link>
              </EmptyState>
            )}
          </section>
        </Reveal>

        {/* ===== Profile ===== */}
        <Reveal>
          <section id="profile" className="scroll-mt-28 rounded-2xl border border-[#27272F] bg-[#16161D] p-4">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold text-white" style={{ background: getAvatarColor(student.avatar) }}>
                {student.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white">{student.name}</p>
                <p className="text-xs text-[#8B8B99]">{student.college} · {student.track}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                  <span className="rounded-lg bg-white/5 px-2 py-2 text-[#C7C7D1]">{student.githubUsername ? `github.com/${student.githubUsername}` : 'Add GitHub'}</span>
                  <span className="rounded-lg bg-white/5 px-2 py-2 text-[#C7C7D1]">{student.linkedinUsername ? 'LinkedIn linked' : 'Add LinkedIn'}</span>
                </div>
              </div>
            </div>
            <Button onClick={() => toast.success('Profile details are ready to edit in the full product.')} variant="outline" size="sm" className="mt-4 w-full">
              <Sparkles className="h-4 w-4" /> Review profile
            </Button>
          </section>
        </Reveal>
      </main>
      <BottomNav />
    </div>
  );
}
