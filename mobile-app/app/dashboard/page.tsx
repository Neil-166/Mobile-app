'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity, Award, Calendar, CheckCircle2, ChevronDown,
  ExternalLink, Medal, Shield, Sparkles, Trophy, UserRound,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import EnergyCheckin from '@/components/EnergyCheckin';
import FocusSprint from '@/components/FocusSprint';
import MidnightRescue from '@/components/MidnightRescue';
import ProgressRing from '@/components/ProgressRing';
import StreakBadge from '@/components/StreakBadge';
import {
  achievements, currentStudent, day12Challenge, leaderboard, recentActivity,
  students, type Student, weeklyHeatmap,
} from '@/lib/mock-data';
import { formatTime, getAvatarColor, getGreeting, isAfterTenPM } from '@/lib/utils';

type StudentState = Student['state'];
const storageKey = 'abtalks-day-12-submission';

const stateLabels: Record<StudentState, string> = {
  active: 'My dashboard',
  'first-day': 'First day',
  'missed-day': 'Missed day',
  'empty-profile': 'Empty profile',
};

function StateNotice({ state, onProfile }: { state: StudentState; onProfile: () => void }) {
  if (state === 'active') return null;

  const copy = {
    'first-day': {
      eyebrow: 'Welcome to day one',
      title: 'Start small. Make it visible.',
      body: 'Your first commit can be tiny. The point is giving tomorrow’s version of you a starting line.',
      action: 'Explore a sample day',
    },
    'missed-day': {
      eyebrow: 'A soft restart',
      title: 'One missed day does not erase the work.',
      body: 'Your progress is still here. Pick one manageable task, use your next Streak Shield when it is available, and begin again.',
      action: 'Re-enter today',
    },
    'empty-profile': {
      eyebrow: 'Your public record',
      title: 'Add the places where you build.',
      body: 'Connect GitHub and LinkedIn when you are ready. A complete profile helps turn quiet effort into a visible learning record.',
      action: 'Complete profile',
    },
  }[state];

  return (
    <section className="rounded-2xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/12 to-[#22D3EE]/5 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A78BFA]">{copy.eyebrow}</p>
      <h2 className="mt-1 text-base font-bold text-white">{copy.title}</h2>
      <p className="mt-2 text-xs leading-relaxed text-zinc-400">{copy.body}</p>
      {state === 'empty-profile' ? (
        <Button onClick={onProfile} variant="secondary" size="sm" className="mt-4 w-full">
          <UserRound className="h-4 w-4" /> {copy.action}
        </Button>
      ) : (
        <Link href="/day/12" className="mt-4 block">
          <Button variant="secondary" size="sm" className="w-full">
            {copy.action} <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </section>
  );
}

export default function Dashboard() {
  const [now, setNow] = useState(() => new Date());
  const [selectedState, setSelectedState] = useState<StudentState>('active');
  const [submittedToday, setSubmittedToday] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    const tick = window.setInterval(() => setNow(new Date()), 60_000);
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
  const visibleActivity = showAllActivity ? recentActivity : recentActivity.slice(0, 3);
  const visibleLeaderboard = showLeaderboard ? leaderboard : leaderboard.slice(0, 3);

  const scrollToProfile = () => {
    document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className={`min-h-screen bg-[#09090B] pb-safe ${nightMode ? 'night-mode' : ''}`}>
      <header className="sticky top-0 z-30 border-b border-[#27272A] glass px-5 py-3 safe-top">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div>
            <p className="text-xs font-medium text-zinc-400">{greeting} · {formatTime(now)}</p>
            <h1 className="mt-0.5 text-xl font-bold text-white">{student.name}</h1>
          </div>
          <div className="flex items-center gap-2.5">
            <StreakBadge streak={completed ? student.streak + 1 : student.streak} size="sm" />
            <button
              type="button"
              onClick={scrollToProfile}
              aria-label="Jump to your profile"
              className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white transition-transform active:scale-95"
              style={{ background: getAvatarColor(student.avatar) }}
            >
              {student.avatar}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-6 px-5 pt-5">
        <section aria-label="Prototype state preview" className="rounded-xl border border-[#27272A] bg-white/[0.025] p-1.5">
          <div className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
            {(Object.keys(stateLabels) as StudentState[]).map((state) => (
              <button
                key={state}
                type="button"
                onClick={() => setSelectedState(state)}
                aria-pressed={selectedState === state}
                className={`min-h-9 shrink-0 rounded-lg px-3 text-[10px] font-semibold transition-colors ${
                  selectedState === state ? 'bg-[#8B5CF6] text-white' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
                }`}
              >
                {stateLabels[state]}
              </button>
            ))}
          </div>
        </section>

        <StateNotice state={selectedState} onProfile={scrollToProfile} />

        {nightMode ? (
          <MidnightRescue onMarkProgress={() => toast.success('Progress marked — your next small step is saved.')} />
        ) : (
          <section className="flex items-center gap-3 rounded-2xl border border-[#22D3EE]/15 bg-[#22D3EE]/[0.045] p-3.5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#22D3EE]/10 text-lg">🌙</div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white">Your night plan is ready</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500">After 10 PM, Midnight Rescue turns on with a live streak countdown.</p>
            </div>
            <button
              type="button"
              onClick={() => document.getElementById('focus-sprint')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="min-h-10 shrink-0 rounded-lg px-2 text-[11px] font-semibold text-[#22D3EE] hover:bg-[#22D3EE]/10"
            >Focus</button>
          </section>
        )}

        <section className="relative overflow-hidden rounded-3xl border border-[#27272A] bg-[#16161A] p-5">
          <div className="pointer-events-none absolute -right-12 -top-14 h-48 w-48 rounded-full bg-[#8B5CF6]/15 blur-3xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A78BFA]">60-day challenge</p>
              <h2 className="mt-1 text-3xl font-black text-white">{completed ? 'Day 12, done.' : `Day ${student.currentDay}.`}</h2>
              <p className="mt-1 text-sm text-zinc-400">{completed ? 'Your streak is protected for today.' : 'One meaningful build, then you are done for the day.'}</p>
            </div>
            <ProgressRing value={completed ? student.currentDay + 1 : student.currentDay} max={60} size={72} strokeWidth={6} label={`${Math.round(((completed ? student.currentDay + 1 : student.currentDay) / 60) * 100)}%`} />
          </div>
          <div className="relative mt-5 rounded-2xl border border-white/10 bg-black/15 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#22D3EE]">Today’s build</p>
                <p className="mt-1 text-sm font-bold leading-snug text-white">{day12Challenge.title}</p>
              </div>
              <span className="shrink-0 rounded-md bg-[#22D3EE]/10 px-2 py-1 text-[10px] font-semibold text-[#22D3EE]">{day12Challenge.estimatedTime}</span>
            </div>
            <Link href="/day/12" className="mt-4 block">
              <Button className="w-full bg-white text-black hover:bg-zinc-200" size="sm">
                {completed ? 'View submitted challenge' : 'Open today’s challenge'} <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section id="focus-sprint"><FocusSprint compact /></section>
        <section><EnergyCheckin /></section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 text-sm font-semibold text-white"><Calendar className="h-4 w-4 text-[#22D3EE]" />This week</h2>
            <span className="text-xs text-zinc-500">{student.streak} day streak</span>
          </div>
          <div className="flex justify-between rounded-2xl border border-[#27272A] bg-[#16161A] p-3.5">
            {weeklyHeatmap.map((day) => (
              <div key={day.day} className="flex flex-col items-center gap-1.5">
                <div className={`grid h-8 w-8 place-items-center rounded-lg ${day.completed ? 'bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] shadow-[0_0_16px_rgba(139,92,246,.2)]' : 'bg-[#27272A]'}`}>
                  {day.completed ? <CheckCircle2 className="h-4 w-4 text-white" /> : <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />}
                </div>
                <span className={`text-[10px] ${day.completed ? 'text-zinc-300' : 'text-zinc-600'}`}>{day.day}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#27272A] bg-[#16161A] p-4">
            <div className="mb-4 flex items-center justify-between"><Shield className="h-5 w-5 text-[#22C55E]" /><span className="text-xs font-bold text-zinc-300">{student.shieldsRemaining}/1</span></div>
            <p className="text-sm font-bold text-white">Streak Shield</p>
            <p className="mt-1 text-[10px] leading-relaxed text-zinc-500">One protected miss every 14 days.</p>
          </div>
          <div className="rounded-2xl border border-[#27272A] bg-[#16161A] p-4">
            <div className="mb-4 flex items-center justify-between"><Award className="h-5 w-5 text-[#F59E0B]" /><span className="text-xs font-bold text-zinc-300">#{selectedState === 'active' ? '7' : '—'}</span></div>
            <p className="text-sm font-bold text-white">{student.totalXP.toLocaleString()} XP</p>
            <p className="mt-1 text-[10px] leading-relaxed text-zinc-500">Earned by showing your work.</p>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between"><h2 className="flex items-center gap-1.5 text-sm font-semibold text-white"><Trophy className="h-4 w-4 text-[#F59E0B]" />Achievement shelf</h2><span className="text-xs text-zinc-500">4 unlocked</span></div>
          <div className="grid grid-cols-4 gap-2">
            {achievements.slice(0, 4).map((achievement) => (
              <button key={achievement.id} type="button" onClick={() => toast(achievement.description)} className="min-h-24 rounded-2xl border border-[#27272A] bg-[#16161A] p-2 text-center transition-colors hover:border-[#8B5CF6]/40" aria-label={`${achievement.title}: ${achievement.description}`}>
                <span className="block text-xl">{achievement.icon}</span>
                <span className="mt-1 block text-[9px] font-semibold leading-tight text-zinc-300">{achievement.title}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between"><h2 className="flex items-center gap-1.5 text-sm font-semibold text-white"><Medal className="h-4 w-4 text-[#22D3EE]" />Momentum board</h2><span className="text-xs text-zinc-500">Full Stack</span></div>
          <div className="overflow-hidden rounded-2xl border border-[#27272A] bg-[#16161A]">
            {visibleLeaderboard.map((entry) => (
              <div key={entry.rank} className={`flex items-center gap-3 border-b border-[#27272A] px-4 py-3 last:border-b-0 ${entry.isCurrentUser ? 'bg-[#8B5CF6]/10' : ''}`}>
                <span className="w-4 text-xs font-bold text-zinc-600">{entry.rank}</span>
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] text-[10px] font-bold text-white">{entry.avatar}</div>
                <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-white">{entry.name}</p><p className="truncate text-[10px] text-zinc-500">{entry.college}</p></div>
                <span className="text-xs font-bold text-[#F59E0B]">🔥 {entry.streak}</span>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setShowLeaderboard((value) => !value)} className="mt-3 flex min-h-10 w-full items-center justify-center gap-1 text-xs font-semibold text-[#8B5CF6] hover:text-[#A78BFA]">
            {showLeaderboard ? 'Show less' : 'View leaderboard'} <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showLeaderboard ? 'rotate-180' : ''}`} />
          </button>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between"><h2 className="flex items-center gap-1.5 text-sm font-semibold text-white"><Activity className="h-4 w-4 text-[#EC4899]" />Recent activity</h2><span className="text-xs text-zinc-500">Public record</span></div>
          <div className="relative space-y-4 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:bg-gradient-to-b before:from-[#8B5CF6]/50 before:to-transparent">
            {visibleActivity.map((activity) => (
              <div key={activity.id} className="relative flex gap-3"><div className="z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-[#27272A] bg-[#16161A] text-base">{activity.icon}</div><div className="min-w-0 flex-1 pt-1"><div className="flex items-center justify-between gap-2"><p className="truncate text-sm font-semibold text-white">{activity.title}</p><span className="shrink-0 text-[10px] text-zinc-600">{activity.time}</span></div><p className="mt-0.5 text-xs leading-snug text-zinc-500">{activity.description}</p></div></div>
            ))}
          </div>
          <button type="button" onClick={() => setShowAllActivity((value) => !value)} className="mt-3 flex min-h-10 w-full items-center justify-center gap-1 text-xs font-semibold text-[#8B5CF6] hover:text-[#A78BFA]">
            {showAllActivity ? 'Show less' : 'View all activity'} <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showAllActivity ? 'rotate-180' : ''}`} />
          </button>
        </section>

        <section id="profile" className="rounded-2xl border border-[#27272A] bg-[#16161A] p-4">
          <div className="flex items-start gap-3"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold text-white" style={{ background: getAvatarColor(student.avatar) }}>{student.avatar}</div><div className="min-w-0 flex-1"><p className="text-sm font-bold text-white">{student.name}</p><p className="text-xs text-zinc-500">{student.college} · {student.track}</p><div className="mt-3 grid grid-cols-2 gap-2 text-[10px]"><span className="rounded-lg bg-white/5 px-2 py-2 text-zinc-400">{student.githubUsername ? `github.com/${student.githubUsername}` : 'Add GitHub'}</span><span className="rounded-lg bg-white/5 px-2 py-2 text-zinc-400">{student.linkedinUsername ? 'LinkedIn linked' : 'Add LinkedIn'}</span></div></div></div>
          <Button onClick={() => toast.success('Profile details are ready to edit in the full product.')} variant="outline" size="sm" className="mt-4 w-full"><Sparkles className="h-4 w-4" />Review profile</Button>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
